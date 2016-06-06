require("./pp-mask.scss")
var alertTemplate = require("./pp-mask.html");
var config = {};
var animationTime = 800;
var defaultConfig = function(){
    return{
        title:"",//标题
        text:"",//弹窗内容,
        dialogType:"mask"
    }
}
var ppMask = function(opt,callback){
    init(opt);
    var $html = $(alertTemplate(config));
    $("body").append($html);
    setTimeout(function(){
        $html.find("[data-action='close']").show();
    },animationTime);
    //bindevent
    bindEvent($html,callback);
}
//重置config
var setConfig = function(c){
    for(var key in c){
        config[key] = c[key];
    }
}
var hideDialog = function(id){
    $("#"+id).find(".pp-mask").removeClass("pp-mask-transition-in").addClass("pp-mask-transition-out");
    setTimeout(function(){
        $("#"+id).remove();
    },animationTime);

}
var hideAllDialog = function(){
    $(".pp-dialog[data-type='mask']").remove();
}
var init = function(opt){
    config = defaultConfig();
    setConfig(opt);
    config.id = "pp_dialog_"+new Date().getTime();
    hideAllDialog();
}
//dialog事件处理
var bindEvent = function($html,callback){
    pp.click($html.find("[data-action='close']")[0],function(){
        hideDialog(config.id);
    });
    //$html.find("[data-action='close']").bind("click",function(){
    //    hideDialog(config.id);
    //});
}
module.exports = ppMask;
module.exports.close = hideAllDialog;