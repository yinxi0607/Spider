const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
window = global;
var document = dom.window.document;
var params = {
    location:{
        hash: "",
        host: "www.toutiao.com",
        hostname: "www.toutiao.com",
        href: "https://www.toutiao.com",
        origin: "https://www.toutiao.com",
        pathname: "/",
        port: "",
        protocol: "https:",
        search: "",
    },
    navigator:{
        appCodeName: "Mozilla",
        appName: "Netscape",
        appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
        cookieEnabled: true,
        deviceMemory: 8,
        doNotTrack: null,
        hardwareConcurrency: 4,
        language: "zh-CN",
        languages: ["zh-CN", "zh"],
        maxTouchPoints: 0,
        onLine: true,
        platform: "Win32",
        product: "Gecko",
        productSub: "20030107",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36",
        vendor: "Google Inc.",
        vendorSub: "",
    },
    "screen":{
        availHeight: 1040,
        availLeft: 0,
        availTop: 0,
        availWidth: 1920,
        colorDepth: 24,
        height: 1080,
        pixelDepth: 24,
        width: 1920,
    }
};
Object.assign(window,params);

window.document = document;


function getpwd(pwd, pubkey) {
     var encrypt = new JSEncrypt();
     encrypt.setPublicKey(pubkey);
     return encrypt.encrypt(pwd);
}


!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.JSEncrypt = {})
}(this, function(t) {
    "use strict";
    var e = "0123456789abcdefghijklmnopqrstuvwxyz";
    function a(t) {
        return e.charAt(t)
    }
    function i(t, e) {
        return t & e
    }
    function u(t, e) {
        return t | e
    }
    function r(t, e) {
        return t ^ e
    }
    function n(t, e) {
        return t & ~e
    }
    function s(t) {
        if (0 == t)
            return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
        e += 16),
        0 == (255 & t) && (t >>= 8,
        e += 8),
        0 == (15 & t) && (t >>= 4,
        e += 4),
        0 == (3 & t) && (t >>= 2,
        e += 2),
        0 == (1 & t) && ++e,
        e
    }
    function o(t) {
        for (var e = 0; 0 != t; )
            t &= t - 1,
            ++e;
        return e
    }
    var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    function c(t) {
        var e, i, r = "";
        for (e = 0; e + 3 <= t.length; e += 3)
            i = parseInt(t.substring(e, e + 3), 16),
            r += h.charAt(i >> 6) + h.charAt(63 & i);
        for (e + 1 == t.length ? (i = parseInt(t.substring(e, e + 1), 16),
        r += h.charAt(i << 2)) : e + 2 == t.length && (i = parseInt(t.substring(e, e + 2), 16),
        r += h.charAt(i >> 2) + h.charAt((3 & i) << 4)); 0 < (3 & r.length); )
            r += "=";
        return r
    }
    function f(t) {
        var e, i = "", r = 0, n = 0;
        for (e = 0; e < t.length && "=" != t.charAt(e); ++e) {
            var s = h.indexOf(t.charAt(e));
            s < 0 || (0 == r ? (i += a(s >> 2),
            n = 3 & s,
            r = 1) : 1 == r ? (i += a(n << 2 | s >> 4),
            n = 15 & s,
            r = 2) : 2 == r ? (i += a(n),
            i += a(s >> 2),
            n = 3 & s,
            r = 3) : (i += a(n << 2 | s >> 4),
            i += a(15 & s),
            r = 0))
        }
        return 1 == r && (i += a(n << 2)),
        i
    }
    var l, p = function(t, e) {
        return (p = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    };
    var g, d = function(t) {
        var e;
        if (void 0 === l) {
            var i = "0123456789ABCDEF"
              , r = " \f\n\r\t聽\u2028\u2029";
            for (l = {},
            e = 0; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (i = i.toLowerCase(),
            e = 10; e < 16; ++e)
                l[i.charAt(e)] = e;
            for (e = 0; e < r.length; ++e)
                l[r.charAt(e)] = -1
        }
        var n = []
          , s = 0
          , o = 0;
        for (e = 0; e < t.length; ++e) {
            var h = t.charAt(e);
            if ("=" == h)
                break;
            if (-1 != (h = l[h])) {
                if (void 0 === h)
                    throw new Error("Illegal character at offset " + e);
                s |= h,
                2 <= ++o ? (n[n.length] = s,
                o = s = 0) : s <<= 4
            }
        }
        if (o)
            throw new Error("Hex encoding incomplete: 4 bits missing");
        return n
    }, v = {
        decode: function(t) {
            var e;
            if (void 0 === g) {
                var i = "= \f\n\r\t聽\u2028\u2029";
                for (g = Object.create(null),
                e = 0; e < 64; ++e)
                    g["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                for (e = 0; e < i.length; ++e)
                    g[i.charAt(e)] = -1
            }
            var r = []
              , n = 0
              , s = 0;
            for (e = 0; e < t.length; ++e) {
                var o = t.charAt(e);
                if ("=" == o)
                    break;
                if (-1 != (o = g[o])) {
                    if (void 0 === o)
                        throw new Error("Illegal character at offset " + e);
                    n |= o,
                    4 <= ++s ? (r[r.length] = n >> 16,
                    r[r.length] = n >> 8 & 255,
                    r[r.length] = 255 & n,
                    s = n = 0) : n <<= 6
                }
            }
            switch (s) {
            case 1:
                throw new Error("Base64 encoding incomplete: at least 2 bits missing");
            case 2:
                r[r.length] = n >> 10;
                break;
            case 3:
                r[r.length] = n >> 16,
                r[r.length] = n >> 8 & 255
            }
            return r
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function(t) {
            var e = v.re.exec(t);
            if (e)
                if (e[1])
                    t = e[1];
                else {
                    if (!e[2])
                        throw new Error("RegExp out of sync");
                    t = e[2]
                }
            return v.decode(t)
        }
    }, m = 1e13, y = function() {
        function t(t) {
            this.buf = [+t || 0]
        }
        return t.prototype.mulAdd = function(t, e) {
            var i, r, n = this.buf, s = n.length;
            for (i = 0; i < s; ++i)
                (r = n[i] * t + e) < m ? e = 0 : r -= (e = 0 | r / m) * m,
                n[i] = r;
            0 < e && (n[i] = e)
        }
        ,
        t.prototype.sub = function(t) {
            var e, i, r = this.buf, n = r.length;
            for (e = 0; e < n; ++e)
                (i = r[e] - t) < 0 ? (i += m,
                t = 1) : t = 0,
                r[e] = i;
            for (; 0 === r[r.length - 1]; )
                r.pop()
        }
        ,
        t.prototype.toString = function(t) {
            if (10 != (t || 10))
                throw new Error("only base 10 is supported");
            for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r)
                i += (m + e[r]).toString().substring(1);
            return i
        }
        ,
        t.prototype.valueOf = function() {
            for (var t = this.buf, e = 0, i = t.length - 1; 0 <= i; --i)
                e = e * m + t[i];
            return e
        }
        ,
        t.prototype.simplify = function() {
            var t = this.buf;
            return 1 == t.length ? t[0] : this
        }
        ,
        t
    }(), b = "鈥�", T = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, S = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function E(t, e) {
        return t.length > e && (t = t.substring(0, e) + b),
        t
    }
    var w, D = function() {
        function i(t, e) {
            this.hexDigits = "0123456789ABCDEF",
            t instanceof i ? (this.enc = t.enc,
            this.pos = t.pos) : (this.enc = t,
            this.pos = e)
        }
        return i.prototype.get = function(t) {
            if (void 0 === t && (t = this.pos++),
            t >= this.enc.length)
                throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
            return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
        }
        ,
        i.prototype.hexByte = function(t) {
            return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
        }
        ,
        i.prototype.hexDump = function(t, e, i) {
            for (var r = "", n = t; n < e; ++n)
                if (r += this.hexByte(this.get(n)),
                !0 !== i)
                    switch (15 & n) {
                    case 7:
                        r += "  ";
                        break;
                    case 15:
                        r += "\n";
                        break;
                    default:
                        r += " "
                    }
            return r
        }
        ,
        i.prototype.isASCII = function(t, e) {
            for (var i = t; i < e; ++i) {
                var r = this.get(i);
                if (r < 32 || 176 < r)
                    return !1
            }
            return !0
        }
        ,
        i.prototype.parseStringISO = function(t, e) {
            for (var i = "", r = t; r < e; ++r)
                i += String.fromCharCode(this.get(r));
            return i
        }
        ,
        i.prototype.parseStringUTF = function(t, e) {
            for (var i = "", r = t; r < e; ) {
                var n = this.get(r++);
                i += n < 128 ? String.fromCharCode(n) : 191 < n && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
            }
            return i
        }
        ,
        i.prototype.parseStringBMP = function(t, e) {
            for (var i, r, n = "", s = t; s < e; )
                i = this.get(s++),
                r = this.get(s++),
                n += String.fromCharCode(i << 8 | r);
            return n
        }
        ,
        i.prototype.parseTime = function(t, e, i) {
            var r = this.parseStringISO(t, e)
              , n = (i ? T : S).exec(r);
            return n ? (i && (n[1] = +n[1],
            n[1] += +n[1] < 70 ? 2e3 : 1900),
            r = n[1] + "-" + n[2] + "-" + n[3] + " " + n[4],
            n[5] && (r += ":" + n[5],
            n[6] && (r += ":" + n[6],
            n[7] && (r += "." + n[7]))),
            n[8] && (r += " UTC",
            "Z" != n[8] && (r += n[8],
            n[9] && (r += ":" + n[9]))),
            r) : "Unrecognized time: " + r
        }
        ,
        i.prototype.parseInteger = function(t, e) {
            for (var i, r = this.get(t), n = 127 < r, s = n ? 255 : 0, o = ""; r == s && ++t < e; )
                r = this.get(t);
            if (0 === (i = e - t))
                return n ? -1 : 0;
            if (4 < i) {
                for (o = r,
                i <<= 3; 0 == (128 & (+o ^ s)); )
                    o = +o << 1,
                    --i;
                o = "(" + i + " bit)\n"
            }
            n && (r -= 256);
            for (var h = new y(r), a = t + 1; a < e; ++a)
                h.mulAdd(256, this.get(a));
            return o + h.toString()
        }
        ,
        i.prototype.parseBitString = function(t, e, i) {
            for (var r = this.get(t), n = "(" + ((e - t - 1 << 3) - r) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
                for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; a <= u; --u)
                    s += h >> u & 1 ? "1" : "0";
                if (s.length > i)
                    return n + E(s, i)
            }
            return n + s
        }
        ,
        i.prototype.parseOctetString = function(t, e, i) {
            if (this.isASCII(t, e))
                return E(this.parseStringISO(t, e), i);
            var r = e - t
              , n = "(" + r + " byte)\n";
            (i /= 2) < r && (e = t + i);
            for (var s = t; s < e; ++s)
                n += this.hexByte(this.get(s));
            return i < r && (n += b),
            n
        }
        ,
        i.prototype.parseOID = function(t, e, i) {
            for (var r = "", n = new y, s = 0, o = t; o < e; ++o) {
                var h = this.get(o);
                if (n.mulAdd(128, 127 & h),
                s += 7,
                !(128 & h)) {
                    if ("" === r)
                        if ((n = n.simplify())instanceof y)
                            n.sub(80),
                            r = "2." + n.toString();
                        else {
                            var a = n < 80 ? n < 40 ? 0 : 1 : 2;
                            r = a + "." + (n - 40 * a)
                        }
                    else
                        r += "." + n.toString();
                    if (r.length > i)
                        return E(r, i);
                    n = new y,
                    s = 0
                }
            }
            return 0 < s && (r += ".incomplete"),
            r
        }
        ,
        i
    }(), x = function() {
        function c(t, e, i, r, n) {
            if (!(r instanceof R))
                throw new Error("Invalid tag value.");
            this.stream = t,
            this.header = e,
            this.length = i,
            this.tag = r,
            this.sub = n
        }
        return c.prototype.typeName = function() {
            switch (this.tag.tagClass) {
            case 0:
                switch (this.tag.tagNumber) {
                case 0:
                    return "EOC";
                case 1:
                    return "BOOLEAN";
                case 2:
                    return "INTEGER";
                case 3:
                    return "BIT_STRING";
                case 4:
                    return "OCTET_STRING";
                case 5:
                    return "NULL";
                case 6:
                    return "OBJECT_IDENTIFIER";
                case 7:
                    return "ObjectDescriptor";
                case 8:
                    return "EXTERNAL";
                case 9:
                    return "REAL";
                case 10:
                    return "ENUMERATED";
                case 11:
                    return "EMBEDDED_PDV";
                case 12:
                    return "UTF8String";
                case 16:
                    return "SEQUENCE";
                case 17:
                    return "SET";
                case 18:
                    return "NumericString";
                case 19:
                    return "PrintableString";
                case 20:
                    return "TeletexString";
                case 21:
                    return "VideotexString";
                case 22:
                    return "IA5String";
                case 23:
                    return "UTCTime";
                case 24:
                    return "GeneralizedTime";
                case 25:
                    return "GraphicString";
                case 26:
                    return "VisibleString";
                case 27:
                    return "GeneralString";
                case 28:
                    return "UniversalString";
                case 30:
                    return "BMPString"
                }
                return "Universal_" + this.tag.tagNumber.toString();
            case 1:
                return "Application_" + this.tag.tagNumber.toString();
            case 2:
                return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
                return "Private_" + this.tag.tagNumber.toString()
            }
        }
        ,
        c.prototype.content = function(t) {
            if (void 0 === this.tag)
                return null;
            void 0 === t && (t = 1 / 0);
            var e = this.posContent()
              , i = Math.abs(this.length);
            if (!this.tag.isUniversal())
                return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            switch (this.tag.tagNumber) {
            case 1:
                return 0 === this.stream.get(e) ? "false" : "true";
            case 2:
                return this.stream.parseInteger(e, e + i);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
            case 6:
                return this.stream.parseOID(e, e + i, t);
            case 16:
            case 17:
                return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
            case 12:
                return E(this.stream.parseStringUTF(e, e + i), t);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return E(this.stream.parseStringISO(e, e + i), t);
            case 30:
                return E(this.stream.parseStringBMP(e, e + i), t);
            case 23:
            case 24:
                return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber)
            }
            return null
        }
        ,
        c.prototype.toString = function() {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
        }
        ,
        c.prototype.toPrettyString = function(t) {
            void 0 === t && (t = "");
            var e = t + this.typeName() + " @" + this.stream.pos;
            if (0 <= this.length && (e += "+"),
            e += this.length,
            this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
            e += "\n",
            null !== this.sub) {
                t += "  ";
                for (var i = 0, r = this.sub.length; i < r; ++i)
                    e += this.sub[i].toPrettyString(t)
            }
            return e
        }
        ,
        c.prototype.posStart = function() {
            return this.stream.pos
        }
        ,
        c.prototype.posContent = function() {
            return this.stream.pos + this.header
        }
        ,
        c.prototype.posEnd = function() {
            return this.stream.pos + this.header + Math.abs(this.length)
        }
        ,
        c.prototype.toHexString = function() {
            return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
        }
        ,
        c.decodeLength = function(t) {
            var e = t.get()
              , i = 127 & e;
            if (i == e)
                return i;
            if (6 < i)
                throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
            if (0 === i)
                return null;
            for (var r = e = 0; r < i; ++r)
                e = 256 * e + t.get();
            return e
        }
        ,
        c.prototype.getHexStringValue = function() {
            var t = this.toHexString()
              , e = 2 * this.header
              , i = 2 * this.length;
            return t.substr(e, i)
        }
        ,
        c.decode = function(t) {
            var r;
            r = t instanceof D ? t : new D(t,0);
            var e = new D(r)
              , i = new R(r)
              , n = c.decodeLength(r)
              , s = r.pos
              , o = s - e.pos
              , h = null
              , a = function() {
                var t = [];
                if (null !== n) {
                    for (var e = s + n; r.pos < e; )
                        t[t.length] = c.decode(r);
                    if (r.pos != e)
                        throw new Error("Content size is not correct for container starting at offset " + s)
                } else
                    try {
                        for (; ; ) {
                            var i = c.decode(r);
                            if (i.tag.isEOC())
                                break;
                            t[t.length] = i
                        }
                        n = s - r.pos
                    } catch (t) {
                        throw new Error("Exception while decoding undefined length content: " + t)
                    }
                return t
            };
            if (i.tagConstructed)
                h = a();
            else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                try {
                    if (3 == i.tagNumber && 0 != r.get())
                        throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                    h = a();
                    for (var u = 0; u < h.length; ++u)
                        if (h[u].tag.isEOC())
                            throw new Error("EOC is not supposed to be actual content.")
                } catch (t) {
                    h = null
                }
            if (null === h) {
                if (null === n)
                    throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                r.pos = s + Math.abs(n)
            }
            return new c(e,o,n,i,h)
        }
        ,
        c
    }(), R = function() {
        function t(t) {
            var e = t.get();
            if (this.tagClass = e >> 6,
            this.tagConstructed = 0 != (32 & e),
            this.tagNumber = 31 & e,
            31 == this.tagNumber) {
                for (var i = new y; e = t.get(),
                i.mulAdd(128, 127 & e),
                128 & e; )
                    ;
                this.tagNumber = i.simplify()
            }
        }
        return t.prototype.isUniversal = function() {
            return 0 === this.tagClass
        }
        ,
        t.prototype.isEOC = function() {
            return 0 === this.tagClass && 0 === this.tagNumber
        }
        ,
        t
    }(), B = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], A = (1 << 26) / B[B.length - 1], O = function() {
        function b(t, e, i) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }
        return b.prototype.toString = function(t) {
            if (this.s < 0)
                return "-" + this.negate().toString(t);
            var e;
            if (16 == t)
                e = 4;
            else if (8 == t)
                e = 3;
            else if (2 == t)
                e = 1;
            else if (32 == t)
                e = 5;
            else {
                if (4 != t)
                    return this.toRadix(t);
                e = 2
            }
            var i, r = (1 << e) - 1, n = !1, s = "", o = this.t, h = this.DB - o * this.DB % e;
            if (0 < o--)
                for (h < this.DB && 0 < (i = this[o] >> h) && (n = !0,
                s = a(i)); 0 <= o; )
                    h < e ? (i = (this[o] & (1 << h) - 1) << e - h,
                    i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r,
                    h <= 0 && (h += this.DB,
                    --o)),
                    0 < i && (n = !0),
                    n && (s += a(i));
            return n ? s : "0"
        }
        ,
        b.prototype.negate = function() {
            var t = M();
            return b.ZERO.subTo(this, t),
            t
        }
        ,
        b.prototype.abs = function() {
            return this.s < 0 ? this.negate() : this
        }
        ,
        b.prototype.compareTo = function(t) {
            var e = this.s - t.s;
            if (0 != e)
                return e;
            var i = this.t;
            if (0 != (e = i - t.t))
                return this.s < 0 ? -e : e;
            for (; 0 <= --i; )
                if (0 != (e = this[i] - t[i]))
                    return e;
            return 0
        }
        ,
        b.prototype.bitLength = function() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + U(this[this.t - 1] ^ this.s & this.DM)
        }
        ,
        b.prototype.mod = function(t) {
            var e = M();
            return this.abs().divRemTo(t, null, e),
            this.s < 0 && 0 < e.compareTo(b.ZERO) && t.subTo(e, e),
            e
        }
        ,
        b.prototype.modPowInt = function(t, e) {
            var i;
            return i = t < 256 || e.isEven() ? new I(e) : new N(e),
            this.exp(t, i)
        }
        ,
        b.prototype.clone = function() {
            var t = M();
            return this.copyTo(t),
            t
        }
        ,
        b.prototype.intValue = function() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this[0];
                if (0 == this.t)
                    return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }
        ,
        b.prototype.byteValue = function() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }
        ,
        b.prototype.shortValue = function() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }
        ,
        b.prototype.signum = function() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }
        ,
        b.prototype.toByteArray = function() {
            var t = this.t
              , e = [];
            e[0] = this.s;
            var i, r = this.DB - t * this.DB % 8, n = 0;
            if (0 < t--)
                for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); 0 <= t; )
                    r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r,
                    i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255,
                    r <= 0 && (r += this.DB,
                    --t)),
                    0 != (128 & i) && (i |= -256),
                    0 == n && (128 & this.s) != (128 & i) && ++n,
                    (0 < n || i != this.s) && (e[n++] = i);
            return e
        }
        ,
        b.prototype.equals = function(t) {
            return 0 == this.compareTo(t)
        }
        ,
        b.prototype.min = function(t) {
            return this.compareTo(t) < 0 ? this : t
        }
        ,
        b.prototype.max = function(t) {
            return 0 < this.compareTo(t) ? this : t
        }
        ,
        b.prototype.and = function(t) {
            var e = M();
            return this.bitwiseTo(t, i, e),
            e
        }
        ,
        b.prototype.or = function(t) {
            var e = M();
            return this.bitwiseTo(t, u, e),
            e
        }
        ,
        b.prototype.xor = function(t) {
            var e = M();
            return this.bitwiseTo(t, r, e),
            e
        }
        ,
        b.prototype.andNot = function(t) {
            var e = M();
            return this.bitwiseTo(t, n, e),
            e
        }
        ,
        b.prototype.not = function() {
            for (var t = M(), e = 0; e < this.t; ++e)
                t[e] = this.DM & ~this[e];
            return t.t = this.t,
            t.s = ~this.s,
            t
        }
        ,
        b.prototype.shiftLeft = function(t) {
            var e = M();
            return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
            e
        }
        ,
        b.prototype.shiftRight = function(t) {
            var e = M();
            return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
            e
        }
        ,
        b.prototype.getLowestSetBit = function() {
            for (var t = 0; t < this.t; ++t)
                if (0 != this[t])
                    return t * this.DB + s(this[t]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        ,
        b.prototype.bitCount = function() {
            for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
                t += o(this[i] ^ e);
            return t
        }
        ,
        b.prototype.testBit = function(t) {
            var e = Math.floor(t / this.DB);
            return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
        }
        ,
        b.prototype.setBit = function(t) {
            return this.changeBit(t, u)
        }
        ,
        b.prototype.clearBit = function(t) {
            return this.changeBit(t, n)
        }
        ,
        b.prototype.flipBit = function(t) {
            return this.changeBit(t, r)
        }
        ,
        b.prototype.add = function(t) {
            var e = M();
            return this.addTo(t, e),
            e
        }
        ,
        b.prototype.subtract = function(t) {
            var e = M();
            return this.subTo(t, e),
            e
        }
        ,
        b.prototype.multiply = function(t) {
            var e = M();
            return this.multiplyTo(t, e),
            e
        }
        ,
        b.prototype.divide = function(t) {
            var e = M();
            return this.divRemTo(t, e, null),
            e
        }
        ,
        b.prototype.remainder = function(t) {
            var e = M();
            return this.divRemTo(t, null, e),
            e
        }
        ,
        b.prototype.divideAndRemainder = function(t) {
            var e = M()
              , i = M();
            return this.divRemTo(t, e, i),
            [e, i]
        }
        ,
        b.prototype.modPow = function(t, e) {
            var i, r, n = t.bitLength(), s = F(1);
            if (n <= 0)
                return s;
            i = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6,
            r = n < 8 ? new I(e) : e.isEven() ? new P(e) : new N(e);
            var o = []
              , h = 3
              , a = i - 1
              , u = (1 << i) - 1;
            if (o[1] = r.convert(this),
            1 < i) {
                var c = M();
                for (r.sqrTo(o[1], c); h <= u; )
                    o[h] = M(),
                    r.mulTo(c, o[h - 2], o[h]),
                    h += 2
            }
            var f, l, p = t.t - 1, g = !0, d = M();
            for (n = U(t[p]) - 1; 0 <= p; ) {
                for (a <= n ? f = t[p] >> n - a & u : (f = (t[p] & (1 << n + 1) - 1) << a - n,
                0 < p && (f |= t[p - 1] >> this.DB + n - a)),
                h = i; 0 == (1 & f); )
                    f >>= 1,
                    --h;
                if ((n -= h) < 0 && (n += this.DB,
                --p),
                g)
                    o[f].copyTo(s),
                    g = !1;
                else {
                    for (; 1 < h; )
                        r.sqrTo(s, d),
                        r.sqrTo(d, s),
                        h -= 2;
                    0 < h ? r.sqrTo(s, d) : (l = s,
                    s = d,
                    d = l),
                    r.mulTo(d, o[f], s)
                }
                for (; 0 <= p && 0 == (t[p] & 1 << n); )
                    r.sqrTo(s, d),
                    l = s,
                    s = d,
                    d = l,
                    --n < 0 && (n = this.DB - 1,
                    --p)
            }
            return r.revert(s)
        }
        ,
        b.prototype.modInverse = function(t) {
            var e = t.isEven();
            if (this.isEven() && e || 0 == t.signum())
                return b.ZERO;
            for (var i = t.clone(), r = this.clone(), n = F(1), s = F(0), o = F(0), h = F(1); 0 != i.signum(); ) {
                for (; i.isEven(); )
                    i.rShiftTo(1, i),
                    e ? (n.isEven() && s.isEven() || (n.addTo(this, n),
                    s.subTo(t, s)),
                    n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s),
                    s.rShiftTo(1, s);
                for (; r.isEven(); )
                    r.rShiftTo(1, r),
                    e ? (o.isEven() && h.isEven() || (o.addTo(this, o),
                    h.subTo(t, h)),
                    o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h),
                    h.rShiftTo(1, h);
                0 <= i.compareTo(r) ? (i.subTo(r, i),
                e && n.subTo(o, n),
                s.subTo(h, s)) : (r.subTo(i, r),
                e && o.subTo(n, o),
                h.subTo(s, h))
            }
            return 0 != r.compareTo(b.ONE) ? b.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h),
            h.signum() < 0 ? h.add(t) : h) : h
        }
        ,
        b.prototype.pow = function(t) {
            return this.exp(t, new V)
        }
        ,
        b.prototype.gcd = function(t) {
            var e = this.s < 0 ? this.negate() : this.clone()
              , i = t.s < 0 ? t.negate() : t.clone();
            if (e.compareTo(i) < 0) {
                var r = e;
                e = i,
                i = r
            }
            var n = e.getLowestSetBit()
              , s = i.getLowestSetBit();
            if (s < 0)
                return e;
            for (n < s && (s = n),
            0 < s && (e.rShiftTo(s, e),
            i.rShiftTo(s, i)); 0 < e.signum(); )
                0 < (n = e.getLowestSetBit()) && e.rShiftTo(n, e),
                0 < (n = i.getLowestSetBit()) && i.rShiftTo(n, i),
                0 <= e.compareTo(i) ? (e.subTo(i, e),
                e.rShiftTo(1, e)) : (i.subTo(e, i),
                i.rShiftTo(1, i));
            return 0 < s && i.lShiftTo(s, i),
            i
        }
        ,
        b.prototype.isProbablePrime = function(t) {
            var e, i = this.abs();
            if (1 == i.t && i[0] <= B[B.length - 1]) {
                for (e = 0; e < B.length; ++e)
                    if (i[0] == B[e])
                        return !0;
                return !1
            }
            if (i.isEven())
                return !1;
            for (e = 1; e < B.length; ) {
                for (var r = B[e], n = e + 1; n < B.length && r < A; )
                    r *= B[n++];
                for (r = i.modInt(r); e < n; )
                    if (r % B[e++] == 0)
                        return !1
            }
            return i.millerRabin(t)
        }
        ,
        b.prototype.copyTo = function(t) {
            for (var e = this.t - 1; 0 <= e; --e)
                t[e] = this[e];
            t.t = this.t,
            t.s = this.s
        }
        ,
        b.prototype.fromInt = function(t) {
            this.t = 1,
            this.s = t < 0 ? -1 : 0,
            0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
        }
        ,
        b.prototype.fromString = function(t, e) {
            var i;
            if (16 == e)
                i = 4;
            else if (8 == e)
                i = 3;
            else if (256 == e)
                i = 8;
            else if (2 == e)
                i = 1;
            else if (32 == e)
                i = 5;
            else {
                if (4 != e)
                    return void this.fromRadix(t, e);
                i = 2
            }
            this.t = 0,
            this.s = 0;
            for (var r = t.length, n = !1, s = 0; 0 <= --r; ) {
                var o = 8 == i ? 255 & +t[r] : C(t, r);
                o < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1,
                0 == s ? this[this.t++] = o : s + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s,
                this[this.t++] = o >> this.DB - s) : this[this.t - 1] |= o << s,
                (s += i) >= this.DB && (s -= this.DB))
            }
            8 == i && 0 != (128 & +t[0]) && (this.s = -1,
            0 < s && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)),
            this.clamp(),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.clamp = function() {
            for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t; )
                --this.t
        }
        ,
        b.prototype.dlShiftTo = function(t, e) {
            var i;
            for (i = this.t - 1; 0 <= i; --i)
                e[i + t] = this[i];
            for (i = t - 1; 0 <= i; --i)
                e[i] = 0;
            e.t = this.t + t,
            e.s = this.s
        }
        ,
        b.prototype.drShiftTo = function(t, e) {
            for (var i = t; i < this.t; ++i)
                e[i - t] = this[i];
            e.t = Math.max(this.t - t, 0),
            e.s = this.s
        }
        ,
        b.prototype.lShiftTo = function(t, e) {
            for (var i = t % this.DB, r = this.DB - i, n = (1 << r) - 1, s = Math.floor(t / this.DB), o = this.s << i & this.DM, h = this.t - 1; 0 <= h; --h)
                e[h + s + 1] = this[h] >> r | o,
                o = (this[h] & n) << i;
            for (h = s - 1; 0 <= h; --h)
                e[h] = 0;
            e[s] = o,
            e.t = this.t + s + 1,
            e.s = this.s,
            e.clamp()
        }
        ,
        b.prototype.rShiftTo = function(t, e) {
            e.s = this.s;
            var i = Math.floor(t / this.DB);
            if (i >= this.t)
                e.t = 0;
            else {
                var r = t % this.DB
                  , n = this.DB - r
                  , s = (1 << r) - 1;
                e[0] = this[i] >> r;
                for (var o = i + 1; o < this.t; ++o)
                    e[o - i - 1] |= (this[o] & s) << n,
                    e[o - i] = this[o] >> r;
                0 < r && (e[this.t - i - 1] |= (this.s & s) << n),
                e.t = this.t - i,
                e.clamp()
            }
        }
        ,
        b.prototype.subTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] - t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r -= t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r -= t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r -= t.s
            }
            e.s = r < 0 ? -1 : 0,
            r < -1 ? e[i++] = this.DV + r : 0 < r && (e[i++] = r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.multiplyTo = function(t, e) {
            var i = this.abs()
              , r = t.abs()
              , n = i.t;
            for (e.t = n + r.t; 0 <= --n; )
                e[n] = 0;
            for (n = 0; n < r.t; ++n)
                e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);
            e.s = 0,
            e.clamp(),
            this.s != t.s && b.ZERO.subTo(e, e)
        }
        ,
        b.prototype.squareTo = function(t) {
            for (var e = this.abs(), i = t.t = 2 * e.t; 0 <= --i; )
                t[i] = 0;
            for (i = 0; i < e.t - 1; ++i) {
                var r = e.am(i, e[i], t, 2 * i, 0, 1);
                (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV,
                t[i + e.t + 1] = 1)
            }
            0 < t.t && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)),
            t.s = 0,
            t.clamp()
        }
        ,
        b.prototype.divRemTo = function(t, e, i) {
            var r = t.abs();
            if (!(r.t <= 0)) {
                var n = this.abs();
                if (n.t < r.t)
                    return null != e && e.fromInt(0),
                    void (null != i && this.copyTo(i));
                null == i && (i = M());
                var s = M()
                  , o = this.s
                  , h = t.s
                  , a = this.DB - U(r[r.t - 1]);
                0 < a ? (r.lShiftTo(a, s),
                n.lShiftTo(a, i)) : (r.copyTo(s),
                n.copyTo(i));
                var u = s.t
                  , c = s[u - 1];
                if (0 != c) {
                    var f = c * (1 << this.F1) + (1 < u ? s[u - 2] >> this.F2 : 0)
                      , l = this.FV / f
                      , p = (1 << this.F1) / f
                      , g = 1 << this.F2
                      , d = i.t
                      , v = d - u
                      , m = null == e ? M() : e;
                    for (s.dlShiftTo(v, m),
                    0 <= i.compareTo(m) && (i[i.t++] = 1,
                    i.subTo(m, i)),
                    b.ONE.dlShiftTo(u, m),
                    m.subTo(s, s); s.t < u; )
                        s[s.t++] = 0;
                    for (; 0 <= --v; ) {
                        var y = i[--d] == c ? this.DM : Math.floor(i[d] * l + (i[d - 1] + g) * p);
                        if ((i[d] += s.am(0, y, i, v, 0, u)) < y)
                            for (s.dlShiftTo(v, m),
                            i.subTo(m, i); i[d] < --y; )
                                i.subTo(m, i)
                    }
                    null != e && (i.drShiftTo(u, e),
                    o != h && b.ZERO.subTo(e, e)),
                    i.t = u,
                    i.clamp(),
                    0 < a && i.rShiftTo(a, i),
                    o < 0 && b.ZERO.subTo(i, i)
                }
            }
        }
        ,
        b.prototype.invDigit = function() {
            if (this.t < 1)
                return 0;
            var t = this[0];
            if (0 == (1 & t))
                return 0;
            var e = 3 & t;
            return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e
        }
        ,
        b.prototype.isEven = function() {
            return 0 == (0 < this.t ? 1 & this[0] : this.s)
        }
        ,
        b.prototype.exp = function(t, e) {
            if (4294967295 < t || t < 1)
                return b.ONE;
            var i = M()
              , r = M()
              , n = e.convert(this)
              , s = U(t) - 1;
            for (n.copyTo(i); 0 <= --s; )
                if (e.sqrTo(i, r),
                0 < (t & 1 << s))
                    e.mulTo(r, n, i);
                else {
                    var o = i;
                    i = r,
                    r = o
                }
            return e.revert(i)
        }
        ,
        b.prototype.chunkSize = function(t) {
            return Math.floor(Math.LN2 * this.DB / Math.log(t))
        }
        ,
        b.prototype.toRadix = function(t) {
            if (null == t && (t = 10),
            0 == this.signum() || t < 2 || 36 < t)
                return "0";
            var e = this.chunkSize(t)
              , i = Math.pow(t, e)
              , r = F(i)
              , n = M()
              , s = M()
              , o = "";
            for (this.divRemTo(r, n, s); 0 < n.signum(); )
                o = (i + s.intValue()).toString(t).substr(1) + o,
                n.divRemTo(r, n, s);
            return s.intValue().toString(t) + o
        }
        ,
        b.prototype.fromRadix = function(t, e) {
            this.fromInt(0),
            null == e && (e = 10);
            for (var i = this.chunkSize(e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
                var a = C(t, h);
                a < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (n = !0) : (o = e * o + a,
                ++s >= i && (this.dMultiply(r),
                this.dAddOffset(o, 0),
                o = s = 0))
            }
            0 < s && (this.dMultiply(Math.pow(e, s)),
            this.dAddOffset(o, 0)),
            n && b.ZERO.subTo(this, this)
        }
        ,
        b.prototype.fromNumber = function(t, e, i) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else
                    for (this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
                        this.dAddOffset(2, 0),
                        this.bitLength() > t && this.subTo(b.ONE.shiftLeft(t - 1), this);
            else {
                var r = []
                  , n = 7 & t;
                r.length = 1 + (t >> 3),
                e.nextBytes(r),
                0 < n ? r[0] &= (1 << n) - 1 : r[0] = 0,
                this.fromString(r, 256)
            }
        }
        ,
        b.prototype.bitwiseTo = function(t, e, i) {
            var r, n, s = Math.min(t.t, this.t);
            for (r = 0; r < s; ++r)
                i[r] = e(this[r], t[r]);
            if (t.t < this.t) {
                for (n = t.s & this.DM,
                r = s; r < this.t; ++r)
                    i[r] = e(this[r], n);
                i.t = this.t
            } else {
                for (n = this.s & this.DM,
                r = s; r < t.t; ++r)
                    i[r] = e(n, t[r]);
                i.t = t.t
            }
            i.s = e(this.s, t.s),
            i.clamp()
        }
        ,
        b.prototype.changeBit = function(t, e) {
            var i = b.ONE.shiftLeft(t);
            return this.bitwiseTo(i, e, i),
            i
        }
        ,
        b.prototype.addTo = function(t, e) {
            for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n; )
                r += this[i] + t[i],
                e[i++] = r & this.DM,
                r >>= this.DB;
            if (t.t < this.t) {
                for (r += t.s; i < this.t; )
                    r += this[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += this.s
            } else {
                for (r += this.s; i < t.t; )
                    r += t[i],
                    e[i++] = r & this.DM,
                    r >>= this.DB;
                r += t.s
            }
            e.s = r < 0 ? -1 : 0,
            0 < r ? e[i++] = r : r < -1 && (e[i++] = this.DV + r),
            e.t = i,
            e.clamp()
        }
        ,
        b.prototype.dMultiply = function(t) {
            this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
            ++this.t,
            this.clamp()
        }
        ,
        b.prototype.dAddOffset = function(t, e) {
            if (0 != t) {
                for (; this.t <= e; )
                    this[this.t++] = 0;
                for (this[e] += t; this[e] >= this.DV; )
                    this[e] -= this.DV,
                    ++e >= this.t && (this[this.t++] = 0),
                    ++this[e]
            }
        }
        ,
        b.prototype.multiplyLowerTo = function(t, e, i) {
            var r = Math.min(this.t + t.t, e);
            for (i.s = 0,
            i.t = r; 0 < r; )
                i[--r] = 0;
            for (var n = i.t - this.t; r < n; ++r)
                i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
            for (n = Math.min(t.t, e); r < n; ++r)
                this.am(0, t[r], i, r, 0, e - r);
            i.clamp()
        }
        ,
        b.prototype.multiplyUpperTo = function(t, e, i) {
            --e;
            var r = i.t = this.t + t.t - e;
            for (i.s = 0; 0 <= --r; )
                i[r] = 0;
            for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
            i.clamp(),
            i.drShiftTo(1, i)
        }
        ,
        b.prototype.modInt = function(t) {
            if (t <= 0)
                return 0;
            var e = this.DV % t
              , i = this.s < 0 ? t - 1 : 0;
            if (0 < this.t)
                if (0 == e)
                    i = this[0] % t;
                else
                    for (var r = this.t - 1; 0 <= r; --r)
                        i = (e * i + this[r]) % t;
            return i
        }
        ,
        b.prototype.millerRabin = function(t) {
            var e = this.subtract(b.ONE)
              , i = e.getLowestSetBit();
            if (i <= 0)
                return !1;
            var r = e.shiftRight(i);
            B.length < (t = t + 1 >> 1) && (t = B.length);
            for (var n = M(), s = 0; s < t; ++s) {
                n.fromInt(B[Math.floor(Math.random() * B.length)]);
                var o = n.modPow(r, this);
                if (0 != o.compareTo(b.ONE) && 0 != o.compareTo(e)) {
                    for (var h = 1; h++ < i && 0 != o.compareTo(e); )
                        if (0 == (o = o.modPowInt(2, this)).compareTo(b.ONE))
                            return !1;
                    if (0 != o.compareTo(e))
                        return !1
                }
            }
            return !0
        }
        ,
        b.prototype.square = function() {
            var t = M();
            return this.squareTo(t),
            t
        }
        ,
        b.prototype.gcda = function(t, e) {
            var i = this.s < 0 ? this.negate() : this.clone()
              , r = t.s < 0 ? t.negate() : t.clone();
            if (i.compareTo(r) < 0) {
                var n = i;
                i = r,
                r = n
            }
            var s = i.getLowestSetBit()
              , o = r.getLowestSetBit();
            if (o < 0)
                e(i);
            else {
                s < o && (o = s),
                0 < o && (i.rShiftTo(o, i),
                r.rShiftTo(o, r));
                var h = function() {
                    0 < (s = i.getLowestSetBit()) && i.rShiftTo(s, i),
                    0 < (s = r.getLowestSetBit()) && r.rShiftTo(s, r),
                    0 <= i.compareTo(r) ? (i.subTo(r, i),
                    i.rShiftTo(1, i)) : (r.subTo(i, r),
                    r.rShiftTo(1, r)),
                    0 < i.signum() ? setTimeout(h, 0) : (0 < o && r.lShiftTo(o, r),
                    setTimeout(function() {
                        e(r)
                    }, 0))
                };
                setTimeout(h, 10)
            }
        }
        ,
        b.prototype.fromNumberAsync = function(t, e, i, r) {
            if ("number" == typeof e)
                if (t < 2)
                    this.fromInt(1);
                else {
                    this.fromNumber(t, i),
                    this.testBit(t - 1) || this.bitwiseTo(b.ONE.shiftLeft(t - 1), u, this),
                    this.isEven() && this.dAddOffset(1, 0);
                    var n = this
                      , s = function() {
                        n.dAddOffset(2, 0),
                        n.bitLength() > t && n.subTo(b.ONE.shiftLeft(t - 1), n),
                        n.isProbablePrime(e) ? setTimeout(function() {
                            r()
                        }, 0) : setTimeout(s, 0)
                    };
                    setTimeout(s, 0)
                }
            else {
                var o = []
                  , h = 7 & t;
                o.length = 1 + (t >> 3),
                e.nextBytes(o),
                0 < h ? o[0] &= (1 << h) - 1 : o[0] = 0,
                this.fromString(o, 256)
            }
        }
        ,
        b
    }(), V = function() {
        function t() {}
        return t.prototype.convert = function(t) {
            return t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e)
        }
        ,
        t
    }(), I = function() {
        function t(t) {
            this.m = t
        }
        return t.prototype.convert = function(t) {
            return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            t.divRemTo(this.m, null, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), N = function() {
        function t(t) {
            this.m = t,
            this.mp = t.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << t.DB - 15) - 1,
            this.mt2 = 2 * t.t
        }
        return t.prototype.convert = function(t) {
            var e = M();
            return t.abs().dlShiftTo(this.m.t, e),
            e.divRemTo(this.m, null, e),
            t.s < 0 && 0 < e.compareTo(O.ZERO) && this.m.subTo(e, e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.reduce = function(t) {
            for (; t.t <= this.mt2; )
                t[t.t++] = 0;
            for (var e = 0; e < this.m.t; ++e) {
                var i = 32767 & t[e]
                  , r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; )
                    t[i] -= t.DV,
                    t[++i]++
            }
            t.clamp(),
            t.drShiftTo(this.m.t, t),
            0 <= t.compareTo(this.m) && t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }(), P = function() {
        function t(t) {
            this.m = t,
            this.r2 = M(),
            this.q3 = M(),
            O.ONE.dlShiftTo(2 * t.t, this.r2),
            this.mu = this.r2.divide(t)
        }
        return t.prototype.convert = function(t) {
            if (t.s < 0 || t.t > 2 * this.m.t)
                return t.mod(this.m);
            if (t.compareTo(this.m) < 0)
                return t;
            var e = M();
            return t.copyTo(e),
            this.reduce(e),
            e
        }
        ,
        t.prototype.revert = function(t) {
            return t
        }
        ,
        t.prototype.reduce = function(t) {
            for (t.drShiftTo(this.m.t - 1, this.r2),
            t.t > this.m.t + 1 && (t.t = this.m.t + 1,
            t.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
                t.dAddOffset(1, this.m.t + 1);
            for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m); )
                t.subTo(this.m, t)
        }
        ,
        t.prototype.mulTo = function(t, e, i) {
            t.multiplyTo(e, i),
            this.reduce(i)
        }
        ,
        t.prototype.sqrTo = function(t, e) {
            t.squareTo(e),
            this.reduce(e)
        }
        ,
        t
    }();
    function M() {
        return new O(null)
    }
    function q(t, e) {
        return new O(t,e)
    }
    "Microsoft Internet Explorer" == navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 32767 & e, h = e >> 15; 0 <= --s; ) {
            var a = 32767 & this[t]
              , u = this[t++] >> 15
              , c = h * a + u * o;
            n = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + h * u + (n >>> 30),
            i[r++] = 1073741823 & a
        }
        return n
    }
    ,
    w = 30) : "Netscape" != navigator.appName ? (O.prototype.am = function(t, e, i, r, n, s) {
        for (; 0 <= --s; ) {
            var o = e * this[t++] + i[r] + n;
            n = Math.floor(o / 67108864),
            i[r++] = 67108863 & o
        }
        return n
    }
    ,
    w = 26) : (O.prototype.am = function(t, e, i, r, n, s) {
        for (var o = 16383 & e, h = e >> 14; 0 <= --s; ) {
            var a = 16383 & this[t]
              , u = this[t++] >> 14
              , c = h * a + u * o;
            n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u,
            i[r++] = 268435455 & a
        }
        return n
    }
    ,
    w = 28),
    O.prototype.DB = w,
    O.prototype.DM = (1 << w) - 1,
    O.prototype.DV = 1 << w;
    O.prototype.FV = Math.pow(2, 52),
    O.prototype.F1 = 52 - w,
    O.prototype.F2 = 2 * w - 52;
    var j, L, H = [];
    for (j = "0".charCodeAt(0),
    L = 0; L <= 9; ++L)
        H[j++] = L;
    for (j = "a".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    for (j = "A".charCodeAt(0),
    L = 10; L < 36; ++L)
        H[j++] = L;
    function C(t, e) {
        var i = H[t.charCodeAt(e)];
        return null == i ? -1 : i
    }
    function F(t) {
        var e = M();
        return e.fromInt(t),
        e
    }
    function U(t) {
        var e, i = 1;
        return 0 != (e = t >>> 16) && (t = e,
        i += 16),
        0 != (e = t >> 8) && (t = e,
        i += 8),
        0 != (e = t >> 4) && (t = e,
        i += 4),
        0 != (e = t >> 2) && (t = e,
        i += 2),
        0 != (e = t >> 1) && (t = e,
        i += 1),
        i
    }
    O.ZERO = F(0),
    O.ONE = F(1);
    var K = function() {
        function t() {
            this.i = 0,
            this.j = 0,
            this.S = []
        }
        return t.prototype.init = function(t) {
            var e, i, r;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (e = i = 0; e < 256; ++e)
                i = i + this.S[e] + t[e % t.length] & 255,
                r = this.S[e],
                this.S[e] = this.S[i],
                this.S[i] = r;
            this.i = 0,
            this.j = 0
        }
        ,
        t.prototype.next = function() {
            var t;
            return this.i = this.i + 1 & 255,
            this.j = this.j + this.S[this.i] & 255,
            t = this.S[this.i],
            this.S[this.i] = this.S[this.j],
            this.S[this.j] = t,
            this.S[t + this.S[this.i] & 255]
        }
        ,
        t
    }();
    var k, _, z = 256, Z = null;
    if (null == Z) {
        Z = [];
        var G = void (_ = 0);
        if (window.crypto && window.crypto.getRandomValues) {
            var $ = new Uint32Array(256);
            for (window.crypto.getRandomValues($),
            G = 0; G < $.length; ++G)
                Z[_++] = 255 & $[G]
        }
        var Y = function(t) {
            if (this.count = this.count || 0,
            256 <= this.count || z <= _)
                window.removeEventListener ? window.removeEventListener("mousemove", Y, !1) : window.detachEvent && window.detachEvent("onmousemove", Y);
            else
                try {
                    var e = t.x + t.y;
                    Z[_++] = 255 & e,
                    this.count += 1
                } catch (t) {}
        };
        window.addEventListener ? window.addEventListener("mousemove", Y, !1) : window.attachEvent && window.attachEvent("onmousemove", Y)
    }
    function J() {
        if (null == k) {
            for (k = new K; _ < z; ) {
                var t = Math.floor(65536 * Math.random());
                Z[_++] = 255 & t
            }
            for (k.init(Z),
            _ = 0; _ < Z.length; ++_)
                Z[_] = 0;
            _ = 0
        }
        return k.next()
    }
    var X = function() {
        function t() {}
        return t.prototype.nextBytes = function(t) {
            for (var e = 0; e < t.length; ++e)
                t[e] = J()
        }
        ,
        t
    }();
    var Q = function() {
        function t() {
            this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
        }
        return t.prototype.doPublic = function(t) {
            return t.modPowInt(this.e, this.n)
        }
        ,
        t.prototype.doPrivate = function(t) {
            if (null == this.p || null == this.q)
                return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0; )
                e = e.add(this.p);
            return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i)
        }
        ,
        t.prototype.setPublic = function(t, e) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
        }
        ,
        t.prototype.encrypt = function(t) {
            var e = function(t, e) {
                if (e < t.length + 11)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = [], r = t.length - 1; 0 <= r && 0 < e; ) {
                    var n = t.charCodeAt(r--);
                    n < 128 ? i[--e] = n : 127 < n && n < 2048 ? (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128,
                    i[--e] = n >> 6 & 63 | 128,
                    i[--e] = n >> 12 | 224)
                }
                i[--e] = 0;
                for (var s = new X, o = []; 2 < e; ) {
                    for (o[0] = 0; 0 == o[0]; )
                        s.nextBytes(o);
                    i[--e] = o[0]
                }
                return i[--e] = 2,
                i[--e] = 0,
                new O(i)
            }(t, this.n.bitLength() + 7 >> 3);
            if (null == e)
                return null;
            var i = this.doPublic(e);
            if (null == i)
                return null;
            var r = i.toString(16);
            return 0 == (1 & r.length) ? r : "0" + r
        }
        ,
        t.prototype.setPrivate = function(t, e, i) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.setPrivateEx = function(t, e, i, r, n, s, o, h) {
            null != t && null != e && 0 < t.length && 0 < e.length ? (this.n = q(t, 16),
            this.e = parseInt(e, 16),
            this.d = q(i, 16),
            this.p = q(r, 16),
            this.q = q(n, 16),
            this.dmp1 = q(s, 16),
            this.dmq1 = q(o, 16),
            this.coeff = q(h, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.generate = function(t, e) {
            var i = new X
              , r = t >> 1;
            this.e = parseInt(e, 16);
            for (var n = new O(e,16); ; ) {
                for (; this.p = new O(t - r,1,i),
                0 != this.p.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.p.isProbablePrime(10); )
                    ;
                for (; this.q = new O(r,1,i),
                0 != this.q.subtract(O.ONE).gcd(n).compareTo(O.ONE) || !this.q.isProbablePrime(10); )
                    ;
                if (this.p.compareTo(this.q) <= 0) {
                    var s = this.p;
                    this.p = this.q,
                    this.q = s
                }
                var o = this.p.subtract(O.ONE)
                  , h = this.q.subtract(O.ONE)
                  , a = o.multiply(h);
                if (0 == a.gcd(n).compareTo(O.ONE)) {
                    this.n = this.p.multiply(this.q),
                    this.d = n.modInverse(a),
                    this.dmp1 = this.d.mod(o),
                    this.dmq1 = this.d.mod(h),
                    this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        ,
        t.prototype.decrypt = function(t) {
            var e = q(t, 16)
              , i = this.doPrivate(e);
            return null == i ? null : function(t, e) {
                var i = t.toByteArray()
                  , r = 0;
                for (; r < i.length && 0 == i[r]; )
                    ++r;
                if (i.length - r != e - 1 || 2 != i[r])
                    return null;
                ++r;
                for (; 0 != i[r]; )
                    if (++r >= i.length)
                        return null;
                var n = "";
                for (; ++r < i.length; ) {
                    var s = 255 & i[r];
                    s < 128 ? n += String.fromCharCode(s) : 191 < s && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]),
                    ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]),
                    r += 2)
                }
                return n
            }(i, this.n.bitLength() + 7 >> 3)
        }
        ,
        t.prototype.generateAsync = function(t, e, n) {
            var s = new X
              , o = t >> 1;
            this.e = parseInt(e, 16);
            var h = new O(e,16)
              , a = this
              , u = function() {
                var e = function() {
                    if (a.p.compareTo(a.q) <= 0) {
                        var t = a.p;
                        a.p = a.q,
                        a.q = t
                    }
                    var e = a.p.subtract(O.ONE)
                      , i = a.q.subtract(O.ONE)
                      , r = e.multiply(i);
                    0 == r.gcd(h).compareTo(O.ONE) ? (a.n = a.p.multiply(a.q),
                    a.d = h.modInverse(r),
                    a.dmp1 = a.d.mod(e),
                    a.dmq1 = a.d.mod(i),
                    a.coeff = a.q.modInverse(a.p),
                    setTimeout(function() {
                        n()
                    }, 0)) : setTimeout(u, 0)
                }
                  , i = function() {
                    a.q = M(),
                    a.q.fromNumberAsync(o, 1, s, function() {
                        a.q.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(i, 0)
                        })
                    })
                }
                  , r = function() {
                    a.p = M(),
                    a.p.fromNumberAsync(t - o, 1, s, function() {
                        a.p.subtract(O.ONE).gcda(h, function(t) {
                            0 == t.compareTo(O.ONE) && a.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(r, 0)
                        })
                    })
                };
                setTimeout(r, 0)
            };
            setTimeout(u, 0)
        }
        ,
        t.prototype.sign = function(t, e, i) {
            var r = function(t, e) {
                if (e < t.length + 22)
                    return console.error("Message too long for RSA"),
                    null;
                for (var i = e - t.length - 6, r = "", n = 0; n < i; n += 2)
                    r += "ff";
                return q("0001" + r + "00" + t, 16)
            }((W[i] || "") + e(t).toString(), this.n.bitLength() / 4);
            if (null == r)
                return null;
            var n = this.doPrivate(r);
            if (null == n)
                return null;
            var s = n.toString(16);
            return 0 == (1 & s.length) ? s : "0" + s
        }
        ,
        t.prototype.verify = function(t, e, i) {
            var r = q(e, 16)
              , n = this.doPublic(r);
            return null == n ? null : function(t) {
                for (var e in W)
                    if (W.hasOwnProperty(e)) {
                        var i = W[e]
                          , r = i.length;
                        if (t.substr(0, r) == i)
                            return t.substr(r)
                    }
                return t
            }(n.toString(16).replace(/^1f+00/, "")) == i(t).toString()
        }
        ,
        t
    }();
    var W = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    };
    var tt = {};
    tt.lang = {
        extend: function(t, e, i) {
            if (!e || !t)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var r = function() {};
            if (r.prototype = e.prototype,
            t.prototype = new r,
            (t.prototype.constructor = t).superclass = e.prototype,
            e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
            i) {
                var n;
                for (n in i)
                    t.prototype[n] = i[n];
                var s = function() {}
                  , o = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (s = function(t, e) {
                        for (n = 0; n < o.length; n += 1) {
                            var i = o[n]
                              , r = e[i];
                            "function" == typeof r && r != Object.prototype[i] && (t[i] = r)
                        }
                    }
                    )
                } catch (t) {}
                s(t.prototype, i)
            }
        }
    };
    var et = {};
    void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
    et.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e),
            e
        }
        ,
        this.bigIntToMinTwosComplementsHex = function(t) {
            var e = t.toString(16);
            if ("-" != e.substr(0, 1))
                e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
            else {
                var i = e.substr(1).length;
                i % 2 == 1 ? i += 1 : e.match(/^[0-7]/) || (i += 2);
                for (var r = "", n = 0; n < i; n++)
                    r += "f";
                e = new O(r,16).xor(t).add(O.ONE).toString(16).replace(/^-/, "")
            }
            return e
        }
        ,
        this.getPEMStringFromHex = function(t, e) {
            return hextopem(t, e)
        }
        ,
        this.newObject = function(t) {
            var e = et.asn1
              , i = e.DERBoolean
              , r = e.DERInteger
              , n = e.DERBitString
              , s = e.DEROctetString
              , o = e.DERNull
              , h = e.DERObjectIdentifier
              , a = e.DEREnumerated
              , u = e.DERUTF8String
              , c = e.DERNumericString
              , f = e.DERPrintableString
              , l = e.DERTeletexString
              , p = e.DERIA5String
              , g = e.DERUTCTime
              , d = e.DERGeneralizedTime
              , v = e.DERSequence
              , m = e.DERSet
              , y = e.DERTaggedObject
              , b = e.ASN1Util.newObject
              , T = Object.keys(t);
            if (1 != T.length)
                throw "key of param shall be only one.";
            var S = T[0];
            if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + S + ":"))
                throw "undefined key: " + S;
            if ("bool" == S)
                return new i(t[S]);
            if ("int" == S)
                return new r(t[S]);
            if ("bitstr" == S)
                return new n(t[S]);
            if ("octstr" == S)
                return new s(t[S]);
            if ("null" == S)
                return new o(t[S]);
            if ("oid" == S)
                return new h(t[S]);
            if ("enum" == S)
                return new a(t[S]);
            if ("utf8str" == S)
                return new u(t[S]);
            if ("numstr" == S)
                return new c(t[S]);
            if ("prnstr" == S)
                return new f(t[S]);
            if ("telstr" == S)
                return new l(t[S]);
            if ("ia5str" == S)
                return new p(t[S]);
            if ("utctime" == S)
                return new g(t[S]);
            if ("gentime" == S)
                return new d(t[S]);
            if ("seq" == S) {
                for (var E = t[S], w = [], D = 0; D < E.length; D++) {
                    var x = b(E[D]);
                    w.push(x)
                }
                return new v({
                    array: w
                })
            }
            if ("set" == S) {
                for (E = t[S],
                w = [],
                D = 0; D < E.length; D++) {
                    x = b(E[D]);
                    w.push(x)
                }
                return new m({
                    array: w
                })
            }
            if ("tag" == S) {
                var R = t[S];
                if ("[object Array]" === Object.prototype.toString.call(R) && 3 == R.length) {
                    var B = b(R[2]);
                    return new y({
                        tag: R[0],
                        explicit: R[1],
                        obj: B
                    })
                }
                var A = {};
                if (void 0 !== R.explicit && (A.explicit = R.explicit),
                void 0 !== R.tag && (A.tag = R.tag),
                void 0 === R.obj)
                    throw "obj shall be specified for 'tag'.";
                return A.obj = b(R.obj),
                new y(A)
            }
        }
        ,
        this.jsonToASN1HEX = function(t) {
            return this.newObject(t).getEncodedHex()
        }
    }
    ,
    et.asn1.ASN1Util.oidHexToInt = function(t) {
        for (var e = "", i = parseInt(t.substr(0, 2), 16), r = (e = Math.floor(i / 40) + "." + i % 40,
        ""), n = 2; n < t.length; n += 2) {
            var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
            if (r += s.substr(1, 7),
            "0" == s.substr(0, 1))
                e = e + "." + new O(r,2).toString(10),
                r = ""
        }
        return e
    }
    ,
    et.asn1.ASN1Util.oidIntToHex = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , e = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        if (!t.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t;
        var i = ""
          , r = t.split(".")
          , n = 40 * parseInt(r[0]) + parseInt(r[1]);
        i += h(n),
        r.splice(0, 2);
        for (var s = 0; s < r.length; s++)
            i += e(r[s]);
        return i
    }
    ,
    et.asn1.ASN1Object = function() {
        this.getLengthHexFromValue = function() {
            if (void 0 === this.hV || null == this.hV)
                throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
                throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
            var t = this.hV.length / 2
              , e = t.toString(16);
            if (e.length % 2 == 1 && (e = "0" + e),
            t < 128)
                return e;
            var i = e.length / 2;
            if (15 < i)
                throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
            return (128 + i).toString(16) + e
        }
        ,
        this.getEncodedHex = function() {
            return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
            this.hL = this.getLengthHexFromValue(),
            this.hTLV = this.hT + this.hL + this.hV,
            this.isModified = !1),
            this.hTLV
        }
        ,
        this.getValueHex = function() {
            return this.getEncodedHex(),
            this.hV
        }
        ,
        this.getFreshValueHex = function() {
            return ""
        }
    }
    ,
    et.asn1.DERAbstractString = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(this.s)
        }
        ,
        this.setStringHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
    et.asn1.DERAbstractTime = function(t) {
        et.asn1.DERAbstractTime.superclass.constructor.call(this),
        this.localDateToUTC = function(t) {
            return utc = t.getTime() + 6e4 * t.getTimezoneOffset(),
            new Date(utc)
        }
        ,
        this.formatDate = function(t, e, i) {
            var r = this.zeroPadding
              , n = this.localDateToUTC(t)
              , s = String(n.getFullYear());
            "utc" == e && (s = s.substr(2, 2));
            var o = s + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
            if (!0 === i) {
                var h = n.getMilliseconds();
                if (0 != h) {
                    var a = r(String(h), 3);
                    o = o + "." + (a = a.replace(/[0]+$/, ""))
                }
            }
            return o + "Z"
        }
        ,
        this.zeroPadding = function(t, e) {
            return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
        }
        ,
        this.getString = function() {
            return this.s
        }
        ,
        this.setString = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = t,
            this.hV = stohex(t)
        }
        ,
        this.setByDateValue = function(t, e, i, r, n, s) {
            var o = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
            this.setByDate(o)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
    et.asn1.DERAbstractStructured = function(t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
        this.setByASN1ObjectArray = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array = t
        }
        ,
        this.appendASN1Object = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.asn1Array.push(t)
        }
        ,
        this.asn1Array = new Array,
        void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
    et.asn1.DERBoolean = function() {
        et.asn1.DERBoolean.superclass.constructor.call(this),
        this.hT = "01",
        this.hTLV = "0101ff"
    }
    ,
    tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
    et.asn1.DERInteger = function(t) {
        et.asn1.DERInteger.superclass.constructor.call(this),
        this.hT = "02",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
    et.asn1.DERBitString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = "00" + e.getEncodedHex()
        }
        et.asn1.DERBitString.superclass.constructor.call(this),
        this.hT = "03",
        this.setHexValueIncludingUnusedBits = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = t
        }
        ,
        this.setUnusedBitsAndHexValue = function(t, e) {
            if (t < 0 || 7 < t)
                throw "unused bits shall be from 0 to 7: u = " + t;
            var i = "0" + t;
            this.hTLV = null,
            this.isModified = !0,
            this.hV = i + e
        }
        ,
        this.setByBinaryString = function(t) {
            var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
            8 == e && (e = 0);
            for (var i = 0; i <= e; i++)
                t += "0";
            var r = "";
            for (i = 0; i < t.length - 1; i += 8) {
                var n = t.substr(i, 8)
                  , s = parseInt(n, 2).toString(16);
                1 == s.length && (s = "0" + s),
                r += s
            }
            this.hTLV = null,
            this.isModified = !0,
            this.hV = "0" + e + r
        }
        ,
        this.setByBooleanArray = function(t) {
            for (var e = "", i = 0; i < t.length; i++)
                1 == t[i] ? e += "1" : e += "0";
            this.setByBinaryString(e)
        }
        ,
        this.newFalseArray = function(t) {
            for (var e = new Array(t), i = 0; i < t; i++)
                e[i] = !1;
            return e
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
    }
    ,
    tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
    et.asn1.DEROctetString = function(t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = e.getEncodedHex()
        }
        et.asn1.DEROctetString.superclass.constructor.call(this, t),
        this.hT = "04"
    }
    ,
    tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
    et.asn1.DERNull = function() {
        et.asn1.DERNull.superclass.constructor.call(this),
        this.hT = "05",
        this.hTLV = "0500"
    }
    ,
    tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
    et.asn1.DERObjectIdentifier = function(t) {
        var h = function(t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
            e
        }
          , s = function(t) {
            var e = ""
              , i = new O(t,10).toString(2)
              , r = 7 - i.length % 7;
            7 == r && (r = 0);
            for (var n = "", s = 0; s < r; s++)
                n += "0";
            i = n + i;
            for (s = 0; s < i.length - 1; s += 7) {
                var o = i.substr(s, 7);
                s != i.length - 7 && (o = "1" + o),
                e += h(parseInt(o, 2))
            }
            return e
        };
        et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
        this.hT = "06",
        this.setValueHex = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = t
        }
        ,
        this.setValueOidString = function(t) {
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var e = ""
              , i = t.split(".")
              , r = 40 * parseInt(i[0]) + parseInt(i[1]);
            e += h(r),
            i.splice(0, 2);
            for (var n = 0; n < i.length; n++)
                e += s(i[n]);
            this.hTLV = null,
            this.isModified = !0,
            this.s = null,
            this.hV = e
        }
        ,
        this.setValueName = function(t) {
            var e = et.asn1.x509.OID.name2oid(t);
            if ("" === e)
                throw "DERObjectIdentifier oidName undefined: " + t;
            this.setValueOidString(e)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
    }
    ,
    tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
    et.asn1.DEREnumerated = function(t) {
        et.asn1.DEREnumerated.superclass.constructor.call(this),
        this.hT = "0a",
        this.setByBigInteger = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
        }
        ,
        this.setByInteger = function(t) {
            var e = new O(String(t),10);
            this.setByBigInteger(e)
        }
        ,
        this.setValueHex = function(t) {
            this.hV = t
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
    et.asn1.DERUTF8String = function(t) {
        et.asn1.DERUTF8String.superclass.constructor.call(this, t),
        this.hT = "0c"
    }
    ,
    tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
    et.asn1.DERNumericString = function(t) {
        et.asn1.DERNumericString.superclass.constructor.call(this, t),
        this.hT = "12"
    }
    ,
    tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
    et.asn1.DERPrintableString = function(t) {
        et.asn1.DERPrintableString.superclass.constructor.call(this, t),
        this.hT = "13"
    }
    ,
    tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
    et.asn1.DERTeletexString = function(t) {
        et.asn1.DERTeletexString.superclass.constructor.call(this, t),
        this.hT = "14"
    }
    ,
    tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
    et.asn1.DERIA5String = function(t) {
        et.asn1.DERIA5String.superclass.constructor.call(this, t),
        this.hT = "16"
    }
    ,
    tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
    et.asn1.DERUTCTime = function(t) {
        et.asn1.DERUTCTime.superclass.constructor.call(this, t),
        this.hT = "17",
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "utc"),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    }
    ,
    tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
    et.asn1.DERGeneralizedTime = function(t) {
        et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
        this.hT = "18",
        this.withMillis = !1,
        this.setByDate = function(t) {
            this.hTLV = null,
            this.isModified = !0,
            this.date = t,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)
        }
        ,
        this.getFreshValueHex = function() {
            return void 0 === this.date && void 0 === this.s && (this.date = new Date,
            this.s = this.formatDate(this.date, "gen", this.withMillis),
            this.hV = stohex(this.s)),
            this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
        !0 === t.millis && (this.withMillis = !0))
    }
    ,
    tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
    et.asn1.DERSequence = function(t) {
        et.asn1.DERSequence.superclass.constructor.call(this, t),
        this.hT = "30",
        this.getFreshValueHex = function() {
            for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                t += this.asn1Array[e].getEncodedHex()
            }
            return this.hV = t,
            this.hV
        }
    }
    ,
    tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
    et.asn1.DERSet = function(t) {
        et.asn1.DERSet.superclass.constructor.call(this, t),
        this.hT = "31",
        this.sortFlag = !0,
        this.getFreshValueHex = function() {
            for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                var i = this.asn1Array[e];
                t.push(i.getEncodedHex())
            }
            return 1 == this.sortFlag && t.sort(),
            this.hV = t.join(""),
            this.hV
        }
        ,
        void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
    }
    ,
    tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
    et.asn1.DERTaggedObject = function(t) {
        et.asn1.DERTaggedObject.superclass.constructor.call(this),
        this.hT = "a0",
        this.hV = "",
        this.isExplicit = !0,
        this.asn1Object = null,
        this.setASN1Object = function(t, e, i) {
            this.hT = e,
            this.isExplicit = t,
            this.asn1Object = i,
            this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
            this.hTLV = null,
            this.isModified = !0) : (this.hV = null,
            this.hTLV = i.getEncodedHex(),
            this.hTLV = this.hTLV.replace(/^../, e),
            this.isModified = !1)
        }
        ,
        this.getFreshValueHex = function() {
            return this.hV
        }
        ,
        void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj && (this.asn1Object = t.obj,
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    }
    ,
    tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
    var it = function(i) {
        function r(t) {
            var e = i.call(this) || this;
            return t && ("string" == typeof t ? e.parseKey(t) : (r.hasPrivateKeyProperty(t) || r.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)),
            e
        }
        return function(t, e) {
            function i() {
                this.constructor = t
            }
            p(t, e),
            t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
            new i)
        }(r, i),
        r.prototype.parseKey = function(t) {
            try {
                var e = 0
                  , i = 0
                  , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? d(t) : v.unarmor(t)
                  , n = x.decode(r);
                if (3 === n.sub.length && (n = n.sub[2].sub[0]),
                9 === n.sub.length) {
                    e = n.sub[1].getHexStringValue(),
                    this.n = q(e, 16),
                    i = n.sub[2].getHexStringValue(),
                    this.e = parseInt(i, 16);
                    var s = n.sub[3].getHexStringValue();
                    this.d = q(s, 16);
                    var o = n.sub[4].getHexStringValue();
                    this.p = q(o, 16);
                    var h = n.sub[5].getHexStringValue();
                    this.q = q(h, 16);
                    var a = n.sub[6].getHexStringValue();
                    this.dmp1 = q(a, 16);
                    var u = n.sub[7].getHexStringValue();
                    this.dmq1 = q(u, 16);
                    var c = n.sub[8].getHexStringValue();
                    this.coeff = q(c, 16)
                } else {
                    if (2 !== n.sub.length)
                        return !1;
                    var f = n.sub[1].sub[0];
                    e = f.sub[0].getHexStringValue(),
                    this.n = q(e, 16),
                    i = f.sub[1].getHexStringValue(),
                    this.e = parseInt(i, 16)
                }
                return !0
            } catch (t) {
                return !1
            }
        }
        ,
        r.prototype.getPrivateBaseKey = function() {
            var t = {
                array: [new et.asn1.DERInteger({
                    int: 0
                }), new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                }), new et.asn1.DERInteger({
                    bigint: this.d
                }), new et.asn1.DERInteger({
                    bigint: this.p
                }), new et.asn1.DERInteger({
                    bigint: this.q
                }), new et.asn1.DERInteger({
                    bigint: this.dmp1
                }), new et.asn1.DERInteger({
                    bigint: this.dmq1
                }), new et.asn1.DERInteger({
                    bigint: this.coeff
                })]
            };
            return new et.asn1.DERSequence(t).getEncodedHex()
        }
        ,
        r.prototype.getPrivateBaseKeyB64 = function() {
            return c(this.getPrivateBaseKey())
        }
        ,
        r.prototype.getPublicBaseKey = function() {
            var t = new et.asn1.DERSequence({
                array: [new et.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new et.asn1.DERNull]
            })
              , e = new et.asn1.DERSequence({
                array: [new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                })]
            })
              , i = new et.asn1.DERBitString({
                hex: "00" + e.getEncodedHex()
            });
            return new et.asn1.DERSequence({
                array: [t, i]
            }).getEncodedHex()
        }
        ,
        r.prototype.getPublicBaseKeyB64 = function() {
            return c(this.getPublicBaseKey())
        }
        ,
        r.wordwrap = function(t, e) {
            if (!t)
                return t;
            var i = "(.{1," + (e = e || 64) + "})( +|$\n?)|(.{1," + e + "})";
            return t.match(RegExp(i, "g")).join("\n")
        }
        ,
        r.prototype.getPrivateKey = function() {
            var t = "-----BEGIN RSA PRIVATE KEY-----\n";
            return t += r.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
            t += "-----END RSA PRIVATE KEY-----"
        }
        ,
        r.prototype.getPublicKey = function() {
            var t = "-----BEGIN PUBLIC KEY-----\n";
            return t += r.wordwrap(this.getPublicBaseKeyB64()) + "\n",
            t += "-----END PUBLIC KEY-----"
        }
        ,
        r.hasPublicKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
        }
        ,
        r.hasPrivateKeyProperty = function(t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
        }
        ,
        r.prototype.parsePropertiesFrom = function(t) {
            this.n = t.n,
            this.e = t.e,
            t.hasOwnProperty("d") && (this.d = t.d,
            this.p = t.p,
            this.q = t.q,
            this.dmp1 = t.dmp1,
            this.dmq1 = t.dmq1,
            this.coeff = t.coeff)
        }
        ,
        r
    }(Q)
      , rt = function() {
        function t(t) {
            t = t || {},
            this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
            this.default_public_exponent = t.default_public_exponent || "010001",
            this.log = t.log || !1,
            this.key = null
        }
        return t.prototype.setKey = function(t) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
            this.key = new it(t)
        }
        ,
        t.prototype.setPrivateKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.setPublicKey = function(t) {
            this.setKey(t)
        }
        ,
        t.prototype.decrypt = function(t) {
            try {
                return this.getKey().decrypt(f(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.encrypt = function(t) {
            try {
                return c(this.getKey().encrypt(t))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.sign = function(t, e, i) {
            try {
                return c(this.getKey().sign(t, e, i))
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.verify = function(t, e, i) {
            try {
                return this.getKey().verify(t, f(e), i)
            } catch (t) {
                return !1
            }
        }
        ,
        t.prototype.getKey = function(t) {
            if (!this.key) {
                if (this.key = new it,
                t && "[object Function]" === {}.toString.call(t))
                    return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
        }
        ,
        t.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
        }
        ,
        t.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
        }
        ,
        t.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
        }
        ,
        t.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
        }
        ,
        t.version = "3.0.0-rc.1",
        t
    }();
    window.JSEncrypt = rt,
    t.JSEncrypt = rt,
    t.default = rt,
    Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
