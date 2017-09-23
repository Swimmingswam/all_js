/**
 * Created by acer on 2017/8/11.
 */
/*构造器 产品属性*/
function product(name,des,yuanjia,houjia,buysum){
    this.name=name;
    this.des=des;
    this.yuanjia=yuanjia;
    this.houjia=houjia;
    this.buysum=buysum;
    this.images=[
        {small:'../images/s13.jpg',big:'../images/s6.jpg'},
        {small:'../images/s13.jpg',big:'../images/s6.jpg'},
        {small:'../images/s13.jpg',big:'../images/s6.jpg'}
    ];
}
/*原型对象 产品方法*/
product.prototype={
    //购买方法
    buy:function(){
        alert("购买成功！");
    },
    //绑定产品图片
   /* bindDOMImage:function(){
        for(var i=0;i<this.images.length;i++){
            var str="";
            str+='<ul id="etalage">';
                str+='<li>';
                str+='<img class="etalage_thumb_image" src="'+ this.images[i].small+'" class="img-responsive" />';
                str+='<img class="etalage_source_image" src="'+ this.images[i].big+'" class="img-responsive" />';
                str+='</li>';
            str+='</ul>';
        }
        document.getElementsByClassName("labout span_1_of_a1")[0].innerHTML=str;      //有问题？
    },*/
    //绑定产品细节
    bindDetil:function(){
        var str="";
        str+='<div class="cont1 span_2_of_a1">';
            str+='<h1 id="pname"> '+this.name+'</h1>';
            str+='<ul class="rating">';
                str+='<li><a class="product-rate" href="#"> </a> <span> </span></li>';
                str+='<li><a href="#" id="buyCount">'+this.buysum+'</a>人购买</li>';
                str+='<div class="clearfix"></div>';
            str+='</ul>';
            str+='<div class="price_single">';
                str+='<span class="reducedfrom" id="price">'+this.yuanjia+'</span>'
                str+='<span class="actual" id="groupPrice">'+this.houjia+'</span><a href="#">团购</a>';
            str+=' </div>';
            str+=' <h2 class="quick">简述:</h2>';
            str+='<p class="quick_desc" id="description">'+this.des+'</p>';
            str+='<div class="btn_form">';
                str+='<button type="button" id="btnaddcart" value="添加到购物车" title="">添加到购物车</button>';
                str+='<button type="button" id="btnbuy" value="立即购买" title="">立即购买</button>';
            str+='</div>';
        str+='</div>';
        document.getElementsByClassName("singel_right")[0].innerHTML=str;
    },
    //产品团购方法
    groupBuy:function(){
        this.buy();
    },
    //产品加入购物车方法
    addCart:function(){
        alert("加入成功！");
    }
};