import { type IdType, type SimpleEstimation } from './common'

export enum TrackHumidity {
  Dry = 'dry',
}

export interface LapConditions {
  trackHumidity?: TrackHumidity | SimpleEstimation
  traffic?: SimpleEstimation
}

export interface LapTime {
  id: IdType
  userId: IdType
  trackId: IdType
  trackConfigId: IdType
  time: string
  teamId?: string
  conditions: LapConditions
}
