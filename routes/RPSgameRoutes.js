import { Router } from "express";
import { sendJugar } from "../controllers/RPSgameControllers.js";

const router = Router();

router.post("/jugarRPS", sendJugar);

export default router;