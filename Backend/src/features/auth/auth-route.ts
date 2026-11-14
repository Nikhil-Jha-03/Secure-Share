import { Router } from "express";
import authController from "./auth-controller.ts";

const router = Router();

router.post("/login",authController.login);
router.post("/register",authController.register);

const authRouter = router;

export default authRouter;
