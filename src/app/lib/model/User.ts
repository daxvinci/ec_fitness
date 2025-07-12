import { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  date: Date;
  email: string;
  number: string;
  password?: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String }, // optional
  },
  { timestamps: true }
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
