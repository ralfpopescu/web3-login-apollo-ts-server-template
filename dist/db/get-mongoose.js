"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoose = void 0;
var mongoose = require("mongoose");
var connectionString = "mongodb://user:password@localhost:27017/db?authSource=admin";
var getMongoose = function () {
    return mongoose.connect(connectionString, { useNewUrlParser: true });
};
exports.getMongoose = getMongoose;
