const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|jsx?|tsx?)$',
  moduleNameMapper: {
    // '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/jest-vue-preprocessor',
    '.(ts|tsx)': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    '.*': '<rootDir>/node_modules/babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/test/e2e'],
  // snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**'
  ]
}
