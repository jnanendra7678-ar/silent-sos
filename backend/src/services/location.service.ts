import Location from "../models/Location.js";
export const saveLocation = (userId: string, data: any) => Location.create({
  user: userId, latitude: data.latitude, longitude: data.longitude, accuracy: data.accuracy,
  ...(data.sosId ? { sos: data.sosId } : {})
});
export const latestLocation = (userId: string) => Location.findOne({ user: userId }).sort({ timestamp: -1 });
export const locationsForSOS = (userId: string, sosId: string) => Location.find({ user: userId, sos: sosId }).sort({ timestamp: 1 });
