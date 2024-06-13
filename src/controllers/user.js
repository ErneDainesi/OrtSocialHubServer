import { compare, hash } from "bcrypt";
import { User } from "../model/models.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
    try {
        const oldUser = await User.findOne({ where: { email: req.body.email } });
        if (oldUser) {
            res.status(200).json({
                success: false,
                error: "User with same email exists"
            });
            return;
        }
        const hashedPass = await hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPass
        });
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to register user"
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(500).json({
                success: false,
                error: "User does not exist"
            });
            return;
        }
        const validatePassword = await compare(password, user.password);
        if (!validatePassword) {
            res.status(500).json({
                success: false,
                error: "Invalid credentials"
            });
            return;
        }
        const payload = {
            id: user.id,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
        const jwt = generateToken(payload);
        res.cookie("token", jwt);
        res.cookie("loggedInUserId", user.id);
        res.status(200).send({
            success: true,
            jwt,
            loggedInUserId: user.id
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to login"
        });
    }
}
