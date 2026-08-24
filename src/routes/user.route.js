import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { updatePasswordValidator, updateUserValidator } from "../validators/user.validator.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

router.patch(
	"/user",
	requireAuthMiddleWare,
	validateMiddleWare(updateUserValidator),
	catchAsync(UserController.updateUser)
);

router.patch(
	"/user/password",
	requireAuthMiddleWare,
	validateMiddleWare(updatePasswordValidator),
	catchAsync(UserController.updatePassword)
);

router.post(
	"/user/ban/:id",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(UserController.banUser)
);

router.get(
  "/user/active", 
  requireAuthMiddleWare, 
  catchAsync(UserController.getAllActiveUsers)
);

router.get(
  "/user/all",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  catchAsync(UserController.getAllUsers)
)

export default router;
