import { Router } from "express";
import { register, login } from "../controllers/user.js";

const userRouter = Router();

registerRouter.post('/register', register);
registerRouter.post('/login', login);

export default userRouter;
