import { Router } from "express";
import { validateToken } from "../middleware/validateToken.js";
import {
    register,
    login,
    fetchUsersProfile,
    followUser,
    unfollowUser,
    getFollowing,
    editUserProfile
} from "../controllers/user.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.use(validateToken);
userRouter.get('/profile/:id', fetchUsersProfile);
userRouter.post('/follow', followUser );
userRouter.delete('/unfollow', unfollowUser);
userRouter.get('/followers/:userId', getFollowing);
userRouter.put('/profile', editUserProfile);

export default userRouter;
