import masterSubjectService from "../service/master-subject-service.js";

const getAll = async (req, res, next) => {
  try {
    const result = await masterSubjectService.getAllSubjects();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const currentDate = new Date();
    const request = req.body;
    request.createdAt = currentDate; // get current date
    request.createdBy = req.user.fullname; // get from current user logged in

    const result = await masterSubjectService.addSubject(req.body);
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
    const result = await masterSubjectService.getSubjectById(gradeId);
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
    const result = await masterSubjectService.updateSubject(majorId, request);
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
    const result = await masterSubjectService.deleteSubject(id_major);
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
