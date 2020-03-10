let http = require('http');
http.createServer(function (req,resp) {
    resp.writeHead(200,{'content-type':'application/json;charset=utf-8'});
    let data = {
        name:'曹寅清',
        age:'21',
        gf:'李雪玲',
        Anniversary:'2020-01-15'
    };
    let send_data = JSON.stringify(data);
    resp.write(send_data);
    resp.end();
}).listen(2233,function () {
    console.log('服务器创建成功');
})