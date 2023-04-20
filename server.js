import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { Configuration, OpenAIApi } from "openai";

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocketServer({ server });

const configuration = new Configuration({
  apiKey: "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",
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

  // ws.send('Hi there, I am a WebSocket server!');
});

server.listen(3000, () => console.log("Server started"))