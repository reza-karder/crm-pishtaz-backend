import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import CallController from "../controllers/call.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createCallValidator } from "../validators/call.validator.js";

const router = Router();

// ======================================
// public routes
// ======================================
router.get("/calls/me", requireAuthMiddleWare, CallController.getAllOwnCalls);
router.get("/calls/:id", requireAuthMiddleWare, CallController.getSingleCall);
router.post(
	"/calls",
	requireAuthMiddleWare,
	validateMiddleWare(createCallValidator),
	CallController.createCall
);

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
