import { Follower, Post, User } from "../model/models.js";

export const post = async (req, res) => {
    try {
        console.log(`Saving ${req.body}`);
        await Post.create(req.body);
        res.status(200).json({
            success: true
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
