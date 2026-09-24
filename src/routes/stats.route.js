import { Router  } from "express";
import { requireAuthMiddleWare, requireRoleMiddleWare } from "../middlewares/auth.middleware.js";
import StatsController from "../controllers/stats.controller.js";

const router = Router()

// ======================================
// admin routes
// ======================================
router.get("/stats",
  requireAuthMiddleWare,
  requireRoleMiddleWare("admin"),
  StatsController.getStats
)

export default router