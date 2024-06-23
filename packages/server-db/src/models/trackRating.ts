import mongoose, { Schema } from 'mongoose'
import { type TrackRating } from '@speed-tracker/common'
import { DbModel } from '@types'

class TrackRatingModel {
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

  private readonly TrackRatingScheme = mongoose.model(
    DbModel.TrackConfig,
    this.trackRatingScheme
  )
}

export const trackModel = new TrackRatingModel()
