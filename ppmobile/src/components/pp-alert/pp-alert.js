require("./pp-alert.scss");
var alertTemplate = require("./pp-alert.html");
var config = {};
var defaultConfig = function(){
    return{
        title:"",//标题
        text:"",//弹窗内容,
        type:"",//弹窗类型
        allowOutsideClick:false,
        cancelButtonText:"取消",
        confirmButtonText:"确定",
        showCancelButton:true,
        dialogType:"alert"
    }
}
var ppAlert = function(opt,callback){
    init(opt);
    var $html = $(alertTemplate(config));
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
    $(".pp-dialog[data-type='alert']").remove();
}
var init = function(opt){
    config = defaultConfig();
    setConfig(opt);
    config.id = "pp_alert_"+new Date().getTime();
    hideAllDialog();
}
//dialog事件处理
var bindEvent = function($html,callback){
    $html.find(".pp-modal-btn").each(function(){
        var me = this;
        pp.click(this,function(){
            var actionName = $(me).data("action");
            switch (actionName) {
                case "cancel":
                    if (!!callback) {
                        callback(false);
                    } else {
                        hideDialog(config.id);
                    }
                    break;
                case "confirm":
                    if (!!callback) {
                        callback(true);
                    } else {
                        hideDialog(config.id);
                    }
                    break;
            }
        });
    });
    if(config.allowOutsideClick){
        pp.click($html.find(".pp-mask")[0],function(){
            hideDialog(config.id);
        });
        //$html.find(".pp-mask").bind("click",function(){
        //
        //})
    }
}
module.exports = ppAlert;
module.exports.close = hideAllDialog;