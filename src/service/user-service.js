import { PrismaClient } from "@prisma/client" 
import { validate } from "../validation/validation.js"
import { registerUserValidation } from "../validation/user-validation.js"
import { ResponseError } from "../error/response-error.js"
import { hash } from "bcrypt"

const register = async (request) => {
    const postUser = validate(registerUserValidation, request)

    const countUser = PrismaClient.user.count({
        where: {
            username : postUser.username
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Username already exists")
    }

    postUser.password = await hash(postUser.password, 10)

    return PrismaClient.user.create({
        data : postUser,
        select : {
            username: true,
            name: true
        }
    });
}

export default {
    register
}