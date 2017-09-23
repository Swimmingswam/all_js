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
    //׼�������ļ�
    if(piano.isMSIE){
        //�����IE�������ʹ��mp3��ʽ
        piano.sound = piano.mp3Sound;
    }else{
        piano.sound = piano.oggSound;
    }
    //�󶨵���¼�
    if(document.addEventListener){
        for(var i = piano.START_NOTE_NUMBER; i <= piano.END_NOTE_NUMBER; i ++){
            setKeyEventListener(i);
        }
    }else if(document.attachEvent){
        for(var i = piano.START_NOTE_NUMBER; i <= piano.END_NOTE_NUMBER; i ++){
            setKeyAttachEvent(i);
        }
    }
    //���������ļ�
    function loadSoundFile(noteNumber, fileType){
        var soundId = 'sound' + noteNumber;

        if(piano.sound){
            piano.sound[soundId] = new Audio('sound/' + noteNumber + '.' + fileType);
        }
    }

    //�趨���ټ��ĵ���¼�(EventListener��)
    function setKeyEventListener(noteNumber){
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        if(key){
            key.addEventListener('click', keyClick, false);
        }
    }

    //�趨���ټ��ĵ���¼�(AttachEvent��)
    function setKeyAttachEvent(noteNumber){
        var keyId = 'key' + noteNumber;
        var key = document.getElementById(keyId);
        if(key){
            key.attachEvent('onclick', keyClick);
        }
    }
    //���¸��ټ�ʱ
    function keyClick(){
        var that = this;
        var noteNumber = that.id.replace('key','');
        playSound(noteNumber);
    }
    //ָ������������
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

    //����ԭ���ĸ��ټ���ɫ
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
                    key.style.backgroundColor = '#eee';   //���ذ׼�������ʽ
                    break;
                case 1:
                case 3:
                case 6:
                case 8:
                case 10:
                    key.style.backgroundColor = '#666';  //���غڼ�������ʽ
                    break;
                default:
                    break;
            }
        }
    }
})
