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

const getId = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const result = await masterGradeCategoryService.getGradeCategoryById(
      categoryId
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const request = req.body;
    const result = await masterGradeCategoryService.updateGradeCategory(
      categoryId,
      request
    );
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id_category = req.body.id_category;
    const result = await masterGradeCategoryService.deleteGradeCategory(
      id_category
    );
    res.status(200).json({
      data: "Id " + result.id_category + " has been deleted.",
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
