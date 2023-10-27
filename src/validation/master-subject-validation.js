import BaseJoi from "joi";
import JoiDate from "@joi/date";
const Joi = BaseJoi.extend(JoiDate);

const addSubjectValidation = Joi.object({
  name: Joi.string().max(30).required(),
  gradeId: Joi.number().integer().required(),
  majorId: Joi.number().integer().required(),
  createdAt: Joi.date().format("YYYY-MM-DD").utc().required(),
  createdBy: Joi.string().max(30).required(),
});

const getSubjectValidation = Joi.number().positive().required();

const updateSubjectValidation = Joi.object({
  name: Joi.string().max(30).optional(),
  gradeId: Joi.number().integer().optional(),
  majorId: Joi.number().integer().optional(),
  updateddAt: Joi.date().format("YYYY-MM-DD").utc().optional(),
  updateddBy: Joi.string().max(30).optional(),
});

export { addSubjectValidation, getSubjectValidation, updateSubjectValidation };
