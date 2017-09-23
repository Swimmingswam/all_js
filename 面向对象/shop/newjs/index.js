/**
 * Created by acer on 2017/8/11.
 */
    //产品实例化
var product =  new product('HM休闲服登山包','登山一流，服务一流',144,120,130);
product.images=[
    {small:'images/s11.jpg',big:'images/s11.jpg'},
    {small:'images/s12.jpg',big:'images/s12.jpg'},
    {small:'images/s13.jpg',big:'images/s13.jpg'}
];
//使用产品对象
//绑定产品细节
product.bindDetil();
//绑定产品图片
//product.bindDOMImage();  //有问题？
//购物车实例化
var cart =new cart(3,2000);
cart.products.push(product);
cart.products.push(product);
cart.products.push(product);
cart.bindBasic();
cart.bindList();
//绑定购物车添加产品事件
document.getElementById("btnaddcart").addEventListener("click",function(){
    product.addCart();
    cart.products.push(product);
    cart.bindBasic();
    cart.bindList();
});
document.getElementById("btnbuy").addEventListener("click",function(){
    product.groupBuy();
})
