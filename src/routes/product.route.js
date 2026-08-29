import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import ProductController from "../controllers/product.controller.js";
import { catchAsync } from "../utils/errorHandler.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createProductValidator } from "../validators/product.validator.js";

const router = Router();

// =========================================
// admin role routes
// =========================================

router.get(
	"/products",
	requireAuthMiddleWare,
	requireRoleMiddleWare("admin"),
	catchAsync(ProductController.getAllProducts)
);

router.post(
  "/products",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  validateMiddleWare(createProductValidator),
  catchAsync(ProductController.createProduct)
)

export default router;
