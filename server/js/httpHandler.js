const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js');
//const messageQueue = require('./messageQueue.js');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// module.exports.initialize = (queue) => {
//   return (req, res) => {
//     ;
//     res.writeHead(200, headers);
//     res.end(command);
//   }
// messageQueue = queue;
//console.log(messageQueue);
// };


module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  // if statement for req.method === GET
  if (req.method === 'GET') {
    // messageQueue.enqueue(data);
    response = messageQueue.dequeue();
    res.writeHead(200, headers);
    res.end(response);
    next();
  }

  if (req.method === 'POST') {
    res.writeHead(200, headers);
    res.end(response);
    next(); // invoke next() at the end of a request to help with testing!
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end(res);
  }
};



