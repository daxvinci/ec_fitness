import { Schema, models, model } from "mongoose";
import { UserDetails } from "../types";



const UserSchema = new Schema<UserDetails>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startDate: { type: Date, default: Date.now, required: true },
    endDate: {
      type: Date,
      default: function () {
        const start = this.startDate || new Date();
        return new Date( (typeof start === "string" ? new Date(start) : start).getTime() + 30 * 24 * 60 * 60 * 1000);
      },
      required: true,
    },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String }, // optional
    admin:{type:Boolean, default:false},
    role:{type:String,default:"user"},
    membership:{type:String},
    amount:{type:Number},
    trainer:{type:String,default:""},
    status:{type:String,default:""},
    expired:{type:Boolean}
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
