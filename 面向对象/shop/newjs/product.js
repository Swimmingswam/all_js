/**
 * Created by acer on 2017/8/11.
 */
/*������ ��Ʒ����*/
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
/*ԭ�Ͷ��� ��Ʒ����*/
product.prototype={
    //���򷽷�
    buy:function(){
        alert("����ɹ���");
    },
    //�󶨲�ƷͼƬ
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
        document.getElementsByClassName("labout span_1_of_a1")[0].innerHTML=str;      //�����⣿
    },*/
    //�󶨲�Ʒϸ��
    bindDetil:function(){
        var str="";
        str+='<div class="cont1 span_2_of_a1">';
            str+='<h1 id="pname"> '+this.name+'</h1>';
            str+='<ul class="rating">';
                str+='<li><a class="product-rate" href="#"> </a> <span> </span></li>';
                str+='<li><a href="#" id="buyCount">'+this.buysum+'</a>�˹���</li>';
                str+='<div class="clearfix"></div>';
            str+='</ul>';
            str+='<div class="price_single">';
                str+='<span class="reducedfrom" id="price">'+this.yuanjia+'</span>'
                str+='<span class="actual" id="groupPrice">'+this.houjia+'</span><a href="#">�Ź�</a>';
            str+=' </div>';
            str+=' <h2 class="quick">����:</h2>';
            str+='<p class="quick_desc" id="description">'+this.des+'</p>';
            str+='<div class="btn_form">';
                str+='<button type="button" id="btnaddcart" value="��ӵ����ﳵ" title="">��ӵ����ﳵ</button>';
                str+='<button type="button" id="btnbuy" value="��������" title="">��������</button>';
            str+='</div>';
        str+='</div>';
        document.getElementsByClassName("singel_right")[0].innerHTML=str;
    },
    //��Ʒ�Ź�����
    groupBuy:function(){
        this.buy();
    },
    //��Ʒ���빺�ﳵ����
    addCart:function(){
        alert("����ɹ���");
    }
};