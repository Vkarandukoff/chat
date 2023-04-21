import {config} from 'dotenv';
config()

export const PORT = process.env.PORT
export const apiKey = process.env.OPENAI_API_KEY
export const serverUrl = process.env.SERVER_URL