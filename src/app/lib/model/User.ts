import { Schema, models, model } from "mongoose";
import { UserDetails } from "../types";



const UserSchema = new Schema<UserDetails>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date, default:Date.now, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String }, // optional
  },
  { timestamps: true }
);

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

UserSchema.set("toJSON", {
  virtuals: true,
});


const User = models.User || model<UserDetails>("User", UserSchema);

export default User;
