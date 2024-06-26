import { verifyToken } from "../utils/token.js";

export const validateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(400).send({ succces: false, message: "Couldn't validate jwt" });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(400).send({ succces: false, message: "Couldn't validate jwt" });
            return;
        }
        const { payload } = verifyToken(token);
        req.user = payload.user;
        next();
    } catch (error) {
        res.status(400).send({ succces: false, message: "Couldn't validate jwt" });
    }
};
