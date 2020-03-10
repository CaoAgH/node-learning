/**
 * 引用http模块
 */
let http = require('http');
/**
 * 创建http服务器
 * http.createServer(callback1).listen(port,callback2);
 * @port:监听的端口号
 * @callback1(request,response),参数分别是请求与响应
 * */
http.createServer(function (request, response) {
    /**
     * 设置响应头
     * response.writeHead(status_code,{});
     * @status_code:返回状态码
     * @{}：该对象中可以设置content-type等内容，如果返回内容含有中文，则需要在content-type中补充 ;charset=utf-8
     */
    response.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
    /**
     * 设置响应头的另一种方式
     * response.setHeader(name,value)
     * 直接设置Response Headers里可设置的内容
     */
    //response.setHeader('content-type','text/html;charset=utf-8');
    /**
     * 设置返回内容
     * response.write(string)        返回内容必须是字符串形式的
     */
    response.write('<h1>hello world!</h1><h1>我的首个node.js服务器</h1>');
    /**
     * 终止响应并返回内容
     * response.end(string)       可以为空，如有返回内容则还是以字符串形式，返回的内容还是会呈现在网页上
     */
    response.end('<style>body{background-color: #222222;}div{padding: 2em;border: 2em solid #47a1a2;color: white;}h1{color: white;}</style><div>yo</div>');

}).listen(2233, function () {
    console.log('服务器创建成功')
})