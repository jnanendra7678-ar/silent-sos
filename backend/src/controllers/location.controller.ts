import type { Request, Response } from "express";
import { locationSchema } from "../validators/sos.validator.js";
import * as service from "../services/location.service.js";
export async function create(req: Request,res:Response){ return res.status(201).json({success:true,message:"Location saved",data:await service.saveLocation(req.userId!,locationSchema.parse(req.body))}); }
export async function latest(req: Request,res:Response){ return res.json({success:true,data:await service.latestLocation(req.userId!)}); }
export async function forSOS(req: Request, res: Response) {
  const sosId = String(req.params.sosId);

  return res.json({
    success: true,
    data: await service.locationsForSOS(
      req.userId!,
      sosId
    ),
  });
}