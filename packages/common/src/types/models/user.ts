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

export interface TeamInfo {
  id: IdType
  teamRole: TeamRole
}

export interface User {
  id: IdType
  role: UserRole
  nickName: string
  name?: string
  surname?: string
  teams?: TeamInfo[]
}
