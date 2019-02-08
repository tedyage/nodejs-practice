'use strict'
var fs = require('mz/fs');
var mime = require("mime");
var path = require("path");

module.exports = function(url,dir){
    //如果dir为空，则默认是static
    dir = dir||"static";
    return async(ctx,next)=>{
        //获取请求路径
        var rpath = ctx.request.path;
        //判断请求是否是url开头的
        if(rpath.startsWith(url)){
            //获取文件名
            var file = rpath.substring(url.length);
            file = path.join(__dirname,dir,file);
            console.log(`static file is ${file}`);
            //判断该文件是否存在
            var stat = await fs.stat(file);
            if(stat.isFile()){
                ctx.response.type=mime.getType(file);
                ctx.response.body = await fs.readFile(file);
            } 
        } 
    }
}