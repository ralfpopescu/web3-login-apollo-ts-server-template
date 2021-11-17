"use strict";
var fs = require("fs");
var path = require("path");
var getChildPaths = function (directory) {
    return fs
        .readdirSync(directory)
        .map(function (files) { return path.join(directory, files); });
};
var concatFiles = function (directory) {
    return getChildPaths(directory)
        .map(function (p) { return fs.readFileSync(p, { encoding: "utf-8" }); })
        .reduce(function (acc, file) { return acc + "\n" + file; });
};
module.exports = { getChildPaths: getChildPaths, concatFiles: concatFiles };
