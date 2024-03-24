/*!
* speech-output.webchat-plugin.legacy.js v2.58.0
* https://github.com/Cognigy/WebchatWidget/tree/v2.58.0
* https://github.com/Cognigy/WebchatWidget/tree/v2.58.0/OSS_LICENSES.txt
*/
!function() {
    var e = {
        780: function(e) {
            if (!window.__COGNIGY_WEBCHAT)
                throw new Error("Cognigy Webchat v2.7 or higher has to be loaded before this plugin");
            e.exports = window.__COGNIGY_WEBCHAT.React
        }
    }
      , t = {};
    function n(r) {
        var o = t[r];
        if (void 0 !== o)
            return o.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r](i, i.exports, n),
        i.exports
    }
    !function() {
        "use strict";
        var e = n(780);
        function t(e) {
            return function(e) {
                if (Array.isArray(e))
                    return o(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                    return Array.from(e)
            }(e) || r(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }
        function r(e, t) {
            if (e) {
                if ("string" == typeof e)
                    return o(e, t);
                var n = Object.prototype.toString.call(e).slice(8, -1);
                return "Object" === n && e.constructor && (n = e.constructor.name),
                "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
            }
        }
        function o(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++)
                r[n] = e[n];
            return r
        }
        var i, a = new Set, s = function(e) {
            if (a.has(e.message.traceId))
                return null;
            if (a.add(e.message.traceId),
            !e.config.settings.enableTTS)
                return null;
            // Use fetch to call the new API instead of SpeechSynthesis API
            fetch("http://127.0.0.1:8000/synthesize/?text=" + encodeURIComponent(e.message.text))
                .then(response => response.json())
                .then(data => {
                    if (data && data.audioUrl) {
                        var audio = new Audio(data.audioUrl);
                        audio.play();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
 
            return null;
        };
        i = {
            match: function(e) {
                var t = e.text
                  , n = e.source;
                return "bot" === n || "engagement" === n && !!t
            },
            component: e.memo(s),
            options: {
                passthrough: !0,
                fullwidth: !0
            }
        },
        window && (window.cognigyWebchatMessagePlugins = [].concat(t(window.cognigyWebchatMessagePlugins || []), [i]),
        console.log("added cognigy message plugin"))
    }()
}();