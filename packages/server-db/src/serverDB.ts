import mongoose from 'mongoose'
import 'dotenv/config'

import { type DbModelName } from '@types'

import {
  userModel,
  userTrackGradeModel,
  trackModel,
  trackConfigModel,
  trackPhotoModel,
  teamModel,
  lapTimeModel,
} from './models'

class ServerDB {
  private db: typeof mongoose | null = null

  user: typeof userModel
  userTrackGrade: typeof userTrackGradeModel
  track: typeof trackModel
  trackConfig: typeof trackConfigModel
  trackPhoto: typeof trackPhotoModel
  team: typeof teamModel
  lapTime: typeof lapTimeModel

  test: TestDB

  constructor() {
    this.user = userModel
    this.userTrackGrade = userTrackGradeModel
    this.track = trackModel
    this.trackConfig = trackConfigModel
    this.trackPhoto = trackPhotoModel
    this.team = teamModel
    this.lapTime = lapTimeModel

    this.test = new TestDB(this)
  }

  async connect(uri: string): Promise<typeof mongoose> {
    try {
      this.db = await mongoose.connect(uri)
      return this.db
    } catch (error) {
      console.error('Error connecting to mongo\n', error)
      return await Promise.reject(error)
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.error('DB disconnect error\n', error)
    }
  }
}

class TestDB {
  that: ServerDB

  constructor(that: ServerDB) {
    this.that = that
  }

  async connect(): Promise<typeof mongoose> {
    if (process.env.DB_URL_TST === undefined) {
      throw new Error('Отсутствует DB_URL_TST в .env!')
    }
    return await this.that.connect(process.env.DB_URL_TST)
  }

  async disconnect(): Promise<void> {
    await this.that.disconnect()
  }

  async dropCollection(collectionName: DbModelName): Promise<boolean> {
    return await mongoose.connection.db.dropCollection(collectionName)
  }
}

export const serverDB = new ServerDB()
