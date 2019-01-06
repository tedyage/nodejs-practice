'use strict'
var nunjucks = require('nunjucks');

var createEnv = function(path,opts){
    //定义是否自动转移变量autoescapte
    var autoescape = opts.autoescape||true,
    //定义模板变化后系统是否会自动更新watch
    watch = opts.watch || false,
    //定义模板加载后是否会存入缓存中noCache
    noCache = opts.noCache || false,
    //定义获取上下文中的值为Null或者Undefined时是否会抛出异常throwOnUndefined
    throwOnUndefined = opts.throwOnUndefined || false,
    //定义Environment类对象
    env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path,{
        watch:watch,
        noCache:noCache
    }),{
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined
    });
    //给env加过滤器
    if(opts.filters){
        for(var f in opts.filters){
            env.addFilter("hex",opts.filters[f]);
        }
    }
    return env;
};

var env = createEnv('views',{
    watch:true,
    filters:{
        'hex':function(n){
            return '0x'+n.toString(16);
        }
    }
});

env.render('hello.html',{name:'<script>alert("小明")</script>'},function(err,res){
    if(err){
        console.error(err);
    }else{
        console.log(res);
    }
});