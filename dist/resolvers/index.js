"use strict";
var merge = require('lodash.merge');
var User = require('./User');
var Auth = require('./Auth');
var resolvers = merge(User, Auth);
module.exports = resolvers;
