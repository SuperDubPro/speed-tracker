import { Schema } from 'mongoose'
import { UserRole, type User } from '@speed-tracker/common'
import { DbModelName } from '@types'
import { BaseModel } from '../baseModel'

class UserModel extends BaseModel<User> {
  constructor() {
    super({
      dbModelName: DbModelName.User,
      schema: new Schema<User>({
        id: { type: String, required: true, unique: true },
        role: {
          type: String,
          required: true,
          enum: [UserRole.Admin, UserRole.Moderator, UserRole.User],
        },
        nickName: { type: String, required: true },
        name: { type: String, required: false },
        surname: { type: String, required: false },
        teams: { type: Array, required: false },
      }),
    })
  }
}

export const userModel = new UserModel()
