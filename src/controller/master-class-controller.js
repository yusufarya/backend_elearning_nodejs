import { prismaClient } from "../application/database.js";
import masterClassService from "../service/master-class-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterClassService.getAllClass();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await masterClassService.addClass(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const result = await masterClassService.getClassById(classId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const request = req.body;
    const result = await masterClassService.updateClass(classId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const id_class = req.body.id;
    const result = await masterClassService.deleteClass(id_class);
    res.status(200).json({
      data: "Id " + result.id_class + " berhasil dihapus.",
    });
  } catch (error) {
    next(error);
  }
};
export default {
  getAll,
  create,
  getId,
  update,
  deleteClass,
};
