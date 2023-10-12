import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { requestGradeCategoryValidation } from "../validation/master-grade-category-validation.js";
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

export default {
  getAllGradeCategory,
  addGradeCategory,
};
