var fs = require('fs');
var koa_router = require("koa-router");

var addMapping = function(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET ')){
            //如果url是GET方式的
            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        }else if(url.startsWith('POST ')){
            //如果url是POST方式的
            var path = url.substring(5);
            router.post(path,mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        }else{
            //无效的URL
            console.log(`invalid URL: ${url}`);
        }
    }
}

var addController = function(router,controller_dir){
    var files = fs.readdirSync(__dirname+'\\'+controller_dir);
    //过滤中.js文件
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    });

    //处理每个js文件
    for(var f of js_files){
        console.log(`process controller: ${f}`);
        //导入js文件
        var mapping = require(__dirname + "/controllers/" + f); 
        addMapping(router, mapping);
    }
}

module.exports = function(dir){
    //定义controller文件夹，和路由对象
    var controller_dir = dir||'controllers',
        router = new koa_router();
    //调用路由注册方法
    addController(router,controller_dir);
    return router.routes();
}