import { Router } from "express";
import { catchAsync } from "../utils/errorHandler.js";
import AuthController from "../controllers/auth.controller.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { signinValidator } from "../validators/auth.validator.js";

const router = Router();

router.post("/auth/signin",validateMiddleWare(signinValidator), catchAsync(AuthController.signin));
router.post("/auth/signout", catchAsync(AuthController.signout))

export default router;
