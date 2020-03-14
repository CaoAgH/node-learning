const express = require('express');
const body_parser = require('body-parser');
const router = require('./router');

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

app.use(router);



