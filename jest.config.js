/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.(ts)$': 'ts-jest',
    },
    testMatch: ["**/tests/**/*.test.(ts|js)"],
    testTimeout: 30000, // 30 segundos
};