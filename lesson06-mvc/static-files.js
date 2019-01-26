'use strict'
var path = require('path');
var mime = require('mime');
var fs = require('mz/fs');

//读取静态文件
var staticFiles = function(url,dir){
    
    return async(ctx,next)=>{
        //读取静态文件请求
        var rpath = ctx.request.path;
        //判断此请求是否有参数url起始
        if(rpath.startWith(url)){
            //读取文件名
            var filename = rpath.substring(url.length);
            filename = path.join(dir,filename);
            //判断文件是否存在
            if(await fs.exists(filename)){
                ctx.response.type = mime.lookup(rpath);
                //读取并输出文件内容
                ctx.response.body = await fs.read(filename)
            }else{
                ctx.response.status = 404;
            }
        }else{
            await next();
        }
    };
};

module.exports = staticFiles;
