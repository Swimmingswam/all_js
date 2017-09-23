/**
 * Created by acer on 2017/6/10.
 */
//占位符更换图片
function showPic(whichpic) {
    if (!document.getElementById("whichpic")) return false;
    var source = whichpic.getAtttibute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if(documnt.getElementById("description")){
      var text = whichpic.getAttribute("tittle") ? whichpic.getAttribute("tittle") : "";
      var description = document.getElementById("description");
      if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
      }
    }
    return true;
}

//onload添加
function addlLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload!="function"){
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}

//insertAfter封装
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElemen);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//奇偶行变换
function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName("table");
    var odd,rows;
    for(var i=0;i<tables.length;i++){
        odd=false;
        rows=tables[i].getElementsByTagName("tr");
        for(var j= 0;j<rows.length;j++){
            if(odd==true){
                rows[j].style.backgroundColor="#ffc";
                odd=false;
            }
            else{
                odd=true;
            }
        }
    }
}

//页面移动元素动画效果
function moveElement(elementID,final_x,final_y,interval){
    if(!document.getElementById) return false;
    if(!document.getElementById(elementID)) return false;
    var elem=document.getElementById(elementID);
    if(elem.movement){
        clearInterval(elem.movement);
    }
    var xpos=parseInt(elem.style.left);
    var ypos=parseInt(elem.style.top);
    var dist=0;
    if(xpos==final_x && ypos==final_y){
        return true;
    }
    if(xpos<final_x){
        dist=Math.ceil((final_x-xpos)/10);
        xpos+=dist;
    }
    if(xpos>final_x){
        dist=Math.ceil((xpos-final_x)/10);
        xpos-=dist;
    }
    if(ypos<final_y){
        dist=Math.ceil((final_y-ypos)/10);
        ypos+=dist;
    }
    if(ypos>final_y){
        dist=Math.ceil((ypos-final_y)/10);
        ypos-=dist;
    }
    elem.style.left=xpos+"px";
    elem.style.top=ypos+"px";
    var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    movement=setTimeout(repear,interval);
}
//需要h5实现的添加样式
function addClass(element,value){
    if(!element.className=value){
    element.className=value;
    }
    else{
        newClassName=element.className;
        newClassName+="";
        naeClassName+=value;
        element,className=newClassName;
    }
}
//查询数组中存在某个特定的值
Array.prototype.inArray=function(needle){
    for(var i= 0,len=this.length;i<len,i++){
        if(this[i]===needle){
            return true;
        }
    }
    return false;
};
//翻转字母串Array.prototype.reserse();
if(typeof String.prototype.reverse!=='function') {
    String.prototype.reverse = function () {
        return Array.prototype.reverse.apply(this.split('')).join("");
    }
}
//遍历对象的所有属性和方法（包括自身属性和原型属性）
for(var prop in object){
    console.log(prop+'='+object[prop]);
}
//实现继承的方法汇总（开始）
//原型链法（仿传统）
child.prototype=new parent();
//仅从原型继承法
child.prototype=parent.prototype;
//将集成部分封装（临时构造器法）
function extend(child,parent){
    var F=function(){};
    F.prototype=parent.prototype;
    child.prototype=new F();
    child.prototype.constructor=child;
    child.uber=parent.prototype;
}
//属性拷贝（原型属性拷贝法）
function extend2(child,parent){
    var p=parent.prototype;
    var c=child.prototype;
    for(var i in p){
        c[i]-p[i];
    }
    c.uber=p;
}
//全属性拷贝法（浅拷贝）(新拷贝对象修改会影响原对象）
function extendcopy(p){
    var c={};
    for(var i in p){
        c[i]=p[i];
    }
    c.uber=p;
    return c;
}
//深拷贝(新拷贝对象修改不会影响原对象）
function deepcopy(p,c){
    c=c||{};
    for(var i in p){
        if(p.hasOwnProperty(i)){
            if(typeof p[i]==='object'){
                c[i]=Array.isArray(p[i]) ?[]:{};
                deepcopy(p[i],c[i]);
            }
            else{
                c[i]=p[i];
            }
        }
    }
    return c;
}
//原型继承（接受一个父对象作为新建子对象的原型）（ES5中的Object.create())
function object(o){
    var n;
    function F(){};
    F.prototype=o;
    n=new F();
    n.uber=o;
    return n;
}
//原型继承与属性拷贝混合应用(将一个已有对象o作为新对象n的原型，建立n后，将另一个已有对象stuff的所有属性拷贝给n)
function objectplus(o,stuff){
    var n;
    function F(){};
    F.prototype=o;
    n=new F();
    n.uber=o;
    for(var i in stuff){
        n[i]=stuff[i];
    }
    return n;
}
//多重继承
function multi(){
    var n={},
        stuff,
        j=0,
        len=arguments.length;
    for(j=0;j<len;j++){
        stuff=arguments[i];
        for(var i in stuff){
            if(stuff hasOwnProperty(i)){
                n[i]=stuff[i];
            }
        }
    }
    return n;
}
//寄生继承法
function parasite(victim){
    var that=object(victim);
    that.more=1;
    return that;
}
//构造器借用法
function child(){
    parent.apply(this,arguments);
}
//构造器借用与属性拷贝法
function child(){
    parent.apply(this,arguments);
}
entend2(child,parent);
//实现继承的方法汇总（结束）
//浅拷贝案例
var p={
    name:"zym",
    age:20,
    copy:function(){
        var n={};
        for(var i in this){
            n[i]=this[i];
        };
        return n;
    }
}
var p1= p.copy();
p.name="syz";
p.age=40;
//深拷贝案例
function deepcopy(){
    var n={};
    for(var i in this){
        if(typeof this[i]!=="object"){
            n[i]=this[i];
        }
        else{
            n[i]=this[i].deepcopy();
        }
    }
    return n;
}
var car={name:"falali"};
var p={
    name:"zym",
    age:20,
    car:car
};
car.deepcopy=deepcopy;
p.deepcopy=deepcopy;
var p1= p.deepcopy();
p.name="syz";
p.age="40";
p.car="xuefulan";
//把obj1、obj2、obj3的属性全部复制给obj
function mixall(obj,obj1,obj2,obj3){
    var all=arguments;
    for(var i = 1;i<all.length;i++)
    {
        for(var k in all[i]){
            obj[k]=all[i][k];
        }
    }
    return obj;
}
//返回对象所有属性和调用其方法
function act(o){
    for(var i in o){
        if(typeof o[i]==='function'){
            o[i]();
        }
        else{
            console.log(i+':'+o[i]);
        }
    }
}
//案例：返回参数信息必须是字符串的情况下，否则报错
function txt(text){
    if(typeof text!=="string"){
        throw new Error("参数必须为字符串");
    }
    else{
        console.log(text);
    }
}
//案例：捕捉错误，程序正常执行
console.log(1);
console.log(2);
try{
    console.log(a);//a变量未定义，是undefined报错
}catch(e){
    a="123";//给a变量定义为字符串“123”，可捕捉错误，返回123，后面程序继续正常执行
    console.log(a);
}
console.log(3);
console.log(4);
//构造person对象
function createperson(name,age,sex){
    var p={};
    p.name=name;
    p.age=age;
    p.sex=sex;
    return p;
}
createperson('zym',20,'girl');
//创建一个n行m列的表格,l为表格外边框线的宽度值
function createchart1(n,m,l){
    var table=document.createElement("table");
    var tbody=document.createElement("tbody");
    table.appendChild(tbody);
    document.body.appendChild(table);
    for(var i = 0;i<n;i++){
        var tr=document.createElement("tr");
        tbody.appendChild(tr);
        for(var j = 0;j<m;j++){
            var td=document.createElement("td");
            var txt=document.createTextNode('');
            td.appendChild(txt);
            tr.appendChild(td);
            td.width=200;
            td.height=50;
        }
    }
    table.setAttribute("border",l);
}
//以数据data[{},{},{}....]创建任意表格
function createchart2(data){
    var table=document.createElement("table");
    var thead=document.createElement("thead");
    var tbody=document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);
    //
    var htr=document.createElement("tr");
    for(var i in data[0]){
        var th=document.createElement("th");
        th.appendChild(document.createTextNode(i));
        htr.appendChild(th);
    }
    thead.appendChild(htr);
    //
    for(var j = 0;j<data.length;j++){
        var tr=document.createElement("tr");
        for(var k in data[j]){
            var td=document.createElement("td");
            td.appendChild(document.createTextNode(data[j][k]));
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.border=1;
    document.body.appendChild(table);
}
//解决Object.create（ES5）方法的兼容问题
function objectcreate(obj){
    if(Object.create){
        return Object.create(obj);
    }
    else{
        /*objectcreate=function(obj){
            function p(){};               376-380为我的修改版
            p.prototype=obj;
            return new p();
         }*/
            function n(){};
            n.prototype=obj;             //381-384为视频教学案例
            var n1=new n();
            return n1;
    }
};
//返回三个参数中的最大值1
function max(a,b,c){
 var max=a>b?a:b;
 max=max>c?max:c;
 return max;
 }
 console.log(max(1,5,12));
//返回三个参数中的最大值2
 var max=new Function('a','b','c',' var max=a>b?a:b;max=max>c?max:c;return max;');
 console.log(max(1,5,12));
//返回三个参数中的最大值3
var max=new Function('a','b','c',
 ' var max=a>b?a:b;'+
 'max=max>c?max:c;'+
 'return max;');
 console.log(max(1,5,12));
//返回三个参数中的最大值4（在body中有#codeDOM)
var txt=document.getElementById("code").firstChild.nodeValue;
 var max=new Function('a','b','c',txt);
 console.log(max(1,5,12));
//返回三个参数中的最大值5(部分浏览器支持``用法（火狐/谷歌可以，IE貌似不行）
var max=new Function('a','b','c',
`
var max=a>b?a:b;
max=max>c?max:c;
return max;
`);
console.log(max(1,5,12));
//从任意个参数中打印出其最大的数
function maxall(){
    var args=arguments;
    var max=args[0];
    for(var i=0;i<args.length;i++){
        if(max<args[i]){
            max=args[i];
        }
    }
    return max;
}
//计算任意个参数的总和
function sumall(){
    var args=arguments;
    var sum=0;
    for(var i=0;i<args.length;i++){
        sum+=args[i];
    }
    return sum;
}