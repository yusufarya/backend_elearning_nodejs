import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  requestGradeValidation,
  getGradeValidation,
} from "../validation/master-grade-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllGrade = async () => {
  return await prismaClient.grade.findMany();
};

const addGrade = async (request) => {
  const validRequest = validate(requestGradeValidation, request);

  const countGrade = await prismaClient.grade.count({
    where: {
      grade: validRequest.grade,
    },
  });

  if (countGrade === 1) {
    throw new ResponseError(400, "Grade already exists.");
  }
  return prismaClient.grade.create({
    data: validRequest,
    select: {
      grade: true,
    },
  });
};

const getGradeById = async (gradeId) => {
  gradeId = validate(getGradeValidation, gradeId);
  const getGrade = await prismaClient.grade.findFirst({
    where: {
      id_grade: gradeId,
    },
    select: {
      id_grade: true,
      grade: true,
    },
  });

  if (!getGrade) {
    throw new ResponseError(404, "Data not found");
  }

  return getGrade;
};

const updateGrade = async (id, request) => {
  id = parseInt(id);
  const datarequest = validate(requestGradeValidation, request);

  const getGrade = await prismaClient.grade.count({
    where: {
      id_grade: id,
    },
  });

  if (!getGrade) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.grade.update({
    data: datarequest,
    where: {
      id_grade: id,
    },
  });
};

const deleteGrade = async (id) => {
  id = validate(getGradeValidation, id);

  const getGradeCategory = await prismaClient.gradeCategory.count({
    where: {
      gradeId: id,
    },
  });

  if (getGradeCategory) {
    throw new ResponseError(
      403,
      "Can't remove data, data assigned to category "
    );
  }

  const getGrade = await prismaClient.grade.count({
    where: {
      id_grade: id,
    },
  });

  if (!getGrade) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.grade.delete({
    where: {
      id_grade: id,
    },
  });
};

export default {
  getAllGrade,
  addGrade,
  getGradeById,
  updateGrade,
  deleteGrade,
};
