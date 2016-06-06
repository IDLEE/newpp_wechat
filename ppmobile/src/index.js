var ppAlert = require("./components/pp-alert/pp-alert");
var ppMask= require("./components/pp-mask/pp-mask");
var ppLoading= require("./components/pp-loading/index");
//var ppTips= require("./components/pp-tips/index");

var click = function(dom,callback){
    var clickTime = 1500,offset = 20;
    var now = new Date().getTime();
    var end = new Date().getTime();
    var x = 0,y = 0,moveX = 0,moveY = 0;
    if(!!dom){
        dom.addEventListener("touchstart",function(e){
            x = moveX = e.touches[0].pageX;
            y = moveY = e.touches[0].pageY;
            now  = new Date().getTime();
        });
        dom.addEventListener("touchmove",function(e){
            moveX = e.touches[0].pageX;
            moveY = e.touches[0].pageY;
        });
        dom.addEventListener("touchend",function(e){
            end = new Date().getTime();
            if(end - now < clickTime && Math.abs(x-moveX) <= offset && Math.abs(y-moveY) <= offset){
                //console.log("click")
                !!callback && callback(e)
            }
        });
    }else{
        return;
    }
};
module.exports = {
    revision:"1.0.0",
    alert:ppAlert,
    mask:ppMask,
    loading:ppLoading,
    closeAllDialog:function(){
        $(".pp-dialog").remove();
    },
    click:click
}