import Contact from "../models/Contact.js";
export const listContacts = (userId: string) => Contact.find({ user: userId }).sort({ createdAt: -1 });
export const createContact = (userId: string, data: any) => Contact.create({ ...data, user: userId });
export async function updateContact(userId: string, id: string, data: any) {
  return Contact.findOneAndUpdate({ _id: id, user: userId }, data, { new: true, runValidators: true });
}
export const deleteContact = (userId: string, id: string) => Contact.findOneAndDelete({ _id: id, user: userId });
