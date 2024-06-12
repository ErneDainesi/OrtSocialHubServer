import { Router } from "express";
import { register, login } from "../controllers/user.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

registerRouter.post('/register', register);
registerRouter.post('/login', login);
userRouter.use(validateToken);
// registerRouter.get('/profile/:id', fetchUsersProfile);

export default userRouter;
