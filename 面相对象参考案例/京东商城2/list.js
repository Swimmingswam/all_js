/**
 * Created by acer on 2017/8/20.
 */
function product(image,tittle,price,des){
  this.image=image;
    this.tittle=tittle;
    this.price=price;
    this.des=des
}
product.prototype={
    binddom:function(){
        var str="";
        str+='<li>'
        str+='<a class="cbp-vm-image" href="single.html">'
        str+='    <div class="view view-first">'
        str+='   <div class="inner_content clearfix">'
        str+='    <div class="product_image">'
        str+='    <img src="images/'+this.image+'.jpg" class="img-responsive" alt=""/>'
        str+='    <div class="product_container">'
        str+='    <div class="cart-left">'
        str+='    <p class="title">'+this.tittle+'</p>'
        str+='</div>'
        str+='<div class="price">'+this.price+'</div>'
        str+='<div class="clearfix"></div>'
        str+='    </div>'
        str+='    </div>'
        str+='    </div>'
        str+='    </div>'
        str+='    </a>'
        str+='    <div class="cbp-vm-details">'
        str+='    '+this.des+''
        str+='</div>'
        str+='<a class="cbp-vm-icon cbp-vm-add" href="single.html">Add to cart</a>'
        str+='</li>'
        return str;

    }
}
window.onload=function(){
    var item1=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item2=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item3=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item4=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item5=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item6=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item7=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item8=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item9=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var item10=new product("s1","Lorem Ipsum 2015","$99.00","Silver beet shallot wakame tomatillo salsify mung bean beetroot groundnut.");
    var items=[item1,item2,item3,item4,item5,item6,item7,item8,item9,item10];
    var str="";
    for(var i=0;i<items.length;i++){
        str+=items[i].binddom();
    }
    document.getElementById("shu").innerHTML=str;
}
