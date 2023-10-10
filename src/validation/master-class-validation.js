import Joi from "joi";

const addClassValidation = Joi.object({
  name: Joi.string().max(10).required(),
});

const getClasstValidation = Joi.number().positive().required();

export { addClassValidation, getClasstValidation };
