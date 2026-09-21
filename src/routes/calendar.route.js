import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
import { catchAsync } from "../utils/errorHandler.js";
import CalendarController from "../controllers/calendar.controller.js";

const router = Router();

router.get(
	"/calendar/calls/:startDate/:endDate",
	requireAuthMiddleWare,
	catchAsync(CalendarController.getCallsInRange)
);

router.get(
  "/calendar/:date",
  requireAuthMiddleWare,
  catchAsync(CalendarController.getCallsOfDay)
)

export default router;
