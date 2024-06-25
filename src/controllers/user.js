import { User, Follower } from "../model/models.js";
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

export const logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({
            succes: true,
            message: 'Logged out succes'
        });
    } catch(error) {
        res.status(500).send({
            succes: false,
            message: 'Error while trying to logout'
        });
    }
};

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

export const followUser = async(req, res) =>{
    try{
        const followerId = req.user.id;
        const {userId} = req.params;

        if(followerId === parseInt(userId)){
            return res.status(400).json({
                 success: false,
            error: "Cannot follow yourself"
            });
        }

        const follow = await Follower.create({
            followerId: followerId,
            followerId: userId
        });

        req.status(200).json({
            success: true,
            follow
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to follow user"
        });
    }
};

export const unfollowUser = async(req, res) =>{
    try{
        const followerId = req.user.id;
        const {userId} = req.params;

        const unfollow = await Follower.destroy({
            where:{
                followerId: followerId,
                followerId: userId
            }
        });

        res.status(200).json({
            succes: true,
            unfollow
        });
    
    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to unfollow user"
        });
    }
};

export const getFollowers = async (req,res) =>{
    try{
        const {userId} = req.params;
        
        const followers = await Follower.findAll({
            where: { followerId: userId},
            include: [{ model: User, as:'follower', attributes:['id', 'firstName', 'lastName', 'profilePicture'] }]
        });
        
        res.status(200).json({
            succes: true,
            followers
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to get followers"
        });
    }
};

