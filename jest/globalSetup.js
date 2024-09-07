import * as cp from 'child_process'
import path from 'path'
import * as dotenv from 'dotenv'

module.exports = async function (globalConfig, projectConfig) {
  // console.log(globalConfig.testPathPattern);
  // console.log(projectConfig.cache);

  const dotenvConfig = dotenv.config({
    path: path.resolve(__dirname, '../.env'),
  }).parsed
  
  process.env = {
    ...process.env,
    ...dotenvConfig,
  }

  cp.execSync('npm run transpile')
};
