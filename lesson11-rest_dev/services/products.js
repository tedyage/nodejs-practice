'use strict'
var id = 0;

//生成新的ID的方法
var newId = function(){
    id++;
    return 'p'+id;
}

//Product类的构造函数
var Product = function(name, manufacturer, price){
    this.id = newId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}

//初始化一个Product类型的对象数组
var products = [
    new Product("IPhone 7","Apple",6800),
    new Product('ThinkPad T440','lenovo',5999),
    new Product('LBP2900','Canon',1099)
];

module.exports={
    //获取products集合
    getProducts:()=>{
        return products;
    },
    //根据id获取product信息
    getProduct:(id)=>{
        for(var i = 0; i < products.length; i++){
            if(products[i].id === id){
                return products[i];
            }
        }
    },
    //创建product信息
    createProduct:(name,manufacturer,price)=>{
        var p = new Product(name,manufacturer,price);
        products.push(p);
        return p;
    },
    //删除product信息
    deleteProduct:(id)=>{
        var index = -1;
        for(var i in products){
            if(products[i].id===id){
                index = i;
                break;
            }
        }
        //判断index是否大于0
        if(index>=0){
            return products.splice(index,1)[0];
        }
        return null;
    }
}