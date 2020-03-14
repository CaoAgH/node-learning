const collection = require('./mongodb').mongoCollection;
/**
 * 获得学生列表
 */
exports.get_columns = function (callback) {
    collection.find((err, data) => {
        if (err) return callback(err);
        return callback(null, data);
    })
}

/**
 * 用主键查询学生信息
 * */
exports.lock = function (_id, callback) {
    let end = _id.length-1;
    collection.find({
        _id: _id.slice(1,end)
    }, (err, data) => {
        if (err) return callback(err);
        return callback(null, data);
    })
}

/**
 * 用关键词查询学生信息
 * */
exports.search = function (keywords, callback) {
    let reg = new RegExp(keywords, 'i'); //不区分大小写
    collection.find({
        $or: [
            {name: {$regex: reg}},
            {sex: {$regex: reg}},
            {grade: {$regex: reg}},
            {subject: {$regex: reg}}
        ]
    }, (err, data) => {
        if (err) return callback(err);
        if (data.length == 0) {
            collection.find({id: keywords*1}, (err, findById) => {
                if (err) return callback(err);
                return callback(null, findById);
            })
        } else {
            return callback(null, data);
        }
    });
}

/**
 * 添加学生记录
 */
exports.add_column = function (column, callback) {
    column.id *= 1;
    collection.create(column, (err, data) => {
        if (err) return callback(err);
        return callback();
    })
}

/**
 * 修改学生信息
 * */
exports.change = function (changed_column, callback) {
    let end = changed_column.key.length-1;
    collection.updateMany({
        _id: changed_column.key.slice(1,end)
    }, {
        name: changed_column.name,
        id: changed_column.id * 1,
        sex: changed_column.sex,
        grade: changed_column.grade,
        subject: changed_column.subject
    }, (err, ret) => {
        if (err) return callback(err);
        return callback();
    });
}

/**
 * 删除学生信息
 * */

exports.delete = function (_id, callback) {
   let end = _id.length-1;
    collection.deleteMany({_id: _id.slice(1,end)}, (err, ret) => {
        if (err) return callback(err);
        return callback();
    })
}




