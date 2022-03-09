const { parse } = require("comment-json");
const fs = require("node:fs");
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = parse(fs.readFileSync("tsconfig.json").toString());
const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths);

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["dist"],
  rootDir: "./",
  modulePaths: ["<rootDir>/"],
  moduleNameMapper,
  verbose: true,
};
