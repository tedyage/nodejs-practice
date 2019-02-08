'use strict'
var koa = require("koa");
var koa_bodyparser = require("koa-bodyparser");
var controller = require("./controller");

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
})

app.use(koa_bodyparser());

app.use(controller("controllers"));

app.listen(3000);

console.log("app start to listen...");