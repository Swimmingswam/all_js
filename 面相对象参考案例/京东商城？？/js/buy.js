// 按钮事件
var jian=document.getElementsByClassName('jian');
var shu=document.getElementsByClassName('shu');
var jia=document.getElementsByClassName('jia');
for(var i=0;i<jia.length;i++){
	jian[i].shu=shu[i];
	jia[i].shu=shu[i];
	jia[i].jian=jian[i];
	jian[i].onclick=function(){
		var n=parseInt(this.shu.innerHTML)
		if(n>1){
			n--;
		}
		if(n==1){
			this.id='jian1';
		}
		this.shu.innerHTML=n;
	};
	jia[i].onclick=function(){
		var n=parseInt(this.shu.innerHTML)
		n++;
		this.shu.innerHTML=n;
		this.jian.id='jian2';
	};
}
//绑定布局
window.onload=function(){
	function item(){
		this.binddom();
	}
	item.prototype.binddom=function(){
		var str="";
		str+='<div class="pro-warp">'
		str+='<div class="pro-title">'
		str+='<div class="pro-title-check"></div>'
		str+='<div class="pro-title-name">'
		str+='<img src="./img/buy-logo.png" alt="">'
		str+='<span>京东自营</span>'
		str+='</div>'
		str+='</div>'
		str+='<div class="pro-body">'
		str+='<div class="pro-body-check"></div>'
		str+='<div class="pro-body-des">'
		str+='<a href="detail.html">'
		str+='<img src="./img/buy-pro1.jpg" alt="">'
		str+='</a>'
		str+='<div class="pro-body-des-text">'
		str+='<span>iphone6s手机壳/手机保护套/使用于苹果6/6s/6plusiphone6s手机壳/手机保护套/使用于苹果6/6s/6plus</span>'
		str+='<b>￥45.00</b>'
		str+='<div class="pro-body-des-con">'
		str+='<span   id="jian1" class="jian">'
		str+='<a></a>'
		str+='</span>'
		str+='<span  class="shu shu1">1</span>'
		str+='<span  class="jia jia1">'
		str+='<a></a>'
		str+='</span>'
		str+='</div>'
		str+='</div>'
		str+='</div>'
		str+='</div>'
		str+='</div>'
		document.getElementById("pro").innerHTML=str;
	}
	for(var i=0;i<12;i++){
		var item1=new item();
		item1.binddom();
	}

}


