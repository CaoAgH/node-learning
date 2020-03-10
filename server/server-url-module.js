/**
 * 这里主要是练习url模块的使用以及
 * 对不同route路由进行不同响应的实现
 */
let http = require('http');
/**
 *引入url模块
 */
let url_module = require('url');
let route;
let server = http.createServer(function (req, res) {
    /**
     * 获取客户端请求的url
     * @request.url  得到一个字符串类型的url链接
     * 通过调用module url中的parse()方法可以将URL字符串转换为URL对象
     * url对象中可以用作路由区别的键名是pathname，href和path不行，例如：https://edu.csdn.net/course/play/5925/111361?id=1008611#box
     * pathname:course/play/5925/111361
     * href:'https://edu.csdn.net/course/play/5925/111361?id=1008611#box'
     * path: '/course/play/5925/111361?id=1008611',
     */
    route = url_module.parse(req.url);
    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    switch (route.pathname) {
        case '/':
            res.write('this is index page');
            break;
        case '/index':
            res.write('这里是index页面');
            break;
        case '/user':
            res.write('这里是user页面');
            break;
        case '/msg':
            res.write('this is msg page');
            break;
        default:
            res.writeHead(404, {'content-type': 'text/plain;charset=utf-8'});
            res.write(`page doesn't exist`);
    }
    /**
     * module url中format({})方法用于将url对象转换成url字符串
     * module url中resolve(from,to)方法用于拼接url字符串
     * @from: 基准url
     * @to: 要替换成的部分
     * resolve()方法会从基准url的path+hash部分开始做替换,参数@to以'/'开头会直接替换整个path+hash，以字母开头则会替换path的最后一项及其后续部分
     */
    let url_obj = url_module.parse('https://edu.csdn.net/course/play/5925/111361')
    console.log(url_obj);
    res.end('\n' + url_module.format(url_obj));
    url_module.resolve('http://example.com/one/two/three?search=search#hash', 'four/five/six');// http://example.com/one/two/four/five/six
    url_module.resolve('http://example.com/one/two/three?search=search#hash', '/four/five/six');//http://example.com/four/five/six

});
server.listen(8080, function () {
    console.log('starting success')
})