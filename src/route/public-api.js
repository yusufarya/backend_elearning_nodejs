import express from "express";
import userController from "../controller/user-controller.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const publicRouter = new express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

publicRouter.use(express.static(path.join(__dirname, "public")));
publicRouter.use("/public", express.static("public"));

// USERS API //
publicRouter.post("/api/users", userController.register);
publicRouter.post(
  "/api/users/getLastIdentityNumber",
  userController.getLastIdentityNumber
);
publicRouter.post("/api/users/login", userController.login);

export { publicRouter };
