import { Router } from "express";
import { translate } from "../controllers/shakespeareControllers.js";

const router = Router();

router.get("/translate", translate);

export default router;