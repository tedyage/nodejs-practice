'use strict'
//引用koa框架
var koa = require('koa');   
//引用koa-router
var koa_router = require('koa-router');
//定义koa-bodyparser
var koa_bodyparser = require('koa-bodyparser');
//定义koa对象
var app = new koa();
//定义koa_router对象
var router = new koa_router();
//定义koa_bodyparser
var bodyparser = new koa_bodyparser();

//将bodyparser注册到app上
app.use(bodyparser);
//将router注册到app上
app.use(router.routes());

app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method}${ctx.request.url}...`);
    await next();
});

router.get('/hello/:name',async (ctx,next)=>{
    var name = ctx.params.name;
    console.log(`name:${name}`);
    ctx.response.body = `<h1>Hello, ${name}</h1>`;
});

router.get('/',async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="tedyage" /></p>
        <p>Password: <input name='password' type="password" /></p>
        <p><input type='submit' value='Submit'/></p>
    </form>`
});

router.post('/signin', async (ctx,next)=>{
    var name = ctx.request.body.name||'',
        password = ctx.request.body.password||'';
    console.log(`signin with name: ${name}, password: ${password}`);
    if(name == 'tedyage'&& password == '12345'){
        ctx.response.body = `<h1>Welcome,${name}!</h1>`;
    }else{
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again.</a></p>`;
    }
});

app.listen(3000);
console.log('app started at port 3000...');