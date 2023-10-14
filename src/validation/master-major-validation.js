import Joi from "joi";

const requestMajorValidation = Joi.object({
  name: Joi.string().max(10).required(),
});

const getMajorValidation = Joi.number().positive().required();

export { requestMajorValidation, getMajorValidation };
