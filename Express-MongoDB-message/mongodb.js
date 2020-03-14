const mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/custom', {useNewUrlParser: true, useUnifiedTopology: true});

const messageSchema = mongoose.Schema;

const message = new messageSchema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now()
    }
});

const collection = mongoose.model('Message', message);


module.exports = collection;
