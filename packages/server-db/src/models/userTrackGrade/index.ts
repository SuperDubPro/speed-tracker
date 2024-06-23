import mongoose, { Schema } from 'mongoose'
import { type IdType, type UserTrackGrade } from '@speed-tracker/common'
import { DbModel, type MongooseSaveModel, type MongooseModel } from '@types'
import { v4 as uuidv4 } from 'uuid'

class UserTrackGradeModel {
  private readonly userTrackGradeScheme = new Schema<UserTrackGrade>({
    gradeId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    grade: { type: Number, required: true },
  })

  private readonly UserTrackGradeDBModel = mongoose.model<UserTrackGrade>(
    DbModel.UserTrackGrade,
    this.userTrackGradeScheme,
    DbModel.UserTrackGrade
  )

  async create(
    props: Omit<UserTrackGrade, 'gradeId'>
  ): Promise<MongooseSaveModel<UserTrackGrade>> {
    const instance = new this.UserTrackGradeDBModel({
      ...props,
      gradeId: uuidv4(),
    })
    return await instance.save()
  }

  async read(gradeId: IdType): Promise<MongooseModel<UserTrackGrade>> {
    return await this.UserTrackGradeDBModel.findOne({ gradeId })
  }

  async update(
    gradeId: IdType,
    update: Omit<UserTrackGrade, 'gradeId' | 'userId'>
  ): Promise<MongooseModel<UserTrackGrade>> {
    return await this.UserTrackGradeDBModel.findOneAndUpdate(
      { gradeId },
      update
    )
  }

  async delete(gradeId?: IdType): Promise<MongooseModel<UserTrackGrade>> {
    if (gradeId === undefined) {
      return null
    }

    return await this.UserTrackGradeDBModel.findOneAndDelete({ gradeId })
  }
}

export const userTrackGradeModel = new UserTrackGradeModel()
