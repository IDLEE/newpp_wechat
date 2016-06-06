//下拉iscroll封装
function PPIScroll(opts) {
    var defaults = {
        mouseWheel: false,
        probeType: 3
    };
    var options = $.extend(defaults, opts);
    var myScroll = new IScroll(options.elem, options);
    var pageCouponIndex = 1;
    var isrefresh = false;
    var isload = false;

    function rotate(deg) {
        setCss3Style($(options.elem).find('.refresh').get(0), 'transform', 'rotate(' + deg * 20 + 'deg)');
        setCss3Style($(options.elem).find('.reload').get(0), 'transform', 'rotate(' + deg * 20 + 'deg)');
    }
    $(options.elem).prepend('<i class="refresh iconfont">&#xe61a;</i>')
    .append('<i class="reload iconfont">&#xe61a;</i>');
    myScroll.on("scroll", function () {
        if (!isrefresh) {
            if (this.y > 50) {
                isrefresh = true;
            }
        }
        if (!isload) {
            if (this.y - this.wrapperHeight + this.scrollerHeight < -50) {
                isload = true;
            }
        }
        rotate(this.y);
    });

    myScroll.on("scrollEnd", function () {
        if (isrefresh) {
            window.location.reload()
        }
        //Array.prototype.join.call(arguments,',')
        if (isload) {
            pageCouponIndex++;
            options.callback && options.callback(pageCouponIndex, myScroll);
            isload = false;
        }
    });
    return myScroll;
}

//css3
function setCss3Style(obj, name, value) {
    var str = name.charAt(0).toUpperCase() + name.substring(1);
    obj.style['Webkit' + str] = value;
    obj.style['Moz' + str] = value;
    obj.style['ms' + str] = value;
    obj.style['O' + str] = value;
    obj.style.name = value;
};

/**
 * tab选项卡
 * @anotherdate 2015-07-23T17:26:32+0800
 * @author yeyeye0525
* eg: 
 */
(function ($) {
    $.fn.pptab = function (options) {
        $.each(this, function () {
            var _event = $(this).hasClass("z-hover") ? "mouseover" : "click";
            var _this = $(this);
            $(this).find(".tab-nav>li").on(
            "click", function () {
                if ($(_this).attr("data-ignore")) {
                    return;
                }
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                _this.find(".tab-item").removeClass("active").eq($(this).index()).addClass("active");
            });
        });
    };
})(Zepto);

/**
 * tips提示
 * @anotherdate 2015-07-23T17:26:32+0800
 * @author yeyeye0525
* eg: <div class="wx-btn btn-invest" data-js="invest" data-arrow="down" data-content="需使用续投券才能投资" data-append="true">立即投资</div>
 */
(function ($) {
    $.fn.pptips = function (options) {
        //var options = options || {};
        $.each(this, function () {
            var style = '';
            //暂时支持上下方向
            var arrows = {"down":"top","up":"bottom","left":"left","right":"right"};
            var _arrow = options.arrow || $(this).attr("data-arrow");
            var _content = options.content || $(this).attr("data-content");
            var flag = arrows[_arrow] == "top" ? 1 : -1;
            var html = '<div class="wx-tips-box">\
                        <div class="wx-tips-arrow wx-tips-arrow'+ _arrow +'"></div>\
                        <div class="wx-tips-content">\
                            '+ _content +'\
                        </div>\
                    </div>';
            if(options.append || $(this).attr("data-append") === "true"){
                //插入到当前元素
                var $popup = $(html).appendTo($(this));
                style = 'left:' + ($(this).width()/2) + 'px;'+arrows[_arrow]+':' 
                    + (-$popup.height()-20)+'px;';
            }else{
                //插入到body
                var $popup = $(html).appendTo(document.body);
                style = 'left:' + ($(this).offset().left + $(this).width()/2) + 'px;top:' 
                    + ($(this).offset().top-flag*($popup.height()+20))+'px;';
            }
            $popup.attr("style",style);
        });
    };
    Number.prototype.toMyFixed = function () {
        var bb = this + '';
        var dot = bb.indexOf('.');
        var result = '';
        if (dot == -1) {
            result = parseFloat(bb).toFixed(2);
        } else {
            var cc = bb.substring(dot + 1, bb.length);
            if (cc.length >= 3) {
                console.log(bb.substring(0, dot));
                console.log(cc.substring(0, 2));
                result = bb.substring(0, dot + 1) + cc.substring(0, 2);
            } else {
                result = parseFloat(bb).toFixed(2);
            }
        }
        return parseFloat(result).toFixed(2);
    }
    /**
     * [toMoneyFixed 格式化money]
     * @anotherdate 2015-04-09T11:34:36+0800
     * @author huangzhen
     * @param       {[type]}                 s [description]
     * @param       {[type]}                 n [description]
     * @return      {[type]}                   [description]
     */
    $.fn.toMoneyFixed = function (s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toMyFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
		r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) < l.length && l[i + 1] != '-' ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
})(Zepto);

/**
 * 公共方法入口
 * @anotherdate 2015-07-23T17:26:32+0800
 * @author yeyeye0525
 */

!function(){
    $(function(){
        $(".wx-tab-box").pptab();
        //使用我的赠券
        $('[data-js="mcoupon-list"]>li').on('click', function(event) {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });
    });

}();


/*正在加载...*/
function PPLoading(elem) {
    var html = '<div class="g-loading-wrap"><div class="loading-box"><div class="loading-c animated"></div><div class="loading-pp"></div></div></div>';
    if (elem) {
        $(elem).addClass('PPLoading').append(html).css("position", "relative");
        return;
    }
    $(".PPLoading").append(html).css("position", "relative");
}

function hideLoading(elem) {
    $(elem || ".PPLoading").removeClass('PPLoading').find(".g-loading-wrap").remove();
}

/*加载出错*/
function PPError(elem, size) {
    var _size = "";
    if (size) {
        _size = " small";
    }
    var html = '<div class="g-error-box-wrap"><div class="g-error-box"><div class="error-cat' + _size + '"></div><div class="error-tips">您所访问的内容找不到，或被运走，您可以<a href="javascript:location.reload();" class="in">刷新</a></div></div></div>';
    if (elem) {
        $(elem).addClass('PPError').append(html).css("position", "relative");
        return;
    }
    $("body").append(html).css("position", "relative");
}

//格式化日期时间 formatDateTime(date,fmt)
function formatDateTime(date, fmt) {
    if (typeof (date) == "string")
        date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));

    if (fmt == null || fmt == undefined)
        fmt = "yyyy-MM-dd hh:mm";

    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };

    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
};

//格式化数值
function formatNumber(nData, opts) {
    opts = $.extend({},
    {
        decimalSeparator: ".",
        thousandsSeparator: ",",
        decimalPlaces: 0,
        round: false,
        prefix: "",
        suffix: "",
        defaulValue: 0
    }, opts);
    if (!(typeof (nData) === 'number' && isFinite(nData))) {
        nData *= 1;
    }
    if (typeof (nData) === 'number' && isFinite(nData)) {
        var bNegative = (nData < 0);
        nData = Math.abs(nData);
        var sOutput = nData + "";
        var sDecimalSeparator = (opts.decimalSeparator) ? opts.decimalSeparator : ".";
        var nDotIndex;
        if (typeof (opts.decimalPlaces) === 'number' && isFinite(opts.decimalPlaces)) {
            // Round to the correct decimal place
            var nDecimal, nDecimalPlaces = opts.decimalPlaces;
            if (opts.round) {
                nDecimal = Math.pow(10, nDecimalPlaces);
                sOutput = Math.round(nData * nDecimal) / nDecimal + "";
            } else {
                nDecimal = Math.pow(10, (nDecimalPlaces + 3));
                sOutput = Math.floor(Math.round(nData * nDecimal) / 1000) / (nDecimal / 1000) + "";
            }
            nDotIndex = sOutput.lastIndexOf(".");
            if (nDecimalPlaces > 0) {
                // Add the decimal separator
                if (nDotIndex < 0) {
                    sOutput += sDecimalSeparator;
                    nDotIndex = sOutput.length - 1;
                }
                    // Replace the "."
                else if (sDecimalSeparator !== ".") {
                    sOutput = sOutput.replace(".", sDecimalSeparator);
                }
                // Add missing zeros
                while ((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
                    sOutput += "0";
                }
            }
        }
        if (opts.thousandsSeparator) {
            var sThousandsSeparator = opts.thousandsSeparator;
            nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
            nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
            var sNewOutput = sOutput.substring(nDotIndex);
            var nCount = -1;
            for (var i = nDotIndex; i > 0; i--) {
                nCount++;
                if ((nCount % 3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
                    sNewOutput = sThousandsSeparator + sNewOutput;
                }
                sNewOutput = sOutput.charAt(i - 1) + sNewOutput;
            }
            sOutput = sNewOutput;
        }
        // Prepend prefix
        sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
        // Append suffix
        sOutput = (opts.suffix) ? sOutput + opts.suffix : sOutput;
        return (bNegative ? '-' : '') + sOutput;
    } else {
        return opts.defaulValue;
    }
}

//格式化金额
function formatCurrency(num, opts, length) {
    if (typeof (length) != "number") length = 2;
    opts = $.extend({},
    {
        decimalSeparator: ".",
        thousandsSeparator: ",",
        decimalPlaces: length,
        round: false,
        prefix: "",
        suffix: "",
        defaulValue: 0
    }, opts);
    return formatNumber(num, opts);
}
/*倒计时 start*/
//个位数+0
var checkTime = function (i) {
    i = parseInt(i);
    if (i < 10) {
        i = "0" + i;
    }
    return i;
};
// 返回日期
var newDate = function (str) {
    if (Number(str)) {
        return new Date(str);
    }
    if (str.toString().match(/\//)) {
        var str1 = str.split(' ')[0].split('/'), str2 = str.split(' ')[1].split(':');
        return new Date(str1[0], str1[1] - 1, str1[2], str2[0], str2[1], str2[2]);
    } else {
        return str;
    }
};

//返回日期字符串
var newDateString = function (time) {
    var date = time ? new Date(time) : new Date();
    return checkTime(date.getFullYear()) + "-" + checkTime(date.getMonth() + 1) + "-" + checkTime(date.getDate()) +
             " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
};

// 计算总时间
var total_second = function (time) {
    var arr = time.split(" ")[1].split(":");
    return arr[0] * 60 * 60 + arr[1] * 60 + parseInt(arr[2]);
};
/**
 * 倒计时
 * @anotherdate 2015-04-09T14:28:29+0800
 * @author yeyeye0525
 */
function PPCountDown(options) {
    var defaults = {
        isDay: false,
        type: '',//显示毫秒 milli
        unit: false,//单位格式
        timeout: 1000,//倒计间隔
        from: '',//服务器时间
        to: '',//结束时间
        start: new Date(),//客户端时间
        refresh: function () { },//倒计时
        callback: function () { }//回调
    };
    this.options = $.extend(defaults, options);
    this.flag = true;
    this.totalTime = 0;//倒计时时间
}

PPCountDown.prototype.start = function () {
    var curr = newDate(this.options.from).getTime() + new Date().getTime() - (this.options.start).getTime(),
        to = newDate(this.options.to).getTime();
    if (to - curr > 0 && this.flag) {
        this.options.refresh(this, this.formatSecond((to - curr) / 1000));
    } else {
        this.options.callback();
        return;
    }
    var that = this;
    setTimeout(function () {
        that.start();
    }, this.options.timeout);
};

PPCountDown.prototype.stop = function () {
    this.flag = false;
};

PPCountDown.prototype.formatSecond = function (time) {
    this.totalTime = time;
    //is毫秒
    //is天
    //is单位
    var _milli = this.options.type == "milli" ? "." + parseInt(time * 10 % 10) : "";
    if (this.options.unit) {
        if (this.options.isDay) {
            return checkTime(time / 60 / 60 / 24) + "<span>天</span>" + checkTime(time / 60 / 60 % 24) + "<span>时</span>" + checkTime(time / 60 % 60) + "<span>分</span>" + checkTime(time % 60) + _milli + "<span>秒</span>";
        } else {
            return checkTime(time / 60 / 60) + "<span>时</span>" + checkTime(time / 60 % 60) + "<span>分</span>" + checkTime(time % 60) + _milli + "<span>秒</span>";
        }
    } else {
        if (this.options.isDay) {
            return checkTime(time / 60 / 60 / 24) + ":" + checkTime(time / 60 / 60 % 24) + ":" + checkTime(time / 60 % 60) + ":" + checkTime(time % 60) + _milli;
        } else {
            return checkTime(time / 60 / 60) + ":" + checkTime(time / 60 % 60) + ":" + checkTime(time % 60) + _milli;
        }
    }
};
/*倒计时 end*/

//格式化数值
var numFormat = function (num, length, separator) {//数字格式化，添加","
    var dd = "";
    var temp = "";
    var length = length || 0;
    var point = num.toString().split('.')[1] || 0;
    var separator = separator || ",";
    if (length == 0) {
        point = '';
    } else {
        point = '.' + (point + '000').substring(0, length);
    }

    function format(num) {
        num = num.toString().split('.')[0];
        if (num.length <= 3) {
            temp = num.concat(dd);
            return temp + point;
        }
        var ss = "";
        ss = separator + num.substr(num.length - 3, 3);
        dd = ss.concat(dd);
        format(num.substring(0, num.length - 3));
    }
    format(num);
    return temp + point;
};

/**
 * 倒计时
 * @anotherdate 2015-04-09T14:28:29+0800
 * @author yeyeye0525
 * new PPCutDown({
        from: PPNowTime,
        to: data.beginTime,
        refresh: function(elem,time){
            $("#prj").html("倒计时 " + time);
        },
        callback: callback
    }).start();
 */
function PPCutDown(options) {
    var defaults = {
        type: '',//显示毫秒 milli
        unit: true,//单位格式
        timeout: 1000,//倒计间隔
        from: '',//服务器时间
        to: '',//结束时间
        refresh: function (time) { },//倒计时
        callback: function () { }//回调
    };
    this.options = $.extend(defaults, options);
    this.flag = true;
}
PPCutDown.prototype.start = function () {
    var curr = new Date(),
        to = this.options.to.getTime();
    if (curr <= to && this.flag) {
        this.options.refresh(this.formatSecond((to - curr) / 1000));
    } else {
        this.options.callback();
        return;
    }
    var that = this;
    setTimeout(function () {
        that.start();
    }, this.options.timeout);
};

PPCutDown.prototype.stop = function () {
    this.flag = false;
};

PPCutDown.prototype.formatSecond = function (time) {
    var H = checkTime(time / 60 / 60), M = checkTime(time / 60 % 60), S = checkTime(time % 60), str = '';
    return (H + ':' + M + ':' + S);

};

/*倒计时 end*/
/**
 * [setTimeCountDown 倒计时代码]
 * @anotherdate 2015-04-15T10:32:34+0800
 * @author huangzhen
 * @param       {[date]}                 severtime [服务器时间]
 * @param       {[date]}                 endtime   [结束时间]
 * @param       {[dom]}                 ele       [存放倒计时element]
 */
$.fn.setTimeCountDown = function (_option) {
    var now = new Date();
    var endtime = now.getTime() + _option.subtract;
    new PPCutDown({
        from: now,
        to: new Date(endtime),
        refresh: _option.refresh,
        callback: _option.callback
    }).start();
}

/*绑定导航后退按钮*/
function bindNavButton() {
    if (window.history.length > 1) {
        $('[data-js="back"]').on('click', function (e) {
            window.history.go(-1);
        });
    }
    else {
        $('[data-js="back"]').hide();
    }
};

function addLoadEvent(func) {
    var oldonload = window.loadEvents;
    if (typeof window.loadEvents != "function") {
        window.loadEvents = func;
    }
    else {
        window.loadEvents = function () {
            oldonload();
            func();
        }
    }
};

window.onLoadInit = addLoadEvent;
window.onLoadInit(bindNavButton);
