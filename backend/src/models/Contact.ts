import mongoose, { Document, Schema, Types } from "mongoose";
export interface IContact extends Document {
  user: Types.ObjectId; name: string; phone: string; email?: string; relationship?: string; createdAt: Date; updatedAt: Date;
}
const schema = new Schema<IContact>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  email: { type: String, trim: true, lowercase: true },
  relationship: { type: String, trim: true, maxlength: 50 }
}, { timestamps: true });
export default mongoose.model<IContact>("Contact", schema);
