import masterClassCategoryService from "../service/master-class-category-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterClassCategoryService.getAllClassCategory();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await masterClassCategoryService.addClassCategory(req.body);
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
