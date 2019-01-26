'use strict'

var index = async(ctx,next)=>{
    console.log(ctx.response);
};

var main = async(ctx,next)=>{
    ctx.response.body="<h1>hello world.</h1>";
};

var signIn = async(ctx,next)=>{
    //获取传入的邮箱地址和密码
    var email = ctx.request.body.email||'',
        password = ctx.request.body.password||'';
    //判断邮箱和密码是否正确
    if(email==='tedyage@sina.com'&&password==='123456'){
        //登录成功
        ctx.render('signin-ok.html',{
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    }else{
        //登录失败
        ctx.render('signin-failed.html',{
            title: 'Sign In Failed'
        });
    }
};

module.exports={
    //"GET /index2": index,
    "GET /login/index": main,
    //"POST /login/signIn": signIn
};