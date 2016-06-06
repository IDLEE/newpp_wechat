require("./loading.scss");
var loadingTemplate = require("./loading.html");
var config = {};
var defaultConfig = function(){
    return{
        title:"",//标题
        text:"",//弹窗内容,
        dialogType:"loading"
    }
}
var ppLoading = function(opt,callback){
    init(opt);
    var $html = $(loadingTemplate(config));
    $("body").append($html);
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
    $("#"+id).remove();
}
var hideAllDialog = function(){
    $(".pp-dialog[data-type='loading']").remove();
}
var init = function(opt){
    config = defaultConfig();
    setConfig(opt);
    config.id = "pp_dialog_"+new Date().getTime();
    hideAllDialog();
}
//dialog事件处理
var bindEvent = function($html,callback){
    if(config.allowOutsideClick){
        $html.find(".pp-mask").bind("click",function(){
            hideDialog(config.id);
        })
    }
}
module.exports = ppLoading;
module.exports.close = hideAllDialog;