import { Router } from "express";

const router = Router();

router.use("/auth", require("./auth-controller").default);

export default router;