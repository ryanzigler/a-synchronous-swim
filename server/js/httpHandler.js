const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = (require('./messageQueue'));
module.exports.initialize = (queue) => {
  messageQueue = queue;
  console.log(messageQueue);
};


module.exports.router = (req, res, next = ()=>{}) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      res.end(messageQueue.dequeue());
      next();
    } else if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
        next();
      });
    }
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 404 : 201, headers);
        res.end();
        next();
      });
    });
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  }
};

// httpHandler.router(get.req, get.res, () => {
// expect(Buffer.compare(fileData, get.res._data)).to.equal(0);
