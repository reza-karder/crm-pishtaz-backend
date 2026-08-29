import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import JobController from "../controllers/job.controller.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

// ==============================
// admin role routes
// ==============================
router.get(
	"/jobs",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(JobController.getAllJobs)
);

export default router;
