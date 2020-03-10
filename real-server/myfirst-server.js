let http = require('http');
let fs = require('fs');
let server = http.createServer();
let url = require('url');
let public_resource = '../stage';
server.on('request', function (req, res) {
    let pathname = url.parse(req.url).pathname;
    if (pathname.indexOf('/public') === 0) {
        fs.readFile(public_resource + pathname, (err, data) => {
            if (!err) return res.end(data);
            res.end('404 Not Found');
        })
    } else {
        switch (pathname) {
            case '/':
                fs.readFile(public_resource + '/views/index.html', (err, data) => {
                    if (err) throw err;
                    res.end(data);
                });
                break;
            case '/clock':
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                fs.readFile(public_resource + '/views/clock.html', (err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
                        res.end("文件访问失败");
                    } else {
                        res.end(data);
                    }
                });
                break;
            case '/image':
                fs.readFile(public_resource + '/image/image.jpg', (err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
                        res.end("文件访问失败");
                    } else {
                        res.writeHead(200, {'Content-Type': 'image/jpeg'});
                        res.end(data);
                    }
                });
                break;
            case '/tools':
                fs.readFile(public_resource + '/tools/tools.js', (err, data) => {
                    if (err) {
                        res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
                        res.end("文件访问失败");
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/x-javascript;charset=utf-8'});
                        res.end(data);
                    }
                });
                break;
            default:
                res.writeHead(404, {'Content-Type': 'text/plain;charset=utf-8'});
                res.end('页面不存在');
                break;
        }
    }

})
;
server.listen(3000, () => {
    console.log('server start');
})