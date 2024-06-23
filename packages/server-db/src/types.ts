import { type EmptyObject } from '@speed-tracker/common'
import { type Types, type Document } from 'mongoose'

export enum DbModel {
  TrackConfig = 'TrackConfig',
  TrackPhoto = 'TrackPhoto',
  UserTrackGrade = 'UserTrackGrade',
  TrackRating = 'TrackRating',
  Track = 'Track',
}

// eslint-disable-next-line @typescript-eslint/ban-types -- особенность типов mongoose, другие варианты пустого объекта не воспринимает
export type MongooseSaveModel<T> = Document<unknown, {}, T> &
  T & {
    _id: Types.ObjectId
  }

export type MongooseModel<T> =
  | (Document<unknown, EmptyObject, T> &
      T & {
        _id: Types.ObjectId
      })
  | null
