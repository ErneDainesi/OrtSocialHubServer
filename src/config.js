import { configDotenv } from "dotenv"

configDotenv()

export const PORT = process.env.PORT;
export const MYSQL_URL = process.env.MYSQL_URL;
export const SECRET = process.env.SECRET;
export const ORIGIN = process.env.ORIGIN;
export const DOMAIN = process.env.DOMAIN;
