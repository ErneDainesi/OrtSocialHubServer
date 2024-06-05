import App from './app.js';
import { sequelize } from './db/sequelize.js';
import { PORT } from './config.js';

try {
    await sequelize.sync({force: false})
} catch(error) {
    console.log("Couldn't sync db");
}

App.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
