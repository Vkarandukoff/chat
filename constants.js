import {config} from 'dotenv';
config()

export const PORT = process.env.PORT
export const secretKey = process.env.SECRET;
export const apiKey = process.env.OPENAI_API_KEY