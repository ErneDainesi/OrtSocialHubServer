import { Router } from "express";
import { post } from "../controllers/post.js";
import { fetchHomeFeed } from "../controllers/post.js";

const postRouter = Router();

postRouter.post('/', post);
postRouter.get('/home/:userId', fetchHomeFeed);

export default registerRouter;
