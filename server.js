import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { Configuration, OpenAIApi } from "openai";
import {apiKey, PORT} from "./constants.js";

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const configuration = new Configuration({
  apiKey
});
const openai = new OpenAIApi(configuration);

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.on('message', async (message) => {
    console.log('Received message:', message);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message}],
    });
    socket.emit('message', completion.data.choices[0].message.content);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
