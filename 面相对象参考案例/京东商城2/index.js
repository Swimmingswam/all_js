/**
 * Created by acer on 2017/8/20.
 */
window.onload=function(){

    var product1=new product(" HM休闲服登山包",1000,"140.00","120.00","太棒了，一口气等上珠穆朗玛峰");
    product1.init();

    var cart=new Cart();
    cart.sum=3
    cart.allPrice=2000

    /*假设购物车中已经有三个产品*/
    cart.products.push(product1);
    cart.products.push(product1);

    /*cart.products.push(product1)*/

    /*使用对象中的方法属性*/
    cart.binddom();
    cart.getsum();
    cart.getallprice();
    document.getElementById("btnaddcart").addEventListener("onclick",function(){
            /*购物车新增一个产品*/
            cart.products.push(product1);
            ///*更新购物车 - 重新绑定购物车*/
            /*如果不封装，这里就可能产生代码重复*/
            cart.binddom();
            cart.getsum();
            cart.getallprice();
            document.window.scrollTop(0);
    });
}