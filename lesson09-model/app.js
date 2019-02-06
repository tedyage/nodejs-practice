'use strict'
//引用koa框架
var koa = require('koa');   
//定义koa-bodyparser
var koa_bodyparser = require('koa-bodyparser');
//定义controller
var controller = require('./controller');
//定义koa对象
var app = new koa();
//定义koa_bodyparser
var bodyparser = new koa_bodyparser();
//定义staticFiles
var staticFiles = require('./static-files');
//定义template
var template = require('./template');

//服务器输出每一个请求，和请求时间
app.use(async(ctx,next)=>{
    console.log(`${ctx.request.method}, ${ctx.request.path}.`);
    await next();
});

//服务器输出每一个请求的执行时长
app.use(async(ctx,next)=>{
    var start = new Date().getTime();
    await next();
    var time = new Date().getTime()-start;
    console.log(`Time: ${time}ms.`);
});
//app载入bodyparser
app.use(bodyparser);
//app载入static-files
app.use(staticFiles('/static/',__dirname+'/static'));
//app载入templating
var isdevelopment = process.env.NODE_ENV=="development";
app.use(template('views',{
    autoescape:true,
    nocache:isdevelopment,
    watch:isdevelopment,
    throwOnUndefined:false
},{}));
//app载入controller
app.use(controller("controllers"));

app.listen(3000);
console.log("The server is listening ...");

/*//定义model
var model = require("./model");
var User = model.User;
//创建一条user数据
var createUser = async(username,password,email,gender)=>{
    var user = await User.create({
        username:username,
        password:password,
        email:email,
        gender:gender
    });
    console.log(`Create a User ${JSON.stringify(user)}.`);
};
createUser("tedyage","123456","tedyage@sina.com",true);*/
