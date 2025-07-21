import { Schema, models, model } from "mongoose";
import { UserDetails } from "../types";



const UserSchema = new Schema<UserDetails>(
  {
    name: { type: String, required: true },
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
    subscription:{type:String},
    admin:{type:Boolean, default:false},
    role:{type:String,default:"user"},
    amount:{type:Number},
    trainer:{type:String,default:""},
    daysLeft:{type: Number},
    status: {
      type: String,
      enum: ["active", "paused", "expired","expiring"],
      default: "active"
    },
    active:{type:Boolean},
    expiringSoon:{type:Boolean},
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
