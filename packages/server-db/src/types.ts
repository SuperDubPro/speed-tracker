import { type EmptyObject } from '@speed-tracker/common'
import { type Document } from 'mongoose'

export enum DbModelName {
  User = 'User',
  Track = 'Track',
  TrackConfig = 'TrackConfig',
  TrackPhoto = 'TrackPhoto',
  UserTrackGrade = 'UserTrackGrade',
  TrackRating = 'TrackRating',
}

// eslint-disable-next-line @typescript-eslint/ban-types -- особенность типов mongoose, другие варианты пустого объекта не воспринимает
export type MongooseSaveModel<T> = Document<unknown, {}, T> &
  T & {
    _id: unknown
    __v?: unknown
  }

export type MongooseModel<T> =
  | (Document<unknown, EmptyObject, T> &
      T & {
        _id: unknown
        __v?: unknown
      })
  | null
