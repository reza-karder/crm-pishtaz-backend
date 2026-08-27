import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
import CallController from "../controllers/call.controller.js";

const router = Router()

// ======================================
// public routes
// ======================================
router.get("/calls/me", requireAuthMiddleWare, CallController.getAllOwnCalls)

export default router