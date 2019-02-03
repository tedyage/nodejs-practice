'use strict'
var Sequelize = require('sequelize');
var config = require('./config');
//创建数据库实例
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect:'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});

//创建ORM实例，Pet实体类
var Pet = sequelize.define('pet',{
    id:{
        type:Sequelize.STRING(50),
        primaryKey:true
    },
    name:Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt:Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version:Sequelize.BIGINT
},{
    timestamps:false
});

//新建Pet实例，插入数据
var addPet = async() =>{
    var dog = await Pet.create({
        id: 'd-'+Date.now(),
        name:'Odie',
        gender:false,
        birth:new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),
        createdAt:Date.now(),
        updatedAt:Date.now(),
        version:0
    });
    console.log('created: '+JSON.stringify(dog));
};

//根据name查询条件查询数据，获取Pet实例
var getPet = async(name)=> {
    var pets = await Pet.findAll({
        where:{
            name:name
        }
    });
    console.log(`find ${pets.length} pets:` );
    for(var p in pets){
        console.log(JSON.stringify(pets));
    }
    return pets.length>0?pets[0]:null;
};

//编辑并保存查询出的Pet实例，完成数据更新
var updatePet = async(name)=>{
    var p = await getPet(name);
    if(p){
        p.gender=true;
        p.updatedAt = Date.now();
        p.version++;
        await p.save();
    }
};

//删除Pet实例，完成数据删除
var destoryPet = async(name)=>{
    var p = await getPet(name);
    if(p){
        await p.destroy();
    }
};

addPet();
getPet("Odie");
updatePet('Odie');
getPet("Odie");
destoryPet('Odie');
getPet("Odie");