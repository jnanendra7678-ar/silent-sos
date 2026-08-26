import type { Request, Response } from "express";
import User from "../models/User.js";
import { z } from "zod";
const updateSchema = z.object({ name: z.string().trim().min(2).max(100).optional(), email: z.string().trim().email().optional() });
export async function getProfile(req: Request, res: Response) {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ success:false, message:"User not found" });
  return res.json({ success:true, message:"Profile retrieved", data:user });
}
export async function updateProfile(req: Request, res: Response) {
  const data = updateSchema.parse(req.body);
  if (data.email) {
    const exists = await User.findOne({ email:data.email, _id:{ $ne:req.userId } });
    if (exists) return res.status(409).json({ success:false, message:"Email already in use" });
  }
  const user = await User.findByIdAndUpdate(req.userId, data, { new:true, runValidators:true }).select("-password");
  return res.json({ success:true, message:"Profile updated", data:user });
}
