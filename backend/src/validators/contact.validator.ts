import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().optional().or(z.literal("")),
  relationship: z.string().trim().max(50).optional()
});
export const contactUpdateSchema = contactSchema.partial();
