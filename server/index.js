const http = require('http');
const queue = require('./js/messageQueue.js');
const keypressHandler = require('./js/keypressHandler');
const httpHandler = require('./js/httpHandler');

keypressHandler.initialize(queue.enqueue);
httpHandler.initialize(queue);

const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);

