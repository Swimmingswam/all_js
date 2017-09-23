/**
 * Created by acer on 2017/7/23.
 */
var i=0;

function timedCount()
{
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();
//重要的部分是 postMessage() 方法 - 它用于向 HTML 页面传回一段消息