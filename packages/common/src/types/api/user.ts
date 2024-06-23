import { type IdType } from './common'

export enum UserRole {
  user = 'user',
  moderator = 'moderator',
  admin = 'admin',
}

export enum TeamRole {
  manager = 'manager',
  racer = 'racer',
}

export interface User {
  // [IdKeys.mongoose]: IdType
  id: string
  role: UserRole
  nickName: string
  name?: string
  surname?: string
  teams?: Array<{ teamId: IdType; teamRole: TeamRole }>
}

// export type PostUser = Omit<User, IdKeys.mongoose>
// export type PostUser = Omit<User, '_id'>
