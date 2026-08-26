import type { Request, Response } from "express";
import { sosSchema } from "../validators/sos.validator.js";
import * as service from "../services/sos.service.js";
import { notifyTrustedContacts } from "../services/notification.service.js";
export async function create(req: Request,res:Response){ const sos=await service.createSOS(req.userId!,sosSchema.parse(req.body)); await notifyTrustedContacts(req.userId!,sos.id); return res.status(201).json({success:true,message:"SOS alert activated",data:sos}); }
export async function active(req: Request,res:Response){ return res.json({success:true,data:await service.getActiveSOS(req.userId!)}); }
export async function history(req: Request,res:Response){ return res.json({success:true,data:await service.getSOSHistory(req.userId!)}); }
export async function resolve(req: Request, res: Response) {
  const id = String(req.params.id);

  const sos = await service.resolveSOS(
    req.userId!,
    id
  );

  if (!sos) {
    return res.status(404).json({
      success: false,
      message: "Active SOS alert not found",
    });
  }

  return res.json({
    success: true,
    message: "SOS alert resolved",
    data: sos,
  });
}