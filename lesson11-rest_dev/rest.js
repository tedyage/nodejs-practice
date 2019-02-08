'use strict'
module.exports = {
    APIError:function(code,message){
        this.code = code||'internal: unknown_error';
        this.message = message||'';
    },
    restify:(pathPrefix)=>{
        //如果pathPrefix为空，则默认是/api/
        pathPrefix = pathPrefix||'/api/';
        return async(ctx,next)=>{
            var rpath = ctx.request.path;
            //判断请求路径名是否以pathPrefix开头
            if(rpath.startsWith(pathPrefix)){
                //ctx封装rest方法，输出data
                ctx.rest = (data)=>{
                    ctx.response.type = "application/json";
                    ctx.response.body = data;
                }
                try{
                    await next();
                }catch(e){
                    //处理借口内部业务逻辑错误
                    ctx.response.status = 400;  //返回码400代表内部逻辑错误
                    ctx.response.type="application/json";
                    ctx.response.body = {
                        code:e.code||'internal:unknown_error',   //定义错误码，如果没有默认是internal:unknown_error
                        message:e.message||''
                    };
                }
            }else{
                await next();
            }
        }
    }
}