import { Router } from "express";
import { post } from "../controllers/post.js";

const postRouter = Router();

postRouter.post('/', post);

export default registerRouter;
