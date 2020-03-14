const express = require('express');
const bodyParser = require('body-parser');
const router = require('./data_module_router.js')

const app = express();

app.use('/static', express.static('./public'));

app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('running on port 3000....');
})

// //自行封装路由函数并调用
// router(app);
//使用Express提供的路由容器
app.use(router)//将路由容器挂载到app服务中






