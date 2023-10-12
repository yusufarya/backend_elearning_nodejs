import masterGradeService from "../service/master-grade-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterGradeService.getAllGrade();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await masterGradeService.addGrade(req.body);
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
    const result = await masterGradeService.getGradeById(gradeId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const gradeId = req.params.id;
    const request = req.body;
    const result = await masterGradeService.updateGrade(gradeId, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id_grade = req.body.id;
    const result = await masterGradeService.deleteGrade(id_grade);
    res.status(200).json({
      data: "Id " + result.id_grade + " berhasil dihapus.",
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
