/**
 * Created by acer on 2017/8/11.
 */
/*构造器 购物车属性*/
function cart(sum,allprice){
    this.products=[];
    this.sum=sum;
    this.allprice=allprice;
}
/*原型对象 购物车方法 */
cart.prototype={
    //绑定购物车总数
    getSum:function(){
        return this.products.length;
    },
    //购物车总价格
    getallprice:function(){
        var sum=0;
        for(var i= 0;i<this.products.length;i++){
            sum+=this.products[i].houjia;
        }
        return sum;
    },
    //绑定购物车细节
    bindBasic:function(){
        document.getElementsByClassName("cartsum")[0].innerHtml=this.getSum();
        document.getElementById("cartprice").innerHtml=this.getallprice();
    },
    //绑定购物车产品列表
    bindList:function(){
        var str='';
        for(var i= 0;i<this.products.length;i++){
            str+='<div class="cart_box">';
                str+='<div class="message">';
                    str+=' <div class="alert-close"> </div>';
                    str+=' <div class="list_img"> <img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/> </div>';
                    str+=' <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4><span class="actual">'+ this.products[i].houjia+'</span></div>';
                    str+=' <div class="clearfix"></div>';
                    str+='  <div class="clearfix"></div>';
                str+='  </div>';
            str+='   </div>';
        }
        document.getElementsByClassName("shopping_cart")[0].innerHtml=str;
    }
}