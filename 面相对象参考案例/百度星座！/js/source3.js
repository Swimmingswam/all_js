/**
 * Created by acer on 2017/8/18.
 */
var data= [
        {
            image:"img/boutque01_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
        },
        {
            image:"img/boutque02_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
        },
        {
            image:"img/boutque03_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
        },
        {
            image:"img/boutque04_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
        },
        {
            image:"img/boutque05_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
        },
        {
            image:"img/boutque06_r2_c2.jpg",
            discount:"4.48��/",
            name:"Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)",
            yuanjia:"��43.00",
            houjia:"��96.00",
            sum:"������0��2ʱ19��6��"
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
    item.init()   //Ҳ������ʵ����ʱ��ȫ������init����
}