import { Schema } from 'mongoose'
import { type TrackPhoto } from '@speed-tracker/common'
import { DbModelName } from '@types'
import { BaseModel } from '../baseModel'

class TrackPhotoModel extends BaseModel<TrackPhoto> {
  constructor() {
    super({
      dbModelName: DbModelName.TrackPhoto,
      schema: new Schema<TrackPhoto>({
        id: { type: String, required: true, unique: true },
        description: { type: String, required: false },
        date: { type: String, required: false },
      }),
    })
  }
}

export const trackPhotoModel = new TrackPhotoModel()
