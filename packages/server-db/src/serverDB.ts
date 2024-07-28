import mongoose from 'mongoose'
import {
  userModel,
  userTrackGradeModel,
  trackModel,
  trackConfigModel,
  trackPhotoModel,
} from './models'

class ServerDB {
  private db: typeof mongoose | null = null

  user: typeof userModel
  userTrackGrade: typeof userTrackGradeModel
  track: typeof trackModel
  trackConfig: typeof trackConfigModel
  trackPhoto: typeof trackPhotoModel

  constructor() {
    this.user = userModel
    this.userTrackGrade = userTrackGradeModel
    this.track = trackModel
    this.trackConfig = trackConfigModel
    this.trackPhoto = trackPhotoModel
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

export const serverDB = new ServerDB()
