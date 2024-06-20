import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

const Post = sequelize.define(
    'Post',
    {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        attachmentUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

export default Post;
