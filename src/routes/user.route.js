import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
import UserController from "../controllers/user.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { updateUserValidator } from "../validators/user.validator.js";
import { catchAsync } from "../utils/errorHandler.js";

const router = Router();

router.patch(
	"/user",
	requireAuthMiddleWare,
	validateMiddleWare(updateUserValidator),
	catchAsync(UserController.updateUser)
);

export default router;
