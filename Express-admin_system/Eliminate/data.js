const fs = require('fs');
const dbPath = './database/data.txt';
/**
 * 获得学生列表
 * return []
 */
exports.get_columns = function (callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) return callback(err);
        callback(null, JSON.parse(data));
    })
}

/**
 * 用主键查询学生信息
 * */
exports.lock = function (key, callback) {
    getData((err, data) => {
        if (err) return callback(err);
        let locked = data.filter((el) => {
            if (el.key * 1 === key * 1) return true;
            return false;
        })
        callback(null, locked);
    })
}

/**
 * 用关键词查询学生信息
 * */
exports.search = function (keywords, callback) {
    getData((err, data) => {
        if (err) return callback(err);
        console.log(data);
        let matched = data.filter((el) => {
            for (let attr in el) {
                if (attr !== 'key') {
                    if (el[attr].indexOf(keywords) != -1) return true;
                }
            }
            return false;
        })
        callback(null, matched);
    })
}

/**
 * 添加学生记录
 */
exports.add_column = function (column, callback) {
    getData((err, data) => {
        if (err) return callback(err);
        column.key = data[0].key * 1 + 1;
        data.unshift(column);
        saveData(data, (err) => {
            if (err) return callback(err);
            return callback();
        })
    })
}

/**
 * 修改学生信息
 * */
exports.change = function (changed_column, callback) {
    getData((err, data) => {
        if (err) return callback(err);
        data.forEach((el, index, arr) => {
            if (el.key * 1 === changed_column.key * 1)
                arr[index] = changed_column;
        })
        saveData(data, (err) => {
            if (err) return callback(err);
        })
        return callback()
    })
}

/**
 * 删除学生信息
 * */

exports.delete = function (key, callback) {
    getData((err, data) => {
        if (err) return callback(err);
        let temp = data.filter((el) => {
            if (el.key * 1 != key * 1) return true;
            return false;
        })
        saveData(temp, (err) => {
            if (err) return callback(err);
        })
        return callback();
    })
}

/**
 * 封装文件读取API
 * */
function getData(callback) {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.log('文件读取失败');
            return callback(err);
        }
        callback(null, JSON.parse(data));
    })
}

/**
 * 封装文件写入API
 * */
function saveData(data, callback) {
    let fileData = JSON.stringify(data);
    fs.writeFile(dbPath, fileData, (err) => {
        if (err) return callback(err)
        callback();
        return console.log('saved');
    })
}
