/**
 *有问题，返回的js语句不会执行
 */
let http = require('http');
// http.createServer(function (request,response) {
//     response.writeHead(200,{'content-type':'application/javascript;charset=utf-8'});
//     response.write(`console.log(11111)`);
//     response.end();
// }).listen(8080,function () {
//     console.log('本地服务器创建成功');
// })

http.createServer(function (req, resp) {
    resp.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
    resp.write('<h1>我没写错吧</h1>');
    resp.end('<style>body{background-color: #47a1a2;color: #ffffff;}</style>')
}).listen(8080, function () {
    console.log('success')
})
