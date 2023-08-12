import BaseJoi from "joi"; 
import JoiDate from "@joi/date"; 
const Joi = BaseJoi.extend(JoiDate);

const registerUserValidation = Joi.object({
    identity_number: Joi.string().max(20).required(),
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(256).required(),
    name: Joi.string().max(100).required(),
    roleId: Joi.number().integer().required(),
    gender: Joi.string().valid('M', 'F'),
    place_of_birth: Joi.string().max(100).required(),
    date_of_birth: Joi.date().format('YYYY-MM-DD').utc().required(),
    telp: Joi.string().max(20).optional(),
    religion: Joi.string().max(20).required(),
    status: Joi.number().max(1).required()
});

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).email().required(),
    password: Joi.string().max(256).required()
})

const getUserValidation = Joi.string().max(100).required();

const updateUserValidate = Joi.object({
    identity_number: Joi.string().max(20).required(),
    email: Joi.string().max(100).email().optional(),
    name: Joi.string().max(100).optional(),
    gender: Joi.string().valid('M', 'F'),
    place_of_birth: Joi.string().max(100).optional(),
    date_of_birth: Joi.date().format('YYYY-MM-DD').utc().optional(),
    telp: Joi.string().max(20).optional(),
    religion: Joi.string().max(20).optional(),
    status: Joi.number().max(1).optional()
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidate
}