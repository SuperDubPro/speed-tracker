import { Schema } from 'mongoose'
import { type Track, TrackSurface, TrackType } from '@speed-tracker/common'
import { DbModelName } from '@types'
import { BaseModel } from '../baseModel'

class TrackModel extends BaseModel<Track> {
  constructor() {
    super({
      dbModelName: DbModelName.Track,
      schema: new Schema<Track>({
        id: { type: String, required: true, unique: true },
        type: {
          type: String,
          required: true,
          enum: [TrackType.Kart, TrackType.Auto, TrackType.Universal],
        },
        name: { type: String, required: true },
        configs: [
          {
            type: Schema.Types.ObjectId,
            ref: DbModelName.TrackConfig,
            required: false,
          },
        ],
        photos: [
          {
            type: Schema.Types.ObjectId,
            ref: DbModelName.TrackPhoto,
            required: false,
          },
        ],
        description: {},
        surface: {
          type: String,
          required: false,
          enum: [
            TrackSurface.Asphalt,
            TrackSurface.RaceAsphalt,
            TrackSurface.Concrete,
          ],
        },
        rating: {
          type: Object,
          required: true,
          value: {
            type: Number,
            required: true,
          },
          grades: {
            type: Schema.Types.ObjectId,
            ref: DbModelName.UserTrackGrade,
            required: true,
          },
        },
      }),
    })
  }
}

export const trackModel = new TrackModel()
