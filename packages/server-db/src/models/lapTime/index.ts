import { Schema } from 'mongoose'
import {
  SimpleEstimation,
  TrackHumidity,
  type LapConditions,
  type LapTime,
} from '@speed-tracker/common'
import { DbModelName } from '@/types'
import { BaseModel } from '../baseModel'

const conditionsSchema = new Schema<LapConditions>(
  {
    trackHumidity: {
      type: String,
      required: false,
      enum: [
        TrackHumidity.Dry,
        SimpleEstimation.Low,
        SimpleEstimation.Medium,
        SimpleEstimation.High,
      ],
    },
    traffic: {
      type: String,
      required: false,
      enum: [
        SimpleEstimation.Low,
        SimpleEstimation.Medium,
        SimpleEstimation.High,
      ],
    },
  },
  { _id: false, versionKey: false, minimize: false }
)

class LapTimeModel extends BaseModel<LapTime> {
  constructor() {
    super({
      dbModelName: DbModelName.LapTime,
      schema: new Schema<LapTime>(
        {
          id: { type: String, required: true, unique: true },
          userId: { type: String, required: true },
          trackId: { type: String, required: true },
          trackConfigId: { type: String, required: true },
          time: { type: String, required: true },
          teamId: { type: String, required: false },
          conditions: conditionsSchema,
        },
        { minimize: false } // чтобы не удалял пустой объект
      ),
    })
  }
}

export const lapTimeModel = new LapTimeModel()
