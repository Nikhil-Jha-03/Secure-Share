import authRouter from "../../features/auth/auth-route.ts";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);


export default router;
