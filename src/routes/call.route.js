import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import CallController from "../controllers/call.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createCallValidator, updateCallValidator } from "../validators/call.validator.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

// ======================================
// public routes
// ======================================
router.get("/calls/me", requireAuthMiddleWare, catchAsync(CallController.getAllOwnCalls));
router.get("/calls/:id", requireAuthMiddleWare, catchAsync(CallController.getSingleCall));
router.post(
	"/calls",
	requireAuthMiddleWare,
	validateMiddleWare(createCallValidator),
	catchAsync(CallController.createCall)
);
router.patch(
	"/calls/:id",
	requireAuthMiddleWare,
	validateMiddleWare(updateCallValidator),
	catchAsync(CallController.updateCall)
);

// ======================================
// admin role routes
// ======================================
router.get(
	"/calls",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(CallController.getAllCalls)
);

export default router;
