'use strict'

var fs = require("fs");

//打开一个读取流
var rs = fs.createReadStream('sample.txt','utf-8');

rs.on('data',function(chunk){
    console.log("Data: ");
    console.log(chunk);
});

rs.on('end',function(){
    console.log("End");
});

rs.on('error',function(err){
    console.error('ERROR: '+err);
});

//创建output文件夹
try{
    if(!fs.existsSync('output')){
        fs.mkdirSync('output');
    }
}catch(err){
    console.error(err)
}

//打开一个写入流
var ws1 = fs.createWriteStream('output/output1.txt','utf-8');
ws1.write('I am learning how to write a file using write stream.');
ws1.end();

var ws2 = fs.createWriteStream('output/output2.txt','utf-8');
ws2.write(new Buffer('I am learning writing using stream.'));
ws2.end();

//pipe
var rs2 = fs.createReadStream('sample.txt','utf-8');
var ws3 = fs.createWriteStream('output/pipe.txt','utf-8');
rs2.pipe(ws3);