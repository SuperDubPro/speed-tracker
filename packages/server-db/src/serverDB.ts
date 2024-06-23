import mongoose from 'mongoose'
import { type IdType, type UserTrackGrade } from '@speed-tracker/common'
import { userTrackGradeModel } from './models'
import { type MongooseModel, type MongooseSaveModel } from '@types'

class ServerDB {
  private db: typeof mongoose | null = null

  async connect(uri: string): Promise<typeof mongoose> {
    try {
      this.db = await mongoose.connect(uri)
      return this.db
    } catch (error) {
      console.error('Error connecting to mongo\n', error)
      return await Promise.reject(error)
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.error('DB disconnect error\n', error)
    }
  }

  async createUserTrackGrade(
    model: UserTrackGrade
  ): Promise<MongooseSaveModel<UserTrackGrade>> {
    return await userTrackGradeModel.create(model)
  }

  async readUserTrackGrade(id: IdType): Promise<MongooseModel<UserTrackGrade>> {
    return await userTrackGradeModel.read(id)
  }

  async updateUserTrackGrade(
    id: IdType,
    update: Omit<UserTrackGrade, 'gradeId' | 'userId'>
  ): Promise<MongooseModel<UserTrackGrade>> {
    return await userTrackGradeModel.update(id, update)
  }

  async deleteUserTrackGrade(
    id: IdType
  ): Promise<MongooseModel<UserTrackGrade>> {
    return await userTrackGradeModel.delete(id)
  }
}

export const serverDB = new ServerDB()
