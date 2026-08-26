import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import * as c from "../controllers/sos.controller.js";
const router=Router(); router.use(authenticate); router.post("/",c.create); router.get("/",c.history); router.get("/active",c.active); router.patch("/:id/resolve",c.resolve); export default router;
