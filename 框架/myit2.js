/**
 * Created by acer on 2017/8/28.
 */
(function(w){
    /*����ģ��*/
    var zym=function(){};
    zym.prototype.extend=function(target,source){
        for(var i in source){
            target[i]=source[i]
        }
        return target;
    }
//ʵ��������ʹ��
    var zit=new zym();
    /*����ģ��*/
    zit.extend(zit,{
        extendMany:function() {
            var key,i = 0,len = arguments.length,target = null,copy;
            if(len === 0){
                return;
            }else if(len === 1){
                target = this;
            }else{
                i++;
                target = arguments[0];
            }
            for(; i < len; i++){
                for(key in arguments[i]){
                    copy = arguments[i][key];
                    target[key] = copy;
                }
            }
            return target;
        },
        extend:function(tar,source) {
            //��������
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
        //δ���
        each:function(doms,fn){
            for(var i=0;i<doms.length;i++) {
                fn(i, doms[i]);
            }
        }
    });
    /*ѡ����ģ��*/
    zit.extend(zit, {
        //idѡ����
        $id: function (str) {
            return document.getElementById(str)
        },
        //tagѡ����
        $tag: function (tag, context) {
            if (typeof context == "string") {
                context = zit.$id(context);
            }
            if (context) {
                return context.getElementsByTagName(tag);
            } else {
                return document.getElementsByTagName(tag);
            }
        },
        //classѡ����
        $class: function (context, classname) {
            context = context ? zit.$id(context) : document;
            if (context.getElementsByClassName) {
                return context.getElementsByClassName(classname);
            } else {
                var arr = [];
                var doms = context.getElementsByTagName("*");
                for (var i = 0; i < doms.length; i++) {
                    if (doms[i].className == classname) {
                        arr.push(doms[i]);
                    }
                }
                return arr;
            }
        },
        //���ַ���ѡ���� ��д�İ汾 (�Ա���һ��$group)
        $: function (context) {
            if (typeof context == "string") {
                var doms = context.split(",");
                var result = [];
                var list=[];
                for (var i = 0; i < doms.length; i++) {
                    var first = doms[i].charAt(0);
                    if (first == ".") {
                        list=zit.$class(doms[i].substring(1));
                        for(var i=0;i<list.length;i++){
                            result.push(list[i]);
                        }
                    } else if (first == "#") {
                        result.push(zit.$id(null, doms[i].substring(1)));
                    } else {
                        list=zit.$class(doms[i].substring(1));
                        for(var i=0;i<list.length;i++){
                            result.push(list[i]);
                        }
                    }
                }
                return result;
            }
        },
        //����ѡ����  ��Ƶ�汾
        $group:function(content) {
            var result=[],doms=[];
            var arr = zit.trim(content).split(',');
            //alert(arr.length);
            for(var i=0,len=arr.length;i<len;i++) {
                var item = zit.trim(arr[i])
                var first= item.charAt(0)
                var index = item.indexOf(first)
                if(first === '.') {
                    doms=zit.$class(item.slice(index+1))
                    //ÿ��ѭ����doms������reult��
                    //result.push(doms);//������Դ
                    //����1��� ��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)
                }else if(first ==='#'){
                    doms=[zit.$id(item.slice(index+1))]//���壺֮ǰ���Ƕ����doms�����飬����$id��ȡ�Ĳ������飬���ǵ���Ԫ��
                    //��װ�ظ��Ĵ���ɺ���
                    pushArray(doms,result)
                }else{
                    doms = zit.$tag(item)
                    pushArray(doms,result)
                }
            }
            return result;
            //��װ�ظ��Ĵ���
            function pushArray(doms,result){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        tab: function (id) {
            //��λ�ȡĳ����Ԫ���������Ԫ��
            var box = document.getElementById(id);
            var spans = box.getElementsByTagName('span');
            var lis = box.getElementsByTagName('li');
            //������
            //��һ��: �Ȱ��ϰ벿��ʵ��
            //Ⱥ����¼�  -- �����е�span���¼�
            //Ⱥ����¼�
            for (var i = 0; i < spans.length; i++) {
                //���׷���  -- ����һ��һ������  --  ��ô�� -- �Զ�������
                spans[i].index = i;
                spans[i].onmouseover = function () {
                    //����˼�� --  �����е�span��ΪĬ��״̬  --- Ȼ���ٽ���ǰ������ϵ�span��Ϊclass -- select
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].className = '';
                        lis[i].className = '';
                    }
                    this.className = 'select';
                    lis[this.index].className = 'select';
                }
            }

        },
        //�򵥵����ݰ�formateString
        formateString: function (str, data) {
            return str.replace(/@\((\w+)\)/g, function (match, key) {
                return typeof data[key] === "undefined" ? '' : data[key]
            });
        },
        //���ѡ����  /*�ܵ�˼��*/
        $layer:function(select){
            var sel = select.split(' ');   //�Ѵ��������ַ����Կո�ֿ�����sel
            var context=[];  //ԭ��
            var result=[]    //���
            for(var i = 0, len = sel.length; i < len; i++){    //[#con .span span]
                var item = sel[i];
                var first = item.charAt(0)  //��ͷ���ű�־
                var index = item.indexOf(first)   //��ͷ���ű�־������ֵ
                var name = item.slice(index+1)   //�ӿ�ͷ���ű�־��һֱ��ȡ�ַ���
                if(first ==='#'){     //��Ϊһ��idֻ���ҵ�һ�������Բ���Ҫ�ٱ���
                    result = [zit.$id(name)]
                    context=result    //������id�����Ϊ��һ��ѭ����ԭ��
                }else if(first ==='.'){
                    //�����.
                    if(context.length>0){   //�����һ����һ���������ٱ���
                        for (var i=0;i<context.length;i++){      //������һ���
                            pushArray(zit.$class(name,context[i]))   //�Ѵ�context[i]��������ҵ���.name�Ž�result
                            context = result;
                        }
                    }else{
                        pushArray(zit.$class(name))  //����ǵ�һ�㣬ֱ�Ӱѽ��.name�Ž�result
                        context = result;
                    }
                }else{
                    if(context.length>0){  //�����һ����һ���������ٱ���
                        //����Ǳ�ǩ
                        for (var i=0;i<context.length;i++){    //������һ���
                            pushArray(zit.$tag(item,context[i]))  //�Ѵ�context[i]��������ҵ���tag�Ž�result
                            context = result;
                        }
                    }else{
                        pushArray(zit.$tag(item))   //����ǵ�һ�㣬ֱ�Ӱѽ��tag�Ž�result
                        context = result;
                    }
                }
            }
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //����Ӳ��
        $$:function(str){
            var result=[];
            var item = zit.trim(str).split(',');
            for(var i=0;i<item.length;i++) {
                var select=item[i];
                var context=[];
                context=zit.$layer(select);
                pushArray(context);
            }
            return result;
            function pushArray(doms){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        //html5ʵ�ֵ�ѡ����
        $all:function(selector,context){
            context = context || document;
            return  context.querySelectorAll(selector);
        }
    })
    /*dom����ģ��*/
    zit.extend(zit,{
//��ĳ��Ԫ����������
        html:function(context, value){
            var doms=zit.$all(context);
            if(value){
                for(var i=0;i<doms.length;i++){
                    doms[i].innerHTML = value;
                }
            }else{
                return doms[0].innerHTML;
            }
        }
    });
    /*attrģ��*/
    zit.extend(zit,{
        setoneattr:function(dom, key, value){
            dom.setAttribute(key,value);
            //dom[key] = value;
        },
        setattr:function(doms,key,value){
            for(var i=0;i<doms.length;i++){
                doms[i].setAttribute(key,value);
                //dom[i][key] = value;
            }
        },
        getattr:function(dom,key){
            dom.getAttribute(key);
            //return dom[key];
            /*if(dom.currentStyle){     //����ie
             return dom.currentStyle[key];
             }else{
             return window.getComputedStyle(dom,null)[key];
             }*/
        },
        //attr�ϲ�
        attr:function(context,key,value){
            var doms=zit.isString(context)?zit.$all(context):context;
            if(doms.length){  //domsΪԪ�ؼ���
                if(value){   //����
                    zit.setattr(doms,key,value);
                }else{    //��ȡ
                    zit.getattr(doms[0],key);
                }
            }else{   //����domԪ��
                if(value){  //����
                    zit.setoneattr(doms,key,value);
                }else{  //��ȡ
                    zit.getattr(doms,key);
                }
            }
        },
        attr2:function(context,key,value){
            var doms=zit.$all(context);
            if(value){
                for(var i=0;i<doms.length;i++){
                    doms[i].setAttribute(key,value);
                }
            }else{
                return doms[0].getAttribute(key)
            }
        }
    })
    /*cssģ��*/
    zit.extend(zit,{
        setonestyle:function(dom, key, value){
            dom.style[key] = value;
        },
        setstyle:function(doms,key,value){
            for(var i=0;i<doms.length;i++){
                doms[i].style[key]=value;
            }
        },
        getstyle:function(dom,key){
            if(dom.currentStyle){     //����ie
                return dom.currentStyle[key];
            }else{
                return window.getComputedStyle(dom,null)[key];
            }
        },
        //css�ϲ�
        css:function(context,key,value){
            var doms=zit.isString(context)?zit.$all(context):context;
            if(doms.length){  //domsΪԪ�ؼ���
                if(value){   //����
                    zit.setstyle(doms,key,value);
                }else{    //��ȡ
                    return zit.getstyle(doms[0],key);
                }
            }else{   //����domԪ��
                if(value){  //����
                    zit.setonestyle(doms,key,value);
                }else{  //��ȡ
                    return zit.getstyle(doms,key);
                }
            }
        },
        hide:function(context){
            var doms=zit.$all(context);
            for(var i=0;i<doms.length;i++){
                zit.css(doms[i],"display","none");
            }
        },
        show:function(context){
            var doms=zit.$all(context);
            for(var i=0;i<doms.length;i++){
                zit.css(doms[i],"display","block");
            }
        },
        addcss:function(context,classname){
            var doms=zit.$all(context);
            for(var i=0;i<doms.length;i++){
                doms[i].className=doms[i].className+" "+classname;
            }
        },
        removecss:function(context,classname){
            var doms=zit.$all(context);
            for(var i=0;i<doms.length;i++){
                doms[i].className=doms[i].className.replace(classname,"");
            }
        },
        //�ж��Ƿ���
        hasClass:function(context,name){
            var doms = $$.$all(context)
            var flag = true;
            for(var i= 0,len=doms.length;i<len;i++){
                flag = flag && check(doms[i],name)
            }
            return flag;
            //�ж�����Ԫ��
            function check(element,name){
                return -1<(" "+element.className+" ").indexOf(" "+name+" ")
            }
        },
        //��ȡ
        getClass:function (id){
            var doms = $$.$all(id)
            return $$.trim(doms[0].className).split(" ")
        }
        /*css2:function(context,classname){
         var doms=zit.$all(context);
         for(var i=0;i<doms.length;i++){
         for(var j=0;j<doms.length;j++)
         }
         }*/
    })
    /*�ַ���ģ��*/
    zit.extend(zit,{
        ltrim:function(str){
            return str.replace(/(^\s*)/g,'');
        },
        //ȥ���ұ߿ո�
        rtrim:function(str){
            return str.replace(/(\s*$)/g,'');
        },
        //ȥ���ո�
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
    });
    /*����ģ��*/
    zit.extend(zit,{
        random: function (begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        }
    });
    /*����ģ��*/
    zit.extend(zit,{
        dateformat:function(date,format){
            var o={
                "M+":date.getMonth()+1,
                "d+":date.getDate(),
                "h+":date.getHours(),
                "m+":date.getMinutes(),
                "s+":date.getSeconds(),
                "q+":date.floor((date.getMonth()+3)/3),
                "s+":date.getMilliseconds()
            }
            if(/(y+)/.test(format)){
                format=format.replace(RegExp.$1),(date.getFullYear()+"").substr(4-RegExp.$1.length);
            }
            for(var k in o){
                if(new RegExp("("+k+")".test(format))){
                    format=format.replace(RegExp.$1,RegExp.$1.length==1?o[k]:("00"+o[k].substr((""+o[k]).length)));
                    return format;
                }
            }
        }});
    /*ajaxģ��*/
    zit.extend(zit,{
        myAjax:function(URL,fn){
            var xhr = createXHR();	//������һ�������������IE6���ݡ�
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                        fn(xhr.responseText);
                    }else{
                        alert("������ļ���");
                    }
                }
            };
            xhr.open("get",URL,true);
            xhr.send();

            //�հ���ʽ����Ϊ�������ֻ������ajax���������Է�������
            function createXHR() {
                //�����������ڡ�JavaScript�߼�������� ��3�桷��21��
                if (typeof XMLHttpRequest != "undefined") {
                    return new XMLHttpRequest();
                } else if (typeof ActiveXObject != "undefined") {
                    if (typeof arguments.callee.activeXString != "string") {
                        var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                                "MSXML2.XMLHttp"
                            ],
                            i, len;

                        for (i = 0, len = versions.length; i < len; i++) {
                            try {
                                new ActiveXObject(versions[i]);
                                arguments.callee.activeXString = versions[i];
                                break;
                            } catch (ex) {
                                //skip
                            }
                        }
                    }

                    return new ActiveXObject(arguments.callee.activeXString);
                } else {
                    throw new Error("No XHR object available.");
                }
            }
        },
    });
    /*�¼�ģ��*/
    zit.extend(zit,{
        /*���¼�*/
        on:function(id,type,fn){
            var dom=zit.isString(id)?document.getElementById(id):id;
            if(dom.addEventListener){
                dom.addEventListener(type,fn,false);
            }else{
                dom.attachEvent("on"+type,fn);
            }
        },
        /*����¼�*/
        un:function(id, type, fn) {
            //var dom = document.getElementById(id);
            var dom = zit.isString(id)?document.getElementById(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }

        },
        /*���*/
        click : function(id,fn){
            zit.$id(id).onclick=fn()
        },
        /*�������*/
        mouseover:function(id,fn){
            zit.on(id,'mouseover',fn);
        },
        /*����뿪*/
        mouseout:function(id,fn){
            zit.on(id,'mouseout',fn);
        },
        /*����*/
        hover : function(id,fnOver,fnOut){
            if(fnOver){
                zit.on(id,"mouseover",fnOver);
            }
            if(fnOut){
                zit.on(id,"mouseout",fnOut);
            }
        },
        /*�����¼�*/
        mousewheel:function(e){
            var event = zit.getevent(e);
            if(event.wheelDelta){
                return event.wheelDelta;
            }else{
                return -event.detail * 40;
            }
        },
        /*��ȡ�¼�����*/
        getevent:function(e){
            return e?e:window.event;
        },
        /*��ȡ�¼���Ŀ��Ԫ��*/
        gettarget:function(e){
            var event=zit.getevent(e);
            return event.target||event.srcElement;    //����ie6
        },
        /*��ֹĬ����Ϊ*/
        preventdefault:function(e){
            var event=zit.getevent(e);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue=false;     //����ie6
            }
        },
        /*��ֹ�¼�ð��*/
        stoppropagation:function(e){
            var event=zit.getevent(e);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble=true;     //����ie6
            }
            //event.stopPropagation?event.stopPropagation():event.cancelBubble=true;
        },
        /*�¼�ί��*/
        delegate:function(pid,eventType,selector,fn){
            //��������
            var parent=zit.$id(pid);
            function handle(e){
                var target=this.gettarget(e);
                console.log(target.nodeName)
                if(target.nodeName.toLowerCase()===selector||target.id===selector||target.className.indexOf(selector)!=-1){
                    fn.call(target);
                    //���¼�ð��ʱ�����Դ˱���ÿ��������������ҵ���ӦԪ�أ���ִ�����º���
                    //�����Ǹ���Ԫ�ذ�һ���¼�������ִ��˳���ǣ��Ȳ���Ŀ��Ԫ�أ�Ȼ���¼���ð��
                    parent[eventType]=handle;
                    //��Ԫ�ض����һ���¼�
                }
            }
        }
    });
    /*��������ģ��*/
    zit.extend(zit,{
        isNumber:function (val){
            return typeof val === 'number' && isFinite(val)
        },
        isBoolean:function (val) {
            return typeof val ==="boolean";
        },
        isString:function (val) {
            return typeof val === "string";
        },
        isUndefined:function (val) {
            return typeof val === "undefined";
        },
        isObj:function (str){
            if(str === null || typeof str === 'undefined'){
                return false;
            }
            return typeof str === 'object';
        },
        isNull:function (val){
            return  val === null;
        },
        isArray:function (arr) {
            if(arr === null || typeof arr === 'undefined'){
                return false;
            }
            return arr.constructor === Array;
        }

    });
    /*���*/
    zit.extend(zit,{
        //Ԫ�ظ߶ȿ�ȸ���
        //���㷽ʽ��clientHeight clientWidth innerWidth innerHeight
        //Ԫ�ص�ʵ�ʸ߶�+border��Ҳ������������
        Width:function (id){
            return $$.$id(id).clientWidth
        },
        Height:function (id){
            return $$.$id(id).clientHeight
        },
        //Ԫ�صĹ����߶ȺͿ��
        //��Ԫ�س��ֹ�����ʱ������ĸ߶������֣���������ĸ߶� ʵ�ʸ߶ȣ����Ӹ߶�+���ɼ��ĸ߶ȣ�
        //���㷽ʽ scrollwidth
        scrollWidth:function (id){
            return $$.$id(id).scrollWidth
        },
        scrollHeight:function (id){
            return $$.$id(id).scrollHeight
        },
        //Ԫ�ع�����ʱ�� ������ֹ����� ��������Ͻǵ�ƫ����
        //���㷽ʽ scrollTop scrollLeft
        scrollTop:function (id){
            return $$.$id(id).scrollTop
        },
        scrollLeft:function (id){
            return $$.$id(id).scrollLeft
        },
        //��ȡ��Ļ�ĸ߶ȺͿ��
        screenHeight:function (){
            return  window.screen.height
        },
        screenWidth:function (){
            return  window.screen.width
        },
        //�ĵ��ӿڵĸ߶ȺͿ��
        wWidth:function (){
            return document.documentElement.clientWidth
        },
        wHeight:function (){
            return document.documentElement.clientHeight
        },
        //�ĵ��������������ĸߺͿ�
        wScrollHeight:function () {
            return document.body.scrollHeight
        },
        wScrollWidth:function () {
            return document.body.scrollWidth
        },
        //��ȡ������������䶥����ƫ��
        wScrollTop:function () {
            var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop
        },
        //��ȡ���������������ߵ�ƫ��
        wScrollLeft:function () {
            var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
            return scrollLeft
        }
    });
    /*λ��*/
    zit.extend(zit,{
        //��ȡ����ֵ
        offset:function (id){
            //��ȡԪ�ص�����ֵ
            function offsetLeft(dom){
                return dom.offsetLeft
            }
            function offsetTop(dom){
                return dom.offsetTop
            }
            var dom = $$.$id(id);
            return {top:offsetTop(dom),left:offsetLeft(dom)}
        },
        position:function (id){
            function absolateLeft(id){
                var dom = $$.$id(id)
                var left = $$.offset(id).left;
                var parent = dom.offsetParent;
                while (parent !== null){
                    left += parent.offsetLeft;
                    parent = parent.offsetParent;
                }
                return left;
            }
            function absolateTop(id){
                var dom = $$.$id(id)
                var top = $$.offset(id).top;
                var parent = dom.offsetParent;
                while (parent !== null){
                    top += parent.offsetTop;
                    parent = parent.offsetParent;
                }
                return top;
            }
            return {top:absolateTop(id),left:absolateLeft(id)}
        }
    });
    /*jsonģ��*/
    zit.extend(zit,{
        //��jsonת�����ַ���
        sjson:function (json) {
            return JSON.stringify(json);
        },
        //���ַ���ת��json
        json:function (str) {
            return eval(str);
        }
    });
    /*����ģ��*/
    //������ - �ڴ�ƪ
    zit.extend(zit,{
        data:[],
        get:function(key){
            console.log('111')
            var value = null;
            console.log(this.data)
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (key == item.key) {
                    value = item.value;
                }
            }
            console.log('get'+value)
            return value;
        },
        add:function(key,value){
            var json= { key: key, value: value};
            this.data.push(json);
        },
        delete:function(key){
            var status = false;
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                // ѭ������Ԫ��
                if (item.key.trim() == key) {
                    this.data.splice(i, 1);//��ʼλ��,ɾ������
                    status = true;
                    break;
                }
            }
            return status;
        },
        update:function(key,value){
            var status = false;
            // ѭ������Ԫ��
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (item.key.trim() === key.trim()) {
                    item.value = value.trim();
                    status = true;
                    break;
                }
            }
            return status;
        },
        isExist:function(key){
            for(var i= 0,len=this.data.length;i<len; i++){
                var item = this.data[i]
                if (key === item.key) {
                    return true;
                }else{
                    return false;
                }
            }
        }
    })
//cookie���
    zit.extend(zit,{
        //����coolie
        setCookie: function (name,value,days,path){
            var name = escape(name);
            var value = escape(value);
            var expires = new Date();
            expires.setTime(expires.getTime() + days*24*60*60*1000);
            path = path == "" ? "" : ";path=" + path;
            _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
            document.cookie = name + "=" + value + _expires + path;
        },
        //��ȡcookieֵ
        getCookie:function (name){
            var name = escape(name);
            //��cookie���ԣ��⽫�����ĵ�������cookie
            var allcookies = document.cookie;

            //������Ϊname��cookie�Ŀ�ʼλ��
            name += "=";
            var pos = allcookies.indexOf(name);
            //����ҵ��˾��и����ֵ�cookie����ô��ȡ��ʹ������ֵ
            if (pos != -1){                                             //���posֵΪ-1��˵������"version="ʧ��
                var start = pos + name.length;                  //cookieֵ��ʼ��λ��
                var end = allcookies.indexOf(";",start);        //��cookieֵ��ʼ��λ����������һ��";"��λ��,��cookieֵ��β��λ��
                if (end == -1) end = allcookies.length;        //���endֵΪ-1˵��cookie�б���ֻ��һ��cookie
                var value = allcookies.substring(start,end);  //��ȡcookie��ֵ
                return unescape(value);                           //��������
            }
            else return "";                                             //����ʧ�ܣ����ؿ��ַ���
        },
        //ɾ��cookie
        deleteCookie:function (name,path){
            var name = escape(name);
            var expires = new Date(0);
            path = path == "" ? "" : ";path=" + path;
            document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
        }
    });
//���ش洢���
    zit.extend(zit,{
        store:(function () {
            var api               = {},
                win               = window,
                doc               = win.document,
                localStorageName  = 'localStorage',
                globalStorageName = 'globalStorage',
                storage;
            api.set    = function (key, value) {};
            api.get    = function (key)        {};
            api.remove = function (key)        {};
            api.clear  = function ()           {};
            if (localStorageName in win && win[localStorageName]) {
                storage    = win[localStorageName];
                api.set    = function (key, val) { storage.setItem(key, val) };
                api.get    = function (key)      { return storage.getItem(key) };
                api.remove = function (key)      { storage.removeItem(key) };
                api.clear  = function ()         { storage.clear() };

            } else if (globalStorageName in win && win[globalStorageName]) {
                storage    = win[globalStorageName][win.location.hostname];
                api.set    = function (key, val) { storage[key] = val };
                api.get    = function (key)      { return storage[key] && storage[key].value };
                api.remove = function (key)      { delete storage[key] };
                api.clear  = function ()         { for (var key in storage ) { delete storage[key] } };

            } else if (doc.documentElement.addBehavior) {
                function getStorage() {
                    if (storage) { return storage }
                    storage = doc.body.appendChild(doc.createElement('div'));
                    storage.style.display = 'none';
                    // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                    // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                    storage.addBehavior('#default#userData');
                    storage.load(localStorageName);
                    return storage;
                }
                api.set = function (key, val) {
                    var storage = getStorage();
                    storage.setAttribute(key, val);
                    storage.save(localStorageName);
                };
                api.get = function (key) {
                    var storage = getStorage();
                    return storage.getAttribute(key);
                };
                api.remove = function (key) {
                    var storage = getStorage();
                    storage.removeAttribute(key);
                    storage.save(localStorageName);
                }
                api.clear = function () {
                    var storage = getStorage();
                    var attributes = storage.XMLDocument.documentElement.attributes;;
                    storage.load(localStorageName);
                    for (var i=0, attr; attr = attributes[i]; i++) {
                        storage.removeAttribute(attr.name);
                    }
                    storage.save(localStorageName);
                }
            }
            return api;
        })()
    });
    /*�˶����̼���*/
    zit.extend(zit,{
        //  �����˶���ʱ�����
        gettween:function(now,pass,all){
            var yongshi = pass-now;
            var jincheng =yongshi/all;
            return jincheng;
        },
        //�˶����ƣ����ڼ�ʱ��
        move:function() {
            //����ֹͣ������
            if(tween>=1) {
                clearInterval(timer);
            }else {
                pass = +new Date();
                tween = zit.gettween(now,pass,5000)
                step = 400*tween;
                div.style.left= step+'px';
            }
        },
        //�����˶��������ʼλ��
        oneposition:function(dom,name,start,tween,juli){
            dom.style[name]=(start+tween*juli)+"px";
        },
        //�ܶ���
        animate:function(id,shijian,juli){
            var now = +new Date();
            var pass=  +new Date();
            var tween=0
            var timer;
            timer = setInterval(Move,30);
            function getTween(now,pass,shijian){
                var yongshi = pass-now;
                var jincheng =yongshi/shijian;
                return jincheng;
            }
            /*ʹ�ñ��Ӷ�����*/
            function getTween2(now,pass,duration,ease){
                var eases = {
                    //��������
                    linear:function (t, b, c, d){
                        return (c - b) * (t/ d);
                    },
                    //�����˶�
                    easeOutBounce:function (t, b, c, d) {
                        if ((t/=d) < (1/2.75)) {
                            return c*(7.5625*t*t) + b;
                        } else if (t < (2/2.75)) {
                            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                        } else if (t < (2.5/2.75)) {
                            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                        } else {
                            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                        }
                    },
                    //����
                    swing: function (t, b, c, d) {
                        return this.easeOutQuad(t, b, c, d);
                    },
                    easeInQuad: function (t, b, c, d) {
                        return c*(t/=d)*t + b;
                    },
                    easeOutQuad: function (t, b, c, d) {
                        return -c *(t/=d)*(t-2) + b;
                    },
                    easeInOutQuad: function (t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t + b;
                        return -c/2 * ((--t)*(t-2) - 1) + b;
                    },
                    easeInCubic: function (t, b, c, d) {
                        return c*(t/=d)*t*t + b;
                    },
                    easeOutCubic: function (t, b, c, d) {
                        return c*((t=t/d-1)*t*t + 1) + b;
                    },
                    easeInOutCubic: function (t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t + b;
                        return c/2*((t-=2)*t*t + 2) + b;
                    },
                    easeInQuart: function (t, b, c, d) {
                        return c*(t/=d)*t*t*t + b;
                    },
                    easeOutQuart: function (t, b, c, d) {
                        return -c * ((t=t/d-1)*t*t*t - 1) + b;
                    },
                    easeInOutQuart: function (t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                        return -c/2 * ((t-=2)*t*t*t - 2) + b;
                    },
                    easeInQuint: function (t, b, c, d) {
                        return c*(t/=d)*t*t*t*t + b;
                    },
                    easeOutQuint: function (t, b, c, d) {
                        return c*((t=t/d-1)*t*t*t*t + 1) + b;
                    },
                    easeInOutQuint: function (t, b, c, d) {
                        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                        return c/2*((t-=2)*t*t*t*t + 2) + b;
                    },
                    easeInSine: function (t, b, c, d) {
                        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                    },
                    easeOutSine: function (t, b, c, d) {
                        return c * Math.sin(t/d * (Math.PI/2)) + b;
                    },
                    easeInOutSine: function (t, b, c, d) {
                        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                    },
                    easeInExpo: function (t, b, c, d) {
                        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                    },
                    easeOutExpo: function (t, b, c, d) {
                        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                    },
                    easeInOutExpo: function (t, b, c, d) {
                        if (t==0) return b;
                        if (t==d) return b+c;
                        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                    },
                    easeInCirc: function (t, b, c, d) {
                        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                    },
                    easeOutCirc: function (t, b, c, d) {
                        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                    },
                    easeInOutCirc: function (t, b, c, d) {
                        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                    },
                    easeInElastic: function (t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    },
                    easeOutElastic: function (t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                    },
                    easeInOutElastic: function (t, b, c, d) {
                        var s=1.70158;var p=0;var a=c;
                        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                        if (a < Math.abs(c)) { a=c; var s=p/4; }
                        else var s = p/(2*Math.PI) * Math.asin (c/a);
                        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                    },
                    easeInBack: function (t, b, c, d, s) {
                        if (s == undefined) s = 1.70158;
                        return c*(t/=d)*t*((s+1)*t - s) + b;
                    },
                    easeOutBack: function (t, b, c, d, s) {
                        if (s == undefined) s = 1.70158;
                        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                    },
                    easeInOutBack: function (t, b, c, d, s) {
                        if (s == undefined) s = 1.70158;
                        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                    },
                    easeInBounce: function (t, b, c, d) {
                        return c - this.easeOutBounce (d-t, 0, c, d) + b;
                    },
                    easeInOutBounce: function (t, b, c, d) {
                        if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                        return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
                    }
                }  //���Ӷ���������
                var yongshi = pass -now;
                return eases[ease](yongshi,0,1,duration);
            }
            function stop(){
                clearInterval(timer);
            }
            function oneProperty(id,name,start,juli,tween){
                if(name=="opacity"){
                    zit.css(id,name,start+juli*tween)
                }else{
                    zit.css(id,name,(start+juli*tween)+'px')
                    /*dom.style[name]= (start+juli*tween)+'px'*/
                }
                zit.css(id,name,(start+juli*tween)+'px')
                /*dom.style[name]= (start+juli*tween)+'px'*/
            }
            function Move() {
                if(tween>=1) {
                    stop();
                }else {
                    pass = +new Date();
                    tween = getTween(now,pass,shijian)
                    /*tween = getTween2(now,pass,shijian)*/
                    oneProperty('div','left',0,juli,tween)
                }
            }
        },
        //�ܶ���2   json������Ӧ��
        animate2:function(id,json,time) {
            var now = +new Date();
            var styles =  adpater(id,json)
            var timer = setInterval(move,30);
            function adpater(id,source){
                var target=[];
                for(var item in source){
                    var json={};
                    json.start= parseFloat(zit.css(id,item))
                    json.juli = parseFloat(source[item]) -json.start;
                    json.property = item
                    target.push(json)
                }
                return target;
            }
            function stop(){
                clearInterval(timer);
            }
            function oneProperty(id,name,start,juli,tween){
                if(name=="opacity"){
                    zit.css(id,name,start+juli*tween)
                }else{
                    zit.css(id,name,(start+juli*tween)+'px')
                    /*dom.style[name]= (start+juli*tween)+'px'*/
                }
                zit.css(id,name,(start+juli*tween)+'px')
                /*dom.style[name]= (start+juli*tween)+'px'*/
            }
            function move() {
                var pass = +new Date();
                var tween = getTween(now,pass,time,'easeOutBounce');
                if(tween>=1) {
                    stop()
                }else {
                    for(var i= 0,len=styles.length;i<len;i++) {
                        oneProperty(id,styles[i].property,styles[i].start,styles[i].juli,tween)
                    }
                }
            }
            function getTween(now,pass,duration,ease){
                var yongshi = pass -now;
                return eases[ease](yongshi,0,1,duration);
            }
            var eases = {
                linear:function (t, b, c, d){
                    return (c - b) * (t/ d);
                },
                easeOutBounce:function (t, b, c, d) {
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                swing: function (t, b, c, d) {
                    return this.easeOutQuad(t, b, c, d);
                },
                easeInQuad: function (t, b, c, d) {
                    return c*(t/=d)*t + b;
                },
                easeOutQuad: function (t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (t, b, c, d) {
                    return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOutQuint: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOutQuint: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInSine: function (t, b, c, d) {
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOutSine: function (t, b, c, d) {
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOutSine: function (t, b, c, d) {
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                },
                easeInExpo: function (t, b, c, d) {
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOutExpo: function (t, b, c, d) {
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOutExpo: function (t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOutCirc: function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOutCirc: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                },
                easeInElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                },
                easeInOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                },
                easeInBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                easeInBounce: function (t, b, c, d) {
                    return c - this.easeOutBounce (d-t, 0, c, d) + b;
                },
                easeInOutBounce: function (t, b, c, d) {
                    if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                    return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            }
        }
    })
    /*����ģ�� �ҵ�ģ�°汾*/
    function Animate(){
        this.timer;
        this.interval=16
        this.queen=[];
    };
    Animate.prototype={
        //�û�ʹ�÷���
        //����
        add:function(id,json,duration){
            this._adapterMany(id,json,duration)
            this._run()
        },
        //˽��
        //����ˢ�¶�ʱ��
        _run:function(){
            var that=this;
            that.timer=setInterval(function(){that._loop();},that.interval);
        },
        _loop:function(){
            var that = this;
            for(var i = 0,len=this.queen.length;i<len;i++){
                var _obj = this.queen[i]
                that._move(_obj)
            }
        },
        //��ʽ����ת��  ������
        _adapterOne:function(id,json,duration){
            var _obj={}
            _obj.id = id
            _obj.duration = duration
            _obj.tween = 0
            _obj.now = +new Date()
            _obj.styles=this._getstyles(id,json)
            return _obj
        },
        _adapterMany:function(id,json,duration){
            var _obj = this._adapterOne(id,json,duration)
            this.queen.push(_obj)
        },
        _getstyles:function(id,source){
            var target=[];
            for(var item in source){
                var json={};
                json.start=parseFloat(zit.css(id,item));
                json.juli=parseFloat(source[item])-json.start;
                json.property=item;
                target.push(json);
            }
            return target;
        },
        //����ˢ��
        _move:function(_obj){
            var that=this;
            var pass=+new Date();
            var styles=_obj.styles;
            var id=_obj.id;
            var tween=that._gettween(_obj.now,pass,_obj.shijian,"easeOutBounce");
            if(tween>=1){
                that._stop(id,styles);
            }else{
                that._manyproperty(id,styles,tween);

            }
        },
        //��ö�������
        _gettween:function(now,pass,shijian,ease){
            var eases = {
                //��������
                linear:function (t, b, c, d){
                    return (c - b) * (t/ d);
                },
                //�����˶�
                easeOutBounce:function (t, b, c, d) {
                    if ((t/=d) < (1/2.75)) {
                        return c*(7.5625*t*t) + b;
                    } else if (t < (2/2.75)) {
                        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                    } else if (t < (2.5/2.75)) {
                        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                    } else {
                        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                    }
                },
                //����
                swing: function (t, b, c, d) {
                    return this.easeOutQuad(t, b, c, d);
                },
                easeInQuad: function (t, b, c, d) {
                    return c*(t/=d)*t + b;
                },
                easeOutQuad: function (t, b, c, d) {
                    return -c *(t/=d)*(t-2) + b;
                },
                easeInOutQuad: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t + b;
                    return -c/2 * ((--t)*(t-2) - 1) + b;
                },
                easeInCubic: function (t, b, c, d) {
                    return c*(t/=d)*t*t + b;
                },
                easeOutCubic: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                easeInOutCubic: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t + b;
                    return c/2*((t-=2)*t*t + 2) + b;
                },
                easeInQuart: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t + b;
                },
                easeOutQuart: function (t, b, c, d) {
                    return -c * ((t=t/d-1)*t*t*t - 1) + b;
                },
                easeInOutQuart: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                    return -c/2 * ((t-=2)*t*t*t - 2) + b;
                },
                easeInQuint: function (t, b, c, d) {
                    return c*(t/=d)*t*t*t*t + b;
                },
                easeOutQuint: function (t, b, c, d) {
                    return c*((t=t/d-1)*t*t*t*t + 1) + b;
                },
                easeInOutQuint: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                    return c/2*((t-=2)*t*t*t*t + 2) + b;
                },
                easeInSine: function (t, b, c, d) {
                    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
                },
                easeOutSine: function (t, b, c, d) {
                    return c * Math.sin(t/d * (Math.PI/2)) + b;
                },
                easeInOutSine: function (t, b, c, d) {
                    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
                },
                easeInExpo: function (t, b, c, d) {
                    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
                },
                easeOutExpo: function (t, b, c, d) {
                    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
                },
                easeInOutExpo: function (t, b, c, d) {
                    if (t==0) return b;
                    if (t==d) return b+c;
                    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
                },
                easeInCirc: function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
                },
                easeOutCirc: function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
                },
                easeInOutCirc: function (t, b, c, d) {
                    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
                },
                easeInElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                },
                easeOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                },
                easeInOutElastic: function (t, b, c, d) {
                    var s=1.70158;var p=0;var a=c;
                    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                    if (a < Math.abs(c)) { a=c; var s=p/4; }
                    else var s = p/(2*Math.PI) * Math.asin (c/a);
                    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
                },
                easeInBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*(t/=d)*t*((s+1)*t - s) + b;
                },
                easeOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
                easeInOutBack: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                },
                easeInBounce: function (t, b, c, d) {
                    return c - this.easeOutBounce (d-t, 0, c, d) + b;
                },
                easeInOutBounce: function (t, b, c, d) {
                    if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                    return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
                }
            };
            var yongshi=pass-now;
            return eases[ease](yongshi,0,1,shijian);
        },
        //��ʱ��ֹͣ
        _stop:function(id,styles){
            _manyproperty(id,styles,1)
            clearInterval(this.timer);
        },
        //����json�еĶ�������
        _manyproperty:function(id,styles,tween){
            var that=this;
            for(var i=0;i<styles.length;i++){
                that._oneproperty(id,styles[i].property,styles[i].start,styles[i].juli,tween);
            }
        },
        //���õ�������
        _oneproperty:function(id,name,start,juli,tween){
            if(name=="opacity"){
                zit.css(id,name,start+juli*tween);
            }else{
                zit.css(id,name,(start+juli*tween)+"px")
            }
        },
        //�������ա��ͷ��ڴ�
        _destory:function(){}
    };
    zit.animate=new Animate();
    /*����ģ��2   ��Ƶ�汾*/
    function Animate2() {

        //һ���ٱ�д��ܵ�ʱ�򶼻ᶨ��һ�����ö��󱣴���ƶ�����һЩֵ�������û��Զ���
        //�������ȶ����Ĭ��ֵ
        this.config={
            interval:16,
            ease:'linear',
        }

        this.timer =0;
        //����һ��indexͳ��ÿ����ӵĶ����� ��һ��Ϊ0
        this.index=-1;
        //��������
        //���Ƕ���һ�������������˶���������Ҫ�����ݣ�����now��pass��
        this._obj={};
        //����ʹ������������ÿ��ÿ��������˶�����
        this._queen=[]
        //���ó�ʼ������
        this._init();
    }
    Animate2.prototype ={


        /* ------------------------------------------------
         *��������
         *�����������Ŷ���ʹ�õĹ�����������
         *-------------------------------------------------*/
        eases:{
            //��������
            linear:function (t, b, c, d){
                return (c - b) * (t/ d);
            },
            //�����˶�
            easeOutBounce:function (t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            },
            //����
            swing: function (t, b, c, d) {
                return this.easeOutQuad(t, b, c, d);
            },
            easeInQuad: function (t, b, c, d) {
                return c*(t/=d)*t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                return -c *(t/=d)*(t-2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t + b;
                return -c/2 * ((--t)*(t-2) - 1) + b;
            },
            easeInCubic: function (t, b, c, d) {
                return c*(t/=d)*t*t + b;
            },
            easeOutCubic: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t + 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t + b;
                return c/2*((t-=2)*t*t + 2) + b;
            },
            easeInQuart: function (t, b, c, d) {
                return c*(t/=d)*t*t*t + b;
            },
            easeOutQuart: function (t, b, c, d) {
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            },
            easeInOutQuart: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
                return -c/2 * ((t-=2)*t*t*t - 2) + b;
            },
            easeInQuint: function (t, b, c, d) {
                return c*(t/=d)*t*t*t*t + b;
            },
            easeOutQuint: function (t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            },
            easeInOutQuint: function (t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            },
            easeInSine: function (t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOutSine: function (t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOutSine: function (t, b, c, d) {
                return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
            },
            easeInExpo: function (t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOutExpo: function (t, b, c, d) {
                return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOutExpo: function (t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function (t, b, c, d) {
                return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
            },
            easeOutCirc: function (t, b, c, d) {
                return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
            },
            easeInOutCirc: function (t, b, c, d) {
                if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
                return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
            },
            easeInElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            },
            easeOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
            },
            easeInOutElastic: function (t, b, c, d) {
                var s=1.70158;var p=0;var a=c;
                if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
                if (a < Math.abs(c)) { a=c; var s=p/4; }
                else var s = p/(2*Math.PI) * Math.asin (c/a);
                if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
            },
            easeInBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*(t/=d)*t*((s+1)*t - s) + b;
            },
            easeOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            },
            easeInOutBack: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
            },
            easeInBounce: function (t, b, c, d) {
                return c - this.easeOutBounce (d-t, 0, c, d) + b;
            },
            easeInOutBounce: function (t, b, c, d) {
                if (t < d/2) return this.easeInBounce (t*2, 0, c, d) * .5 + b;
                return this.easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
            }
        },
        //��ȡʱ�����
        _getTween:function (now,pass,duration,ease){
            var yongshi = pass -now;
            //��ϰ�����������ַ��ʷ�ʽ
            return this.eases[ease](yongshi,0,1,duration);
        },
        //��ʼ��ִ�еĴ���һ�����init���棬һ���ǹ��캯������
        _init:function(){},

        /*�µļ���*/
        getAnimationFrame:function(){
            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' '); //�������ǰ׺

            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;

            var prefix;
            //ͨ�������������ǰ׺�����õ�requestAnimationFrame��cancelAnimationFrame�ڵ�ǰ�������ʵ����ʽ
            for( var i = 0; i < prefixes.length; i++ ) {
                if ( requestAnimationFrame && cancelAnimationFrame ) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
                cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
            }

            //�����ǰ�������֧��requestAnimationFrame��cancelAnimationFrame������˵�setTimeout
            if ( !requestAnimationFrame || !cancelAnimationFrame ) {
                requestAnimationFrame = function( callback, element ) {
                    var currTime = new Date().getTime();
                    //Ϊ��ʹsetTimteout�ľ����ܵĽӽ�ÿ��60֡��Ч��
                    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
                    var id = window.setTimeout( function() {
                        callback( currTime + timeToCall );
                    }, timeToCall );
                    lastTime = currTime + timeToCall;
                    return id;
                };

                cancelAnimationFrame = function( id ) {
                    window.clearTimeout( id );
                };
            }

            //�õ����ݸ��������API
            return {
                requestAnimationFrame : requestAnimationFrame,
                cancelAnimationFrame : cancelAnimationFrame
            }

        },

        /* ------------------------------------------------
         *���в� �ϴ�:run
         *����ְ������: ������ӽ�����Ԫ�����Դ�������,����������
         *-------------------------------------------------*/
        //���в��ϴ�
        _run:function(){
            var that = this;

            //run������ʵ���Ǹ�ѭ��
            that.timer = setInterval(function(){that._loop();}, that.config.interval);
        },
        //��������һ��loop�Դ����ÿ���������˶� --��ʵ���Ǳ���ÿ������Ȼ������ִ��move����
        _loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this._move(this._queen[i])
            }
        },
        //���������˶�����
        _move:function (_obj) {
            var pass = +new Date();
            _obj.pass = pass - _obj.now;

            var dom =_obj.dom;
            var styles= _obj.styles;
            var tween = this._getTween(_obj.now,pass,_obj.duration,this.config.ease);
            if(tween>=1) {
                //this.timer.clearInterval();
                //this.timer = 0;
                //_obj.callback()
                tween = 1;
                for(var i= 0,len=styles.length;i<len;i++) {
                    if(styles[i].property=='opacity') {

                        $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }else {
                for(var i= 0,len=styles.length;i<len;i++) {
                    if(styles[i].property=='opacity') {

                        $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween);
                    }
                    else {
                        $$.css(dom, styles[i].property, styles[i].start+styles[i].juli*tween+'px');
                    }
                }
            }
        },
        //����ִ�н�����Ļص�����
        _callBack:function(){},



        /* ------------------------------------------------
         *��Ӳ�  -- add
         *����ְ������: ���Ԫ�� �Լ�ȷ����Ҫ���ĸ�����������
         *-------------------------------------------------*/
        //�����ϴ� - ���
        addOld:function(id,json,duration,callback) {
            //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
            //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
            this._apdapter(id,json,duration,callback)
            this._run();
        },
        add:function() {
            try{
                //add�������������飺�����������ж�����ֻҪ�û�����add���������������ܹ���������
                //�����Ⱥ�۹滮add�����Ľӿ� --ע�ͷ�
                var options = arguments
                var id = options[0]
                var json = options[1]
                var duration = options[2]
                var callback = options[3]

                console.log(duration)

                //���Ĭ��ֵ
                if(!duration) {
                    duration=2000;
                }else {
                    if($$.isString(duration)){
                        switch (duration) {
                            case 'slow' :
                            case '��' :
                                duration = 8000;
                                break;
                            case 'normal' :
                            case '��ͨ' :
                                duration = 4000;
                                break;
                            case 'fast' :
                            case '��' :
                                duration = 2000;
                                break;
                        }
                    }else{
                    }
                }
                this._apdapter(id,json,duration,callback)
                this._run();
            }catch(e){
                alert('�������,ϵͳ������ʾ��'+'\n'+ e.message+'\n'+ e.name);
            }

        },
        //������ --��һְ��ԭ��
        //���Ǽ������������� -- �������в���Ҫ�����ݻ�����������_obj����
        _apdapter:function (id,source,duration,callback){
            var _obj={}
            this.index++;
            _obj.index=this.index;
            /*���������жϵ���Ҫ��*/
            _obj.dom = $$.isString(id)?$$.$id(id):id
            _obj.duration = duration
            _obj.now = +new Date()
            _obj.callback =callback;

            var target=[];
            for(var item in source){
                var json={};
                //Ԫ�����Ե���ʼλ�� ����Ŀ��Ԫ��Ŀǰleft 100px��ϣ���˶���500px����ô100������ʼλ��
                json.start = parseFloat($$.css(_obj.dom,item))
                json.juli = parseFloat(source[item]) - json.start;
                json.property = item
                target.push(json)
            }
            _obj.styles = target;
            this._queen.push(_obj)
        },




        /* ------------------------------------------------
         *����API -- ѧϰʲô�ǹ���API
         *�ṩ��ʹ�ÿ�ܵ��ˣ�ʹ�ÿ�ܵ���һ��ֻ��Ҫ����
         *-------------------------------------------------*/
        //��ʼ����
        begin:function() {},
        //ֹͣ����
        stop:function() {},
        //�Զ��嶯��������
        setConfig:function(json){
            //��������û����ƶ���
            var that = this;
            $$.extend(this.config,json)
        },

        /* ------------------------------------------------
         *���ڲ�
         *����ְ������: �������ж���  ������� �����ڴ����
         *-------------------------------------------------*/
        _destroy:function(obj) {
            var that = this;
            //�ڴ��Ż�
            //1 �ͷŶ���  -- ����ʵ�ֵ�  -- ����ɾ������
            //�ĸ�����ִ���꣬�Ҿ��ͷ��ĸ�������ռ�õ��ڴ�
            that._queen.splice(obj.index,1);
            //2 �ͷŶ�������Ժͷ���
            for(var i in obj) {
                delete obj[i];
            }
            //3 �ͷŶ�����ռ�õ��ڴ�
            obj = null;
        }

    };
    zit.animate2 = new Animate2()
    w.zit=zit;
})(window);