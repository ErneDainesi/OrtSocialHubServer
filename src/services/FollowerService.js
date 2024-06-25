import { Follower, User } from "../model/models.js";

class FollowerService {
    async follow({followerId, followedId}) {
        if (followerId === followedId) {
            return {
                success: false,
                error: "Cannot follow yourself"
            };
        }
        const follow = await Follower.create({
            followerId,
            followedId
        });
        return {
            success: true,
            follow
        };
    }

    async unfollow({followerId, followedId}) {
        await Follower.destroy({
            where: {
                followerId,
                followedId
            }
        });
        return {
            success: true
        };
    }

    async getFollowed(followerId) {
        const following = await Follower.findAll({
            where: {
                followerId
            },
            include: [
                {
                    model: User,
                    as: 'Followed',
                    attributes:['id', 'firstName', 'lastName', 'profilePicture']
                }
            ]
        });
        return {
            success: true,
            following
        }
    }
}

export default FollowerService;
