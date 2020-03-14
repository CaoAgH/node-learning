const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/curd', {useNewUrlParser: true, useUnifiedTopology: true});

const Schema = mongoose.Schema;

const curdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
});

const column = mongoose.model('Info', curdSchema);

exports.mongoCollection =  column;