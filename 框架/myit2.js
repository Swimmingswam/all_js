/**
 * Created by acer on 2017/8/28.
 */
(function(w){
    /*根基模块*/
    var zym=function(){};
    zym.prototype.extend=function(target,source){
        for(var i in source){
            target[i]=source[i]
        }
        return target;
    }
//实例化对象供使用
    var zit=new zym();
    /*基础模块*/
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
            //遍历对象
            for(var i in source){
                tar[i] = source[i];
            }
            return tar;
        },
        //未解决
        each:function(doms,fn){
            for(var i=0;i<doms.length;i++) {
                fn(i, doms[i]);
            }
        }
    });
    /*选择器模块*/
    zit.extend(zit, {
        //id选择器
        $id: function (str) {
            return document.getElementById(str)
        },
        //tag选择器
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
        //class选择器
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
        //多种分组选择器 我写的版本 (对比下一个$group)
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
        //分组选择器  视频版本
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
                    //每次循环将doms保存在reult中
                    //result.push(doms);//错误来源
                    //陷阱1解决 封装重复的代码成函数
                    pushArray(doms,result)
                }else if(first ==='#'){
                    doms=[zit.$id(item.slice(index+1))]//陷阱：之前我们定义的doms是数组，但是$id获取的不是数组，而是单个元素
                    //封装重复的代码成函数
                    pushArray(doms,result)
                }else{
                    doms = zit.$tag(item)
                    pushArray(doms,result)
                }
            }
            return result;
            //封装重复的代码
            function pushArray(doms,result){
                for(var j= 0, domlen = doms.length; j < domlen; j++){
                    result.push(doms[j])
                }
            }
        },
        tab: function (id) {
            //如何获取某个父元素下面的子元素
            var box = document.getElementById(id);
            var spans = box.getElementsByTagName('span');
            var lis = box.getElementsByTagName('li');
            //两步走
            //第一步: 先把上半部分实现
            //群体绑定事件  -- 对所有的span绑定事件
            //群体绑定事件
            for (var i = 0; i < spans.length; i++) {
                //相亲法则  -- 给男一号一个代号  --  怎么给 -- 自定义属性
                spans[i].index = i;
                spans[i].onmouseover = function () {
                    //排他思想 --  将所有的span置为默认状态  --- 然后再将当前鼠标移上的span置为class -- select
                    for (var i = 0; i < spans.length; i++) {
                        spans[i].className = '';
                        lis[i].className = '';
                    }
                    this.className = 'select';
                    lis[this.index].className = 'select';
                }
            }

        },
        //简单的数据绑定formateString
        formateString: function (str, data) {
            return str.replace(/@\((\w+)\)/g, function (match, key) {
                return typeof data[key] === "undefined" ? '' : data[key]
            });
        },
        //层次选择器  /*管道思想*/
        $layer:function(select){
            var sel = select.split(' ');   //把传进来的字符串以空格分开加入sel
            var context=[];  //原数
            var result=[]    //结果
            for(var i = 0, len = sel.length; i < len; i++){    //[#con .span span]
                var item = sel[i];
                var first = item.charAt(0)  //开头符号标志
                var index = item.indexOf(first)   //开头符号标志的索引值
                var name = item.slice(index+1)   //从开头符号标志后一直截取字符串
                if(first ==='#'){     //因为一个id只能找到一个，所以不需要再遍历
                    result = [zit.$id(name)]
                    context=result    //将本次id结果作为下一次循环的原数
                }else if(first ==='.'){
                    //如果是.
                    if(context.length>0){   //如果上一层有一个或多个，再遍历
                        for (var i=0;i<context.length;i++){      //遍历上一层次
                            pushArray(zit.$class(name,context[i]))   //把从context[i]本层次中找到的.name放进result
                            context = result;
                        }
                    }else{
                        pushArray(zit.$class(name))  //如果是第一层，直接把结果.name放进result
                        context = result;
                    }
                }else{
                    if(context.length>0){  //如果上一层有一个或多个，再遍历
                        //如果是标签
                        for (var i=0;i<context.length;i++){    //遍历上一层次
                            pushArray(zit.$tag(item,context[i]))  //把从context[i]本层次中找到的tag放进result
                            context = result;
                        }
                    }else{
                        pushArray(zit.$tag(item))   //如果是第一层，直接把结果tag放进result
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
        //多组加层次
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
        //html5实现的选择器
        $all:function(selector,context){
            context = context || document;
            return  context.querySelectorAll(selector);
        }
    })
    /*dom操作模块*/
    zit.extend(zit,{
//给某个元素设置内容
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
    /*attr模块*/
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
            /*if(dom.currentStyle){     //兼容ie
             return dom.currentStyle[key];
             }else{
             return window.getComputedStyle(dom,null)[key];
             }*/
        },
        //attr合并
        attr:function(context,key,value){
            var doms=zit.isString(context)?zit.$all(context):context;
            if(doms.length){  //doms为元素集合
                if(value){   //设置
                    zit.setattr(doms,key,value);
                }else{    //获取
                    zit.getattr(doms[0],key);
                }
            }else{   //单个dom元素
                if(value){  //设置
                    zit.setoneattr(doms,key,value);
                }else{  //获取
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
    /*css模块*/
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
            if(dom.currentStyle){     //兼容ie
                return dom.currentStyle[key];
            }else{
                return window.getComputedStyle(dom,null)[key];
            }
        },
        //css合并
        css:function(context,key,value){
            var doms=zit.isString(context)?zit.$all(context):context;
            if(doms.length){  //doms为元素集合
                if(value){   //设置
                    zit.setstyle(doms,key,value);
                }else{    //获取
                    return zit.getstyle(doms[0],key);
                }
            }else{   //单个dom元素
                if(value){  //设置
                    zit.setonestyle(doms,key,value);
                }else{  //获取
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
        //判断是否有
        hasClass:function(context,name){
            var doms = $$.$all(context)
            var flag = true;
            for(var i= 0,len=doms.length;i<len;i++){
                flag = flag && check(doms[i],name)
            }
            return flag;
            //判定单个元素
            function check(element,name){
                return -1<(" "+element.className+" ").indexOf(" "+name+" ")
            }
        },
        //获取
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
    /*字符串模块*/
    zit.extend(zit,{
        ltrim:function(str){
            return str.replace(/(^\s*)/g,'');
        },
        //去除右边空格
        rtrim:function(str){
            return str.replace(/(\s*$)/g,'');
        },
        //去除空格
        trim:function(str){
            return str.replace(/(^\s*)|(\s*$)/g, '');
        },
    });
    /*数字模块*/
    zit.extend(zit,{
        random: function (begin, end) {
            return Math.floor(Math.random() * (end - begin)) + begin;
        }
    });
    /*日期模块*/
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
    /*ajax模块*/
    zit.extend(zit,{
        myAjax:function(URL,fn){
            var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                        fn(xhr.responseText);
                    }else{
                        alert("错误的文件！");
                    }
                }
            };
            xhr.open("get",URL,true);
            xhr.send();

            //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
            function createXHR() {
                //本函数来自于《JavaScript高级程序设计 第3版》第21章
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
    /*事件模块*/
    zit.extend(zit,{
        /*绑定事件*/
        on:function(id,type,fn){
            var dom=zit.isString(id)?document.getElementById(id):id;
            if(dom.addEventListener){
                dom.addEventListener(type,fn,false);
            }else{
                dom.attachEvent("on"+type,fn);
            }
        },
        /*解除事件*/
        un:function(id, type, fn) {
            //var dom = document.getElementById(id);
            var dom = zit.isString(id)?document.getElementById(id):id;
            if(dom.removeEventListener){
                dom.removeEventListener(type, fn);
            }else if(dom.detachEvent){
                dom.detachEvent(type, fn);
            }

        },
        /*点击*/
        click : function(id,fn){
            zit.$id(id).onclick=fn()
        },
        /*鼠标移上*/
        mouseover:function(id,fn){
            zit.on(id,'mouseover',fn);
        },
        /*鼠标离开*/
        mouseout:function(id,fn){
            zit.on(id,'mouseout',fn);
        },
        /*悬浮*/
        hover : function(id,fnOver,fnOut){
            if(fnOver){
                zit.on(id,"mouseover",fnOver);
            }
            if(fnOut){
                zit.on(id,"mouseout",fnOut);
            }
        },
        /*滚轮事件*/
        mousewheel:function(e){
            var event = zit.getevent(e);
            if(event.wheelDelta){
                return event.wheelDelta;
            }else{
                return -event.detail * 40;
            }
        },
        /*获取事件对象*/
        getevent:function(e){
            return e?e:window.event;
        },
        /*获取事件的目标元素*/
        gettarget:function(e){
            var event=zit.getevent(e);
            return event.target||event.srcElement;    //兼容ie6
        },
        /*阻止默认行为*/
        preventdefault:function(e){
            var event=zit.getevent(e);
            if(event.preventDefault){
                event.preventDefault();
            }else{
                event.returnValue=false;     //兼容ie6
            }
        },
        /*阻止事件冒泡*/
        stoppropagation:function(e){
            var event=zit.getevent(e);
            if(event.stopPropagation){
                event.stopPropagation();
            }else{
                event.cancelBubble=true;     //兼容ie6
            }
            //event.stopPropagation?event.stopPropagation():event.cancelBubble=true;
        },
        /*事件委托*/
        delegate:function(pid,eventType,selector,fn){
            //参数处理
            var parent=zit.$id(pid);
            function handle(e){
                var target=this.gettarget(e);
                console.log(target.nodeName)
                if(target.nodeName.toLowerCase()===selector||target.id===selector||target.className.indexOf(selector)!=-1){
                    fn.call(target);
                    //在事件冒泡时，回以此遍历每个子孙后代，如果找到对应元素，则执行如下函数
                    //当我们给父元素绑定一个事件，他的执行顺序是：先捕获到目标元素，然后事件再冒泡
                    parent[eventType]=handle;
                    //给元素对象绑定一个事件
                }
            }
        }
    });
    /*数据类型模块*/
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
    /*宽高*/
    zit.extend(zit,{
        //元素高度宽度概述
        //计算方式：clientHeight clientWidth innerWidth innerHeight
        //元素的实际高度+border，也不包含滚动条
        Width:function (id){
            return $$.$id(id).clientWidth
        },
        Height:function (id){
            return $$.$id(id).clientHeight
        },
        //元素的滚动高度和宽度
        //当元素出现滚动条时候，这里的高度有两种：可视区域的高度 实际高度（可视高度+不可见的高度）
        //计算方式 scrollwidth
        scrollWidth:function (id){
            return $$.$id(id).scrollWidth
        },
        scrollHeight:function (id){
            return $$.$id(id).scrollHeight
        },
        //元素滚动的时候 如果出现滚动条 相对于左上角的偏移量
        //计算方式 scrollTop scrollLeft
        scrollTop:function (id){
            return $$.$id(id).scrollTop
        },
        scrollLeft:function (id){
            return $$.$id(id).scrollLeft
        },
        //获取屏幕的高度和宽度
        screenHeight:function (){
            return  window.screen.height
        },
        screenWidth:function (){
            return  window.screen.width
        },
        //文档视口的高度和宽度
        wWidth:function (){
            return document.documentElement.clientWidth
        },
        wHeight:function (){
            return document.documentElement.clientHeight
        },
        //文档滚动区域的整体的高和宽
        wScrollHeight:function () {
            return document.body.scrollHeight
        },
        wScrollWidth:function () {
            return document.body.scrollWidth
        },
        //获取滚动条相对于其顶部的偏移
        wScrollTop:function () {
            var scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
            return scrollTop
        },
        //获取滚动条相对于其左边的偏移
        wScrollLeft:function () {
            var scrollLeft = document.body.scrollLeft || (document.documentElement && document.documentElement.scrollLeft);
            return scrollLeft
        }
    });
    /*位置*/
    zit.extend(zit,{
        //获取坐标值
        offset:function (id){
            //获取元素的坐标值
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
    /*json模块*/
    zit.extend(zit,{
        //将json转换成字符串
        sjson:function (json) {
            return JSON.stringify(json);
        },
        //将字符串转成json
        json:function (str) {
            return eval(str);
        }
    });
    /*缓存模块*/
    //缓存框架 - 内存篇
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
                // 循环数组元素
                if (item.key.trim() == key) {
                    this.data.splice(i, 1);//开始位置,删除个数
                    status = true;
                    break;
                }
            }
            return status;
        },
        update:function(key,value){
            var status = false;
            // 循环数组元素
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
//cookie框架
    zit.extend(zit,{
        //设置coolie
        setCookie: function (name,value,days,path){
            var name = escape(name);
            var value = escape(value);
            var expires = new Date();
            expires.setTime(expires.getTime() + days*24*60*60*1000);
            path = path == "" ? "" : ";path=" + path;
            _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
            document.cookie = name + "=" + value + _expires + path;
        },
        //获取cookie值
        getCookie:function (name){
            var name = escape(name);
            //读cookie属性，这将返回文档的所有cookie
            var allcookies = document.cookie;

            //查找名为name的cookie的开始位置
            name += "=";
            var pos = allcookies.indexOf(name);
            //如果找到了具有该名字的cookie，那么提取并使用它的值
            if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
                var start = pos + name.length;                  //cookie值开始的位置
                var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
                if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
                var value = allcookies.substring(start,end);  //提取cookie的值
                return unescape(value);                           //对它解码
            }
            else return "";                                             //搜索失败，返回空字符串
        },
        //删除cookie
        deleteCookie:function (name,path){
            var name = escape(name);
            var expires = new Date(0);
            path = path == "" ? "" : ";path=" + path;
            document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
        }
    });
//本地存储框架
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
    /*运动进程计算*/
    zit.extend(zit,{
        //  计算运动的时间进程
        gettween:function(now,pass,all){
            var yongshi = pass-now;
            var jincheng =yongshi/all;
            return jincheng;
        },
        //运动控制，用于计时器
        move:function() {
            //动画停止的条件
            if(tween>=1) {
                clearInterval(timer);
            }else {
                pass = +new Date();
                tween = zit.gettween(now,pass,5000)
                step = 400*tween;
                div.style.left= step+'px';
            }
        },
        //考虑运动物体的起始位置
        oneposition:function(dom,name,start,tween,juli){
            dom.style[name]=(start+tween*juli)+"px";
        },
        //总动画
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
            /*使用贝加尔曲线*/
            function getTween2(now,pass,duration,ease){
                var eases = {
                    //线性匀速
                    linear:function (t, b, c, d){
                        return (c - b) * (t/ d);
                    },
                    //弹性运动
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
                    //其他
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
                }  //贝加尔曲线内容
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
        //总动画2   json多属性应用
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
    /*动画模块 我的模仿版本*/
    function Animate(){
        this.timer;
        this.interval=16
        this.queen=[];
    };
    Animate.prototype={
        //用户使用方法
        //公共
        add:function(id,json,duration){
            this._adapterMany(id,json,duration)
            this._run()
        },
        //私有
        //动画刷新定时器
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
        //样式对象转换  适配器
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
        //不断刷新
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
        //获得动画进程
        _gettween:function(now,pass,shijian,ease){
            var eases = {
                //线性匀速
                linear:function (t, b, c, d){
                    return (c - b) * (t/ d);
                },
                //弹性运动
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
                //其他
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
        //定时器停止
        _stop:function(id,styles){
            _manyproperty(id,styles,1)
            clearInterval(this.timer);
        },
        //设置json中的多种属性
        _manyproperty:function(id,styles,tween){
            var that=this;
            for(var i=0;i<styles.length;i++){
                that._oneproperty(id,styles[i].property,styles[i].start,styles[i].juli,tween);
            }
        },
        //设置单个属性
        _oneproperty:function(id,name,start,juli,tween){
            if(name=="opacity"){
                zit.css(id,name,start+juli*tween);
            }else{
                zit.css(id,name,(start+juli*tween)+"px")
            }
        },
        //变量回收、释放内存
        _destory:function(){}
    };
    zit.animate=new Animate();
    /*动画模块2   视频版本*/
    function Animate2() {

        //一般再编写框架的时候都会定义一个配置对象保存控制动画的一些值，允许用户自定义
        //我们首先定义好默认值
        this.config={
            interval:16,
            ease:'linear',
        }

        this.timer =0;
        //定义一个index统计每次添加的对象编号 第一个为0
        this.index=-1;
        //动画对象
        //我们定义一个对象来保存运动中我们需要的数据，比如now，pass等
        this._obj={};
        //我们使用数组来保存每个每个物体的运动数据
        this._queen=[]
        //调用初始化函数
        this._init();
    }
    Animate2.prototype ={


        /* ------------------------------------------------
         *公共部门
         *放置其他部门都会使用的公共方法属性
         *-------------------------------------------------*/
        eases:{
            //线性匀速
            linear:function (t, b, c, d){
                return (c - b) * (t/ d);
            },
            //弹性运动
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
            //其他
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
        //获取时间进程
        _getTween:function (now,pass,duration,ease){
            var yongshi = pass -now;
            //复习字面量的两种访问方式
            return this.eases[ease](yongshi,0,1,duration);
        },
        //初始化执行的代码一般放在init里面，一般是构造函数调用
        _init:function(){},

        /*新的技术*/
        getAnimationFrame:function(){
            var lastTime = 0;
            var prefixes = 'webkit moz ms o'.split(' '); //各浏览器前缀

            var requestAnimationFrame = window.requestAnimationFrame;
            var cancelAnimationFrame = window.cancelAnimationFrame;

            var prefix;
            //通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
            for( var i = 0; i < prefixes.length; i++ ) {
                if ( requestAnimationFrame && cancelAnimationFrame ) {
                    break;
                }
                prefix = prefixes[i];
                requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
                cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
            }

            //如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
            if ( !requestAnimationFrame || !cancelAnimationFrame ) {
                requestAnimationFrame = function( callback, element ) {
                    var currTime = new Date().getTime();
                    //为了使setTimteout的尽可能的接近每秒60帧的效果
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

            //得到兼容各浏览器的API
            return {
                requestAnimationFrame : requestAnimationFrame,
                cancelAnimationFrame : cancelAnimationFrame
            }

        },

        /* ------------------------------------------------
         *运行部 老大:run
         *部门职责描述: 根据添加进来的元素属性创建动画,并运行起来
         *-------------------------------------------------*/
        //运行部老大
        _run:function(){
            var that = this;

            //run函数其实就是个循环
            that.timer = setInterval(function(){that._loop();}, that.config.interval);
        },
        //我们新增一个loop以此针对每个物体做运动 --其实就是遍历每个对象，然后依次执行move方法
        _loop:function(){
            for(var i= 0,len=this._queen.length;i<len;i++){
                this._move(this._queen[i])
            }
        },
        //单个物体运动方法
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
        //动画执行结束后的回调函数
        _callBack:function(){},



        /* ------------------------------------------------
         *添加部  -- add
         *部门职责描述: 添加元素 以及确定我要对哪个属性做动画
         *-------------------------------------------------*/
        //部门老大 - 添加
        addOld:function(id,json,duration,callback) {
            //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
            //我们先宏观规划add函数的接口 --注释法
            this._apdapter(id,json,duration,callback)
            this._run();
        },
        add:function() {
            try{
                //add方法做两件事情：适配器，运行动画，只要用户调用add方法，整个动画能够运行起来
                //我们先宏观规划add函数的接口 --注释法
                var options = arguments
                var id = options[0]
                var json = options[1]
                var duration = options[2]
                var callback = options[3]

                console.log(duration)

                //添加默认值
                if(!duration) {
                    duration=2000;
                }else {
                    if($$.isString(duration)){
                        switch (duration) {
                            case 'slow' :
                            case '慢' :
                                duration = 8000;
                                break;
                            case 'normal' :
                            case '普通' :
                                duration = 4000;
                                break;
                            case 'fast' :
                            case '快' :
                                duration = 2000;
                                break;
                        }
                    }else{
                    }
                }
                this._apdapter(id,json,duration,callback)
                this._run();
            }catch(e){
                alert('代码出错,系统出错提示：'+'\n'+ e.message+'\n'+ e.name);
            }

        },
        //适配器 --单一职责原则
        //我们继续完善适配器 -- 这样运行部需要的数据基本都保存在_obj中了
        _apdapter:function (id,source,duration,callback){
            var _obj={}
            this.index++;
            _obj.index=this.index;
            /*数据类型判断的重要性*/
            _obj.dom = $$.isString(id)?$$.$id(id):id
            _obj.duration = duration
            _obj.now = +new Date()
            _obj.callback =callback;

            var target=[];
            for(var item in source){
                var json={};
                //元素属性的起始位置 比如目标元素目前left 100px，希望运动到500px，那么100就是起始位置
                json.start = parseFloat($$.css(_obj.dom,item))
                json.juli = parseFloat(source[item]) - json.start;
                json.property = item
                target.push(json)
            }
            _obj.styles = target;
            this._queen.push(_obj)
        },




        /* ------------------------------------------------
         *公共API -- 学习什么是公共API
         *提供给使用框架的人，使用框架的人一般只需要这样
         *-------------------------------------------------*/
        //开始动画
        begin:function() {},
        //停止动画
        stop:function() {},
        //自定义动画的配置
        setConfig:function(json){
            //如何允许用户控制动画
            var that = this;
            $$.extend(this.config,json)
        },

        /* ------------------------------------------------
         *后勤部
         *部门职责描述: 辅助运行动画  比如清除 比如内存回收
         *-------------------------------------------------*/
        _destroy:function(obj) {
            var that = this;
            //内存优化
            //1 释放队列  -- 数组实现的  -- 就是删除数组
            //哪个物体执行完，我就释放哪个物体所占用的内存
            that._queen.splice(obj.index,1);
            //2 释放对象的属性和方法
            for(var i in obj) {
                delete obj[i];
            }
            //3 释放对象所占用的内存
            obj = null;
        }

    };
    zit.animate2 = new Animate2()
    w.zit=zit;
})(window);