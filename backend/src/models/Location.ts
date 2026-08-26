import mongoose, { Document, Schema, Types } from "mongoose";
export interface ILocation extends Document {
  user: Types.ObjectId; sos?: Types.ObjectId; latitude: number; longitude: number; accuracy?: number; timestamp: Date;
}
const schema = new Schema<ILocation>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  sos: { type: Schema.Types.ObjectId, ref: "SOSAlert" },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  accuracy: { type: Number, min: 0 },
  timestamp: { type: Date, default: Date.now, index: true }
});
export default mongoose.model<ILocation>("Location", schema);
