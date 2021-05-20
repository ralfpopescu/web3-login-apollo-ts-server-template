const mongoose = require('mongoose')

const connectionString = 'mongodb://user:password@localhost:27017/blizzdb?authSource=admin'

const getMongoose = () => mongoose.connect(connectionString, { useNewUrlParser: true });

module.exports = getMongoose;