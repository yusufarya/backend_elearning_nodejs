import express from "express";

import userController from "../controller/user-controller.js"

const userRouter = new express.Router();

userRouter.post('/api/user/register', userController.register())

export {
    userRouter
}