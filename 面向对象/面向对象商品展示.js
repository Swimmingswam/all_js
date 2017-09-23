/**
 * Created by acer on 2017/7/14.
 */
function product(name,price,price1,img,discount,prescription,sell){
    this.name=name;
    this.price=price;
    this.price1=price1;
    this.img=img;
    this.discount=discount;
    this.prescription=prescription;
    this.sell=sell;
}
product.prototype={
    binddom:function(){
        var str='';
        str+='<dl>';
         str+='<dt>';
          str+='<a>';
           str+='<img src="+this.img+" width="384" height="225" />';
          str+='</a>';
         str+=' </dt>';
        str+='<dd>';
         str+=' <span>';
          str+= '<a>';
           str+=' <em>'+this.discount+'折/</em>'+this.name+'</a></span>';
           str+=this.prescription;
        str+='</dd>';
        str+='<em>￥'+this.price1+'</em>';
        str+='<del>￥'+this.price+'</del>';
        str+=' <i>售量：'+this.sell+'件/月</i>';
        str+='</dd>';
        str+='</dl>';



        /*var str=''
        str+='<dl>'
        str+='<dt><a><img src="'+this.image+'" width="384" height="225" /></a></dt>'
        str+='<dd>'
        str+='<span><a><em>'+this.zhekou+'折/</em>'+this.name+'</a></span>'
        str+='</dd>'
        str+='<dd class="price">'
        str+='<em>￥'+this.price+'</em>'
        str+='<del>￥'+this.youhuijia+'</del>'
        str+='<i>售量：'+this.sales+'</i>'
        str+='</dd>'
        str+='</dl>'
        return str;*/

        return str;
    },
    bindevents:function(){}
};
window.onload=function(){
var product1=new product("skii",1000,1200,"#",8.8,11111,2700);
var product2=new product("skii",1000,1200,"#",8.8,11111,2700);
var product3=new product("skii",1000,1200,"#",8.8,11111,2700);
var product4=new product("skii",1000,1200,"#",8.8,11111,2700);
var product5=new product("skii",1000,1200,"#",8.8,11111,2700);
var product6=new product("skii",1000,1200,"#",8.8,11111,2700);


var products=[product1, product2, product3, product4, product5, product6];
var str="";
 for(var i=0;i<products.length;i++){
    str += products[i].binddom();
 }

var container=document.getElementById("constrainer");
    container.innerHTML=str;
}