import type { Request, Response } from "express";
import type { User } from "../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.ts";

interface ServiceResult {
  success: boolean;
  message: string;
  data?: any;
  errors?: any;
}

const loginService = async (
  req: Request,
  res: Response,
): Promise<ServiceResult> => {
  console.log("first")
  // Implement login logic here

  
  // console.log(req.body);
  // const { email, password } = req.body;

  const response = await prisma.user.create({
    data:{
        name:"Nikh",
        email:"ajbajc"
    }
  })

  console.log(response);

  return { success: true, message: "Login successful" };
};

const registerService = async (
  req: Request,
  res: Response,
): Promise<ServiceResult> => {
 

  // Implement registration logic here
  return { success: true, message: "Registration successful" };
};

export default {
  loginService,
  registerService,
};

// Implement the login and registration logic in the respective service functions. You can use the request data to authenticate users or create new user accounts, and return appropriate success or error messages along with any relevant data.
// linking to user db to save and access
