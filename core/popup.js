popup = {
    website: "https://plugtopus.agency/",
    storage: {},
    setts: {},
    fonts: {},
    debug: !1
};

popup.log = function(o, p) {
    popup.debug && (void 0 === p ? console.log.apply(console, ["ChOK:", o]) : console.log.apply(console, ["ChOK:", o, p]))
};

popup.error = function(o, p) {
    popup.debug && (void 0 === p ? console.error.apply(console, ["ChOK:", o]) : console.error.apply(console, ["ChOK:", o, p]))
};

popup.saving = function(o) {
    chrome['storage']['sync'].set(popup.storage, function() {}), popup.log(popup.storage);
    var p = {
        method: "updateAll",
        data: popup.storage
    };

    chrome.runtime.sendMessage({
        method: "sendDataToCs",
        data: p
    }, function(o) {}), o && o.preventDefault()
};

popup.hideAll = function() {
    $("#settings_block").hide(), $("#fonts_block").hide()
};

popup.setts.show = function(o) {
    popup.hideAll(), $("#settings_block").show(), o && o.preventDefault()
};

popup.setts.load = function() {
    for (var o in popup.storage) {
        if (1 == popup.storage[o] && "s_" == o.substr(0, 2)) $("#" + (o + "")).addClass("pb_active")
    }
    $("#hidingblocks_accord").accordion({
        collapsible: !0,
        d_active: !1,
        heightStyle: "content"
    });
    var p = popup.storage.l_pagetransp;
    $("#l_pagetransp").slider({
        range: "min",
        min: 0,
        max: 100,
        value: void 0 === p ? 100 : p,
        slide: function(o, p) {
            popup.storage.l_pagetransp = p.value, popup.saving()
        }
    }), $("#pagecolor_selector").on("click", ".colorb", function() {
        var o = $(this).css("background-color");
        o = o.replace("rgb", ""), popup.storage.l_pagecolor = o, popup.saving()
    })
};

popup.setts.clicked = function(o) {
    var p = $(this),
        t = p.attr("id") + "";
    p.hasClass("pb_active") ? (p.removeClass("pb_active"), popup.storage[t] = 0) : (p.addClass("pb_active"), popup.storage[t] = 1), popup.saving(), o.preventDefault()
};

popup.fonts.show = function(o) {
    popup.hideAll(), $("#fonts_block").show(), o.preventDefault(), popup.storage.ft ? $("#" + popup.storage.ft.id).addClass("selected") : $("#ft_none").addClass("selected")
};

popup.fonts.load = function() {
    $("#fonts_block").on("click", ".decbutton", popup.fonts.clicked)
};

popup.fonts.clicked = function(o) {
    var p = $(this);
    popup.storage.ft = {
        name: p.attr("data-font"),
        url: p.attr("data-google"),
        id: p.attr("id"),
        size: p.attr("data-size")
    }, $(".decbutton.selected").removeClass("selected"), p.addClass("selected"), popup.saving(), o.preventDefault()
};

popup.button_click = function(o) {
    var p = $(this).attr("href");
    popup[p], popup[p].show(o)
};

popup.ready = function() {
    document.body.style.display = "none", $("[data-lang]").each(function(o) {
        $(this).text(chrome['i18n'].getMessage($(this).attr("data-lang")))
    }), setTimeout(function() {
        chrome['storage']['sync'].get(null, function(o) {
            popup.storage = JSON.parse(JSON.stringify(o)), popup.log(popup.storage), popup.setts.load(), popup.fonts.load(), document.body.style.display = "block"
        })
    }, 50), popup.setts.show(), $(".progbutton").click(popup.setts.clicked), $(".toolbar_button").click(popup.button_click)
};

document.addEventListener("DOMContentLoaded", popup.ready);