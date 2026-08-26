import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import * as c from "../controllers/location.controller.js";
const router=Router(); router.use(authenticate); router.post("/",c.create); router.get("/latest",c.latest); router.get("/sos/:sosId",c.forSOS); export default router;
