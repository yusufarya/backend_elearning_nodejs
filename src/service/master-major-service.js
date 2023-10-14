import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  requestMajorValidation,
  getMajorValidation,
} from "../validation/master-major-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllMajor = async () => {
  return await prismaClient.major.findMany();
};

const addMajor = async (request) => {
  const validRequest = validate(requestMajorValidation, request);

  const countMajor = await prismaClient.major.count({
    where: {
      name: validRequest.name,
    },
  });

  if (countMajor === 1) {
    throw new ResponseError(400, "Major already exists.");
  }
  return prismaClient.major.create({
    data: validRequest,
  });
};

const getMajorById = async (majorId) => {
  majorId = validate(getMajorValidation, majorId);
  const getMajor = await prismaClient.major.findFirst({
    where: {
      id_major: majorId,
    },
  });

  if (!getMajor) {
    throw new ResponseError(404, "Data not found");
  }

  return getMajor;
};

const updateMajor = async (id, request) => {
  id = parseInt(id);
  const datarequest = validate(requestMajorValidation, request);

  const getMajor = await prismaClient.major.count({
    where: {
      id_major: id,
    },
  });

  if (!getMajor) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.major.update({
    data: datarequest,
    where: {
      id_major: id,
    },
  });
};

const deleteMajor = async (id) => {
  id = validate(getMajorValidation, id);
  const getMajorInUser = await prismaClient.users.count({
    where: {
      majorId: id,
    },
  });

  if (getMajorInUser) {
    throw new ResponseError(403, "Can't remove data, data assigned to User ");
  }

  const getMajor = await prismaClient.major.count({
    where: {
      id_major: id,
    },
  });

  if (!getMajor) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.major.delete({
    where: {
      id_major: id,
    },
  });
};

export default {
  getAllMajor,
  addMajor,
  getMajorById,
  updateMajor,
  deleteMajor,
};
