
    //get选择器
    /*function get(selector,context,results){
        results=results||[];
        var rquickexpr=/^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
                m= rquickexpr.exec(selector);
        if(m){
            if(m[1]){
                results=getid(m[1],results);
            }else if(m[2]){
                results=getclass(m[2],context,results);
            }else if(m[3]){
                results=gettag(m[3],context,results);
            }else if(m[4]){
                results=gettag(m[4],context,results);
            }
        }
        return results;
    }*/
    function get(selector,context,results){
        results=results||[];
        context=context||document;
        var rquickexpr=/^(?:#([\w-]+)|\.([\w-]+)|([\w]+)|(\*))$/,
            m= rquickexpr.exec(selector);
        if(m){
            if(context.nodeType){
                context=[context];
            }
            if(typeof context=="string"){
                context=get(context);
            }
            each(context,function(i,v){
                if(m[1]){
                    results=getid(m[1],results);
                }
                else if(m[2]){
                    results=getclass(m[2],this,results);
                }
                else if(m[3]){
                    results=gettag(m[3],this,results);
                }else if(m[4]){
                    results=gettag(m[4],this,results);
                }
            })
        }
        return results;
    }
    //push在ie中的兼容问题
    function mypush(target,els){
        var j=target.length,
            i=0;
        while((target[j++]=els[i++])){}
        target.length=j-1;
    }
    //id选择器
    function getid(id,results){
        results=results||[];
        results.push(document.getElementById(id));
        return results;
    };
    //class选择器
    /*var getclass=function(classname,context,results){
        results=results||[];
        context=context||document;
        if(document.getElementsByClassName){
            results.push.apply(results,context.getElementsByClassName(classname));
        }else{
            each(gettag("*",context),function(i,v){
                if((" "+ v.className+" ").indexOf(" "+classname+" ")!=-1){
                    results.push(v);
                }
            })

        }
        return results;
    }*/
    function getclass(classname,context,results){
        results=results||[];
        //context=context||document;
        if(document.getElementsByClassName){
            results.push.apply(results,context.getElementsByClassName(classname));
        }else{
            each(gettag("*",context),function(i,v){
                if((""+ v.className+"").indexOf(""+classname+"")!=-1){
                    results.push(v);
                }
            })
        }
        return results;
    }
    //tag选择器
    /*function gettag(tag,context,results){
        results=results||[];
        context=context||document;
        results.push.apply(results,context.getElementsByTagName(tag));
        return results;
    };*/
    function gettag(tag,context,results){
        results=results||[];
        try{
            results.push.apply(results,context.getElementsByTagName(tag));
        }catch(e){
            mypush(results,context.getElementsByTagName(tag));
        }
        return results;
    }
    //ecah循环
    function each(arr,fn){
        for(var i=0;i<arr.length;i++){
            if(fn.call(arr[i],i,arr[i])===false){
                break;
            }
        }
    }