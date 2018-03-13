function in_array(e, o) {
    for (var n = 0; n < o.length; n++)
        if (o[n] == e) return !0;
    return !1
}

function fix_array(e) {
    if ("object" != typeof e) throw new Error("Undefined variable type: fix_array(" + typeof e + ")");
    for (var o = [], n = 0; n < e.length; n++) void 0 !== e[n] && o.push(e[n]);
    return o
}

clones = function (e) {
    var o = e instanceof Array ? [] : {};
    for (i in e) "clone" != i && (o[i] = e[i]);
    return o
}

window.clones = clones, navigator.sayswho = function () {
    var e, o = navigator.userAgent,
        n = o.match(/(vivaldi|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    return /trident/i.test(n[1]) ? "IE " + ((e = /\brv[ :]+(\d+)/g.exec(o) || [])[1] || "") : "Chrome" === n[1] && null != (e = o.match(/\bOPR\/(\d+)/)) ? "Opera " + e[1] : (n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (e = o.match(/version\/(\d+)/i)) && n.splice(1, 1, e[1]), n.join(" "))
}();

bg = {
    tabs: [],
    tabsManage: [],
    storage: {},
    cmenu: {},
    debug: !1,
    regex_ok: "^http(s)?://(www.)?(ok|odnoklassniki).ru/?(.*)$",
    regex_tool: "^http(s)?://(beta.)?plugtopus.agency/?(.*)$",
};

bg.log = function (e, o) {
    bg.debug && (void 0 === o ? console.log.apply(console, ["OKChm:", e]) : console.log.apply(console, ["OKChm:", e, o]))
};

bg.error = function (e, o) {
    bg.debug && (void 0 === o ? console.error.apply(console, ["OKChm:", e]) : console.error.apply(console, ["OKChm:", e, o]))
};

bg.saving = function () {
    chrome.storage.sync.set(bg.storage, function () {
    });

    bg.log(bg.storage);
    var e = {
        method: "updateAll",
        data: bg.storage
    };

    chrome.runtime.sendMessage({
        method: "sendDataToCs",
        data: e
    }, function (e) {
    })
};

bg.listenToTab = function (e) {
    bg.hasTab(e.tabId) ? chrome.browserAction.enable(e.tabId) : chrome.browserAction.disable(e.tabId)
};

bg.hasTab = function (e) {
    return !1 !== bg.findTabIndex(e)
};

bg.findTab = function (e) {
    return bg.log("findTab", e), bg.tabs[bg.findTabIndex(e)]
};

bg.findTabIndex = function (e) {
    if (bg.tabs.length > 0)
        for (var o = 0; o < bg.tabs.length; o++) {
            if (bg.tabs[o].id === e) return o
        }
    return !1
};

bg.addTab = function (e, o) {
    var n = bg.tabs.push(e);
    bg.log("AddTab(" + e.id + ") under bg.tabs[" + n + "]"), chrome.browserAction.enable(e.id)
};

bg.onAddTab = function (e, o) {
    var n = e[2];
    return "complete" !== e[1] ? {
        storage: bg.storage
    } : (null !== n.url.match(bg.regex_ok) ? (n.place = "base", bg.addTab(n)) : null !== n.url.match(bg.regex_tool) && (n.place = "place", bg.addTab(n)), {
        storage: bg.storage
    })
};

bg.removeTab = function (e, o) {
    var n = bg.findTabIndex(e);
    !1 !== n && (bg.tabs.splice(n, 1), bg.log("Tab(" + e + ") removed - bg.tabs[" + n + "]"))
};

bg.onTabUpdate = function (e, o, n) {
    if ("loading" !== o.status) {
        var a = bg.findTabIndex(n.id);
        !1 !== a ? null !== n.url.match(bg.regex_ok) ? (n.place = "base", bg.tabs[a] = n, chrome.browserAction.enable(n.id)) : (bg.removeTab(e), chrome.browserAction.disable(n.id)) : null !== n.url.match(bg.regex_ok) ? (n.place = "base", bg.addTab(n)) : chrome.browserAction.disable(n.id)
    }
};

bg.findNeedTabs = function () {
    chrome['tabs'].query({
        url: ["*://ok.ru/*", "*://www.ok.ru/*", "*://plugtopus.agency/*", "*://beta.plugtopus.agency/*"]
    }, function (e) {
        bg.log(arguments);
        for (var o = 0, n = e[o]; o < e.length; n = e[++o]) chrome['tabs'].reload(n.id)
    })
};

bg.call = function (e, o, n) {
    return "function" == typeof bg[e] ? bg[e](o, n) : (bg.error("Method not exists: ", "bg." + e + "()"), !1)
};

bg.onMessage = function (e, o, n) {
    bg.log("bg.onMessage() -> ", e), o.tab ? void 0 !== e.method && n(bg.call(e.method, e, o)) : void 0 !== e.method && n(bg.call(e.method, e.data, o))
};

bg.sendDataToCs = function (e, o) {
    bg.log("bg.sendDataToCs()", e), bg.updateTabs(e)
};

bg.updateTabs = function (e) {
    bg.log("bg.updateTabs()", e), bg.storage = clones(e.data), bg.log("bg.tabs", bg.tabs);
    for (var o = 0; o < bg.tabs.length; o++) {
        var n = bg.tabs[o].id;
        chrome['tabs'].sendMessage(n, e, function (e) {
        })
    }
    return {}
};

bg.onCommand = function (e) {
    bg.log("Pressed special key"), chrome['tabs'].getCurrent(function (e) {
        bg.log(e), chrome.browserAction.enable(e.id)
    })
};

bg.ready = function () {
    bg.log("bg.ready"), chrome['storage']['sync'].get(null, function (e) {
        bg.storage = e, bg.findNeedTabs()
    })
};

chrome.runtime.onMessage.addListener(bg.onMessage), chrome['tabs'].onRemoved.addListener(bg.removeTab), chrome['tabs'].onUpdated.addListener(bg.onTabUpdate), chrome['tabs'].onActivated.addListener(bg.listenToTab), chrome.contextMenus.create({
    title: chrome['i18n'].getMessage("ShareLink"),
    contexts: ["link"],
    onclick: bg.cmenu.linkHandler
});

bg.ready();