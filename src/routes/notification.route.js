import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
import NotificationController from "../controllers/notification.controller.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

// =====================================
// puclic route
// =====================================
router.get(
	"/notifications",
	requireAuthMiddleWare,
	catchAsync(NotificationController.getAllNotifications)
);

export default router;
