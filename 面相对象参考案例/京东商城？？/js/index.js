// 追加图片
//轮播图
var oUl=document.getElementById('oUl');
var oLi=oUl.getElementsByTagName('li');
//图片顺序8123456781
for(var i=1;i<9;i++){  //第二个（1）li放图一
	var img=new Image();
	img.src='./img/l'+i+'.jpg';
	img.style.width='100%';
	oLi[i].appendChild(img);
	if(i==1){   //第二个li放图一且第10个（9）li放图一
		var img2=new Image();
		img2.src='./img/l'+i+'.jpg';
		img2.style.width='100%';
		oLi[9].appendChild(img2);
	}else if(i==8){   //第9个（8）li放图八
		var img2=new Image();
		img2.src='./img/l'+i+'.jpg';
		img2.style.width='100%';
		oLi[0].appendChild(img2);   //第一个（0）li放图八
	}
}
/*for(var i=0;i<8;i++){  //第二个（1）li放图一
	var img=new Image();
	img.src='./img/l'+(i+1)+'.jpg';
	img.style.width='100%';
	oLi[i].appendChild(img);
	if(i==8) {
		var img2 = new Image();
		img2.src = './img/l1.jpg';
		img2.style.width = '100%';
		oLi[8].appendChild(img2);
	}
}*/
// 轮播
var viewWidth=window.innerWidth;
var nowTrn=1;
var start=null;
var move=null;
var point=document.getElementById('point').getElementsByTagName('span');
oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';

for(var i=1;i<oLi.length-1;i++){
	var oImg=oLi[i].getElementsByTagName('img')[0];
	oImg.addEventListener('touchstart',function(e){    //手指放在一个DOM元素上
		start=e.touches[0].clientX;
	},false);
	oImg.addEventListener('touchmove',function(e){  //手指拖曳一个DOM元素
		move=e.touches[0].clientX-start;
		oUl.style.transform='translate('+(-nowTrn*viewWidth+move)+'px,0px)';
	},false);
	oImg.addEventListener('touchend',function(e){  //手指从一个DOM元素上移开
		if(move>viewWidth*.1){
			nowTrn--;
		}else if(move<-viewWidth*.1){
			nowTrn++;
		}
		oUl.style.transition='transform .3s ease 0s';
		oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
		oUl.addEventListener('transitionend',function(){
			this.style.transition='none';
			if(nowTrn==0){
			nowTrn=8;
			}else if(nowTrn==9){
				nowTrn=1;
			}
			for(var i=0;i<8;i++){
				point[i].className='blur';
			}
			point[nowTrn-1].className='current';
			oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
		},false);
		start=null;
		move=null;
	},false);
}

// 自动轮播
setInterval(function(){
	if(nowTrn>8)return;
	nowTrn++;
	oUl.style.transition='transform .3s ease 0s';
	oUl.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
	
	oUl.addEventListener('transitionend',function(){  //transitionend事件代表着过渡动画结束后
		this.style.transition='none';
		if(nowTrn>8){
			nowTrn=1;
		}
		for(var i=0;i<8;i++){
			point[i].className='blur';
		}
		point[nowTrn-1].className='current';
		this.style.transform='translate('+(-nowTrn*viewWidth)+'px,0px)';
	},false);
},3000);

// 倒计时
var timeObj={
	h:3,
	m:5,
	s:13
};
var timeStr=toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s); //030513
var timeList=document.getElementsByClassName('time-text');
for(var i=0;i<timeList.length;i++){
	timeList[i].innerHTML=timeStr[i];
}
function toDouble(num){
	if(num<10){
		return '0'+num;
	}else{
		return ''+num;
	}
}
var timer=null;
timer=setInterval(function(){
	timeObj.s--;
	if(timeObj.s==-1){
		timeObj.m--;
		timeObj.s=59;
	}
	if(timeObj.m==-1){
		timeObj.h--;
		timeObj.m=59;
	}
	if(timeObj.h==-1){
		timeObj.h=0;
		timeObj.m=0;
		timeObj.s=0;
		clearInterval(timer);
	}
	timeStr=toDouble(timeObj.h)+toDouble(timeObj.m)+toDouble(timeObj.s);
	for(var i=0;i<timeList.length;i++){
		timeList[i].innerHTML=timeStr[i];
	}
},1000)


// 顶部搜索栏滚动变色事件
var bg=document.getElementById('bg');
var nowOpacity=0;
document.onscroll=function(event){
	if(this.body.scrollTop/300<.85){
		nowOpacity=this.body.scrollTop/300;
	}
	// nowOpacity=scrollTop(value)
	console.log()
	bg.style.opacity=nowOpacity;
}

/*
window.DeviceMotionEvent && window.addEventListener('devicemotion',function(){

},false)*/
