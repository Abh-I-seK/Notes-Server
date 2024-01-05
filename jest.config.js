/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch:[ "**/__tests__/**/*.[j]s?(x)", "**/?(*.)+(spec|test).[j]s?(x)" ],
};