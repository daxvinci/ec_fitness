import { Schema, Document, models, model } from "mongoose";

export interface IAdmin extends Document {
  name: string;
  password: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);

export default Admin;
