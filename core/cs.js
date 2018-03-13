var ad_observer, cs = {
        cookie: {},
        storage: {},
        upd: {},
        newst: {},
        obj: {},
        music: {},
        bgs: {},
        debug: !1,
        updateRate: 500,
        updateID: 0,
        jSessionID: "",
        _userdata: null,
        _guestdata: null
    };

    observer_params = {
        subtree: !0,
        childList: !0,
        attributes: !0
    };

cs.loadCookie = function() {
    var t = document.cookie,
        n = (t = t.replace(" ", "")).split(";");
    for (i in n) {
        var e = n[i].split("=");
        cs.cookie[e[0]] = e[1]
    }
};

cs.domElement = function(t, n, e, o, i) {
    for (var a in n) t.setAttribute(a, n[a]);
    if (t.textContent = e, i && i.length)
        for (var r = 0; r < i.length; r++) t.appendChild(i[r]);
    return o && o.appendChild(t), t
};

b = {};

cs.call = function(t, n, e) {
    if ("function" == typeof cs[t]) return cs[t](n, e);
    cs.debug && console.warn.apply(console, ["OKChm:", "Function does not exists", "cs[", t, "], typeof -> ", typeof cs[t]])
};

cs.onMessage = function(t, n, e) {
    cs.log("message!"), cs.log(t), void 0 !== t.method && e(cs.call(t.method, t.data, n))
};

cs.log = function(t, n) {
    cs.debug && (void 0 === n ? console.log.apply(console, ["OKChm:", t]) : console.log.apply(console, ["OKChm:", t, n]))
};

cs.error = function(t, n) {
    cs.debug && (void 0 === n ? console.error.apply(console, ["OKChm:", t]) : console.error.apply(console, ["OKChm:", t, n]))
};

cs.epmty = function() {}, b.hide = function(t) {
    var n = $(t);
    "none" != n.css("display") && n.hide()
};

b.show = function(t) {
    var n = $(t);
    "none" == n.css("display") && n.show()
};

b.remove = function(t) {
    var n = $(t);
    n.length && n.remove()
};

b.stylehiding = function(t, n, e) {
    if (1 == n || 1 == n) {
        if ($("#okch_" + t)[0]) return;
        $("#okch_" + t).remove(), cs.domElement(document.createElement("style"), {
            id: "okch_" + t
        }, e, document.body)
    } else $("#okch_" + t).remove()
};

cs.upd.t_fullredirect = 0, cs.upd.s_fullredirect = function(t) {
    1 == t || 1 == t ? (clearInterval(cs.upd.t_fullredirect),
		cs.upd.t_fullredirect = setInterval(function() {
        if ($("div.service-stub_content").length) {
            var t = $("div.service-stub_content a").attr("href");
            document['location'].href = t,
				clearInterval(cs.upd.t_fullredirect)
        }
    }, 200)) : clearInterval(cs.upd.t_fullredirect),
		cs.storage.s_fullredirect = t
};

cs.upd.s_friendcommon = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_FriendCommonData") : b.show("#hook_Block_FriendCommonData"),
		cs.storage.s_friendcommon = t
};

cs.upd.s_bookmarks = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_LeftColumnBookmarks") : b.show("#hook_Block_LeftColumnBookmarks"),
		cs.storage.s_bookmarks = t
};

cs.upd.s_groups = function(t) {
    b.stylehiding("groups", t, "\t\t#hook_Block_RecommendedGroups .portlet {display: none !important;}\t"),
		cs.storage.s_groups = t
};

cs.upd.s_happenings = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_RightColumnHappeningList") : b.show("#hook_Block_RightColumnHappeningList"),
		cs.storage.s_happenings = t
};

cs.upd.s_workwith = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_RightColumnRecommendationsByRelation") : b.show("#hook_Block_RightColumnRecommendationsByRelation"),
		cs.storage.s_workwith = t
};

cs.upd.s_abouts = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_AboutUserRB") : b.show("#hook_Block_AboutUserRB"),
		cs.storage.s_abouts = t
};

cs.upd.s_games = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_TargetBanner") : b.show("#hook_Block_TargetBanner"),
		cs.storage.s_games = t
};

cs.upd.s_music4u = function(t) {
    b.stylehiding("music4u", t, "\t\t\t#hook_Block_RightColumnMusicRecommendations {display: none;}\t\t"),
		cs.storage.s_music4u = t
};

cs.upd.s_holydays = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_HolidaysPortlet") : b.show("#hook_Block_HolidaysPortlet"),
		cs.storage.s_holydays = t
};

cs.upd.s_possible = function(t) {
    1 == t || 1 == t ? b.hide("#hook_Block_UserRecommendationsWithTarget") : b.show("#hook_Block_UserRecommendationsWithTarget"),
		cs.storage.s_possible = t
};

cs.upd.s_friendonline = function(t) {
    1 == t || 1 == t ? b.hide(".friendOnlineWrapper") : b.show(".friendOnlineWrapper"),
		cs.storage.s_friendonline = t
};

cs.upd.s_mailbar = function(t) {
    b.stylehiding("mailbar", t, "\t\t\t\t\t#hook_Block_Portal {display: none;} \t\t\t\t\t#topPanel {height: 48px;} \t\t\t\t\t.multimedia-layer, .user #hook_Block_MainContainer, .layer-video, .pl, .vp, .layer-media .layer_ovr, .layer-media, .topPanel .modal_overlay {top: 48px;} \t\t\t\t\t.topPanel .dialogWrapper, #nwsbw, #nwslc {top: 54px;} \t\t\t\t\t.ntf_spacer {margin-top:54px} \t\t\t\t\t.layer_hld {margin-top: 6px} \t\t\t\t\t.user #hook_Block_MainContainer{padding-top: 48px;}\t\t\t\t\t.modal.__toolbar-indent{ top: 48px; } \t\t\t\t"),
		cs.storage.s_mailbar = t
};

cs.upd.s_autohidebar = function(t) {
    t ? (b.stylehiding("autohidebar", t, "\t\t\t\t\t#topPanel {transition: margin-top .3s}\t\t\t\t\t.modal.__toolbar-indent{top: 0}\t\t\t\t\t.topbarhide #topPanel::before { \t\t\t\t\t\tcontent: ' '; \t\t\t\t\t\tposition: fixed; \t\t\t\t\t\tdisplay: block; \t\t\t\t\t\ttop: 0; \t\t\t\t\t\tleft: 0; \t\t\t\t\t\tright: 0; \t\t\t\t\t\theight: 50px; \t\t\t\t\t\tbackground: linear-gradient(to bottom, rgba(0,0,0,0.26) 0%,rgba(0,0,0,0) 42%,rgba(0,0,0,0) 100%); \t\t\t\t\t\tz-index: 2015; \t\t\t\t\t\tcursor: pointer; \t\t\t\t\t} \t\t\t\t\t.topbarhide .toolbar { \t\t\t\t\t\tz-index: 2020; \t\t\t\t\t} \t\t\t\t\t.topbarhide #topPanel { \t\t\t\t\t\tmargin-top: -78px; \t\t\t\t\t} \t\t\t\t\t.topbarhide #topPanel:hover { \t\t\t\t\t\tmargin-top: 0px; \t\t\t\t\t} \t\t\t\t\t.topbarhide #pointerOverlay { \t\t\t\t\t\tdisplay: none; \t\t\t\t\t} \t\t\t\t"), $(window).scroll(function() {
        $(window).scrollTop() < 200 ? $("body").removeClass("topbarhide") : $("body").hasClass("topbarhide") || $("body").addClass("topbarhide")
    }), $(window).trigger("scroll")) : (b.stylehiding("autohidebar", !1, "\t\t\t\t\t#topPanel {transition: margin-top .3s}\t\t\t\t"),
		$(window).off("scroll")),
		cs.storage.s_autohidebar = t
};

cs.upd.s_hidemarks = function(t) {
    b.stylehiding("hidemarks", t, "\t\t\t\t.mark_ic, .marks-new_ic, .feedback_type.__klass {display: none;} \t\t\t"),
		cs.storage.s_hidemarks = t
};

cs.upd.s_hidepresents = function(t) {
    b.stylehiding("hidepresents", t, "\t\t\t\t.photoPresentSmall {display: none;} \t\t\t"),
		cs.storage.s_hidepresents = t
};

cs.upd.s_bubblenotif = function(t) {
    b.stylehiding("bubblenotif", t, "\t\t\t\t#NotificationsGrowl, \t\t\t\t.ntf_spacer \t\t\t\t{display: none;} \t\t\t\t.ntf_spacer__on {display: none; visibility: hidden}\t\t\t"),
		cs.storage.s_bubblenotif = t
};

cs.upd.s_hidecounters = function(t) {
    b.stylehiding("hidecounters", t, "\t\t\t\t.notifications {display: none;} \t\t\t\t.toolbar_nav_notif {display: none;} \t\t\t"),
		cs.storage.s_hidecounters = t
};

cs.upd.s_hideonlinem = function(t) {
    b.stylehiding("hideonlinem", t, "\t\t\t\t.ic-online {display: none;} \t\t\t"),
		cs.storage.s_hideonlinem = t
};

cs.upd.l_pagetransp = function(t) {
    t = isNaN(t) ? 100 : Number(t), $("#okch_pagetransp").remove();
    var n = void 0 === cs.storage.l_pagecolor ? "(255, 255, 255)" : cs.storage.l_pagecolor;
    n = n.replace(")", ","), cs.domElement(document.createElement("style"), {
        id: "okch_pagetransp"
    }, ".ft-push, \t\t#footer \t\t{\t\t\tbackground: rgba" + n + " " + t / 100 + ") !important;\t\t} \t\t#mainContent, \t\t#fthColWrp:before, \t\t#fthColWrp, \t\t#fo4cc \t\t{\t\t\tbackground: transparent !important; \t\t}", document.body),
		cs.storage.l_pagetransp = t
};

cs.upd.l_pagecolor = function(t) {
    cs.storage.l_pagecolor = t,
		cs.upd.l_pagetransp(cs.storage.l_pagetransp)
};

cs.upd.s_playerbutton = function(t) {
    b.stylehiding("playerbutton", t, "\t\t\t\t#topPanelMusicPlayerControl {display: none;} \t\t\t\t.toolbar_nav_a__audio {margin-right:0px} \t\t\t"),
		cs.storage.s_playerbutton = t
};

cs.upd.s_moderatorblock = function(t) {
    b.stylehiding("moderatorblock", t, "\t\t\t\t#hook_Block_ModerationLauncher a, #hook_Block_ModerationLauncher.hookBlock {display:none !important} \t\t\t"),
		cs.storage.s_moderatorblock = t
};

cs.upd.ft = function(t) {
    var n = "";
    "ft_rusl" == t.id ? n = " .core-chat .msg_tx{padding-right: 26px !important}" : "ft_syst" == t.id && (n = " .chat_name .chat_name_tx_wr{line-height: 10px !important;}");
    var e = t.size > 0 ? " .mctc_navMenuSec, .button-pro, input[type='text'], .x-ph__link, .msg_tx {font-size: " + t.size + "px !important;}" : ""; - 1 != t.name ? $("#okch_setfont").text("\t\t@import url(" + t.url + "); \t\t*, .button-pro, input, .x-ph__link {font-family: '" + t.name + "';}" + e + n) : $("#okch_setfont").text("* {}"), cs.storage.ft = t
};

cs.upd.update_authorspage = function() {
    $("#action_menu_official_group")[0] || $("#hook_Block_LeftColumnTopCard .u-menu").append(cs.domElement(document.createElement("li"), {
        class: "u-menu_li",
        id: "action_menu_official_group"
    }, "", null, [cs.domElement(document.createElement("a"), {
        href: "/okchanger",
        class: "u-menu_a",
        title: "OK Changer"
    }, "", null, [cs.domElement(document.createElement("span"), {
        class: "tico"
    }, "", null, [cs.domElement(document.createElement("i"), {
        class: "tico_img ic ic_officialg"
    }, ""), cs.domElement(document.createElement("span"), {}, chrome['i18n'].getMessage("officialGroup"))])])]))
};

cs.upd.update_officialpage = function () {
};

cs.upd.update_blocks_hiding = function () {
    cs.upd.s_friendcommon(cs.storage.s_friendcommon),
        cs.upd.s_bookmarks(cs.storage.s_bookmarks),
        cs.upd.s_groups(cs.storage.s_groups),
        cs.upd.s_happenings(cs.storage.s_happenings),
        cs.upd.s_holydays(cs.storage.s_holydays),
        cs.upd.s_abouts(cs.storage.s_abouts),
        cs.upd.s_possible(cs.storage.s_possible),
        cs.upd.s_games(cs.storage.s_games),
        cs.upd.s_friendonline(cs.storage.s_friendonline)
};

cs.update = function () {
    cs.upd.update_authorspage(),
        cs.upd.update_blocks_hiding(),
        clearTimeout(cs.updateID),
        cs.updateID = setTimeout(cs.update,
            cs.updateRate)
};

cs.updateAll = function(t, n) {
    cs.log("cs.updateAll()", t);
    for (var e in t) t[e] !== cs.storage[e] && ("function" == typeof cs.upd[e] ? (cs.log(e + ": " + t[e]), cs.upd[e](t[e])) : cs.error('Function "cs.upd.' + e + "\" doesn't exists!"))
};

cs.getUser = function(t) {
    if (null != cs._userdata) return cs._userdata;
    var n = $("#hook_Cfg_CurrentUser").contents().filter(function() {
        return 8 == this.nodeType
    });
    if (n = n.length ? n[0].textContent : null) {
        n = n.replace("\x3c!--", "").replace("--\x3e", "");
        var e = JSON.parse(n);
        return 1 == t ? e : cs._userdata = {
            id: Number(e.oid),
            name: e.firstName,
            surname: e.lastName,
            link: e.custLink,
            lang: e.lang,
            male: e.male
        }
    }
    return null
};

cs.getGuest = function(t, n) {
    if (null != cs._guestdata && 1 != t) return cs._guestdata;
    var e = $('[id^="hook_ShortcutMenu_"]').contents().filter(function() {
        return 8 == this.nodeType
    });
    if (e = e.length ? e[0].textContent : null) {
        var o = JSON.parse(e.replace("\x3c!--", "").replace("--\x3e", ""));
        if (1 == n) return o;
        var i = o.fio.split(" "),
            a = o.photoLink && o.photoLink.match(/^\/((profile\/[0-9]+)|([a-z0-9.]+))\/?/);
        return a = a ? a[1] : null, cs._guestdata = {
            id: Number(o.userId),
            name: i[0],
            surname: i[1],
            link: a,
            male: o.male
        }
    }
    return cs._guestdata = null
};

cs.isCurrentGuest = function() {
    var t = cs.getGuest(!0).link,
        n = window.location.href.match(/^http[s]?:\/\/(odnoklassniki|ok).ru\/((profile\/[0-9]+)|([a-z0-9.]+))\/?/i);
    return n && (n = n[2]), t == n
};

cs.isCurrentUser = function() {
    return cs.getUser().id == cs.getGuest(!0).id
};

cs.ready = function() {
    cs.log("cs.ready()"),
		cs.log("cs.storage", cs.storage),
		cs.loadCookie(),
		chrome.runtime.onMessage.addListener(cs.onMessage), chrome.runtime.sendMessage({
        method: "onAddTab",
        manage: "base"
    }, function(t) {
        cs.updateAll(t.storage, {})
    }), cs.domElement(document.createElement("link"), {
        rel: "stylesheet",
        type: "text/css",
        id: "base_styles",
        href: chrome.extension.getURL("css/cs.css")
    }, "", document.head), cs.domElement(document.createElement("link"), {
        rel: "stylesheet",
        type: "text/css",
        id: "okch_style_set",
        href: chrome.extension.getURL("css/cs.css")
    }, "", document.body), cs.domElement(document.createElement("style"), {
        id: "okch_setfont"
    }, "", document.body), cs.updateID = setTimeout(cs.update, cs.updateRate)
};

document.addEventListener("DOMContentLoaded", cs.ready);