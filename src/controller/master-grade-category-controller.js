import masterGradeCategoryService from "../service/master-grade-category-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterGradeCategoryService.getAllGradeCategory();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await masterGradeCategoryService.addGradeCategory(req.body);
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
};
