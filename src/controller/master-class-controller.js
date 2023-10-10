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
  console.log(req.body);
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
  // console.log("req");
  try {
    const classId = req.params.classId;
    const result = await masterClassService.getClassById(classId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  create,
  getId,
};
