import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import * as c from "../controllers/contact.controller.js";
const router=Router(); router.use(authenticate); router.get("/",c.list); router.post("/",c.create); router.patch("/:id",c.update); router.delete("/:id",c.remove); export default router;
