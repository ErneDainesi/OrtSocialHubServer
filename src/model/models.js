import Follower from "./Follower.js";
import Post from "./Post.js";
import User from "./User.js";

User.hasMany(Post, {
    onDelete: 'cascade'
});

Post.belongsTo(User);

User.belongsToMany(User, {
    through: Follower,
    as: 'followers',
    foreignKey: 'followerId',
    otherKey: 'followedId',
});

User.belongsToMany(User, {
    through: Follower,
    as: 'following',
    foreignKey: 'followedId',
    otherKey: 'followerId',
});

Follower.belongsTo(User, {
    as: 'Follower',
    foreignKey: 'followerId'
});

Follower.belongsTo(User, {
    as: 'Followed',
    foreignKey: 'followedId'
});

export {User, Post, Follower};
