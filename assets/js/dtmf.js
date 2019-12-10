this.DTMF = function(t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    return n.m = t, n.c = e, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, n.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 3)
}([function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    e.dtmfFreqs = [
        [697, 770, 852, 941],
        [1209, 1336, 1477, 1633]
    ], e.dtmfChars = [
        ["1", "2", "3", "A"],
        ["4", "5", "6", "B"],
        ["7", "8", "9", "C"],
        ["*", "0", "#", "D"]
    ]
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }
            return function(e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(),
        r = n(0);
    var i = function() {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.options = e
        }
        return o(t, [{
            key: "start",
            value: function(t, e) {
                if (!this._timer && e) {
                    this.audioContext = new(window.AudioContext || window.webkitAudioContext);
                    var n = this.audioContext.createMediaStreamSource(t),
                        o = this.audioContext.createAnalyser();
                    o.fftSize = 1024, o.smoothingTimeConstant = 0, n.connect(o);
                    var i, a = new Uint8Array(o.frequencyBinCount),
                        u = this.audioContext.sampleRate / a.length / 2,
                        s = 0,
                        c = this.options.duration || 100,
                        f = this.options.step || 10;
                    this._timer = setInterval(function() {
                        o.getByteFrequencyData(a);
                        for (var t = 0, n = 0; n < a.length; n++) a[n] > t && (t = a[n]);
                        var c = l(a, r.dtmfFreqs[0], u),
                            d = l(a, r.dtmfFreqs[1], u);
                        if (c >= 0 && d >= 0) {
                            var h = r.dtmfChars[c][d];
                            i == h ? ++s > .75 * f && (e(h), s = 0) : s = 0, i = h
                        }
                    }, c / f)
                }

                function l(t, e, n) {
                    for (var o = 0, r = -1, i = 0; i < e.length; i++) {
                        var a = Math.round(e[i] / n);
                        t[a] > o && (o = t[a], r = i)
                    }
                    return r
                }
            }
        }, {
            key: "stop",
            value: function() {
                clearInterval(this._timer), this._timer = null, this.audioContext && ("function" == typeof this.audioContext.close && this.audioContext.close(), this.audioContext = null)
            }
        }]), t
    }();
    e.default = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
            }
            return function(e, n, o) {
                return n && t(e.prototype, n), o && t(e, o), e
            }
        }(),
        r = n(0);
    var i = function() {
        function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t);
            for (var n = new(window.AudioContext || window.webkitAudioContext), o = [], i = 0; i < r.dtmfFreqs[0].length; i++) {
                for (var a = [], u = r.dtmfFreqs[0][i], s = 0; s < r.dtmfFreqs[1].length; s++) {
                    var c = r.dtmfFreqs[1][s],
                        f = {};
                    f.gain1 = n.createGain(), f.gain1.gain.value = 0, f.gain1.connect(n.destination), f.osc1 = n.createOscillator(), f.osc1.type = "sine", f.osc1.frequency.value = u, f.osc1.connect(f.gain1), f.osc2 = n.createOscillator(), f.osc2.type = "sine", f.osc2.frequency.value = c, f.osc2.connect(f.gain1), f.osc1.start(0), f.osc2.start(0), a.push(f)
                }
                o.push(a)
            }
            this.options = e, this.audioContext = n, this.grid = o
        }
        return o(t, [{
            key: "play",
            value: function(t, e) {
                if (e || (e = function() {}), !t) return e();
                var n = t.split(""),
                    o = this.grid,
                    i = this.options.duration || 100,
                    a = this.options.pause || 40;
                ! function t() {
                    var u, s, c = n.shift();
                    if (!c) return e();
                    t: for (u = 0; u < r.dtmfChars.length; u++)
                        for (s = 0; s < r.dtmfChars[u].length; s++)
                            if (r.dtmfChars[u][s] == c) break t;
                    var f = o[u][s];
                    if (!f) return e();
                    f.gain1.gain.value = 1, setTimeout(function() {
                        f.gain1.gain.value = 0, setTimeout(t, a)
                    }, i)
                }()
            }
        }, {
            key: "destory",
            value: function() {
                this.audioContext && ("function" == typeof this.audioContext.close && this.audioContext.close(), this.audioContext = null)
            }
        }]), t
    }();
    e.default = i
}, function(t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Receiver = e.Sender = void 0;
    var o = i(n(2)),
        r = i(n(1));

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    e.Sender = o.default, e.Receiver = r.default
}]);

$(".js-dtmf-interface li").on("mousedown touchstart", function(e){
    e.preventDefault();

    var sender = new DTMF.Sender({ duration: 250, pause: 125 });
    var keyPressed = $(this).html(); // this gets the number/character that was pressed
    var frequencyPair;

    switch(keyPressed) {
        case 'RRF 96':
            keyPressed = '96';
            break;
        case 'FON 97':
            keyPressed = '97';
            break;
        case 'TEC 98':
            keyPressed = '98';
            break;
        case 'INT 99':
            keyPressed = '99';
            break;
        case 'BAV 100':
            keyPressed = '100';
            break;
        case 'LOC 101':
            keyPressed = '101';
            break;
    }

    sender.play(keyPressed);
});

