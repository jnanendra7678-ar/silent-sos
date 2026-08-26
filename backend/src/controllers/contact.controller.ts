import type { Request, Response } from "express";
import { contactSchema, contactUpdateSchema } from "../validators/contact.validator.js";
import * as service from "../services/contact.service.js";
export async function list(req: Request,res:Response){ return res.json({success:true,data:await service.listContacts(req.userId!)}); }
export async function create(req: Request,res:Response){ return res.status(201).json({success:true,message:"Contact added",data:await service.createContact(req.userId!,contactSchema.parse(req.body))}); }
export async function update(req: Request, res: Response) {
  const id = String(req.params.id);

  const c = await service.updateContact(
    req.userId!,
    id,
    contactUpdateSchema.parse(req.body)
  );

  if (!c) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  return res.json({
    success: true,
    message: "Contact updated",
    data: c,
  });
}

export async function remove(req: Request, res: Response) {
  const id = String(req.params.id);

  const c = await service.deleteContact(
    req.userId!,
    id
  );

  if (!c) {
    return res.status(404).json({
      success: false,
      message: "Contact not found",
    });
  }

  return res.json({
    success: true,
    message: "Contact deleted",
  });
}