import type {Config} from 'jest'
import {pathsToModuleNameMapper} from 'ts-jest'
const tsConfigFile = require('./tsconfig')

const compilerOptions = tsConfigFile.compilerOptions

const jestConfig: Config = {
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  rootDir: process.cwd(),
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // Automatically clear mock calls and instances between every test
  setupFiles: ['<rootDir>/spec/setup.ts'],

  clearMocks: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
  },
}

export default jestConfig
