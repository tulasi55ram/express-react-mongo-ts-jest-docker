module.exports = {
    testPathIgnorePatterns: ["/node_modules", "/dist/"],
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageThreshold: {
      global: {
        branches: 40,
        functions: 60,
        lines: 80
      }
    }
}; 
