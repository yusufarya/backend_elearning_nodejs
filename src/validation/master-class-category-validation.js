import Joi from "joi";

const addClassCategoryValidation = Joi.object({
  name: Joi.string().max(30).required(),
  classId: Joi.number().integer().required(),
});

export { addClassCategoryValidation };
