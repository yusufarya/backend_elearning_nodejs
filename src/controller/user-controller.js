import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import userService from "../service/user-service.js";
import { prismaClient } from "../application/database.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const get = async (req, res, next) => {
  try {
    const identity_number = req.user.identity_number;
    const result = await userService.get(identity_number);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDataUser = async (req, res, next) => {
  try {
    const roleId = req.params.roleId;
    const result = await userService.getDataUser(roleId);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getLastIdentityNumber = async (req, res, next) => {
  try {
    const result = await userService.getLastIdentityNumber(req.body.roleId);
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const identity_number = req.user.identity_number;

    const request = req.body;
    request.identity_number = identity_number;

    const result = await userService.update(request);
    res
      .status(200)
      .json({
        data: result,
      })
      .end();
  } catch (err) {
    next(err);
  }
};

const updatePhoto = async (req, res, next) => {
  try {
    const oldImg = req.body.oldImg;

    if (!req.file) {
      return res.status(400).send("No files uploaded.");
    }

    await prismaClient.users.update({
      data: { image: req.file.filename },
      where: {
        identity_number: req.user.identity_number,
      },
    });

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dir = path.join(__dirname, "../../public/img/");

    fs.unlink(dir + oldImg, (err) => {
      console.log(err);
    });

    res.status(200).json("success").end();
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.identity_number);
    res
      .status(200)
      .json({
        data: "Berhasil Logout",
      })
      .end();
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  get,
  getDataUser,
  getLastIdentityNumber,
  update,
  updatePhoto,
  logout,
};
