"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');
var UserSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
}, {
    collection: 'users',
});
UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });
exports.User = mongoose.model('User', UserSchema);
