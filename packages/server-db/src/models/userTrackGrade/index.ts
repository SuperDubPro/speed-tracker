import { Schema } from 'mongoose'
import { type IdType, type UserTrackGrade } from '@speed-tracker/common'
import { DbModelName } from '@types'
import { BaseModel } from '../baseModel'

class UserTrackGradeModel extends BaseModel<
  UserTrackGrade,
  'userId' | 'trackId'
> {
  constructor() {
    super({
      dbModelName: DbModelName.UserTrackGrade,
      schema: new Schema<UserTrackGrade>({
        id: { type: String, required: true, unique: true },
        userId: { type: String, required: true },
        trackId: { type: String, required: true },
        grade: { type: Number, required: true },
      }),
    })
  }

  async getAverageRating(trackId: IdType): Promise<number | null> {
    try {
      const res = await this.DBModel.aggregate([
        { $match: { trackId } },
        { $group: { _id: null, average: { $avg: '$grade' } } },
      ])

      return res?.[0]?.average ?? null
    } catch (err) {
      console.error('getAverageRating error\n', err)
    }

    return null
  }
}

export const userTrackGradeModel = new UserTrackGradeModel()
