import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { catchAsync } from "../utils/errorHandler.js";
import CustomerController from "../controllers/customer.controller.js";
import {
  addPotentialProductValidator,
	addPurchasedProductValidator,
	createCustomerValidator,
	updateCustomerValidator,
  updatePotentialProductValidator,
  updatePurchasedProductValidator,
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

router.post(
	"/customers/:id/purchased-products",
	requireAuthMiddleWare,
	validateMiddleWare(addPurchasedProductValidator),
	catchAsync(CustomerController.addPurchasedProduct)
);

router.post(
	"/customers/:id/potential-products",
	requireAuthMiddleWare,
	validateMiddleWare(addPotentialProductValidator),
	catchAsync(CustomerController.addPotentialProduct)
);

router.patch(
  "/customers/:customerId/purchased-products/:productId",
  requireAuthMiddleWare,
  validateMiddleWare(updatePurchasedProductValidator),
  catchAsync(CustomerController.updatePurchasedProduct)
)

router.patch(
  "/customers/:customerId/potential-products/:productId",
  requireAuthMiddleWare,
  validateMiddleWare(updatePotentialProductValidator),
  catchAsync(CustomerController.updatePotentialProduct)
)

router.delete(
  "/customers/:customerId/purchased-products/:productId",
  requireAuthMiddleWare,
  catchAsync(CustomerController.deletePurchasedProduct)
)

router.delete(
  "/customers/:customerId/potential-products/:productId",
  requireAuthMiddleWare,
  catchAsync(CustomerController.deletePotentialProduct)
)

export default router;
