'use strict'
var user_repository = require("../repositories/user_repository");

var login = async(ctx,next)=>{
    ctx.render("login.html",{title:'Welcome'});
};

var signIn = async(ctx,next)=>{
    //获取传入的邮箱地址和密码
    var email = ctx.request.body.email||'',
        password = ctx.request.body.password||'';
    //根据邮箱和密码查询用户信息
    var user = await user_repository.getUserByEmailAndPassword(email,password);
    if(user!==null&&user.id){
        //登录成功
        ctx.render('signin-ok.html',{
            title: 'Sign In OK',
            email: email
        });
    }else{
        //登录失败
        ctx.render('signin-failed.html',{
            title: 'Sign In Failed'
        });
    }
};

module.exports={
    "GET /login": login,
    "POST /SignIn":signIn
};