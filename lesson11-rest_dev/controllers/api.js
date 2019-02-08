const products = require("../services/products");

const apierror = require("../rest").APIError;

module.exports = {
    'GET /api/products': async(ctx,next)=>{
        ctx.rest({
            products:products.getProducts(),
        });
    },
    'POST /api/products':async(ctx,next)=>{
        let name = ctx.request.body.name;
        let manufacturer = ctx.request.body.manufacturer;
        let price = parseFloat(ctx.request.body.price) ;
        ctx.rest({
            product:products.createProduct(name,manufacturer,price)
        })
    },
    'DELETE /api/products/:id':async(ctx,next)=>{
        var id = ctx.params.id;
        if(id > 0){
            var product = products.deleteProduct(id);
            if(product){
                ctx.rest(product);
            }else{
                throw new apierror('product:not_found','product not found by id.');
            }
        }else{
            throw new apierror('id:not_found',"id not found.");
        }
    }
}