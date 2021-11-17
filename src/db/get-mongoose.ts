const mongoose = require("mongoose");

const connectionString =
  "mongodb://user:password@localhost:27017/db?authSource=admin";

export const getMongoose = () =>
  mongoose.connect(connectionString, {useNewUrlParser: true});
