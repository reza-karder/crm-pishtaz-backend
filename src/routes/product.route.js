import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import ProductController from "../controllers/product.controller.js";
import { catchAsync } from "../utils/errorHandler.js";
import validateMiddleWare from "../middlewares/validate.middleware.js";
import { createProductValidator, productsQueryValidator, updateProductValidator } from "../validators/product.validator.js";

const router = Router();


router.get(
	"/products/all",
	requireAuthMiddleWare,
	catchAsync(ProductController.getAllProducts)
);

// =========================================
// admin role routes
// =========================================
router.get(
  "/products",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  validateMiddleWare(productsQueryValidator, "query"),
  catchAsync(ProductController.getAdminProducts)
)

router.post(
  "/products",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  validateMiddleWare(createProductValidator),
  catchAsync(ProductController.createProduct)
)

router.patch(
  "/products/:id",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  validateMiddleWare(updateProductValidator),
  catchAsync(ProductController.updateProduct)
)

router.delete(
  "/products/:id",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  catchAsync(ProductController.deleteProduct)
)

export default router;
