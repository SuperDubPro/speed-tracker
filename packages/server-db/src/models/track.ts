import mongoose, { Schema } from 'mongoose'
import {
  type TrackConfig,
  type Track,
  type TrackPhoto,
  type TrackRating,
  TrackSurface,
  TrackType,
} from '@speed-tracker/common'
import { DbModel } from '@types'

class TrackModel {
  private readonly trackConfigScheme = new Schema<TrackConfig>({
    img: { type: String, required: true },
    description: { type: String, required: false },
    dateStart: { type: String, required: false },
    dateEnd: { type: String, required: false },
  })

  private readonly trackPhotoScheme = new Schema<TrackPhoto>({
    img: { type: String, required: true },
    description: { type: String, required: false },
  })

  private readonly trackRatingScheme = new Schema<TrackRating>({
    value: { type: Number, required: true },
    grades: [
      {
        type: Schema.Types.ObjectId,
        ref: DbModel.UserTrackGrade,
        required: true,
      },
    ],
  })

  private readonly trackScheme = new Schema<Track>({
    type: {
      type: String,
      required: true,
      enum: [TrackType.kart, TrackType.auto, TrackType.universal],
    },
    name: { type: String, required: true },
    configs: [
      {
        type: Schema.Types.ObjectId,
        ref: DbModel.TrackConfig,
        required: false,
      },
    ],
    photos: [
      { type: Schema.Types.ObjectId, ref: DbModel.TrackPhoto, required: false },
    ],
    description: {},
    surface: {
      type: String,
      required: false,
      enum: [
        TrackSurface.asphalt,
        TrackSurface.raceAsphalt,
        TrackSurface.concrete,
      ],
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: DbModel.TrackRating,
      required: true,
    },
  })

  private readonly TrackConfigModel = mongoose.model(
    DbModel.TrackConfig,
    this.trackConfigScheme
  )

  private readonly TrackPhotoModel = mongoose.model(
    DbModel.TrackPhoto,
    this.trackPhotoScheme
  )

  private readonly TrackRatingScheme = mongoose.model(
    DbModel.TrackConfig,
    this.trackRatingScheme
  )

  private readonly TrackScheme = mongoose.model(DbModel.Track, this.trackScheme)
}

export const trackModel = new TrackModel()
