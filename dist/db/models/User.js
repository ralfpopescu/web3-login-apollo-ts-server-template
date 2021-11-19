"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
//@ts-ignore
var mongoose_timestamp_1 = __importDefault(require("mongoose-timestamp"));
var UserSchema = new Schema({
    id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
    publicAddress: {
        type: String,
        required: true,
    },
    nonce: {
        type: String,
        required: true,
    },
    audiusUserId: {
        type: String,
        required: true,
    },
}, {
    collection: "users",
});
UserSchema.plugin(mongoose_timestamp_1.default);
UserSchema.index({ createdAt: 1, updatedAt: 1 });
exports.User = mongoose_1.default.model("User", UserSchema);
