const http = require('http');
const url = require('url');
const {load} = require('./static/router');

http.createServer({
    insecureHTTPParser: true
}, function (request, response) {
    const {pathname, query} = url.parse(request.url);
    const _data = load(pathname);
    if (_data) {
        const {head, file} = _data;
        response.writeHead(200, head);
        response.end(file);  
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404 error! File not found.");
    }

}).listen(1111);