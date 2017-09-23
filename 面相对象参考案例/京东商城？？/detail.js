/**
 * Created by acer on 2017/8/19.
 */
var jian=document.getElementsByClassName('listLeft')[0];
var shu=document.getElementsByClassName('listNum')[0];
var jia=document.getElementsByClassName('listRight')[0];
    jian.shu = shu;
    jia.shu = shu;
    jia.jian = jian;
    jian.onclick = function () {
        var n = parseInt(this.shu.innerHTML)
        if (n > 1) {
            n--;
        }
        this.shu.innerHTML = n;
    };
    jia.onclick = function () {
        var n = parseInt(this.shu.innerHTML)
        n++;
        this.shu.innerHTML = n;
    }
var listbox=document.getElementsByClassName("listBox");
for(var i=0;i<listbox.length;i++){
    listbox[i].addEventListener("click",function(){
            $(this).siblings().removeClass("listCurrent");
            $(this).addClass("listCurrent");
    }
    )
}

