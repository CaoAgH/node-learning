let http = require('http');
let fs = require('fs');
let url = require('url');
let template = require('art-template');

let root = './views';
let sent_data;
let origin_data;
fs.readFile('./data/database.txt', 'utf8', (err, data) => {
    if (err) throw err;
    origin_data = JSON.parse(data);
});
let final;

http
    .createServer((request, response) => {
        let resource = url.parse(request.url).pathname;
        if (resource === '/') {
            fs.readFile(`${root}/page/message.html`, (err, data) => {
                if (!err) {
                    final = template.render(data.toString(), {message: origin_data});
                    return response.end(final);
                }
                fs.readFile(`${root}/page/404.html`, (err, data) => {
                    if (!err) return response.end(data);
                })
            })
        } else if (resource.indexOf('/public') === 0 || resource.indexOf('/page') === 0) {
            fs.readFile(`${root + resource}`, (err, data) => {
                if (!err) {
                    return response.end(data);
                }
                fs.readFile(`${root}/page/404.html`, (err, data) => {
                    if (!err) return response.end(data);
                })
            })
        } else if (resource.indexOf('/message') === 0) {
            sent_data = url.parse(request.url, true).query;
            sent_data.time = getTime();
            origin_data.unshift(sent_data);
            save_data(origin_data);
            response.statusCode = 302;
            response.setHeader('Location', '/');
            response.end();
            return;
        } else {

        }

    })
    .listen(3000, () => {
        console.log('running...')
    })

function getTime() {
    let time = new Date();
    let ret = `${format(time.getFullYear())}-${format(time.getMonth() + 1)}-${format(time.getDate())} ${format(time.getHours())}:${format(time.getMinutes())}:${format(time.getSeconds())}`;
    return ret;
}

function format(num) {
    return num > 10 ? num + '' : '0' + num;
}

function save_data(data) {
    let str = JSON.stringify(data);
    fs.writeFile('./data/database.txt', str, (err) => {
        if (err) throw err;
        console.log('saved');
    })
}

