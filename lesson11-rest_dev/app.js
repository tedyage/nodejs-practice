'use strict'
const koa = require("koa");
const koa_bodyparser = require("koa-bodyparser");
const static_files  = require("./static-files");
const templating = require("./templating");
const rest = require("./rest");
const controller = require("./controller");
//初始化koa对象app
var app = new koa();

app.use(async(ctx,next)=>{
    console.log(`${ctx.request.method} ${ctx.request.path}`);
    await next();
});

app.use(async(ctx,next)=>{
    var startTime = Date.now();
    var processTime;
    await next();
    processTime = Date.now()-startTime;
    console.log(`This request processed in ${processTime}ms.`);
});

app.use(koa_bodyparser());

app.use(static_files("/static/","static"));

var isdevelopment = process.env.ENV_NODE==="development";
app.use(templating('views',{
    autoescape:true,
    noCache:!isdevelopment,
    watch:!isdevelopment,
    throwOnUndefined:false,
}));

app.use(rest.restify());

app.use(controller());

//监听端口3000
app.listen(3000);
console.log("app start to listen...");

