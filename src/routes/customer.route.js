import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { catchAsync } from "../utils/errorHandler.js";
import CustomerController from "../controllers/customer.controller.js";
import {
	createCustomerValidator,
	customerQueryParamsValidator,
	deleteManyCustomersValidator,
	transferCustomerValidator,
	updateCustomerValidator,
} from "../validators/customer.validator.js";

const router = Router();

// =================================================
// admin role routes
// =================================================
router.get(
  "/customers",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  catchAsync(CustomerController.getAllCustomers)
)

// =================================================
// public routes
// =================================================
router.get(
  "/customers/me",
  requireAuthMiddleWare,
  validateMiddleWare(customerQueryParamsValidator, "query"),
  catchAsync(CustomerController.getAllOwnCustomers)
)

router.get(
  "/customers/:id",
  requireAuthMiddleWare,
  catchAsync(CustomerController.getSingleCustomer)
)

router.post(
	"/customers",
	requireAuthMiddleWare,
	validateMiddleWare(createCustomerValidator),
	catchAsync(CustomerController.createCustomer)
);

router.patch(
	"/customers/:id",
	requireAuthMiddleWare,
	validateMiddleWare(updateCustomerValidator),
	catchAsync(CustomerController.updateCustomer)
);

router.delete(
	"/customers/:id",
	requireAuthMiddleWare,
	catchAsync(CustomerController.deleteSingleCustomer)
);

router.post(
  "/customers/delete-many",
  requireAuthMiddleWare,
  validateMiddleWare(deleteManyCustomersValidator),
  catchAsync(CustomerController.deleteManyCustomers)
)

router.post(
  "/customers/transfer",
  requireAuthMiddleWare,
  validateMiddleWare(transferCustomerValidator),
  catchAsync(CustomerController.transferSingleCustomer)
)

export default router;
