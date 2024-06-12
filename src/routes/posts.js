import { Router } from "express";
import { post, fetchHomeFeed, fetchProfileFeed } from "../controllers/posts.js";
import { validateToken } from "../middleware/validateToken.js";

const postRouter = Router();

postRouter.use(validateToken);
postRouter.post('/', post);
postRouter.get('/home/:userId', fetchHomeFeed);
postRouter.get('/profile/:userId', fetchProfileFeed);

export default postRouter;
