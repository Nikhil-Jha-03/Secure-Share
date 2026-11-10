// src/index.ts
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// src/config/config.ts
import { configDotenv } from "dotenv";
configDotenv({
  path: "./.env",
  quiet: true
});
if (!process.env.PORT) {
  throw new Error("PORT environment variable is required");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
var config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET
};
var config_default = config;

// src/index.ts
var app = express();
app.use(cors({
  // origin:process.env.FRONTEND_URL,
  // methods:["GET","POST","DELETE","PUT"],
  // allowedHeaders:["Content-Type","Authorization"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  console.log("hello : ", process.env.DATABASE_URL);
  res.json({
    message: "Hey",
    STATUS_CODE: 404
  });
});
app.listen(config_default.PORT, () => {
});
