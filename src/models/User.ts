import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  phoneNumber: string;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 85
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      maxLength: 18
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
