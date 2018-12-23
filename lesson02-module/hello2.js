'use strict'

function hello(){
    console.log('Hello, world!');
};

function greet(name){
    console.log('Hello, ' + name + '!');
};

/*module.exports = {
    hello: hello,
    greet: greet
};*/

/*exports.hello = hello;
exports.greet = greet;*/

module.exports.hello = hello;
module.exports.greet = greet;