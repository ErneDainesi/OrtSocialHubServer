import { compare, hash } from "bcrypt";
import { User } from "../model/models.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
    try {
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
            name: `${user.firstName} ${user.lastName}`
        };
        const token = generateToken(payload);
        res.cookie("token", token);
        res.status(200).send({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to login"
        });
    }
}
