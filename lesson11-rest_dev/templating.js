'use strict'
var nunjucks = require('nunjucks');
var path =require('path');

var createTemplate = function(dir,options){
    //是否自动转义，默认为true
    var autoescape = options.autoescape === undefined?true:options.autoescape;
    //是否不自动读取缓存
    var noCache = options.noCache||false;
    //是否主动监听模版的更新
    var watch = options.watch||false;
    //是否在遇到undefined情况下，抛出异常
    var throwOnUndefined = options.throwOnUndefined||true;
    //初始化模版环境对象
    var template = new nunjucks.Environment(new FileSystemLoader(dir,{
        noCache:noCache,
        watch:watch,
    }),{
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined,
    });

    //判断options中是否含有过滤器
    if(options.filters){
        //遍历过滤器，将过滤器加入到模版环境对象中
        for(var f in options.filters){
            template.addFilter(f,options.filters[f]);
        }
    }
    return template;
};

module.exports = function(dir,options){
    //如果dir为空，则默认是views
    dir = dir||'views';
    var fp = path.join(__dirname,dir);
    var template = createTemplate(fp,options);
    return async(ctx,next)=>{
        //获取请求路径
        var rpath = ctx.request.path;
        //判断请求路径是否已
        if(rpath.startsWith(fp)){            
            if(template){
                ctx.render = function(view,model){
                    ctx.response.type = "text/html";
                    ctx.response.body = template.render(view,Object.assign({},ctx.state||{},model||{}));
                }
            }
        }  
        await next();     
    }
}