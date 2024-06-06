import { Router } from "express";
import registerRouter from "./register.js";
import postRouter from "./post.js";

const routes = Router();

routes.use('/register', registerRouter);
routes.use('/post', postRouter);

export default routes;
