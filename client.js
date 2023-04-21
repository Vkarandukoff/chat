import io from 'socket.io-client';
import { createInterface } from 'readline';
import {serverUrl} from "./constants.js";

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = io(serverUrl);

readline.question('You: ', (message) => {
  socket.emit('message', message);
})

socket.on('message', (message) => {
  console.log('ChatGPT:', message);
  readline.question('You: ', (message) => {
    socket.emit('message', message)
  })
});
