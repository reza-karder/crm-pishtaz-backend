import {Router} from "express";
import AuthRouter from "./auth.route.js"

const router = Router();

router.use(AuthRouter)

export default router;