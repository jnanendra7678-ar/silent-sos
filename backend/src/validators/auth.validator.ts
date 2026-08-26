import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),

  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please provide a valid email address")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, "Password is required"),
});