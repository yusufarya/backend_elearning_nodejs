import express from "express";
import userController from "../controller/user-controller.js"
import { authMiddleware } from "../middleware/user-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

// USERS API // 
userRouter.get('/api/users/current', userController.get)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

export {
    userRouter
}