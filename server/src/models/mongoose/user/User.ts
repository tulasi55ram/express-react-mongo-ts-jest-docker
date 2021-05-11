import { Model, model, Schema } from "mongoose";
import { IUserDoc } from "./types";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  password: String,
  role: String,
  avatar: String,
  time: {
    type: Date,
    default: Date.now,
  },
});

export const User: Model<IUserDoc> = model<IUserDoc>("User", UserSchema);
