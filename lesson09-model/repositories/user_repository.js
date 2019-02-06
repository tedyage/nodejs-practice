'use strict'
var user = require("../models/User");

var getUserByEmailAndPassword = async(email,password)=>{
    var result = await user.findOne({
        where:{
            email:email,
            password:password
        }
    });
    return result;
};

module.exports={
    "getUserByEmailAndPassword":getUserByEmailAndPassword,
};