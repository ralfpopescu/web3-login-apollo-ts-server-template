const merge = require('lodash.merge');

const User = require('./User');
const Auth = require('./Auth');

const resolvers = merge(
  User,
  Auth,
);

module.exports = resolvers;
