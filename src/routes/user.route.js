import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { updatePasswordValidator, updateUserValidator } from "../validators/user.validator.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

// ===========================================
// employee role routes
// ===========================================
router.patch(
	"/users/me",
	requireAuthMiddleWare,
	validateMiddleWare(updateUserValidator),
	catchAsync(UserController.updateUser)
);

router.patch(
	"/users/me/password",
	requireAuthMiddleWare,
	validateMiddleWare(updatePasswordValidator),
	catchAsync(UserController.updatePassword)
);

router.get(
  "/users/me/stats", 
  requireAuthMiddleWare, 
  catchAsync(UserController.getOwnStats)
)

// ===========================================
// admin role routes
// ===========================================
router.post(
	"/users/ban/:id",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(UserController.banUser)
);

router.get(
  "/users/all",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  catchAsync(UserController.getAllUsers)
)

router.get(
  "/users/:id",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  catchAsync(UserController.getUserStats)
)

// ===========================================
// public routes
// ===========================================
router.get(
  "/users/active", 
  requireAuthMiddleWare, 
  catchAsync(UserController.getAllActiveUsers)
);

export default router;
