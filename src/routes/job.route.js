import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import JobController from "../controllers/job.controller.js";
import { catchAsync } from "../utils/errorHandler.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createJobValidator, jobsQueryValidator, updateJobValidator } from "../validators/job.validator.js";

const router = Router();

router.get(
	"/jobs/all",
	requireAuthMiddleWare,
	catchAsync(JobController.getAllJobs)
);

// ==============================
// admin role routes
// ==============================
router.get(
	"/jobs",
	requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  validateMiddleWare(jobsQueryValidator, "query"),
	catchAsync(JobController.getAdminJobs)
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
