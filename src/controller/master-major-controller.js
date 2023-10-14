import masterMajorService from "../service/master-major-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterMajorService.getAllMajor();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await masterMajorService.addMajor(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getId = async (req, res, next) => {
  try {
    const gradeId = req.params.id;
    const result = await masterMajorService.getMajorById(gradeId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const majorId = req.params.id;
    const request = req.body;
    const result = await masterMajorService.updateMajor(majorId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id_major = req.body.id_major;
    const result = await masterMajorService.deleteMajor(id_major);
    res.status(200).json({
      data: "Id " + result.id_major + " has been deleted.",
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
  remove,
};
