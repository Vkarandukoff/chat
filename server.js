import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { Configuration, OpenAIApi } from "openai";
import {apiKey, PORT} from "./constants.js";

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocketServer({ server });

const configuration = new Configuration({
  apiKey
});
const openai = new OpenAIApi(configuration);

webSocketServer.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Message from client: ${message.toString()}`)
    webSocketServer.clients.forEach(async (client) => {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message.toString() }],
      });
      client.send(completion.data.choices[0].message.content)
    });
  });

  ws.on("error", e => ws.send(e));
});

server.listen(PORT, () => console.log("Server started"))