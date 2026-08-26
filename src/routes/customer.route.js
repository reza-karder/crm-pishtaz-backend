import { Router } from "express";
import { requireAuthMiddleWare } from "../middlewares/auth.middleware.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { catchAsync } from "../utils/errorHandler.js";
import CustomerController from "../controllers/customer.controller.js";
import { createUCustomerValidator } from "../validators/customer.validator.js";

const router = Router();

// =================================================
// public routes
// =================================================
router.post(
	"/customers",
	requireAuthMiddleWare,
	validateMiddleWare(createUCustomerValidator),
	catchAsync(CustomerController.createCustomer)
);

export default router;