/**
 * Created by acer on 2017/6/10.
 */
//ռλ������ͼƬ
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

//onload���
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

//insertAfter��װ
function insertAfter(newElement,targetElement){
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElemen);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
//��ż�б任
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

//ҳ���ƶ�Ԫ�ض���Ч��
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
//��Ҫh5ʵ�ֵ������ʽ
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
//��ѯ�����д���ĳ���ض���ֵ
Array.prototype.inArray=function(needle){
    for(var i= 0,len=this.length;i<len,i++){
        if(this[i]===needle){
            return true;
        }
    }
    return false;
};
//��ת��ĸ��Array.prototype.reserse();
if(typeof String.prototype.reverse!=='function') {
    String.prototype.reverse = function () {
        return Array.prototype.reverse.apply(this.split('')).join("");
    }
}
//����������������Ժͷ����������������Ժ�ԭ�����ԣ�
for(var prop in object){
    console.log(prop+'='+object[prop]);
}
//ʵ�ּ̳еķ������ܣ���ʼ��
//ԭ���������´�ͳ��
child.prototype=new parent();
//����ԭ�ͼ̳з�
child.prototype=parent.prototype;
//�����ɲ��ַ�װ����ʱ����������
function extend(child,parent){
    var F=function(){};
    F.prototype=parent.prototype;
    child.prototype=new F();
    child.prototype.constructor=child;
    child.uber=parent.prototype;
}
//���Կ�����ԭ�����Կ�������
function extend2(child,parent){
    var p=parent.prototype;
    var c=child.prototype;
    for(var i in p){
        c[i]-p[i];
    }
    c.uber=p;
}
//ȫ���Կ�������ǳ������(�¿��������޸Ļ�Ӱ��ԭ����
function extendcopy(p){
    var c={};
    for(var i in p){
        c[i]=p[i];
    }
    c.uber=p;
    return c;
}
//���(�¿��������޸Ĳ���Ӱ��ԭ����
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
//ԭ�ͼ̳У�����һ����������Ϊ�½��Ӷ����ԭ�ͣ���ES5�е�Object.create())
function object(o){
    var n;
    function F(){};
    F.prototype=o;
    n=new F();
    n.uber=o;
    return n;
}
//ԭ�ͼ̳������Կ������Ӧ��(��һ�����ж���o��Ϊ�¶���n��ԭ�ͣ�����n�󣬽���һ�����ж���stuff���������Կ�����n)
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
//���ؼ̳�
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
//�����̳з�
function parasite(victim){
    var that=object(victim);
    that.more=1;
    return that;
}
//���������÷�
function child(){
    parent.apply(this,arguments);
}
//���������������Կ�����
function child(){
    parent.apply(this,arguments);
}
entend2(child,parent);
//ʵ�ּ̳еķ������ܣ�������
//ǳ��������
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
//�������
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
//��obj1��obj2��obj3������ȫ�����Ƹ�obj
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
//���ض����������Ժ͵����䷽��
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
//���������ز�����Ϣ�������ַ���������£����򱨴�
function txt(text){
    if(typeof text!=="string"){
        throw new Error("��������Ϊ�ַ���");
    }
    else{
        console.log(text);
    }
}
//��������׽���󣬳�������ִ��
console.log(1);
console.log(2);
try{
    console.log(a);//a����δ���壬��undefined����
}catch(e){
    a="123";//��a��������Ϊ�ַ�����123�����ɲ�׽���󣬷���123����������������ִ��
    console.log(a);
}
console.log(3);
console.log(4);
//����person����
function createperson(name,age,sex){
    var p={};
    p.name=name;
    p.age=age;
    p.sex=sex;
    return p;
}
createperson('zym',20,'girl');
//����һ��n��m�еı��,lΪ�����߿��ߵĿ��ֵ
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
//������data[{},{},{}....]����������
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
//���Object.create��ES5�������ļ�������
function objectcreate(obj){
    if(Object.create){
        return Object.create(obj);
    }
    else{
        /*objectcreate=function(obj){
            function p(){};               376-380Ϊ�ҵ��޸İ�
            p.prototype=obj;
            return new p();
         }*/
            function n(){};
            n.prototype=obj;             //381-384Ϊ��Ƶ��ѧ����
            var n1=new n();
            return n1;
    }
};
//�������������е����ֵ1
function max(a,b,c){
 var max=a>b?a:b;
 max=max>c?max:c;
 return max;
 }
 console.log(max(1,5,12));
//�������������е����ֵ2
 var max=new Function('a','b','c',' var max=a>b?a:b;max=max>c?max:c;return max;');
 console.log(max(1,5,12));
//�������������е����ֵ3
var max=new Function('a','b','c',
 ' var max=a>b?a:b;'+
 'max=max>c?max:c;'+
 'return max;');
 console.log(max(1,5,12));
//�������������е����ֵ4����body����#codeDOM)
var txt=document.getElementById("code").firstChild.nodeValue;
 var max=new Function('a','b','c',txt);
 console.log(max(1,5,12));
//�������������е����ֵ5(���������֧��``�÷������/�ȸ���ԣ�IEò�Ʋ��У�
var max=new Function('a','b','c',
`
var max=a>b?a:b;
max=max>c?max:c;
return max;
`);
console.log(max(1,5,12));
//������������д�ӡ����������
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
//����������������ܺ�
function sumall(){
    var args=arguments;
    var sum=0;
    for(var i=0;i<args.length;i++){
        sum+=args[i];
    }
    return sum;
}