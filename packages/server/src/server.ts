import path from 'path'
import express from 'express'
import { staticPath } from '@speed-tracker/client'
import serverDB from '@speed-tracker/server-db'
import 'dotenv/config'

import { userRouter } from './api'

const staticOptions = {
  portNum: process.env.PORT,
}

export const app = express()

app
  .use(express.static(path.resolve('../client', staticPath)))
  .listen(staticOptions.portNum)

serverDB.connect(process.env.DB_URL ?? '').catch((err) => {
  console.error(err)
})

app.use(userRouter)
