const collection = require('./mongodb');

exports.getAll = function (callback) {
    collection.find((err,data)=>{
        if(err) return callback(err);
        callback(null,data);
    })
}

exports.insertOne = function (data,callback) {
    collection.create(data,(err,ret)=>{
        if(err) return callback(err);
        return callback();
    })
}