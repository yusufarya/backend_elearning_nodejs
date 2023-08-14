import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import bodyParser from "body-parser";

export const web = express();
// web.use(express.json());
web.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
