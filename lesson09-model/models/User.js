var db = require("../db");

var User = db.defineModel("users",{
    username:{
        type:db.STRING(100),
        unique:true
    },
    password: {
        type:db.STRING(100),
    },
    email:{
        type:db.STRING(100),
    },
    gender:{
        type:db.BOOLEAN
    }
});

module.exports = User;