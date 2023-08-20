import userService from "../service/user-service.js"

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err)
    }
}

const get = async(req, res, next) => {
    try {
        const identity_number = req.user.identity_number
        const result = await userService.get(identity_number);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        next(err)
    }
}

const getLastIdentityNumber = async(req, res, next) => {

    try {
        const result = await userService.getLastIdentityNumber(req.body.roleId)
        res.status(200).json({
            data: result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const identity_number = req.user.identity_number
        const request = req.body
        request.identity_number = identity_number

        const result = await userService.update(request);
        res.status(200).json({
            data: result
        }).end()
        
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.identity_number);
        res.status(200).json({
            data: "Berhasil Logout"
        }).end();
    } catch (err) {
        next(err);
    }
}

export default {
    register,
    login,
    get,
    getLastIdentityNumber,
    update,
    logout
}