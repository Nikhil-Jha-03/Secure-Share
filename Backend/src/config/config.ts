import { configDotenv } from "dotenv";

configDotenv({
  path: "./.env",
  quiet: true,
});

if (!process.env.PORT) {
  throw new Error("PORT environment variable is required");
}

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
