import { User } from "../model/models.js";
import AuthService from "../services/AuthService.js";

const auth = new AuthService();

export const register = async (req, res) => {
    try {
        const result = await auth.register(req);
        res.status(200).json(result);
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
        const result = await auth.login(req, res);
        if (!result.loggedInUserId) {
            res.status(500).json(result);
            return;
        }
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to login"
        });
    }
}

export const fetchUsersProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: "User not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch users profile"
        });
    }
};
