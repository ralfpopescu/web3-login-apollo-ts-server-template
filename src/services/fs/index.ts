const fs = require("fs");
const path = require("path");

const getChildPaths = (directory: string) =>
  fs
    .readdirSync(directory)
    .map((files: string[]) => path.join(directory, files));

const concatFiles = (directory: string) =>
  getChildPaths(directory)
    .map((p: string) => fs.readFileSync(p, {encoding: "utf-8"}))
    .reduce((acc: string, file: string) => `${acc}\n${file}`);

module.exports = {getChildPaths, concatFiles};
