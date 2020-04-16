! function(n, t, i) {
    function u(n, i) {
        this.wrapper = "string" == typeof n ? t.querySelector(n) : n;
        this.scroller = this.wrapper.children[0];
        this.scrollerStyle = this.scroller.style;
        this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: .334,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0
        };
        for (var u in i) this.options[u] = i[u];
        this.translateZ = this.options.HWCompositing && r.hasPerspective ? " translateZ(0)" : "";
        this.options.useTransition = r.hasTransition && this.options.useTransition;
        this.options.useTransform = r.hasTransform && this.options.useTransform;
        this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough;
        this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;
        this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY;
        this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX;
        this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
        this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;
        this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? r.ease[this.options.bounceEasing] || r.ease.circular : this.options.bounceEasing;
        this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling;
        this.options.tap === !0 && (this.options.tap = "tap");
        "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1);
        this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;
        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;
        this._events = {};
        this._init();
        this.refresh();
        this.scrollTo(this.options.startX, this.options.startY);
        this.enable()
    }

    function f(n, i, r) {
        var u = t.createElement("div"),
            f = t.createElement("div");
        return r === !0 && (u.style.cssText = "position:absolute;z-index:9999", f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), f.className = "iScrollIndicator", "h" == n ? (r === !0 && (u.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", f.style.height = "100%"), u.className = "iScrollHorizontalScrollbar") : (r === !0 && (u.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", f.style.width = "100%"), u.className = "iScrollVerticalScrollbar"), u.style.cssText += ";overflow:hidden", i || (u.style.pointerEvents = "none"), u.appendChild(f), u
    }

    function e(i, u) {
        this.wrapper = "string" == typeof u.el ? t.querySelector(u.el) : u.el;
        this.wrapperStyle = this.wrapper.style;
        this.indicator = this.wrapper.children[0];
        this.indicatorStyle = this.indicator.style;
        this.scroller = i;
        this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var f in u) this.options[f] = u[f];
        this.sizeRatioX = 1;
        this.sizeRatioY = 1;
        this.maxPosX = 0;
        this.maxPosY = 0;
        this.options.interactive && (this.options.disableTouch || (r.addEvent(this.indicator, "touchstart", this), r.addEvent(n, "touchend", this)), this.options.disablePointer || (r.addEvent(this.indicator, "MSPointerDown", this), r.addEvent(n, "MSPointerUp", this)), this.options.disableMouse || (r.addEvent(this.indicator, "mousedown", this), r.addEvent(n, "mouseup", this)));
        this.options.fade && (this.wrapperStyle[r.style.transform] = this.scroller.translateZ, this.wrapperStyle[r.style.transitionDuration] = r.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
    }
    var o = n.requestAnimationFrame || n.webkitRequestAnimationFrame || n.mozRequestAnimationFrame || n.oRequestAnimationFrame || n.msRequestAnimationFrame || function(t) {
            n.setTimeout(t, 1e3 / 60)
        },
        r = function() {
            function u(n) {
                return e === !1 ? !1 : "" === e ? n : e + n.charAt(0).toUpperCase() + n.substr(1)
            }
            var r = {},
                f = t.createElement("div").style,
                e = function() {
                    for (var i, t = ["t", "webkitT", "MozT", "msT", "OT"], n = 0, r = t.length; r > n; n++)
                        if (i = t[n] + "ransform", i in f) return t[n].substr(0, t[n].length - 1);
                    return !1
                }(),
                o;
            return r.getTime = Date.now || function() {
                return (new Date).getTime()
            }, r.extend = function(n, t) {
                for (var i in t) n[i] = t[i]
            }, r.addEvent = function(n, t, i, r) {
                n.addEventListener(t, i, !!r)
            }, r.removeEvent = function(n, t, i, r) {
                n.removeEventListener(t, i, !!r)
            }, r.momentum = function(n, t, r, u, f, e) {
                var o, c, h = n - t,
                    s = i.abs(h) / r;
                return e = void 0 === e ? .0006 : e, o = n + s * s / (2 * e) * (0 > h ? -1 : 1), c = s / e, u > o ? (o = f ? u - f / 2.5 * (s / 8) : u, h = i.abs(o - n), c = h / s) : o > 0 && (o = f ? f / 2.5 * (s / 8) : 0, h = i.abs(n) + o, c = h / s), {
                    destination: i.round(o),
                    duration: c
                }
            }, o = u("transform"), r.extend(r, {
                hasTransform: o !== !1,
                hasPerspective: u("perspective") in f,
                hasTouch: "ontouchstart" in n,
                hasPointer: navigator.msPointerEnabled,
                hasTransition: u("transition") in f
            }), r.isBadAndroid = /Android /.test(n.navigator.appVersion) && !/Chrome\/\d/.test(n.navigator.appVersion), r.extend(r.style = {}, {
                transform: o,
                transitionTimingFunction: u("transitionTimingFunction"),
                transitionDuration: u("transitionDuration"),
                transitionDelay: u("transitionDelay"),
                transformOrigin: u("transformOrigin")
            }), r.hasClass = function(n, t) {
                var i = new RegExp("(^|\\s)" + t + "(\\s|$)");
                return i.test(n.className)
            }, r.addClass = function(n, t) {
                if (!r.hasClass(n, t)) {
                    var i = n.className.split(" ");
                    i.push(t);
                    n.className = i.join(" ")
                }
            }, r.removeClass = function(n, t) {
                if (r.hasClass(n, t)) {
                    var i = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
                    n.className = n.className.replace(i, " ")
                }
            }, r.offset = function(n) {
                for (var t = -n.offsetLeft, i = -n.offsetTop; n = n.offsetParent;) t -= n.offsetLeft, i -= n.offsetTop;
                return {
                    left: t,
                    top: i
                }
            }, r.preventDefaultException = function(n, t) {
                for (var i in t)
                    if (t[i].test(n[i])) return !0;
                return !1
            }, r.extend(r.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }), r.extend(r.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(n) {
                        return n * (2 - n)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(n) {
                        return i.sqrt(1 - --n * n)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(n) {
                        var t = 4;
                        return (n -= 1) * n * ((t + 1) * n + t) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(n) {
                        return (n /= 1) < 1 / 2.75 ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(n) {
                        var t = .22;
                        return 0 === n ? 0 : 1 == n ? 1 : .4 * i.pow(2, -10 * n) * i.sin((n - t / 4) * 2 * i.PI / t) + 1
                    }
                }
            }), r.tap = function(n, i) {
                var r = t.createEvent("Event");
                r.initEvent(i, !0, !0);
                r.pageX = n.pageX;
                r.pageY = n.pageY;
                n.target.dispatchEvent(r)
            }, r.click = function(n) {
                var r, i = n.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(i.tagName) || (r = t.createEvent("MouseEvents"), r.initMouseEvent("click", !0, !0, n.view, 1, i.screenX, i.screenY, i.clientX, i.clientY, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, 0, null), r._constructed = !0, i.dispatchEvent(r))
            }, r
        }();
    u.prototype = {
        version: "5.1.1",
        _init: function() {
            this._initEvents();
            (this.options.scrollbars || this.options.indicators) && this._initIndicators();
            this.options.mouseWheel && this._initWheel();
            this.options.snap && this._initSnap();
            this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0);
            this._execEvent("destroy")
        },
        _transitionEnd: function(n) {
            n.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(n) {
            if (!(1 != r.eventType[n.type] && 0 !== n.button || !this.enabled || this.initiated && r.eventType[n.type] !== this.initiated)) {
                !this.options.preventDefault || r.isBadAndroid || r.preventDefaultException(n.target, this.options.preventDefaultException) || n.preventDefault();
                var t, u = n.touches ? n.touches[0] : n;
                this.initiated = r.eventType[n.type];
                this.moved = !1;
                this.distX = 0;
                this.distY = 0;
                this.directionX = 0;
                this.directionY = 0;
                this.directionLocked = 0;
                this._transitionTime();
                this.startTime = r.getTime();
                this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd"));
                this.startX = this.x;
                this.startY = this.y;
                this.absStartX = this.x;
                this.absStartY = this.y;
                this.pointX = u.pageX;
                this.pointY = u.pageY;
                this._execEvent("beforeScrollStart")
            }
        },
        _move: function(n) {
            if (this.enabled && r.eventType[n.type] === this.initiated) {
                this.options.preventDefault && n.preventDefault();
                var f, e, o, s, h = n.touches ? n.touches[0] : n,
                    t = h.pageX - this.pointX,
                    u = h.pageY - this.pointY,
                    c = r.getTime();
                if (this.pointX = h.pageX, this.pointY = h.pageY, this.distX += t, this.distY += u, o = i.abs(this.distX), s = i.abs(this.distY), !(c - this.endTime > 300 && 10 > o && 10 > s)) {
                    if (this.directionLocked || this.options.freeScroll || (this.directionLocked = o > s + this.options.directionLockThreshold ? "h" : s >= o + this.options.directionLockThreshold ? "v" : "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough) n.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return this.initiated = !1, void 0;
                        u = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) n.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return this.initiated = !1, void 0;
                        t = 0
                    }
                    t = this.hasHorizontalScroll ? t : 0;
                    u = this.hasVerticalScroll ? u : 0;
                    f = this.x + t;
                    e = this.y + u;
                    (f > 0 || f < this.maxScrollX) && (f = this.options.bounce ? this.x + t / 3 : f > 0 ? 0 : this.maxScrollX);
                    (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + u / 3 : e > 0 ? 0 : this.maxScrollY);
                    this.directionX = t > 0 ? -1 : 0 > t ? 1 : 0;
                    this.directionY = u > 0 ? -1 : 0 > u ? 1 : 0;
                    this.moved || this._execEvent("scrollStart");
                    this.moved = !0;
                    this._translate(f, e);
                    c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(n) {
            var f;
            if (this.enabled && r.eventType[n.type] === this.initiated) {
                this.options.preventDefault && !r.preventDefaultException(n.target, this.options.preventDefaultException) && n.preventDefault();
                var o, s, e = (n.changedTouches ? n.changedTouches[0] : n, r.getTime() - this.startTime),
                    t = i.round(this.x),
                    u = i.round(this.y),
                    l = i.abs(t - this.startX),
                    a = i.abs(u - this.startY),
                    h = 0,
                    c = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = r.getTime(), !this.resetPosition(this.options.bounceTime)) return (this.scrollTo(t, u), !this.moved) ? (this.options.tap && r.tap(n, this.options.tap), this.options.click && r.click(n), this._execEvent("scrollCancel"), void 0) : this._events.flick && 200 > e && 100 > l && 100 > a ? (this._execEvent("flick"), void 0) : ((this.options.momentum && 300 > e && (o = this.hasHorizontalScroll ? r.momentum(this.x, this.startX, e, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                    destination: t,
                    duration: 0
                }, s = this.hasVerticalScroll ? r.momentum(this.y, this.startY, e, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                    destination: u,
                    duration: 0
                }, t = o.destination, u = s.destination, h = i.max(o.duration, s.duration), this.isInTransition = 1), this.options.snap) && (f = this._nearestSnap(t, u), this.currentPage = f, h = this.options.snapSpeed || i.max(i.max(i.min(i.abs(t - f.x), 1e3), i.min(i.abs(u - f.y), 1e3)), 300), t = f.x, u = f.y, this.directionX = 0, this.directionY = 0, c = this.options.bounceEasing), t != this.x || u != this.y ? ((t > 0 || t < this.maxScrollX || u > 0 || u < this.maxScrollY) && (c = r.ease.quadratic), this.scrollTo(t, u, h, c), void 0) : (this._execEvent("scrollEnd"), void 0))
            }
        },
        _resize: function() {
            var n = this;
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(function() {
                n.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(n) {
            var t = this.x,
                i = this.y;
            return n = n || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), t == this.x && i == this.y ? !1 : (this.scrollTo(t, i, n, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth;
            this.wrapperHeight = this.wrapper.clientHeight;
            this.scrollerWidth = this.scroller.clientWidth;
            this.scrollerHeight = this.scroller.clientHeight;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;
            this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth);
            this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight);
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.wrapperOffset = r.offset(this.wrapper);
            this._execEvent("refresh");
            this.resetPosition()
        },
        on: function(n, t) {
            this._events[n] || (this._events[n] = []);
            this._events[n].push(t)
        },
        off: function(n, t) {
            if (this._events[n]) {
                var i = this._events[n].indexOf(t);
                i > -1 && this._events[n].splice(i, 1)
            }
        },
        _execEvent: function(n) {
            if (this._events[n]) {
                var t = 0,
                    i = this._events[n].length;
                if (i)
                    for (; i > t; t++) this._events[n][t].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(n, t, i, r) {
            n = this.x + n;
            t = this.y + t;
            i = i || 0;
            this.scrollTo(n, t, i, r)
        },
        scrollTo: function(n, t, i, u) {
            u = u || r.ease.circular;
            this.isInTransition = this.options.useTransition && i > 0;
            !i || this.options.useTransition && u.style ? (this._transitionTimingFunction(u.style), this._transitionTime(i), this._translate(n, t)) : this._animate(n, t, i, u.fn)
        },
        scrollToElement: function(n, t, u, f, e) {
            if (n = n.nodeType ? n : this.scroller.querySelector(n)) {
                var o = r.offset(n);
                o.left -= this.wrapperOffset.left;
                o.top -= this.wrapperOffset.top;
                u === !0 && (u = i.round(n.offsetWidth / 2 - this.wrapper.offsetWidth / 2));
                f === !0 && (f = i.round(n.offsetHeight / 2 - this.wrapper.offsetHeight / 2));
                o.left -= u || 0;
                o.top -= f || 0;
                o.left = o.left > 0 ? 0 : o.left < this.maxScrollX ? this.maxScrollX : o.left;
                o.top = o.top > 0 ? 0 : o.top < this.maxScrollY ? this.maxScrollY : o.top;
                t = void 0 === t || null === t || "auto" === t ? i.max(i.abs(this.x - o.left), i.abs(this.y - o.top)) : t;
                this.scrollTo(o.left, o.top, t, e)
            }
        },
        _transitionTime: function(n) {
            if (n = n || 0, this.scrollerStyle[r.style.transitionDuration] = n + "ms", !n && r.isBadAndroid && (this.scrollerStyle[r.style.transitionDuration] = "0.001s"), this.indicators)
                for (var t = this.indicators.length; t--;) this.indicators[t].transitionTime(n)
        },
        _transitionTimingFunction: function(n) {
            if (this.scrollerStyle[r.style.transitionTimingFunction] = n, this.indicators)
                for (var t = this.indicators.length; t--;) this.indicators[t].transitionTimingFunction(n)
        },
        _translate: function(n, t) {
            if (this.options.useTransform ? this.scrollerStyle[r.style.transform] = "translate(" + n + "px," + t + "px)" + this.translateZ : (n = i.round(n), t = i.round(t), this.scrollerStyle.left = n + "px", this.scrollerStyle.top = t + "px"), this.x = n, this.y = t, this.indicators)
                for (var u = this.indicators.length; u--;) this.indicators[u].updatePosition()
        },
        _initEvents: function(t) {
            var i = t ? r.removeEvent : r.addEvent,
                u = this.options.bindToWrapper ? this.wrapper : n;
            i(n, "orientationchange", this);
            i(n, "resize", this);
            this.options.click && i(this.wrapper, "click", this, !0);
            this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(u, "mousemove", this), i(u, "mousecancel", this), i(u, "mouseup", this));
            r.hasPointer && !this.options.disablePointer && (i(this.wrapper, "MSPointerDown", this), i(u, "MSPointerMove", this), i(u, "MSPointerCancel", this), i(u, "MSPointerUp", this));
            r.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(u, "touchmove", this), i(u, "touchcancel", this), i(u, "touchend", this));
            i(this.scroller, "transitionend", this);
            i(this.scroller, "webkitTransitionEnd", this);
            i(this.scroller, "oTransitionEnd", this);
            i(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var i, u, t = n.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (t = t[r.style.transform].split(")")[0].split(", "), i = +(t[12] || t[4]), u = +(t[13] || t[5])) : (i = +t.left.replace(/[^-\d.]/g, ""), u = +t.top.replace(/[^-\d.]/g, "")), {
                x: i,
                y: u
            }
        },
        _initIndicators: function() {
            function n(n) {
                for (var t = s.indicators.length; t--;) n.call(s.indicators[t])
            }
            var t, r = this.options.interactiveScrollbars,
                o = "string" != typeof this.options.scrollbars,
                i = [],
                s = this,
                u;
            for (this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
                    el: f("v", r, this.options.scrollbars),
                    interactive: r,
                    defaultScrollbars: !0,
                    customStyle: o,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenX: !1
                }, this.wrapper.appendChild(t.el), i.push(t)), this.options.scrollX && (t = {
                    el: f("h", r, this.options.scrollbars),
                    interactive: r,
                    defaultScrollbars: !0,
                    customStyle: o,
                    resize: this.options.resizeScrollbars,
                    shrink: this.options.shrinkScrollbars,
                    fade: this.options.fadeScrollbars,
                    listenY: !1
                }, this.wrapper.appendChild(t.el), i.push(t))), this.options.indicators && (i = i.concat(this.options.indicators)), u = i.length; u--;) this.indicators.push(new e(this, i[u]));
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                n(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                n(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                n(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                n(function() {
                    this.fade(1, !0)
                })
            }));
            this.on("refresh", function() {
                n(function() {
                    this.refresh()
                })
            });
            this.on("destroy", function() {
                n(function() {
                    this.destroy()
                });
                delete this.indicators
            })
        },
        _initWheel: function() {
            r.addEvent(this.wrapper, "wheel", this);
            r.addEvent(this.wrapper, "mousewheel", this);
            r.addEvent(this.wrapper, "DOMMouseScroll", this);
            this.on("destroy", function() {
                r.removeEvent(this.wrapper, "wheel", this);
                r.removeEvent(this.wrapper, "mousewheel", this);
                r.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(n) {
            if (this.enabled) {
                n.preventDefault();
                n.stopPropagation();
                var f, t, r, u, e = this;
                if (void 0 === this.wheelTimeout && e._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                        e._execEvent("scrollEnd");
                        e.wheelTimeout = void 0
                    }, 400), "deltaX" in n) f = -n.deltaX, t = -n.deltaY;
                else if ("wheelDeltaX" in n) f = n.wheelDeltaX / 120 * this.options.mouseWheelSpeed, t = n.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in n) f = t = n.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in n)) return;
                    f = t = -n.detail / 3 * this.options.mouseWheelSpeed
                }
                if (f *= this.options.invertWheelDirection, t *= this.options.invertWheelDirection, this.hasVerticalScroll || (f = t, t = 0), this.options.snap) return r = this.currentPage.pageX, u = this.currentPage.pageY, f > 0 ? r-- : 0 > f && r++, t > 0 ? u-- : 0 > t && u++, this.goToPage(r, u), void 0;
                r = this.x + i.round(this.hasHorizontalScroll ? f : 0);
                u = this.y + i.round(this.hasVerticalScroll ? t : 0);
                r > 0 ? r = 0 : r < this.maxScrollX && (r = this.maxScrollX);
                u > 0 ? u = 0 : u < this.maxScrollY && (u = this.maxScrollY);
                this.scrollTo(r, u, 0)
            }
        },
        _initSnap: function() {
            this.currentPage = {};
            "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap));
            this.on("refresh", function() {
                var f, h, o, s, r, t, n = 0,
                    e = 0,
                    u = 0,
                    c = this.options.snapStepX || this.wrapperWidth,
                    l = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0)
                        for (o = i.round(c / 2), s = i.round(l / 2); u > -this.scrollerWidth;) {
                            for (this.pages[n] = [], f = 0, r = 0; r > -this.scrollerHeight;) this.pages[n][f] = {
                                x: i.max(u, this.maxScrollX),
                                y: i.max(r, this.maxScrollY),
                                width: c,
                                height: l,
                                cx: u - o,
                                cy: r - s
                            }, r -= l, f++;
                            u -= c;
                            n++
                        } else
                            for (t = this.options.snap, f = t.length, h = -1; f > n; n++)(0 === n || t[n].offsetLeft <= t[n - 1].offsetLeft) && (e = 0, h++), this.pages[e] || (this.pages[e] = []), u = i.max(-t[n].offsetLeft, this.maxScrollX), r = i.max(-t[n].offsetTop, this.maxScrollY), o = u - i.round(t[n].offsetWidth / 2), s = r - i.round(t[n].offsetHeight / 2), this.pages[e][h] = {
                                x: u,
                                y: r,
                                width: t[n].offsetWidth,
                                height: t[n].offsetHeight,
                                cx: o,
                                cy: s
                            }, u > this.maxScrollX && e++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);
                    0 == this.options.snapThreshold % 1 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            });
            this.on("flick", function() {
                var n = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, n)
            })
        },
        _nearestSnap: function(n, t) {
            if (!this.pages.length) return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
            var r = 0,
                f = this.pages.length,
                u = 0;
            if (i.abs(n - this.absStartX) < this.snapThresholdX && i.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
            for (n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); f > r; r++)
                if (n >= this.pages[r][0].cx) {
                    n = this.pages[r][0].x;
                    break
                } for (f = this.pages[r].length; f > u; u++)
                if (t >= this.pages[0][u].cy) {
                    t = this.pages[0][u].y;
                    break
                } return r == this.currentPage.pageX && (r += this.directionX, 0 > r ? r = 0 : r >= this.pages.length && (r = this.pages.length - 1), n = this.pages[r][0].x), u == this.currentPage.pageY && (u += this.directionY, 0 > u ? u = 0 : u >= this.pages[0].length && (u = this.pages[0].length - 1), t = this.pages[0][u].y), {
                x: n,
                y: t,
                pageX: r,
                pageY: u
            }
        },
        goToPage: function(n, t, r, u) {
            u = u || this.options.bounceEasing;
            n >= this.pages.length ? n = this.pages.length - 1 : 0 > n && (n = 0);
            t >= this.pages[n].length ? t = this.pages[n].length - 1 : 0 > t && (t = 0);
            var f = this.pages[n][t].x,
                e = this.pages[n][t].y;
            r = void 0 === r ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(f - this.x), 1e3), i.min(i.abs(e - this.y), 1e3)), 300) : r;
            this.currentPage = {
                x: f,
                y: e,
                pageX: n,
                pageY: t
            };
            this.scrollTo(f, e, r, u)
        },
        next: function(n, t) {
            var i = this.currentPage.pageX,
                r = this.currentPage.pageY;
            i++;
            i >= this.pages.length && this.hasVerticalScroll && (i = 0, r++);
            this.goToPage(i, r, n, t)
        },
        prev: function(n, t) {
            var i = this.currentPage.pageX,
                r = this.currentPage.pageY;
            i--;
            0 > i && this.hasVerticalScroll && (i = 0, r--);
            this.goToPage(i, r, n, t)
        },
        _initKeys: function() {
            var t, i = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            if ("object" == typeof this.options.keyBindings)
                for (t in this.options.keyBindings) "string" == typeof this.options.keyBindings[t] && (this.options.keyBindings[t] = this.options.keyBindings[t].toUpperCase().charCodeAt(0));
            else this.options.keyBindings = {};
            for (t in i) this.options.keyBindings[t] = this.options.keyBindings[t] || i[t];
            r.addEvent(n, "keydown", this);
            this.on("destroy", function() {
                r.removeEvent(n, "keydown", this)
            })
        },
        _key: function(n) {
            if (this.enabled) {
                var e, t = this.options.snap,
                    u = t ? this.currentPage.pageX : this.x,
                    f = t ? this.currentPage.pageY : this.y,
                    o = r.getTime(),
                    s = this.keyTime || 0;
                switch (this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(i.round(e.x), i.round(e.y)), this.isInTransition = !1), this.keyAcceleration = 200 > o - s ? i.min(this.keyAcceleration + .25, 50) : 0, n.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? u += t ? 1 : this.wrapperWidth : f += t ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? u -= t ? 1 : this.wrapperWidth : f -= t ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        u = t ? this.pages.length - 1 : this.maxScrollX;
                        f = t ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        u = 0;
                        f = 0;
                        break;
                    case this.options.keyBindings.left:
                        u += t ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        f += t ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        u -= t ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        f -= t ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                if (t) return this.goToPage(u, f), void 0;
                u > 0 ? (u = 0, this.keyAcceleration = 0) : u < this.maxScrollX && (u = this.maxScrollX, this.keyAcceleration = 0);
                f > 0 ? (f = 0, this.keyAcceleration = 0) : f < this.maxScrollY && (f = this.maxScrollY, this.keyAcceleration = 0);
                this.scrollTo(u, f, 0);
                this.keyTime = o
            }
        },
        _animate: function(n, t, i, u) {
            function e() {
                var y, p, v, a = r.getTime();
                return a >= l ? (f.isAnimating = !1, f._translate(n, t), f.resetPosition(f.options.bounceTime) || f._execEvent("scrollEnd"), void 0) : (a = (a - c) / i, v = u(a), y = (n - s) * v + s, p = (t - h) * v + h, f._translate(y, p), f.isAnimating && o(e), void 0)
            }
            var f = this,
                s = this.x,
                h = this.y,
                c = r.getTime(),
                l = c + i;
            this.isAnimating = !0;
            e()
        },
        handleEvent: function(n) {
            switch (n.type) {
                case "touchstart":
                case "MSPointerDown":
                case "mousedown":
                    this._start(n);
                    break;
                case "touchmove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(n);
                    break;
                case "touchend":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(n);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(n);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(n);
                    break;
                case "keydown":
                    this._key(n);
                    break;
                case "click":
                    n._constructed || (n.preventDefault(), n.stopPropagation())
            }
        }
    };
    e.prototype = {
        handleEvent: function(n) {
            switch (n.type) {
                case "touchstart":
                case "MSPointerDown":
                case "mousedown":
                    this._start(n);
                    break;
                case "touchmove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(n);
                    break;
                case "touchend":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(n)
            }
        },
        destroy: function() {
            this.options.interactive && (r.removeEvent(this.indicator, "touchstart", this), r.removeEvent(this.indicator, "MSPointerDown", this), r.removeEvent(this.indicator, "mousedown", this), r.removeEvent(n, "touchmove", this), r.removeEvent(n, "MSPointerMove", this), r.removeEvent(n, "mousemove", this), r.removeEvent(n, "touchend", this), r.removeEvent(n, "MSPointerUp", this), r.removeEvent(n, "mouseup", this));
            this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(t) {
            var i = t.touches ? t.touches[0] : t;
            t.preventDefault();
            t.stopPropagation();
            this.transitionTime();
            this.initiated = !0;
            this.moved = !1;
            this.lastPointX = i.pageX;
            this.lastPointY = i.pageY;
            this.startTime = r.getTime();
            this.options.disableTouch || r.addEvent(n, "touchmove", this);
            this.options.disablePointer || r.addEvent(n, "MSPointerMove", this);
            this.options.disableMouse || r.addEvent(n, "mousemove", this);
            this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(n) {
            var i, u, f, e, t = n.touches ? n.touches[0] : n;
            r.getTime();
            this.moved || this.scroller._execEvent("scrollStart");
            this.moved = !0;
            i = t.pageX - this.lastPointX;
            this.lastPointX = t.pageX;
            u = t.pageY - this.lastPointY;
            this.lastPointY = t.pageY;
            f = this.x + i;
            e = this.y + u;
            this._pos(f, e);
            n.preventDefault();
            n.stopPropagation()
        },
        _end: function(t) {
            if (this.initiated) {
                if (this.initiated = !1, t.preventDefault(), t.stopPropagation(), r.removeEvent(n, "touchmove", this), r.removeEvent(n, "MSPointerMove", this), r.removeEvent(n, "mousemove", this), this.scroller.options.snap) {
                    var u = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        f = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - u.x), 1e3), i.min(i.abs(this.scroller.y - u.y), 1e3)), 300);
                    (this.scroller.x != u.x || this.scroller.y != u.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = u, this.scroller.scrollTo(u.x, u.y, f, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(n) {
            n = n || 0;
            this.indicatorStyle[r.style.transitionDuration] = n + "ms";
            !n && r.isBadAndroid && (this.indicatorStyle[r.style.transitionDuration] = "0.001s")
        },
        transitionTimingFunction: function(n) {
            this.indicatorStyle[r.style.transitionTimingFunction] = n
        },
        refresh: function() {
            this.transitionTime();
            this.indicatorStyle.display = this.options.listenX && !this.options.listenY ? this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.scroller.hasVerticalScroll ? "block" : "none" : this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none";
            this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (r.addClass(this.wrapper, "iScrollBothScrollbars"), r.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (r.removeClass(this.wrapper, "iScrollBothScrollbars"), r.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX);
            this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY);
            this.updatePosition()
        },
        updatePosition: function() {
            var n = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
                t = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (n < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + n, 8), this.indicatorStyle.width = this.width + "px"), n = this.minBoundaryX) : n > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (n - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", n = this.maxPosX + this.indicatorWidth - this.width) : n = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), t < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * t, 8), this.indicatorStyle.height = this.height + "px"), t = this.minBoundaryY) : t > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px"));
            this.x = n;
            this.y = t;
            this.scroller.options.useTransform ? this.indicatorStyle[r.style.transform] = "translate(" + n + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = n + "px", this.indicatorStyle.top = t + "px")
        },
        _pos: function(n, t) {
            0 > n ? n = 0 : n > this.maxPosX && (n = this.maxPosX);
            0 > t ? t = 0 : t > this.maxPosY && (t = this.maxPosY);
            n = this.options.listenX ? i.round(n / this.sizeRatioX) : this.scroller.x;
            t = this.options.listenY ? i.round(t / this.sizeRatioY) : this.scroller.y;
            this.scroller.scrollTo(n, t)
        },
        fade: function(n, t) {
            if (!t || this.visible) {
                clearTimeout(this.fadeTimeout);
                this.fadeTimeout = null;
                var i = n ? 250 : 500,
                    u = n ? 0 : 300;
                n = n ? "1" : "0";
                this.wrapperStyle[r.style.transitionDuration] = i + "ms";
                this.fadeTimeout = setTimeout(function(n) {
                    this.wrapperStyle.opacity = n;
                    this.visible = +n
                }.bind(this, n), u)
            }
        }
    };
    u.utils = r;
    "undefined" != typeof module && module.exports ? module.exports = u : n.IScroll = u
}(window, document, Math),
function(n) {
    "use strict";
    var t = function(n, i, r) {
            var u = document.createElement("img"),
                f, e;
            if (u.onerror = i, u.onload = function() {
                    !e || r && r.noRevoke || t.revokeObjectURL(e);
                    i && i(t.scale(u, r))
                }, t.isInstanceOf("Blob", n) || t.isInstanceOf("File", n)) f = e = t.createObjectURL(n), u._type = n.type;
            else if (typeof n == "string") f = n, r && r.crossOrigin && (u.crossOrigin = r.crossOrigin);
            else return !1;
            return f ? (u.src = f, u) : t.readFile(n, function(n) {
                var t = n.target;
                t && t.result ? u.src = t.result : i && i(n)
            })
        },
        i = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
    t.isInstanceOf = function(n, t) {
        return Object.prototype.toString.call(t) === "[object " + n + "]"
    };
    t.transformCoordinates = function() {
        return
    };
    t.getTransformedOptions = function(n, t) {
        var r = t.aspectRatio,
            i, u, f, e;
        if (!r) return t;
        i = {};
        for (u in t) t.hasOwnProperty(u) && (i[u] = t[u]);
        return i.crop = !0, f = n.naturalWidth || n.width, e = n.naturalHeight || n.height, f / e > r ? (i.maxWidth = e * r, i.maxHeight = e) : (i.maxWidth = f, i.maxHeight = f / r), i
    };
    t.renderImageToCanvas = function(n, t, i, r, u, f, e, o, s, h) {
        return n.getContext("2d").drawImage(t, i, r, u, f, e, o, s, h), n
    };
    t.hasCanvasOption = function(n) {
        return n.canvas || n.crop || n.aspectRatio
    };
    t.scale = function(n, i) {
        i = i || {};
        var h = document.createElement("canvas"),
            w = n.getContext || t.hasCanvasOption(i) && h.getContext,
            a = n.naturalWidth || n.width,
            v = n.naturalHeight || n.height,
            r = a,
            u = v,
            f, e, y, p, o, s, c, l, b, k = function() {
                var n = Math.max((y || r) / r, (p || u) / u);
                n > 1 && (r = r * n, u = u * n)
            },
            d = function() {
                var n = Math.min((f || r) / r, (e || u) / u);
                n < 1 && (r = r * n, u = u * n)
            };
        return (w && (i = t.getTransformedOptions(n, i), c = i.left || 0, l = i.top || 0, i.sourceWidth ? (o = i.sourceWidth, i.right !== undefined && i.left === undefined && (c = a - o - i.right)) : o = a - c - (i.right || 0), i.sourceHeight ? (s = i.sourceHeight, i.bottom !== undefined && i.top === undefined && (l = v - s - i.bottom)) : s = v - l - (i.bottom || 0), r = o, u = s), f = i.maxWidth, e = i.maxHeight, y = i.minWidth, p = i.minHeight, w && f && e && i.crop ? (r = f, u = e, b = o / s - f / e, b < 0 ? (s = e * o / f, i.top === undefined && i.bottom === undefined && (l = (v - s) / 2)) : b > 0 && (o = f * s / e, i.left === undefined && i.right === undefined && (c = (a - o) / 2))) : ((i.contain || i.cover) && (y = f = f || y, p = e = e || p), i.cover ? (d(), k()) : (k(), d())), w) ? (h.width = r, h.height = u, t.transformCoordinates(h, i), t.renderImageToCanvas(h, n, c, l, o, s, 0, 0, r, u)) : (n.width = r, n.height = u, n)
    };
    t.createObjectURL = function(n) {
        return i ? i.createObjectURL(n) : !1
    };
    t.revokeObjectURL = function(n) {
        return i ? i.revokeObjectURL(n) : !1
    };
    t.readFile = function(n, t, i) {
        if (window.FileReader) {
            var r = new FileReader;
            if (r.onload = r.onerror = t, i = i || "readAsDataURL", r[i]) return r[i](n), r
        }
        return !1
    };
    typeof define == "function" && define.amd ? define(function() {
        return t
    }) : n.loadImage = t
}(this),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["load-image"], n) : n(window.loadImage)
}(function(n) {
    "use strict";
    if (window.navigator && window.navigator.platform && /iP(hone|od|ad)/.test(window.navigator.platform)) {
        var t = n.renderImageToCanvas;
        n.detectSubsampling = function(n) {
            var t, i;
            return n.width * n.height > 1048576 ? (t = document.createElement("canvas"), t.width = t.height = 1, i = t.getContext("2d"), i.drawImage(n, -n.width + 1, 0), i.getImageData(0, 0, 1, 1).data[3] === 0) : !1
        };
        n.detectVerticalSquash = function(n, t) {
            var r = n.naturalHeight || n.height,
                f = document.createElement("canvas"),
                o = f.getContext("2d"),
                s, u, e, i, h;
            for (t && (r /= 2), f.width = 1, f.height = r, o.drawImage(n, 0, 0), s = o.getImageData(0, 0, 1, r).data, u = 0, e = r, i = r; i > u;) h = s[(i - 1) * 4 + 3], h === 0 ? e = i : u = i, i = e + u >> 1;
            return i / r || 1
        };
        n.renderImageToCanvas = function(i, r, u, f, e, o, s, h, c, l) {
            if (r._type === "image/jpeg") {
                var k = i.getContext("2d"),
                    v = document.createElement("canvas"),
                    a = 1024,
                    d = v.getContext("2d"),
                    y, p, w, b;
                if (v.width = a, v.height = a, k.save(), y = n.detectSubsampling(r), y && (u /= 2, f /= 2, e /= 2, o /= 2), p = n.detectVerticalSquash(r, y), y || p !== 1) {
                    for (f *= p, c = Math.ceil(a * c / e), l = Math.ceil(a * l / o / p), h = 0, b = 0; b < o;) {
                        for (s = 0, w = 0; w < e;) d.clearRect(0, 0, a, a), d.drawImage(r, u, f, e, o, -w, -b, e, o), k.drawImage(v, 0, 0, a, a, s, h, c, l), w += a, s += c;
                        b += a;
                        h += l
                    }
                    return k.restore(), i
                }
            }
            return t(i, r, u, f, e, o, s, h, c, l)
        }
    }
}),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["load-image"], n) : n(window.loadImage)
}(function(n) {
    "use strict";
    var t = n.hasCanvasOption,
        i = n.transformCoordinates,
        r = n.getTransformedOptions;
    n.hasCanvasOption = function(i) {
        return t.call(n, i) || i.orientation
    };
    n.transformCoordinates = function(t, r) {
        i.call(n, t, r);
        var u = t.getContext("2d"),
            f = t.width,
            e = t.height,
            o = r.orientation;
        if (o && !(o > 8)) {
            o > 4 && (t.width = e, t.height = f);
            switch (o) {
                case 2:
                    u.translate(f, 0);
                    u.scale(-1, 1);
                    break;
                case 3:
                    u.translate(f, e);
                    u.rotate(Math.PI);
                    break;
                case 4:
                    u.translate(0, e);
                    u.scale(1, -1);
                    break;
                case 5:
                    u.rotate(.5 * Math.PI);
                    u.scale(1, -1);
                    break;
                case 6:
                    u.rotate(.5 * Math.PI);
                    u.translate(0, -e);
                    break;
                case 7:
                    u.rotate(.5 * Math.PI);
                    u.translate(f, -e);
                    u.scale(-1, 1);
                    break;
                case 8:
                    u.rotate(-.5 * Math.PI);
                    u.translate(-f, 0)
            }
        }
    };
    n.getTransformedOptions = function(t, i) {
        var u = r.call(n, t, i),
            o = u.orientation,
            f, e;
        if (!o || o > 8 || o === 1) return u;
        f = {};
        for (e in u) u.hasOwnProperty(e) && (f[e] = u[e]);
        switch (u.orientation) {
            case 2:
                f.left = u.right;
                f.right = u.left;
                break;
            case 3:
                f.left = u.right;
                f.top = u.bottom;
                f.right = u.left;
                f.bottom = u.top;
                break;
            case 4:
                f.top = u.bottom;
                f.bottom = u.top;
                break;
            case 5:
                f.left = u.top;
                f.top = u.left;
                f.right = u.bottom;
                f.bottom = u.right;
                break;
            case 6:
                f.left = u.top;
                f.top = u.right;
                f.right = u.bottom;
                f.bottom = u.left;
                break;
            case 7:
                f.left = u.bottom;
                f.top = u.right;
                f.right = u.top;
                f.bottom = u.left;
                break;
            case 8:
                f.left = u.bottom;
                f.top = u.left;
                f.right = u.top;
                f.bottom = u.right
        }
        return u.orientation > 4 && (f.maxWidth = u.maxHeight, f.maxHeight = u.maxWidth, f.minWidth = u.minHeight, f.minHeight = u.minWidth, f.sourceWidth = u.sourceHeight, f.sourceHeight = u.sourceWidth), f
    }
}),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["load-image"], n) : n(window.loadImage)
}(function(n) {
    "use strict";
    var t = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice);
    n.blobSlice = t && function() {
        var n = this.slice || this.webkitSlice || this.mozSlice;
        return n.apply(this, arguments)
    };
    n.metaDataParsers = {
        jpeg: {
            65505: []
        }
    };
    n.parseMetaData = function(t, i, r) {
        r = r || {};
        var f = this,
            e = r.maxMetaDataSize || 262144,
            u = {},
            o = !(window.DataView && t && t.size >= 12 && t.type === "image/jpeg" && n.blobSlice);
        (o || !n.readFile(n.blobSlice.call(t, 0, e), function(t) {
            if (t.target.error) {
                console.log(t.target.error);
                i(u);
                return
            }
            var h = t.target.result,
                o = new DataView(h),
                e = 2,
                y = o.byteLength - 4,
                c = e,
                s, l, a, v;
            if (o.getUint16(0) === 65496) {
                while (e < y)
                    if (s = o.getUint16(e), s >= 65504 && s <= 65519 || s === 65534) {
                        if (l = o.getUint16(e + 2) + 2, e + l > o.byteLength) {
                            console.log("Invalid meta data: Invalid segment size.");
                            break
                        }
                        if (a = n.metaDataParsers.jpeg[s], a)
                            for (v = 0; v < a.length; v += 1) a[v].call(f, o, e, l, u, r);
                        e += l;
                        c = e
                    } else break;
                !r.disableImageHead && c > 6 && (u.imageHead = h.slice ? h.slice(0, c) : new Uint8Array(h).subarray(0, c))
            } else console.log("Invalid JPEG file: Missing JPEG marker.");
            i(u)
        }, "readAsArrayBuffer")) && i(u)
    }
}),
function(n) {
    "use strict";
    typeof define == "function" && define.amd ? define(["load-image", "load-image-meta"], n) : n(window.loadImage)
}(function(n) {
    "use strict";
    n.ExifMap = function() {
        return this
    };
    n.ExifMap.prototype.map = {
        Orientation: 274
    };
    n.ExifMap.prototype.get = function(n) {
        return this[n] || this[this.map[n]]
    };
    n.getExifThumbnail = function(n, t, i) {
        var u, r, f;
        if (!i || t + i > n.byteLength) {
            console.log("Invalid Exif data: Invalid thumbnail data.");
            return
        }
        for (u = [], r = 0; r < i; r += 1) f = n.getUint8(t + r), u.push((f < 16 ? "0" : "") + f.toString(16));
        return "data:image/jpeg,%" + u.join("%")
    };
    n.exifTagTypes = {
        1: {
            getValue: function(n, t) {
                return n.getUint8(t)
            },
            size: 1
        },
        2: {
            getValue: function(n, t) {
                return String.fromCharCode(n.getUint8(t))
            },
            size: 1,
            ascii: !0
        },
        3: {
            getValue: function(n, t, i) {
                return n.getUint16(t, i)
            },
            size: 2
        },
        4: {
            getValue: function(n, t, i) {
                return n.getUint32(t, i)
            },
            size: 4
        },
        5: {
            getValue: function(n, t, i) {
                return n.getUint32(t, i) / n.getUint32(t + 4, i)
            },
            size: 8
        },
        9: {
            getValue: function(n, t, i) {
                return n.getInt32(t, i)
            },
            size: 4
        },
        10: {
            getValue: function(n, t, i) {
                return n.getInt32(t, i) / n.getInt32(t + 4, i)
            },
            size: 8
        }
    };
    n.exifTagTypes[7] = n.exifTagTypes[1];
    n.getExifValue = function(t, i, r, u, f, e) {
        var s = n.exifTagTypes[u],
            l, c, h, o, a, v;
        if (!s) {
            console.log("Invalid Exif data: Invalid tag type.");
            return
        }
        if (l = s.size * f, c = l > 4 ? i + t.getUint32(r + 8, e) : r + 8, c + l > t.byteLength) {
            console.log("Invalid Exif data: Invalid data offset.");
            return
        }
        if (f === 1) return s.getValue(t, c, e);
        for (h = [], o = 0; o < f; o += 1) h[o] = s.getValue(t, c + o * s.size, e);
        if (s.ascii) {
            for (a = "", o = 0; o < h.length; o += 1) {
                if (v = h[o], v === "\x00") break;
                a += v
            }
            return a
        }
        return h
    };
    n.parseExifTag = function(t, i, r, u, f) {
        var e = t.getUint16(r, u);
        f.exif[e] = n.getExifValue(t, i, r, t.getUint16(r + 2, u), t.getUint32(r + 4, u), u)
    };
    n.parseExifTags = function(n, t, i, r, u) {
        var e, o, f;
        if (i + 6 > n.byteLength) {
            console.log("Invalid Exif data: Invalid directory offset.");
            return
        }
        if (e = n.getUint16(i, r), o = i + 2 + 12 * e, o + 4 > n.byteLength) {
            console.log("Invalid Exif data: Invalid directory size.");
            return
        }
        for (f = 0; f < e; f += 1) this.parseExifTag(n, t, i + 2 + 12 * f, r, u);
        return n.getUint32(o, r)
    };
    n.parseExifData = function(t, i, r, u, f) {
        if (!f.disableExif) {
            var e = i + 10,
                o, s, h;
            if (t.getUint32(i + 4) === 1165519206) {
                if (e + 8 > t.byteLength) {
                    console.log("Invalid Exif data: Invalid segment size.");
                    return
                }
                if (t.getUint16(i + 8) !== 0) {
                    console.log("Invalid Exif data: Missing byte alignment offset.");
                    return
                }
                switch (t.getUint16(e)) {
                    case 18761:
                        o = !0;
                        break;
                    case 19789:
                        o = !1;
                        break;
                    default:
                        console.log("Invalid Exif data: Invalid byte alignment marker.");
                        return
                }
                if (t.getUint16(e + 2, o) !== 42) {
                    console.log("Invalid Exif data: Missing TIFF marker.");
                    return
                }
                s = t.getUint32(e + 4, o);
                u.exif = new n.ExifMap;
                s = n.parseExifTags(t, e, e + s, o, u);
                s && !f.disableExifThumbnail && (h = {
                    exif: {}
                }, s = n.parseExifTags(t, e, e + s, o, h), h.exif[513] && (u.exif.Thumbnail = n.getExifThumbnail(t, e + h.exif[513], h.exif[514])));
                u.exif[34665] && !f.disableExifSub && n.parseExifTags(t, e, e + u.exif[34665], o, u);
                u.exif[34853] && !f.disableExifGps && n.parseExifTags(t, e, e + u.exif[34853], o, u)
            }
        }
    };
    n.metaDataParsers.jpeg[65505].push(n.parseExifData)
})