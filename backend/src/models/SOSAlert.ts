import mongoose, { Document, Schema, Types } from "mongoose";
export type SOSStatus = "active" | "resolved" | "cancelled";
export interface ISOSAlert extends Document {
  user: Types.ObjectId; status: SOSStatus; message?: string;
  latitude?: number; longitude?: number; accuracy?: number;
  createdAt: Date; resolvedAt?: Date;
}
const schema = new Schema<ISOSAlert>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  status: { type: String, enum: ["active","resolved","cancelled"], default: "active", index: true },
  message: { type: String, maxlength: 500 },
  latitude: { type: Number, min: -90, max: 90 },
  longitude: { type: Number, min: -180, max: 180 },
  accuracy: { type: Number, min: 0 },
  resolvedAt: Date
}, { timestamps: true });
export default mongoose.model<ISOSAlert>("SOSAlert", schema);
