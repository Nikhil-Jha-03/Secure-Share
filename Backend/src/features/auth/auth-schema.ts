import { z } from "zod";

const email = z.string().trim().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).toLowerCase();

export const loginSchema = z.object({
  email,
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1),
  email,
  password: z.string().min(8).refine((password) => Buffer.byteLength(password, "utf8") <= 72),
});
