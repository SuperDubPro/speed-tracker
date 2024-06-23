import { type IdType } from './common'

export enum TrackType {
  kart = 'kart',
  auto = 'auto',
  universal = 'universal',
}

export enum TrackSurface {
  asphalt = 'asphalt',
  raceAsphalt = 'raceAsphalt',
  concrete = 'concrete',
}

export interface TrackConfig {
  img: string
  description?: string
  dateStart?: string
  dateEnd?: string
}

export interface TrackPhoto {
  img: string
  description?: string
  date?: string
}

export interface UserTrackGrade {
  gradeId: IdType
  userId: IdType
  grade: number
}

export type UserTrackGradeCreate = Omit<UserTrackGrade, 'gradeId'>

export interface TrackRating {
  value: number
  grades: UserTrackGrade[]
}

export interface Track {
  // [IdKeys.mongoose]: IdType
  id: IdType
  type: TrackType
  name: string
  configs?: TrackConfig[]
  photos?: TrackPhoto[]
  description?: string
  surface?: TrackSurface
  rating: TrackRating
}

// export type PostTrack = Omit<Track, IdKeys.mongoose>
// export type PostTrack = Omit<Track, '_id'>

// export const track: PostTrack = {
//   name: 'MIKS',
//   type: TrackType.kart,
//   configs: [{ img: 'rgdjhgf-hjkg-wqF-WASFDGX-EFDSG' }],
//   rating: {
//     value: 0,
//   },
// }
