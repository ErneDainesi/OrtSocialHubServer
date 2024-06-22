import { Follower, Post, User } from "../model/models.js";

export const post = async (req, res) => {
    try {
        const post = await Post.create(req.body);
        const user = await User.findByPk(req.body.UserId, {
            attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        });
        res.status(200).json({
            success: true,
            post: {
                ...post.dataValues,
                User: user
            }
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
        const userIds = await Follower.findAll({
            where: {
                followerId: userId
            }
        });
        userIds.push(userId);
        const posts = await Post.findAll({
            where: {
                UserId: userIds
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName', 'profilePicture']
            }]
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
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName', 'profilePicture']
            }]
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
