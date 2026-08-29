import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import JobController from "../controllers/job.controller.js";
import { catchAsync } from "../utils/errorHandler.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createJobValidator } from "../validators/job.validator.js";

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

router.post(
	"/jobs",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
  validateMiddleWare(createJobValidator),
	catchAsync(JobController.createJob)
);

export default router;
