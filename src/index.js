import App from './app.js';
import { sequelize } from './db/sequelize.js';
import { PORT } from './config.js';

try {
    // Set {force: true} if each time you start server you want a clean db
    await sequelize.sync({force: false})
} catch(error) {
    console.log("Couldn't sync db");
}

App.listen(PORT, '0.0.0.0', () => {
  console.log(`Example app listening on port ${PORT}`)
})
