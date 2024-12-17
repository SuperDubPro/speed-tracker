import { type AnyObject } from '../common'

export interface ResSuccess<T> {
  success: true
  data: T
}

export interface ResError {
  success: false
  error?: string | AnyObject
}

export type Res<T> = ResSuccess<T> | ResError
