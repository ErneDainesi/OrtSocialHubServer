import { Sequelize } from 'sequelize';
import { MYSQL_URL } from '../config.js';

export const sequelize = new Sequelize(MYSQL_URL);

try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
