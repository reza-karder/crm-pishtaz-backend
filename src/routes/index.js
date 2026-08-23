import {Router} from "express";
import AuthRouter from "./auth.route.js"
import UserRouter from "./user.route.js"

const router = Router();

router.use(AuthRouter, UserRouter)

export default router;