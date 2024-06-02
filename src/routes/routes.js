import { Router } from "express";
import registerRouter from "./register.js";

const routes = Router();

routes.use("/register", registerRouter);

export default routes;
