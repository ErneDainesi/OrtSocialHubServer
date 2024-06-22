import { Router } from "express";
import { register, login, fetchUsersProfile, followUser, unfollowUser, getFollowers } from "../controllers/user.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/follow/:userId', followUser );
userRouter.post('/unfollow/:userId', unfollowUser);
userRouter.use(validateToken);
userRouter.get('/profile/:id', fetchUsersProfile);
userRouter.get('/followers/:userId', getFollowers);


export default userRouter;
