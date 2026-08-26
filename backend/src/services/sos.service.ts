import SOSAlert from "../models/SOSAlert.js";
export const createSOS = (userId: string, data: any) => SOSAlert.create({ ...data, user: userId, status: "active" });
export const getActiveSOS = (userId: string) => SOSAlert.find({ user: userId, status: "active" }).sort({ createdAt: -1 });
export const getSOSHistory = (userId: string) => SOSAlert.find({ user: userId }).sort({ createdAt: -1 });
export async function resolveSOS(userId: string, id: string) {
  return SOSAlert.findOneAndUpdate({ _id: id, user: userId, status: "active" }, { status: "resolved", resolvedAt: new Date() }, { new: true });
}
