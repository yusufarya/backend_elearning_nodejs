import Joi from "joi";

const requestGradeValidation = Joi.object({
  grade: Joi.string().max(10).required(),
});

const getGradeValidation = Joi.number().positive().required();

export { requestGradeValidation, getGradeValidation };
