import type { Request, Response } from "express";
import authService from "./auth-service.ts";
import { errorResponse , successResponse } from "../../utils/responses.ts";

// send req.body data from here pass throung this function
const authController = {
    login: async (req: Request, res: Response) => {

        // loginService({email,pass})
        const result = await authService.loginService(req, res);
        if (result.success) {
            successResponse(res, 200, result.message, result.data);
        } else {
            errorResponse(res, 400, result.message, result.errors);
        }
    },
    register: async (req: Request, res: Response) => {
        const result = await authService.registerService(req, res);
        if (result.success) {
            successResponse(res, 201, result.message, result.data);
        } else {
            errorResponse(res, 400, result.message, result.errors);
        }
    }
}

export default authController;