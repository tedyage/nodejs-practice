'use strict'
var nunjucks = require('nunjucks');

//配置模板环境对象方法
//tempatePath为模板相对路径
//opt为模板环境配置项
//filters为模板过滤器
var createEnv = function(templatePath,opt,filters){
    var autoescape = opt.autoescape==undefined?true:opt.autoescape     //是否自动转义
    var nocache = opt.nocache||false;                                  //是否禁用缓存
    var watch = opt.watch||false;                                      //是否模板每次更新都会重新加载
    var throwOnUndefined = opt.throwOnUndefined||false;                //是否当undefined时，抛出异常
    //定义模板环境对象
    var env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(templatePath||'views',{
            noCache:nocache,
            watch:watch
        }),{
            autoescape:autoescape,
            throwOnUndefined:throwOnUndefined
        }
    );

    if(filters){
        for(var f in opt.filters){
            env.addFilter(f,opt.filters[f]);
        }
    }

    return env;
}

//渲染模板的方法
var templating = function(path,opt,filters){
    //初始化模板环境
    var env = createEnv(path,opt,filters);
    return async(ctx,next)=>{
        //上下文注册一个渲染方法
        ctx.render = function(view,model){
            //将模板渲染的内容赋值给response.body
            ctx.response.body = env.render(view,Object.assign({},ctx.state||{},model||{}));
            ctx.response.type="text/html";
        }

        await next();
    }
}

module.exports = templating;
