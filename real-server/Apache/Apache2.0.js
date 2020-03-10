let http = require('http');
let fs = require('fs');
let url = require('url');
let template = require('art-template');
let server = http.createServer();
let root = './www'

/**
 * 模板引擎渲染
 * template.render(str,obj)
 * @str 模板字符串
 * @obj 替换对象
 * ！！！！！！！模板引擎不关心内容，只会处理 {{}}中要替换的内容
 */



//轻便版本
//使用模板引擎
server.on('request', (request, response) => {
    let pathname = url.parse(request.url).pathname;
    let finalView;
    if (pathname !== '/') {
        fs.readFile(`${root + pathname}`, (err, data) => {
            if (!err) {
                if (/\.md|\.txt$/i.test(root + pathname)) {
                    response.setHeader('Content-Type', 'text/plain;charset=utf-8');
                }
                response.end(data);
            } else {
                response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
                response.end(`<h1>Not Found 404</h1>`);
            }
        })
    } else {
        fs.readdir('./www', {encoding: 'utf8', withFileTypes: false}, (err, files) => {
            if (!err) {
                let ret = [];
                files.forEach((el) => {
                    if (fs.statSync(`./www/${el}`).isFile()) {
                        ret.push({value: el, type: 'File'});
                    } else {
                        ret.push({value: el, type: 'Directory'});
                    }
                });
                fs.readFile('./template-engine.html', 'utf8', (err, data) => {
                    if (!err) {
                        finalView = template.render(data, {
                            files: ret,
                            title: '可访问目录'
                        });
                        response.end(finalView);
                    }
                })
            }
        })
    }


})

server.listen(3000, () => {
    console.log('running....')
})
