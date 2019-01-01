'use strict'

var koa = require('koa');
var koa_bodyparser = require('koa-bodyparser');
var controller = require('./controller');

var app = new koa();

app.use(koa_bodyparser());
app.use(controller());

app.listen(3000);