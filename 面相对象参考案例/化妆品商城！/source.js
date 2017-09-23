/**
 * Created by acer on 2017/8/18.
 */
function product(image,discount,name,yuanjia,houjia,sum){
    this.image=image;
    this.discount=discount;
    this.name=name;
    this.yuanjia=yuanjia;
    this.houjia=houjia;
    this.sum=sum;
}
product.prototype.init=function(){
    var str="";
    str+='<dl>'
    str+='<dt><a><img src="'+this.image+'" width="384" height="225" /></a></dt>'
    str+='<dd>'
    str+='<span><a><em>'+this.discount+'</em>'+this.name+'</a></span>'
    str+=' </dd>'
    str+='<dd class="price">'
    str+='  <em>'+this.yuanjia+'</em>'
    str+='<del>'+this.houjia+'</del>'
    str+='<i>'+this.sum+'</i>'
    str+=' </dd>'
    str+=' </dl>'
    return str;
}
window.onload=function(){
    var item1=new product("img/boutque01_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item2=new product("img/boutque02_r2_c2.jpg","4.48折/","单子水漾优白BB霜60g单子水漾优白BB霜60g 自然色倍润型" ,"￥43.00","￥96.00","销量：0天2时19分6秒");
    var item3=new product("img/boutque03_r2_c2.jpg","4.48折/","典痘根尽痘抗痘疤修复膏25g","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item4=new product("img/boutque04_r2_c2.jpg","4.48折/","典痘根尽尊贵礼盒版","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item5=new product("img/boutque05_r2_c2.jpg","4.48折/","欧莱雅美眸深邃自动眼线笔0.1g","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item6=new product("img/boutque06_r2_c2.jpg","4.48折/","典痘根尽水剂25ml","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item7=new product("img/boutque07_r2_c2.jpg","4.48折/","Aussie美国袋鼠丰盈蓬松护发素400ml","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item8=new product("img/boutque08_r2_c2.jpg","4.48折/","丹姿他能量活力保湿男士霜50g","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item9=new product("img/boutque09_r2_c2.jpg","4.48折/","emma1997艾玛身体乳定制礼盒","￥43.00","￥96.00","销量：0天2时19分6秒");
    var items=[item1,item2,item3,item4,item5,item6,item7,item8,item9];
    var str="";
    for(var i=0;i<items.length;i++){
        str+=items[i].init();
    }
    document.getElementById("container").innerHTML=str;
}


