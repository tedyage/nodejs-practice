'use strict'

//引入hello模块
var greet = require("./hello");

var s = 'Michael';

greet(s); //Hello Michael

//引入hello2模块
var hello2 = require("./hello2");

hello2.greet(s);
hello2.hello();