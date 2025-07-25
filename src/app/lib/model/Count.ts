import { model, models, Schema } from "mongoose";
import { CounterProps } from "../types";

const GymStatsSchema = new Schema<CounterProps>({
  date: { type: String, required: true, unique: true }, // e.g. "2025-07-25"
  total: { type: Number, default: 0 },
  current: { type: Number, default: 0 },
});

const Count = models.Count || model<CounterProps>("Count", GymStatsSchema);

export default Count