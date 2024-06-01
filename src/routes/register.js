import { Router } from "express";
import { register } from "../controllers/register.js";

const registerRouter = Router();

registerRouter.post('/', register);

export default registerRouter;
