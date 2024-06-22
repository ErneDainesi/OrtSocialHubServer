import { compare, hash } from "bcrypt";
import { User } from "../model/models.js";
import { generateToken } from "../utils/token.js";

class AuthService {
    async register(req) {
        const oldUser = await User.findOne({ where: { email: req.body.email } });
        if (oldUser) {
            return {
                success: false,
                error: "User with same email exists"
            };
        }
        const hashedPass = await hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password: hashedPass
        });
        return {
            success: true,
            user
        };
    }

    async login(req, res) {
        const {email, password} = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                success: false,
                error: "Invalid credentials"
            };
        }
        const validatePassword = await compare(password, user.password);
        if (!validatePassword) {
            return {
                success: false,
                error: "Invalid credentials"
            };
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
        res.cookie("token", jwt, {
            maxAge: 1000 * 60 * 60 * 24
        });
        return {
            success: true,
            loggedInUserId: JSON.stringify(user.id)
        };
    }
}

export default AuthService;
