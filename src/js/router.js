(function () {
    var currentPageIndex = 0;
    var pageDuration = 400;
    var totalIndex = 0;
    var init = function () {
        currentPageIndex = 1;
        totalIndex = 1;
        //showPageAtIndex(currentPageIndex);
        replace("#" + getCurrentPage(), currentPageIndex);
        // onpopstate可以监控state变化
        window.onpopstate = function (e) {
            var state = e.state;
            if (state.id < currentPageIndex) {   //返回
                showPageAtIndex(state.pageId, true);
            } else if (state.id > currentPageIndex) {   //前进
                showPageAtIndex(state.pageId, false);
            } else {
                //showPageAtIndex("#page01", false);
                //replace("#page01", 1);
            }

            currentPageIndex = state.id;
        }
    };
    //isBack是否为退出
    var showPageAtIndex = function (pageId, isBack) {
        var currentPage = $(".page.page-current");
        var thisPage = $(pageId);
        var currentPageAnimClass = "page-from-center-to-left";
        var thisPageAnimClass = "page-from-right-to-center";
        if (isBack) {
            currentPageAnimClass = "page-from-center-to-right";
            thisPageAnimClass = "page-from-left-to-center";
        }
        if (isPage(pageId)) {
            currentPage.addClass(currentPageAnimClass);
            thisPage.addClass("page-current " + thisPageAnimClass);
        }
        setTimeout(function () {
            currentPage.removeClass("page-current " + currentPageAnimClass);
            thisPage.removeClass(thisPageAnimClass);
        }, pageDuration)
    };
    var add = function (pageId) {
        showPageAtIndex(pageId);
        totalIndex++;
        currentPageIndex = totalIndex;
        var state = {
            id: totalIndex,
            pageId: pageId
        }
        history.pushState(state, "", "");
    };
    //传入page页面pageId
    var go = function (pageId) {
        if (isPage(pageId) && !isCurrentPage(pageId)) {
            add(pageId);
        }
    };
    var replace = function (pageId, id) {
        var state = {
            id: id,
            pageId: pageId
        }
        history.replaceState(state, "", "");
    }
    var isPage = function (pageId) {
        var check = false;
        if (!!$(pageId)[0] && $(pageId).hasClass("page")) {
            check = true;
        }
        return check;
    };
    var isCurrentPage = function (pageId) {
        return $(pageId).hasClass("page-current");
    };
    var getCurrentPage = function () {
        var pageId = null;
        var page = $(".page.page-current");
        if (!!page[0]) {
            pageId = page.attr("id");
            if (!pageId) {
                pageId = "page" + new Date().getTime();
                page.attr("id", pageId);
            }
        }
        return pageId;
    }
    var Router = {}
    Router.init = init;
    Router.go = go;
    Router.load = go;
    Router.getCurrentPageId = function () {
        return currentPageIndex;
    };
    window.router = Router;
})();