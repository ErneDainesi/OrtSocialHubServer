import express from 'express';
import cors from 'cors';
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import { ORIGIN } from './config.js';

const app = express();

app.use(cors({
    origin: ORIGIN,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes);

export default app;
