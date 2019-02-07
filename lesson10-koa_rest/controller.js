'use strict'
const fs = require('mz/fs');
const koa_router = require('koa-router');
const path = require('path');

var router = new koa_router();

var addController = function(filepath){
    //获取controller的所在路径
    filepath = filepath||'controllers';
    filepath = path.join(__dirname,filepath);
    //根据路径读取内部所有的js文件
    var files = fs.readdirSync(filepath);
    files = files.filter((f)=>f.endsWith(".js"));
    //遍历这些js文件
    for(var file of files){
        //调用addMapping方法
        addMapping(router,file,filepath);
    } 
};

var addMapping = function (router,file,filepath){
    //获取完整文件名
    file = path.join(filepath,file);
    //判断file是否存在
    var mapping = require(file);
    for(var url in mapping){
        var route_name;
        if(url.toLowerCase().startsWith('get ')){
            route_name=url.substring(4);
            router.get(route_name,mapping[url]);
        }else if(url.toLowerCase().startsWith('post ')){
            route_name = url.substring(5);
            router.post(route_name,mapping[url]);
        }else if(url.toLowerCase().startsWith('put ')){
            route_name = url.substring(4);
            router.put(route_name,mapping[url]);
        }else if(url.toLowerCase()/startsWith('delete ')){
            route_name = url.substring(7);
            router.del(route_name,mapping[url]);
        }
    }
};

module.exports = function(filepath){
    addController(filepath);
    return router.routes();
};