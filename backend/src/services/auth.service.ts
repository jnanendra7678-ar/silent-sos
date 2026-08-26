import User from "../models/User.js";
import {
  hashPassword,
  comparePassword,
} from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import type {
  RegisterInput,
  LoginInput,
  AuthResponse,
} from "../types/auth.types.js";

function sanitizeUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone || "",
  };
}

export async function registerUser(
  input: RegisterInput
): Promise<AuthResponse> {
  const existingUser = await User.findOne({
    email: input.email,
  });

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await hashPassword(input.password);

  const user = await User.create({
    name: input.name,
    email: input.email,
    phone: input.phone || "",
    password: hashedPassword,
  });

  const token = generateToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token,
  };
}

export async function loginUser(
  input: LoginInput
): Promise<AuthResponse> {
  const user = await User.findOne({
    email: input.email,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatches = await comparePassword(
    input.password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  return {
    user: sanitizeUser(user),
    token,
  };
}

export async function getUserById(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return sanitizeUser(user);
}