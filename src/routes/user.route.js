import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
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
)

export default router;
