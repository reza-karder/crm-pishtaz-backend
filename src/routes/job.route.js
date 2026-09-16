import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import JobController from "../controllers/job.controller.js";
import { catchAsync } from "../utils/errorHandler.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createJobValidator, updateJobValidator } from "../validators/job.validator.js";

const router = Router();

// ==============================
// admin role routes
// ==============================
router.get(
	"/jobs",
	requireAuthMiddleWare,
	catchAsync(JobController.getAllJobs)
);

router.post(
	"/jobs",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
  validateMiddleWare(createJobValidator),
	catchAsync(JobController.createJob)
);

router.patch(
	"/jobs/:id",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
  validateMiddleWare(updateJobValidator),
	catchAsync(JobController.updateJob)
);

router.delete(
	"/jobs/:id",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(JobController.deleteJob)
);

export default router;
