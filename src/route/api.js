import express from "express";
import { authMiddleware } from "../middleware/user-middleware.js";
import userController from "../controller/user-controller.js";
import masterClassController from "../controller/master-class-controller.js";
import masterClassCategoryController from "../controller/master-class-category-controller.js";

const userRouter = new express.Router();
// userRouter.use(authMiddleware);

// USERS API //
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// MASTER //
// class data api (Data Kelas) //
userRouter.get("/api/class", masterClassController.getAll);
userRouter.post("/api/addClass", masterClassController.create);
userRouter.post("api/getClass/:id", masterClassController.getId);
// class category data api (Data Kategori Kelas) //
userRouter.get("/api/classCategory", masterClassCategoryController.getAll);
userRouter.post("/api/addClassCategory", masterClassCategoryController.create);

export { userRouter };
