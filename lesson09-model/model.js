var fs = require("fs");
var path = require("path");
var db = require("./db");
//定义读取模型文件路径
var fp = path.join(__dirname,"models");
//读取所有该路径下的js文件
var files = fs.readdirSync(fp).filter((f)=>{
    return f.endsWith(".js");
},files);
//初始化输出
module.exports={};
//遍历js文件
for(var file of files){
    //去文件名为输出对象的属性名
    var name = file.substring(0,file.substring(0,file.length-3));
    console.log(__dirname+"/models/"+file);
    //引用该文件，并输出该文件的输出
    module.exports[name] = require(__dirname+"/models/"+file);
}
//加入sync方法，调用db的sync方法
module.exports.sync = ()=>{
    db.sync();
}
