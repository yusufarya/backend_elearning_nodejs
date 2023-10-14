import Joi from "joi";

const requestGradeCategoryValidation = Joi.object({
  name: Joi.string().max(30).required(),
  gradeId: Joi.number().integer().required(),
});

const getGradeCategoryValidation = Joi.number().positive().required();

export { requestGradeCategoryValidation, getGradeCategoryValidation };
