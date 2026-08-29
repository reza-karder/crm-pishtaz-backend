import { Router } from "express";
import AuthRouter from "./auth.route.js";
import UserRouter from "./user.route.js";
import Customerrouter from "./customer.route.js";
import CallRouter from "./call.route.js";
import NotificationRouter from "./notification.route.js";
import ProductRouter from "./product.route.js";

const router = Router();

router.use(AuthRouter, UserRouter, Customerrouter, CallRouter, NotificationRouter, ProductRouter);

export default router;
