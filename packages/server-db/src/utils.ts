import type mongoose from 'mongoose'
import 'dotenv/config'

import { type DbModelName } from '@/types'

import { serverDB } from './serverDB'

export const connectDBForTesting = async (): Promise<typeof mongoose> => {
  return await serverDB.test.connect()
}

export const disconnectDBForTesting = async (): Promise<void> => {
  await serverDB.test.disconnect()
}

export const dropCollection = async (
  collectionName: DbModelName
): Promise<boolean> => {
  return await serverDB.test.dropCollection(collectionName)
}
