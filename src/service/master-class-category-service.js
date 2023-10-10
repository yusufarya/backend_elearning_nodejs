import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { addClassCategoryValidation } from "../validation/master-class-category-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllClassCategory = async () => {
  const getClass = await prismaClient.classesCategory.findMany({
    include: {
      classes: {
        select: {
          class: true,
        },
      },
    },
  });
  return getClass;
};

const addClassCategory = async (request) => {
  const validRequest = validate(addClassCategoryValidation, request);
  const countClassCategory = await prismaClient.classesCategory.count({
    where: {
      name: validRequest.name,
    },
  });

  if (countClassCategory === 1) {
    throw new ResponseError(400, "Category already exists.");
  }

  return prismaClient.classesCategory.create({
    data: validRequest,
    select: {
      name: true,
      classId: true,
    },
  });
};

export default {
  getAllClassCategory,
  addClassCategory,
};
