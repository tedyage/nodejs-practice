'use strict'
//导入http模块
var http = require("http");
//导入url模块
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));
//导入path模块
var path = require('path');
var workDir = path.resolve('.');
console.log(workDir);
console.log(path.join(workDir,'pub','index.html'));
//导入fs模块
var fs = require('fs');

//创建http server,并传入回调函数
var server = http.createServer(function(request,response){
    console.log(request.method+": "+request.url);
    //获得URL的path
    var pathname = url.parse(request.url).pathname;
    //获取文件路径
    var filename = path.join(workDir,pathname);
    //获取文件状态
    fs.stat(filename, function(err,stats){
        if(!err&&stats.isFile()){
            //没有出错并且文件存在
            console.log('200 '+request.url);
            response.writeHead(200);
            fs.createReadStream(filename).pipe(response);
        }else{
            //出错了或者文件不存在
            console.error('404 '+request.url);
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

//服务器监听8080
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080');