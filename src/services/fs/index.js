const fs = require('fs');
const path = require('path');

const getChildPaths = (directory) => fs.readdirSync(directory).map(
  files => path.join(directory, files),
);

const concatFiles = (directory) => getChildPaths(directory)
  .map(p => fs.readFileSync(p, { encoding: 'utf-8' }))
  .reduce((acc, file) => `${acc}\n${file}`);

module.exports = { getChildPaths, concatFiles };
