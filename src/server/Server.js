var http = require('http'),
    fs = require('fs'),
    db = require('./database/Database');

var server = http.createServer(function(req, res) {
  res.end('Hello from NodeJS!\n');
  console.log('Someone visited our web server!');
})

server.listen(3000, '0.0.0.0');
console.log("NodeJS web server running on 0.0.0.0:3000");