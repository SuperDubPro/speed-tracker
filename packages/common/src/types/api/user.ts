import { type IdType } from './common'

export enum UserRole {
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
}

export enum TeamRole {
  Manager = 'manager',
  Racer = 'racer',
}

export interface Team {
  teamId: IdType
  teamRole: TeamRole
  users: IdType[]
}
export interface User {
  id: IdType
  role: UserRole
  nickName: string
  name?: string
  surname?: string
  teams?: IdType[]
}
