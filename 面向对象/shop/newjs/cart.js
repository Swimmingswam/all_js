/**
 * Created by acer on 2017/8/11.
 */
/*������ ���ﳵ����*/
function cart(sum,allprice){
    this.products=[];
    this.sum=sum;
    this.allprice=allprice;
}
/*ԭ�Ͷ��� ���ﳵ���� */
cart.prototype={
    //�󶨹��ﳵ����
    getSum:function(){
        return this.products.length;
    },
    //���ﳵ�ܼ۸�
    getallprice:function(){
        var sum=0;
        for(var i= 0;i<this.products.length;i++){
            sum+=this.products[i].houjia;
        }
        return sum;
    },
    //�󶨹��ﳵϸ��
    bindBasic:function(){
        document.getElementsByClassName("cartsum")[0].innerHtml=this.getSum();
        document.getElementById("cartprice").innerHtml=this.getallprice();
    },
    //�󶨹��ﳵ��Ʒ�б�
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