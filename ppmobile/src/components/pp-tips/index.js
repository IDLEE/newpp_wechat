require("./pp-tips.scss");
var template = require("./pp-tips.html");
var config = {};
var defaultConfig = function(){
    return{
        text:"",
        type:"",
        dialogType:"tips"
    }
}
var ppTips = function(opt,callback){
    init(opt);
    var $html = $(template(config));
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
    $(".pp-dialog[data-type='tips']").remove();
}
var init = function(opt){
    config = defaultConfig();
    setConfig(opt);
    config.id = "pp_tips_"+new Date().getTime();
    hideAllDialog();
}
//dialog事件处理
var bindEvent = function($html,callback){
}
module.exports = ppTips;
module.exports.close = hideAllDialog;