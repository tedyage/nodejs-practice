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

//app载入bodyparse
app.use(bodyparser);
//app载入controller
app.use(controller("controllers"));

app.listen(3000);
