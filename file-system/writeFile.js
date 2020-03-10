let fs = require('fs');
/**
 *writeFile(path,data[,options],callback);写文件
 * @path: 目标文件的的路径 string
 * @data: 所要写入的数据
 * @options: 配置项 object default_options:{encoding:'utf8',mode:0o666,flag:'w'}
 * @callback: 回调函数 Function
 */
fs.writeFile('../stage/for-file-system/writeFile.md','测试写文件操作','utf8',function (error) {
    if(error) throw error;
    console.log('success');
    fs.writeFile('../stage/for-file-system/number.md',981013,function (error) {
        if(error) throw error;
        console.log('success again');
    })
})