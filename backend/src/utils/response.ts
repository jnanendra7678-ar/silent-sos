import type { Response } from "express";
export function success(res: Response, message: string, data?: unknown, status = 200) {
  return res.status(status).json({ success: true, message, ...(data !== undefined ? { data } : {}) });
}
export function failure(res: Response, message: string, status = 400) {
  return res.status(status).json({ success: false, message });
}
