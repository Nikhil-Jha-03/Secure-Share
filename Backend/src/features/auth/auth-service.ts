import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/config.ts";
import { prisma } from "../../config/prisma.ts";
import { loginSchema, registerSchema } from "./auth-schema.ts";

export interface ServiceResult {
  success: boolean;
  message: string;
  statusCode?: number;
  data?: {
    user: { id: number; name: string; email: string };
    token?: string;
  };
}

const loginService = async (
  req: Request,
  _res: Response,
): Promise<ServiceResult> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return {
      success: false,
      statusCode: 400,
      message: "A valid email and password are required",
    };
  }
  const { email, password } = parsed.data;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      return {
        success: false,
        statusCode: 401,
        message: "Invalid email or password",
      };
    }
    const token = jwt.sign({}, config.JWT_SECRET, {
      subject: String(user.id),
      expiresIn: "1h",
      algorithm: "HS256",
    });
    return {
      success: true,
      message: "Login successful",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        token,
      },
    };
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Unable to log in. Please try again",
    };
  }
};

const registerService = async (
  req: Request,
  _res: Response,
): Promise<ServiceResult> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    const hasInvalidIdentity = parsed.error.issues.some(
      (issue) => issue.path[0] !== "password",
    );
    return {
      success: false,
      statusCode: 400,
      message: hasInvalidIdentity
        ? "Name and a valid email are required"
        : "Password must be at least 8 characters",
    };
  }
  const { name, email, password } = parsed.data;
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 12),
      },
      select: { id: true, name: true, email: true },
    });
    return {
      success: true,
      message: "Registration successful",
      data: { user },
    };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        statusCode: 409,
        message: "An account with this email already exists",
      };
    }
    return {
      success: false,
      statusCode: 500,
      message: "Unable to register. Please try again",
    };
  }
};

export default { loginService, registerService };
