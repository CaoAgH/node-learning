const mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

//创建一个模型——即设计数据库
const people = mongoose.model('people', {name: String,age:Number});

for (let i = 0; i < 19; i++) {
    //实例化一个Cat
    const person = new people({name: `person${i}`,age:20});

//持久化保存Cat实例
    person.save().then(() => console.log('Yo!'));
}
