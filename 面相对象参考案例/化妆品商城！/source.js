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
    var item1=new product("img/boutque01_r2_c2.jpg","4.48��/","Avon�ŷ�С��ȹ��װ��������150ml+��ԡ¶150ml)","��43.00","��96.00","������0��2ʱ19��6��");
    var item2=new product("img/boutque02_r2_c2.jpg","4.48��/","����ˮ���Ű�BB˪60g����ˮ���Ű�BB˪60g ��Ȼɫ������" ,"��43.00","��96.00","������0��2ʱ19��6��");
    var item3=new product("img/boutque03_r2_c2.jpg","4.48��/","�䶻�������������޸���25g","��43.00","��96.00","������0��2ʱ19��6��");
    var item4=new product("img/boutque04_r2_c2.jpg","4.48��/","�䶻���������а�","��43.00","��96.00","������0��2ʱ19��6��");
    var item5=new product("img/boutque05_r2_c2.jpg","4.48��/","ŷ�������������Զ����߱�0.1g","��43.00","��96.00","������0��2ʱ19��6��");
    var item6=new product("img/boutque06_r2_c2.jpg","4.48��/","�䶻����ˮ��25ml","��43.00","��96.00","������0��2ʱ19��6��");
    var item7=new product("img/boutque07_r2_c2.jpg","4.48��/","Aussie���������ӯ���ɻ�����400ml","��43.00","��96.00","������0��2ʱ19��6��");
    var item8=new product("img/boutque08_r2_c2.jpg","4.48��/","����������������ʪ��ʿ˪50g","��43.00","��96.00","������0��2ʱ19��6��");
    var item9=new product("img/boutque09_r2_c2.jpg","4.48��/","emma1997���������鶨�����","��43.00","��96.00","������0��2ʱ19��6��");
    var items=[item1,item2,item3,item4,item5,item6,item7,item8,item9];
    var str="";
    for(var i=0;i<items.length;i++){
        str+=items[i].init();
    }
    document.getElementById("container").innerHTML=str;
}


