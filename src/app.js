import express from 'express';
import { sequelize } from './db/sequelize.js';
import cors from 'cors';
import { PORT } from './config.js';

const app = express()

app.use(cors())
await sequelize.sync({force:false})

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
