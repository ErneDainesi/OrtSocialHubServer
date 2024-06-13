import { Router } from "express";
import postRouter from "./posts.js";
import userRouter from "./user.js";

const routes = Router();

routes.use('/user', userRouter);
routes.use('/posts', postRouter);

export default routes;
