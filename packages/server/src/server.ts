import path from 'path'
import express from 'express'
import { staticPath } from '@speed-tracker/client'

const staticOptions = {
  portnum: 8080,
}

export const app = express()

app
  .use(express.static(path.resolve('../client', staticPath)))
  .listen(staticOptions.portnum)
