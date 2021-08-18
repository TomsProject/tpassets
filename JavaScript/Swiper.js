var Swiper = function(e, t) {
    "use strict";
    if (!document.body.outerHTML && document.body.__defineGetter__ && HTMLElement) {
        var n = HTMLElement.prototype;
        n.__defineGetter__ && n.__defineGetter__("outerHTML",
        function() {
            return (new XMLSerializer).serializeToString(this)
        })
    }
    if (window.getComputedStyle || (window.getComputedStyle = function(e, t) {
        return this.el = e,
        this.getPropertyValue = function(t) {
            var n = /(\-([a-z]){1})/g;
            return "float" === t && (t = "styleFloat"),
            n.test(t) && (t = t.replace(n,
            function() {
                return arguments[2].toUpperCase()
            })),
            e.currentStyle[t] ? e.currentStyle[t] : null
        },
        this
    }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
        for (var n = t || 0,
        i = this.length; n < i; n++) if (this[n] === e) return n;
        return - 1
    }), (document.querySelectorAll || window.jQuery) && void 0 !== e && (e.nodeType || 0 !== L(e).length)) {
        var i, o, r, a, s, l, c = this;
        c.touches = {
            start: 0,
            startX: 0,
            startY: 0,
            current: 0,
            currentX: 0,
            currentY: 0,
            diff: 0,
            abs: 0
        },
        c.positions = {
            start: 0,
            abs: 0,
            diff: 0,
            current: 0
        },
        c.times = {
            start: 0,
            end: 0
        },
        c.id = (new Date).getTime(),
        c.container = e.nodeType ? e: L(e)[0],
        c.isTouched = !1,
        c.isMoved = !1,
        c.activeIndex = 0,
        c.centerIndex = 0,
        c.activeLoaderIndex = 0,
        c.activeLoopIndex = 0,
        c.previousIndex = null,
        c.velocity = 0,
        c.snapGrid = [],
        c.slidesGrid = [],
        c.imagesToLoad = [],
        c.imagesLoaded = 0,
        c.wrapperLeft = 0,
        c.wrapperRight = 0,
        c.wrapperTop = 0,
        c.wrapperBottom = 0,
        c.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") >= 0;
        var u = {
            eventTarget: "wrapper",
            mode: "horizontal",
            touchRatio: 1,
            speed: 300,
            freeMode: !1,
            freeModeFluid: !1,
            momentumRatio: 1,
            momentumBounce: !0,
            momentumBounceRatio: 1,
            slidesPerView: 1,
            slidesPerGroup: 1,
            slidesPerViewFit: !0,
            simulateTouch: !0,
            followFinger: !0,
            shortSwipes: !0,
            longSwipesRatio: .5,
            moveStartThreshold: !1,
            onlyExternal: !1,
            createPagination: !0,
            pagination: !1,
            paginationElement: "span",
            paginationClickable: !1,
            paginationAsRange: !0,
            resistance: !0,
            scrollContainer: !1,
            preventLinks: !0,
            preventLinksPropagation: !1,
            noSwiping: !1,
            noSwipingClass: "swiper-no-swiping",
            initialSlide: 0,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelControlForceToAxis: !1,
            useCSS3Transforms: !0,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            loop: !1,
            loopAdditionalSlides: 0,
            roundLengths: !1,
            calculateHeight: !1,
            cssWidthAndHeight: !1,
            updateOnImagesReady: !0,
            releaseFormElements: !0,
            watchActiveIndex: !1,
            visibilityFullFit: !1,
            offsetPxBefore: 0,
            offsetPxAfter: 0,
            offsetSlidesBefore: 0,
            offsetSlidesAfter: 0,
            centeredSlides: !1,
            queueStartCallbacks: !1,
            queueEndCallbacks: !1,
            autoResize: !0,
            resizeReInit: !1,
            DOMAnimation: !0,
            loader: {
                slides: [],
                slidesHTMLType: "inner",
                surroundGroups: 1,
                logic: "reload",
                loadAllSlides: !1
            },
            swipeToPrev: !0,
            swipeToNext: !0,
            slideElement: "div",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            wrapperClass: "swiper-wrapper",
            paginationElementClass: "swiper-pagination-switch",
            paginationActiveClass: "swiper-active-switch",
            paginationVisibleClass: "swiper-visible-switch"
        };
        for (var d in t = t || {},
        u) if (d in t && "object" == typeof t[d]) for (var p in u[d]) p in t[d] || (t[d][p] = u[d][p]);
        else d in t || (t[d] = u[d]);
        c.params = t,
        t.scrollContainer && (t.freeMode = !0, t.freeModeFluid = !0),
        t.loop && (t.resistance = "100%");
        var h = "horizontal" === t.mode,
        f = ["mousedown", "mousemove", "mouseup"];
        c.browser.ie10 && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
        c.browser.ie11 && (f = ["pointerdown", "pointermove", "pointerup"]),
        c.touchEvents = {
            touchStart: c.support.touch || !t.simulateTouch ? "touchstart": f[0],
            touchMove: c.support.touch || !t.simulateTouch ? "touchmove": f[1],
            touchEnd: c.support.touch || !t.simulateTouch ? "touchend": f[2]
        };
        for (var m = c.container.childNodes.length - 1; m >= 0; m--) if (c.container.childNodes[m].className) for (var v = c.container.childNodes[m].className.split(/\s+/), g = 0; g < v.length; g++) v[g] === t.wrapperClass && (i = c.container.childNodes[m]);
        c.wrapper = i,
        c._extendSwiperSlide = function(e) {
            return e.append = function() {
                return t.loop ? e.insertAfter(c.slides.length - c.loopedSlides) : (c.wrapper.appendChild(e), c.reInit()),
                e
            },
            e.prepend = function() {
                return t.loop ? (c.wrapper.insertBefore(e, c.slides[c.loopedSlides]), c.removeLoopedSlides(), c.calcSlides(), c.createLoop()) : c.wrapper.insertBefore(e, c.wrapper.firstChild),
                c.reInit(),
                e
            },
            e.insertAfter = function(n) {
                return void 0 !== n && (t.loop ? ((i = c.slides[n + 1 + c.loopedSlides]) ? c.wrapper.insertBefore(e, i) : c.wrapper.appendChild(e), c.removeLoopedSlides(), c.calcSlides(), c.createLoop()) : (i = c.slides[n + 1], c.wrapper.insertBefore(e, i)), c.reInit(), e);
                var i
            }, e.clone = function() {
                return c._extendSwiperSlide(e.cloneNode(!0))
            },
            e.remove = function() {
                c.wrapper.removeChild(e),
                c.reInit()
            },
            e.html = function(t) {
                return void 0 === t ? e.innerHTML: (e.innerHTML = t, e)
            },
            e.index = function() {
                for (var t, n = c.slides.length - 1; n >= 0; n--) e === c.slides[n] && (t = n);
                return t
            },
            e.isActive = function() {
                return e.index() === c.activeIndex
            },
            e.swiperSlideDataStorage || (e.swiperSlideDataStorage = {}),
            e.getData = function(t) {
                return e.swiperSlideDataStorage[t]
            },
            e.setData = function(t, n) {
                return e.swiperSlideDataStorage[t] = n,
                e
            },
            e.data = function(t, n) {
                return void 0 === n ? e.getAttribute("data-" + t) : (e.setAttribute("data-" + t, n), e)
            },
            e.getWidth = function(t, n) {
                return c.h.getWidth(e, t, n)
            },
            e.getHeight = function(t, n) {
                return c.h.getHeight(e, t, n)
            },
            e.getOffset = function() {
                return c.h.getOffset(e)
            },
            e
        },
        c.calcSlides = function(e) {
            var n = !!c.slides && c.slides.length;
            c.slides = [],
            c.displaySlides = [];
            for (var i = 0; i < c.wrapper.childNodes.length; i++) if (c.wrapper.childNodes[i].className) for (var o = c.wrapper.childNodes[i].className.split(/\s+/), r = 0; r < o.length; r++) o[r] === t.slideClass && c.slides.push(c.wrapper.childNodes[i]);
            for (i = c.slides.length - 1; i >= 0; i--) c._extendSwiperSlide(c.slides[i]); ! 1 !== n && (n !== c.slides.length || e) && (P(), M(), c.updateActiveSlide(), c.params.pagination && c.createPagination(), c.callPlugins("numberOfSlidesChanged"))
        },
        c.createSlide = function(e, n, i) {
            n = n || c.params.slideClass,
            i = i || t.slideElement;
            var o = document.createElement(i);
            return o.innerHTML = e || "",
            o.className = n,
            c._extendSwiperSlide(o)
        },
        c.appendSlide = function(e, t, n) {
            if (e) return e.nodeType ? c._extendSwiperSlide(e).append() : c.createSlide(e, t, n).append()
        },
        c.prependSlide = function(e, t, n) {
            if (e) return e.nodeType ? c._extendSwiperSlide(e).prepend() : c.createSlide(e, t, n).prepend()
        },
        c.insertSlideAfter = function(e, t, n, i) {
            return void 0 !== e && (t.nodeType ? c._extendSwiperSlide(t).insertAfter(e) : c.createSlide(t, n, i).insertAfter(e))
        },
        c.removeSlide = function(e) {
            if (c.slides[e]) {
                if (t.loop) {
                    if (!c.slides[e + c.loopedSlides]) return ! 1;
                    c.slides[e + c.loopedSlides].remove(),
                    c.removeLoopedSlides(),
                    c.calcSlides(),
                    c.createLoop()
                } else c.slides[e].remove();
                return ! 0
            }
            return ! 1
        },
        c.removeLastSlide = function() {
            return c.slides.length > 0 && (t.loop ? (c.slides[c.slides.length - 1 - c.loopedSlides].remove(), c.removeLoopedSlides(), c.calcSlides(), c.createLoop()) : c.slides[c.slides.length - 1].remove(), !0)
        },
        c.removeAllSlides = function() {
            for (var e = c.slides.length,
            t = c.slides.length - 1; t >= 0; t--) c.slides[t].remove(),
            t === e - 1 && c.setWrapperTranslate(0)
        },
        c.getSlide = function(e) {
            return c.slides[e]
        },
        c.getLastSlide = function() {
            return c.slides[c.slides.length - 1]
        },
        c.getFirstSlide = function() {
            return c.slides[0]
        },
        c.activeSlide = function() {
            return c.slides[c.activeIndex]
        },
        c.fireCallback = function() {
            var e = arguments[0];
            if ("[object Array]" === Object.prototype.toString.call(e)) for (var n = 0; n < e.length; n++)"function" == typeof e[n] && e[n](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            else "[object String]" === Object.prototype.toString.call(e) ? t["on" + e] && c.fireCallback(t["on" + e], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]) : e(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        },
        c.addCallback = function(e, t) {
            var n, i;
            return this.params["on" + e] ? (i = this.params["on" + e], "[object Array]" === Object.prototype.toString.apply(i) ? this.params["on" + e].push(t) : "function" == typeof this.params["on" + e] ? (n = this.params["on" + e], this.params["on" + e] = [], this.params["on" + e].push(n), this.params["on" + e].push(t)) : void 0) : (this.params["on" + e] = [], this.params["on" + e].push(t))
        },
        c.removeCallbacks = function(e) {
            c.params["on" + e] && (c.params["on" + e] = null)
        };
        var y = [];
        for (var b in c.plugins) if (t[b]) {
            var w = c.plugins[b](c, t[b]);
            w && y.push(w)
        }
        c.callPlugins = function(e, t) {
            t || (t = {});
            for (var n = 0; n < y.length; n++) e in y[n] && y[n][e](t)
        },
        !c.browser.ie10 && !c.browser.ie11 || t.onlyExternal || c.wrapper.classList.add("swiper-wp8-" + (h ? "horizontal": "vertical")),
        t.freeMode && (c.container.className += " swiper-free-mode"),
        c.initialized = !1,
        c.init = function(e, n) {
            var i = c.h.getWidth(c.container, !1, t.roundLengths),
            a = c.h.getHeight(c.container, !1, t.roundLengths);
            if (i !== c.width || a !== c.height || e) {
                var s, u, d, p, f, m, v;
                c.width = i,
                c.height = a,
                l = h ? i: a;
                var g = c.wrapper;
                if (e && c.calcSlides(n), "auto" === t.slidesPerView) {
                    var y = 0,
                    b = 0;
                    t.slidesOffset > 0 && (g.style.paddingLeft = "", g.style.paddingRight = "", g.style.paddingTop = "", g.style.paddingBottom = ""),
                    g.style.width = "",
                    g.style.height = "",
                    t.offsetPxBefore > 0 && (h ? c.wrapperLeft = t.offsetPxBefore: c.wrapperTop = t.offsetPxBefore),
                    t.offsetPxAfter > 0 && (h ? c.wrapperRight = t.offsetPxAfter: c.wrapperBottom = t.offsetPxAfter),
                    t.centeredSlides && (h ? (c.wrapperLeft = (l - this.slides[0].getWidth(!0, t.roundLengths)) / 2, c.wrapperRight = (l - c.slides[c.slides.length - 1].getWidth(!0, t.roundLengths)) / 2) : (c.wrapperTop = (l - c.slides[0].getHeight(!0, t.roundLengths)) / 2, c.wrapperBottom = (l - c.slides[c.slides.length - 1].getHeight(!0, t.roundLengths)) / 2)),
                    h ? (c.wrapperLeft >= 0 && (g.style.paddingLeft = c.wrapperLeft + "px"), c.wrapperRight >= 0 && (g.style.paddingRight = c.wrapperRight + "px")) : (c.wrapperTop >= 0 && (g.style.paddingTop = c.wrapperTop + "px"), c.wrapperBottom >= 0 && (g.style.paddingBottom = c.wrapperBottom + "px")),
                    m = 0;
                    var w = 0;
                    for (c.snapGrid = [], c.slidesGrid = [], d = 0, v = 0; v < c.slides.length; v++) {
                        s = c.slides[v].getWidth(!0, t.roundLengths),
                        u = c.slides[v].getHeight(!0, t.roundLengths),
                        t.calculateHeight && (d = Math.max(d, u));
                        var x = h ? s: u;
                        if (t.centeredSlides) {
                            var T = v === c.slides.length - 1 ? 0 : c.slides[v + 1].getWidth(!0, t.roundLengths),
                            S = v === c.slides.length - 1 ? 0 : c.slides[v + 1].getHeight(!0, t.roundLengths),
                            _ = h ? T: S;
                            if (x > l) {
                                if (t.slidesPerViewFit) c.snapGrid.push(m + c.wrapperLeft),
                                c.snapGrid.push(m + x - l + c.wrapperLeft);
                                else for (var C = 0; C <= Math.floor(x / (l + c.wrapperLeft)); C++) 0 === C ? c.snapGrid.push(m + c.wrapperLeft) : c.snapGrid.push(m + c.wrapperLeft + l * C);
                                c.slidesGrid.push(m + c.wrapperLeft)
                            } else c.snapGrid.push(w),
                            c.slidesGrid.push(w);
                            w += x / 2 + _ / 2
                        } else {
                            if (x > l) if (t.slidesPerViewFit) c.snapGrid.push(m),
                            c.snapGrid.push(m + x - l);
                            else if (0 !== l) for (var k = 0; k <= Math.floor(x / l); k++) c.snapGrid.push(m + l * k);
                            else c.snapGrid.push(m);
                            else c.snapGrid.push(m);
                            c.slidesGrid.push(m)
                        }
                        m += x,
                        y += s,
                        b += u
                    }
                    t.calculateHeight && (c.height = d),
                    h ? (r = y + c.wrapperRight + c.wrapperLeft, t.cssWidthAndHeight && "height" !== t.cssWidthAndHeight || (g.style.width = y + "px"), t.cssWidthAndHeight && "width" !== t.cssWidthAndHeight || (g.style.height = c.height + "px")) : (t.cssWidthAndHeight && "height" !== t.cssWidthAndHeight || (g.style.width = c.width + "px"), t.cssWidthAndHeight && "width" !== t.cssWidthAndHeight || (g.style.height = b + "px"), r = b + c.wrapperTop + c.wrapperBottom)
                } else if (t.scrollContainer) g.style.width = "",
                g.style.height = "",
                p = c.slides[0].getWidth(!0, t.roundLengths),
                f = c.slides[0].getHeight(!0, t.roundLengths),
                r = h ? p: f,
                g.style.width = p + "px",
                g.style.height = f + "px",
                o = h ? p: f;
                else {
                    if (t.calculateHeight) {
                        for (d = 0, f = 0, h || (c.container.style.height = ""), g.style.height = "", v = 0; v < c.slides.length; v++) c.slides[v].style.height = "",
                        d = Math.max(c.slides[v].getHeight(!0), d),
                        h || (f += c.slides[v].getHeight(!0));
                        u = d,
                        c.height = u,
                        h ? f = u: (l = u, c.container.style.height = l + "px")
                    } else u = h ? c.height: c.height / t.slidesPerView,
                    t.roundLengths && (u = Math.ceil(u)),
                    f = h ? c.height: c.slides.length * u;
                    for (s = h ? c.width / t.slidesPerView: c.width, t.roundLengths && (s = Math.ceil(s)), p = h ? c.slides.length * s: c.width, o = h ? s: u, t.offsetSlidesBefore > 0 && (h ? c.wrapperLeft = o * t.offsetSlidesBefore: c.wrapperTop = o * t.offsetSlidesBefore), t.offsetSlidesAfter > 0 && (h ? c.wrapperRight = o * t.offsetSlidesAfter: c.wrapperBottom = o * t.offsetSlidesAfter), t.offsetPxBefore > 0 && (h ? c.wrapperLeft = t.offsetPxBefore: c.wrapperTop = t.offsetPxBefore), t.offsetPxAfter > 0 && (h ? c.wrapperRight = t.offsetPxAfter: c.wrapperBottom = t.offsetPxAfter), t.centeredSlides && (h ? (c.wrapperLeft = (l - o) / 2, c.wrapperRight = (l - o) / 2) : (c.wrapperTop = (l - o) / 2, c.wrapperBottom = (l - o) / 2)), h ? (c.wrapperLeft > 0 && (g.style.paddingLeft = c.wrapperLeft + "px"), c.wrapperRight > 0 && (g.style.paddingRight = c.wrapperRight + "px")) : (c.wrapperTop > 0 && (g.style.paddingTop = c.wrapperTop + "px"), c.wrapperBottom > 0 && (g.style.paddingBottom = c.wrapperBottom + "px")), r = h ? p + c.wrapperRight + c.wrapperLeft: f + c.wrapperTop + c.wrapperBottom, parseFloat(p) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (g.style.width = p + "px"), parseFloat(f) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (g.style.height = f + "px"), m = 0, c.snapGrid = [], c.slidesGrid = [], v = 0; v < c.slides.length; v++) c.snapGrid.push(m),
                    c.slidesGrid.push(m),
                    m += o,
                    parseFloat(s) > 0 && (!t.cssWidthAndHeight || "height" === t.cssWidthAndHeight) && (c.slides[v].style.width = s + "px"),
                    parseFloat(u) > 0 && (!t.cssWidthAndHeight || "width" === t.cssWidthAndHeight) && (c.slides[v].style.height = u + "px")
                }
                c.initialized ? (c.callPlugins("onInit"), t.onInit && c.fireCallback(t.onInit, c)) : (c.callPlugins("onFirstInit"), t.onFirstInit && c.fireCallback(t.onFirstInit, c)),
                c.initialized = !0
            }
        },
        c.reInit = function(e) {
            c.init(!0, e)
        },
        c.resizeFix = function(e) {
            c.callPlugins("beforeResizeFix"),
            c.init(t.resizeReInit || e),
            t.freeMode ? c.getWrapperTranslate() < -A() && (c.setWrapperTransition(0), c.setWrapperTranslate( - A())) : (c.swipeTo(t.loop ? c.activeLoopIndex: c.activeIndex, 0, !1), t.autoplay && (c.support.transitions && void 0 !== k ? void 0 !== k && (clearTimeout(k), k = void 0, c.startAutoplay()) : void 0 !== j && (clearInterval(j), j = void 0, c.startAutoplay()))),
            c.callPlugins("afterResizeFix")
        },
        c.destroy = function(e) {
            var n = c.h.removeEventListener,
            i = "wrapper" === t.eventTarget ? c.wrapper: c.container;
            if (c.browser.ie10 || c.browser.ie11 ? (n(i, c.touchEvents.touchStart, $), n(document, c.touchEvents.touchMove, q), n(document, c.touchEvents.touchEnd, W)) : (c.support.touch && (n(i, "touchstart", $), n(i, "touchmove", q), n(i, "touchend", W)), t.simulateTouch && (n(i, "mousedown", $), n(document, "mousemove", q), n(document, "mouseup", W))), t.autoResize && n(window, "resize", c.resizeFix), P(), t.paginationClickable && X(), t.mousewheelControl && c._wheelEvent && n(c.container, c._wheelEvent, F), t.keyboardControl && n(document, "keydown", D), t.autoplay && c.stopAutoplay(), e) {
                c.wrapper.removeAttribute("style");
                for (var o = 0; o < c.slides.length; o++) c.slides[o].removeAttribute("style")
            }
            c.callPlugins("onDestroy"),
            window.jQuery && window.jQuery(c.container).data("swiper") && window.jQuery(c.container).removeData("swiper"),
            window.Zepto && window.Zepto(c.container).data("swiper") && window.Zepto(c.container).removeData("swiper"),
            c = null
        },
        c.disableKeyboardControl = function() {
            t.keyboardControl = !1,
            c.h.removeEventListener(document, "keydown", D)
        },
        c.enableKeyboardControl = function() {
            t.keyboardControl = !0,
            c.h.addEventListener(document, "keydown", D)
        };
        var x = (new Date).getTime();
        if (c.disableMousewheelControl = function() {
            return !! c._wheelEvent && (t.mousewheelControl = !1, c.h.removeEventListener(c.container, c._wheelEvent, F), !0)
        },
        c.enableMousewheelControl = function() {
            return !! c._wheelEvent && (t.mousewheelControl = !0, c.h.addEventListener(c.container, c._wheelEvent, F), !0)
        },
        t.grabCursor) {
            var T = c.container.style;
            T.cursor = "move",
            T.cursor = "grab",
            T.cursor = "-moz-grab",
            T.cursor = "-webkit-grab"
        }
        c.allowSlideClick = !0,
        c.allowLinks = !0;
        var S, _, C, k, j, E = !1,
        N = !0;
        c.swipeNext = function(e, n) {
            void 0 === e && (e = !0),
            !n && t.loop && c.fixLoop(),
            !n && t.autoplay && c.stopAutoplay(!0),
            c.callPlugins("onSwipeNext");
            var i = c.getWrapperTranslate().toFixed(2),
            r = i;
            if ("auto" === t.slidesPerView) {
                for (var a = 0; a < c.snapGrid.length; a++) if ( - i >= c.snapGrid[a].toFixed(2) && -i < c.snapGrid[a + 1].toFixed(2)) {
                    r = -c.snapGrid[a + 1];
                    break
                }
            } else {
                var s = o * t.slidesPerGroup;
                r = -(Math.floor(Math.abs(i) / Math.floor(s)) * s + s)
            }
            return r < -A() && (r = -A()),
            r !== i && (G(r, "next", {
                runCallbacks: e
            }), !0)
        },
        c.swipePrev = function(e, n) {
            void 0 === e && (e = !0),
            !n && t.loop && c.fixLoop(),
            !n && t.autoplay && c.stopAutoplay(!0),
            c.callPlugins("onSwipePrev");
            var i, r = Math.ceil(c.getWrapperTranslate());
            if ("auto" === t.slidesPerView) {
                i = 0;
                for (var a = 1; a < c.snapGrid.length; a++) {
                    if ( - r === c.snapGrid[a]) {
                        i = -c.snapGrid[a - 1];
                        break
                    }
                    if ( - r > c.snapGrid[a] && -r < c.snapGrid[a + 1]) {
                        i = -c.snapGrid[a];
                        break
                    }
                }
            } else {
                var s = o * t.slidesPerGroup;
                i = -(Math.ceil( - r / s) - 1) * s
            }
            return i > 0 && (i = 0),
            i !== r && (G(i, "prev", {
                runCallbacks: e
            }), !0)
        },
        c.swipeReset = function(e) {
            void 0 === e && (e = !0),
            c.callPlugins("onSwipeReset");
            var n, i = c.getWrapperTranslate(),
            r = o * t.slidesPerGroup;
            A();
            if ("auto" === t.slidesPerView) {
                n = 0;
                for (var a = 0; a < c.snapGrid.length; a++) {
                    if ( - i === c.snapGrid[a]) return;
                    if ( - i >= c.snapGrid[a] && -i < c.snapGrid[a + 1]) {
                        n = c.positions.diff > 0 ? -c.snapGrid[a + 1] : -c.snapGrid[a];
                        break
                    }
                } - i >= c.snapGrid[c.snapGrid.length - 1] && (n = -c.snapGrid[c.snapGrid.length - 1]),
                i <= -A() && (n = -A())
            } else n = i < 0 ? Math.round(i / r) * r: 0,
            i <= -A() && (n = -A());
            return t.scrollContainer && (n = i < 0 ? i: 0),
            n < -A() && (n = -A()),
            t.scrollContainer && l > o && (n = 0),
            n !== i && (G(n, "reset", {
                runCallbacks: e
            }), !0)
        },
        c.swipeTo = function(e, n, i) {
            e = parseInt(e, 10),
            c.callPlugins("onSwipeTo", {
                index: e,
                speed: n
            }),
            t.loop && (e += c.loopedSlides);
            var r, a = c.getWrapperTranslate();
            if (! (!isFinite(e) || e > c.slides.length - 1 || e < 0)) return (r = "auto" === t.slidesPerView ? -c.slidesGrid[e] : -e * o) < -A() && (r = -A()),
            r !== a && (void 0 === i && (i = !0), G(r, "to", {
                index: e,
                speed: n,
                runCallbacks: i
            }), !0)
        },
        c._queueStartCallbacks = !1,
        c._queueEndCallbacks = !1,
        c.updateActiveSlide = function(e) {
            if (c.initialized && 0 !== c.slides.length) {
                var n;
                if (c.previousIndex = c.activeIndex, void 0 === e && (e = c.getWrapperTranslate()), e > 0 && (e = 0), "auto" === t.slidesPerView) {
                    if (c.activeIndex = c.slidesGrid.indexOf( - e), c.activeIndex < 0) {
                        for (n = 0; n < c.slidesGrid.length - 1 && !( - e > c.slidesGrid[n] && -e < c.slidesGrid[n + 1]); n++);
                        var i = Math.abs(c.slidesGrid[n] + e),
                        r = Math.abs(c.slidesGrid[n + 1] + e);
                        c.activeIndex = i <= r ? n: n + 1
                    }
                } else c.activeIndex = Math[t.visibilityFullFit ? "ceil": "round"]( - e / o);
                if (c.activeIndex === c.slides.length && (c.activeIndex = c.slides.length - 1), c.activeIndex < 0 && (c.activeIndex = 0), c.slides[c.activeIndex]) {
                    if (c.calcVisibleSlides(e), c.support.classList) {
                        var a;
                        for (n = 0; n < c.slides.length; n++)(a = c.slides[n]).classList.remove(t.slideActiveClass),
                        c.visibleSlides.indexOf(a) >= 0 ? a.classList.add(t.slideVisibleClass) : a.classList.remove(t.slideVisibleClass);
                        c.slides[c.activeIndex].classList.add(t.slideActiveClass)
                    } else {
                        var s = new RegExp("\\s*" + t.slideActiveClass),
                        l = new RegExp("\\s*" + t.slideVisibleClass);
                        for (n = 0; n < c.slides.length; n++) c.slides[n].className = c.slides[n].className.replace(s, "").replace(l, ""),
                        c.visibleSlides.indexOf(c.slides[n]) >= 0 && (c.slides[n].className += " " + t.slideVisibleClass);
                        c.slides[c.activeIndex].className += " " + t.slideActiveClass
                    }
                    if (t.loop) {
                        var u = c.loopedSlides;
                        c.activeLoopIndex = c.activeIndex - u,
                        c.activeLoopIndex >= c.slides.length - 2 * u && (c.activeLoopIndex = c.slides.length - 2 * u - c.activeLoopIndex),
                        c.activeLoopIndex < 0 && (c.activeLoopIndex = c.slides.length - 2 * u + c.activeLoopIndex),
                        c.activeLoopIndex < 0 && (c.activeLoopIndex = 0)
                    } else c.activeLoopIndex = c.activeIndex;
                    t.pagination && c.updatePagination(e)
                }
            }
        },
        c.createPagination = function(e) {
            if (t.paginationClickable && c.paginationButtons && X(), c.paginationContainer = t.pagination.nodeType ? t.pagination: L(t.pagination)[0], t.createPagination) {
                var n = "",
                i = c.slides.length;
                t.loop && (i -= 2 * c.loopedSlides);
                for (var o = 0; o < i; o++) n += "<" + t.paginationElement + ' class="' + t.paginationElementClass + '"></' + t.paginationElement + ">";
                c.paginationContainer.innerHTML = n
            }
            c.paginationButtons = L("." + t.paginationElementClass, c.paginationContainer),
            e || c.updatePagination(),
            c.callPlugins("onCreatePagination"),
            t.paginationClickable &&
            function() {
                var e = c.paginationButtons;
                if (e) for (var t = 0; t < e.length; t++) c.h.addEventListener(e[t], "click", U)
            } ()
        },
        c.updatePagination = function(e) {
            if (t.pagination && (!(c.slides.length < 1) && L("." + t.paginationActiveClass, c.paginationContainer))) {
                var n = c.paginationButtons;
                if (0 !== n.length) {
                    for (var i = 0; i < n.length; i++) n[i].className = t.paginationElementClass;
                    var o = t.loop ? c.loopedSlides: 0;
                    if (t.paginationAsRange) {
                        c.visibleSlides || c.calcVisibleSlides(e);
                        var r, a = [];
                        for (r = 0; r < c.visibleSlides.length; r++) {
                            var s = c.slides.indexOf(c.visibleSlides[r]) - o;
                            t.loop && s < 0 && (s = c.slides.length - 2 * c.loopedSlides + s),
                            t.loop && s >= c.slides.length - 2 * c.loopedSlides && (s = c.slides.length - 2 * c.loopedSlides - s, s = Math.abs(s)),
                            a.push(s)
                        }
                        for (r = 0; r < a.length; r++) n[a[r]] && (n[a[r]].className += " " + t.paginationVisibleClass);
                        t.loop ? void 0 !== n[c.activeLoopIndex] && (n[c.activeLoopIndex].className += " " + t.paginationActiveClass) : n[c.activeIndex] && (n[c.activeIndex].className += " " + t.paginationActiveClass)
                    } else t.loop ? n[c.activeLoopIndex] && (n[c.activeLoopIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass) : n[c.activeIndex] && (n[c.activeIndex].className += " " + t.paginationActiveClass + " " + t.paginationVisibleClass)
                }
            }
        },
        c.calcVisibleSlides = function(e) {
            var n = [],
            i = 0,
            r = 0,
            a = 0;
            h && c.wrapperLeft > 0 && (e += c.wrapperLeft),
            !h && c.wrapperTop > 0 && (e += c.wrapperTop);
            for (var s = 0; s < c.slides.length; s++) {
                a = (i += r) + (r = "auto" === t.slidesPerView ? h ? c.h.getWidth(c.slides[s], !0, t.roundLengths) : c.h.getHeight(c.slides[s], !0, t.roundLengths) : o);
                var u = !1;
                t.visibilityFullFit ? (i >= -e && a <= -e + l && (u = !0), i <= -e && a >= -e + l && (u = !0)) : (a > -e && a <= -e + l && (u = !0), i >= -e && i < -e + l && (u = !0), i < -e && a > -e + l && (u = !0)),
                u && n.push(c.slides[s])
            }
            0 === n.length && (n = [c.slides[c.activeIndex]]),
            c.visibleSlides = n
        },
        c.startAutoplay = function() {
            if (c.support.transitions) {
                if (void 0 !== k) return ! 1;
                if (!t.autoplay) return;
                c.callPlugins("onAutoplayStart"),
                t.onAutoplayStart && c.fireCallback(t.onAutoplayStart, c),
                Y()
            } else {
                if (void 0 !== j) return ! 1;
                if (!t.autoplay) return;
                c.callPlugins("onAutoplayStart"),
                t.onAutoplayStart && c.fireCallback(t.onAutoplayStart, c),
                j = setInterval(function() {
                    t.loop ? (c.fixLoop(), c.swipeNext(!0, !0)) : c.swipeNext(!0, !0) || (t.autoplayStopOnLast ? (clearInterval(j), j = void 0) : c.swipeTo(0))
                },
                t.autoplay)
            }
        },
        c.stopAutoplay = function(e) {
            if (c.support.transitions) {
                if (!k) return;
                k && clearTimeout(k),
                k = void 0,
                e && !t.autoplayDisableOnInteraction && c.wrapperTransitionEnd(function() {
                    Y()
                }),
                c.callPlugins("onAutoplayStop"),
                t.onAutoplayStop && c.fireCallback(t.onAutoplayStop, c)
            } else j && clearInterval(j),
            j = void 0,
            c.callPlugins("onAutoplayStop"),
            t.onAutoplayStop && c.fireCallback(t.onAutoplayStop, c)
        },
        c.loopCreated = !1,
        c.removeLoopedSlides = function() {
            if (c.loopCreated) for (var e = 0; e < c.slides.length; e++) ! 0 === c.slides[e].getData("looped") && c.wrapper.removeChild(c.slides[e])
        },
        c.createLoop = function() {
            if (0 !== c.slides.length) {
                "auto" === t.slidesPerView ? c.loopedSlides = t.loopedSlides || 1 : c.loopedSlides = Math.floor(t.slidesPerView) + t.loopAdditionalSlides,
                c.loopedSlides > c.slides.length && (c.loopedSlides = c.slides.length);
                var e, n = "",
                o = "",
                r = "",
                a = c.slides.length,
                s = Math.floor(c.loopedSlides / a),
                l = c.loopedSlides % a;
                for (e = 0; e < s * a; e++) {
                    var u = e;
                    if (e >= a) u = e - a * Math.floor(e / a);
                    r += c.slides[u].outerHTML
                }
                for (e = 0; e < l; e++) o += V(t.slideDuplicateClass, c.slides[e].outerHTML);
                for (e = a - l; e < a; e++) n += V(t.slideDuplicateClass, c.slides[e].outerHTML);
                var d = n + r + i.innerHTML + r + o;
                for (i.innerHTML = d, c.loopCreated = !0, c.calcSlides(), e = 0; e < c.slides.length; e++)(e < c.loopedSlides || e >= c.slides.length - c.loopedSlides) && c.slides[e].setData("looped", !0);
                c.callPlugins("onCreateLoop")
            }
        },
        c.fixLoop = function() {
            var e;
            c.activeIndex < c.loopedSlides ? (e = c.slides.length - 3 * c.loopedSlides + c.activeIndex, c.swipeTo(e, 0, !1)) : ("auto" === t.slidesPerView && c.activeIndex >= 2 * c.loopedSlides || c.activeIndex > c.slides.length - 2 * t.slidesPerView) && (e = -c.slides.length + c.activeIndex + c.loopedSlides, c.swipeTo(e, 0, !1))
        },
        c.loadSlides = function() {
            var e = "";
            c.activeLoaderIndex = 0;
            for (var n = t.loader.slides,
            i = t.loader.loadAllSlides ? n.length: t.slidesPerView * (1 + t.loader.surroundGroups), o = 0; o < i; o++)"outer" === t.loader.slidesHTMLType ? e += n[o] : e += "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + o + '">' + n[o] + "</" + t.slideElement + ">";
            c.wrapper.innerHTML = e,
            c.calcSlides(!0),
            t.loader.loadAllSlides || c.wrapperTransitionEnd(c.reloadSlides, !0)
        },
        c.reloadSlides = function() {
            var e = t.loader.slides,
            n = parseInt(c.activeSlide().data("swiperindex"), 10);
            if (! (n < 0 || n > e.length - 1)) {
                c.activeLoaderIndex = n;
                var i, r = Math.max(0, n - t.slidesPerView * t.loader.surroundGroups),
                a = Math.min(n + t.slidesPerView * (1 + t.loader.surroundGroups) - 1, e.length - 1);
                if (n > 0) {
                    var s = -o * (n - r);
                    c.setWrapperTranslate(s),
                    c.setWrapperTransition(0)
                }
                if ("reload" === t.loader.logic) {
                    c.wrapper.innerHTML = "";
                    var l = "";
                    for (i = r; i <= a; i++) l += "outer" === t.loader.slidesHTMLType ? e[i] : "<" + t.slideElement + ' class="' + t.slideClass + '" data-swiperindex="' + i + '">' + e[i] + "</" + t.slideElement + ">";
                    c.wrapper.innerHTML = l
                } else {
                    var u = 1e3,
                    d = 0;
                    for (i = 0; i < c.slides.length; i++) {
                        var p = c.slides[i].data("swiperindex");
                        p < r || p > a ? c.wrapper.removeChild(c.slides[i]) : (u = Math.min(p, u), d = Math.max(p, d))
                    }
                    for (i = r; i <= a; i++) {
                        var h;
                        i < u && ((h = document.createElement(t.slideElement)).className = t.slideClass, h.setAttribute("data-swiperindex", i), h.innerHTML = e[i], c.wrapper.insertBefore(h, c.wrapper.firstChild)),
                        i > d && ((h = document.createElement(t.slideElement)).className = t.slideClass, h.setAttribute("data-swiperindex", i), h.innerHTML = e[i], c.wrapper.appendChild(h))
                    }
                }
                c.reInit(!0)
            }
        },
        c.calcSlides(),
        t.loader.slides.length > 0 && 0 === c.slides.length && c.loadSlides(),
        t.loop && c.createLoop(),
        c.init(),
        function() {
            var e, n, i, o, r = c.h.addEventListener,
            a = "wrapper" === t.eventTarget ? c.wrapper: c.container;
            if (c.browser.ie10 || c.browser.ie11 ? (r(a, c.touchEvents.touchStart, $), r(document, c.touchEvents.touchMove, q), r(document, c.touchEvents.touchEnd, W)) : (c.support.touch && (r(a, "touchstart", $), r(a, "touchmove", q), r(a, "touchend", W)), t.simulateTouch && (r(a, "mousedown", $), r(document, "mousemove", q), r(document, "mouseup", W))), t.autoResize && r(window, "resize", c.resizeFix), M(), c._wheelEvent = !1, t.mousewheelControl) {
                if (void 0 !== document.onmousewheel && (c._wheelEvent = "mousewheel"), !c._wheelEvent) try {
                    new WheelEvent("wheel"),
                    c._wheelEvent = "wheel"
                } catch(e) {}
                c._wheelEvent || (c._wheelEvent = "DOMMouseScroll"),
                c._wheelEvent && r(c.container, c._wheelEvent, F)
            }
            if (t.keyboardControl && r(document, "keydown", D), t.updateOnImagesReady) {
                c.imagesToLoad = L("img", c.container);
                for (var s = 0; s < c.imagesToLoad.length; s++) e = c.imagesToLoad[s],
                n = void 0,
                i = void 0,
                o = function() {
                    void 0 !== c && null !== c && (void 0 !== c.imagesLoaded && c.imagesLoaded++, c.imagesLoaded === c.imagesToLoad.length && (c.reInit(), t.onImagesReady && c.fireCallback(t.onImagesReady, c)))
                },
                e.complete ? o() : (i = e.currentSrc || e.getAttribute("src")) ? ((n = new Image).onload = o, n.onerror = o, n.src = i) : o()
            }
        } (),
        t.pagination && c.createPagination(!0),
        t.loop || t.initialSlide > 0 ? c.swipeTo(t.initialSlide, 0, !1) : c.updateActiveSlide(0),
        t.autoplay && c.startAutoplay(),
        c.centerIndex = c.activeIndex,
        t.onSwiperCreated && c.fireCallback(t.onSwiperCreated, c),
        c.callPlugins("onSwiperCreated")
    }
    function L(e, t) {
        return document.querySelectorAll ? (t || document).querySelectorAll(e) : jQuery(e, t)
    }
    function A() {
        var e = r - l;
        return t.freeMode && (e = r - l),
        t.slidesPerView > c.slides.length && !t.centeredSlides && (e = 0),
        e < 0 && (e = 0),
        e
    }
    function M() {
        var e, n = c.h.addEventListener;
        if (t.preventLinks) {
            var i = L("a", c.container);
            for (e = 0; e < i.length; e++) n(i[e], "click", O)
        }
        if (t.releaseFormElements) {
            var o = L("input, textarea, select", c.container);
            for (e = 0; e < o.length; e++) n(o[e], c.touchEvents.touchStart, B, !0),
            c.support.touch && t.simulateTouch && n(o[e], "mousedown", B, !0)
        }
        if (t.onSlideClick) for (e = 0; e < c.slides.length; e++) n(c.slides[e], "click", I);
        if (t.onSlideTouch) for (e = 0; e < c.slides.length; e++) n(c.slides[e], c.touchEvents.touchStart, H)
    }
    function P() {
        var e, n = c.h.removeEventListener;
        if (t.onSlideClick) for (e = 0; e < c.slides.length; e++) n(c.slides[e], "click", I);
        if (t.onSlideTouch) for (e = 0; e < c.slides.length; e++) n(c.slides[e], c.touchEvents.touchStart, H);
        if (t.releaseFormElements) {
            var i = L("input, textarea, select", c.container);
            for (e = 0; e < i.length; e++) n(i[e], c.touchEvents.touchStart, B, !0),
            c.support.touch && t.simulateTouch && n(i[e], "mousedown", B, !0)
        }
        if (t.preventLinks) {
            var o = L("a", c.container);
            for (e = 0; e < o.length; e++) n(o[e], "click", O)
        }
    }
    function D(e) {
        var t = e.keyCode || e.charCode;
        if (! (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)) {
            if (37 === t || 39 === t || 38 === t || 40 === t) {
                for (var n = !1,
                i = c.h.getOffset(c.container), o = c.h.windowScroll().left, r = c.h.windowScroll().top, a = c.h.windowWidth(), s = c.h.windowHeight(), l = [[i.left, i.top], [i.left + c.width, i.top], [i.left, i.top + c.height], [i.left + c.width, i.top + c.height]], u = 0; u < l.length; u++) {
                    var d = l[u];
                    d[0] >= o && d[0] <= o + a && d[1] >= r && d[1] <= r + s && (n = !0)
                }
                if (!n) return
            }
            h ? (37 !== t && 39 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 39 === t && c.swipeNext(), 37 === t && c.swipePrev()) : (38 !== t && 40 !== t || (e.preventDefault ? e.preventDefault() : e.returnValue = !1), 40 === t && c.swipeNext(), 38 === t && c.swipePrev())
        }
    }
    function F(e) {
        var n = c._wheelEvent,
        i = 0;
        if (e.detail) i = -e.detail;
        else if ("mousewheel" === n) if (t.mousewheelControlForceToAxis) if (h) {
            if (! (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY))) return;
            i = e.wheelDeltaX
        } else {
            if (! (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX))) return;
            i = e.wheelDeltaY
        } else i = e.wheelDelta;
        else if ("DOMMouseScroll" === n) i = -e.detail;
        else if ("wheel" === n) if (t.mousewheelControlForceToAxis) if (h) {
            if (! (Math.abs(e.deltaX) > Math.abs(e.deltaY))) return;
            i = -e.deltaX
        } else {
            if (! (Math.abs(e.deltaY) > Math.abs(e.deltaX))) return;
            i = -e.deltaY
        } else i = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX: -e.deltaY;
        if (t.freeMode) {
            var o = c.getWrapperTranslate() + i;
            if (o > 0 && (o = 0), o < -A() && (o = -A()), c.setWrapperTransition(0), c.setWrapperTranslate(o), c.updateActiveSlide(o), 0 === o || o === -A()) return
        } else(new Date).getTime() - x > 60 && (i < 0 ? c.swipeNext() : c.swipePrev()),
        x = (new Date).getTime();
        return t.autoplay && c.stopAutoplay(!0),
        e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        !1
    }
    function I(e) {
        c.allowSlideClick && (R(e), c.fireCallback(t.onSlideClick, c, e))
    }
    function H(e) {
        R(e),
        c.fireCallback(t.onSlideTouch, c, e)
    }
    function R(e) {
        if (e.currentTarget) c.clickedSlide = e.currentTarget;
        else {
            var n = e.srcElement;
            do {
                if (n.className.indexOf(t.slideClass) > -1) break;
                n = n.parentNode
            } while ( n );
            c.clickedSlide = n
        }
        c.clickedSlideIndex = c.slides.indexOf(c.clickedSlide),
        c.clickedSlideLoopIndex = c.clickedSlideIndex - (c.loopedSlides || 0)
    }
    function O(e) {
        if (!c.allowLinks) return e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        t.preventLinksPropagation && "stopPropagation" in e && e.stopPropagation(),
        !1
    }
    function B(e) {
        return e.stopPropagation ? e.stopPropagation() : e.returnValue = !1,
        !1
    }
    function $(e) {
        if (t.preventLinks && (c.allowLinks = !0), c.isTouched || t.onlyExternal) return ! 1;
        var n = e.target || e.srcElement;
        document.activeElement && document.activeElement !== document.body && document.activeElement !== n && document.activeElement.blur();
        var i = "input select textarea".split(" ");
        if (t.noSwiping && n &&
        function(e) {
            var n = !1;
            do {
                z(e, t.noSwipingClass) && (n = !0), e = e.parentElement
            } while (! n && e . parentElement && ! z ( e , t . wrapperClass )); ! n && z(e, t.wrapperClass) && z(e, t.noSwipingClass) && (n = !0);
            return n
        } (n)) return ! 1;
        if (N = !1, c.isTouched = !0, !(E = "touchstart" === e.type) && "which" in e && 3 === e.which) return c.isTouched = !1,
        !1;
        if (!E || 1 === e.targetTouches.length) {
            c.callPlugins("onTouchStartBegin"),
            !E && !c.isAndroid && i.indexOf(n.tagName.toLowerCase()) < 0 && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
            var o = E ? e.targetTouches[0].pageX: e.pageX || e.clientX,
            r = E ? e.targetTouches[0].pageY: e.pageY || e.clientY;
            c.touches.startX = c.touches.currentX = o,
            c.touches.startY = c.touches.currentY = r,
            c.touches.start = c.touches.current = h ? o: r,
            c.setWrapperTransition(0),
            c.positions.start = c.positions.current = c.getWrapperTranslate(),
            c.setWrapperTranslate(c.positions.start),
            c.times.start = (new Date).getTime(),
            s = void 0,
            t.moveStartThreshold > 0 && (S = !1),
            t.onTouchStart && c.fireCallback(t.onTouchStart, c, e),
            c.callPlugins("onTouchStartEnd")
        }
    }
    function q(e) {
        if (c.isTouched && !t.onlyExternal && (!E || "mousemove" !== e.type)) {
            var n = E ? e.targetTouches[0].pageX: e.pageX || e.clientX,
            i = E ? e.targetTouches[0].pageY: e.pageY || e.clientY;
            if (void 0 === s && h && (s = !!(s || Math.abs(i - c.touches.startY) > Math.abs(n - c.touches.startX))), void 0 !== s || h || (s = !!(s || Math.abs(i - c.touches.startY) < Math.abs(n - c.touches.startX))), s) c.isTouched = !1;
            else {
                if (h) {
                    if (!t.swipeToNext && n < c.touches.startX || !t.swipeToPrev && n > c.touches.startX) return
                } else if (!t.swipeToNext && i < c.touches.startY || !t.swipeToPrev && i > c.touches.startY) return;
                if (e.assignedToSwiper) c.isTouched = !1;
                else if (e.assignedToSwiper = !0, t.preventLinks && (c.allowLinks = !1), t.onSlideClick && (c.allowSlideClick = !1), t.autoplay && c.stopAutoplay(!0), !E || 1 === e.touches.length) {
                    var o;
                    if (c.isMoved || (c.callPlugins("onTouchMoveStart"), t.loop && (c.fixLoop(), c.positions.start = c.getWrapperTranslate()), t.onTouchMoveStart && c.fireCallback(t.onTouchMoveStart, c)), c.isMoved = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1, c.touches.current = h ? n: i, c.positions.current = (c.touches.current - c.touches.start) * t.touchRatio + c.positions.start, c.positions.current > 0 && t.onResistanceBefore && c.fireCallback(t.onResistanceBefore, c, c.positions.current), c.positions.current < -A() && t.onResistanceAfter && c.fireCallback(t.onResistanceAfter, c, Math.abs(c.positions.current + A())), t.resistance && "100%" !== t.resistance) if (c.positions.current > 0 && (o = 1 - c.positions.current / l / 2, c.positions.current = o < .5 ? l / 2 : c.positions.current * o), c.positions.current < -A()) {
                        var r = (c.touches.current - c.touches.start) * t.touchRatio + (A() + c.positions.start);
                        o = (l + r) / l;
                        var a = c.positions.current - r * (1 - o) / 2,
                        u = -A() - l / 2;
                        c.positions.current = a < u || o <= 0 ? u: a
                    }
                    if (t.resistance && "100%" === t.resistance && (c.positions.current > 0 && (!t.freeMode || t.freeModeFluid) && (c.positions.current = 0), c.positions.current < -A() && (!t.freeMode || t.freeModeFluid) && (c.positions.current = -A())), !t.followFinger) return;
                    if (t.moveStartThreshold) if (Math.abs(c.touches.current - c.touches.start) > t.moveStartThreshold || S) {
                        if (!S) return S = !0,
                        void(c.touches.start = c.touches.current);
                        c.setWrapperTranslate(c.positions.current)
                    } else c.positions.current = c.positions.start;
                    else c.setWrapperTranslate(c.positions.current);
                    return (t.freeMode || t.watchActiveIndex) && c.updateActiveSlide(c.positions.current),
                    t.grabCursor && (c.container.style.cursor = "move", c.container.style.cursor = "grabbing", c.container.style.cursor = "-moz-grabbin", c.container.style.cursor = "-webkit-grabbing"),
                    _ || (_ = c.touches.current),
                    C || (C = (new Date).getTime()),
                    c.velocity = (c.touches.current - _) / ((new Date).getTime() - C) / 2,
                    Math.abs(c.touches.current - _) < 2 && (c.velocity = 0),
                    _ = c.touches.current,
                    C = (new Date).getTime(),
                    c.callPlugins("onTouchMoveEnd"),
                    t.onTouchMove && c.fireCallback(t.onTouchMove, c, e),
                    !1
                }
            }
        }
    }
    function W(e) {
        if (s && c.swipeReset(), !t.onlyExternal && c.isTouched) {
            c.isTouched = !1,
            t.grabCursor && (c.container.style.cursor = "move", c.container.style.cursor = "grab", c.container.style.cursor = "-moz-grab", c.container.style.cursor = "-webkit-grab"),
            c.positions.current || 0 === c.positions.current || (c.positions.current = c.positions.start),
            t.followFinger && c.setWrapperTranslate(c.positions.current),
            c.times.end = (new Date).getTime(),
            c.touches.diff = c.touches.current - c.touches.start,
            c.touches.abs = Math.abs(c.touches.diff),
            c.positions.diff = c.positions.current - c.positions.start,
            c.positions.abs = Math.abs(c.positions.diff);
            var n = c.positions.diff,
            i = c.positions.abs,
            r = c.times.end - c.times.start;
            i < 5 && r < 300 && !1 === c.allowLinks && (t.freeMode || 0 === i || c.swipeReset(), t.preventLinks && (c.allowLinks = !0), t.onSlideClick && (c.allowSlideClick = !0)),
            setTimeout(function() {
                void 0 !== c && null !== c && (t.preventLinks && (c.allowLinks = !0), t.onSlideClick && (c.allowSlideClick = !0))
            },
            100);
            var u = A();
            if (!c.isMoved && t.freeMode) return c.isMoved = !1,
            t.onTouchEnd && c.fireCallback(t.onTouchEnd, c, e),
            void c.callPlugins("onTouchEnd");
            if (!c.isMoved || c.positions.current > 0 || c.positions.current < -u) return c.swipeReset(),
            t.onTouchEnd && c.fireCallback(t.onTouchEnd, c, e),
            void c.callPlugins("onTouchEnd");
            if (c.isMoved = !1, t.freeMode) {
                if (t.freeModeFluid) {
                    var d, p = 1e3 * t.momentumRatio,
                    f = c.velocity * p,
                    m = c.positions.current + f,
                    v = !1,
                    g = 20 * Math.abs(c.velocity) * t.momentumBounceRatio;
                    m < -u && (t.momentumBounce && c.support.transitions ? (m + u < -g && (m = -u - g), d = -u, v = !0, N = !0) : m = -u),
                    m > 0 && (t.momentumBounce && c.support.transitions ? (m > g && (m = g), d = 0, v = !0, N = !0) : m = 0),
                    0 !== c.velocity && (p = Math.abs((m - c.positions.current) / c.velocity)),
                    c.setWrapperTranslate(m),
                    c.setWrapperTransition(p),
                    t.momentumBounce && v && c.wrapperTransitionEnd(function() {
                        N && (t.onMomentumBounce && c.fireCallback(t.onMomentumBounce, c), c.callPlugins("onMomentumBounce"), c.setWrapperTranslate(d), c.setWrapperTransition(300))
                    }),
                    c.updateActiveSlide(m)
                }
                return (!t.freeModeFluid || r >= 300) && c.updateActiveSlide(c.positions.current),
                t.onTouchEnd && c.fireCallback(t.onTouchEnd, c, e),
                void c.callPlugins("onTouchEnd")
            }
            "toNext" === (a = n < 0 ? "toNext": "toPrev") && r <= 300 && (i < 30 || !t.shortSwipes ? c.swipeReset() : c.swipeNext(!0, !0)),
            "toPrev" === a && r <= 300 && (i < 30 || !t.shortSwipes ? c.swipeReset() : c.swipePrev(!0, !0));
            var y = 0;
            if ("auto" === t.slidesPerView) {
                for (var b, w = Math.abs(c.getWrapperTranslate()), x = 0, T = 0; T < c.slides.length; T++) if ((x += b = h ? c.slides[T].getWidth(!0, t.roundLengths) : c.slides[T].getHeight(!0, t.roundLengths)) > w) {
                    y = b;
                    break
                }
                y > l && (y = l)
            } else y = o * t.slidesPerView;
            "toNext" === a && r > 300 && (i >= y * t.longSwipesRatio ? c.swipeNext(!0, !0) : c.swipeReset()),
            "toPrev" === a && r > 300 && (i >= y * t.longSwipesRatio ? c.swipePrev(!0, !0) : c.swipeReset()),
            t.onTouchEnd && c.fireCallback(t.onTouchEnd, c, e),
            c.callPlugins("onTouchEnd")
        }
    }
    function z(e, t) {
        return e && e.getAttribute("class") && e.getAttribute("class").indexOf(t) > -1
    }
    function V(e, t) {
        var n, i = document.createElement("div");
        return i.innerHTML = t,
        (n = i.firstChild).className += " " + e,
        n.outerHTML
    }
    function G(e, n, i) {
        var o = "to" === n && i.speed >= 0 ? i.speed: t.speed,
        r = +new Date;
        if (c.support.transitions || !t.DOMAnimation) c.setWrapperTranslate(e),
        c.setWrapperTransition(o);
        else {
            var a = c.getWrapperTranslate(),
            s = Math.ceil((e - a) / o * (1e3 / 60)),
            l = a > e ? "toNext": "toPrev";
            if (c._DOMAnimating) return; !
            function o() {
                var u = +new Date;
                a += s * (u - r) / (1e3 / 60),
                ("toNext" === l ? a > e: a < e) ? (c.setWrapperTranslate(Math.ceil(a)), c._DOMAnimating = !0, window.setTimeout(function() {
                    o()
                },
                1e3 / 60)) : (t.onSlideChangeEnd && ("to" === n ? !0 === i.runCallbacks && c.fireCallback(t.onSlideChangeEnd, c, l) : c.fireCallback(t.onSlideChangeEnd, c, l)), c.setWrapperTranslate(e), c._DOMAnimating = !1)
            } ()
        }
        c.updateActiveSlide(e),
        t.onSlideNext && "next" === n && !0 === i.runCallbacks && c.fireCallback(t.onSlideNext, c, e),
        t.onSlidePrev && "prev" === n && !0 === i.runCallbacks && c.fireCallback(t.onSlidePrev, c, e),
        t.onSlideReset && "reset" === n && !0 === i.runCallbacks && c.fireCallback(t.onSlideReset, c, e),
        "next" !== n && "prev" !== n && "to" !== n || !0 !== i.runCallbacks ||
        function(e) {
            if (c.callPlugins("onSlideChangeStart"), t.onSlideChangeStart) if (t.queueStartCallbacks && c.support.transitions) {
                if (c._queueStartCallbacks) return;
                c._queueStartCallbacks = !0,
                c.fireCallback(t.onSlideChangeStart, c, e),
                c.wrapperTransitionEnd(function() {
                    c._queueStartCallbacks = !1
                })
            } else c.fireCallback(t.onSlideChangeStart, c, e);
            if (t.onSlideChangeEnd) if (c.support.transitions) if (t.queueEndCallbacks) {
                if (c._queueEndCallbacks) return;
                c._queueEndCallbacks = !0,
                c.wrapperTransitionEnd(function(n) {
                    c.fireCallback(t.onSlideChangeEnd, n, e)
                })
            } else c.wrapperTransitionEnd(function(n) {
                c.fireCallback(t.onSlideChangeEnd, n, e)
            });
            else t.DOMAnimation || setTimeout(function() {
                c.fireCallback(t.onSlideChangeEnd, c, e)
            },
            10)
        } (n)
    }
    function X() {
        var e = c.paginationButtons;
        if (e) for (var t = 0; t < e.length; t++) c.h.removeEventListener(e[t], "click", U)
    }
    function U(e) {
        for (var n, i = e.target || e.srcElement,
        o = c.paginationButtons,
        r = 0; r < o.length; r++) i === o[r] && (n = r);
        t.autoplay && c.stopAutoplay(!0),
        c.swipeTo(n)
    }
    function Y() {
        k = setTimeout(function() {
            t.loop ? (c.fixLoop(), c.swipeNext(!0, !0)) : c.swipeNext(!0, !0) || (t.autoplayStopOnLast ? (clearTimeout(k), k = void 0) : c.swipeTo(0)),
            c.wrapperTransitionEnd(function() {
                void 0 !== k && Y()
            })
        },
        t.autoplay)
    }
};
Swiper.prototype = {
    plugins: {},
    wrapperTransitionEnd: function(e, t) {
        "use strict";
        var n, i = this,
        o = i.wrapper,
        r = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"];
        function a(s) {
            if (s.target === o && (e(i), i.params.queueEndCallbacks && (i._queueEndCallbacks = !1), !t)) for (n = 0; n < r.length; n++) i.h.removeEventListener(o, r[n], a)
        }
        if (e) for (n = 0; n < r.length; n++) i.h.addEventListener(o, r[n], a)
    },
    getWrapperTranslate: function(e) {
        "use strict";
        var t, n, i, o, r = this.wrapper;
        return void 0 === e && (e = "horizontal" === this.params.mode ? "x": "y"),
        this.support.transforms && this.params.useCSS3Transforms ? (i = window.getComputedStyle(r, null), window.WebKitCSSMatrix ? o = new WebKitCSSMatrix("none" === i.webkitTransform ? "": i.webkitTransform) : t = (o = i.MozTransform || i.OTransform || i.MsTransform || i.msTransform || i.transform || i.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === e && (n = window.WebKitCSSMatrix ? o.m41: 16 === t.length ? parseFloat(t[12]) : parseFloat(t[4])), "y" === e && (n = window.WebKitCSSMatrix ? o.m42: 16 === t.length ? parseFloat(t[13]) : parseFloat(t[5]))) : ("x" === e && (n = parseFloat(r.style.left, 10) || 0), "y" === e && (n = parseFloat(r.style.top, 10) || 0)),
        n || 0
    },
    setWrapperTranslate: function(e, t, n) {
        "use strict";
        var i, o = this.wrapper.style,
        r = {
            x: 0,
            y: 0,
            z: 0
        };
        3 === arguments.length ? (r.x = e, r.y = t, r.z = n) : (void 0 === t && (t = "horizontal" === this.params.mode ? "x": "y"), r[t] = e),
        this.support.transforms && this.params.useCSS3Transforms ? (i = this.support.transforms3d ? "translate3d(" + r.x + "px, " + r.y + "px, " + r.z + "px)": "translate(" + r.x + "px, " + r.y + "px)", o.webkitTransform = o.MsTransform = o.msTransform = o.MozTransform = o.OTransform = o.transform = i) : (o.left = r.x + "px", o.top = r.y + "px"),
        this.callPlugins("onSetWrapperTransform", r),
        this.params.onSetWrapperTransform && this.fireCallback(this.params.onSetWrapperTransform, this, r)
    },
    setWrapperTransition: function(e) {
        "use strict";
        var t = this.wrapper.style;
        t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e / 1e3 + "s",
        this.callPlugins("onSetWrapperTransition", {
            duration: e
        }),
        this.params.onSetWrapperTransition && this.fireCallback(this.params.onSetWrapperTransition, this, e)
    },
    h: {
        getWidth: function(e, t, n) {
            "use strict";
            var i = window.getComputedStyle(e, null).getPropertyValue("width"),
            o = parseFloat(i);
            return (isNaN(o) || i.indexOf("%") > 0 || o < 0) && (o = e.offsetWidth - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))),
            t && (o += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-left")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-right"))),
            n ? Math.ceil(o) : o
        },
        getHeight: function(e, t, n) {
            "use strict";
            if (t) return e.offsetHeight;
            var i = window.getComputedStyle(e, null).getPropertyValue("height"),
            o = parseFloat(i);
            return (isNaN(o) || i.indexOf("%") > 0 || o < 0) && (o = e.offsetHeight - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) - parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))),
            t && (o += parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-top")) + parseFloat(window.getComputedStyle(e, null).getPropertyValue("padding-bottom"))),
            n ? Math.ceil(o) : o
        },
        getOffset: function(e) {
            "use strict";
            var t = e.getBoundingClientRect(),
            n = document.body,
            i = e.clientTop || n.clientTop || 0,
            o = e.clientLeft || n.clientLeft || 0,
            r = window.pageYOffset || e.scrollTop,
            a = window.pageXOffset || e.scrollLeft;
            return document.documentElement && !window.pageYOffset && (r = document.documentElement.scrollTop, a = document.documentElement.scrollLeft),
            {
                top: t.top + r - i,
                left: t.left + a - o
            }
        },
        windowWidth: function() {
            "use strict";
            return window.innerWidth ? window.innerWidth: document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth: void 0
        },
        windowHeight: function() {
            "use strict";
            return window.innerHeight ? window.innerHeight: document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight: void 0
        },
        windowScroll: function() {
            "use strict";
            return "undefined" != typeof pageYOffset ? {
                left: window.pageXOffset,
                top: window.pageYOffset
            }: document.documentElement ? {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }: void 0
        },
        addEventListener: function(e, t, n, i) {
            "use strict";
            void 0 === i && (i = !1),
            e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent && e.attachEvent("on" + t, n)
        },
        removeEventListener: function(e, t, n, i) {
            "use strict";
            void 0 === i && (i = !1),
            e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent && e.detachEvent("on" + t, n)
        }
    },
    setTransform: function(e, t) {
        "use strict";
        var n = e.style;
        n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = t
    },
    setTranslate: function(e, t) {
        "use strict";
        var n = e.style,
        i = t.x || 0,
        o = t.y || 0,
        r = t.z || 0,
        a = this.support.transforms3d ? "translate3d(" + i + "px," + o + "px," + r + "px)": "translate(" + i + "px," + o + "px)";
        n.webkitTransform = n.MsTransform = n.msTransform = n.MozTransform = n.OTransform = n.transform = a,
        this.support.transforms || (n.left = i + "px", n.top = o + "px")
    },
    setTransition: function(e, t) {
        "use strict";
        var n = e.style;
        n.webkitTransitionDuration = n.MsTransitionDuration = n.msTransitionDuration = n.MozTransitionDuration = n.OTransitionDuration = n.transitionDuration = t + "ms"
    },
    support: {
        touch: window.Modernizr && !0 === Modernizr.touch ||
        function() {
            "use strict";
            return !! ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
        } (),
        transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d ||
        function() {
            "use strict";
            var e = document.createElement("div").style;
            return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e
        } (),
        transforms: window.Modernizr && !0 === Modernizr.csstransforms ||
        function() {
            "use strict";
            var e = document.createElement("div").style;
            return "transform" in e || "WebkitTransform" in e || "MozTransform" in e || "msTransform" in e || "MsTransform" in e || "OTransform" in e
        } (),
        transitions: window.Modernizr && !0 === Modernizr.csstransitions ||
        function() {
            "use strict";
            var e = document.createElement("div").style;
            return "transition" in e || "WebkitTransition" in e || "MozTransition" in e || "msTransition" in e || "MsTransition" in e || "OTransition" in e
        } (),
        classList: function() {
            "use strict";
            return "classList" in document.createElement("div")
        } ()
    },
    browser: {
        ie8: function() {
            "use strict";
            var e = -1;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                var t = navigator.userAgent;
                null !== new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/).exec(t) && (e = parseFloat(RegExp.$1))
            }
            return - 1 !== e && e < 9
        } (),
        ie10: window.navigator.msPointerEnabled,
        ie11: window.navigator.pointerEnabled
    }
}