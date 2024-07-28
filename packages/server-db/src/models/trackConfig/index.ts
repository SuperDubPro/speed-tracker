import { Schema } from 'mongoose'
import { type TrackConfig } from '@speed-tracker/common'
import { DbModelName } from '@types'
import { BaseModel } from '../baseModel'

class TrackConfigModel extends BaseModel<TrackConfig> {
  constructor() {
    super({
      dbModelName: DbModelName.TrackConfig,
      schema: new Schema<TrackConfig>({
        id: { type: String, required: true, unique: true },
        imgs: { type: [String], required: true },
        description: { type: String, required: false },
        dateStart: { type: String, required: false },
        dateEnd: { type: String, required: false },
      }),
    })
  }
}

export const trackConfigModel = new TrackConfigModel()
