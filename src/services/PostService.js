import { Post, User, Follower } from "../model/models.js";

class PostService {
    async post(body) {
        const user = await User.findByPk(body.UserId, {
            attributes: ['id', 'firstName', 'lastName', 'profilePicture']
        });
        if (!user) {
            return {
                success: false,
                error: 'User does not exist'
            }
        }
        const post = await Post.create(body);
        return {
            success: true,
            post: {
                ...post.dataValues,
                User: user
            }
        };
    }
    
    async fetchHomeFeed() {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [{
                model: User,
                as: 'User',
                attributes: ['id', 'firstName', 'lastName', 'profilePicture']
            }]
        });
        return {
            success: true,
            posts
        };
    }

    async fetchProfileFeed(userId) {
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
        return {
            success: true,
            posts
        };
    }
}

export default PostService;
