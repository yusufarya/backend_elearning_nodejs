import express from "express";
import { authMiddleware } from "../middleware/user-middleware.js";
import userController from "../controller/user-controller.js";
import M_MajorController from "../controller/master-major-controller.js";
import M_GradeController from "../controller/master-grade-controller.js";
import M_CategoryController from "../controller/master-grade-category-controller.js";
import M_SubjectController from "../controller/master-subject-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USERS API //
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// MASTER //

// major data api (Data jurusan) //
userRouter.get("/api/major", M_MajorController.getAll);
userRouter.post("/api/addMajor", M_MajorController.create);
userRouter.get("/api/getMajor/:id", M_MajorController.getId);
userRouter.patch("/api/updateMajor/:id", M_MajorController.update);
userRouter.delete("/api/deleteMajor", M_MajorController.remove);

// grade data api (Data Kelas) //
userRouter.get("/api/grade", M_GradeController.getAll);
userRouter.post("/api/addGrade", M_GradeController.create);
userRouter.get("/api/getGrade/:id", M_GradeController.getId);
userRouter.patch("/api/updateGrade/:id", M_GradeController.update);
userRouter.delete("/api/deleteGrade/", M_GradeController.remove);

// grade category data api (Data Kategori Kelas) //
userRouter.get("/api/gradeCategory", M_CategoryController.getAll);
userRouter.post("/api/addGradeCategory", M_CategoryController.create);
userRouter.get("/api/getGradeCategory/:id", M_CategoryController.getId);
userRouter.patch("/api/updateGradeCategory/:id", M_CategoryController.update);
userRouter.delete("/api/deleteGradeCategory", M_CategoryController.remove);

// major data api (Data jurusan) //
userRouter.get("/api/subjects", M_SubjectController.getAll);
userRouter.post("/api/addSubject", M_SubjectController.create);
userRouter.get("/api/getSubject/:id", M_SubjectController.getId);
userRouter.patch("/api/updateSubject/:id", M_SubjectController.update);
userRouter.delete("/api/deleteSubject", M_SubjectController.remove);

export { userRouter };
