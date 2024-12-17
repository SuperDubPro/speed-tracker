import { Schema } from 'mongoose'
import { type Team } from '@speed-tracker/common'
import { DbModelName } from '@/types'
import { BaseModel } from '../baseModel'

class TeamModel extends BaseModel<Team> {
  constructor() {
    super({
      dbModelName: DbModelName.Team,
      schema: new Schema<Team>({
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        users: { type: [String], required: true },
        description: { type: String, required: false },
      }),
    })
  }
}

export const teamModel = new TeamModel()
