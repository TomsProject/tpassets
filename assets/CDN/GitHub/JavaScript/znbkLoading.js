var znbkLoading = (function () {  
    //左向右滚动，水涨船高动效
    function _givePaper(id){
        var thisDiv = document.getElementById(id)
        thisDiv.className="sbw";
        thisDiv.innerHTML='<div class="zhezhao"></div><div class="loading-2 wave wave-2 l0"><div class="loading-2-text logad_text0"></div></div><div class="loading-2 wave wave-2 l1"><div class="loading-2-text logad_text1"></div></div><div class="loading-2 wave wave-2 l2"><div class="loading-2-text logad_text2"></div></div><div class="loading-2 wave wave-2 l3"><div class="loading-2-text logad_text3"></div></div>';
    }
    //呼吸动效
    function _searchPaper(id){
        var thisDiv = document.getElementById(id);
        thisDiv.className="hxd";
        thisDiv.innerHTML = "<div class='hxd-img'></div>";
    }
    //三个点的动画
    function _pont(id){
        var thisDiv = document.getElementById(id);
        thisDiv.className="pont";
        thisDiv.innerHTML = "<div class='typing_loader'></div>";
    }
    //抽题进度条
    function _drawPaper(id,speed,width){
        var speedInt = 100;//默认速度
        if(speed=='fast'){
            speedInt=20;
        }else if(speed=='medium'){
            speedInt=100;
        }else if(speed=='slow'){
            speedInt=500;
        }
        var maxWidth = width || 400;
        var thisDiv = document.getElementById(id);
        thisDiv.style.width = maxWidth + 'px';
        thisDiv.className="draw_jdt_box";
        thisDiv.innerHTML = "<span class='draw_jdt_inner' id='"+id+"_jdtinner'></span>";
        var JDT = document.getElementById(id+'_jdtinner');
        var JDTI = document.getElementById(id);
        var LOI = document.getElementById("radar");
        var i=0;
        var timer = setInterval(function(){
            if(document.readyState!="complete")
            {
                if(i >= 70)
                {
                    if(document.readyState=="complete"){//complete加载完成
                        JDT.style.width = '100%';
                        JDTI.style.display = 'none';
                        LOI.style.display = 'none';
                        clearInterval(timer);
                    }
                }
                else
                {
                    i++;
                    JDT.style.width = i + '%';
                }
            }
            if(i == 100){
                JDTI.style.display = 'none';
                LOI.style.display = 'none';
                clearInterval(timer);
            }
            if(document.readyState=="complete"){//complete加载完成
                JDT.style.width = '100%';
                JDTI.style.display = 'none';
                LOI.style.display = 'none';
                clearInterval(timer);
            }
        },speedInt); 
    }
    //抽题扫描雷达图
    function _radarPaper(id) {  
        var thisDiv = document.getElementById(id);
        thisDiv.className="radar";
        //thisDiv.innerHTML = "";
        $(function(){
            function getmatrix(a,b,c,d,e,f){
                var aa=Math.round(180*Math.asin(a)/ Math.PI);
                var bb=Math.round(180*Math.acos(b)/ Math.PI);
                var cc=Math.round(180*Math.asin(c)/ Math.PI);
                var dd=Math.round(180*Math.acos(d)/ Math.PI);
                var deg=0;
                if(aa==bb||-aa==bb){
                    deg=dd;
                }else if(-aa+bb==180){
                    deg=180+cc;
                }else if(aa+bb==180){
                    deg=360-cc||360-dd;
                }
                return deg>=360?0:deg;
        
            }
            var obj=$('.shan');
            var stopyou = setInterval(function(){
                if(thisDiv.style.display == 'none')
                {
                    clearInterval(stopyou);
                }
                var deg=eval('get'+obj.css('transform'));//构造getmatrix函数,返回上次旋转度数
                var step=45;
                obj.css({'transform':'rotate('+(deg+step)%360+'deg)'});
                var dd = obj.css({'transform':'rotate('+(deg+step)%360+'deg)'});
                //上
                if(deg>300&&deg<360 ||deg>0 &&deg<40){
                    $('.topcircle').addClass('active');
                    $('.rightcircle').removeClass('active');
                    $('.leftcircle').removeClass('active');
                    // 右
                }else if(deg>50 && deg<80){
                    $('.rightcircle').addClass('active');
                    $('.leftcircle').removeClass('active');
                    $('.topcircle').removeClass('active');
                    // 左
                }else if(deg>180 && deg<240){
                    $('.leftcircle').addClass('active');
                    $('.rightcircle').removeClass('active');
                    $('.topcircle').removeClass('active');
                }
            },100);
        });
    }
    return {
        givePaper: _givePaper,
        searchPaper:_searchPaper,
        pont:_pont,
        drawPaper:_drawPaper,
        radarPaper:_radarPaper
    };
})();