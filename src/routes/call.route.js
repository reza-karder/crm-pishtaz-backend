import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import CallController from "../controllers/call.controller.js";

const router = Router();

// ======================================
// public routes
// ======================================
router.get("/calls/me", requireAuthMiddleWare, CallController.getAllOwnCalls);
router.get("/calls/:id", requireAuthMiddleWare, CallController.getSingleCall)

// ======================================
// admin role routes
// ======================================
router.get(
	"/calls",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	CallController.getAllCalls
);

export default router;
