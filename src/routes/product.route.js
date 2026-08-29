import { Router } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import ProductController from "../controllers/product.controller.js";
import { catchAsync } from "../utils/errorHandler.js";

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

export default router;
