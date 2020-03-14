const mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/custom', {useNewUrlParser: true, useUnifiedTopology: true});

//设计schema
//这一步实际上是在设计collection中的document结构
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: {type: Number, required: true},
    name: {type: String, required: true},
    id_num: {type: String, required: true},
    tel: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    sign_in_date: {
        type: Date,
        default: Date.now()
    }

})

//根据设计的Schema发布Module
//这一步是在数据库中创建了一个叫做'users'的collection，且其中的document结构是之前实例化的Schema
const user = mongoose.model('User', userSchema);

//创建数据
let new_user = new user({
    _id: 1000,
    name: '曹寅清',
    id_num: '63212719991001001X',
    tel: 17671649343,
    email: 'cyq@syzc.net.cn',
});
//将数据保存到数据库中
new_user.save((err) => {
    if (err) throw err;
    console.log('saved');
})

//使用Models.create()插入数据
const user2 = {
    _id: 1002,
    name: 'CaoAgH',
    id_num: '63212719991001001X',
    tel: 15207144003,
    email: '1170926653@qq.com',
}
user.create(user2, (err, ret) => {
    if (err) throw err;
    console.log('saved', ret);
})

//使用Models.create()插入多条数据
const users = [
    {
        _id: 1003,
        name: '草引擎',
        id_num: '63212719991001001X',
        tel: 15207144003,
        email: '1170926653@qq.com',
    },
    {
        _id: 1004,
        name: '大帅哥',
        id_num: '63212719991001001X',
        tel: 15207144003,
        email: '1170926653@qq.com',
    },
    {
        _id: 1005,
        name: '超牛逼',
        id_num: '63212719991001001X',
        tel: 15207144003,
        email: '1170926653@qq.com',
    }
]
user.create(users, (err, users) => {
    if (err) throw err;
    console.log('users saved')
});

//查询所有
user.find((err,data)=>{
    if(err) throw err;
    console.log('all',data);
})
//条件查询
user.find({_id:1001},(err,data)=>{
    if(err) throw err;
    console.log('条件查询1',data);
})
user.find({tel:15207144003},(err,data)=>{
    if(err) throw err;
    console.log('条件查询2',data);
})
user.findById(1001,(err,data)=>{
    if(err) throw err;
    console.log('条件查询3',data);
})

//修改数据
//Model.update()只会修改匹配到的第一条，有点废柴，所以还是用Model.updateMany()比较好
user.updateMany({tel:15207144003},{name:'none'},(err,ret)=>{
    if(err) throw err;
    console.log(ret);
});

//删除数据
user.deleteMany({id_num:'63212719991001001X'},(err,ret)=>{
    if(err) throw err
    console.log(ret);
})

