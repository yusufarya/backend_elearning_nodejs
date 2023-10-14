import { validate } from "../validation/validation.js";
import {
  registerUserValidation,
  registerMhsValidation,
  getUserValidation,
  loginUserValidation,
  updateUserValidate,
  registerTeachValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const roleId = parseInt(request.roleId);
  switch (roleId) {
    case 1:
      var postUser = validate(registerUserValidation, request);
      break;
    case 2:
      var postUser = validate(registerTeachValidation, request);
      break;
    case 3:
      var postUser = validate(registerMhsValidation, request);
      break;
    default:
      break;
  }

  const countUser = await prismaClient.users.count({
    where: {
      email: postUser.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  const countNumberId = await prismaClient.users.count({
    where: {
      identity_number: postUser.identity_number,
    },
  });

  if (countNumberId === 1) {
    throw new ResponseError(400, "NumberId already exists");
  }

  postUser.password = await bcrypt.hash(postUser.password, 10);

  return prismaClient.users.create({
    data: postUser,
    select: {
      identity_number: true,
      fullname: true,
      gender: true,
      email: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const users = await prismaClient.users.findFirst({
    where: {
      email: loginRequest.email,
    },
    select: {
      identity_number: true,
      email: true,
      password: true,
    },
  });

  if (!users) {
    throw new ResponseError(401, "User not found");
  }

  const isValidatePassword = await bcrypt.compare(
    loginRequest.password,
    users.password
  );

  if (!isValidatePassword) {
    throw new ResponseError(401, "User or password wrong");
  }

  const getToken = uuid().toString();
  return prismaClient.users.update({
    data: {
      token: getToken,
    },
    where: {
      identity_number: users.identity_number,
    },
    select: {
      token: true,
    },
  });
};

const get = async (identity_number) => {
  identity_number = validate(getUserValidation, identity_number);

  const getUser = await prismaClient.users.findUnique({
    where: {
      identity_number: identity_number,
    },
    include: {
      role: {
        select: {
          role: true,
        },
      },
    },
  });

  if (!getUser) {
    throw new ResponseError(404, "User not found");
  }

  return getUser;
};

const getLastIdentityNumber = async (roleId) => {
  const getLastNumber = await prismaClient.users.findFirst({
    where: {
      roleId: roleId,
    },
    orderBy: {
      identity_number: "desc", // Order by createdAt in descending order
    },
    select: {
      identity_number: true,
    },
  });

  if (!getLastNumber) {
    if (roleId == 1) {
      return { identity_number: "ADM23080000" };
    } else if (roleId == 2) {
      return { identity_number: "TCH23080000" };
    } else if (roleId == 3) {
      return { identity_number: "STD23080000" };
    }
  }
  return getLastNumber;
};

const update = async (request) => {
  const user = validate(updateUserValidate, request);

  const totalUserInDatabase = await prismaClient.users.count({
    where: {
      identity_number: user.identity_number,
    },
  });

  if (!totalUserInDatabase) {
    throw new ResponseError(404, "User not found");
  }

  const dataRequest = {};
  if (user.fullname) {
    dataRequest.fullname = user.fullname;
  }
  if (user.gender) {
    dataRequest.gender = user.gender;
  }
  if (user.address) {
    dataRequest.address = user.address;
  }
  if (user.email) {
    dataRequest.email = user.email;
  }
  if (user.password) {
    dataRequest.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.users.update({
    data: dataRequest,
    where: {
      identity_number: user.identity_number,
    },
  });
};

const logout = async (identity_number) => {
  identity_number = validate(getUserValidation, identity_number);

  const getUser = await prismaClient.users.findUnique({
    where: {
      identity_number: identity_number,
    },
  });

  if (!getUser) {
    throw new ResponseError(404, "User not found");
  }

  return prismaClient.users.update({
    data: {
      token: null,
    },
    where: {
      identity_number: identity_number,
    },
    select: {
      email: true,
    },
  });
};

export default {
  register,
  login,
  get,
  getLastIdentityNumber,
  update,
  logout,
};
