import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import CallController from "../controllers/call.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { updateCallValidator } from "../validators/call.validator.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

// ======================================
// public routes
// ======================================
router.patch(
	"/calls/:id",
	requireAuthMiddleWare,
	validateMiddleWare(updateCallValidator),
	catchAsync(CallController.updateCall)
);
router.delete(
  "/calls/:id",
  requireAuthMiddleWare,
  catchAsync(CallController.deleteCall)
)

export default router;
