let http = require('http');
let url = require('url');
let server = http.createServer(function (request,response) {
    response.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    let pathname = url.parse(request.url).pathname;
    switch(pathname){
        case '/index':
            response.write(`<h1>hello world again</h1><h2>我在复习如何搭建一个简单地web服务器</h2>`);
            break;
        case '/thought':
            response.write(`<h1>hello world again</h1><h2>顺便复习一下简单地按照不同路由给不同响应</h2>`);
            break;
        case '/time':
            response.write(`<h1>hello world again</h1><h2>${getTime()}</h2>`);
            break;
        default:
            response.writeHead(404,{'content-type':'text/html'})
            response.write(`<h1>Yo!</h1><h2>Page missing</h2>`);
            break;
    }
    response.end(`<style>body{background-color: tomato;color:white}</style>`)
});
server.listen(2333,function(){
    console.log('success')
});
function getTime() {
    return new Date();
}

// let http = require('http');
// let server = http.createServer(function (request,response) {
//     response.setHeader('content-type','text/html;charset=utf-8');
//     response.write(`<h1>hello world again</h1><h2>我在复习如何搭建一个简单地web服务器</h2>`);
//     response.end(`<style>body{background-color: tomato;color:white}</style>`)
// });
// server.listen(2333,function(){
//     console.log('success')
// });