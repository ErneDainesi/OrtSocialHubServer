import { Router } from "express";
import { register, login, fetchUsersProfile } from "../controllers/user.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.use(validateToken);
userRouter.get('/profile/:id', fetchUsersProfile);

export default userRouter;
