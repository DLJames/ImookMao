let user = require('./User');
const path = require('path');

console.log(`user:${user.userName}`);
console.log('path==', path.dirname(__dirname));

let http = require('http');
let url = require('url');
let util = require('util');

http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/palin');
    // res.end('Hello, node.js');
    res.end(util.inspect(url.parse(req.url)));
}).listen(3000, '127.0.0.1', ()=>{
    console.log('server is running at 127.0.0.1:3000');
});