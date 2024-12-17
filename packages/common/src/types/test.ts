import { type Create } from './api'

export interface Mocks<T> {
  read?: { [key in string]: T }
  readAll?: { [key in string]: T[] }
  create: { [key in string]: Create<T> }
}
