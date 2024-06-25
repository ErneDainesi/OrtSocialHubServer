import { Router } from "express";
import { register, login, fetchUsersProfile, logout } from "../controllers/user.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.use(validateToken);
userRouter.post('/logout', logout);
userRouter.get('/profile/:id', fetchUsersProfile);

export default userRouter;
