let fs_module = require('fs');
/**
 * readFile(path[,options],callback)
 * @path: 文件路径 string
 * @options: 配置项 object ｛encoding:null,flag:'r'｝------默认值
 * @callback： 回调函数 Function 有error和data两个参数传入 读取成功：error为null data为文件中的数据；读取失败：data为undefined，error为错误对象
 */
fs_module.readFile('../stage/for-file-system/readme.txt/','utf-8',(error,data)=>{
    if(error) throw error;
    console.log(data);
})

fs_module.readFile('../stage/for-file-system/readme.txt/',(error,data)=>{
    if(error) throw error;
    console.log(data);
    console.log(data.toString());
})

let options = {
    /**
     * flag:'w+'   当文件不存在的时会创建该文件
     */
    encoding:'utf-8',
    flag:'w+'
}
fs_module.readFile('../stage/for-file-system/readme2.txt/',options,(error,data)=>{
    if(error) throw error;
    console.log(data);
});