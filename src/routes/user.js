import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import {
    register,
    login,
    fetchUsersProfile,
    logout,
    followUser,
    unfollowUser,
    getFollowers
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/follow/:userId', followUser );
userRouter.post('/unfollow/:userId', unfollowUser);
userRouter.use(validateToken);
userRouter.post('/logout', logout);
userRouter.get('/profile/:id', fetchUsersProfile);
userRouter.get('/followers/:userId', getFollowers);

export default userRouter;
