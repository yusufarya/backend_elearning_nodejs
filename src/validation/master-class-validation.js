import Joi from "joi";

const requestClassValidation = Joi.object({
  class: Joi.string().max(10).required(),
});

const getClasstValidation = Joi.number().positive().required();

export { requestClassValidation, getClasstValidation };
