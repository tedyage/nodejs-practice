'use strict'

var fs = require("fs");

//Read a txt asynchronously
fs.readFile('sample.txt','utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        console.log(data);
        console.log(data.length + ' bytes');
    }
});

//Read a image asynchronously
fs.readFile('sample.jpg',function(err,data){
    if(err){
        console.error(err);
    }else{
        //console.log(data.toString());   //Buffer->String
        console.log(data.length + ' bytes');
    }
});

//Read a txt synchronously
try{
    var data = fs.readFileSync('sample.txt','utf-8');
    console.log(data);
}catch(err){
    console.error(err);
}

//Create a directory
try{
    if(!fs.existsSync('output'))
        fs.mkdtempSync('output')
}
catch(err){
    console.error(err);
}

//Write a file asynchronously
var data = 'Hello, I am learning how to write a file asynchronously.';
fs.writeFile('output/output1.txt',data,function(err){
    if(err){
        console.error(err);
    }else{
        console.log('Complete.');
    }
});

//Write a file synchronously
try{
    data = 'Hello, I am learning how to write a file synchronously.';
    fs.writeFileSync("output/output2.txt",data);
}catch(err){
    console.error(err);
}

//Get file information
fs.stat('sample.jpg',function(err,stats){
    if(err){
        console.error(err);
    }else{
        //是否是文件
        console.log('isFile: '+stats.isFile());
        //是否是目录
        console.log("isDirectory "+stats.isDirectory());
        if(stats.isFile()){
            //文件大小
            console.log('size: '+stats.size);
            //文件创建时间
            console.log('birth time: '+stats.birthtime);
            //修改时间
            console.log('modified time: '+stats.mtime);
        }
    }
})