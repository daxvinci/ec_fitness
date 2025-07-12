import mongoose from "mongoose";

if (!process.env.DB_CONNECTION_STRING) {
  throw new Error("DB_CONNECTION_STRING not defined!");
}

const MONGODB_URI = process.env.DB_CONNECTION_STRING;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
