import mongoose from "mongoose";
const {Schema} = mongoose;
//@ts-ignore
import timestamps from "mongoose-timestamp";

export interface UserType {
  id: number;
  email: string;
  publicAddress: string;
  nonce: string;
  audiusUserId: string;
}

const UserSchema = new Schema<UserType>(
  {
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
  },
  {
    collection: "users",
  }
);

UserSchema.plugin(timestamps);

UserSchema.index({createdAt: 1, updatedAt: 1});

export const User = mongoose.model<UserType>("User", UserSchema);
