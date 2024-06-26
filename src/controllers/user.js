import { User, Follower } from "../model/models.js";
import AuthService from "../services/AuthService.js";
import FollowerService from "../services/FollowerService.js";
import UserService from "../services/UserService.js";

const auth = new AuthService();
const userService = new UserService();
const followerService = new FollowerService();

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

export const followUser = async(req, res) => {
    try {
        const result = await followerService.follow(req.body);
        const status = result.success ? 200 : 400;
        res.status(status).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to follow user"
        });
    }
};

export const unfollowUser = async(req, res) => {
    try {
        const result = await followerService.unfollow(req.body);
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to unfollow user"
        });
    }
};

export const getFollowing = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await followerService.getFollowed(userId);
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to get followers"
        });
    }
};

export const editUserProfile = async (req, res) => {
    try {
        const result = await userService.editProfile(req.body);
        if (!result.success) {
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
