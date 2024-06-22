import { compare, hash } from "bcrypt";
import { User, Follower } from "../model/models.js";
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
                error: "Invalid credentials"
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
        res.cookie("token", jwt, {
            maxAge: 1000 * 60 * 60 * 24
        });
        res.status(200).send({
            success: true,
            loggedInUserId: JSON.stringify(user.id)
        });
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

