import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  getGradeCategoryValidation,
  requestGradeCategoryValidation,
} from "../validation/master-grade-category-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllGradeCategory = async () => {
  const getGrade = await prismaClient.gradeCategory.findMany({
    include: {
      grade: {
        select: {
          grade: true,
        },
      },
    },
  });
  return getGrade;
};

const addGradeCategory = async (request) => {
  const validRequest = validate(requestGradeCategoryValidation, request);
  const countGradeCategory = await prismaClient.gradeCategory.count({
    where: {
      name: validRequest.name,
      gradeId: validRequest.gradeId,
    },
  });

  if (countGradeCategory === 1) {
    throw new ResponseError(400, "Grade Category already exists.");
  }

  return prismaClient.gradeCategory.create({
    data: validRequest,
    select: {
      name: true,
      gradeId: true,
    },
  });
};

const getGradeCategoryById = async (categoryId) => {
  categoryId = validate(getGradeCategoryValidation, categoryId);

  const getGradeCategory = await prismaClient.gradeCategory.findFirst({
    where: {
      id_category: categoryId,
    },
    // include: {
    //   grade: {
    //     select: {
    //       grade: true,
    //     },
    //   },
    // },
  });

  if (!getGradeCategory) {
    throw new ResponseError(404, "Data not found");
  }

  return getGradeCategory;
};

const updateGradeCategory = async (categoryId, request) => {
  categoryId = parseInt(categoryId);

  const datarequest = validate(requestGradeCategoryValidation, request);

  const getGradeCategory = await prismaClient.gradeCategory.count({
    where: {
      id_category: categoryId,
    },
  });

  if (!getGradeCategory) {
    throw new ResponseError(404, "Data not found");
  }

  return prismaClient.gradeCategory.update({
    data: datarequest,
    where: {
      id_category: categoryId,
    },
  });
};

const deleteGradeCategory = async (id) => {
  id = parseInt(id);

  const getGradeCategory = await prismaClient.gradeCategory.count({
    where: {
      id_category: id,
    },
  });

  if (!getGradeCategory) {
    throw new ResponseError(494, "Data not found");
  }

  return prismaClient.gradeCategory.delete({
    where: {
      id_category: id,
    },
  });
};

export default {
  getAllGradeCategory,
  addGradeCategory,
  getGradeCategoryById,
  updateGradeCategory,
  deleteGradeCategory,
};
