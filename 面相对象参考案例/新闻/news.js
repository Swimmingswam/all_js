/**
 * Created by hui on 2015/12/9.
 */
function News(){
    this.title=''
    this.author=''
    this.date=''
    this.source=''
    this.content=''
}

News.prototype={
    binddom:function(){
        var domtitle = document.getElementById('domtitle')
        console.log(domtitle)
        var author = document.getElementById('author')
        var date = document.getElementById('date')
        var source = document.getElementById('source')
        var content = document.getElementById('content')
        domtitle.innerHTML=news.title;
        author.innerHTML=news.author;
        date.innerHTML=news.date;
        source.innerHTML=news.source;
        content.innerHTML=news.content;
    }
}

var news = new News()
news.title='大中城市多数中低收入者付完房租仅够温饱'
news.author='王书奎'
news.date='2015-12-09 09:19:25'
news.source='传智播客'
news.content=' <p>大中城市房价高企，让中低收入者纷纷感叹“买不起房”，继而转变观念去租房。而现在，越来越多的租房者发现，租房贵、租房难的问题与高高在上的房价相比丝毫不“逊色”，逐渐演变成“买不起也租不起”。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'
news.content+='<p>　　随着今年毕业季来临，北上广等一线城市的租房需求量又将出现“井喷”状态。房租会不会越涨越高？与收入、房价相比，房租有没有一个相对合理的区间？稳定房租难不难？记者进行了探访。</p>'

news.binddom();
/*var domtitle = document.getElementById('domtitle')
console.log(domtitle)
var author = document.getElementById('author')
var date = document.getElementById('date')
var source = document.getElementById('source')
var content = document.getElementById('content')


domtitle.innerHTML=news.title;
author.innerHTML=news.author;
date.innerHTML=news.date;
source.innerHTML=news.source;
content.innerHTML=news.content;*/





