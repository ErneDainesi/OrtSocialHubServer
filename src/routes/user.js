import { Router } from "express";
import { register, login, fetchUsersProfile, editUserProfile } from "../controllers/user.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.use(validateToken);
userRouter.get('/profile/:id', fetchUsersProfile);
userRouter.put('/profile', editUserProfile);

export default userRouter;
