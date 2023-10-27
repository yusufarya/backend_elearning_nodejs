import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import {
  addSubjectValidation,
  getSubjectValidation,
  updateSubjectValidation,
} from "../validation/master-subject-validation.js";
import { ResponseError } from "../error/response-error.js";

const getAllSubjects = async () => {
  return await prismaClient.subjects.findMany({
    include: {
      grade: {
        select: {
          grade: true,
        },
      },
      major: {
        select: {
          name: true,
        },
      },
    },
  });
};

const addSubject = async (request) => {
  const validRequest = validate(addSubjectValidation, request);
  const countSubject = await prismaClient.subjects.count({
    where: {
      name: validRequest.name,
      gradeId: validRequest.gradeId,
    },
  });
  if (countSubject === 1) {
    throw new ResponseError(400, "Major already exists.");
  }
  return prismaClient.subjects.create({
    data: validRequest,
  });
};

const getSubjectById = async (subjectId) => {
  subjectId = validate(getSubjectValidation, subjectId);
  const getMajor = await prismaClient.subjects.findFirst({
    where: {
      id_subject: subjectId,
    },
  });

  if (!getMajor) {
    throw new ResponseError(404, "Data not found");
  }

  return getMajor;
};

const updateSubject = async (id, request) => {
  id = parseInt(id);
  const datarequest = validate(updateSubjectValidation, request);

  const getMajor = await prismaClient.subjects.count({
    where: {
      id_subject: id,
    },
  });

  if (!getMajor) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.subjects.update({
    data: datarequest,
    where: {
      id_subject: id,
    },
  });
};

const deleteSubject = async (id) => {
  id = validate(getSubjectValidation, id);

  const getSubject = await prismaClient.subjects.count({
    where: {
      id_subject: id,
    },
  });

  if (!getSubject) {
    throw new ResponseError(404, "Data not found.");
  }

  return prismaClient.subjects.delete({
    where: {
      id_subject: id,
    },
  });
};

export default {
  getAllSubjects,
  addSubject,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
