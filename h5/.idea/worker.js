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
//��Ҫ�Ĳ����� postMessage() ���� - �������� HTML ҳ�洫��һ����Ϣ