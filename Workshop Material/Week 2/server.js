let http = require('http');
http.createServer(function (request, response) {
console.log('request ', request.url);
let url = request.url;
var msg;
console.log('request ', url);
response.writeHead(200);
switch (url) {
case '/unit':
msg = "Hello from FIT2095";
break;
case '/year':
msg = "it's 2020";
break;
default:
msg = "Have a good day!!";
break;
}
response.end(msg);
}).listen(6789);
console.log('Server running at http://127.0.0.1:6789/');