import { Router } from "express";
import { translate } from "../controllers/shakespeareControllers.js";

const router = Router();

router.post("/translate", translate);

export default router;