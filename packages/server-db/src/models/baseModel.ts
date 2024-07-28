/* eslint-disable @typescript-eslint/naming-convention -- для удаления __v */
/* eslint-disable @typescript-eslint/consistent-type-assertions -- потому что типизация mongoose говно */
import mongoose, { type Schema, type FilterQuery } from 'mongoose'
import { type IdType } from '@speed-tracker/common'
import { type DbModelName } from '@types'
import { v4 as uuidv4 } from 'uuid'

interface Props<Model extends object> {
  schema: Schema<Model, mongoose.Model<Model>>
  dbModelName: DbModelName
  idKey?: keyof Model
}

/** Базовый класс для работы с бд. Реализация CRUD операций */
export class BaseModel<
  M extends { id: IdType } & object,
  ConstKeys extends keyof M = never,
> {
  private readonly schema: Schema<M, mongoose.Model<M>>
  protected readonly DBModel: mongoose.Model<M>
  private readonly idKey: keyof M

  constructor({ schema, dbModelName, idKey = 'id' }: Props<M>) {
    this.schema = schema
    this.DBModel = mongoose.model<M>(dbModelName, schema, dbModelName)
    this.idKey = idKey
  }

  async create(props: Omit<M, typeof this.idKey>): Promise<M | null> {
    const instance = new this.DBModel({
      ...props,
      [this.idKey]: uuidv4(),
    })
    try {
      const doc = await instance.save()
      const obj = (doc?.toObject() ?? {}) as { _id: unknown; __v?: unknown } & M
      const { _id, __v, ...model } = obj
      return model as M
    } catch (err) {
      console.error('create error\n', err)
    }
    return null
  }

  async read(id?: IdType): Promise<M | null> {
    if (id === undefined) {
      return null
    }

    const filter = { [this.idKey]: id } as FilterQuery<M>
    try {
      const doc = await this.DBModel.findOne(filter).lean().select('-_id -__v')
      return doc as M | null
    } catch (err) {
      console.error('read error\n', err)
    }
    return null
  }

  async update(
    id?: IdType,
    update?: Partial<Exclude<M, typeof this.idKey | ConstKeys>>
  ): Promise<M | null> {
    if (id === undefined || update === undefined) {
      return null
    }

    const filter = {
      [this.idKey]: String(id),
    } as FilterQuery<M>

    try {
      const doc = await this.DBModel.findOneAndUpdate(filter, update, {
        lean: true,
        new: true,
      })
        .lean()
        .select('-_id -__v')
      return doc as M | null
    } catch (err) {
      console.error('update error\n', err)
    }
    return null
  }

  async delete(id?: IdType): Promise<M | null> {
    if (id === undefined) {
      return null
    }
    const filter = { [this.idKey]: id } as FilterQuery<M>

    try {
      const doc = await this.DBModel.findOneAndDelete(filter, {
        lean: true,
      })
        .lean()
        .select('-_id -__v')
      return doc as M | null
    } catch (err) {
      console.error('delete error\n', err)
    }
    return null
  }
}
