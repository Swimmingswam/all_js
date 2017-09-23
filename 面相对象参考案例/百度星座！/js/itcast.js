/**
 * 作者：传智播客教育集团
 * 开发日期：2015/12/25
 * 描述：通用框架
 * 版权所有 违者必究
 */

//定义一个对象 - 名字是$
var $$ = function() {};
//第二种写法
$$.prototype = {
    //选择器
    //id选择器
    $id:function(id){
        return document.getElementById(id)
    },
    //class选择器
    $class:function(classname){
        return document.getElementsByClassName(classname)
    },
    //tag选择器
    $tag:function(tag){
        return document.getElementsByTagName(tag)
    },

    //去空格
    //去除左边空格
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

    //模板运用
    //arttemplate语法
    bindTemplate:function (tempalteId,data){
        var html = template(tempalteId, data);
        return html;
    },
    artTemplate:function (str,data){
        var render = template.compile(str);
        return render(data)
    },


    //简单的数据绑定formateString
    formateString:function(str, data){
        return str.replace(/@\((\w+)\)/g, function(match, key){
            return typeof data[key] === "undefined" ? '' : data[key]});
    },

    //扩充拷贝
    //给一个对象扩充功能
    extend:function (target,source) {
        //遍历对象
        for(var i in source){
            target[i] = source[i];
        }
        return target;
    },
    //给一个对象扩充多个对象的功能
    extendMany:function () {
        var key,i = 0,len = arguments.length,target = null,copy;
        if(len === 0){
            return;
        }else if(len === 1){   //传入参数仅是一个target时
            target = this;
        }else{   //传入参数是一个target，后面的全是拷贝对象时
            i++;     //参数中拷贝对象的index值
            target = arguments[0];  //参数第一个：target
        }
        for(; i < len; i++){     //遍历len-1个拷贝对象
            for(key in arguments[i]){   //遍历每个拷贝对象内的所有key属性
                copy = arguments[i][key];   //每个拷贝对象的属性赋值给copy空对象
                target[key] = copy;  //把每次拷贝完成后的copy对象的内容返回给相应的target内容
            }
        }
        return target;    //最终得到拷贝完整所有拷贝对象属性的target
    },


    //在（begin，end）范围内获取随机数
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },


    /*获取页面传递过来的参数*/
    simpleQuery:function (){
        var params= window.location.search;//params:   ?id,date
        var arr = params.substring(1).split(",");   //去掉？，得到id，date等属性的数组
        return arr;
    },
    querystring: function(){    //获取URL查询字符串参数值的通用函数
        var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//  以&符号为界把查询字符串分割成数组，即“[id=1，name=location]”
        var json = {};//定义一个临时对象
        for(var i=0;i<arr.length;i++)//遍历数组
        {
            var c = arr[i].indexOf("=");//获取每个参数中=的index的值
            if(c==-1) continue;//如果没有发现测跳到下一次循环继续操作
            var d = arr[i].substring(0,c);//截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c+1);//截取等号后的参数值，1和location
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象  {id:1,name:location}
    }

}
//在框架中实例化，这样外面使用的使用就不用实例化了
//引用时就可以直接使用$$对象内的方法
//例如：  $$.$id(id);
$$ = new $$();

