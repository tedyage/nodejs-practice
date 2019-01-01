'use strict'
//导入Koa框架
var koa = require('koa');
//定义Koa对象
var app = new koa();
//对于每一个http请求，app将调用异步函数来处理，
//ctx里封装了request变量和response变量
app.use(async(ctx,next)=>{
    console.log(`${ctx.request.method}${ctx.request.url}`);
    var start = new Date().getTime();   //获取当前时间
    await next();  //调用下一个middleware
    var ms = new Date().getTime()-start;   //耗费时间
    console.log(`Time:${ms}ms`);  
});

app.use(async (ctx,next)=>{
    //await next();
   
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa!</h1>';
});

app.use(async (ctx,next)=>{
    await next();
    console.log("abc");
});

app.listen(3000);

console.log('app started at port 3000...');

