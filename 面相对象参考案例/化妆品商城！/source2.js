/**
 * Created by acer on 2017/8/18.
 */
var data={
    items:[
    {
        image:"img/boutque01_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
    {
        image:"img/boutque02_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
    {
        image:"img/boutque03_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
    {
        image:"img/boutque04_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
    {
        image:"img/boutque05_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
    {
        image:"img/boutque06_r2_c2.jpg",
        discount:"4.48折/",
        name:"Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)",
        yuanjia:"￥43.00",
        houjia:"￥96.00",
        sum:"销量：0天2时19分6秒"
    },
]};
/*var html=template("arttemplate",data);
document.getElementById("container").innerHTML=html;*/

//封装末尾
function bindtemplate(tempid,data,divid){
    var html=template(tempid,data);
    document.getElementById(divid).innerHTML=html;
}
bindtemplate("arttemplate",data,"container");

/*function product(image,discount,name,yuanjia,houjia,sum){
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
    var item2=new product("img/boutque02_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item3=new product("img/boutque03_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item4=new product("img/boutque04_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item5=new product("img/boutque05_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item6=new product("img/boutque06_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item7=new product("img/boutque07_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item8=new product("img/boutque08_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var item9=new product("img/boutque09_r2_c2.jpg","4.48折/","Avon雅芳小红裙套装（香体乳150ml+沐浴露150ml)","￥43.00","￥96.00","销量：0天2时19分6秒");
    var items=[item1,item2,item3,item4,item5,item6,item7,item8,item9];
    var str="";
    for(var i=0;i<items.length;i++){
        str+=items[i].init();
    }
    document.getElementById("container").innerHTML=str;
}*/
