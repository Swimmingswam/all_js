/**
 * Created by acer on 2017/8/11.
 */
    //��Ʒʵ����
var product =  new product('HM���з���ɽ��','��ɽһ��������һ��',144,120,130);
product.images=[
    {small:'images/s11.jpg',big:'images/s11.jpg'},
    {small:'images/s12.jpg',big:'images/s12.jpg'},
    {small:'images/s13.jpg',big:'images/s13.jpg'}
];
//ʹ�ò�Ʒ����
//�󶨲�Ʒϸ��
product.bindDetil();
//�󶨲�ƷͼƬ
//product.bindDOMImage();  //�����⣿
//���ﳵʵ����
var cart =new cart(3,2000);
cart.products.push(product);
cart.products.push(product);
cart.products.push(product);
cart.bindBasic();
cart.bindList();
//�󶨹��ﳵ��Ӳ�Ʒ�¼�
document.getElementById("btnaddcart").addEventListener("click",function(){
    product.addCart();
    cart.products.push(product);
    cart.bindBasic();
    cart.bindList();
});
document.getElementById("btnbuy").addEventListener("click",function(){
    product.groupBuy();
})
