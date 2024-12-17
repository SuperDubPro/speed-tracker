/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const moduleNameMapper = require('jest-module-name-mapper').default
const commonPackage = require('./packages/common/package.json')
const serverPackage = require('./packages/server/package.json')
const serverDbPackage = require('./packages/server-db/package.json')

process.env.NODE_ENV = 'UNITTEST'

module.exports = {
  globalSetup: path.resolve(__dirname, './jest/globalSetup.js'),
  projects: [
    {
      testEnvironment: 'node',
      displayName: { name: commonPackage.name, color: 'magenta' },
      preset: 'ts-jest/presets/js-with-ts',
      rootDir: './packages/common',
      moduleNameMapper: moduleNameMapper(
        path.resolve(__dirname, './packages/common/tsconfig.json')
      ),
      transform: {
        '^.+\\.(ts|tsx)?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/tsconfig.json',
          },
        ],
      },
      clearMocks: true,
    },
    {
      testEnvironment: 'node',
      displayName: { name: serverPackage.name, color: 'cyan' },
      preset: 'ts-jest/presets/js-with-ts',
      rootDir: './packages/server',
      moduleNameMapper: moduleNameMapper(
        path.resolve(__dirname, './packages/server/tsconfig.json')
      ),
      transform: {
        '^.+\\.(ts|tsx)?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/tsconfig.json',
          },
        ],
      },
      clearMocks: true,
    },
    {
      testEnvironment: 'node',
      displayName: { name: serverDbPackage.name, color: 'blue' },
      preset: 'ts-jest/presets/js-with-ts',
      rootDir: './packages/server-db',
      moduleNameMapper: moduleNameMapper(
        path.resolve(__dirname, './packages/server-db/tsconfig.json')
      ),
      transform: {
        '^.+\\.(ts|tsx)?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/tsconfig.json',
          },
        ],
      },
      clearMocks: true,
    },
  ],
}
