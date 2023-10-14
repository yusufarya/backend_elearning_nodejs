import express from "express";
import { authMiddleware } from "../middleware/user-middleware.js";
import userController from "../controller/user-controller.js";
import masterGradeController from "../controller/master-grade-controller.js";
import masterGradeCategoryController from "../controller/master-grade-category-controller.js";
import masterMajorController from "../controller/master-major-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USERS API //
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// MASTER //
// major data api (Data jurusan) //
userRouter.get("/api/major", masterMajorController.getAll);
userRouter.post("/api/addMajor", masterMajorController.create);
userRouter.get("/api/getMajor/:id", masterMajorController.getId);
userRouter.patch("/api/updateMajor/:id", masterMajorController.update);
userRouter.delete("/api/deleteMajor", masterMajorController.remove);

// grade data api (Data Kelas) //
userRouter.get("/api/grade", masterGradeController.getAll);
userRouter.post("/api/addGrade", masterGradeController.create);
userRouter.get("/api/getGrade/:id", masterGradeController.getId);
userRouter.patch("/api/updateGrade/:id", masterGradeController.update);
userRouter.delete("/api/deleteGrade/", masterGradeController.remove);

// grade category data api (Data Kategori Kelas) //
userRouter.get("/api/gradeCategory", masterGradeCategoryController.getAll);
userRouter.post("/api/addGradeCategory", masterGradeCategoryController.create);
userRouter.get(
  "/api/getGradeCategory/:id",
  masterGradeCategoryController.getId
);
userRouter.patch(
  "/api/updateGradeCategory/:id",
  masterGradeCategoryController.update
);
userRouter.delete(
  "/api/deleteGradeCategory",
  masterGradeCategoryController.remove
);
export { userRouter };
