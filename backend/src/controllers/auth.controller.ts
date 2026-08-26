import type { Request, Response } from "express";

import {
  registerSchema,
  loginSchema,
} from "../validators/auth.validator.js";

import {
  registerUser,
  loginUser,
  getUserById,
} from "../services/auth.service.js";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const input = registerSchema.parse(req.body);

    const result = await registerUser(input);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Invalid registration data",
        errors: error.issues,
      });
    }

    if (
      error?.code === 11000 ||
      error?.message?.includes("already exists")
    ) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create account",
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const input = loginSchema.parse(req.body);

    const result = await loginUser(input);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: "Invalid login data",
        errors: error.issues,
      });
    }

    if (error?.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
}

export async function me(
  req: Request,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await getUserById(req.userId);

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error: any) {
    if (error?.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get user",
    });
  }
}