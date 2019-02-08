'use strict'
var fs = require("mz/fs");
var path = require("path");
var koa_router = require("koa-router");

var addMapping = function(router,mapping){
    for(var url in mapping){
        var route_name;
        if(url.toLowerCase().startsWith("get ")){
            //get请求
            route_name = url.substring(4);
            router.get(route_name,mapping[url]);
        }else if(url.toLowerCase().startsWith("post ")){
            //post请求
            route_name = url.substring(5);
            router.post(route_name,mapping[url]);
        }else if(url.toLowerCase().startsWith("put ")){
            //put请求
            route_name = url.substring(4);
            router.put(route_name,mapping[url]);
        }else if(url.toLowerCase().startsWith("delete ")){
            //delete请求
            route_name = url.substring(7);
            router.del(route_name,mapping[url]);
        }else{
            console.error(`Invalid route ${url}`);
        }
    }
}

var addController = function(router,dir){    
    var fp = path.join(__dirname,dir);
    //根据路径名读取改路径下所有js文件
    var files = fs.readdirSync(fp).filter((f)=>f.endsWith(".js"));
    //遍历js文件名数组
    for(var file of files){
        file = path.join(fp,file);
        var mapping = require(file);
        addMapping(router,mapping);
    }
};

module.exports=function(dir){
    //如果dir为空，则默认为controllers文件夹
    dir = dir||"controllers";
    var router = new koa_router();
    addController(router,dir);
    //返回所有controller方法
    return router.routes();
}