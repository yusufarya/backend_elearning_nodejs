import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { addClassValidation } from "../validation/master-class-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllClass = async () => {
  const getClass = await prismaClient.classes.findMany();

  return getClass;
};

const addClass = async (request) => {
  const validRequest = validate(addClassValidation, request);
  const countClass = await prismaClient.classes.count({
    where: {
      name: validRequest.name,
    },
  });

  if (countClass === 1) {
    throw new ResponseError(400, "Class already exists.");
  }
  return prismaClient.classes.create({
    data: validRequest,
    select: {
      class: true,
    },
  });
};

const getClassById = async (class_id) => {
  class_id = validate(getClasstValidation, class_id);
  const getClass = await prismaClient.classes.findFirst({
    where: {
      id_class: class_id,
    },
    select: {
      id_class: true,
      class: true,
    },
  });

  if (!getClass) {
    throw new ResponseError(404, "Data not found");
  }

  return getClass;
};

export default {
  getAllClass,
  addClass,
  getClassById,
};
