import AuthService from "../services/AuthService.js";
import UserService from "../services/UserService.js";

const auth = new AuthService();
const userService = new UserService();

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
        if (!result.success) {
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
        const result = await userService.fetchUsersProfile(req);
        if (!result.success) {
            res.status(404).json(result);
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch users profile"
        });
    }
};

export const editUserProfile = async (req, res) => {
    try {
        const result = await userService.editProfile(req.body);
        if (!result.succes) {
            res.status(500).json(result);
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch users profile"
        });
    }
};
