/**
 * Created by acer on 2017/8/20.
 */
function product(name,buysum,yuanjia,houjia,des){
    this.name=name;
    this.buysum=buysum;
    this.yuanjia=yuanjia;
    this.houjia=houjia;
    this.des=des;
    this.images=[
        {small:'./images/s11.jpg',big:'./images/s11.jpg'},
        {small:'./images/s12.jpg',big:'./images/s12.jpg'},
        {small:'./images/s13.jpg',big:'./images/s13.jpg'}
    ]
}
product.prototype= {
    init: function () {
        this.binddom();
        this.bindimages();
        this.bindevents()
    },
    binddom:function () {
        var str = "";
        str += '<div class="cont1 span_2_of_a1">'
        str += '    <h1 id="pname">' + this.name + '</h1>'
        str += '    <ul class="rating">'
        str += '    <li><a class="product-rate" href="#"> </a> <span> </span></li>'
        str += '<li><a href="#" id="buyCount">' + this.buysum + '</a>人购买</li>'
        str += '<div class="clearfix"></div>'
        str += '    </ul>'
        str += '    <div class="price_single">'
        str += '    <span class="reducedfrom" id="price">' + this.yuanjia + '</span>'
        str += '<span class="actual" id="groupPrice">' + this.houjia + '</span><a href="#">团购</a>'
        str += '</div>'
        str += '<h2 class="quick">简述:</h2>'
        str += '<p class="quick_desc" id="description">' + this.des + '</p>'
        document.getElementById("product").innerHTML = str;
    },
    bindimages:function () {
        var str = "";
        for (var i = 0; i < this.images.length; i++) {
            str += '<li>'
            str += '<img class="etalage_thumb_image" src="'+ this.images[i].small + '" class="img-responsive" />'
            str += '<img class="etalage_source_image" src="' + this.images[i].small + '" class="img-responsive" />'
            str += '</li>'
        }
        $('#etalage').html(str);

        /*jquery插件实现的幻灯片特效*/
        $('#etalage').etalage({
            thumb_image_width: 250,
            thumb_image_height: 300,
        })
    },
    bindevents:function(){
        /*绑定事件*/
        document.getElementById("btnaddcart").onclick=function(){
               alert("添加成功！")
        }
        document.getElementById("btnbuy").onclick=function(){
            alert("立即购买！")
        }
    },
}