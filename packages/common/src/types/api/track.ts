import { type IdType } from './common'

export enum TrackType {
  Kart = 'kart',
  Auto = 'auto',
  Universal = 'universal',
}

export enum TrackSurface {
  Asphalt = 'asphalt',
  RaceAsphalt = 'raceAsphalt',
  Concrete = 'concrete',
}

export interface TrackConfig {
  id: IdType
  imgs: string[]
  description?: string
  dateStart?: string
  dateEnd?: string
}

export interface TrackPhoto {
  id: IdType
  description?: string
  date?: string
}

export interface UserTrackGrade {
  id: IdType
  userId: IdType
  trackId: IdType
  grade: number
}

export type UserTrackGradeCreate = Omit<UserTrackGrade, 'gradeId'>

export interface TrackRating {
  value: number
  grades: UserTrackGrade[]
}

export interface Track {
  id: IdType
  type: TrackType
  name: string
  rating: TrackRating
  configs?: TrackConfig[]
  photos?: TrackPhoto[]
  description?: string
  surface?: TrackSurface
}
