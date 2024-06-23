import mongoose, { Schema } from 'mongoose'
import { type TrackPhoto } from '@speed-tracker/common'
import { DbModel } from '@types'

class TrackPhotoModel {
  private readonly trackPhotoScheme = new Schema<TrackPhoto>({
    img: { type: String, required: true },
    description: { type: String, required: false },
  })

  private readonly TrackPhotoModel = mongoose.model(
    DbModel.TrackPhoto,
    this.trackPhotoScheme
  )
}

export const trackModel = new TrackPhotoModel()
