/**
 * Created by acer on 2017/8/20.
 */
function Cart(){
    this.products=[];
    this.sum=0;
    this.allprice=0;
}
Cart.prototype={
binddom:function(){
    var str="";
    for(var i=0;i<this.products.length;i++){
        str+='<div class="cart_box">'
        str+='    <div class="message">'
        str+='    <div class="alert-close"> </div>'

        str+='    <div class="list_img"><img src="'+this.products[i].images[0].small+'" class="img-responsive" alt=""/></div>'
        str+='    <div class="list_desc"><h4><a href="#">'+this.products[i].name+'</a></h4>1 x<span class="actual">'
        str+='    '+ this.products[i].houjia+'</span></div>'
        str+='<div class="clearfix"></div>'
        str+='    </div>'
        str+='    </div>'
    }
    document.getElementById("shopping_cart").innerHtml=str;

},
    getsum:function(){
        this.sum=this.products.length;
        document.getElementById("sum1").innerHtml=this.sum;
        document.getElementById("sum2").innerHtml=this.sum;
    },
    getallprice:function(){
        for(var i= 0,len=this.products.length;i<len;i++){
            var danjia=parseInt(this.products[i].houjia);
            this.allprice+=danjia;
        }
        document.getElementById("cartprice").innerHTML=this.allprice;
    }
}