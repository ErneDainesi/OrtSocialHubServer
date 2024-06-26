import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

const User = sequelize.define(
    'User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);

export default User;
