import Joi from "joi";

const requestGradeCategoryValidation = Joi.object({
  name: Joi.string().max(30).required(),
  gridId: Joi.number().integer().required(),
});

export { requestGradeCategoryValidation };
