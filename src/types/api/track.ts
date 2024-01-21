import { type IdKeys, type IdType } from './common'

export enum TrackTypes {
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
}

export interface TrackRatingLog {
  userId: IdType
  rate: number
}

export interface Track {
  [IdKeys.mongoose]: IdType
  type: TrackTypes
  name: string
  configs: TrackConfig[]
  photos?: string[]
  description?: string
  surface?: TrackSurface
  rating: {
    value: number
    log?: TrackRatingLog[]
  }
}

// export type PostTrack = Omit<Track, IdKeys.mongoose>
export type PostTrack = Omit<Track, '_id'>

export const track: PostTrack = {
  name: 'MIKS',
  type: TrackTypes.kart,
  configs: [{ img: 'rgdjhgf-hjkg-wqF-WASFDGX-EFDSG' }],
  rating: {
    value: 0
  }
}
