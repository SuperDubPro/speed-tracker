import mongoose, { Schema } from 'mongoose'
import { type TrackConfig } from '@speed-tracker/common'
import { DbModel } from '@types'

class TrackConfigModel {
  private readonly trackConfigScheme = new Schema<TrackConfig>({
    img: { type: String, required: true },
    description: { type: String, required: false },
    dateStart: { type: String, required: false },
    dateEnd: { type: String, required: false },
  })

  private readonly TrackConfigModel = mongoose.model(
    DbModel.TrackConfig,
    this.trackConfigScheme
  )
}

export const trackModel = new TrackConfigModel()
