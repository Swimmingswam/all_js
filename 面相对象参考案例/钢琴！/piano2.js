/**
 * Created by acer on 2017/8/15.
 */
var piano={
    isMSIE :false,
    START_NOTE_NUMBER :60,
    END_NOTE_NUMBER : 72,
    OFFSET :[0,40,60,105,120, 180,220,240,282,300,345,360]
}
$(document).ready(function(){
    //准备声音文件
    if(piano.isMSIE){
        //如果是IE浏览器则使用mp3格式
        piano.sound = piano.mp3Sound;
    }else{
        piano.sound = piano.oggSound;
    }
    //绑定点击事件
    if(document.addEventListener){
        for(var i = piano.START_NOTE_NUMBER; i <= piano.END_NOTE_NUMBER; i ++){
            setKeyEventListener(i);
        }
    }else if(document.attachEvent){
        for(var i = piano.START_NOTE_NUMBER; i <= piano.END_NOTE_NUMBER; i ++){
            setKeyAttachEvent(i);
        }
    }
    //设置声音文件
    function loadSoundFile(noteNumber, fileType){
        var soundId = 'sound' + noteNumber;

        if(piano.sound){
            piano.sound[soundId] = new Audio('sound/' + noteNumber + '.' + fileType);
        }
    }

    //设定钢琴键的点击事件(EventListener版)
    function setKeyEventListener(noteNumber){
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        if(key){
            key.addEventListener('click', keyClick, false);
        }
    }

    //设定钢琴键的点击事件(AttachEvent版)
    function setKeyAttachEvent(noteNumber){
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        if(key){
            key.attachEvent('onclick', keyClick);
        }
    }
    //按下钢琴键时
    function keyClick(){
        var that = this;
        var noteNumber = that.id.replace('key','');
        playSound(noteNumber);
    }
    //指定发出的声音
    function playSound(noteNumber){
        var soundId = 'sound' + noteNumber;
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        var audio = null;

        if(piano.sound){
            if(piano.sound[soundId]){
                audio = new Audio(piano.sound[soundId]);
                audio.play();
            }
        }
        if(key){
            key.style.backgroundColor = '#9cf';
            setTimeout('setOriginColor(' + noteNumber + ')', 100);
        }
    }

    //返回原来的钢琴键颜色
    function setOriginColor(noteNumber){
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        var offset = noteNumber % 12;
        if(key){
            switch(offset){
                case 0:
                case 2:
                case 4:
                case 5:
                case 7:
                case 9:
                case 11:
                    key.style.backgroundColor = '#eee';   //返回白键背景样式
                    break;
                case 1:
                case 3:
                case 6:
                case 8:
                case 10:
                    key.style.backgroundColor = '#666';  //返回黑键背景样式
                    break;
                default:
                    break;
            }
        }
    }
})
