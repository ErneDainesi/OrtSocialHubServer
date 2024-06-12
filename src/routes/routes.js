import { Router } from "express";
import postRouter from "./post.js";
import userRouter from "./user.js";

const routes = Router();

routes.use('/user', userRouter);
routes.use('/post', postRouter);

export default routes;
