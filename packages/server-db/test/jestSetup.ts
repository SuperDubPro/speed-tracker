import path from 'path'
import * as dotenv from 'dotenv'

const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, '../.env'),
}).parsed

process.env = {
  ...process.env,
  ...dotenvConfig,
}
