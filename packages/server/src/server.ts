import path from 'path'
import express from 'express'
import { staticPath } from '@speed-tracker/client'
import serverDB from '@speed-tracker/server-db'
import 'dotenv/config'

const staticOptions = {
  portNum: process.env.PORT,
}

export const app = express()

app
  .use(express.static(path.resolve('../client', staticPath)))
  .listen(staticOptions.portNum)

serverDB
  .connect(process.env.DB_URL ?? '')
  .then(async () => {
    console.log(`DB ${process.env.DB_URL} Connected Successfully`)
    try {
      const data = await serverDB.userTrackGrade.create({
        userId: 'qwewer',
        grade: 3,
      })
      console.log(data)
    } catch (error) {
      console.error('createUserTrackGrade error\n', error)
    }
  })
  .catch((err) => {
    console.error(err)
  })
