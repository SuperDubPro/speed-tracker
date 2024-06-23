const path = require('path')
const moduleNameMapper = require('jest-module-name-mapper').default
const serverDbPackage = require('./packages/server-db/package.json')

process.env.NODE_ENV = 'UNITTEST'

module.exports = {
  projects: [
    {
      testEnvironment: 'node',
      displayName: { name: serverDbPackage.name, color: 'blue' },
      preset: 'ts-jest/presets/js-with-ts',
      rootDir: './packages/server-db',
      moduleNameMapper: moduleNameMapper(path.resolve(__dirname, './packages/server-db/tsconfig.json')),
      transform: {
        '^.+\\.(ts|tsx)?$': ['ts-jest', {
          tsconfig: '<rootDir>/tsconfig.json'
        }],    
      },
      clearMocks: true,
      setupFiles: ["<rootDir>/test/jestSetup.ts"]
    },
  ],
}
