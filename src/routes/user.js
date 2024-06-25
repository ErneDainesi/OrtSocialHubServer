import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import {
    register,
    login,
    fetchUsersProfile,
    logout,
    followUser,
    unfollowUser,
    getFollowing,
    editUserProfile
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.use(validateToken);
userRouter.post('/logout', logout);
userRouter.get('/profile/:id', fetchUsersProfile);
userRouter.post('/follow', followUser );
userRouter.post('/unfollow', unfollowUser);
userRouter.get('/followers/:userId', getFollowing);
userRouter.put('/profile', editUserProfile);

export default userRouter;
