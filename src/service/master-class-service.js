import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  requestClassValidation,
  getClasstValidation,
} from "../validation/master-class-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllClass = async () => {
  const getClass = await prismaClient.classes.findMany();
  return getClass;
};

const addClass = async (request) => {
  const validRequest = validate(requestClassValidation, request);
  console.log(validRequest);
  const countClass = await prismaClient.classes.count({
    where: {
      class: validRequest.class,
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

const getClassById = async (classId) => {
  classId = validate(getClasstValidation, classId);
  const getClass = await prismaClient.classes.findFirst({
    where: {
      id_class: classId,
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

const updateClass = async (id, request) => {
  const datarequest = validate(requestClassValidation, request);
  id = parseInt(id);

  const getClass = await prismaClient.classes.count({
    where: {
      id_class: id,
    },
  });

  if (!getClass) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.classes.update({
    data: datarequest,
    where: {
      id_class: id,
    },
  });
};

const deleteClass = async (id) => {
  id = parseInt(id);

  const getClass = await prismaClient.classes.count({
    where: {
      id_class: id,
    },
  });

  if (!getClass) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.classes.delete({
    where: {
      id_class: id,
    },
  });
};

export default {
  getAllClass,
  addClass,
  getClassById,
  updateClass,
  deleteClass,
};
