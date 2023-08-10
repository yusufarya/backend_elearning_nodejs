import userService from "../service/user-service.js"

const register = async (request, respond, next) => {
    try {
        const result = await userService.register(request.body)
        respond.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export default {
    register
}