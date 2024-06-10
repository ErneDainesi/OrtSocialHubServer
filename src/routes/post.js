import { Router } from "express";
import { post, fetchHomeFeed, fetchProfileFeed } from "../controllers/post.js";

const postRouter = Router();

postRouter.post('/', post);
postRouter.get('/home/:userId', fetchHomeFeed);
postRouter.get('/profile/:userId', fetchProfileFeed);

export default postRouter;
