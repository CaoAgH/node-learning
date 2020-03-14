const express = require('express');
const fs = require('fs');
const body_parser = require('body-parser');

let origin_data;
fs.readFile('./database/database.txt', 'utf8', (err, data) => {
    if (err) throw err;
    origin_data = JSON.parse(data);
});
const title = '留言板';
const author = 'From cyq';
let new_data;

const app = express();

app.use('/static', express.static('./public'));
//配置使用art-template模板引擎
//第一个参数表示以.html结尾的文件用模板引擎渲染
app.engine('html', require('express-art-template'));

//配置 body-parser,完成后在request中会有一个包含了post传递参数的body属性
// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({extended: false}))
// parse application/json
app.use(body_parser.json())

//修改views的映射目录
// app.set('views','./public/page')

app.listen(3000, () => {
    console.log('running...');
});

app.get('/', (req, res) => {
    res.render('message.html', {
        message: origin_data,
        title: title,
        author: author
    })
});

app.get('/post', (req, res) => {
    res.render('post.html');
})

//get版本
// app.get('/submit', (req, res) => {
//     new_data = req.query
//     new_data.time = getTime();
//     origin_data.unshift(new_data);
//     save_data(origin_data);
//     res.redirect('/');
//     //res.redirect('/') 与下面的代码等价
//     // res.statusCode = 302;
//     // res.setHeader('Location','/');
//     // res.end();必须要有end，不然就算重定向了也会一直等待
// });

//post版本
app.post('/submit', (req, res) => {
    console.log(req.body);
    new_data = req.body;
    new_data.time = getTime();
    origin_data.unshift(new_data);
    save_data(origin_data);
    res.redirect('/')
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
    fs.writeFile('./database/database.txt', str, (err) => {
        if (err) throw err;
        console.log('saved');
    })
}


