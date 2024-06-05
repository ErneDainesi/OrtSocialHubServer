import Post from "./Post.js";
import User from "./User.js";

User.hasMany(Post, {
    onDelete: 'cascade'
});

Post.belongsTo(User);

export {User, Post};
