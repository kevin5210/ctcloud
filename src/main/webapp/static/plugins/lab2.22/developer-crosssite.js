window.isDeveloperFloat = true;
if(location.href === "https://bbs.huaweicloud.com/"){
    var Lazyload = function(){}
    window.productparam = {
        rec_channel:'005'
    }
}
(function($){
    if(/pcloudApp/.test(navigator.userAgent)&&window.location.pathname.indexOf('/videos/')>-1){
        $(".subject-content,#subjectTitle").css("top",0);
    }
    var winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var globalData = globalData || {};
    //fromuser存cookie
    function $parseQueryString (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        else {
            return null;
        }
    };

    window.$usiteUtil = {
        isApp: function () {
            return /(galaxy)/i.test(navigator.userAgent.toLocaleLowerCase());
        },
        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return '';
        },
        setCookie: function (name, value, expiredays) {
            var exdate, cookieString;
            exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            cookieString = name + "=" + value +((expiredays === null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/;" + "domain=.huaweicloud.com;";
            document.cookie = cookieString;
        },
        isHomePageCnZh: function () {
            var protocal = window.location.protocol;
            var path = window.location.origin + window.location.pathname;
            path = path.replace(protocal, "");
            var reg = /\/\/www.(huaweicloud|ulanqab.huawei).com\/(($)|index.html|index\/index_ab.html)/;
            if (path.match(reg)) {
                return true;
            }
            return false;
        },
        isHomePageCnEn: function () {
            var protocal = window.location.protocol;
            var path = window.location.origin + window.location.pathname;
            path = path.replace(protocal, "");
            var reg = /\/\/www.(huaweicloud|ulanqab.huawei).com\/en-us\/(($)|index.html)/;
            if (path.match(reg)) {
                return true;
            }
            return false;
        }
    };

    function getMobilePersonalDom(data) {
        if (data && data.id && winWidth < 768) {
            var personalObj = {
                developer: {
                    title: "我的开发者",
                    id: "personalMb-click-developer",
                    navLists: [{
                        navTitle: "我的博客",
                        href: "https://bbs.huaweicloud.com/community/myblog",
                        id: "iblognewMb"
                    },{
                        navTitle: "我的云声",
                        href: "https://bbs.huaweicloud.com/mysuggestion",
                        id: "mysuggestionMb"
                    },{
                        navTitle: "我的直播",
                        href: "https://bbs.huaweicloud.com/community/mylive",
                        id: "myliveMb"
                    },{
                        navTitle: "我的活动",
                        href: "https://developer.huaweicloud.com/usercenter/mysignup",
                        id: "mysignupMb"
                    },{
                        navTitle: "我的关注",
                        href: "https://developer.huaweicloud.com/usercenter/mytag",
                        id: "mytagMb"
                    }]
                },
                edu: {
                    title: "我的云学院",
                    id: "personalMb-click-edu",
                    navLists: [{
                        navTitle: "我的课程",
                        href: "https://education.huaweicloud.com/dashboard",
                        id: "dashboardMb"
                    }, {
                        navTitle: "我的微认证",
                        href: "https://edu.huaweicloud.com/moBmycertification",
                        id: "mycertificationMb"
                    },{
                        navTitle: "我的实验",
                        href: "https://lab.huaweicloud.com/mytest.html",
                        id: "my_testMb"
                    }]
                }
            }
            var siteArr = ["developer","edu"];
            var domainName = window.location.hostname.split(".")[0];
            domainName = siteArr.indexOf(domainName) > -1 ? domainName : "developer";
            if (window.location.href.indexOf("/suggestion") > -1 || window.location.href.indexOf("/mysuggestion") > -1) {
                domainName = "developer";
            }
            if(window.location.hostname.indexOf('lab')>-1){
                domainName = "edu";
            }
            siteArr.splice(siteArr.indexOf(domainName), 1);
            siteArr.unshift(domainName);
            var personalStr = "<div class='header-user-mobile'>", index = 0;
            for (var i = 0, iLen = siteArr.length; i < iLen; i++) {
                personalStr += '<div class="header-collapse header-collapse-level1 ' + (index == 0 ? 'open' : 'closed') + '">';
                personalStr += '<div class="header-collapse-head">';
                personalStr += '<a id="' + personalObj[siteArr[i]].id + '"><h2 bi_name="' + personalObj[siteArr[i]].title + '">' + personalObj[siteArr[i]].title + '</h2>';
                personalStr += '<i class="header-icon-arrow-down"></i>';
                personalStr += '</div>';
                personalStr += '<div class="header-collapse-body"><div class="header-collapse-content">';
                var navLists = personalObj[siteArr[i]].navLists;
                for (var j = 0, jLen = navLists.length; j < jLen; j++) {
                    personalStr += '<div class="header-collapse header-collapse-level2 closed">';
                    personalStr += '<div class="header-collapse-head">';
                    personalStr += '<a id="' + navLists[j].id + '" href="' + navLists[j].href + '"><h2 bi_name="' + navLists[j].navTitle + '">' + navLists[j].navTitle + '</h2></a>';
                    personalStr += '</div></div>';
                }
                personalStr += '</div></div></div>';
                index++;
            }
            personalStr += '</div>';
            $(".header-user-info-list li:not(.logout)").hide();
            $(".logout .bottom-username").attr("href", "javascript:void(0);");
            $(".header-user .header-user-info").prepend(personalStr);
            $(".logined .header-top .header-main .header-tools .header-tools-list .header-user").show();
            $("body").on("click", ".header-user-mobile .header-collapse", function (e) {
                var e = e || event;
                var $this = $(this);
                e.stopPropagation();
                $this.removeClass('closed').addClass('open').siblings().removeClass('open').addClass("closed")
            });
            $("body").on("click", ".logout .bottom-username", function (e) {
                var e = e || event;
                e.stopPropagation();
            });
        }
    }

    function getPcPersonalDom (data) {
        if (data && data.id && winWidth > 768) {
            var personalPcObj = {
                developer: {
                    title: "我的开发者",
                    id: "personal-click-developer",
                    navPcLists: [{
                        navTitle: "我的博客",
                        href: "https://bbs.huaweicloud.com/community/myblog",
                        id: "my_blog",
                    },{
                        navTitle: "我的论坛",
                        href: "https://bbs.huaweicloud.com/forum/home.php?mod=space&uid=&do=thread",
                        id: "my_forum",
                    },{
                        navTitle: "我的联盟",
                        href: "https://developer.huaweicloud.com/hero/group.php?mod=myhero&op=joined&do=join",
                        id: "myhero"
                    },{
                        navTitle: "我的云声",
                        href: "https://bbs.huaweicloud.com/mysuggestion",
                        id: "mysuggestions"
                    },{
                        navTitle: "我的直播",
                        href: "https://bbs.huaweicloud.com/community/mylive",
                        id: "myLive"
                    },{
                        navTitle: "我的活动",
                        href: "https://developer.huaweicloud.com/usercenter/mysignup",
                        id: "my_signup"
                    },{
                        navTitle: "我的码豆",
                        href: "https://devcloud.huaweicloud.com/bonususer/home/converge",
                        id: "myCommunity_bonus"

                    },{
                        navTitle: "我的关注",
                        href: "https://developer.huaweicloud.com/usercenter/mytag",
                        id: "my_follow"
                    },{
                        navTitle: "我的收藏",
                        href: "https://bbs.huaweicloud.com/community/myblogcollect",
                        id: "my_love"
                    },{
                        navTitle: "我的评论",
                        href: "https://bbs.huaweicloud.com/community/myblogcomment",
                        id: "my_comment"
                    },{
                        navTitle: "专家认证",
                        href: "https://bbs.huaweicloud.com/community/certifiedinfo",
                        id: "my_certify"
                    }]
                },
                edu: {
                    title: "我的云学院",
                    id: "personal-click-edu",
                    navPcLists: [{
                        navTitle: "我的课程",
                        href: "https://education.huaweicloud.com/dashboard?isAuth=1&amp;cfrom=hwc",
                        id: "my_study"
                    }, {
                        navTitle: "我的微认证",
                        href: "https://edu.huaweicloud.com/certifications/mycertification",
                        id: "my_certification"
                    },{
                        navTitle: "我的实验",
                        href: "https://lab.huaweicloud.com/mytest.html",
                        id: "my_test"
                    },{
                        navTitle: "我的证书",
                        href: "https://education.huaweicloud.com/dashboard/certificate?isAuth=1&amp;cfrom=hwc",
                        id: "my_certificate"
                    }]
                },
                personal: {
                    title: "个人资料",
                    id: "personal-click-personal",
                    navPcLists: [{
                        navTitle: "基本资料",
                        href: "https://bbs.huaweicloud.com/community/myinfo",
                        id: "my_setting"
                    }]
                }
            }
            var sitePcArr = ["developer","edu", "personal"];
            var domainName = window.location.hostname.split(".")[0];
            domainName = sitePcArr.indexOf(domainName) > -1 ? domainName : "developer";
            if (window.location.href.indexOf("/suggestion") > -1 || window.location.href.indexOf("/mysuggestion") > -1) {
                domainName = "developer";
            }
            if(window.location.hostname.indexOf('lab')>-1){
                domainName = "edu";
            }
            sitePcArr.splice(sitePcArr.indexOf(domainName), 1);
            sitePcArr.unshift(domainName);
            var personalPcStr = '<div class="menu-user-title menu-user-title-customize">', index = 0;
            for (var i = 0, iLen = sitePcArr.length; i < iLen; i++) {
                personalPcStr += '<ul class="' + (index == 0 ? 'active' : '') + '">';
                personalPcStr += '<li class="click-more menu-user-tit" id="' + personalPcObj[sitePcArr[i]].id + '">' + personalPcObj[sitePcArr[i]].title + '</li>';
                var navPcLists = personalPcObj[sitePcArr[i]].navPcLists;
                for (var j = 0, jLen = navPcLists.length; j < jLen; j++) {
                    personalPcStr += '<li class="click-more menu-user-list">';
                    personalPcStr += '<a class="menu-user-btn" id="' + navPcLists[j].id + '" href="' + navPcLists[j].href + '">' + navPcLists[j].navTitle + '</a>';
                    personalPcStr += '</li>';
                }
                personalPcStr += '</ul>';
                index++;
            }
            personalPcStr += '</div>';
            $(".header-subsite-right-item-menu").html(personalPcStr);
        }
    }
    function isGrayuser() {
        var is_gray_user = 'https://portal.huaweicloud.com/index/isgrayuser'
        getScript(window, document, 'script', is_gray_user, function () { });
    }

    function afterCallbackPrompt(data) {
        if (data && data.xdomain_type === 'HWC_HK') {
            if (window.location.pathname.indexOf("/en-us") == 0) {
                window.location.href = 'https://www.huaweicloud.com/en-us/404crosssitetoen.html';
            } else {
                window.location.href = 'https://www.huaweicloud.com/404crosssitetozh.html';
            }
        }
        if(data && data.xdomain_type != 'HWC_HK'){
            isGrayuser();
        }
    }

    function afterPersonalLoginFn(data) {
        data.flag = 1;
        window.jsonParamInit = {
            UserAccount: data.domainId
        }
        window.is_login = true;
        window.isLogin = true;
        if (window.observer && observer("login")) {
            observer("login").publish(null, data)
        }
        if(winWidth > 768){
            getPcPersonalDom(data);
        }else{
            getMobilePersonalDom(data);
        }
        getForumMessage();
        if(window.location.pathname.indexOf('/usercenter/signupInfo')>-1&&$("#statebox").attr("state") === '其他'){
            $("#school").append('<li class="province-other selected" style="display:none">其他</li>')
        }
    }

    function afterScriptPropmt(data) {
        //fromuser存cookie
        if ($parseQueryString("fromacct") || $parseQueryString("fromuser")) {
            var fromacct = $parseQueryString("fromacct") || $parseQueryString("fromuser");
            var fromflag = $parseQueryString("fromacct") ? "fromacct" : "fromuser";
            var tmpEle = $("<div></div>");
            tmpEle.text(fromacct);
            fromacct = tmpEle.html();
            window.$usiteUtil.setCookie("h_fromacct", fromacct);
        }
        if(globalData && globalData.customLogin){

        }else{
            $("body").on("click", "#header .header-login-mobile", function (e) {
                e.stopPropagation();
                window.location.href = $("#header_cloud_seller_center .js-login").attr("href");
            });
        }
        if (winWidth < 769) {
            $("#header .header-login-mobile").show();
        }
        if (/ipad/i.test(navigator.userAgent)) {
            $("body").on("click touchstart", function (e) {
                if (e.target.className.indexOf('header-subsite-right-item') > -1 || $(e.target).parents('.header-subsite-right-item').length !== 0) {
                    return;
                }
                $(".header-subsite-right-item").removeClass("active");
                $(".header-subsite-right-item ul").removeClass("active");
                $(".header-subsite-right-item ul").eq(0).addClass("active");
            });
        }
        function try_login(is_header) {
            if(window.channelFrom && window.location.pathname.indexOf("/signup/")>-1){
                window.$usiteUtil.setCookie("hw_abi",'{"cf":"'+$.base64.btoa(channelFrom)+'"}',1);
            }
        }
        window.try_login = try_login;
    }

    function getForumMessage() {
        var msgInfo = '<ul class="" id="myMsg"><li class="click-more menu-user-tit" id="personal-click-msg">我的消息<span id="myMessage"></span></li><li class="click-more menu-user-list"><a class="menu-user-btn" id="system_msg" href="https://bbs.huaweicloud.com/forum/home.php?mod=space&do=notice&view=system">系统消息<span id="sysMsg" style="color:#c7000b"></span></a></li><li class="click-more menu-user-list"><a class="menu-user-btn" id="private_msg" href="https://bbs.huaweicloud.com/forum/home.php?mod=space&do=pm&filter=newpm">私信<span id="priMsg" style="color:#c7000b"></span></a></li></ul>';
        $.ajax({
            type: "post",
            url: 'https://bbs.huaweicloud.com/forum/api/rest/index.php',
            data:{"interface":"get_news_message"},
            dataType: "json",
            timeout:10000,
            xhrFields: {withCredentials: true},
            success: function (data) {
                if(data.rtnCode == "10000"){
                    var totalmsg = parseInt(data.systemCount) + parseInt(data.privateCount);
                    totalmsg = totalmsg>99 ? "99+" : totalmsg;
                    systemCount = parseInt(data.systemCount)>99 ? "99+" : parseInt(data.systemCount);
                    privateCount = parseInt(data.privateCount)>99 ? "99+" : parseInt(data.privateCount);
                    $("#personal-click-personal").parent().before(msgInfo);
                    if(totalmsg){
                        $('.header-subsite-tools li.header-subsite-right-item a.js-login').addClass('unhide');
                        $("#myMessage").text(totalmsg);
                    }
                    if(systemCount){
                        $("#sysMsg").text(systemCount);
                    }
                    if(privateCount){
                        $("#priMsg").text(privateCount);
                    }
                }else{
                    $("#personal-click-personal").parent().before(msgInfo);
                }
            },
            error: function (err){
                $("#personal-click-personal").parent().before(msgInfo);
            },
        })
    }

    function afterFooterSidebar() {
        var locationHost = location.hostname;
        if (/bbs|developer|pep/.test(locationHost) && winWidth>1024) {
            var qrcodeStr = '<div id="sidebar-qrcode" class="sidebar-qr-code" bi_name="悬浮二维码"><div class="sidebar-qr-code-content"><div id="sidebarQrcodeCanvas"></div><h5>手机扫码分享给好友</h5></div></div>';
            $(".float-sidebar").append(qrcodeStr);
            var thisHref = window.location.href;
            if (location.search) {
                thisHref += '&needGalaxy=true';
            } else {
                thisHref += '?needGalaxy=true';
            }
            $.getScript('https://res-static1.huaweicloud.com/content/dam/cloudbu-site/archive/commons/3rdlib/jquery/jquery.qrcode.min.js',function(){
                if (typeof $.fn.qrcode === 'function'&&$("#sidebarQrcodeCanvas canvas").length===0) {
                    $("#sidebarQrcodeCanvas").qrcode({
                        render: "canvas",
                        text: thisHref,
                        width: "115",
                        height: "115",
                        background: "#ffffff",
                        foreground: "#000000"
                    });
                    $("#sidebar-qrcode").on("mouseenter touchstart",function(){
                        var domain_pre = (window.location.host || '').split('.')[0] || '';
                        var canReport = window.pageMatedataPrefix && window.sendBiReport;
                        if(canReport){
                            var ge_get_prefix = canReport ? window.pageMatedataPrefix.replace('.click.', '.hover.') : '';
                            var ge_get = ge_get_prefix + $("#sidebar-qrcode").attr("bi_name");
                            window.sendBiReport(ge_get, domain_pre, window.jsonParamEvent || {}, 1);
                        }
                    });
                }
            });
        }
        if(window.location.pathname.indexOf('/forum')>-1 && winWidth > 768){
            $(".float-sidebar").show();
        }
    }

    window.$parseQueryString = $parseQueryString;
    window.getMobilePersonalDom = getMobilePersonalDom;
    window.getPcPersonalDom = getPcPersonalDom;
    window.afterCallbackPrompt = afterCallbackPrompt;
    window.afterPersonalLoginFn = afterPersonalLoginFn;
    window.afterScriptPropmt = afterScriptPropmt;
    window.afterFooterSidebar = afterFooterSidebar;

    $(window).on("load",function(){
        if($("[maintenance]").length){
            function setDate(year,month,day,hour,minute){
                hour = hour|| 0;
                minute = minute||0;
                return new Date(year,month-1,day,hour,minute);
            }
            function judgeTime(){
                var firstDate = setDate(2020,06,03,19).getTime(),
                    lastDate = setDate(2020,06,05,08).getTime(),
                    today =	new Date(),
                    todayTime = today.getTime(),
                    todayHour = today.getHours(),
                    todayMinute = today.getMinutes();
                return todayTime<lastDate && todayTime>firstDate;
            }
            var time = judgeTime();

            function initDom(){
                if(time){
                    var $popCover = $("<div class='maintenance-cover' style='display:none;'></div>");
                    $("body").append($popCover);
                    var popDom = '<div class="maintenance-block">'+
                        '<h3 class="maintenance-title">提示</h3>'+
                        '<div class="maintenance-box">'+
                        '<i class="icon-waring"></i>'+
                        '<p class="waring-detail">抱歉，社区系统维护中，暂不支持个人资料修改</p>'+
                        '</div>'+
                        '<div class="maintenance-btn">'+
                        '<a href="javascript:void(0);" class="btn red-btn">我知道了</a>'+
                        '</div>'+
                        '<i class="icon-delete"></i>'+
                        '</div>';
                    $popCover.append($(popDom));
                    $(".maintenance-cover .maintenance-block").on("click",".icon-delete,.maintenance-btn .red-btn",function(){
                        $(".maintenance-cover").hide();
                    });
                }

            }
            initDom();

            if(time){
                $("[maintenance]").append("<div class='not-allowed'></div>");
                $("body").off("click","[maintenance]");
                $("body").off("click","#nick-confirm:not([disabled])");
                $("body").off("unbind","#nick-confirm:not([disabled])");
                $("[maintenance]").off("click");
                $("[maintenance]").attr("onclick","");
                $("body .go_ask").off("click");
                $(".profile-save-settings").off("click");
                $("body").on("click","[maintenance] .not-allowed",function(e){
                    e = e||event;
                    e.stopPropagation();
                    e.preventDefault();
                    if($(".maintenance-cover").length){
                        $(".maintenance-cover").show();
                    }else{
                        initDom();
                    }
                });
            }

        }
    })
})(jQuery)

