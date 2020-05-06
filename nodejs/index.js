const http = require('http');
const fs = require('fs');


http.createServer({
    insecureHTTPParser: true
}, function (request, response) {

    // 加载 text/plain ：纯文本格式
    // response.writeHead(200, {'Content-Type': 'text/plain'});
    // const fs_text = fs.readFileSync('./static/aa.txt', 'utf8');
    // response.write(fs_text);

    // 加载 text/html ： HTML格式
    // response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    // const fs_html = fs.readFileSync('./static/aa.html');
    // response.write(fs_html);   

    // application/json： JSON数据格式
    // response.writeHead(200, {'Content-Type': 'application/json'});
    // const fs_data = fs.readFileSync('./static/aa.json');
    // response.write(fs_data); 

    // response.end();


    console.log(request.url);
    let url = request.url;
    if (url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const fs_html = fs.readFileSync('./static/aa.html');
        response.end(fs_html);
    } else if (url === '/text') {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        const fs_text = fs.readFileSync('./static/aa.txt', 'utf8');
        response.end(fs_text);
    } else if (url === '/json') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        const fs_data = fs.readFileSync('./static/aa.json');
        response.end(fs_data);
    } else if (url === '/favicon.ico') {
        // do nothing
    } else {
        response.writeHead(404, { "Content-Type": "text/plain" });
        response.end("404 error! File not found.");
    }

}).listen(1111);