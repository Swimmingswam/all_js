/**
 * Created by acer on 2017/8/20.
 */
window.onload=function(){

    var product1=new product(" HM���з���ɽ��",1000,"140.00","120.00","̫���ˣ�һ�����������������");
    product1.init();

    var cart=new Cart();
    cart.sum=3
    cart.allPrice=2000

    /*���蹺�ﳵ���Ѿ���������Ʒ*/
    cart.products.push(product1);
    cart.products.push(product1);

    /*cart.products.push(product1)*/

    /*ʹ�ö����еķ�������*/
    cart.binddom();
    cart.getsum();
    cart.getallprice();
    document.getElementById("btnaddcart").addEventListener("onclick",function(){
            /*���ﳵ����һ����Ʒ*/
            cart.products.push(product1);
            ///*���¹��ﳵ - ���°󶨹��ﳵ*/
            /*�������װ������Ϳ��ܲ��������ظ�*/
            cart.binddom();
            cart.getsum();
            cart.getallprice();
            document.window.scrollTop(0);
    });
}