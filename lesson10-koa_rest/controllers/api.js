var products=[
    {
        name:'iphone',
        price:6999
    },{
        name:'Kindle',
        price:999
    }
];

var getproducts = async(ctx,next)=>{
    //定义响应的类型为application/json
    ctx.response.type="application/json";
    //定义响应结果对象
    ctx.response.body={
        products:products
    };
};

var addproduct = async(ctx,next)=>{
    //将post过来的参数，组成新的js对象
    var p = {
        name:ctx.request.body.name,
        price:ctx.request.body.price
    };
    products.push(p);
    //定义响应的类型为application/json
    ctx.response.type="application/json";
    //定义响应的结果对象
    ctx.response.body = p;
}

module.exports={
    "GET /api/products":getproducts,
    "POST /api/products":addproduct,
};