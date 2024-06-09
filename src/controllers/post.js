import { Follower, Post, User } from "../model/models.js";

export const post = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        const user = await User.findByPk(req.body.UserId, {
            attributes: ['id', 'firstName', 'lastName']
        });
        res.status(200).json({
            success: true,
            user,
            post
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to save post"
        });
    }
}

export const fetchHomeFeed = async (req, res) => {
    try {
        const { userId } = req.params;
        const following = await Follower.findAll({
            where: {
                followerId: userId
            }
        });
        const posts = await Post.findAll({
            where: {
                UserId: following
            },
            order: ['createdAt', 'DESC']
        });
        res.status(200).json({
            success: true,
            posts
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch posts"
        });
    }
}

export const fetchProfileFeed = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.findAll({
            where: {
                UserId: userId
            }
        });
        res.status(200).json({
            success: true,
            posts
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: "Error while trying to fetch posts"
        });
    }
}
