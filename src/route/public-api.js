import express from "express";
import userController from "../controller/user-controller.js"

const publicRouter = new express.Router();

// USERS API //
publicRouter.post('/api/users', userController.register)
publicRouter.get('/api/users/getLastIdentityNumber', userController.getLastIdentityNumber)
publicRouter.get('/api/users/login', userController.login) 

export {
    publicRouter
}