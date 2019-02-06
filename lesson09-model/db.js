var Sequelize = require("sequelize");
var config = require("./config");
//定义数据库连接实例
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:10000
    }
});

var uuid = require('node-uuid');
//生成Id
var generateId = function(){
    return uuid.v4();
};

//定义主键类型为字符串，长度为50字符
const ID_TYPE = Sequelize.STRING(50);
//定义创建Model的方法，
//name为Model名称，
//attributes为Model相关属性数组
var defineModel = function(name,attributes){
    var attrs = {};
    //自动加入主键ID
    attrs.id = {
        type:ID_TYPE,
        allowNull:false,
        primaryKey:true
    };

    //遍历属性数组
    for (var key in attributes){
        //获取当前属性
        var value = attributes[key];
        //判断当前属性是否是object
        if(typeof value === 'object' && value.type){
            //定义当前属性是否可为空，默认false
            value.allowNull = value.allowNull || false;
            //将此属性加入到attrs对象中
            attrs[key] = value;
        }else{
            attrs[key] = {
                type: value,
                allowNull: false,
            };
        }
    }   
    //自动加入创建时间戳
    attrs.createdAt = {
        type:Sequelize.BIGINT,
        allowNull:false,
    };
    //自动加入更新时间戳
    attrs.updatedAt = {
        type:Sequelize.BIGINT,
        allowNull:false,
    };
    //自动加入版本号
    attrs.version = {
        type:Sequelize.BIGINT,
        allowNull:false
    };
    //生成数据库表
    return sequelize.define(name, attrs, {
        tableName: name,              //表名
        timestamps: false,            //不自动生成时间戳
        hooks: {                      
            beforeValidate:function(obj){
                var now = Date.now();
                //判断obj是否是新增数据
                if(obj.isNewRecord){
                    if(!obj.id){
                        obj.id = generateId();  //主键为新的uuid
                    }
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.verson = 0;
                }else{
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    });
};

const TYPES = ['STRING','INTEGER','BIGINT','TEXT','DOUBLE','DATEONLY','BOOLEAN'];

var exp = {
    defineModel :defineModel,
    //同步实体类结构到数据库
    sync:()=>{
        if(process.env.ENV_NODE !== 'production'){
            sequelize.sync({force:true});
        }
    }
};

for(var type of TYPES){
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;