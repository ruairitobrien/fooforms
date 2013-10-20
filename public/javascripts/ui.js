/*
 jquery.layout 1.3.0 - Release Candidate 30.79
 $Date: 2013-01-01 08:00:00 (Tue, 1 Jan 2013) $
 $Rev: 303007 $

 Copyright (c) 2013 Kevin Dalman (http://allpro.net)
 Based on work by Fabrizio Balliano (http://www.fabrizioballiano.net)

 Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
 and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.

 SEE: http://layout.jquery-dev.net/LICENSE.txt

 Changelog: http://layout.jquery-dev.net/changelog.cfm#1.3.0.rc30.79

 Docs: http://layout.jquery-dev.net/documentation.html
 Tips: http://layout.jquery-dev.net/tips.html
 Help: http://groups.google.com/group/jquery-ui-layout
 */
(function (b) {
    var a = Math.min, d = Math.max, c = Math.floor, f = function (a) {
        return"string" === b.type(a)
    }, j = function (a, d) {
        if (b.isArray(d))for (var c = 0, j = d.length; c < j; c++) {
            var h = d[c];
            try {
                f(h) && (h = eval(h)), b.isFunction(h) && h(a)
            } catch (k) {
            }
        }
    };
    b.layout = {version: "1.3.rc30.79", revision: 0.033007, browser: {}, effects: {slide: {all: {duration: "fast"}, north: {direction: "up"}, south: {direction: "down"}, east: {direction: "right"}, west: {direction: "left"}}, drop: {all: {duration: "slow"}, north: {direction: "up"}, south: {direction: "down"}, east: {direction: "right"},
        west: {direction: "left"}}, scale: {all: {duration: "fast"}}, blind: {}, clip: {}, explode: {}, fade: {}, fold: {}, puff: {}, size: {all: {easing: "swing"}}}, config: {optionRootKeys: "effects panes north south west east center".split(" "), allPanes: ["north", "south", "west", "east", "center"], borderPanes: ["north", "south", "west", "east"], oppositeEdge: {north: "south", south: "north", east: "west", west: "east"}, offscreenCSS: {left: "-99999px", right: "auto"}, offscreenReset: "offscreenReset", hidden: {visibility: "hidden"}, visible: {visibility: "visible"},
        resizers: {cssReq: {position: "absolute", padding: 0, margin: 0, fontSize: "1px", textAlign: "left", overflow: "hidden"}, cssDemo: {background: "#DDD", border: "none"}}, togglers: {cssReq: {position: "absolute", display: "block", padding: 0, margin: 0, overflow: "hidden", textAlign: "center", fontSize: "1px", cursor: "pointer", zIndex: 1}, cssDemo: {background: "#AAA"}}, content: {cssReq: {position: "relative"}, cssDemo: {overflow: "auto", padding: "10px"}, cssDemoPane: {overflow: "hidden", padding: 0}}, panes: {cssReq: {position: "absolute", margin: 0}, cssDemo: {padding: "10px",
            background: "#FFF", border: "1px solid #BBB", overflow: "auto"}}, north: {side: "top", sizeType: "Height", dir: "horz", cssReq: {top: 0, bottom: "auto", left: 0, right: 0, width: "auto"}}, south: {side: "bottom", sizeType: "Height", dir: "horz", cssReq: {top: "auto", bottom: 0, left: 0, right: 0, width: "auto"}}, east: {side: "right", sizeType: "Width", dir: "vert", cssReq: {left: "auto", right: 0, top: "auto", bottom: "auto", height: "auto"}}, west: {side: "left", sizeType: "Width", dir: "vert", cssReq: {left: 0, right: "auto", top: "auto", bottom: "auto", height: "auto"}},
        center: {dir: "center", cssReq: {left: "auto", right: "auto", top: "auto", bottom: "auto", height: "auto", width: "auto"}}}, callbacks: {}, getParentPaneElem: function (a) {
        a = b(a);
        if (a = a.data("layout") || a.data("parentLayout")) {
            a = a.container;
            if (a.data("layoutPane"))return a;
            a = a.closest("." + b.layout.defaults.panes.paneClass);
            if (a.data("layoutPane"))return a
        }
        return null
    }, getParentPaneInstance: function (a) {
        return(a = b.layout.getParentPaneElem(a)) ? a.data("layoutPane") : null
    }, getParentLayoutInstance: function (a) {
        return(a = b.layout.getParentPaneElem(a)) ?
            a.data("parentLayout") : null
    }, getEventObject: function (b) {
        return"object" === typeof b && b.stopPropagation ? b : null
    }, parsePaneName: function (a) {
        var d = b.layout.getEventObject(a);
        d && (d.stopPropagation(), a = b(this).data("layoutEdge"));
        a && !/^(west|east|north|south|center)$/.test(a) && (b.layout.msg('LAYOUT ERROR - Invalid pane-name: "' + a + '"'), a = "error");
        return a
    }, plugins: {draggable: !!b.fn.draggable, effects: {core: !!b.effects, slide: b.effects && (b.effects.slide || b.effects.effect && b.effects.effect.slide)}}, onCreate: [],
        onLoad: [], onReady: [], onDestroy: [], onUnload: [], afterOpen: [], afterClose: [], scrollbarWidth: function () {
            return window.scrollbarWidth || b.layout.getScrollbarSize("width")
        }, scrollbarHeight: function () {
            return window.scrollbarHeight || b.layout.getScrollbarSize("height")
        }, getScrollbarSize: function (a) {
            var d = b('<div style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; overflow: scroll;"></div>').appendTo("body"), c = {width: d.css("width") - d[0].clientWidth, height: d.height() - d[0].clientHeight};
            d.remove();
            window.scrollbarWidth = c.width;
            window.scrollbarHeight = c.height;
            return a.match(/^(width|height)$/) ? c[a] : c
        }, showInvisibly: function (b, a) {
            if (b && b.length && (a || "none" === b.css("display"))) {
                var d = b[0].style, d = {display: d.display || "", visibility: d.visibility || ""};
                b.css({display: "block", visibility: "hidden"});
                return d
            }
            return{}
        }, getElementDimensions: function (a, c) {
            var f = {css: {}, inset: {}}, j = f.css, h = {bottom: 0}, k = b.layout.cssNum, p = a.offset(), O, R, D;
            f.offsetLeft = p.left;
            f.offsetTop = p.top;
            c || (c = {});
            b.each(["Left",
                "Right", "Top", "Bottom"], function (d, k) {
                O = j["border" + k] = b.layout.borderWidth(a, k);
                R = j["padding" + k] = b.layout.cssNum(a, "padding" + k);
                D = k.toLowerCase();
                f.inset[D] = 0 <= c[D] ? c[D] : R;
                h[D] = f.inset[D] + O
            });
            j.width = a.width();
            j.height = a.height();
            j.top = k(a, "top", !0);
            j.bottom = k(a, "bottom", !0);
            j.left = k(a, "left", !0);
            j.right = k(a, "right", !0);
            f.outerWidth = a.outerWidth();
            f.outerHeight = a.outerHeight();
            f.innerWidth = d(0, f.outerWidth - h.left - h.right);
            f.innerHeight = d(0, f.outerHeight - h.top - h.bottom);
            f.layoutWidth = a.innerWidth();
            f.layoutHeight = a.innerHeight();
            return f
        }, getElementStyles: function (b, a) {
            var d = {}, c = b[0].style, f = a.split(","), k = ["Top", "Bottom", "Left", "Right"], j = ["Color", "Style", "Width"], h, p, D, x, A, r;
            for (x = 0; x < f.length; x++)if (h = f[x], h.match(/(border|padding|margin)$/))for (A = 0; 4 > A; A++)if (p = k[A], "border" === h)for (r = 0; 3 > r; r++)D = j[r], d[h + p + D] = c[h + p + D]; else d[h + p] = c[h + p]; else d[h] = c[h];
            return d
        }, cssWidth: function (a, c) {
            if (0 >= c)return 0;
            var f = !b.layout.browser.boxModel ? "border-box" : b.support.boxSizing ? a.css("boxSizing") :
                "content-box", j = b.layout.borderWidth, h = b.layout.cssNum, k = c;
            "border-box" !== f && (k -= j(a, "Left") + j(a, "Right"));
            "content-box" === f && (k -= h(a, "paddingLeft") + h(a, "paddingRight"));
            return d(0, k)
        }, cssHeight: function (a, c) {
            if (0 >= c)return 0;
            var f = !b.layout.browser.boxModel ? "border-box" : b.support.boxSizing ? a.css("boxSizing") : "content-box", j = b.layout.borderWidth, h = b.layout.cssNum, k = c;
            "border-box" !== f && (k -= j(a, "Top") + j(a, "Bottom"));
            "content-box" === f && (k -= h(a, "paddingTop") + h(a, "paddingBottom"));
            return d(0, k)
        }, cssNum: function (a, d, c) {
            a.jquery || (a = b(a));
            var f = b.layout.showInvisibly(a);
            d = b.css(a[0], d, !0);
            c = c && "auto" == d ? d : Math.round(parseFloat(d) || 0);
            a.css(f);
            return c
        }, borderWidth: function (a, d) {
            a.jquery && (a = a[0]);
            var c = "border" + d.substr(0, 1).toUpperCase() + d.substr(1);
            return"none" === b.css(a, c + "Style", !0) ? 0 : Math.round(parseFloat(b.css(a, c + "Width", !0)) || 0)
        }, isMouseOverElem: function (a, d) {
            var c = b(d || this), f = c.offset(), j = f.top, f = f.left, k = f + c.outerWidth(), c = j + c.outerHeight(), h = a.pageX, p = a.pageY;
            return b.layout.browser.msie && 0 > h && 0 >
                p || h >= f && h <= k && p >= j && p <= c
        }, msg: function (a, d, c, f) {
            b.isPlainObject(a) && window.debugData ? ("string" === typeof d ? (f = c, c = d) : "object" === typeof c && (f = c, c = null), c = c || "log( <object> )", f = b.extend({sort: !1, returnHTML: !1, display: !1}, f), !0 === d || f.display ? debugData(a, c, f) : window.console && console.log(debugData(a, c, f))) : d ? alert(a) : window.console ? console.log(a) : (d = b("#layoutLogger"), d.length || (d = b('<div id="layoutLogger" style="position: ' + (b.support.fixedPosition ? "fixed" : "absolute") + '; top: 5px; z-index: 999999; max-width: 25%; overflow: hidden; border: 1px solid #000; border-radius: 5px; background: #FBFBFB; box-shadow: 0 2px 10px rgba(0,0,0,0.3);"><div style="font-size: 13px; font-weight: bold; padding: 5px 10px; background: #F6F6F6; border-radius: 5px 5px 0 0; cursor: move;"><span style="float: right; padding-left: 7px; cursor: pointer;" title="Remove Console" onclick="$(this).closest(\'#layoutLogger\').remove()">X</span>Layout console.log</div><ul style="font-size: 13px; font-weight: none; list-style: none; margin: 0; padding: 0 0 2px;"></ul></div>').appendTo("body"),
                d.css("left", b(window).width() - d.outerWidth() - 5), b.ui.draggable && d.draggable({handle: ":first-child"})), d.children("ul").append('<li style="padding: 4px 10px; margin: 0; border-top: 1px solid #CCC;">' + a.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") + "</li>"))
        }};
    var h = navigator.userAgent.toLowerCase(), p = /(chrome)[ \/]([\w.]+)/.exec(h) || /(webkit)[ \/]([\w.]+)/.exec(h) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(h) || /(msie) ([\w.]+)/.exec(h) || 0 > h.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(h) ||
        [], h = p[1] || "", p = p[2] || 0, x = "msie" === h;
    b.layout.browser = {version: p, safari: "webkit" === h, webkit: "chrome" === h, msie: x, isIE6: x && 6 == p, boxModel: !x || !1 !== b.support.boxModel};
    h && (b.layout.browser[h] = !0);
    x && b(function () {
        b.layout.browser.boxModel = b.support.boxModel
    });
    b.layout.defaults = {name: "", containerClass: "ui-layout-container", inset: null, scrollToBookmarkOnLoad: !0, resizeWithWindow: !0, resizeWithWindowDelay: 200, resizeWithWindowMaxDelay: 0, maskPanesEarly: !1, onresizeall_start: null, onresizeall_end: null, onload_start: null,
        onload_end: null, onunload_start: null, onunload_end: null, initPanes: !0, showErrorMessages: !0, showDebugMessages: !1, zIndex: null, zIndexes: {pane_normal: 0, content_mask: 1, resizer_normal: 2, pane_sliding: 100, pane_animate: 1E3, resizer_drag: 1E4}, errors: {pane: "pane", selector: "selector", addButtonError: "Error Adding Button\nInvalid ", containerMissing: "UI Layout Initialization Error\nThe specified layout-container does not exist.", centerPaneMissing: "UI Layout Initialization Error\nThe center-pane element does not exist.\nThe center-pane is a required element.",
            noContainerHeight: "UI Layout Initialization Warning\nThe layout-container \"CONTAINER\" has no height.\nTherefore the layout is 0-height and hence 'invisible'!", callbackError: "UI Layout Callback Error\nThe EVENT callback is not a valid function."}, panes: {applyDemoStyles: !1, closable: !0, resizable: !0, slidable: !0, initClosed: !1, initHidden: !1, contentSelector: ".ui-layout-content", contentIgnoreSelector: ".ui-layout-ignore", findNestedContent: !1, paneClass: "ui-layout-pane", resizerClass: "ui-layout-resizer", togglerClass: "ui-layout-toggler",
            buttonClass: "ui-layout-button", minSize: 0, maxSize: 0, spacing_open: 6, spacing_closed: 6, togglerLength_open: 50, togglerLength_closed: 50, togglerAlign_open: "center", togglerAlign_closed: "center", togglerContent_open: "", togglerContent_closed: "", resizerDblClickToggle: !0, autoResize: !0, autoReopen: !0, resizerDragOpacity: 1, maskContents: !1, maskObjects: !1, maskZindex: null, resizingGrid: !1, livePaneResizing: !1, liveContentResizing: !1, liveResizingTolerance: 1, sliderCursor: "pointer", slideTrigger_open: "click", slideTrigger_close: "mouseleave",
            slideDelay_open: 300, slideDelay_close: 300, hideTogglerOnSlide: !1, preventQuickSlideClose: b.layout.browser.webkit, preventPrematureSlideClose: !1, tips: {Open: "Open", Close: "Close", Resize: "Resize", Slide: "Slide Open", Pin: "Pin", Unpin: "Un-Pin", noRoomToOpen: "Not enough room to show this panel.", minSizeWarning: "Panel has reached its minimum size", maxSizeWarning: "Panel has reached its maximum size"}, showOverflowOnHover: !1, enableCursorHotkey: !0, customHotkeyModifier: "SHIFT", fxName: "slide", fxSpeed: null, fxSettings: {},
            fxOpacityFix: !0, animatePaneSizing: !1, children: null, containerSelector: "", initChildren: !0, destroyChildren: !0, resizeChildren: !0, triggerEventsOnLoad: !1, triggerEventsDuringLiveResize: !0, onshow_start: null, onshow_end: null, onhide_start: null, onhide_end: null, onopen_start: null, onopen_end: null, onclose_start: null, onclose_end: null, onresize_start: null, onresize_end: null, onsizecontent_start: null, onsizecontent_end: null, onswap_start: null, onswap_end: null, ondrag_start: null, ondrag_end: null}, north: {paneSelector: ".ui-layout-north",
            size: "auto", resizerCursor: "n-resize", customHotkey: ""}, south: {paneSelector: ".ui-layout-south", size: "auto", resizerCursor: "s-resize", customHotkey: ""}, east: {paneSelector: ".ui-layout-east", size: 200, resizerCursor: "e-resize", customHotkey: ""}, west: {paneSelector: ".ui-layout-west", size: 200, resizerCursor: "w-resize", customHotkey: ""}, center: {paneSelector: ".ui-layout-center", minWidth: 0, minHeight: 0}};
    b.layout.optionsMap = {layout: "name instanceKey stateManagement effects inset zIndexes errors zIndex scrollToBookmarkOnLoad showErrorMessages maskPanesEarly outset resizeWithWindow resizeWithWindowDelay resizeWithWindowMaxDelay onresizeall onresizeall_start onresizeall_end onload onload_start onload_end onunload onunload_start onunload_end".split(" "),
        center: "paneClass contentSelector contentIgnoreSelector findNestedContent applyDemoStyles triggerEventsOnLoad showOverflowOnHover maskContents maskObjects liveContentResizing containerSelector children initChildren resizeChildren destroyChildren onresize onresize_start onresize_end onsizecontent onsizecontent_start onsizecontent_end".split(" "), noDefault: ["paneSelector", "resizerCursor", "customHotkey"]};
    b.layout.transformData = function (a, d) {
        var c = d ? {panes: {}, center: {}} : {}, f, j, k, h, p, x, D;
        if ("object" !== typeof a)return c;
        for (j in a) {
            f = c;
            p = a[j];
            k = j.split("__");
            D = k.length - 1;
            for (x = 0; x <= D; x++)h = k[x], x === D ? f[h] = b.isPlainObject(p) ? b.layout.transformData(p) : p : (f[h] || (f[h] = {}), f = f[h])
        }
        return c
    };
    b.layout.backwardCompatibility = {map: {applyDefaultStyles: "applyDemoStyles", childOptions: "children", initChildLayout: "initChildren", destroyChildLayout: "destroyChildren", resizeChildLayout: "resizeChildren", resizeNestedLayout: "resizeChildren", resizeWhileDragging: "livePaneResizing", resizeContentWhileDragging: "liveContentResizing",
        triggerEventsWhileDragging: "triggerEventsDuringLiveResize", maskIframesOnResize: "maskContents", useStateCookie: "stateManagement.enabled", "cookie.autoLoad": "stateManagement.autoLoad", "cookie.autoSave": "stateManagement.autoSave", "cookie.keys": "stateManagement.stateKeys", "cookie.name": "stateManagement.cookie.name", "cookie.domain": "stateManagement.cookie.domain", "cookie.path": "stateManagement.cookie.path", "cookie.expires": "stateManagement.cookie.expires", "cookie.secure": "stateManagement.cookie.secure",
        noRoomToOpenTip: "tips.noRoomToOpen", togglerTip_open: "tips.Close", togglerTip_closed: "tips.Open", resizerTip: "tips.Resize", sliderTip: "tips.Slide"}, renameOptions: function (a) {
        function d(b, c) {
            for (var f = b.split("."), k = f.length - 1, j = {branch: a, key: f[k]}, r = 0, q; r < k; r++)q = f[r], j.branch = void 0 == j.branch[q] ? c ? j.branch[q] = {} : {} : j.branch[q];
            return j
        }

        var c = b.layout.backwardCompatibility.map, f, j, k, h;
        for (h in c)f = d(h), k = f.branch[f.key], void 0 !== k && (j = d(c[h], !0), j.branch[j.key] = k, delete f.branch[f.key])
    }, renameAllOptions: function (a) {
        var d =
            b.layout.backwardCompatibility.renameOptions;
        d(a);
        a.defaults && ("object" !== typeof a.panes && (a.panes = {}), b.extend(!0, a.panes, a.defaults), delete a.defaults);
        a.panes && d(a.panes);
        b.each(b.layout.config.allPanes, function (b, c) {
            a[c] && d(a[c])
        });
        return a
    }};
    b.fn.layout = function (h) {
        function p(e) {
            if (!e)return!0;
            var w = e.keyCode;
            if (33 > w)return!0;
            var m = {38: "north", 40: "south", 37: "west", 39: "east"}, a = e.shiftKey, g = e.ctrlKey, t, n, d, c;
            g && (37 <= w && 40 >= w) && r[m[w]].enableCursorHotkey ? c = m[w] : (g || a) && b.each(k.borderPanes, function (e, b) {
                t = r[b];
                n = t.customHotkey;
                d = t.customHotkeyModifier;
                if (a && "SHIFT" == d || g && "CTRL" == d || g && a)if (n && w === (isNaN(n) || 9 >= n ? n.toUpperCase().charCodeAt(0) : n))return c = b, !1
            });
            if (!c || !y[c] || !r[c].closable || q[c].isHidden)return!0;
            na(c);
            e.stopPropagation();
            return e.returnValue = !1
        }

        function x(e) {
            if (H()) {
                this && this.tagName && (e = this);
                var w;
                f(e) ? w = y[e] : b(e).data("layoutRole") ? w = b(e) : b(e).parents().each(function () {
                    if (b(this).data("layoutRole"))return w = b(this), !1
                });
                if (w && w.length) {
                    var m = w.data("layoutEdge");
                    e = q[m];
                    e.cssSaved &&
                    X(m);
                    if (e.isSliding || e.isResizing || e.isClosed)e.cssSaved = !1; else {
                        var a = {zIndex: r.zIndexes.resizer_normal + 1}, g = {}, t = w.css("overflow"), n = w.css("overflowX"), d = w.css("overflowY");
                        "visible" != t && (g.overflow = t, a.overflow = "visible");
                        n && !n.match(/(visible|auto)/) && (g.overflowX = n, a.overflowX = "visible");
                        d && !d.match(/(visible|auto)/) && (g.overflowY = n, a.overflowY = "visible");
                        e.cssSaved = g;
                        w.css(a);
                        b.each(k.allPanes, function (e, b) {
                            b != m && X(b)
                        })
                    }
                }
            }
        }

        function X(e) {
            if (H()) {
                this && this.tagName && (e = this);
                var w;
                f(e) ? w = y[e] :
                    b(e).data("layoutRole") ? w = b(e) : b(e).parents().each(function () {
                        if (b(this).data("layoutRole"))return w = b(this), !1
                    });
                if (w && w.length) {
                    e = w.data("layoutEdge");
                    e = q[e];
                    var m = e.cssSaved || {};
                    !e.isSliding && !e.isResizing && w.css("zIndex", r.zIndexes.pane_normal);
                    w.css(m);
                    e.cssSaved = !1
                }
            }
        }

        var G = b.layout.browser, k = b.layout.config, Q = b.layout.cssWidth, O = b.layout.cssHeight, R = b.layout.getElementDimensions, D = b.layout.getElementStyles, Ma = b.layout.getEventObject, A = b.layout.parsePaneName, r = b.extend(!0, {}, b.layout.defaults);
        r.effects = b.extend(!0, {}, b.layout.effects);
        var q = {id: "layout" + b.now(), initialized: !1, paneResizing: !1, panesSliding: {}, container: {innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0, layoutWidth: 0, layoutHeight: 0}, north: {childIdx: 0}, south: {childIdx: 0}, east: {childIdx: 0}, west: {childIdx: 0}, center: {childIdx: 0}}, ba = {north: null, south: null, east: null, west: null, center: null}, M = {data: {}, set: function (e, b, m) {
                M.clear(e);
                M.data[e] = setTimeout(b, m)
            }, clear: function (e) {
                var b = M.data;
                b[e] && (clearTimeout(b[e]), delete b[e])
            }},
            ca = function (e, w, m) {
                var a = r;
                (a.showErrorMessages && !m || m && a.showDebugMessages) && b.layout.msg(a.name + " / " + e, !1 !== w);
                return!1
            }, C = function (e, w, m) {
                var a = w && f(w), g = a ? q[w] : q, t = a ? r[w] : r, n = r.name, d = e + (e.match(/_/) ? "" : "_end"), c = d.match(/_end$/) ? d.substr(0, d.length - 4) : "", l = t[d] || t[c], h = "NC", k = [];
                !a && "boolean" === b.type(w) && (m = w, w = "");
                if (l)try {
                    f(l) && (l.match(/,/) ? (k = l.split(","), l = eval(k[0])) : l = eval(l)), b.isFunction(l) && (h = k.length ? l(k[1]) : a ? l(w, y[w], g, t, n) : l(z, g, t, n))
                } catch (j) {
                    ca(r.errors.callbackError.replace(/EVENT/,
                        b.trim((w || "") + " " + d)), !1), "string" === b.type(j) && string.length && ca("Exception:  " + j, !1)
                }
                !m && !1 !== h && (a ? (m = y[w], t = r[w], g = q[w], m.triggerHandler("layoutpane" + d, [w, m, g, t, n]), c && m.triggerHandler("layoutpane" + c, [w, m, g, t, n])) : (u.triggerHandler("layout" + d, [z, g, t, n]), c && u.triggerHandler("layout" + c, [z, g, t, n])));
                a && "onresize_end" === e && db(w + "", !0);
                return h
            }, eb = function (e) {
                if (!G.mozilla) {
                    var b = y[e];
                    "IFRAME" === q[e].tagName ? b.css(k.hidden).css(k.visible) : b.find("IFRAME").css(k.hidden).css(k.visible)
                }
            }, ya = function (e) {
                var b =
                    y[e];
                e = k[e].dir;
                b = {minWidth: 1001 - Q(b, 1E3), minHeight: 1001 - O(b, 1E3)};
                "horz" === e && (b.minSize = b.minHeight);
                "vert" === e && (b.minSize = b.minWidth);
                return b
            }, fa = function (e, w, m) {
                m || (m = k[e].dir);
                f(w) && w.match(/%/) && (w = "100%" === w ? -1 : parseInt(w, 10) / 100);
                if (0 === w)return 0;
                if (1 <= w)return parseInt(w, 10);
                var a = r, g = 0;
                "horz" == m ? g = v.innerHeight - (y.north ? a.north.spacing_open : 0) - (y.south ? a.south.spacing_open : 0) : "vert" == m && (g = v.innerWidth - (y.west ? a.west.spacing_open : 0) - (y.east ? a.east.spacing_open : 0));
                if (-1 === w)return g;
                if (0 < w)return c(g * w);
                if ("center" == e)return 0;
                m = "horz" === m ? "height" : "width";
                a = y[e];
                e = "height" === m ? U[e] : !1;
                var g = b.layout.showInvisibly(a), t = a.css(m), n = e ? e.css(m) : 0;
                a.css(m, "auto");
                e && e.css(m, "auto");
                w = "height" === m ? a.outerHeight() : a.outerWidth();
                a.css(m, t).css(g);
                e && e.css(m, n);
                return w
            }, ga = function (e, b) {
                var a = y[e], E = r[e], g = q[e], t = b ? E.spacing_open : 0, E = b ? E.spacing_closed : 0;
                return!a || g.isHidden ? 0 : g.isClosed || g.isSliding && b ? E : "horz" === k[e].dir ? a.outerHeight() + t : a.outerWidth() + t
            }, Y = function (e, b) {
                if (H()) {
                    var m =
                        r[e], E = q[e], g = k[e], t = g.dir;
                    g.sizeType.toLowerCase();
                    var g = void 0 != b ? b : E.isSliding, n = m.spacing_open, c = k.oppositeEdge[e], f = q[c], l = y[c], h = !l || !1 === f.isVisible || f.isSliding ? 0 : "horz" == t ? l.outerHeight() : l.outerWidth(), c = (!l || f.isHidden ? 0 : r[c][!1 !== f.isClosed ? "spacing_closed" : "spacing_open"]) || 0, f = "horz" == t ? v.innerHeight : v.innerWidth, l = ya("center"), l = "horz" == t ? d(r.center.minHeight, l.minHeight) : d(r.center.minWidth, l.minWidth), g = f - n - (g ? 0 : fa("center", l, t) + h + c), t = E.minSize = d(fa(e, m.minSize), ya(e).minSize), g =
                        E.maxSize = a(m.maxSize ? fa(e, m.maxSize) : 1E5, g), E = E.resizerPosition = {}, n = v.inset.top, h = v.inset.left, c = v.innerWidth, f = v.innerHeight, m = m.spacing_open;
                    switch (e) {
                        case "north":
                            E.min = n + t;
                            E.max = n + g;
                            break;
                        case "west":
                            E.min = h + t;
                            E.max = h + g;
                            break;
                        case "south":
                            E.min = n + f - g - m;
                            E.max = n + f - t - m;
                            break;
                        case "east":
                            E.min = h + c - g - m, E.max = h + c - t - m
                    }
                }
            }, Na = function (e, a) {
                var m = b(e), E = m.data("layoutRole"), g = m.data("layoutEdge"), t = r[g][E + "Class"], g = "-" + g, n = m.hasClass(t + "-closed") ? "-closed" : "-open", d = "-closed" === n ? "-open" : "-closed", n =
                    t + "-hover " + (t + g + "-hover ") + (t + n + "-hover ") + (t + g + n + "-hover ");
                a && (n += t + d + "-hover " + (t + g + d + "-hover "));
                "resizer" == E && m.hasClass(t + "-sliding") && (n += t + "-sliding-hover " + (t + g + "-sliding-hover "));
                return b.trim(n)
            }, Oa = function (e, a) {
                var m = b(a || this);
                e && "toggler" === m.data("layoutRole") && e.stopPropagation();
                m.addClass(Na(m))
            }, da = function (e, a) {
                var m = b(a || this);
                m.removeClass(Na(m, !0))
            }, fb = function () {
                var e = b(this).data("layoutEdge"), a = q[e];
                !a.isClosed && (!a.isResizing && !q.paneResizing) && (b.fn.disableSelection &&
                    b("body").disableSelection(), r.maskPanesEarly && va(e, {resizing: !0}))
            }, gb = function (e, a) {
                var m = a || this, E = b(m).data("layoutEdge"), g = E + "ResizerLeave";
                M.clear(E + "_openSlider");
                M.clear(g);
                a ? q.paneResizing || (b.fn.enableSelection && b("body").enableSelection(), r.maskPanesEarly && za()) : M.set(g, function () {
                    gb(e, m)
                }, 200)
            }, H = function () {
                return q.initialized || q.creatingLayout ? !0 : Aa()
            }, Aa = function (e) {
                var a = r;
                if (!u.is(":visible"))return!e && (G.webkit && "BODY" === u[0].tagName) && setTimeout(function () {
                    Aa(!0)
                }, 50), !1;
                if (!hb("center").length)return ca(a.errors.centerPaneMissing);
                q.creatingLayout = !0;
                b.extend(v, R(u, a.inset));
                A(void 0);
                b.each(k.allPanes, function (e, b) {
                    ib(b, !0)
                });
                Pa();
                b.each(k.borderPanes, function (e, b) {
                    y[b] && q[b].isVisible && (Y(b), ha(b))
                });
                ia("center");
                b.each(k.allPanes, function (e, b) {
                    jb(b)
                });
                a.scrollToBookmarkOnLoad && (e = self.location, e.hash && e.replace(e.hash));
                z.hasParentLayout ? a.resizeWithWindow = !1 : a.resizeWithWindow && b(window).bind("resize." + K, Ab);
                delete q.creatingLayout;
                q.initialized = !0;
                j(z, b.layout.onReady);
                C("onload_end");
                return!0
            }, Qa = function (e, a) {
                var m =
                    A.call(this, e), d = y[m];
                if (d) {
                    var g = U[m], t = q[m], n = r[m], c = r.stateManagement || {}, n = a ? n.children = a : n.children;
                    if (b.isPlainObject(n))n = [n]; else if (!n || !b.isArray(n))return;
                    b.each(n, function (e, a) {
                        b.isPlainObject(a) && (a.containerSelector ? d.find(a.containerSelector) : g || d).each(function () {
                            var e = b(this), g = e.data("layout");
                            if (!g) {
                                kb({container: e, options: a}, t);
                                if (c.includeChildren && q.stateData[m]) {
                                    var g = (q.stateData[m].children || {})[a.instanceKey], w = a.stateManagement || (a.stateManagement = {autoLoad: !0});
                                    !0 === w.autoLoad &&
                                        g && (w.autoSave = !1, w.includeChildren = !0, w.autoLoad = b.extend(!0, {}, g))
                                }
                                (g = e.layout(a)) && Ba(m, g)
                            }
                        })
                    })
                }
            }, kb = function (e, b) {
                var a = e.container, d = e.options, g = d.stateManagement, t = d.instanceKey || a.data("layoutInstanceKey");
                t || (t = (g && g.cookie ? g.cookie.name : "") || d.name);
                t = t ? t.replace(/[^\w-]/gi, "_").replace(/_{2,}/g, "_") : "layout" + ++b.childIdx;
                d.instanceKey = t;
                a.data("layoutInstanceKey", t);
                return t
            }, Ba = function (e, a) {
                var m = y[e], d = ba[e], g = q[e];
                b.isPlainObject(d) && (b.each(d, function (e, b) {
                    b.destroyed && delete d[e]
                }),
                    b.isEmptyObject(d) && (d = ba[e] = null));
                !a && !d && (a = m.data("layout"));
                a && (a.hasParentLayout = !0, m = a.options, kb(a, g), d || (d = ba[e] = {}), d[m.instanceKey] = a.container.data("layout"));
                z[e].children = ba[e];
                a || Qa(e)
            }, Ab = function () {
                var e = r, b = Number(e.resizeWithWindowDelay);
                10 > b && (b = 100);
                M.clear("winResize");
                M.set("winResize", function () {
                    M.clear("winResize");
                    M.clear("winResizeRepeater");
                    var b = R(u, e.inset);
                    (b.innerWidth !== v.innerWidth || b.innerHeight !== v.innerHeight) && oa()
                }, b);
                M.data.winResizeRepeater || lb()
            }, lb = function () {
                var e =
                    Number(r.resizeWithWindowMaxDelay);
                0 < e && M.set("winResizeRepeater", function () {
                    lb();
                    oa()
                }, e)
            }, mb = function () {
                C("onunload_start");
                j(z, b.layout.onUnload);
                C("onunload_end")
            }, nb = function (e) {
                e = e ? e.split(",") : k.borderPanes;
                b.each(e, function (e, a) {
                    var d = r[a];
                    if (d.enableCursorHotkey || d.customHotkey)return b(document).bind("keydown." + K, p), !1
                })
            }, hb = function (e) {
                e = r[e].paneSelector;
                if ("#" === e.substr(0, 1))return u.find(e).eq(0);
                var b = u.children(e).eq(0);
                return b.length ? b : u.children("form:first").children(e).eq(0)
            },
            ib = function (e, b) {
                if (b || H()) {
                    var m = r[e], c = q[e], g = k[e], t = g.dir, n = "center" === e, f = {}, h = y[e], l, j;
                    h ? Ra(e, !1, !0, !1) : U[e] = !1;
                    h = y[e] = hb(e);
                    if (h.length) {
                        h.data("layoutCSS") || h.data("layoutCSS", D(h, "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border"));
                        z[e] = {name: e, pane: y[e], content: U[e], options: r[e], state: q[e], children: ba[e]};
                        h.data({parentLayout: z, layoutPane: z[e], layoutEdge: e, layoutRole: "pane"}).css(g.cssReq).css("zIndex", r.zIndexes.pane_normal).css(m.applyDemoStyles ?
                            g.cssDemo : {}).addClass(m.paneClass + " " + m.paneClass + "-" + e).bind("mouseenter." + K, Oa).bind("mouseleave." + K, da);
                        g = {hide: "", show: "", toggle: "", close: "", open: "", slideOpen: "", slideClose: "", slideToggle: "", size: "sizePane", sizePane: "sizePane", sizeContent: "", sizeHandles: "", enableClosable: "", disableClosable: "", enableSlideable: "", disableSlideable: "", enableResizable: "", disableResizable: "", swapPanes: "swapPanes", swap: "swapPanes", move: "swapPanes", removePane: "removePane", remove: "removePane", createChildren: "", resizeChildren: "",
                            resizeAll: "resizeAll", resizeLayout: "resizeAll"};
                        for (j in g)h.bind("layoutpane" + j.toLowerCase() + "." + K, z[g[j] || j]);
                        Sa(e, !1);
                        n || (l = c.size = fa(e, m.size), n = fa(e, m.minSize) || 1, j = fa(e, m.maxSize) || 1E5, 0 < l && (l = d(a(l, j), n)), c.autoResize = m.autoResize, c.isClosed = !1, c.isSliding = !1, c.isResizing = !1, c.isHidden = !1, c.pins || (c.pins = []));
                        c.tagName = h[0].tagName;
                        c.edge = e;
                        c.noRoom = !1;
                        c.isVisible = !0;
                        ob(e);
                        "horz" === t ? f.height = O(h, l) : "vert" === t && (f.width = Q(h, l));
                        h.css(f);
                        "horz" != t && ia(e, !0);
                        q.initialized && (Pa(e), nb(e));
                        m.initClosed &&
                            m.closable && !m.initHidden ? ja(e, !0, !0) : m.initHidden || m.initClosed ? Ta(e) : c.noRoom || h.css("display", "block");
                        h.css("visibility", "visible");
                        m.showOverflowOnHover && h.hover(x, X);
                        q.initialized && jb(e)
                    } else y[e] = !1
                }
            }, jb = function (e) {
                var b = y[e], a = q[e], d = r[e];
                b && (b.data("layout") && Ba(e, b.data("layout")), a.isVisible && (q.initialized ? oa() : pa(e), d.triggerEventsOnLoad ? C("onresize_end", e) : db(e, !0)), d.initChildren && d.children && Qa(e))
            }, ob = function (e) {
                e = e ? e.split(",") : k.borderPanes;
                b.each(e, function (e, b) {
                    var a = y[b], g =
                        F[b], d = q[b], c = k[b].side, f = {};
                    if (a) {
                        switch (b) {
                            case "north":
                                f.top = v.inset.top;
                                f.left = v.inset.left;
                                f.right = v.inset.right;
                                break;
                            case "south":
                                f.bottom = v.inset.bottom;
                                f.left = v.inset.left;
                                f.right = v.inset.right;
                                break;
                            case "west":
                                f.left = v.inset.left;
                                break;
                            case "east":
                                f.right = v.inset.right
                        }
                        a.css(f);
                        g && d.isClosed ? g.css(c, v.inset[c]) : g && !d.isHidden && g.css(c, v.inset[c] + ga(b))
                    }
                })
            }, Pa = function (e) {
                e = e ? e.split(",") : k.borderPanes;
                b.each(e, function (e, a) {
                    var d = y[a];
                    F[a] = !1;
                    P[a] = !1;
                    if (d) {
                        var g = r[a], d = q[a], c = "#" === g.paneSelector.substr(0,
                            1) ? g.paneSelector.substr(1) : "", n = g.resizerClass, f = g.togglerClass, h = "-" + a, l = z[a], j = l.resizer = F[a] = b("<div></div>"), l = l.toggler = g.closable ? P[a] = b("<div></div>") : !1;
                        !d.isVisible && g.slidable && j.attr("title", g.tips.Slide).css("cursor", g.sliderCursor);
                        j.attr("id", c ? c + "-resizer" : "").data({parentLayout: z, layoutPane: z[a], layoutEdge: a, layoutRole: "resizer"}).css(k.resizers.cssReq).css("zIndex", r.zIndexes.resizer_normal).css(g.applyDemoStyles ? k.resizers.cssDemo : {}).addClass(n + " " + n + h).hover(Oa, da).hover(fb, gb).appendTo(u);
                        g.resizerDblClickToggle && j.bind("dblclick." + K, na);
                        l && (l.attr("id", c ? c + "-toggler" : "").data({parentLayout: z, layoutPane: z[a], layoutEdge: a, layoutRole: "toggler"}).css(k.togglers.cssReq).css(g.applyDemoStyles ? k.togglers.cssDemo : {}).addClass(f + " " + f + h).hover(Oa, da).bind("mouseenter", fb).appendTo(j), g.togglerContent_open && b("<span>" + g.togglerContent_open + "</span>").data({layoutEdge: a, layoutRole: "togglerContent"}).data("layoutRole", "togglerContent").data("layoutEdge", a).addClass("content content-open").css("display",
                            "none").appendTo(l), g.togglerContent_closed && b("<span>" + g.togglerContent_closed + "</span>").data({layoutEdge: a, layoutRole: "togglerContent"}).addClass("content content-closed").css("display", "none").appendTo(l), pb(a));
                        var g = a, B = b.layout.plugins.draggable, g = g ? g.split(",") : k.borderPanes;
                        b.each(g, function (e, a) {
                            var g = r[a];
                            if (!B || !y[a] || !g.resizable)return g.resizable = !1, !0;
                            var m = q[a], w = r.zIndexes, d = k[a], c = "horz" == d.dir ? "top" : "left", t = F[a], n = g.resizerClass, f = 0, l, h, E = n + "-drag", j = n + "-" + a + "-drag", J = n + "-dragging",
                                zb = n + "-" + a + "-dragging", cb = n + "-dragging-limit", v = n + "-" + a + "-dragging-limit", x = !1;
                            m.isClosed || t.attr("title", g.tips.Resize).css("cursor", g.resizerCursor);
                            t.draggable({containment: u[0], axis: "horz" == d.dir ? "y" : "x", delay: 0, distance: 1, grid: g.resizingGrid, helper: "clone", opacity: g.resizerDragOpacity, addClasses: !1, zIndex: w.resizer_drag, start: function (e, w) {
                                g = r[a];
                                m = q[a];
                                h = g.livePaneResizing;
                                if (!1 === C("ondrag_start", a))return!1;
                                m.isResizing = !0;
                                q.paneResizing = a;
                                M.clear(a + "_closeSlider");
                                Y(a);
                                l = m.resizerPosition;
                                f = w.position[c];
                                t.addClass(E + " " + j);
                                x = !1;
                                b("body").disableSelection();
                                va(a, {resizing: !0})
                            }, drag: function (e, b) {
                                x || (b.helper.addClass(J + " " + zb).css({right: "auto", bottom: "auto"}).children().css("visibility", "hidden"), x = !0, m.isSliding && y[a].css("zIndex", w.pane_sliding));
                                var d = 0;
                                b.position[c] < l.min ? (b.position[c] = l.min, d = -1) : b.position[c] > l.max && (b.position[c] = l.max, d = 1);
                                d ? (b.helper.addClass(cb + " " + v), window.defaultStatus = 0 < d && a.match(/(north|west)/) || 0 > d && a.match(/(south|east)/) ? g.tips.maxSizeWarning :
                                    g.tips.minSizeWarning) : (b.helper.removeClass(cb + " " + v), window.defaultStatus = "");
                                h && Math.abs(b.position[c] - f) >= g.liveResizingTolerance && (f = b.position[c], p(e, b, a))
                            }, stop: function (e, g) {
                                b("body").enableSelection();
                                window.defaultStatus = "";
                                t.removeClass(E + " " + j);
                                m.isResizing = !1;
                                q.paneResizing = !1;
                                p(e, g, a, !0)
                            }})
                        });
                        var p = function (b, e, a, g) {
                            var m = e.position, w = k[a];
                            b = r[a];
                            e = q[a];
                            var d;
                            switch (a) {
                                case "north":
                                    d = m.top;
                                    break;
                                case "west":
                                    d = m.left;
                                    break;
                                case "south":
                                    d = v.layoutHeight - m.top - b.spacing_open;
                                    break;
                                case "east":
                                    d =
                                        v.layoutWidth - m.left - b.spacing_open
                            }
                            d -= v.inset[w.side];
                            g ? (!1 !== C("ondrag_end", a) && Ca(a, d, !1, !0), za(!0), e.isSliding && va(a, {resizing: !0})) : Math.abs(d - e.size) < b.liveResizingTolerance || (Ca(a, d, !1, !0), ea.each(qb))
                        };
                        d.isVisible ? Ua(a) : (Da(a), ma(a, !0))
                    }
                });
                qa()
            }, Sa = function (b, a) {
                if (H()) {
                    var m = r[b], d = m.contentSelector, g = z[b], c = y[b], n;
                    d && (n = g.content = U[b] = m.findNestedContent ? c.find(d).eq(0) : c.children(d).eq(0));
                    n && n.length ? (n.data("layoutRole", "content"), n.data("layoutCSS") || n.data("layoutCSS", D(n, "height")),
                        n.css(k.content.cssReq), m.applyDemoStyles && (n.css(k.content.cssDemo), c.css(k.content.cssDemoPane)), c.css("overflowX").match(/(scroll|auto)/) && c.css("overflow", "hidden"), q[b].content = {}, !1 !== a && pa(b)) : g.content = U[b] = !1
                }
            }, qb = function () {
                var e = b(this), a = e.data("layoutMask"), a = q[a];
                "IFRAME" == a.tagName && a.isVisible && e.css({top: a.offsetTop, left: a.offsetLeft, width: a.outerWidth, height: a.outerHeight})
            }, va = function (e, a) {
                var m = k[e], d = ["center"], g = r.zIndexes, c = b.extend({objectsOnly: !1, animation: !1, resizing: !0,
                    sliding: q[e].isSliding}, a), n, f;
                c.resizing && d.push(e);
                c.sliding && d.push(k.oppositeEdge[e]);
                "horz" === m.dir && (d.push("west"), d.push("east"));
                b.each(d, function (e, a) {
                    f = q[a];
                    n = r[a];
                    if (f.isVisible && (n.maskObjects || !c.objectsOnly && n.maskContents)) {
                        for (var m = b([]), d, w = 0, h = ea.length; w < h; w++)d = ea.eq(w), d.data("layoutMask") === a && (m = m.add(d));
                        if (!m.length) {
                            m = y[a];
                            d = q[a];
                            var w = r[a], h = r.zIndexes, j = b([]), E, k, v, p, x;
                            if (w.maskContents || w.maskObjects)for (x = 0; x < (w.maskObjects ? 2 : 1); x++)E = w.maskObjects && 0 == x, k = document.createElement(E ?
                                "iframe" : "div"), v = b(k).data("layoutMask", a), k.className = "ui-layout-mask ui-layout-mask-" + a, p = k.style, p.display = "block", p.position = "absolute", p.background = "#FFF", E && (k.frameborder = 0, k.src = "about:blank", p.opacity = 0, p.filter = "Alpha(Opacity='0')", p.border = 0), "IFRAME" == d.tagName ? (p.zIndex = h.pane_normal + 1, u.append(k)) : (v.addClass("ui-layout-mask-inside-pane"), p.zIndex = w.maskZindex || h.content_mask, p.top = 0, p.left = 0, p.width = "100%", p.height = "100%", m.append(k)), j = j.add(k), ea = ea.add(k);
                            m = j
                        }
                        m.each(function () {
                            qb.call(this);
                            this.style.zIndex = f.isSliding ? g.pane_sliding + 1 : g.pane_normal + 1;
                            this.style.display = "block"
                        })
                    }
                })
            }, za = function (a) {
                if (a || !q.paneResizing)ea.hide(); else if (!a && !b.isEmptyObject(q.panesSliding)) {
                    a = ea.length - 1;
                    for (var d, m; 0 <= a; a--)m = ea.eq(a), d = m.data("layoutMask"), r[d].maskObjects || m.hide()
                }
            }, Ra = function (a, d, m, c) {
                if (H()) {
                    a = A.call(this, a);
                    var g = y[a], t = U[a], n = F[a], f = P[a];
                    g && b.isEmptyObject(g.data()) && (g = !1);
                    t && b.isEmptyObject(t.data()) && (t = !1);
                    n && b.isEmptyObject(n.data()) && (n = !1);
                    f && b.isEmptyObject(f.data()) &&
                    (f = !1);
                    g && g.stop(!0, !0);
                    var h = r[a], l = ba[a], j = b.isPlainObject(l) && !b.isEmptyObject(l);
                    c = void 0 !== c ? c : h.destroyChildren;
                    j && c && (b.each(l, function (a, b) {
                        b.destroyed || b.destroy(!0);
                        b.destroyed && delete l[a]
                    }), b.isEmptyObject(l) && (l = ba[a] = null, j = !1));
                    g && d && !j ? g.remove() : g && g[0] && (d = h.paneClass, c = d + "-" + a, d = [d, d + "-open", d + "-closed", d + "-sliding", c, c + "-open", c + "-closed", c + "-sliding"], b.merge(d, Na(g, !0)), g.removeClass(d.join(" ")).removeData("parentLayout").removeData("layoutPane").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." +
                        K), j && t ? (t.width(t.width()), b.each(l, function (a, b) {
                        b.resizeAll()
                    })) : t && t.css(t.data("layoutCSS")).removeData("layoutCSS").removeData("layoutRole"), g.data("layout") || g.css(g.data("layoutCSS")).removeData("layoutCSS"));
                    f && f.remove();
                    n && n.remove();
                    z[a] = y[a] = U[a] = F[a] = P[a] = !1;
                    m || oa()
                }
            }, Ea = function (a) {
                var b = y[a], d = b[0].style;
                r[a].useOffscreenClose ? (b.data(k.offscreenReset) || b.data(k.offscreenReset, {left: d.left, right: d.right}), b.css(k.offscreenCSS)) : b.hide().removeData(k.offscreenReset)
            }, rb = function (a) {
                var b =
                    y[a];
                a = r[a];
                var d = k.offscreenCSS, c = b.data(k.offscreenReset), g = b[0].style;
                b.show().removeData(k.offscreenReset);
                a.useOffscreenClose && c && (g.left == d.left && (g.left = c.left), g.right == d.right && (g.right = c.right))
            }, Ta = function (a, b) {
                if (H()) {
                    var d = A.call(this, a), c = r[d], g = q[d], t = F[d];
                    y[d] && !g.isHidden && !(q.initialized && !1 === C("onhide_start", d)) && (g.isSliding = !1, delete q.panesSliding[d], t && t.hide(), !q.initialized || g.isClosed ? (g.isClosed = !0, g.isHidden = !0, g.isVisible = !1, q.initialized || Ea(d), ia("horz" === k[d].dir ?
                        "" : "center"), (q.initialized || c.triggerEventsOnLoad) && C("onhide_end", d)) : (g.isHiding = !0, ja(d, !1, b)))
                }
            }, Fa = function (a, b, d, c) {
                if (H()) {
                    a = A.call(this, a);
                    var g = q[a];
                    y[a] && g.isHidden && !1 !== C("onshow_start", a) && (g.isShowing = !0, g.isSliding = !1, delete q.panesSliding[a], !1 === b ? ja(a, !0) : ra(a, !1, d, c))
                }
            }, na = function (a, b) {
                if (H()) {
                    var d = Ma(a), c = A.call(this, a), g = q[c];
                    d && d.stopImmediatePropagation();
                    g.isHidden ? Fa(c) : g.isClosed ? ra(c, !!b) : ja(c)
                }
            }, ja = function (a, b, d, c) {
                function g() {
                    l.isMoving = !1;
                    ma(t, !0);
                    var a = k.oppositeEdge[t];
                    q[a].noRoom && (Y(a), ha(a));
                    if (!c && (q.initialized || h.triggerEventsOnLoad))p || C("onclose_end", t), p && C("onshow_end", t), v && C("onhide_end", t)
                }

                var t = A.call(this, a);
                if (!q.initialized && y[t]) {
                    a = t;
                    var n = q[a];
                    Ea(a);
                    n.isClosed = !0;
                    n.isVisible = !1;
                    Da(a)
                } else if (H()) {
                    var f = y[t], h = r[t], l = q[t], j, p, v;
                    u.queue(function (a) {
                        if (!f || !h.closable && !l.isShowing && !l.isHiding || !b && l.isClosed && !l.isShowing)return a();
                        var e = !l.isShowing && !1 === C("onclose_start", t);
                        p = l.isShowing;
                        v = l.isHiding;
                        delete l.isShowing;
                        delete l.isHiding;
                        if (e)return a();
                        j = !d && !l.isClosed && "none" != h.fxName_close;
                        l.isMoving = !0;
                        l.isClosed = !0;
                        l.isVisible = !1;
                        v ? l.isHidden = !0 : p && (l.isHidden = !1);
                        l.isSliding ? wa(t, !1) : ia("horz" === k[t].dir ? "" : "center", !1);
                        Da(t);
                        j ? (Ga(t, !0), f.hide(h.fxName_close, h.fxSettings_close, h.fxSpeed_close, function () {
                            Ga(t, !1);
                            l.isClosed && g();
                            a()
                        })) : (Ea(t), g(), a())
                    })
                }
            }, Da = function (a) {
                if (F[a]) {
                    var d = F[a], c = P[a], f = r[a], g = k[a].side, t = f.resizerClass, n = f.togglerClass, h = "-" + a;
                    d.css(g, v.inset[g]).removeClass(t + "-open " + t + h + "-open").removeClass(t + "-sliding " +
                        t + h + "-sliding").addClass(t + "-closed " + t + h + "-closed");
                    f.resizable && b.layout.plugins.draggable && d.draggable("disable").removeClass("ui-state-disabled").css("cursor", "default").attr("title", "");
                    c && (c.removeClass(n + "-open " + n + h + "-open").addClass(n + "-closed " + n + h + "-closed").attr("title", f.tips.Open), c.children(".content-open").hide(), c.children(".content-closed").css("display", "block"));
                    Va(a, !1);
                    q.initialized && qa()
                }
            }, ra = function (a, b, d, c) {
                function g() {
                    j.isMoving = !1;
                    eb(f);
                    j.isSliding || ia("vert" == k[f].dir ?
                        "center" : "", !1);
                    Ua(f)
                }

                if (H()) {
                    var f = A.call(this, a), n = y[f], h = r[f], j = q[f], l, p;
                    u.queue(function (a) {
                        if (!n || !h.resizable && !h.closable && !j.isShowing || j.isVisible && !j.isSliding)return a();
                        if (j.isHidden && !j.isShowing)a(), Fa(f, !0); else {
                            j.autoResize && j.size != h.size ? ka(f, h.size, !0, !0, !0) : Y(f, b);
                            var e = C("onopen_start", f);
                            if ("abort" === e)return a();
                            "NC" !== e && Y(f, b);
                            if (j.minSize > j.maxSize)return Va(f, !1), !c && h.tips.noRoomToOpen && alert(h.tips.noRoomToOpen), a();
                            b ? wa(f, !0) : j.isSliding ? wa(f, !1) : h.slidable && ma(f, !1);
                            j.noRoom = !1;
                            ha(f);
                            p = j.isShowing;
                            delete j.isShowing;
                            l = !d && j.isClosed && "none" != h.fxName_open;
                            j.isMoving = !0;
                            j.isVisible = !0;
                            j.isClosed = !1;
                            p && (j.isHidden = !1);
                            l ? (Ga(f, !0), n.show(h.fxName_open, h.fxSettings_open, h.fxSpeed_open, function () {
                                Ga(f, !1);
                                j.isVisible && g();
                                a()
                            })) : (rb(f), g(), a())
                        }
                    })
                }
            }, Ua = function (a, d) {
                var c = y[a], f = F[a], g = P[a], h = r[a], n = q[a], j = k[a].side, p = h.resizerClass, l = h.togglerClass, u = "-" + a;
                f.css(j, v.inset[j] + ga(a)).removeClass(p + "-closed " + p + u + "-closed").addClass(p + "-open " + p + u + "-open");
                n.isSliding ?
                    f.addClass(p + "-sliding " + p + u + "-sliding") : f.removeClass(p + "-sliding " + p + u + "-sliding");
                da(0, f);
                h.resizable && b.layout.plugins.draggable ? f.draggable("enable").css("cursor", h.resizerCursor).attr("title", h.tips.Resize) : n.isSliding || f.css("cursor", "default");
                g && (g.removeClass(l + "-closed " + l + u + "-closed").addClass(l + "-open " + l + u + "-open").attr("title", h.tips.Close), da(0, g), g.children(".content-closed").hide(), g.children(".content-open").css("display", "block"));
                Va(a, !n.isSliding);
                b.extend(n, R(c));
                q.initialized &&
                (qa(), pa(a, !0));
                if (!d && (q.initialized || h.triggerEventsOnLoad) && c.is(":visible"))C("onopen_end", a), n.isShowing && C("onshow_end", a), q.initialized && C("onresize_end", a)
            }, sb = function (a) {
                function b() {
                    g.isClosed ? g.isMoving || ra(c, !0) : wa(c, !0)
                }

                if (H()) {
                    var d = Ma(a), c = A.call(this, a), g = q[c];
                    a = r[c].slideDelay_open;
                    d && d.stopImmediatePropagation();
                    g.isClosed && d && "mouseenter" === d.type && 0 < a ? M.set(c + "_openSlider", b, a) : b()
                }
            }, Wa = function (a) {
                function c() {
                    g.isClosed ? wa(f, !1) : g.isMoving || ja(f)
                }

                if (H()) {
                    var m = Ma(a), f = A.call(this,
                        a);
                    a = r[f];
                    var g = q[f], h = g.isMoving ? 1E3 : 300;
                    !g.isClosed && !g.isResizing && ("click" === a.slideTrigger_close ? c() : a.preventQuickSlideClose && g.isMoving || a.preventPrematureSlideClose && m && b.layout.isMouseOverElem(m, y[f]) || (m ? M.set(f + "_closeSlider", c, d(a.slideDelay_close, h)) : c()))
                }
            }, Ga = function (a, b) {
                var d = y[a], c = q[a], g = r[a], f = r.zIndexes;
                b ? (va(a, {animation: !0, objectsOnly: !0}), d.css({zIndex: f.pane_animate}), "south" == a ? d.css({top: v.inset.top + v.innerHeight - d.outerHeight()}) : "east" == a && d.css({left: v.inset.left + v.innerWidth -
                    d.outerWidth()})) : (za(), d.css({zIndex: c.isSliding ? f.pane_sliding : f.pane_normal}), "south" == a ? d.css({top: "auto"}) : "east" == a && !d.css("left").match(/\-99999/) && d.css({left: "auto"}), G.msie && (g.fxOpacityFix && "slide" != g.fxName_open && d.css("filter") && 1 == d.css("opacity")) && d[0].style.removeAttribute("filter"))
            }, ma = function (a, b) {
                var d = r[a], c = F[a], g = d.slideTrigger_open.toLowerCase();
                if (c && (!b || d.slidable)) {
                    g.match(/mouseover/) ? g = d.slideTrigger_open = "mouseenter" : g.match(/(click|dblclick|mouseenter)/) || (g = d.slideTrigger_open =
                        "click");
                    if (d.resizerDblClickToggle && g.match(/click/))c[b ? "unbind" : "bind"]("dblclick." + K, na);
                    c[b ? "bind" : "unbind"](g + "." + K, sb).css("cursor", b ? d.sliderCursor : "default").attr("title", b ? d.tips.Slide : "")
                }
            }, wa = function (a, b) {
                function d(b) {
                    M.clear(a + "_closeSlider");
                    b.stopPropagation()
                }

                var c = r[a], g = q[a], f = r.zIndexes, h = c.slideTrigger_close.toLowerCase(), j = b ? "bind" : "unbind", k = y[a], l = F[a];
                M.clear(a + "_closeSlider");
                b ? (g.isSliding = !0, q.panesSliding[a] = !0, ma(a, !1)) : (g.isSliding = !1, delete q.panesSliding[a]);
                k.css("zIndex",
                    b ? f.pane_sliding : f.pane_normal);
                l.css("zIndex", b ? f.pane_sliding + 2 : f.resizer_normal);
                h.match(/(click|mouseleave)/) || (h = c.slideTrigger_close = "mouseleave");
                l[j](h, Wa);
                "mouseleave" === h && (k[j]("mouseleave." + K, Wa), l[j]("mouseenter." + K, d), k[j]("mouseenter." + K, d));
                b ? "click" === h && !c.resizable && (l.css("cursor", b ? c.sliderCursor : "default"), l.attr("title", b ? c.tips.Close : "")) : M.clear(a + "_closeSlider")
            }, ha = function (a, d, c, f) {
                d = r[a];
                var g = q[a], h = k[a], n = y[a], j = F[a], p = "vert" === h.dir, l = !1;
                if ("center" === a || p && g.noVerticalRoom)(l =
                    0 <= g.maxHeight) && g.noRoom ? (rb(a), j && j.show(), g.isVisible = !0, g.noRoom = !1, p && (g.noVerticalRoom = !1), eb(a)) : !l && !g.noRoom && (Ea(a), j && j.hide(), g.isVisible = !1, g.noRoom = !0);
                "center" !== a && (g.minSize <= g.maxSize ? (g.size > g.maxSize ? ka(a, g.maxSize, c, !0, f) : g.size < g.minSize ? ka(a, g.minSize, c, !0, f) : j && (g.isVisible && n.is(":visible")) && (c = g.size + v.inset[h.side], b.layout.cssNum(j, h.side) != c && j.css(h.side, c)), g.noRoom && (g.wasOpen && d.closable ? d.autoReopen ? ra(a, !1, !0, !0) : g.noRoom = !1 : Fa(a, g.wasOpen, !0, !0))) : g.noRoom || (g.noRoom = !0, g.wasOpen = !g.isClosed && !g.isSliding, g.isClosed || (d.closable ? ja(a, !0, !0) : Ta(a, !0))))
            }, Ca = function (a, b, d, c, g) {
                if (H()) {
                    a = A.call(this, a);
                    var f = r[a], h = q[a];
                    g = g || f.livePaneResizing && !h.isResizing;
                    h.autoResize = !1;
                    ka(a, b, d, c, g)
                }
            }, ka = function (e, c, f, h, g) {
                function j() {
                    for (var a = "width" === ua ? l.outerWidth() : l.outerHeight(), a = [
                        {pane: n, count: 1, target: c, actual: a, correct: c === a, attempt: c, cssSize: D}
                    ], e = a[0], h = {}, t = "Inaccurate size after resizing the " + n + "-pane."; !e.correct;) {
                        h = {pane: n, count: e.count + 1, target: c};
                        h.attempt =
                            e.actual > c ? d(0, e.attempt - (e.actual - c)) : d(0, e.attempt + (c - e.actual));
                        h.cssSize = ("horz" == k[n].dir ? O : Q)(y[n], h.attempt);
                        l.css(ua, h.cssSize);
                        h.actual = "width" == ua ? l.outerWidth() : l.outerHeight();
                        h.correct = c === h.actual;
                        1 === a.length && (ca(t, !1, !0), ca(e, !1, !0));
                        ca(h, !1, !0);
                        if (3 < a.length)break;
                        a.push(h);
                        e = a[a.length - 1]
                    }
                    J.size = c;
                    b.extend(J, R(l));
                    J.isVisible && l.is(":visible") && (x && x.css(B, c + v.inset[B]), pa(n));
                    !f && (!Z && q.initialized && J.isVisible) && C("onresize_end", n);
                    f || (J.isSliding || ia("horz" == k[n].dir ? "" : "center",
                        Z, g), qa());
                    e = k.oppositeEdge[n];
                    c < G && q[e].noRoom && (Y(e), ha(e, !1, f));
                    1 < a.length && ca(t + "\nSee the Error Console for details.", !0, !0)
                }

                if (H()) {
                    var n = A.call(this, e), p = r[n], J = q[n], l = y[n], x = F[n], B = k[n].side, ua = k[n].sizeType.toLowerCase(), Z = J.isResizing && !p.triggerEventsDuringLiveResize, z = !0 !== h && p.animatePaneSizing, G, D;
                    u.queue(function (e) {
                        Y(n);
                        G = J.size;
                        c = fa(n, c);
                        c = d(c, fa(n, p.minSize));
                        c = a(c, J.maxSize);
                        if (c < J.minSize)e(), ha(n, !1, f); else {
                            if (!g && c === G)return e();
                            J.newSize = c;
                            !f && (q.initialized && J.isVisible) &&
                            C("onresize_start", n);
                            D = ("horz" == k[n].dir ? O : Q)(y[n], c);
                            if (z && l.is(":visible")) {
                                var h = b.layout.effects.size[n] || b.layout.effects.size.all, h = p.fxSettings_size.easing || h.easing, v = r.zIndexes, u = {};
                                u[ua] = D + "px";
                                J.isMoving = !0;
                                l.css({zIndex: v.pane_animate}).show().animate(u, p.fxSpeed_size, h, function () {
                                    l.css({zIndex: J.isSliding ? v.pane_sliding : v.pane_normal});
                                    J.isMoving = !1;
                                    delete J.newSize;
                                    j();
                                    e()
                                })
                            } else l.css(ua, D), delete J.newSize, l.is(":visible") ? j() : (J.size = c, b.extend(J, R(l))), e()
                        }
                    })
                }
            }, ia = function (a, c, f) {
                a = (a ? a : "east,west,center").split(",");
                b.each(a, function (a, e) {
                    if (y[e]) {
                        var h = r[e], j = q[e], k = y[e], p = !0, l = {}, u = b.layout.showInvisibly(k), B = {top: ga("north", !0), bottom: ga("south", !0), left: ga("west", !0), right: ga("east", !0), width: 0, height: 0};
                        B.width = v.innerWidth - B.left - B.right;
                        B.height = v.innerHeight - B.bottom - B.top;
                        B.top += v.inset.top;
                        B.bottom += v.inset.bottom;
                        B.left += v.inset.left;
                        B.right += v.inset.right;
                        b.extend(j, R(k));
                        if ("center" === e) {
                            if (!f && j.isVisible && B.width === j.outerWidth && B.height === j.outerHeight)return k.css(u),
                                !0;
                            b.extend(j, ya(e), {maxWidth: B.width, maxHeight: B.height});
                            l = B;
                            j.newWidth = l.width;
                            j.newHeight = l.height;
                            l.width = Q(k, l.width);
                            l.height = O(k, l.height);
                            p = 0 <= l.width && 0 <= l.height;
                            if (!q.initialized && h.minWidth > B.width) {
                                var h = h.minWidth - j.outerWidth, B = r.east.minSize || 0, x = r.west.minSize || 0, Z = q.east.size, z = q.west.size, A = Z, D = z;
                                0 < h && (q.east.isVisible && Z > B) && (A = d(Z - B, Z - h), h -= Z - A);
                                0 < h && (q.west.isVisible && z > x) && (D = d(z - x, z - h), h -= z - D);
                                if (0 === h) {
                                    Z && Z != B && ka("east", A, !0, !0, f);
                                    z && z != x && ka("west", D, !0, !0, f);
                                    ia("center",
                                        c, f);
                                    k.css(u);
                                    return
                                }
                            }
                        } else {
                            j.isVisible && !j.noVerticalRoom && b.extend(j, R(k), ya(e));
                            if (!f && !j.noVerticalRoom && B.height === j.outerHeight)return k.css(u), !0;
                            l.top = B.top;
                            l.bottom = B.bottom;
                            j.newSize = B.height;
                            l.height = O(k, B.height);
                            j.maxHeight = l.height;
                            p = 0 <= j.maxHeight;
                            p || (j.noVerticalRoom = !0)
                        }
                        p ? (!c && q.initialized && C("onresize_start", e), k.css(l), "center" !== e && qa(e), j.noRoom && (!j.isClosed && !j.isHidden) && ha(e), j.isVisible && (b.extend(j, R(k)), q.initialized && pa(e))) : !j.noRoom && j.isVisible && ha(e);
                        k.css(u);
                        delete j.newSize;
                        delete j.newWidth;
                        delete j.newHeight;
                        if (!j.isVisible)return!0;
                        "center" === e && (j = G.isIE6 || !G.boxModel, y.north && (j || "IFRAME" == q.north.tagName) && y.north.css("width", Q(y.north, v.innerWidth)), y.south && (j || "IFRAME" == q.south.tagName) && y.south.css("width", Q(y.south, v.innerWidth)));
                        !c && q.initialized && C("onresize_end", e)
                    }
                })
            }, oa = function (a) {
                A(a);
                if (u.is(":visible"))if (q.initialized) {
                    if (!0 === a && b.isPlainObject(r.outset) && u.css(r.outset), b.extend(v, R(u, r.inset)), v.outerHeight) {
                        !0 === a && ob();
                        if (!1 === C("onresizeall_start"))return!1;
                        var d, c, f;
                        b.each(["south", "north", "east", "west"], function (a, b) {
                            y[b] && (c = r[b], f = q[b], f.autoResize && f.size != c.size ? ka(b, c.size, !0, !0, !0) : (Y(b), ha(b, !1, !0, !0)))
                        });
                        ia("", !0, !0);
                        qa();
                        b.each(k.allPanes, function (a, b) {
                            (d = y[b]) && q[b].isVisible && C("onresize_end", b)
                        });
                        C("onresizeall_end")
                    }
                } else Aa()
            }, db = function (a, d) {
                var c = A.call(this, a);
                r[c].resizeChildren && (d || Ba(c), c = ba[c], b.isPlainObject(c) && b.each(c, function (a, b) {
                    b.destroyed || b.resizeAll()
                }))
            }, pa = function (a, c) {
                if (H()) {
                    var h = A.call(this, a), h = h ? h.split(",") :
                        k.allPanes;
                    b.each(h, function (a, e) {
                        function h(a) {
                            return d(u.css.paddingBottom, parseInt(a.css("marginBottom"), 10) || 0)
                        }

                        function j() {
                            var a = r[e].contentIgnoreSelector, a = p.nextAll().not(".ui-layout-mask").not(a || ":lt(0)"), b = a.filter(":visible"), d = b.filter(":last");
                            v = {top: p[0].offsetTop, height: p.outerHeight(), numFooters: a.length, hiddenFooters: a.length - b.length, spaceBelow: 0};
                            v.spaceAbove = v.top;
                            v.bottom = v.top + v.height;
                            v.spaceBelow = d.length ? d[0].offsetTop + d.outerHeight() - v.bottom + h(d) : h(p)
                        }

                        var m = y[e], p = U[e],
                            l = r[e], u = q[e], v = u.content;
                        if (!m || !p || !m.is(":visible"))return!0;
                        if (!p.length && (Sa(e, !1), !p))return;
                        if (!1 !== C("onsizecontent_start", e)) {
                            if (!u.isMoving && !u.isResizing || l.liveContentResizing || c || void 0 == v.top)j(), 0 < v.hiddenFooters && "hidden" === m.css("overflow") && (m.css("overflow", "visible"), j(), m.css("overflow", "hidden"));
                            m = u.innerHeight - (v.spaceAbove - u.css.paddingTop) - (v.spaceBelow - u.css.paddingBottom);
                            if (!p.is(":visible") || v.height != m) {
                                var x = p, l = x;
                                f(x) ? l = y[x] : x.jquery || (l = b(x));
                                x = O(l, m);
                                l.css({height: x,
                                    visibility: "visible"});
                                0 < x && 0 < l.innerWidth() ? l.data("autoHidden") && (l.show().data("autoHidden", !1), G.mozilla || l.css(k.hidden).css(k.visible)) : l.data("autoHidden") || l.hide().data("autoHidden", !0);
                                v.height = m
                            }
                            q.initialized && C("onsizecontent_end", e)
                        }
                    })
                }
            }, qa = function (a) {
                a = (a = A.call(this, a)) ? a.split(",") : k.borderPanes;
                b.each(a, function (a, d) {
                    var e = r[d], g = q[d], h = y[d], j = F[d], p = P[d], u;
                    if (h && j) {
                        var l = k[d].dir, x = g.isClosed ? "_closed" : "_open", B = e["spacing" + x], z = e["togglerAlign" + x], x = e["togglerLength" + x], A;
                        if (0 ===
                            B)j.hide(); else {
                            !g.noRoom && !g.isHidden && j.show();
                            "horz" === l ? (A = v.innerWidth, g.resizerLength = A, h = b.layout.cssNum(h, "left"), j.css({width: Q(j, A), height: O(j, B), left: -9999 < h ? h : v.inset.left})) : (A = h.outerHeight(), g.resizerLength = A, j.css({height: O(j, A), width: Q(j, B), top: v.inset.top + ga("north", !0)}));
                            da(e, j);
                            if (p) {
                                if (0 === x || g.isSliding && e.hideTogglerOnSlide) {
                                    p.hide();
                                    return
                                }
                                p.show();
                                if (!(0 < x) || "100%" === x || x > A)x = A, z = 0; else if (f(z))switch (z) {
                                    case "top":
                                    case "left":
                                        z = 0;
                                        break;
                                    case "bottom":
                                    case "right":
                                        z = A - x;
                                        break;
                                    default:
                                        z = c((A - x) / 2)
                                } else h = parseInt(z, 10), z = 0 <= z ? h : A - x + h;
                                if ("horz" === l) {
                                    var D = Q(p, x);
                                    p.css({width: D, height: O(p, B), left: z, top: 0});
                                    p.children(".content").each(function () {
                                        u = b(this);
                                        u.css("marginLeft", c((D - u.outerWidth()) / 2))
                                    })
                                } else {
                                    var C = O(p, x);
                                    p.css({height: C, width: Q(p, B), top: z, left: 0});
                                    p.children(".content").each(function () {
                                        u = b(this);
                                        u.css("marginTop", c((C - u.outerHeight()) / 2))
                                    })
                                }
                                da(0, p)
                            }
                            if (!q.initialized && (e.initHidden || g.isHidden))j.hide(), p && p.hide()
                        }
                    }
                })
            }, pb = function (a) {
                if (H()) {
                    var b = A.call(this,
                        a);
                    a = P[b];
                    var d = r[b];
                    a && (d.closable = !0, a.bind("click." + K,function (a) {
                        a.stopPropagation();
                        na(b)
                    }).css("visibility", "visible").css("cursor", "pointer").attr("title", q[b].isClosed ? d.tips.Open : d.tips.Close).show())
                }
            }, Va = function (a, d) {
                b.layout.plugins.buttons && b.each(q[a].pins, function (c, f) {
                    b.layout.buttons.setPinState(z, b(f), a, d)
                })
            }, u = b(this).eq(0);
        if (!u.length)return ca(r.errors.containerMissing);
        if (u.data("layoutContainer") && u.data("layout"))return u.data("layout");
        var y = {}, U = {}, F = {}, P = {}, ea = b([]), v =
            q.container, K = q.id, z = {options: r, state: q, container: u, panes: y, contents: U, resizers: F, togglers: P, hide: Ta, show: Fa, toggle: na, open: ra, close: ja, slideOpen: sb, slideClose: Wa, slideToggle: function (a) {
            a = A.call(this, a);
            na(a, !0)
        }, setSizeLimits: Y, _sizePane: ka, sizePane: Ca, sizeContent: pa, swapPanes: function (a, c) {
            function f(a) {
                var d = y[a], c = U[a];
                return!d ? !1 : {pane: a, P: d ? d[0] : !1, C: c ? c[0] : !1, state: b.extend(!0, {}, q[a]), options: b.extend(!0, {}, r[a])}
            }

            function h(a, c) {
                if (a) {
                    var e = a.P, f = a.C, g = a.pane, j = k[c], m = b.extend(!0, {}, q[c]),
                        n = r[c], w = {resizerCursor: n.resizerCursor};
                    b.each(["fxName", "fxSpeed", "fxSettings"], function (a, b) {
                        w[b + "_open"] = n[b + "_open"];
                        w[b + "_close"] = n[b + "_close"];
                        w[b + "_size"] = n[b + "_size"]
                    });
                    y[c] = b(e).data({layoutPane: z[c], layoutEdge: c}).css(k.hidden).css(j.cssReq);
                    U[c] = f ? b(f) : !1;
                    r[c] = b.extend(!0, {}, a.options, w);
                    q[c] = b.extend(!0, {}, a.state);
                    e.className = e.className.replace(RegExp(n.paneClass + "-" + g, "g"), n.paneClass + "-" + c);
                    Pa(c);
                    j.dir != k[g].dir ? (e = p[c] || 0, Y(c), e = d(e, q[c].minSize), Ca(c, e, !0, !0)) : F[c].css(j.side, v.inset[j.side] +
                        (q[c].isVisible ? ga(c) : 0));
                    a.state.isVisible && !m.isVisible ? Ua(c, !0) : (Da(c), ma(c, !0));
                    a = null
                }
            }

            if (H()) {
                var g = A.call(this, a);
                q[g].edge = c;
                q[c].edge = g;
                if (!1 === C("onswap_start", g) || !1 === C("onswap_start", c))q[g].edge = g, q[c].edge = c; else {
                    var j = f(g), n = f(c), p = {};
                    p[g] = j ? j.state.size : 0;
                    p[c] = n ? n.state.size : 0;
                    y[g] = !1;
                    y[c] = !1;
                    q[g] = {};
                    q[c] = {};
                    P[g] && P[g].remove();
                    P[c] && P[c].remove();
                    F[g] && F[g].remove();
                    F[c] && F[c].remove();
                    F[g] = F[c] = P[g] = P[c] = !1;
                    h(j, c);
                    h(n, g);
                    j = n = p = null;
                    y[g] && y[g].css(k.visible);
                    y[c] && y[c].css(k.visible);
                    oa();
                    C("onswap_end", g);
                    C("onswap_end", c)
                }
            }
        }, showMasks: va, hideMasks: za, initContent: Sa, addPane: ib, removePane: Ra, createChildren: Qa, refreshChildren: Ba, enableClosable: pb, disableClosable: function (a, b) {
            if (H()) {
                var c = A.call(this, a), d = P[c];
                d && (r[c].closable = !1, q[c].isClosed && ra(c, !1, !0), d.unbind("." + K).css("visibility", b ? "hidden" : "visible").css("cursor", "default").attr("title", ""))
            }
        }, enableSlidable: function (a) {
            if (H()) {
                a = A.call(this, a);
                var b = F[a];
                b && b.data("draggable") && (r[a].slidable = !0, q[a].isClosed && ma(a,
                    !0))
            }
        }, disableSlidable: function (a) {
            if (H()) {
                a = A.call(this, a);
                var b = F[a];
                b && (r[a].slidable = !1, q[a].isSliding ? ja(a, !1, !0) : (ma(a, !1), b.css("cursor", "default").attr("title", ""), da(null, b[0])))
            }
        }, enableResizable: function (a) {
            if (H()) {
                a = A.call(this, a);
                var b = F[a], c = r[a];
                b && b.data("draggable") && (c.resizable = !0, b.draggable("enable"), q[a].isClosed || b.css("cursor", c.resizerCursor).attr("title", c.tips.Resize))
            }
        }, disableResizable: function (a) {
            if (H()) {
                a = A.call(this, a);
                var b = F[a];
                b && b.data("draggable") && (r[a].resizable = !1, b.draggable("disable").css("cursor", "default").attr("title", ""), da(null, b[0]))
            }
        }, allowOverflow: x, resetOverflow: X, destroy: function (a, c) {
            b(window).unbind("." + K);
            b(document).unbind("." + K);
            "object" === typeof a ? A(a) : c = a;
            u.clearQueue().removeData("layout").removeData("layoutContainer").removeClass(r.containerClass).unbind("." + K);
            ea.remove();
            b.each(k.allPanes, function (a, b) {
                Ra(b, !1, !0, c)
            });
            u.data("layoutCSS") && !u.data("layoutRole") && u.css(u.data("layoutCSS")).removeData("layoutCSS");
            "BODY" === v.tagName &&
                (u = b("html")).data("layoutCSS") && u.css(u.data("layoutCSS")).removeData("layoutCSS");
            j(z, b.layout.onDestroy);
            mb();
            for (var d in z)d.match(/^(container|options)$/) || delete z[d];
            z.destroyed = !0;
            return z
        }, initPanes: H, resizeAll: oa, runCallbacks: C, hasParentLayout: !1, children: ba, north: !1, south: !1, west: !1, east: !1, center: !1}, Xa;
        var V, Ya, N, Ha, la, sa, W;
        h = b.layout.transformData(h, !0);
        h = b.layout.backwardCompatibility.renameAllOptions(h);
        if (!b.isEmptyObject(h.panes)) {
            V = b.layout.optionsMap.noDefault;
            la = 0;
            for (sa = V.length; la <
                sa; la++)N = V[la], delete h.panes[N];
            V = b.layout.optionsMap.layout;
            la = 0;
            for (sa = V.length; la < sa; la++)N = V[la], delete h.panes[N]
        }
        V = b.layout.optionsMap.layout;
        var Bb = b.layout.config.optionRootKeys;
        for (N in h)Ha = h[N], 0 > b.inArray(N, Bb) && 0 > b.inArray(N, V) && (h.panes[N] || (h.panes[N] = b.isPlainObject(Ha) ? b.extend(!0, {}, Ha) : Ha), delete h[N]);
        b.extend(!0, r, h);
        b.each(k.allPanes, function (a, c) {
            k[c] = b.extend(!0, {}, k.panes, k[c]);
            Ya = r.panes;
            W = r[c];
            if ("center" === c) {
                V = b.layout.optionsMap.center;
                a = 0;
                for (sa = V.length; a < sa; a++)if (N =
                    V[a], !h.center[N] && (h.panes[N] || !W[N]))W[N] = Ya[N]
            } else {
                W = r[c] = b.extend(!0, {}, Ya, W);
                var d = r[c], f = r.panes;
                d.fxSettings || (d.fxSettings = {});
                f.fxSettings || (f.fxSettings = {});
                b.each(["_open", "_close", "_size"], function (a, e) {
                    var h = "fxName" + e, j = "fxSpeed" + e, k = "fxSettings" + e, l = d[h] = d[h] || f[h] || d.fxName || f.fxName || "none", p = b.effects && (b.effects[l] || b.effects.effect && b.effects.effect[l]);
                    if ("none" === l || !r.effects[l] || !p)l = d[h] = "none";
                    l = r.effects[l] || {};
                    h = l.all || null;
                    l = l[c] || null;
                    d[j] = d[j] || f[j] || d.fxSpeed || f.fxSpeed ||
                        null;
                    d[k] = b.extend(!0, {}, h, l, f.fxSettings, d.fxSettings, f[k], d[k])
                });
                delete d.fxName;
                delete d.fxSpeed;
                delete d.fxSettings;
                W.resizerClass || (W.resizerClass = "ui-layout-resizer");
                W.togglerClass || (W.togglerClass = "ui-layout-toggler")
            }
            W.paneClass || (W.paneClass = "ui-layout-pane")
        });
        var Ia = h.zIndex, xa = r.zIndexes;
        0 < Ia && (xa.pane_normal = Ia, xa.content_mask = d(Ia + 1, xa.content_mask), xa.resizer_normal = d(Ia + 2, xa.resizer_normal));
        delete r.panes;
        var Cb = r, tb = q;
        tb.creatingLayout = !0;
        j(z, b.layout.onCreate);
        if (!1 === C("onload_start"))Xa =
            "cancel"; else {
            var Za = u[0], $ = b("html"), ub = v.tagName = Za.tagName, vb = v.id = Za.id, wb = v.className = Za.className, L = r, Ja = L.name, $a = {}, Ka = u.data("parentLayout"), La = u.data("layoutEdge"), ab = Ka && La, ta = b.layout.cssNum, bb, aa;
            v.selector = u.selector.split(".slice")[0];
            v.ref = (L.name ? L.name + " layout / " : "") + ub + (vb ? "#" + vb : wb ? ".[" + wb + "]" : "");
            v.isBody = "BODY" === ub;
            !ab && !v.isBody && (bb = u.closest("." + b.layout.defaults.panes.paneClass), Ka = bb.data("parentLayout"), La = bb.data("layoutEdge"), ab = Ka && La);
            u.data({layout: z, layoutContainer: K}).addClass(L.containerClass);
            var xb = {destroy: "", initPanes: "", resizeAll: "resizeAll", resize: "resizeAll"};
            for (Ja in xb)u.bind("layout" + Ja.toLowerCase() + "." + K, z[xb[Ja] || Ja]);
            ab && (z.hasParentLayout = !0, Ka.refreshChildren(La, z));
            u.data("layoutCSS") || (v.isBody ? (u.data("layoutCSS", b.extend(D(u, "position,margin,padding,border"), {height: u.css("height"), overflow: u.css("overflow"), overflowX: u.css("overflowX"), overflowY: u.css("overflowY")})), $.data("layoutCSS", b.extend(D($, "padding"), {height: "auto", overflow: $.css("overflow"), overflowX: $.css("overflowX"),
                overflowY: $.css("overflowY")}))) : u.data("layoutCSS", D(u, "position,margin,padding,border,top,bottom,left,right,width,height,overflow,overflowX,overflowY")));
            try {
                $a = {overflow: "hidden", overflowX: "hidden", overflowY: "hidden"};
                u.css($a);
                L.inset && !b.isPlainObject(L.inset) && (aa = parseInt(L.inset, 10) || 0, L.inset = {top: aa, bottom: aa, left: aa, right: aa});
                if (v.isBody)L.outset ? b.isPlainObject(L.outset) || (aa = parseInt(L.outset, 10) || 0, L.outset = {top: aa, bottom: aa, left: aa, right: aa}) : L.outset = {top: ta($, "paddingTop"), bottom: ta($,
                    "paddingBottom"), left: ta($, "paddingLeft"), right: ta($, "paddingRight")}, $.css($a).css({height: "100%", border: "none", padding: 0, margin: 0}), G.isIE6 ? (u.css({width: "100%", height: "100%", border: "none", padding: 0, margin: 0, position: "relative"}), L.inset || (L.inset = R(u).inset)) : (u.css({width: "auto", height: "auto", margin: 0, position: "absolute"}), u.css(L.outset)), b.extend(v, R(u, L.inset)); else {
                    var yb = u.css("position");
                    (!yb || !yb.match(/(fixed|absolute|relative)/)) && u.css("position", "relative");
                    u.is(":visible") && (b.extend(v,
                        R(u, L.inset)), 1 > v.innerHeight && ca(L.errors.noContainerHeight.replace(/CONTAINER/, v.ref)))
                }
                ta(u, "minWidth") && u.parent().css("overflowX", "auto");
                ta(u, "minHeight") && u.parent().css("overflowY", "auto")
            } catch (Db) {
            }
            nb();
            b(window).bind("unload." + K, mb);
            j(z, b.layout.onLoad);
            Cb.initPanes && Aa();
            delete tb.creatingLayout;
            Xa = q.initialized
        }
        return"cancel" === Xa ? null : z
    }
})(jQuery);
(function (b) {
    b.ui || (b.ui = {});
    b.ui.cookie = {acceptsCookies: !!navigator.cookieEnabled, read: function (a) {
        for (var d = document.cookie, d = d ? d.split(";") : [], c, f = 0, j = d.length; f < j; f++)if (c = b.trim(d[f]).split("="), c[0] == a)return decodeURIComponent(c[1]);
        return null
    }, write: function (a, d, c) {
        var f = "", j = "", h = !1;
        c = c || {};
        var p = c.expires || null, x = b.type(p);
        "date" === x ? j = p : "string" === x && 0 < p && (p = parseInt(p, 10), x = "number");
        "number" === x && (j = new Date, 0 < p ? j.setDate(j.getDate() + p) : (j.setFullYear(1970), h = !0));
        j && (f += ";expires=" +
            j.toUTCString());
        c.path && (f += ";path=" + c.path);
        c.domain && (f += ";domain=" + c.domain);
        c.secure && (f += ";secure");
        document.cookie = a + "=" + (h ? "" : encodeURIComponent(d)) + f
    }, clear: function (a) {
        b.ui.cookie.write(a, "", {expires: -1})
    }};
    b.cookie || (b.cookie = function (a, d, c) {
        var f = b.ui.cookie;
        if (null === d)f.clear(a); else {
            if (void 0 === d)return f.read(a);
            f.write(a, d, c)
        }
    });
    b.layout.plugins.stateManagement = !0;
    b.layout.config.optionRootKeys.push("stateManagement");
    b.layout.defaults.stateManagement = {enabled: !1, autoSave: !0, autoLoad: !0,
        animateLoad: !0, includeChildren: !0, stateKeys: "north.size,south.size,east.size,west.size,north.isClosed,south.isClosed,east.isClosed,west.isClosed,north.isHidden,south.isHidden,east.isHidden,west.isHidden", cookie: {name: "", domain: "", path: "", expires: "", secure: !1}};
    b.layout.optionsMap.layout.push("stateManagement");
    b.layout.state = {saveCookie: function (a, d, c) {
        var f = a.options, j = f.stateManagement;
        c = b.extend(!0, {}, j.cookie, c || null);
        a = a.state.stateData = a.readState(d || j.stateKeys);
        b.ui.cookie.write(c.name || f.name ||
            "Layout", b.layout.state.encodeJSON(a), c);
        return b.extend(!0, {}, a)
    }, deleteCookie: function (a) {
        a = a.options;
        b.ui.cookie.clear(a.stateManagement.cookie.name || a.name || "Layout")
    }, readCookie: function (a) {
        a = a.options;
        return(a = b.ui.cookie.read(a.stateManagement.cookie.name || a.name || "Layout")) ? b.layout.state.decodeJSON(a) : {}
    }, loadCookie: function (a) {
        var d = b.layout.state.readCookie(a);
        d && (a.state.stateData = b.extend(!0, {}, d), a.loadState(d));
        return d
    }, loadState: function (a, d, c) {
        if (b.isPlainObject(d) && !b.isEmptyObject(d))if (d =
            a.state.stateData = b.layout.transformData(d), c = b.extend({animateLoad: !1, includeChildren: a.options.stateManagement.includeChildren}, c), a.state.initialized) {
            var f = !c.animateLoad, j, h, p, x;
            b.each(b.layout.config.borderPanes, function (c, G) {
                S = d[G];
                b.isPlainObject(S) && (s = S.size, j = S.initClosed, h = S.initHidden, ar = S.autoResize, p = a.state[G], x = p.isVisible, ar && (p.autoResize = ar), x || a._sizePane(G, s, !1, !1, !1), !0 === h ? a.hide(G, f) : !0 === j ? a.close(G, !1, f) : !1 === j ? a.open(G, !1, f) : !1 === h && a.show(G, !1, f), x && a._sizePane(G, s, !1,
                    !1, f))
            });
            if (c.includeChildren) {
                var I, T;
                b.each(a.children, function (a, c) {
                    (I = d[a] ? d[a].children : 0) && c && b.each(c, function (a, b) {
                        T = I[a];
                        b && T && b.loadState(T)
                    })
                })
            }
        } else {
            var S = b.extend(!0, {}, d);
            b.each(b.layout.config.allPanes, function (a, b) {
                S[b] && delete S[b].children
            });
            b.extend(!0, a.options, S)
        }
    }, readState: function (a, d) {
        "string" === b.type(d) && (d = {keys: d});
        d || (d = {});
        var c = a.options.stateManagement, f = d.includeChildren, f = void 0 !== f ? f : c.includeChildren, c = d.stateKeys || c.stateKeys, j = {isClosed: "initClosed", isHidden: "initHidden"},
            h = a.state, p = b.layout.config.allPanes, x = {}, I, T, S, X, G, k;
        b.isArray(c) && (c = c.join(","));
        for (var c = c.replace(/__/g, ".").split(","), Q = 0, O = c.length; Q < O; Q++)I = c[Q].split("."), T = I[0], I = I[1], 0 > b.inArray(T, p) || (S = h[T][I], void 0 != S && ("isClosed" == I && h[T].isSliding && (S = !0), (x[T] || (x[T] = {}))[j[I] ? j[I] : I] = S));
        f && b.each(p, function (c, d) {
            G = a.children[d];
            X = h.stateData[d];
            b.isPlainObject(G) && !b.isEmptyObject(G) && (k = x[d] || (x[d] = {}), k.children || (k.children = {}), b.each(G, function (a, c) {
                c.state.initialized ? k.children[a] = b.layout.state.readState(c) :
                    X && (X.children && X.children[a]) && (k.children[a] = b.extend(!0, {}, X.children[a]))
            }))
        });
        return x
    }, encodeJSON: function (a) {
        function d(a) {
            var f = [], j = 0, h, p, x, I = b.isArray(a);
            for (h in a)p = a[h], x = typeof p, "string" == x ? p = '"' + p + '"' : "object" == x && (p = d(p)), f[j++] = (!I ? '"' + h + '":' : "") + p;
            return(I ? "[" : "{") + f.join(",") + (I ? "]" : "}")
        }

        return d(a)
    }, decodeJSON: function (a) {
        try {
            return b.parseJSON ? b.parseJSON(a) : window.eval("(" + a + ")") || {}
        } catch (d) {
            return{}
        }
    }, _create: function (a) {
        var d = b.layout.state, c = a.options.stateManagement;
        b.extend(a,
            {readCookie: function () {
                return d.readCookie(a)
            }, deleteCookie: function () {
                d.deleteCookie(a)
            }, saveCookie: function (b, c) {
                return d.saveCookie(a, b, c)
            }, loadCookie: function () {
                return d.loadCookie(a)
            }, loadState: function (b, c) {
                d.loadState(a, b, c)
            }, readState: function (b) {
                return d.readState(a, b)
            }, encodeJSON: d.encodeJSON, decodeJSON: d.decodeJSON});
        a.state.stateData = {};
        if (c.autoLoad)if (b.isPlainObject(c.autoLoad))b.isEmptyObject(c.autoLoad) || a.loadState(c.autoLoad); else if (c.enabled)if (b.isFunction(c.autoLoad)) {
            var f =
            {};
            try {
                f = c.autoLoad(a, a.state, a.options, a.options.name || "")
            } catch (j) {
            }
            f && (b.isPlainObject(f) && !b.isEmptyObject(f)) && a.loadState(f)
        } else a.loadCookie()
    }, _unload: function (a) {
        var d = a.options.stateManagement;
        if (d.enabled && d.autoSave)if (b.isFunction(d.autoSave))try {
            d.autoSave(a, a.state, a.options, a.options.name || "")
        } catch (c) {
        } else a.saveCookie()
    }};
    b.layout.onCreate.push(b.layout.state._create);
    b.layout.onUnload.push(b.layout.state._unload);
    b.layout.plugins.buttons = !0;
    b.layout.defaults.autoBindCustomButtons = !1;
    b.layout.optionsMap.layout.push("autoBindCustomButtons");
    b.layout.buttons = {init: function (a) {
        var d = a.options.name || "", c;
        b.each("toggle open close pin toggle-slide open-slide".split(" "), function (f, j) {
            b.each(b.layout.config.borderPanes, function (f, p) {
                b(".ui-layout-button-" + j + "-" + p).each(function () {
                    c = b(this).data("layoutName") || b(this).attr("layoutName");
                    (void 0 == c || c === d) && a.bindButton(this, j, p)
                })
            })
        })
    }, get: function (a, d, c, f) {
        var j = b(d);
        a = a.options;
        var h = a.errors.addButtonError;
        j.length ? 0 > b.inArray(c,
            b.layout.config.borderPanes) ? (b.layout.msg(h + " " + a.errors.pane + ": " + c, !0), j = b("")) : (d = a[c].buttonClass + "-" + f, j.addClass(d + " " + d + "-" + c).data("layoutName", a.name)) : b.layout.msg(h + " " + a.errors.selector + ": " + d, !0);
        return j
    }, bind: function (a, d, c, f) {
        var j = b.layout.buttons;
        switch (c.toLowerCase()) {
            case "toggle":
                j.addToggle(a, d, f);
                break;
            case "open":
                j.addOpen(a, d, f);
                break;
            case "close":
                j.addClose(a, d, f);
                break;
            case "pin":
                j.addPin(a, d, f);
                break;
            case "toggle-slide":
                j.addToggle(a, d, f, !0);
                break;
            case "open-slide":
                j.addOpen(a,
                    d, f, !0)
        }
        return a
    }, addToggle: function (a, d, c, f) {
        b.layout.buttons.get(a, d, c, "toggle").click(function (b) {
            a.toggle(c, !!f);
            b.stopPropagation()
        });
        return a
    }, addOpen: function (a, d, c, f) {
        b.layout.buttons.get(a, d, c, "open").attr("title", a.options[c].tips.Open).click(function (b) {
            a.open(c, !!f);
            b.stopPropagation()
        });
        return a
    }, addClose: function (a, d, c) {
        b.layout.buttons.get(a, d, c, "close").attr("title", a.options[c].tips.Close).click(function (b) {
            a.close(c);
            b.stopPropagation()
        });
        return a
    }, addPin: function (a, d, c) {
        var f = b.layout.buttons,
            j = f.get(a, d, c, "pin");
        if (j.length) {
            var h = a.state[c];
            j.click(function (d) {
                f.setPinState(a, b(this), c, h.isSliding || h.isClosed);
                h.isSliding || h.isClosed ? a.open(c) : a.close(c);
                d.stopPropagation()
            });
            f.setPinState(a, j, c, !h.isClosed && !h.isSliding);
            h.pins.push(d)
        }
        return a
    }, setPinState: function (a, b, c, f) {
        var j = b.attr("pin");
        if (!(j && f === ("down" == j))) {
            a = a.options[c];
            var j = a.buttonClass + "-pin", h = j + "-" + c;
            c = j + "-up " + h + "-up";
            j = j + "-down " + h + "-down";
            b.attr("pin", f ? "down" : "up").attr("title", f ? a.tips.Unpin : a.tips.Pin).removeClass(f ?
                c : j).addClass(f ? j : c)
        }
    }, syncPinBtns: function (a, d, c) {
        b.each(a.state[d].pins, function (f, j) {
            b.layout.buttons.setPinState(a, b(j), d, c)
        })
    }, _load: function (a) {
        var d = b.layout.buttons;
        b.extend(a, {bindButton: function (b, c, h) {
            return d.bind(a, b, c, h)
        }, addToggleBtn: function (b, c, h) {
            return d.addToggle(a, b, c, h)
        }, addOpenBtn: function (b, c, h) {
            return d.addOpen(a, b, c, h)
        }, addCloseBtn: function (b, c) {
            return d.addClose(a, b, c)
        }, addPinBtn: function (b, c) {
            return d.addPin(a, b, c)
        }});
        for (var c = 0; 4 > c; c++)a.state[b.layout.config.borderPanes[c]].pins =
            [];
        a.options.autoBindCustomButtons && d.init(a)
    }, _unload: function () {
    }};
    b.layout.onLoad.push(b.layout.buttons._load);
    b.layout.plugins.browserZoom = !0;
    b.layout.defaults.browserZoomCheckInterval = 1E3;
    b.layout.optionsMap.layout.push("browserZoomCheckInterval");
    b.layout.browserZoom = {_init: function (a) {
        !1 !== b.layout.browserZoom.ratio() && b.layout.browserZoom._setTimer(a)
    }, _setTimer: function (a) {
        if (!a.destroyed) {
            var d = a.options, c = a.state, f = a.hasParentLayout ? 5E3 : Math.max(d.browserZoomCheckInterval, 100);
            setTimeout(function () {
                if (!a.destroyed &&
                    d.resizeWithWindow) {
                    var f = b.layout.browserZoom.ratio();
                    f !== c.browserZoom && (c.browserZoom = f, a.resizeAll());
                    b.layout.browserZoom._setTimer(a)
                }
            }, f)
        }
    }, ratio: function () {
        function a(a, b) {
            return(100 * (parseInt(a, 10) / parseInt(b, 10))).toFixed()
        }

        var d = window, c = screen, f = document, j = f.documentElement || f.body, h = b.layout.browser, p = h.version, x, I, T;
        return h.msie && 8 < p || !h.msie ? !1 : c.deviceXDPI && c.systemXDPI ? a(c.deviceXDPI, c.systemXDPI) : h.webkit && (x = f.body.getBoundingClientRect) ? a(x.left - x.right, f.body.offsetWidth) : h.webkit &&
            (I = d.outerWidth) ? a(I, d.innerWidth) : (I = c.width) && (T = j.clientWidth) ? a(I, T) : !1
    }};
    b.layout.onReady.push(b.layout.browserZoom._init)
})(jQuery);