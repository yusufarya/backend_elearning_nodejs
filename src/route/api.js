import express from "express";
import { authMiddleware } from "../middleware/user-middleware.js";
import userController from "../controller/user-controller.js";
import masterGradeController from "../controller/master-grade-controller.js";
import masterGradeCategoryController from "../controller/master-grade-category-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USERS API //
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// MASTER //
// grade data api (Data Kelas) //
userRouter.get("/api/grade", masterGradeController.getAll);
userRouter.post("/api/addGrade", masterGradeController.create);
userRouter.get("/api/getGrade/:id", masterGradeController.getId);
userRouter.patch("/api/updateGrade/:id", masterGradeController.update);
userRouter.delete("/api/deleteGrade/", masterGradeController.remove);

// grade category data api (Data Kategori Kelas) //
userRouter.get("/api/gradeCategory", masterGradeCategoryController.getAll);
userRouter.post("/api/addGradeCategory", masterGradeCategoryController.create);

export { userRouter };
