let http = require('http');
let fs = require('fs');
// fs.readdir('./www',{encoding:'utf8',withFileTypes:false},(err,files)=>{
//     if(!err){
//         files.forEach((el)=>{
//             if(fs.statSync(`./www/${el}`).isDirectory()){
//               return  console.log('目录')
//             }
//             if(fs.statSync(`./www/${el}`).isFile()){
//                 return console.log('文件')
//             }
//         })
//     }
// })
let url = require('url');
let server = http.createServer();
let root = './www'
// 冗余版本
// server.on('request',(request,response)=>{
//     let pathname = url.parse(request.url).pathname;
//     switch(pathname){
//         case '/readme.md':
//             fs.readFile(`${root}/readme.md`,'utf-8',(err,data)=>{
//                 if(!err){
//                     response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
//                     response.end(data);
//                 }
//                 else{
//                     response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(`<h1>Not Found 404</h1>`);
//                 }
//             })
//             break;
//         case '/index.html':
//             fs.readFile(`${root}/index.html`,'utf-8',(err,data)=>{
//                 if(!err){
//                     response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(data);
//                 }
//                 else{
//                     response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(`<h1>Not Found 404</h1>`);
//                 }
//             })
//             break;
//         case '/login/login.html':
//             fs.readFile(`${root}/login/login.html`,'utf-8',(err,data)=>{
//                 if(!err){
//                     response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(data);
//                 }
//                 else{
//                     response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(`<h1>Not Found 404</h1>`);
//                 }
//             })
//             break;
//         case '/':
//             fs.readFile(`${root}/index.html`,'utf-8',(err,data)=>{
//                 if(!err){
//                     response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(data);
//                 }
//                 else{
//                     response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
//                     response.end(`<h1>Not Found 404</h1>`);
//                 }
//             })
//             break;
//         default:
//             response.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
//             response.end(`<h1>Not Found 404</h1>`);
//             break;
//     }
// })

//轻便版本
//无模板引擎
server.on('request', (request, response) => {
    let pathname = url.parse(request.url).pathname;
    let finalView = '';
    if (pathname !== '/') {
        fs.readFile(`${root + pathname}`, (err, data) => {
            if (!err) {
                if (/\.md|\.txt$/i.test(root + pathname)) {
                    response.setHeader('Content-Type', 'text/plain;charset=utf-8');
                }
                response.end(data);
            } else {
                response.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'});
                response.end(`<h1>Not Found 404</h1>`);
            }
        })
    } else {
        fs.readdir('./www', {encoding: 'utf8', withFileTypes: false}, (err, files) => {
            if (!err) {
                fs.readFile('./template.html', 'utf8', (err, data) => {
                    if (!err) {
                        files.forEach((element) => {
                            if(fs.statSync(`./www/${element}`).isFile()){
                               return  finalView += `
    <tr>
        <td data-value="images/"><a class="icon file" href="/F:/001web-learning/node.js/review/real-server/www/images/">${element}/</a>
        </td>
        <td class="detailsColumn" data-value="0"></td>
        <td class="detailsColumn" data-value="1583378941">2020/3/5 上午11:29:01</td>
    </tr>`;
                            }else{
                              return  finalView += `
    <tr>
        <td data-value="images/"><a class="icon dir" href="/F:/001web-learning/node.js/review/real-server/www/images/">${element}/</a>
        </td>
        <td class="detailsColumn" data-value="0"></td>
        <td class="detailsColumn" data-value="1583378941">2020/3/5 上午11:29:01</td>
    </tr>`;
                            }

                        })
                        data = data.replace('^_^',finalView);
                        response.end(data)
                    }
                })
            }
        })
    }


})



server.listen(3000, () => {
    console.log('running....')
})
