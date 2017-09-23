/**
 * Created by zhousg on 2015/11/9.
 */
(function(w){
    w.itcast = {};

    itcast.bind = function(event, el ,func){
        if(event){
            var events = event.split(' ');
            for(i = 0 ; i < events.length ; i ++){
                if(el){
                    el.addEventListener(events[i],function(e){
                        func && func(e);
                    })
                }
            }
        }
    };

    itcast.swipe = function(el,func){
        var touch = {
            startX:0,
            startY:0,
            endX:0,
            endY:0
        }
        var timer,isSwipe;
        itcast.bind('touchstart',el,function(e){
            touch.startX = e.touches[0].clientX;
            touch.startY = e.touches[0].clientY;
        });
        itcast.bind('touchmove',el,function(e){
            touch.endX = e.touches[0].clientX;
            touch.endY = e.touches[0].clientY;
            if(touch.endX && Math.abs(touch.endX-touch.startX)>30 ||
                touch.endY && Math.abs(touch.endY-touch.startY)>30){
                isSwipe = true;
            }else{
                isSwipe = false;
            }
        });
        itcast.bind('touchend',el,function(e){
            if(timer)clearTimeout(timer);
            timer = setTimeout(function(){
                if(isSwipe){
                    isSwipe = false;
                    func && func(e);
                }
            },100);
        });
        w.onscroll = function(){
            isSwipe = false;
            if(timer)clearTimeout(timer);
        };
    };
})(window);
