/**
 * Created by acer on 2017/8/18.
 */
var data= [
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
    ];
function product(data,num){
    this.index = num;
    this.data = data;
    /*this.dom = document.createElement("div");
    this.config=document.getElementById("container");*/
    this.dom = $('<div></div>');
    this.config={jqueryContainer:$('#container')}
}
product.prototype.init=function(){
    this.binddom();
};
product.prototype.binddom=function(){
    var str="";
    str+='<dl>'
    str+='<dt><a><img src="{{image}}" width="384" height="225" /></a></dt>'
    str+='<dd>'
    str+='<span><a><em>{{discount}}</em>{{name}}</a></span>'
    str+=' </dd>'
    str+='<dd class="price">'
    str+='<em>{{yuanjia}}</em>'
    str+='<del>{{houjia}}</del>'
    str+='<i>{{sum}}</i>'
    str+=' </dd>'
    str+=' </dl>'
    this.dom.html($$.artTemplate(str, this.data)).appendTo(this.config.jqueryContainer);
}
for(var i=0;i<data.length;i++){
    var item=new product(data[i],i)
    item.init()   //也可以在实例化时再全部调用init（）
}