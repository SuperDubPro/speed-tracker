import { type IdType } from './common'

export interface Team {
  id: IdType
  name: string
  users: IdType[]
  description?: string
}
