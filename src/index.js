import App from './app.js';
//import { sequelize } from './db/sequelize.js';
import { PORT } from './config.js';

//await sequelize.sync({force:false})

App.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
