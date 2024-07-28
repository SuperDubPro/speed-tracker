import mongoose from 'mongoose'
import 'dotenv/config'

import { type DbModelName } from '@types'

import { serverDB } from './serverDB'

export const connectDBForTesting = async (): Promise<typeof mongoose> => {
  return await serverDB.connect(process.env.DB_URL_TST ?? '')
}

export const disconnectDBForTesting = async (): Promise<void> => {
  await serverDB.disconnect()
}

export const dropCollection = async (
  collectionName: DbModelName
): Promise<boolean> => {
  return await mongoose.connection.db.dropCollection(collectionName)
}
