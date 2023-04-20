import {WebSocket} from "ws";
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretKey = "1337";
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', event => {
  console.log('WebSocket connection established!');

  readline.question('Enter secret key: ', key => {
    if (key !== secretKey) {
      console.log('Authentication failed! Closing connection...');
      socket.close();
      return;
    }
    console.log('Authentication successful!');
    readline.question('You: ', message => {
      socket.send(message);
    });
  });
});

socket.addEventListener('message', event => {
  console.log('ChatGPT: ', event.data.toString());

  readline.question('You: ', message => {
    socket.send(message);
  });
});
