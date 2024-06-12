import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

export const generateToken = (payload) => {
    const token = jwt.sign({ payload }, SECRET, { expiresIn: "2d" });
    return token;
};

export const verifyToken = (token) => {
    const tokenverify = jwt.verify(token, SECRET);
    return tokenverify;
};
