var http = require("http");

var fs = require('fs');
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "application/json;charset=utf-8"});
  fs.readFile('./data/index.json',function(err,data){
// response.charset = 'utf8';
  response.write(data);
  response.end();
  })
}).listen(8888);
console.log('run server 127.0.0.1:8888')