import { type IdKeys, type IdType } from './common'

export enum UserRoles {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

export enum TeamRoles {
  manager = 'manager',
  racer = 'racer',
}

export interface User {
  [IdKeys.mongoose]: IdType
  role: UserRoles
  nickName: string
  name?: string
  surname?: string
  teams?: Array<{ teamId: IdType, teamRole: TeamRoles }>
}

// export type PostUser = Omit<User, IdKeys.mongoose>
export type PostUser = Omit<User, '_id'>
