'use strict'
var fs = require("fs");
var path = require("path");
var koa_router = require("koa-router");

var router = new koa_router();

var AddMapping = function(pathname, filename){
    //获取该文件的文件名
    filename = path.join(pathname,filename);
    //引用该文件
    var mapping = require(filename);
    //遍历引用之后的json
    for(var url in mapping){   
        var urlPath = '';    
        //判断是否是GET请求
        if(url.toLowerCase().startsWith('get ')){
            //获取路由名称
            urlPath = url.substring(4);
            //将路由和方法加载到router中
            router.get(urlPath,mapping[url]);
        }else if(url.toLowerCase().startsWith('post ')){
            //POST请求
            urlPath = url.substring(5);
            router.post(urlPath,mapping[url]);
        }else if(url.toLowerCase().startsWith('put ')){
            //PUT请求
            urlPath = url.substring(4);
            router.put(urlPath,mapping[url]);
        }else if(url.toLowerCase().startsWith('delete ')){
            //DELETE请求
            urlPath = url.substring(7);
            router.delete(urlPath,mapping[url]);
        }
        else{
            console.log(`invalid URL: ${url}`);
        }
    }
}

var AddControllers = function(pathname){
    //获取绝对路径
    pathname = path.join(__dirname,pathname);
    try{
        //读取路径下的所有文件
        var files = fs.readdirSync(pathname);
        //筛选所有js文件
        files = files.filter((f)=>f.endsWith(".js"));
        //循环每个js文件
        for(var i = 0; i< files.length; i++){
            //获取该文件中的所有controller方法
            //pathname为文件夹绝对路径
            //file[i]为js文件名
            AddMapping(pathname,files[i]);
        }
    }
    catch(e){
        console.error(e);
    }
};

module.exports = function(pathname){
    //载入pathname内部所有的controller
    AddControllers(pathname);
    //返回路由配置
    return router.routes();
}