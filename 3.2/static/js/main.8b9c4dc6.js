/*! For license information please see main.8b9c4dc6.js.LICENSE.txt */ ! function() {
    var e = {
            6331: function(e, t, n) {
                var r = n(861).default,
                    a = n(1589).default,
                    o = n(7424).default,
                    i = n(4704).default,
                    u = n(6690).default,
                    l = n(9728).default,
                    s = n(7237),
                    c = n(6475),
                    f = c.EEXIST,
                    d = c.ENOENT,
                    p = c.ENOTDIR,
                    h = c.ENOTEMPTY;
                e.exports = function() {
                    "use strict";

                    function e() {
                        u(this, e)
                    }
                    return l(e, [{
                        key: "_makeRoot",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Map;
                            return e.set(0, {
                                mode: 511,
                                type: "dir",
                                size: 0,
                                ino: 0,
                                mtimeMs: Date.now()
                            }), e
                        }
                    }, {
                        key: "activate",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                            this._root = null === e ? new Map([
                                ["/", this._makeRoot()]
                            ]) : "string" === typeof e ? new Map([
                                ["/", this._makeRoot(this.parse(e))]
                            ]) : e
                        }
                    }, {
                        key: "activated",
                        get: function() {
                            return !!this._root
                        }
                    }, {
                        key: "deactivate",
                        value: function() {
                            this._root = void 0
                        }
                    }, {
                        key: "size",
                        value: function() {
                            return this._countInodes(this._root.get("/")) - 1
                        }
                    }, {
                        key: "_countInodes",
                        value: function(e) {
                            var t, n = 1,
                                r = i(e);
                            try {
                                for (r.s(); !(t = r.n()).done;) {
                                    var a = o(t.value, 2),
                                        u = a[0],
                                        l = a[1];
                                    0 !== u && (n += this._countInodes(l))
                                }
                            } catch (s) {
                                r.e(s)
                            } finally {
                                r.f()
                            }
                            return n
                        }
                    }, {
                        key: "autoinc",
                        value: function() {
                            return this._maxInode(this._root.get("/")) + 1
                        }
                    }, {
                        key: "_maxInode",
                        value: function(e) {
                            var t, n = e.get(0).ino,
                                r = i(e);
                            try {
                                for (r.s(); !(t = r.n()).done;) {
                                    var a = o(t.value, 2),
                                        u = a[0],
                                        l = a[1];
                                    0 !== u && (n = Math.max(n, this._maxInode(l)))
                                }
                            } catch (s) {
                                r.e(s)
                            } finally {
                                r.f()
                            }
                            return n
                        }
                    }, {
                        key: "print",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._root.get("/"),
                                t = "",
                                n = function e(n, r) {
                                    var a, u = i(n);
                                    try {
                                        for (u.s(); !(a = u.n()).done;) {
                                            var l = o(a.value, 2),
                                                s = l[0],
                                                c = l[1];
                                            if (0 !== s) {
                                                var f = c.get(0),
                                                    d = f.mode.toString(8);
                                                t += "".concat("\t".repeat(r)).concat(s, "\t").concat(d), "file" === f.type ? t += "\t".concat(f.size, "\t").concat(f.mtimeMs, "\n") : (t += "\n", e(c, r + 1))
                                            }
                                        }
                                    } catch (p) {
                                        u.e(p)
                                    } finally {
                                        u.f()
                                    }
                                };
                            return n(e, 0), t
                        }
                    }, {
                        key: "parse",
                        value: function(e) {
                            var t = 0;

                            function n(e) {
                                var n = ++t,
                                    r = 1 === e.length ? "dir" : "file",
                                    a = o(e, 3),
                                    i = a[0],
                                    u = a[1],
                                    l = a[2];
                                return i = parseInt(i, 8), u = u ? parseInt(u) : 0, l = l ? parseInt(l) : Date.now(), new Map([
                                    [0, {
                                        mode: i,
                                        type: r,
                                        size: u,
                                        mtimeMs: l,
                                        ino: n
                                    }]
                                ])
                            }
                            var r, u = e.trim().split("\n"),
                                l = this._makeRoot(),
                                s = [{
                                    indent: -1,
                                    node: l
                                }, {
                                    indent: 0,
                                    node: null
                                }],
                                c = i(u);
                            try {
                                for (c.s(); !(r = c.n()).done;) {
                                    var f = r.value,
                                        d = f.match(/^\t*/)[0].length,
                                        p = (f = f.slice(d)).split("\t"),
                                        h = a(p),
                                        v = h[0],
                                        m = n(h.slice(1));
                                    if (d <= s[s.length - 1].indent)
                                        for (; d <= s[s.length - 1].indent;) s.pop();
                                    s.push({
                                        indent: d,
                                        node: m
                                    }), s[s.length - 2].node.set(v, m)
                                }
                            } catch (b) {
                                c.e(b)
                            } finally {
                                c.f()
                            }
                            return l
                        }
                    }, {
                        key: "_lookup",
                        value: function(e) {
                            for (var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = this._root, r = "/", a = s.split(e), o = 0; o < a.length; ++o) {
                                var i = a[o];
                                if (!(n = n.get(i))) throw new d(e);
                                if (t || o < a.length - 1) {
                                    var u = n.get(0);
                                    if ("symlink" === u.type) {
                                        var l = s.resolve(r, u.target);
                                        n = this._lookup(l)
                                    }
                                    r = r ? s.join(r, i) : i
                                }
                            }
                            return n
                        }
                    }, {
                        key: "mkdir",
                        value: function(e, t) {
                            var n = t.mode;
                            if ("/" === e) throw new f;
                            var r = this._lookup(s.dirname(e)),
                                a = s.basename(e);
                            if (r.has(a)) throw new f;
                            var o = new Map,
                                i = {
                                    mode: n,
                                    type: "dir",
                                    size: 0,
                                    mtimeMs: Date.now(),
                                    ino: this.autoinc()
                                };
                            o.set(0, i), r.set(a, o)
                        }
                    }, {
                        key: "rmdir",
                        value: function(e) {
                            var t = this._lookup(e);
                            if ("dir" !== t.get(0).type) throw new p;
                            if (t.size > 1) throw new h;
                            var n = this._lookup(s.dirname(e)),
                                r = s.basename(e);
                            n.delete(r)
                        }
                    }, {
                        key: "readdir",
                        value: function(e) {
                            var t = this._lookup(e);
                            if ("dir" !== t.get(0).type) throw new p;
                            return r(t.keys()).filter((function(e) {
                                return "string" === typeof e
                            }))
                        }
                    }, {
                        key: "writeStat",
                        value: function(e, t, n) {
                            var r, a = n.mode;
                            try {
                                var o = this.stat(e);
                                null == a && (a = o.mode), r = o.ino
                            } catch (f) {}
                            null == a && (a = 438), null == r && (r = this.autoinc());
                            var i = this._lookup(s.dirname(e)),
                                u = s.basename(e),
                                l = {
                                    mode: a,
                                    type: "file",
                                    size: t,
                                    mtimeMs: Date.now(),
                                    ino: r
                                },
                                c = new Map;
                            return c.set(0, l), i.set(u, c), l
                        }
                    }, {
                        key: "unlink",
                        value: function(e) {
                            var t = this._lookup(s.dirname(e)),
                                n = s.basename(e);
                            t.delete(n)
                        }
                    }, {
                        key: "rename",
                        value: function(e, t) {
                            var n = s.basename(t),
                                r = this._lookup(e);
                            this._lookup(s.dirname(t)).set(n, r), this.unlink(e)
                        }
                    }, {
                        key: "stat",
                        value: function(e) {
                            return this._lookup(e).get(0)
                        }
                    }, {
                        key: "lstat",
                        value: function(e) {
                            return this._lookup(e, !1).get(0)
                        }
                    }, {
                        key: "readlink",
                        value: function(e) {
                            return this._lookup(e, !1).get(0).target
                        }
                    }, {
                        key: "symlink",
                        value: function(e, t) {
                            var n, r;
                            try {
                                var a = this.stat(t);
                                null === r && (r = a.mode), n = a.ino
                            } catch (c) {}
                            null == r && (r = 40960), null == n && (n = this.autoinc());
                            var o = this._lookup(s.dirname(t)),
                                i = s.basename(t),
                                u = {
                                    mode: r,
                                    type: "symlink",
                                    target: e,
                                    size: 0,
                                    mtimeMs: Date.now(),
                                    ino: n
                                },
                                l = new Map;
                            return l.set(0, u), o.set(i, l), u
                        }
                    }, {
                        key: "_du",
                        value: function(e) {
                            var t, n = 0,
                                r = i(e.entries());
                            try {
                                for (r.s(); !(t = r.n()).done;) {
                                    var a = o(t.value, 2),
                                        u = a[0],
                                        l = a[1];
                                    n += 0 === u ? l.size : this._du(l)
                                }
                            } catch (s) {
                                r.e(s)
                            } finally {
                                r.f()
                            }
                            return n
                        }
                    }, {
                        key: "du",
                        value: function(e) {
                            var t = this._lookup(e);
                            return this._du(t)
                        }
                    }]), e
                }()
            },
            9608: function(e, t, n) {
                var r = n(4704).default,
                    a = n(7061).default,
                    o = n(7156).default,
                    i = n(6690).default,
                    u = n(9728).default,
                    l = n(9575),
                    s = l.encode,
                    c = l.decode,
                    f = n(4019),
                    d = n(6331),
                    p = n(6475),
                    h = p.ENOENT,
                    v = p.ENOTEMPTY,
                    m = p.ETIMEDOUT,
                    b = n(9938),
                    y = n(7044),
                    g = n(3985),
                    w = n(7890),
                    x = n(7237);
                e.exports = function() {
                    "use strict";

                    function e() {
                        var t = this;
                        i(this, e), this.saveSuperblock = f((function() {
                            t.flush()
                        }), 500)
                    }
                    return u(e, [{
                        key: "init",
                        value: function() {
                            var e = o(a().mark((function e(t) {
                                var n, r, o, i, u, l, s, c, f, p, h, v, m, x, k = arguments;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            n = k.length > 1 && void 0 !== k[1] ? k[1] : {}, r = n.wipe, o = n.url, i = n.urlauto, u = n.fileDbName, l = void 0 === u ? t : u, s = n.db, c = void 0 === s ? null : s, f = n.fileStoreName, p = void 0 === f ? t + "_files" : f, h = n.lockDbName, v = void 0 === h ? t + "_lock" : h, m = n.lockStoreName, x = void 0 === m ? t + "_lock" : m, this._name = t, this._idb = c || new b(l, p), this._mutex = navigator.locks ? new w(t) : new g(v, x), this._cache = new d(t), this._opts = {
                                                wipe: r,
                                                url: o
                                            }, this._needsWipe = !!r, o && (this._http = new y(o), this._urlauto = !!i);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "activate",
                        value: function() {
                            var e = o(a().mark((function e() {
                                var t, n;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!this._cache.activated) {
                                                e.next = 2;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 2:
                                            if (!this._needsWipe) {
                                                e.next = 8;
                                                break
                                            }
                                            return this._needsWipe = !1, e.next = 6, this._idb.wipe();
                                        case 6:
                                            return e.next = 8, this._mutex.release({
                                                force: !0
                                            });
                                        case 8:
                                            return e.next = 10, this._mutex.has();
                                        case 10:
                                            if (e.sent) {
                                                e.next = 13;
                                                break
                                            }
                                            return e.next = 13, this._mutex.wait();
                                        case 13:
                                            return e.next = 15, this._idb.loadSuperblock();
                                        case 15:
                                            if (!(t = e.sent)) {
                                                e.next = 20;
                                                break
                                            }
                                            this._cache.activate(t), e.next = 30;
                                            break;
                                        case 20:
                                            if (!this._http) {
                                                e.next = 29;
                                                break
                                            }
                                            return e.next = 23, this._http.loadSuperblock();
                                        case 23:
                                            return n = e.sent, this._cache.activate(n), e.next = 27, this._saveSuperblock();
                                        case 27:
                                            e.next = 30;
                                            break;
                                        case 29:
                                            this._cache.activate();
                                        case 30:
                                            return e.next = 32, this._mutex.has();
                                        case 32:
                                            if (!e.sent) {
                                                e.next = 36;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 36:
                                            throw new m;
                                        case 37:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "deactivate",
                        value: function() {
                            var e = o(a().mark((function e() {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._mutex.has();
                                        case 2:
                                            if (!e.sent) {
                                                e.next = 5;
                                                break
                                            }
                                            return e.next = 5, this._saveSuperblock();
                                        case 5:
                                            return this._cache.deactivate(), e.prev = 6, e.next = 9, this._mutex.release();
                                        case 9:
                                            e.next = 14;
                                            break;
                                        case 11:
                                            e.prev = 11, e.t0 = e.catch(6), console.log(e.t0);
                                        case 14:
                                            return e.next = 16, this._idb.close();
                                        case 16:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this, [
                                    [6, 11]
                                ])
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_saveSuperblock",
                        value: function() {
                            var e = o(a().mark((function e() {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!this._cache.activated) {
                                                e.next = 4;
                                                break
                                            }
                                            return this._lastSavedAt = Date.now(), e.next = 4, this._idb.saveSuperblock(this._cache._root);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_writeStat",
                        value: function(e, t, n) {
                            var a, o = x.split(x.dirname(e)),
                                i = o.shift(),
                                u = r(o);
                            try {
                                for (u.s(); !(a = u.n()).done;) {
                                    var l = a.value;
                                    i = x.join(i, l);
                                    try {
                                        this._cache.mkdir(i, {
                                            mode: 511
                                        })
                                    } catch (s) {}
                                }
                            } catch (c) {
                                u.e(c)
                            } finally {
                                u.f()
                            }
                            return this._cache.writeStat(e, t, n)
                        }
                    }, {
                        key: "readFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                var r, o, i, u;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!(r = n.encoding) || "utf8" === r) {
                                                e.next = 3;
                                                break
                                            }
                                            throw new Error('Only "utf8" encoding is supported in readFile');
                                        case 3:
                                            return o = null, i = null, e.prev = 4, i = this._cache.stat(t), e.next = 8, this._idb.readFile(i.ino);
                                        case 8:
                                            o = e.sent, e.next = 15;
                                            break;
                                        case 11:
                                            if (e.prev = 11, e.t0 = e.catch(4), this._urlauto) {
                                                e.next = 15;
                                                break
                                            }
                                            throw e.t0;
                                        case 15:
                                            if (o || !this._http) {
                                                e.next = 21;
                                                break
                                            }
                                            for (u = this._cache.lstat(t);
                                                "symlink" === u.type;) t = x.resolve(x.dirname(t), u.target), u = this._cache.lstat(t);
                                            return e.next = 20, this._http.readFile(t);
                                        case 20:
                                            o = e.sent;
                                        case 21:
                                            if (!o) {
                                                e.next = 28;
                                                break
                                            }
                                            if (i && i.size == o.byteLength) {
                                                e.next = 27;
                                                break
                                            }
                                            return e.next = 25, this._writeStat(t, o.byteLength, {
                                                mode: i ? i.mode : 438
                                            });
                                        case 25:
                                            i = e.sent, this.saveSuperblock();
                                        case 27:
                                            "utf8" === r ? o = c(o) : o.toString = function() {
                                                return c(o)
                                            };
                                        case 28:
                                            if (i) {
                                                e.next = 30;
                                                break
                                            }
                                            throw new h(t);
                                        case 30:
                                            return e.abrupt("return", o);
                                        case 31:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this, [
                                    [4, 11]
                                ])
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "writeFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n, r) {
                                var o, i, u, l;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (o = r.mode, i = r.encoding, u = void 0 === i ? "utf8" : i, "string" !== typeof n) {
                                                e.next = 5;
                                                break
                                            }
                                            if ("utf8" === u) {
                                                e.next = 4;
                                                break
                                            }
                                            throw new Error('Only "utf8" encoding is supported in writeFile');
                                        case 4:
                                            n = s(n);
                                        case 5:
                                            return e.next = 7, this._cache.writeStat(t, n.byteLength, {
                                                mode: o
                                            });
                                        case 7:
                                            return l = e.sent, e.next = 10, this._idb.writeFile(l.ino, n);
                                        case 10:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n, r) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "unlink",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                var r;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (r = this._cache.lstat(t), this._cache.unlink(t), "symlink" === r.type) {
                                                e.next = 5;
                                                break
                                            }
                                            return e.next = 5, this._idb.unlink(r.ino);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "readdir",
                        value: function(e, t) {
                            return this._cache.readdir(e)
                        }
                    }, {
                        key: "mkdir",
                        value: function(e, t) {
                            var n = t.mode,
                                r = void 0 === n ? 511 : n;
                            this._cache.mkdir(e, {
                                mode: r
                            })
                        }
                    }, {
                        key: "rmdir",
                        value: function(e, t) {
                            if ("/" === e) throw new v;
                            this._cache.rmdir(e)
                        }
                    }, {
                        key: "rename",
                        value: function(e, t) {
                            this._cache.rename(e, t)
                        }
                    }, {
                        key: "stat",
                        value: function(e, t) {
                            return this._cache.stat(e)
                        }
                    }, {
                        key: "lstat",
                        value: function(e, t) {
                            return this._cache.lstat(e)
                        }
                    }, {
                        key: "readlink",
                        value: function(e, t) {
                            return this._cache.readlink(e)
                        }
                    }, {
                        key: "symlink",
                        value: function(e, t) {
                            this._cache.symlink(e, t)
                        }
                    }, {
                        key: "backFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                var r;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._http.sizeFile(t);
                                        case 2:
                                            return r = e.sent, e.next = 5, this._writeStat(t, r, n);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "du",
                        value: function(e) {
                            return this._cache.du(e)
                        }
                    }, {
                        key: "flush",
                        value: function() {
                            return this._saveSuperblock()
                        }
                    }]), e
                }()
            },
            7044: function(e, t, n) {
                var r = n(7061).default,
                    a = n(7156).default,
                    o = n(6690).default,
                    i = n(9728).default;
                e.exports = function() {
                    "use strict";

                    function e(t) {
                        o(this, e), this._url = t
                    }
                    return i(e, [{
                        key: "loadSuperblock",
                        value: function() {
                            return fetch(this._url + "/.superblock.txt").then((function(e) {
                                return e.ok ? e.text() : null
                            }))
                        }
                    }, {
                        key: "readFile",
                        value: function() {
                            var e = a(r().mark((function e(t) {
                                var n;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, fetch(this._url + t);
                                        case 2:
                                            if (200 !== (n = e.sent).status) {
                                                e.next = 7;
                                                break
                                            }
                                            return e.abrupt("return", n.arrayBuffer());
                                        case 7:
                                            throw new Error("ENOENT");
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "sizeFile",
                        value: function() {
                            var e = a(r().mark((function e(t) {
                                var n;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, fetch(this._url + t, {
                                                method: "HEAD"
                                            });
                                        case 2:
                                            if (200 !== (n = e.sent).status) {
                                                e.next = 7;
                                                break
                                            }
                                            return e.abrupt("return", n.headers.get("content-length"));
                                        case 7:
                                            throw new Error("ENOENT");
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }]), e
                }()
            },
            9938: function(e, t, n) {
                var r = n(6690).default,
                    a = n(9728).default,
                    o = n(4751);
                e.exports = function() {
                    "use strict";

                    function e(t, n) {
                        r(this, e), this._database = t, this._storename = n, this._store = new o.Store(this._database, this._storename)
                    }
                    return a(e, [{
                        key: "saveSuperblock",
                        value: function(e) {
                            return o.set("!root", e, this._store)
                        }
                    }, {
                        key: "loadSuperblock",
                        value: function() {
                            return o.get("!root", this._store)
                        }
                    }, {
                        key: "readFile",
                        value: function(e) {
                            return o.get(e, this._store)
                        }
                    }, {
                        key: "writeFile",
                        value: function(e, t) {
                            return o.set(e, t, this._store)
                        }
                    }, {
                        key: "unlink",
                        value: function(e) {
                            return o.del(e, this._store)
                        }
                    }, {
                        key: "wipe",
                        value: function() {
                            return o.clear(this._store)
                        }
                    }, {
                        key: "close",
                        value: function() {
                            return o.close(this._store)
                        }
                    }]), e
                }()
            },
            3985: function(e, t, n) {
                var r = n(7061).default,
                    a = n(7156).default,
                    o = n(6690).default,
                    i = n(9728).default,
                    u = n(4751),
                    l = function(e) {
                        return new Promise((function(t) {
                            return setTimeout(t, e)
                        }))
                    };
                e.exports = function() {
                    "use strict";

                    function e(t, n) {
                        o(this, e), this._id = Math.random(), this._database = t, this._storename = n, this._store = new u.Store(this._database, this._storename), this._lock = null
                    }
                    return i(e, [{
                        key: "has",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o, i = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (t = i.length > 0 && void 0 !== i[0] ? i[0] : {}, n = t.margin, a = void 0 === n ? 2e3 : n, !this._lock || this._lock.holder !== this._id) {
                                                e.next = 12;
                                                break
                                            }
                                            if (o = Date.now(), !(this._lock.expires > o + a)) {
                                                e.next = 7;
                                                break
                                            }
                                            return e.abrupt("return", !0);
                                        case 7:
                                            return e.next = 9, this.renew();
                                        case 9:
                                            return e.abrupt("return", e.sent);
                                        case 10:
                                            e.next = 13;
                                            break;
                                        case 12:
                                            return e.abrupt("return", !1);
                                        case 13:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "renew",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o, i = this,
                                    l = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = l.length > 0 && void 0 !== l[0] ? l[0] : {}, n = t.ttl, a = void 0 === n ? 5e3 : n, e.next = 3, u.update("lock", (function(e) {
                                                var t = Date.now() + a;
                                                return o = e && e.holder === i._id, i._lock = o ? {
                                                    holder: i._id,
                                                    expires: t
                                                } : e, i._lock
                                            }), this._store);
                                        case 3:
                                            return e.abrupt("return", o);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "acquire",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o, i, l, s = this,
                                    c = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = c.length > 0 && void 0 !== c[0] ? c[0] : {}, n = t.ttl, a = void 0 === n ? 5e3 : n, e.next = 3, u.update("lock", (function(e) {
                                                var t = Date.now(),
                                                    n = t + a;
                                                return i = e && e.expires < t, o = void 0 === e || i, l = e && e.holder === s._id, s._lock = o ? {
                                                    holder: s._id,
                                                    expires: n
                                                } : e, s._lock
                                            }), this._store);
                                        case 3:
                                            if (!l) {
                                                e.next = 5;
                                                break
                                            }
                                            throw new Error("Mutex double-locked");
                                        case 5:
                                            return e.abrupt("return", o);
                                        case 6:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "wait",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o, i, u, s = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            t = s.length > 0 && void 0 !== s[0] ? s[0] : {}, n = t.interval, a = void 0 === n ? 100 : n, o = t.limit, i = void 0 === o ? 6e3 : o, u = t.ttl;
                                        case 1:
                                            if (!i--) {
                                                e.next = 10;
                                                break
                                            }
                                            return e.next = 4, this.acquire({
                                                ttl: u
                                            });
                                        case 4:
                                            if (!e.sent) {
                                                e.next = 6;
                                                break
                                            }
                                            return e.abrupt("return", !0);
                                        case 6:
                                            return e.next = 8, l(a);
                                        case 8:
                                            e.next = 1;
                                            break;
                                        case 10:
                                            throw new Error("Mutex timeout");
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "release",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o, i, l, s = this,
                                    c = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = c.length > 0 && void 0 !== c[0] ? c[0] : {}, n = t.force, a = void 0 !== n && n, e.next = 3, u.update("lock", (function(e) {
                                                return o = a || e && e.holder === s._id, i = void 0 === e, l = e && e.holder !== s._id, s._lock = o ? void 0 : e, s._lock
                                            }), this._store);
                                        case 3:
                                            return e.next = 5, u.close(this._store);
                                        case 5:
                                            if (o || a) {
                                                e.next = 10;
                                                break
                                            }
                                            if (!i) {
                                                e.next = 8;
                                                break
                                            }
                                            throw new Error("Mutex double-freed");
                                        case 8:
                                            if (!l) {
                                                e.next = 10;
                                                break
                                            }
                                            throw new Error("Mutex lost ownership");
                                        case 10:
                                            return e.abrupt("return", o);
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }]), e
                }()
            },
            7890: function(e, t, n) {
                var r = n(7061).default,
                    a = n(7156).default,
                    o = n(6690).default,
                    i = n(9728).default;
                e.exports = function() {
                    "use strict";

                    function e(t) {
                        o(this, e), this._id = Math.random(), this._database = t, this._has = !1, this._release = null
                    }
                    return i(e, [{
                        key: "has",
                        value: function() {
                            var e = a(r().mark((function e() {
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._has);
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "acquire",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t = this;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", new Promise((function(e) {
                                                navigator.locks.request(t._database + "_lock", {
                                                    ifAvailable: !0
                                                }, (function(n) {
                                                    return t._has = !!n, e(!!n), new Promise((function(e) {
                                                        t._release = e
                                                    }))
                                                }))
                                            })));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "wait",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o = this,
                                    i = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = i.length > 0 && void 0 !== i[0] ? i[0] : {}, n = t.timeout, a = void 0 === n ? 6e5 : n, e.abrupt("return", new Promise((function(e, t) {
                                                var n = new AbortController;
                                                setTimeout((function() {
                                                    n.abort(), t(new Error("Mutex timeout"))
                                                }), a), navigator.locks.request(o._database + "_lock", {
                                                    signal: n.signal
                                                }, (function(t) {
                                                    return o._has = !!t, e(!!t), new Promise((function(e) {
                                                        o._release = e
                                                    }))
                                                }))
                                            })));
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "release",
                        value: function() {
                            var e = a(r().mark((function e() {
                                var t, n, a, o = arguments;
                                return r().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            t = o.length > 0 && void 0 !== o[0] ? o[0] : {}, n = t.force, a = void 0 !== n && n, this._has = !1, this._release ? this._release() : a && navigator.locks.request(this._database + "_lock", {
                                                steal: !0
                                            }, (function(e) {
                                                return !0
                                            }));
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }]), e
                }()
            },
            6935: function(e, t, n) {
                var r = n(861).default,
                    a = n(7061).default,
                    o = n(7156).default,
                    i = n(6690).default,
                    u = n(9728).default,
                    l = n(9608),
                    s = n(2678),
                    c = n(7237);

                function f(e, t) {
                    e = c.normalize(e), "undefined" !== typeof t && "function" !== typeof t || (t = {}), "string" === typeof t && (t = {
                        encoding: t
                    });
                    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
                    return [e, t].concat(r)
                }

                function d(e, t, n) {
                    e = c.normalize(e), "undefined" !== typeof n && "function" !== typeof n || (n = {}), "string" === typeof n && (n = {
                        encoding: n
                    });
                    for (var r = arguments.length, a = new Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) a[o - 3] = arguments[o];
                    return [e, t, n].concat(a)
                }

                function p(e, t) {
                    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
                    return [c.normalize(e), c.normalize(t)].concat(r)
                }
                e.exports = function() {
                    "use strict";

                    function e(t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        i(this, e), this.init = this.init.bind(this), this.readFile = this._wrap(this.readFile, f, !1), this.writeFile = this._wrap(this.writeFile, d, !0), this.unlink = this._wrap(this.unlink, f, !0), this.readdir = this._wrap(this.readdir, f, !1), this.mkdir = this._wrap(this.mkdir, f, !0), this.rmdir = this._wrap(this.rmdir, f, !0), this.rename = this._wrap(this.rename, p, !0), this.stat = this._wrap(this.stat, f, !1), this.lstat = this._wrap(this.lstat, f, !1), this.readlink = this._wrap(this.readlink, f, !1), this.symlink = this._wrap(this.symlink, p, !0), this.backFile = this._wrap(this.backFile, f, !0), this.du = this._wrap(this.du, f, !1), this._deactivationPromise = null, this._deactivationTimeout = null, this._activationPromise = null, this._operations = new Set, t && this.init(t, n)
                    }
                    return u(e, [{
                        key: "init",
                        value: function() {
                            var e = o(a().mark((function e() {
                                var t = arguments;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!this._initPromiseResolve) {
                                                e.next = 3;
                                                break
                                            }
                                            return e.next = 3, this._initPromise;
                                        case 3:
                                            return this._initPromise = this._init.apply(this, t), e.abrupt("return", this._initPromise);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_init",
                        value: function() {
                            var e = o(a().mark((function e(t) {
                                var n, r = arguments;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return n = r.length > 1 && void 0 !== r[1] ? r[1] : {}, e.next = 3, this._gracefulShutdown();
                                        case 3:
                                            if (!this._activationPromise) {
                                                e.next = 6;
                                                break
                                            }
                                            return e.next = 6, this._deactivate();
                                        case 6:
                                            if (!this._backend || !this._backend.destroy) {
                                                e.next = 9;
                                                break
                                            }
                                            return e.next = 9, this._backend.destroy();
                                        case 9:
                                            if (this._backend = n.backend || new l, !this._backend.init) {
                                                e.next = 13;
                                                break
                                            }
                                            return e.next = 13, this._backend.init(t, n);
                                        case 13:
                                            this._initPromiseResolve && (this._initPromiseResolve(), this._initPromiseResolve = null), n.defer || this.stat("/");
                                        case 15:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_gracefulShutdown",
                        value: function() {
                            var e = o(a().mark((function e() {
                                var t = this;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!(this._operations.size > 0)) {
                                                e.next = 6;
                                                break
                                            }
                                            return this._isShuttingDown = !0, e.next = 4, new Promise((function(e) {
                                                return t._gracefulShutdownResolve = e
                                            }));
                                        case 4:
                                            this._isShuttingDown = !1, this._gracefulShutdownResolve = null;
                                        case 6:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_wrap",
                        value: function(e, t, n) {
                            var i = this;
                            return o(a().mark((function o() {
                                var u, l, s, c, f = arguments;
                                return a().wrap((function(a) {
                                    for (;;) switch (a.prev = a.next) {
                                        case 0:
                                            for (u = f.length, l = new Array(u), s = 0; s < u; s++) l[s] = f[s];
                                            return l = t.apply(void 0, r(l)), c = {
                                                name: e.name,
                                                args: l
                                            }, i._operations.add(c), a.prev = 4, a.next = 7, i._activate();
                                        case 7:
                                            return a.next = 9, e.apply(i, l);
                                        case 9:
                                            return a.abrupt("return", a.sent);
                                        case 10:
                                            return a.prev = 10, i._operations.delete(c), n && i._backend.saveSuperblock(), 0 === i._operations.size && (i._deactivationTimeout || clearTimeout(i._deactivationTimeout), i._deactivationTimeout = setTimeout(i._deactivate.bind(i), 500)), a.finish(10);
                                        case 15:
                                        case "end":
                                            return a.stop()
                                    }
                                }), o, null, [
                                    [4, , 10, 15]
                                ])
                            })))
                        }
                    }, {
                        key: "_activate",
                        value: function() {
                            var e = o(a().mark((function e() {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this._initPromise || console.warn(new Error("Attempted to use LightningFS ".concat(this._name, " before it was initialized."))), e.next = 3, this._initPromise;
                                        case 3:
                                            if (this._deactivationTimeout && (clearTimeout(this._deactivationTimeout), this._deactivationTimeout = null), !this._deactivationPromise) {
                                                e.next = 7;
                                                break
                                            }
                                            return e.next = 7, this._deactivationPromise;
                                        case 7:
                                            return this._deactivationPromise = null, this._activationPromise || (this._activationPromise = this._backend.activate ? this._backend.activate() : Promise.resolve()), e.next = 11, this._activationPromise;
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "_deactivate",
                        value: function() {
                            var e = o(a().mark((function e() {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!this._activationPromise) {
                                                e.next = 3;
                                                break
                                            }
                                            return e.next = 3, this._activationPromise;
                                        case 3:
                                            return this._deactivationPromise || (this._deactivationPromise = this._backend.deactivate ? this._backend.deactivate() : Promise.resolve()), this._activationPromise = null, this._gracefulShutdownResolve && this._gracefulShutdownResolve(), e.abrupt("return", this._deactivationPromise);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "readFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._backend.readFile(t, n));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "writeFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n, r) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.writeFile(t, n, r);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n, r) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "unlink",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.unlink(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "readdir",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._backend.readdir(t, n));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "mkdir",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.mkdir(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "rmdir",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.rmdir(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "rename",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.rename(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "stat",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                var r;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.stat(t, n);
                                        case 2:
                                            return r = e.sent, e.abrupt("return", new s(r));
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "lstat",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                var r;
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.lstat(t, n);
                                        case 2:
                                            return r = e.sent, e.abrupt("return", new s(r));
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "readlink",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._backend.readlink(t, n));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "symlink",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.symlink(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "backFile",
                        value: function() {
                            var e = o(a().mark((function e(t, n) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this._backend.backFile(t, n);
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t, n) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "du",
                        value: function() {
                            var e = o(a().mark((function e(t) {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._backend.du(t));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "flush",
                        value: function() {
                            var e = o(a().mark((function e() {
                                return a().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this._backend.flush());
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function() {
                                return e.apply(this, arguments)
                            }
                        }()
                    }]), e
                }()
            },
            2678: function(e, t, n) {
                var r = n(6690).default,
                    a = n(9728).default;
                e.exports = function() {
                    "use strict";

                    function e(t) {
                        r(this, e), this.type = t.type, this.mode = t.mode, this.size = t.size, this.ino = t.ino, this.mtimeMs = t.mtimeMs, this.ctimeMs = t.ctimeMs || t.mtimeMs, this.uid = 1, this.gid = 1, this.dev = 1
                    }
                    return a(e, [{
                        key: "isFile",
                        value: function() {
                            return "file" === this.type
                        }
                    }, {
                        key: "isDirectory",
                        value: function() {
                            return "dir" === this.type
                        }
                    }, {
                        key: "isSymbolicLink",
                        value: function() {
                            return "symlink" === this.type
                        }
                    }]), e
                }()
            },
            6475: function(e, t, n) {
                var r = n(9728).default,
                    a = n(6690).default,
                    o = n(1655).default,
                    i = n(6389).default,
                    u = n(3496).default;

                function l(e) {
                    return function(t) {
                        "use strict";
                        o(u, t);
                        var n = i(u);

                        function u() {
                            var t;
                            a(this, u);
                            for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++) o[i] = arguments[i];
                            return (t = n.call.apply(n, [this].concat(o))).code = e, t.message ? t.message = e + ": " + t.message : t.message = e, t
                        }
                        return r(u)
                    }(u(Error))
                }
                var s = l("EEXIST"),
                    c = l("ENOENT"),
                    f = l("ENOTDIR"),
                    d = l("ENOTEMPTY"),
                    p = l("ETIMEDOUT");
                e.exports = {
                    EEXIST: s,
                    ENOENT: c,
                    ENOTDIR: f,
                    ENOTEMPTY: d,
                    ETIMEDOUT: p
                }
            },
            6311: function(e, t, n) {
                var r = n(7424).default,
                    a = n(3515).default,
                    o = n(6690).default,
                    i = n(9728).default,
                    u = n(8899),
                    l = n(6935);

                function s(e, t) {
                    "function" === typeof e && (t = e);
                    return [function() {
                        for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++) n[r] = arguments[r];
                        return t.apply(void 0, [null].concat(n))
                    }, t = u(t)]
                }
                e.exports = function() {
                    "use strict";

                    function e() {
                        o(this, e);
                        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        this.promises = a(l, n), this.init = this.init.bind(this), this.readFile = this.readFile.bind(this), this.writeFile = this.writeFile.bind(this), this.unlink = this.unlink.bind(this), this.readdir = this.readdir.bind(this), this.mkdir = this.mkdir.bind(this), this.rmdir = this.rmdir.bind(this), this.rename = this.rename.bind(this), this.stat = this.stat.bind(this), this.lstat = this.lstat.bind(this), this.readlink = this.readlink.bind(this), this.symlink = this.symlink.bind(this), this.backFile = this.backFile.bind(this), this.du = this.du.bind(this), this.flush = this.flush.bind(this)
                    }
                    return i(e, [{
                        key: "init",
                        value: function(e, t) {
                            return this.promises.init(e, t)
                        }
                    }, {
                        key: "readFile",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.readFile(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "writeFile",
                        value: function(e, t, n, a) {
                            var o = s(n, a),
                                i = r(o, 2),
                                u = i[0],
                                l = i[1];
                            this.promises.writeFile(e, t, n).then(u).catch(l)
                        }
                    }, {
                        key: "unlink",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.unlink(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "readdir",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.readdir(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "mkdir",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.mkdir(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "rmdir",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.rmdir(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "rename",
                        value: function(e, t, n) {
                            var a = s(n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.rename(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "stat",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.stat(e).then(i).catch(u)
                        }
                    }, {
                        key: "lstat",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.lstat(e).then(i).catch(u)
                        }
                    }, {
                        key: "readlink",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.readlink(e).then(i).catch(u)
                        }
                    }, {
                        key: "symlink",
                        value: function(e, t, n) {
                            var a = s(n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.symlink(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "backFile",
                        value: function(e, t, n) {
                            var a = s(t, n),
                                o = r(a, 2),
                                i = o[0],
                                u = o[1];
                            this.promises.backFile(e, t).then(i).catch(u)
                        }
                    }, {
                        key: "du",
                        value: function(e, t) {
                            var n = s(t),
                                a = r(n, 2),
                                o = a[0],
                                i = a[1];
                            this.promises.du(e).then(o).catch(i)
                        }
                    }, {
                        key: "flush",
                        value: function(e) {
                            var t = s(e),
                                n = r(t, 2),
                                a = n[0],
                                o = n[1];
                            this.promises.flush().then(a).catch(o)
                        }
                    }]), e
                }()
            },
            7237: function(e, t, n) {
                var r = n(861).default;

                function a(e) {
                    if (0 === e.length) return ".";
                    var t = i(e);
                    return t = t.reduce(u, []), o.apply(void 0, r(t))
                }

                function o() {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    if (0 === t.length) return "";
                    var r = t.join("/");
                    return r = r.replace(/\/{2,}/g, "/")
                }

                function i(e) {
                    if (0 === e.length) return [];
                    if ("/" === e) return ["/"];
                    var t = e.split("/");
                    return "" === t[t.length - 1] && t.pop(), "/" === e[0] ? t[0] = "/" : "." !== t[0] && t.unshift("."), t
                }

                function u(e, t) {
                    if (0 === e.length) return e.push(t), e;
                    if ("." === t) return e;
                    if (".." === t) {
                        if (1 === e.length) {
                            if ("/" === e[0]) throw new Error("Unable to normalize path - traverses above root directory");
                            if ("." === e[0]) return e.push(t), e
                        }
                        return ".." === e[e.length - 1] ? (e.push(".."), e) : (e.pop(), e)
                    }
                    return e.push(t), e
                }
                e.exports = {
                    join: o,
                    normalize: a,
                    split: i,
                    basename: function(e) {
                        if ("/" === e) throw new Error('Cannot get basename of "'.concat(e, '"'));
                        var t = e.lastIndexOf("/");
                        return -1 === t ? e : e.slice(t + 1)
                    },
                    dirname: function(e) {
                        var t = e.lastIndexOf("/");
                        if (-1 === t) throw new Error('Cannot get dirname of "'.concat(e, '"'));
                        return 0 === t ? "/" : e.slice(0, t)
                    },
                    resolve: function() {
                        for (var e = "", t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                        for (var i = 0, u = n; i < u.length; i++) {
                            var l = u[i];
                            e = l.startsWith("/") ? l : a(o(e, l))
                        }
                        return e
                    }
                }
            },
            726: function(e, t, n) {
                ! function(e) {
                    "use strict";

                    function t(e) {
                        for (var t = 0, n = Math.min(65536, e.length + 1), r = new Uint16Array(n), a = [], o = 0;;) {
                            var i = t < e.length;
                            if (!i || o >= n - 1) {
                                var u = r.subarray(0, o);
                                if (a.push(String.fromCharCode.apply(null, u)), !i) return a.join("");
                                e = e.subarray(t), t = 0, o = 0
                            }
                            var l = e[t++];
                            if (0 === (128 & l)) r[o++] = l;
                            else if (192 === (224 & l)) {
                                var s = 63 & e[t++];
                                r[o++] = (31 & l) << 6 | s
                            } else if (224 === (240 & l)) {
                                s = 63 & e[t++];
                                var c = 63 & e[t++];
                                r[o++] = (31 & l) << 12 | s << 6 | c
                            } else if (240 === (248 & l)) {
                                var f = (7 & l) << 18 | (s = 63 & e[t++]) << 12 | (c = 63 & e[t++]) << 6 | 63 & e[t++];
                                f > 65535 && (f -= 65536, r[o++] = f >>> 10 & 1023 | 55296, f = 56320 | 1023 & f), r[o++] = f
                            }
                        }
                    }
                    var n = "Failed to ",
                        r = function(e, t, r) {
                            if (e) throw new Error("".concat(n).concat(t, ": the '").concat(r, "' option is unsupported."))
                        },
                        a = "function" == typeof Buffer && Buffer.from,
                        o = a ? function(e) {
                            return Buffer.from(e)
                        } : function(e) {
                            for (var t = 0, n = e.length, r = 0, a = Math.max(32, n + (n >>> 1) + 7), o = new Uint8Array(a >>> 3 << 3); t < n;) {
                                var i = e.charCodeAt(t++);
                                if (i >= 55296 && i <= 56319) {
                                    if (t < n) {
                                        var u = e.charCodeAt(t);
                                        56320 === (64512 & u) && (++t, i = ((1023 & i) << 10) + (1023 & u) + 65536)
                                    }
                                    if (i >= 55296 && i <= 56319) continue
                                }
                                if (r + 4 > o.length) {
                                    a += 8, a = (a *= 1 + t / e.length * 2) >>> 3 << 3;
                                    var l = new Uint8Array(a);
                                    l.set(o), o = l
                                }
                                if (0 !== (4294967168 & i)) {
                                    if (0 === (4294965248 & i)) o[r++] = i >>> 6 & 31 | 192;
                                    else if (0 === (4294901760 & i)) o[r++] = i >>> 12 & 15 | 224, o[r++] = i >>> 6 & 63 | 128;
                                    else {
                                        if (0 !== (4292870144 & i)) continue;
                                        o[r++] = i >>> 18 & 7 | 240, o[r++] = i >>> 12 & 63 | 128, o[r++] = i >>> 6 & 63 | 128
                                    }
                                    o[r++] = 63 & i | 128
                                } else o[r++] = i
                            }
                            return o.slice ? o.slice(0, r) : o.subarray(0, r)
                        };

                    function i() {
                        this.encoding = "utf-8"
                    }
                    i.prototype.encode = function(e, t) {
                        return r(t && t.stream, "encode", "stream"), o(e)
                    };
                    var u = !a && "function" == typeof Blob && "function" == typeof URL && "function" == typeof URL.createObjectURL,
                        l = ["utf-8", "utf8", "unicode-1-1-utf-8"],
                        s = t;
                    a ? s = function(e, t) {
                        return (e instanceof Buffer ? e : Buffer.from(e.buffer, e.byteOffset, e.byteLength)).toString(t)
                    } : u && (s = function(e) {
                        try {
                            return function(e) {
                                var t;
                                try {
                                    var n = new Blob([e], {
                                        type: "text/plain;charset=UTF-8"
                                    });
                                    t = URL.createObjectURL(n);
                                    var r = new XMLHttpRequest;
                                    return r.open("GET", t, !1), r.send(), r.responseText
                                } finally {
                                    t && URL.revokeObjectURL(t)
                                }
                            }(e)
                        } catch (n) {
                            return t(e)
                        }
                    });
                    var c = "construct 'TextDecoder'",
                        f = "".concat(n, " ").concat(c, ": the ");

                    function d(e, t) {
                        if (r(t && t.fatal, c, "fatal"), e = e || "utf-8", !(a ? Buffer.isEncoding(e) : -1 !== l.indexOf(e.toLowerCase()))) throw new RangeError("".concat(f, " encoding label provided ('").concat(e, "') is invalid."));
                        this.encoding = e, this.fatal = !1, this.ignoreBOM = !1
                    }
                    d.prototype.decode = function(e, t) {
                        var n;
                        return r(t && t.stream, "decode", "stream"), n = e instanceof Uint8Array ? e : e.buffer instanceof ArrayBuffer ? new Uint8Array(e.buffer) : new Uint8Array(e), s(n, this.encoding)
                    }, e.TextEncoder = e.TextEncoder || i, e.TextDecoder = e.TextDecoder || d
                }("undefined" !== typeof window ? window : "undefined" !== typeof n.g ? n.g : this)
            },
            9575: function(e, t, n) {
                n(726), e.exports = {
                    encode: function(e) {
                        return (new TextEncoder).encode(e)
                    },
                    decode: function(e) {
                        return (new TextDecoder).decode(e)
                    }
                }
            },
            4019: function(e) {
                e.exports = function(e, t, n) {
                    var r;
                    return function() {
                        if (!t) return e.apply(this, arguments);
                        var a = this,
                            o = arguments,
                            i = n && !r;
                        return clearTimeout(r), r = setTimeout((function() {
                            if (r = null, !i) return e.apply(a, o)
                        }), t), i ? e.apply(this, arguments) : void 0
                    }
                }
            },
            8899: function(e) {
                e.exports = function(e) {
                    var t, n;
                    if ("function" !== typeof e) throw new Error("expected a function but got " + e);
                    return function() {
                        return t ? n : (t = !0, n = e.apply(this, arguments))
                    }
                }
            },
            6663: function(e, t, n) {
                "use strict";
                var r = n(697),
                    a = Symbol.for("react.element"),
                    o = Symbol.for("react.fragment"),
                    i = Object.prototype.hasOwnProperty,
                    u = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
                    l = {
                        key: !0,
                        ref: !0,
                        __self: !0,
                        __source: !0
                    };

                function s(e, t, n) {
                    var r, o = {},
                        s = null,
                        c = null;
                    for (r in void 0 !== n && (s = "" + n), void 0 !== t.key && (s = "" + t.key), void 0 !== t.ref && (c = t.ref), t) i.call(t, r) && !l.hasOwnProperty(r) && (o[r] = t[r]);
                    if (e && e.defaultProps)
                        for (r in t = e.defaultProps) void 0 === o[r] && (o[r] = t[r]);
                    return {
                        $$typeof: a,
                        type: e,
                        key: s,
                        ref: c,
                        props: o,
                        _owner: u.current
                    }
                }
                t.Fragment = o, t.jsx = s, t.jsxs = s
            },
            8184: function(e, t) {
                "use strict";
                var n = Symbol.for("react.element"),
                    r = Symbol.for("react.portal"),
                    a = Symbol.for("react.fragment"),
                    o = Symbol.for("react.strict_mode"),
                    i = Symbol.for("react.profiler"),
                    u = Symbol.for("react.provider"),
                    l = Symbol.for("react.context"),
                    s = Symbol.for("react.forward_ref"),
                    c = Symbol.for("react.suspense"),
                    f = Symbol.for("react.memo"),
                    d = Symbol.for("react.lazy"),
                    p = Symbol.iterator;
                var h = {
                        isMounted: function() {
                            return !1
                        },
                        enqueueForceUpdate: function() {},
                        enqueueReplaceState: function() {},
                        enqueueSetState: function() {}
                    },
                    v = Object.assign,
                    m = {};

                function b(e, t, n) {
                    this.props = e, this.context = t, this.refs = m, this.updater = n || h
                }

                function y() {}

                function g(e, t, n) {
                    this.props = e, this.context = t, this.refs = m, this.updater = n || h
                }
                b.prototype.isReactComponent = {}, b.prototype.setState = function(e, t) {
                    if ("object" !== typeof e && "function" !== typeof e && null != e) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
                    this.updater.enqueueSetState(this, e, t, "setState")
                }, b.prototype.forceUpdate = function(e) {
                    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
                }, y.prototype = b.prototype;
                var w = g.prototype = new y;
                w.constructor = g, v(w, b.prototype), w.isPureReactComponent = !0;
                var x = Array.isArray,
                    k = Object.prototype.hasOwnProperty,
                    S = {
                        current: null
                    },
                    _ = {
                        key: !0,
                        ref: !0,
                        __self: !0,
                        __source: !0
                    };

                function E(e, t, r) {
                    var a, o = {},
                        i = null,
                        u = null;
                    if (null != t)
                        for (a in void 0 !== t.ref && (u = t.ref), void 0 !== t.key && (i = "" + t.key), t) k.call(t, a) && !_.hasOwnProperty(a) && (o[a] = t[a]);
                    var l = arguments.length - 2;
                    if (1 === l) o.children = r;
                    else if (1 < l) {
                        for (var s = Array(l), c = 0; c < l; c++) s[c] = arguments[c + 2];
                        o.children = s
                    }
                    if (e && e.defaultProps)
                        for (a in l = e.defaultProps) void 0 === o[a] && (o[a] = l[a]);
                    return {
                        $$typeof: n,
                        type: e,
                        key: i,
                        ref: u,
                        props: o,
                        _owner: S.current
                    }
                }

                function C(e) {
                    return "object" === typeof e && null !== e && e.$$typeof === n
                }
                var j = /\/+/g;

                function P(e, t) {
                    return "object" === typeof e && null !== e && null != e.key ? function(e) {
                        var t = {
                            "=": "=0",
                            ":": "=2"
                        };
                        return "$" + e.replace(/[=:]/g, (function(e) {
                            return t[e]
                        }))
                    }("" + e.key) : t.toString(36)
                }

                function T(e, t, a, o, i) {
                    var u = typeof e;
                    "undefined" !== u && "boolean" !== u || (e = null);
                    var l = !1;
                    if (null === e) l = !0;
                    else switch (u) {
                        case "string":
                        case "number":
                            l = !0;
                            break;
                        case "object":
                            switch (e.$$typeof) {
                                case n:
                                case r:
                                    l = !0
                            }
                    }
                    if (l) return i = i(l = e), e = "" === o ? "." + P(l, 0) : o, x(i) ? (a = "", null != e && (a = e.replace(j, "$&/") + "/"), T(i, t, a, "", (function(e) {
                        return e
                    }))) : null != i && (C(i) && (i = function(e, t) {
                        return {
                            $$typeof: n,
                            type: e.type,
                            key: t,
                            ref: e.ref,
                            props: e.props,
                            _owner: e._owner
                        }
                    }(i, a + (!i.key || l && l.key === i.key ? "" : ("" + i.key).replace(j, "$&/") + "/") + e)), t.push(i)), 1;
                    if (l = 0, o = "" === o ? "." : o + ":", x(e))
                        for (var s = 0; s < e.length; s++) {
                            var c = o + P(u = e[s], s);
                            l += T(u, t, a, c, i)
                        } else if (c = function(e) {
                                return null === e || "object" !== typeof e ? null : "function" === typeof(e = p && e[p] || e["@@iterator"]) ? e : null
                            }(e), "function" === typeof c)
                            for (e = c.call(e), s = 0; !(u = e.next()).done;) l += T(u = u.value, t, a, c = o + P(u, s++), i);
                        else if ("object" === u) throw t = String(e), Error("Objects are not valid as a React child (found: " + ("[object Object]" === t ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
                    return l
                }

                function M(e, t, n) {
                    if (null == e) return e;
                    var r = [],
                        a = 0;
                    return T(e, r, "", "", (function(e) {
                        return t.call(n, e, a++)
                    })), r
                }

                function D(e) {
                    if (-1 === e._status) {
                        var t = e._result;
                        (t = t()).then((function(t) {
                            0 !== e._status && -1 !== e._status || (e._status = 1, e._result = t)
                        }), (function(t) {
                            0 !== e._status && -1 !== e._status || (e._status = 2, e._result = t)
                        })), -1 === e._status && (e._status = 0, e._result = t)
                    }
                    if (1 === e._status) return e._result.default;
                    throw e._result
                }
                var N = {
                        current: null
                    },
                    R = {
                        transition: null
                    },
                    O = {
                        ReactCurrentDispatcher: N,
                        ReactCurrentBatchConfig: R,
                        ReactCurrentOwner: S
                    };
                t.Children = {
                    map: M,
                    forEach: function(e, t, n) {
                        M(e, (function() {
                            t.apply(this, arguments)
                        }), n)
                    },
                    count: function(e) {
                        var t = 0;
                        return M(e, (function() {
                            t++
                        })), t
                    },
                    toArray: function(e) {
                        return M(e, (function(e) {
                            return e
                        })) || []
                    },
                    only: function(e) {
                        if (!C(e)) throw Error("React.Children.only expected to receive a single React element child.");
                        return e
                    }
                }, t.Component = b, t.Fragment = a, t.Profiler = i, t.PureComponent = g, t.StrictMode = o, t.Suspense = c, t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O, t.cloneElement = function(e, t, r) {
                    if (null === e || void 0 === e) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
                    var a = v({}, e.props),
                        o = e.key,
                        i = e.ref,
                        u = e._owner;
                    if (null != t) {
                        if (void 0 !== t.ref && (i = t.ref, u = S.current), void 0 !== t.key && (o = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
                        for (s in t) k.call(t, s) && !_.hasOwnProperty(s) && (a[s] = void 0 === t[s] && void 0 !== l ? l[s] : t[s])
                    }
                    var s = arguments.length - 2;
                    if (1 === s) a.children = r;
                    else if (1 < s) {
                        l = Array(s);
                        for (var c = 0; c < s; c++) l[c] = arguments[c + 2];
                        a.children = l
                    }
                    return {
                        $$typeof: n,
                        type: e.type,
                        key: o,
                        ref: i,
                        props: a,
                        _owner: u
                    }
                }, t.createContext = function(e) {
                    return (e = {
                        $$typeof: l,
                        _currentValue: e,
                        _currentValue2: e,
                        _threadCount: 0,
                        Provider: null,
                        Consumer: null,
                        _defaultValue: null,
                        _globalName: null
                    }).Provider = {
                        $$typeof: u,
                        _context: e
                    }, e.Consumer = e
                }, t.createElement = E, t.createFactory = function(e) {
                    var t = E.bind(null, e);
                    return t.type = e, t
                }, t.createRef = function() {
                    return {
                        current: null
                    }
                }, t.forwardRef = function(e) {
                    return {
                        $$typeof: s,
                        render: e
                    }
                }, t.isValidElement = C, t.lazy = function(e) {
                    return {
                        $$typeof: d,
                        _payload: {
                            _status: -1,
                            _result: e
                        },
                        _init: D
                    }
                }, t.memo = function(e, t) {
                    return {
                        $$typeof: f,
                        type: e,
                        compare: void 0 === t ? null : t
                    }
                }, t.startTransition = function(e) {
                    var t = R.transition;
                    R.transition = {};
                    try {
                        e()
                    } finally {
                        R.transition = t
                    }
                }, t.unstable_act = function() {
                    throw Error("act(...) is not supported in production builds of React.")
                }, t.useCallback = function(e, t) {
                    return N.current.useCallback(e, t)
                }, t.useContext = function(e) {
                    return N.current.useContext(e)
                }, t.useDebugValue = function() {}, t.useDeferredValue = function(e) {
                    return N.current.useDeferredValue(e)
                }, t.useEffect = function(e, t) {
                    return N.current.useEffect(e, t)
                }, t.useId = function() {
                    return N.current.useId()
                }, t.useImperativeHandle = function(e, t, n) {
                    return N.current.useImperativeHandle(e, t, n)
                }, t.useInsertionEffect = function(e, t) {
                    return N.current.useInsertionEffect(e, t)
                }, t.useLayoutEffect = function(e, t) {
                    return N.current.useLayoutEffect(e, t)
                }, t.useMemo = function(e, t) {
                    return N.current.useMemo(e, t)
                }, t.useReducer = function(e, t, n) {
                    return N.current.useReducer(e, t, n)
                }, t.useRef = function(e) {
                    return N.current.useRef(e)
                }, t.useState = function(e) {
                    return N.current.useState(e)
                }, t.useSyncExternalStore = function(e, t, n) {
                    return N.current.useSyncExternalStore(e, t, n)
                }, t.useTransition = function() {
                    return N.current.useTransition()
                }, t.version = "18.2.0"
            },
            697: function(e, t, n) {
                "use strict";
                e.exports = n(8184)
            },
            7076: function(e, t, n) {
                "use strict";
                e.exports = n(6663)
            },
            3157: function(e, t, n) {
                var r;
                ! function(a, o) {
                    "use strict";
                    var i = "function",
                        u = "undefined",
                        l = "object",
                        s = "string",
                        c = "model",
                        f = "name",
                        d = "type",
                        p = "vendor",
                        h = "version",
                        v = "architecture",
                        m = "console",
                        b = "mobile",
                        y = "tablet",
                        g = "smarttv",
                        w = "wearable",
                        x = "embedded",
                        k = "Amazon",
                        S = "Apple",
                        _ = "ASUS",
                        E = "BlackBerry",
                        C = "Browser",
                        j = "Chrome",
                        P = "Firefox",
                        T = "Google",
                        M = "Huawei",
                        D = "LG",
                        N = "Microsoft",
                        R = "Motorola",
                        O = "Opera",
                        L = "Samsung",
                        F = "Sharp",
                        A = "Sony",
                        I = "Xiaomi",
                        z = "Zebra",
                        U = "Facebook",
                        B = function(e) {
                            for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
                            return t
                        },
                        V = function(e, t) {
                            return typeof e === s && -1 !== H(t).indexOf(H(e))
                        },
                        H = function(e) {
                            return e.toLowerCase()
                        },
                        W = function(e, t) {
                            if (typeof e === s) return e = e.replace(/^\s\s*/, ""), typeof t === u ? e : e.substring(0, 350)
                        },
                        K = function(e, t) {
                            for (var n, r, a, u, s, c, f = 0; f < t.length && !s;) {
                                var d = t[f],
                                    p = t[f + 1];
                                for (n = r = 0; n < d.length && !s;)
                                    if (s = d[n++].exec(e))
                                        for (a = 0; a < p.length; a++) c = s[++r], typeof(u = p[a]) === l && u.length > 0 ? 2 === u.length ? typeof u[1] == i ? this[u[0]] = u[1].call(this, c) : this[u[0]] = u[1] : 3 === u.length ? typeof u[1] !== i || u[1].exec && u[1].test ? this[u[0]] = c ? c.replace(u[1], u[2]) : o : this[u[0]] = c ? u[1].call(this, c, u[2]) : o : 4 === u.length && (this[u[0]] = c ? u[3].call(this, c.replace(u[1], u[2])) : o) : this[u] = c || o;
                                f += 2
                            }
                        },
                        q = function(e, t) {
                            for (var n in t)
                                if (typeof t[n] === l && t[n].length > 0) {
                                    for (var r = 0; r < t[n].length; r++)
                                        if (V(t[n][r], e)) return "?" === n ? o : n
                                } else if (V(t[n], e)) return "?" === n ? o : n;
                            return e
                        },
                        $ = {
                            ME: "4.90",
                            "NT 3.11": "NT3.51",
                            "NT 4.0": "NT4.0",
                            2e3: "NT 5.0",
                            XP: ["NT 5.1", "NT 5.2"],
                            Vista: "NT 6.0",
                            7: "NT 6.1",
                            8: "NT 6.2",
                            8.1: "NT 6.3",
                            10: ["NT 6.4", "NT 10.0"],
                            RT: "ARM"
                        },
                        G = {
                            browser: [
                                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                                [h, [f, "Chrome"]],
                                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                                [h, [f, "Edge"]],
                                [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],
                                [f, h],
                                [/opios[\/ ]+([\w\.]+)/i],
                                [h, [f, O + " Mini"]],
                                [/\bopr\/([\w\.]+)/i],
                                [h, [f, O]],
                                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(weibo)__([\d\.]+)/i],
                                [f, h],
                                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                                [h, [f, "UC" + C]],
                                [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i],
                                [h, [f, "WeChat(Win) Desktop"]],
                                [/micromessenger\/([\w\.]+)/i],
                                [h, [f, "WeChat"]],
                                [/konqueror\/([\w\.]+)/i],
                                [h, [f, "Konqueror"]],
                                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                                [h, [f, "IE"]],
                                [/yabrowser\/([\w\.]+)/i],
                                [h, [f, "Yandex"]],
                                [/(avast|avg)\/([\w\.]+)/i],
                                [
                                    [f, /(.+)/, "$1 Secure " + C], h
                                ],
                                [/\bfocus\/([\w\.]+)/i],
                                [h, [f, P + " Focus"]],
                                [/\bopt\/([\w\.]+)/i],
                                [h, [f, O + " Touch"]],
                                [/coc_coc\w+\/([\w\.]+)/i],
                                [h, [f, "Coc Coc"]],
                                [/dolfin\/([\w\.]+)/i],
                                [h, [f, "Dolphin"]],
                                [/coast\/([\w\.]+)/i],
                                [h, [f, O + " Coast"]],
                                [/miuibrowser\/([\w\.]+)/i],
                                [h, [f, "MIUI " + C]],
                                [/fxios\/([-\w\.]+)/i],
                                [h, [f, P]],
                                [/\bqihu|(qi?ho?o?|360)browser/i],
                                [
                                    [f, "360 " + C]
                                ],
                                [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
                                [
                                    [f, /(.+)/, "$1 " + C], h
                                ],
                                [/(comodo_dragon)\/([\w\.]+)/i],
                                [
                                    [f, /_/g, " "], h
                                ],
                                [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],
                                [f, h],
                                [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i],
                                [f],
                                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                                [
                                    [f, U], h
                                ],
                                [/safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i],
                                [f, h],
                                [/\bgsa\/([\w\.]+) .*safari\//i],
                                [h, [f, "GSA"]],
                                [/headlesschrome(?:\/([\w\.]+)| )/i],
                                [h, [f, j + " Headless"]],
                                [/ wv\).+(chrome)\/([\w\.]+)/i],
                                [
                                    [f, j + " WebView"], h
                                ],
                                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                                [h, [f, "Android " + C]],
                                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                                [f, h],
                                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                                [h, [f, "Mobile Safari"]],
                                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                                [h, f],
                                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                                [f, [h, q, {
                                    "1.0": "/8",
                                    1.2: "/1",
                                    1.3: "/3",
                                    "2.0": "/412",
                                    "2.0.2": "/416",
                                    "2.0.3": "/417",
                                    "2.0.4": "/419",
                                    "?": "/"
                                }]],
                                [/(webkit|khtml)\/([\w\.]+)/i],
                                [f, h],
                                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                                [
                                    [f, "Netscape"], h
                                ],
                                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                                [h, [f, P + " Reality"]],
                                [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i],
                                [f, h],
                                [/(cobalt)\/([\w\.]+)/i],
                                [f, [h, /master.|lts./, ""]]
                            ],
                            cpu: [
                                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                                [
                                    [v, "amd64"]
                                ],
                                [/(ia32(?=;))/i],
                                [
                                    [v, H]
                                ],
                                [/((?:i[346]|x)86)[;\)]/i],
                                [
                                    [v, "ia32"]
                                ],
                                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                                [
                                    [v, "arm64"]
                                ],
                                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                                [
                                    [v, "armhf"]
                                ],
                                [/windows (ce|mobile); ppc;/i],
                                [
                                    [v, "arm"]
                                ],
                                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                                [
                                    [v, /ower/, "", H]
                                ],
                                [/(sun4\w)[;\)]/i],
                                [
                                    [v, "sparc"]
                                ],
                                [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                                [
                                    [v, H]
                                ]
                            ],
                            device: [
                                [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                                [c, [p, L],
                                    [d, y]
                                ],
                                [/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                                [c, [p, L],
                                    [d, b]
                                ],
                                [/\((ip(?:hone|od)[\w ]*);/i],
                                [c, [p, S],
                                    [d, b]
                                ],
                                [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                                [c, [p, S],
                                    [d, y]
                                ],
                                [/(macintosh);/i],
                                [c, [p, S]],
                                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                                [c, [p, M],
                                    [d, y]
                                ],
                                [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
                                [c, [p, M],
                                    [d, b]
                                ],
                                [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],
                                [
                                    [c, /_/g, " "],
                                    [p, I],
                                    [d, b]
                                ],
                                [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                                [
                                    [c, /_/g, " "],
                                    [p, I],
                                    [d, y]
                                ],
                                [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                                [c, [p, "OPPO"],
                                    [d, b]
                                ],
                                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                                [c, [p, "Vivo"],
                                    [d, b]
                                ],
                                [/\b(rmx[12]\d{3})(?: bui|;|\))/i],
                                [c, [p, "Realme"],
                                    [d, b]
                                ],
                                [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],
                                [c, [p, R],
                                    [d, b]
                                ],
                                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                                [c, [p, R],
                                    [d, y]
                                ],
                                [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                                [c, [p, D],
                                    [d, y]
                                ],
                                [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i],
                                [c, [p, D],
                                    [d, b]
                                ],
                                [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                                [c, [p, "Lenovo"],
                                    [d, y]
                                ],
                                [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                                [
                                    [c, /_/g, " "],
                                    [p, "Nokia"],
                                    [d, b]
                                ],
                                [/(pixel c)\b/i],
                                [c, [p, T],
                                    [d, y]
                                ],
                                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                                [c, [p, T],
                                    [d, b]
                                ],
                                [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                                [c, [p, A],
                                    [d, b]
                                ],
                                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                                [
                                    [c, "Xperia Tablet"],
                                    [p, A],
                                    [d, y]
                                ],
                                [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                                [c, [p, "OnePlus"],
                                    [d, b]
                                ],
                                [/(alexa)webm/i, /(kf[a-z]{2}wi)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                                [c, [p, k],
                                    [d, y]
                                ],
                                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                                [
                                    [c, /(.+)/g, "Fire Phone $1"],
                                    [p, k],
                                    [d, b]
                                ],
                                [/(playbook);[-\w\),; ]+(rim)/i],
                                [c, p, [d, y]],
                                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                                [c, [p, E],
                                    [d, b]
                                ],
                                [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                                [c, [p, _],
                                    [d, y]
                                ],
                                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                                [c, [p, _],
                                    [d, b]
                                ],
                                [/(nexus 9)/i],
                                [c, [p, "HTC"],
                                    [d, y]
                                ],
                                [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic|sony(?!-bra))[-_ ]?([-\w]*)/i],
                                [p, [c, /_/g, " "],
                                    [d, b]
                                ],
                                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                                [c, [p, "Acer"],
                                    [d, y]
                                ],
                                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                                [c, [p, "Meizu"],
                                    [d, b]
                                ],
                                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                                [c, [p, F],
                                    [d, b]
                                ],
                                [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i],
                                [p, c, [d, b]],
                                [/(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i],
                                [p, c, [d, y]],
                                [/(surface duo)/i],
                                [c, [p, N],
                                    [d, y]
                                ],
                                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                                [c, [p, "Fairphone"],
                                    [d, b]
                                ],
                                [/(u304aa)/i],
                                [c, [p, "AT&T"],
                                    [d, b]
                                ],
                                [/\bsie-(\w*)/i],
                                [c, [p, "Siemens"],
                                    [d, b]
                                ],
                                [/\b(rct\w+) b/i],
                                [c, [p, "RCA"],
                                    [d, y]
                                ],
                                [/\b(venue[\d ]{2,7}) b/i],
                                [c, [p, "Dell"],
                                    [d, y]
                                ],
                                [/\b(q(?:mv|ta)\w+) b/i],
                                [c, [p, "Verizon"],
                                    [d, y]
                                ],
                                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                                [c, [p, "Barnes & Noble"],
                                    [d, y]
                                ],
                                [/\b(tm\d{3}\w+) b/i],
                                [c, [p, "NuVision"],
                                    [d, y]
                                ],
                                [/\b(k88) b/i],
                                [c, [p, "ZTE"],
                                    [d, y]
                                ],
                                [/\b(nx\d{3}j) b/i],
                                [c, [p, "ZTE"],
                                    [d, b]
                                ],
                                [/\b(gen\d{3}) b.+49h/i],
                                [c, [p, "Swiss"],
                                    [d, b]
                                ],
                                [/\b(zur\d{3}) b/i],
                                [c, [p, "Swiss"],
                                    [d, y]
                                ],
                                [/\b((zeki)?tb.*\b) b/i],
                                [c, [p, "Zeki"],
                                    [d, y]
                                ],
                                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                                [
                                    [p, "Dragon Touch"], c, [d, y]
                                ],
                                [/\b(ns-?\w{0,9}) b/i],
                                [c, [p, "Insignia"],
                                    [d, y]
                                ],
                                [/\b((nxa|next)-?\w{0,9}) b/i],
                                [c, [p, "NextBook"],
                                    [d, y]
                                ],
                                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                                [
                                    [p, "Voice"], c, [d, b]
                                ],
                                [/\b(lvtel\-)?(v1[12]) b/i],
                                [
                                    [p, "LvTel"], c, [d, b]
                                ],
                                [/\b(ph-1) /i],
                                [c, [p, "Essential"],
                                    [d, b]
                                ],
                                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                                [c, [p, "Envizen"],
                                    [d, y]
                                ],
                                [/\b(trio[-\w\. ]+) b/i],
                                [c, [p, "MachSpeed"],
                                    [d, y]
                                ],
                                [/\btu_(1491) b/i],
                                [c, [p, "Rotor"],
                                    [d, y]
                                ],
                                [/(shield[\w ]+) b/i],
                                [c, [p, "Nvidia"],
                                    [d, y]
                                ],
                                [/(sprint) (\w+)/i],
                                [p, c, [d, b]],
                                [/(kin\.[onetw]{3})/i],
                                [
                                    [c, /\./g, " "],
                                    [p, N],
                                    [d, b]
                                ],
                                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                                [c, [p, z],
                                    [d, y]
                                ],
                                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                                [c, [p, z],
                                    [d, b]
                                ],
                                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                                [p, c, [d, m]],
                                [/droid.+; (shield) bui/i],
                                [c, [p, "Nvidia"],
                                    [d, m]
                                ],
                                [/(playstation [345portablevi]+)/i],
                                [c, [p, A],
                                    [d, m]
                                ],
                                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                                [c, [p, N],
                                    [d, m]
                                ],
                                [/smart-tv.+(samsung)/i],
                                [p, [d, g]],
                                [/hbbtv.+maple;(\d+)/i],
                                [
                                    [c, /^/, "SmartTV"],
                                    [p, L],
                                    [d, g]
                                ],
                                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                                [
                                    [p, D],
                                    [d, g]
                                ],
                                [/(apple) ?tv/i],
                                [p, [c, S + " TV"],
                                    [d, g]
                                ],
                                [/crkey/i],
                                [
                                    [c, j + "cast"],
                                    [p, T],
                                    [d, g]
                                ],
                                [/droid.+aft(\w)( bui|\))/i],
                                [c, [p, k],
                                    [d, g]
                                ],
                                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                                [c, [p, F],
                                    [d, g]
                                ],
                                [/(bravia[\w ]+)( bui|\))/i],
                                [c, [p, A],
                                    [d, g]
                                ],
                                [/(mitv-\w{5}) bui/i],
                                [c, [p, I],
                                    [d, g]
                                ],
                                [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],
                                [
                                    [p, W],
                                    [c, W],
                                    [d, g]
                                ],
                                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                                [
                                    [d, g]
                                ],
                                [/((pebble))app/i],
                                [p, c, [d, w]],
                                [/droid.+; (glass) \d/i],
                                [c, [p, T],
                                    [d, w]
                                ],
                                [/droid.+; (wt63?0{2,3})\)/i],
                                [c, [p, z],
                                    [d, w]
                                ],
                                [/(quest( 2)?)/i],
                                [c, [p, U],
                                    [d, w]
                                ],
                                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                                [p, [d, x]],
                                [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],
                                [c, [d, b]],
                                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                                [c, [d, y]],
                                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                                [
                                    [d, y]
                                ],
                                [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                                [
                                    [d, b]
                                ],
                                [/(android[-\w\. ]{0,9});.+buil/i],
                                [c, [p, "Generic"]]
                            ],
                            engine: [
                                [/windows.+ edge\/([\w\.]+)/i],
                                [h, [f, "EdgeHTML"]],
                                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                                [h, [f, "Blink"]],
                                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i],
                                [f, h],
                                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                                [h, f]
                            ],
                            os: [
                                [/microsoft (windows) (vista|xp)/i],
                                [f, h],
                                [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],
                                [f, [h, q, $]],
                                [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                                [
                                    [f, "Windows"],
                                    [h, q, $]
                                ],
                                [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /cfnetwork\/.+darwin/i],
                                [
                                    [h, /_/g, "."],
                                    [f, "iOS"]
                                ],
                                [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                                [
                                    [f, "Mac OS"],
                                    [h, /_/g, "."]
                                ],
                                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                                [h, f],
                                [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i],
                                [f, h],
                                [/\(bb(10);/i],
                                [h, [f, E]],
                                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                                [h, [f, "Symbian"]],
                                [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                                [h, [f, P + " OS"]],
                                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                                [h, [f, "webOS"]],
                                [/crkey\/([\d\.]+)/i],
                                [h, [f, j + "cast"]],
                                [/(cros) [\w]+ ([\w\.]+\w)/i],
                                [
                                    [f, "Chromium OS"], h
                                ],
                                [/(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i],
                                [f, h],
                                [/(sunos) ?([\w\.\d]*)/i],
                                [
                                    [f, "Solaris"], h
                                ],
                                [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i, /(unix) ?([\w\.]*)/i],
                                [f, h]
                            ]
                        },
                        Q = function e(t, n) {
                            if (typeof t === l && (n = t, t = o), !(this instanceof e)) return new e(t, n).getResult();
                            var r = t || (typeof a !== u && a.navigator && a.navigator.userAgent ? a.navigator.userAgent : ""),
                                i = n ? function(e, t) {
                                    var n = {};
                                    for (var r in e) t[r] && t[r].length % 2 === 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
                                    return n
                                }(G, n) : G;
                            return this.getBrowser = function() {
                                var e, t = {};
                                return t[f] = o, t[h] = o, K.call(t, r, i.browser), t.major = typeof(e = t.version) === s ? e.replace(/[^\d\.]/g, "").split(".")[0] : o, t
                            }, this.getCPU = function() {
                                var e = {};
                                return e[v] = o, K.call(e, r, i.cpu), e
                            }, this.getDevice = function() {
                                var e = {};
                                return e[p] = o, e[c] = o, e[d] = o, K.call(e, r, i.device), e
                            }, this.getEngine = function() {
                                var e = {};
                                return e[f] = o, e[h] = o, K.call(e, r, i.engine), e
                            }, this.getOS = function() {
                                var e = {};
                                return e[f] = o, e[h] = o, K.call(e, r, i.os), e
                            }, this.getResult = function() {
                                return {
                                    ua: this.getUA(),
                                    browser: this.getBrowser(),
                                    engine: this.getEngine(),
                                    os: this.getOS(),
                                    device: this.getDevice(),
                                    cpu: this.getCPU()
                                }
                            }, this.getUA = function() {
                                return r
                            }, this.setUA = function(e) {
                                return r = typeof e === s && e.length > 350 ? W(e, 350) : e, this
                            }, this.setUA(r), this
                        };
                    Q.VERSION = "0.7.33", Q.BROWSER = B([f, h, "major"]), Q.CPU = B([v]), Q.DEVICE = B([c, p, d, m, b, g, y, w, x]), Q.ENGINE = Q.OS = B([f, h]), typeof t !== u ? (e.exports && (t = e.exports = Q), t.UAParser = Q) : n.amdO ? (r = function() {
                        return Q
                    }.call(t, n, t, e)) === o || (e.exports = r) : typeof a !== u && (a.UAParser = Q);
                    var Y = typeof a !== u && (a.jQuery || a.Zepto);
                    if (Y && !Y.ua) {
                        var Z = new Q;
                        Y.ua = Z.getResult(), Y.ua.get = function() {
                            return Z.getUA()
                        }, Y.ua.set = function(e) {
                            Z.setUA(e);
                            var t = Z.getResult();
                            for (var n in t) Y.ua[n] = t[n]
                        }
                    }
                }("object" === typeof window ? window : this)
            },
            534: function(e, t, n) {
                "use strict";
                var r = n(697),
                    a = n(2224);

                function o(e) {
                    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
                    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
                }
                var i = new Set,
                    u = {};

                function l(e, t) {
                    s(e, t), s(e + "Capture", t)
                }

                function s(e, t) {
                    for (u[e] = t, e = 0; e < t.length; e++) i.add(t[e])
                }
                var c = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
                    f = Object.prototype.hasOwnProperty,
                    d = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
                    p = {},
                    h = {};

                function v(e, t, n, r, a, o, i) {
                    this.acceptsBooleans = 2 === t || 3 === t || 4 === t, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i
                }
                var m = {};
                "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e) {
                    m[e] = new v(e, 0, !1, e, null, !1, !1)
                })), [
                    ["acceptCharset", "accept-charset"],
                    ["className", "class"],
                    ["htmlFor", "for"],
                    ["httpEquiv", "http-equiv"]
                ].forEach((function(e) {
                    var t = e[0];
                    m[t] = new v(t, 1, !1, e[1], null, !1, !1)
                })), ["contentEditable", "draggable", "spellCheck", "value"].forEach((function(e) {
                    m[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1)
                })), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function(e) {
                    m[e] = new v(e, 2, !1, e, null, !1, !1)
                })), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e) {
                    m[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1)
                })), ["checked", "multiple", "muted", "selected"].forEach((function(e) {
                    m[e] = new v(e, 3, !0, e, null, !1, !1)
                })), ["capture", "download"].forEach((function(e) {
                    m[e] = new v(e, 4, !1, e, null, !1, !1)
                })), ["cols", "rows", "size", "span"].forEach((function(e) {
                    m[e] = new v(e, 6, !1, e, null, !1, !1)
                })), ["rowSpan", "start"].forEach((function(e) {
                    m[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1)
                }));
                var b = /[\-:]([a-z])/g;

                function y(e) {
                    return e[1].toUpperCase()
                }

                function g(e, t, n, r) {
                    var a = m.hasOwnProperty(t) ? m[t] : null;
                    (null !== a ? 0 !== a.type : r || !(2 < t.length) || "o" !== t[0] && "O" !== t[0] || "n" !== t[1] && "N" !== t[1]) && (function(e, t, n, r) {
                        if (null === t || "undefined" === typeof t || function(e, t, n, r) {
                                if (null !== n && 0 === n.type) return !1;
                                switch (typeof t) {
                                    case "function":
                                    case "symbol":
                                        return !0;
                                    case "boolean":
                                        return !r && (null !== n ? !n.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
                                    default:
                                        return !1
                                }
                            }(e, t, n, r)) return !0;
                        if (r) return !1;
                        if (null !== n) switch (n.type) {
                            case 3:
                                return !t;
                            case 4:
                                return !1 === t;
                            case 5:
                                return isNaN(t);
                            case 6:
                                return isNaN(t) || 1 > t
                        }
                        return !1
                    }(t, n, a, r) && (n = null), r || null === a ? function(e) {
                        return !!f.call(h, e) || !f.call(p, e) && (d.test(e) ? h[e] = !0 : (p[e] = !0, !1))
                    }(t) && (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = null === n ? 3 !== a.type && "" : n : (t = a.attributeName, r = a.attributeNamespace, null === n ? e.removeAttribute(t) : (n = 3 === (a = a.type) || 4 === a && !0 === n ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
                }
                "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e) {
                    var t = e.replace(b, y);
                    m[t] = new v(t, 1, !1, e, null, !1, !1)
                })), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e) {
                    var t = e.replace(b, y);
                    m[t] = new v(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
                })), ["xml:base", "xml:lang", "xml:space"].forEach((function(e) {
                    var t = e.replace(b, y);
                    m[t] = new v(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
                })), ["tabIndex", "crossOrigin"].forEach((function(e) {
                    m[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1)
                })), m.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach((function(e) {
                    m[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0)
                }));
                var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
                    x = Symbol.for("react.element"),
                    k = Symbol.for("react.portal"),
                    S = Symbol.for("react.fragment"),
                    _ = Symbol.for("react.strict_mode"),
                    E = Symbol.for("react.profiler"),
                    C = Symbol.for("react.provider"),
                    j = Symbol.for("react.context"),
                    P = Symbol.for("react.forward_ref"),
                    T = Symbol.for("react.suspense"),
                    M = Symbol.for("react.suspense_list"),
                    D = Symbol.for("react.memo"),
                    N = Symbol.for("react.lazy");
                Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
                var R = Symbol.for("react.offscreen");
                Symbol.for("react.legacy_hidden"), Symbol.for("react.cache"), Symbol.for("react.tracing_marker");
                var O = Symbol.iterator;

                function L(e) {
                    return null === e || "object" !== typeof e ? null : "function" === typeof(e = O && e[O] || e["@@iterator"]) ? e : null
                }
                var F, A = Object.assign;

                function I(e) {
                    if (void 0 === F) try {
                        throw Error()
                    } catch (n) {
                        var t = n.stack.trim().match(/\n( *(at )?)/);
                        F = t && t[1] || ""
                    }
                    return "\n" + F + e
                }
                var z = !1;

                function U(e, t) {
                    if (!e || z) return "";
                    z = !0;
                    var n = Error.prepareStackTrace;
                    Error.prepareStackTrace = void 0;
                    try {
                        if (t)
                            if (t = function() {
                                    throw Error()
                                }, Object.defineProperty(t.prototype, "props", {
                                    set: function() {
                                        throw Error()
                                    }
                                }), "object" === typeof Reflect && Reflect.construct) {
                                try {
                                    Reflect.construct(t, [])
                                } catch (s) {
                                    var r = s
                                }
                                Reflect.construct(e, [], t)
                            } else {
                                try {
                                    t.call()
                                } catch (s) {
                                    r = s
                                }
                                e.call(t.prototype)
                            }
                        else {
                            try {
                                throw Error()
                            } catch (s) {
                                r = s
                            }
                            e()
                        }
                    } catch (s) {
                        if (s && r && "string" === typeof s.stack) {
                            for (var a = s.stack.split("\n"), o = r.stack.split("\n"), i = a.length - 1, u = o.length - 1; 1 <= i && 0 <= u && a[i] !== o[u];) u--;
                            for (; 1 <= i && 0 <= u; i--, u--)
                                if (a[i] !== o[u]) {
                                    if (1 !== i || 1 !== u)
                                        do {
                                            if (i--, 0 > --u || a[i] !== o[u]) {
                                                var l = "\n" + a[i].replace(" at new ", " at ");
                                                return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l
                                            }
                                        } while (1 <= i && 0 <= u);
                                    break
                                }
                        }
                    } finally {
                        z = !1, Error.prepareStackTrace = n
                    }
                    return (e = e ? e.displayName || e.name : "") ? I(e) : ""
                }

                function B(e) {
                    switch (e.tag) {
                        case 5:
                            return I(e.type);
                        case 16:
                            return I("Lazy");
                        case 13:
                            return I("Suspense");
                        case 19:
                            return I("SuspenseList");
                        case 0:
                        case 2:
                        case 15:
                            return e = U(e.type, !1);
                        case 11:
                            return e = U(e.type.render, !1);
                        case 1:
                            return e = U(e.type, !0);
                        default:
                            return ""
                    }
                }

                function V(e) {
                    if (null == e) return null;
                    if ("function" === typeof e) return e.displayName || e.name || null;
                    if ("string" === typeof e) return e;
                    switch (e) {
                        case S:
                            return "Fragment";
                        case k:
                            return "Portal";
                        case E:
                            return "Profiler";
                        case _:
                            return "StrictMode";
                        case T:
                            return "Suspense";
                        case M:
                            return "SuspenseList"
                    }
                    if ("object" === typeof e) switch (e.$$typeof) {
                        case j:
                            return (e.displayName || "Context") + ".Consumer";
                        case C:
                            return (e._context.displayName || "Context") + ".Provider";
                        case P:
                            var t = e.render;
                            return (e = e.displayName) || (e = "" !== (e = t.displayName || t.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
                        case D:
                            return null !== (t = e.displayName || null) ? t : V(e.type) || "Memo";
                        case N:
                            t = e._payload, e = e._init;
                            try {
                                return V(e(t))
                            } catch (n) {}
                    }
                    return null
                }

                function H(e) {
                    var t = e.type;
                    switch (e.tag) {
                        case 24:
                            return "Cache";
                        case 9:
                            return (t.displayName || "Context") + ".Consumer";
                        case 10:
                            return (t._context.displayName || "Context") + ".Provider";
                        case 18:
                            return "DehydratedFragment";
                        case 11:
                            return e = (e = t.render).displayName || e.name || "", t.displayName || ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef");
                        case 7:
                            return "Fragment";
                        case 5:
                            return t;
                        case 4:
                            return "Portal";
                        case 3:
                            return "Root";
                        case 6:
                            return "Text";
                        case 16:
                            return V(t);
                        case 8:
                            return t === _ ? "StrictMode" : "Mode";
                        case 22:
                            return "Offscreen";
                        case 12:
                            return "Profiler";
                        case 21:
                            return "Scope";
                        case 13:
                            return "Suspense";
                        case 19:
                            return "SuspenseList";
                        case 25:
                            return "TracingMarker";
                        case 1:
                        case 0:
                        case 17:
                        case 2:
                        case 14:
                        case 15:
                            if ("function" === typeof t) return t.displayName || t.name || null;
                            if ("string" === typeof t) return t
                    }
                    return null
                }

                function W(e) {
                    switch (typeof e) {
                        case "boolean":
                        case "number":
                        case "string":
                        case "undefined":
                        case "object":
                            return e;
                        default:
                            return ""
                    }
                }

                function K(e) {
                    var t = e.type;
                    return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === t || "radio" === t)
                }

                function q(e) {
                    e._valueTracker || (e._valueTracker = function(e) {
                        var t = K(e) ? "checked" : "value",
                            n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                            r = "" + e[t];
                        if (!e.hasOwnProperty(t) && "undefined" !== typeof n && "function" === typeof n.get && "function" === typeof n.set) {
                            var a = n.get,
                                o = n.set;
                            return Object.defineProperty(e, t, {
                                configurable: !0,
                                get: function() {
                                    return a.call(this)
                                },
                                set: function(e) {
                                    r = "" + e, o.call(this, e)
                                }
                            }), Object.defineProperty(e, t, {
                                enumerable: n.enumerable
                            }), {
                                getValue: function() {
                                    return r
                                },
                                setValue: function(e) {
                                    r = "" + e
                                },
                                stopTracking: function() {
                                    e._valueTracker = null, delete e[t]
                                }
                            }
                        }
                    }(e))
                }

                function $(e) {
                    if (!e) return !1;
                    var t = e._valueTracker;
                    if (!t) return !0;
                    var n = t.getValue(),
                        r = "";
                    return e && (r = K(e) ? e.checked ? "true" : "false" : e.value), (e = r) !== n && (t.setValue(e), !0)
                }

                function G(e) {
                    if ("undefined" === typeof(e = e || ("undefined" !== typeof document ? document : void 0))) return null;
                    try {
                        return e.activeElement || e.body
                    } catch (t) {
                        return e.body
                    }
                }

                function Q(e, t) {
                    var n = t.checked;
                    return A({}, t, {
                        defaultChecked: void 0,
                        defaultValue: void 0,
                        value: void 0,
                        checked: null != n ? n : e._wrapperState.initialChecked
                    })
                }

                function Y(e, t) {
                    var n = null == t.defaultValue ? "" : t.defaultValue,
                        r = null != t.checked ? t.checked : t.defaultChecked;
                    n = W(null != t.value ? t.value : n), e._wrapperState = {
                        initialChecked: r,
                        initialValue: n,
                        controlled: "checkbox" === t.type || "radio" === t.type ? null != t.checked : null != t.value
                    }
                }

                function Z(e, t) {
                    null != (t = t.checked) && g(e, "checked", t, !1)
                }

                function X(e, t) {
                    Z(e, t);
                    var n = W(t.value),
                        r = t.type;
                    if (null != n) "number" === r ? (0 === n && "" === e.value || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
                    else if ("submit" === r || "reset" === r) return void e.removeAttribute("value");
                    t.hasOwnProperty("value") ? ee(e, t.type, n) : t.hasOwnProperty("defaultValue") && ee(e, t.type, W(t.defaultValue)), null == t.checked && null != t.defaultChecked && (e.defaultChecked = !!t.defaultChecked)
                }

                function J(e, t, n) {
                    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
                        var r = t.type;
                        if (!("submit" !== r && "reset" !== r || void 0 !== t.value && null !== t.value)) return;
                        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
                    }
                    "" !== (n = e.name) && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, "" !== n && (e.name = n)
                }

                function ee(e, t, n) {
                    "number" === t && G(e.ownerDocument) === e || (null == n ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
                }
                var te = Array.isArray;

                function ne(e, t, n, r) {
                    if (e = e.options, t) {
                        t = {};
                        for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
                        for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0)
                    } else {
                        for (n = "" + W(n), t = null, a = 0; a < e.length; a++) {
                            if (e[a].value === n) return e[a].selected = !0, void(r && (e[a].defaultSelected = !0));
                            null !== t || e[a].disabled || (t = e[a])
                        }
                        null !== t && (t.selected = !0)
                    }
                }

                function re(e, t) {
                    if (null != t.dangerouslySetInnerHTML) throw Error(o(91));
                    return A({}, t, {
                        value: void 0,
                        defaultValue: void 0,
                        children: "" + e._wrapperState.initialValue
                    })
                }

                function ae(e, t) {
                    var n = t.value;
                    if (null == n) {
                        if (n = t.children, t = t.defaultValue, null != n) {
                            if (null != t) throw Error(o(92));
                            if (te(n)) {
                                if (1 < n.length) throw Error(o(93));
                                n = n[0]
                            }
                            t = n
                        }
                        null == t && (t = ""), n = t
                    }
                    e._wrapperState = {
                        initialValue: W(n)
                    }
                }

                function oe(e, t) {
                    var n = W(t.value),
                        r = W(t.defaultValue);
                    null != n && ((n = "" + n) !== e.value && (e.value = n), null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)), null != r && (e.defaultValue = "" + r)
                }

                function ie(e) {
                    var t = e.textContent;
                    t === e._wrapperState.initialValue && "" !== t && null !== t && (e.value = t)
                }

                function ue(e) {
                    switch (e) {
                        case "svg":
                            return "http://www.w3.org/2000/svg";
                        case "math":
                            return "http://www.w3.org/1998/Math/MathML";
                        default:
                            return "http://www.w3.org/1999/xhtml"
                    }
                }

                function le(e, t) {
                    return null == e || "http://www.w3.org/1999/xhtml" === e ? ue(t) : "http://www.w3.org/2000/svg" === e && "foreignObject" === t ? "http://www.w3.org/1999/xhtml" : e
                }
                var se, ce, fe = (ce = function(e, t) {
                    if ("http://www.w3.org/2000/svg" !== e.namespaceURI || "innerHTML" in e) e.innerHTML = t;
                    else {
                        for ((se = se || document.createElement("div")).innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = se.firstChild; e.firstChild;) e.removeChild(e.firstChild);
                        for (; t.firstChild;) e.appendChild(t.firstChild)
                    }
                }, "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(e, t, n, r) {
                    MSApp.execUnsafeLocalFunction((function() {
                        return ce(e, t)
                    }))
                } : ce);

                function de(e, t) {
                    if (t) {
                        var n = e.firstChild;
                        if (n && n === e.lastChild && 3 === n.nodeType) return void(n.nodeValue = t)
                    }
                    e.textContent = t
                }
                var pe = {
                        animationIterationCount: !0,
                        aspectRatio: !0,
                        borderImageOutset: !0,
                        borderImageSlice: !0,
                        borderImageWidth: !0,
                        boxFlex: !0,
                        boxFlexGroup: !0,
                        boxOrdinalGroup: !0,
                        columnCount: !0,
                        columns: !0,
                        flex: !0,
                        flexGrow: !0,
                        flexPositive: !0,
                        flexShrink: !0,
                        flexNegative: !0,
                        flexOrder: !0,
                        gridArea: !0,
                        gridRow: !0,
                        gridRowEnd: !0,
                        gridRowSpan: !0,
                        gridRowStart: !0,
                        gridColumn: !0,
                        gridColumnEnd: !0,
                        gridColumnSpan: !0,
                        gridColumnStart: !0,
                        fontWeight: !0,
                        lineClamp: !0,
                        lineHeight: !0,
                        opacity: !0,
                        order: !0,
                        orphans: !0,
                        tabSize: !0,
                        widows: !0,
                        zIndex: !0,
                        zoom: !0,
                        fillOpacity: !0,
                        floodOpacity: !0,
                        stopOpacity: !0,
                        strokeDasharray: !0,
                        strokeDashoffset: !0,
                        strokeMiterlimit: !0,
                        strokeOpacity: !0,
                        strokeWidth: !0
                    },
                    he = ["Webkit", "ms", "Moz", "O"];

                function ve(e, t, n) {
                    return null == t || "boolean" === typeof t || "" === t ? "" : n || "number" !== typeof t || 0 === t || pe.hasOwnProperty(e) && pe[e] ? ("" + t).trim() : t + "px"
                }

                function me(e, t) {
                    for (var n in e = e.style, t)
                        if (t.hasOwnProperty(n)) {
                            var r = 0 === n.indexOf("--"),
                                a = ve(n, t[n], r);
                            "float" === n && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a
                        }
                }
                Object.keys(pe).forEach((function(e) {
                    he.forEach((function(t) {
                        t = t + e.charAt(0).toUpperCase() + e.substring(1), pe[t] = pe[e]
                    }))
                }));
                var be = A({
                    menuitem: !0
                }, {
                    area: !0,
                    base: !0,
                    br: !0,
                    col: !0,
                    embed: !0,
                    hr: !0,
                    img: !0,
                    input: !0,
                    keygen: !0,
                    link: !0,
                    meta: !0,
                    param: !0,
                    source: !0,
                    track: !0,
                    wbr: !0
                });

                function ye(e, t) {
                    if (t) {
                        if (be[e] && (null != t.children || null != t.dangerouslySetInnerHTML)) throw Error(o(137, e));
                        if (null != t.dangerouslySetInnerHTML) {
                            if (null != t.children) throw Error(o(60));
                            if ("object" !== typeof t.dangerouslySetInnerHTML || !("__html" in t.dangerouslySetInnerHTML)) throw Error(o(61))
                        }
                        if (null != t.style && "object" !== typeof t.style) throw Error(o(62))
                    }
                }

                function ge(e, t) {
                    if (-1 === e.indexOf("-")) return "string" === typeof t.is;
                    switch (e) {
                        case "annotation-xml":
                        case "color-profile":
                        case "font-face":
                        case "font-face-src":
                        case "font-face-uri":
                        case "font-face-format":
                        case "font-face-name":
                        case "missing-glyph":
                            return !1;
                        default:
                            return !0
                    }
                }
                var we = null;

                function xe(e) {
                    return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement), 3 === e.nodeType ? e.parentNode : e
                }
                var ke = null,
                    Se = null,
                    _e = null;

                function Ee(e) {
                    if (e = ga(e)) {
                        if ("function" !== typeof ke) throw Error(o(280));
                        var t = e.stateNode;
                        t && (t = xa(t), ke(e.stateNode, e.type, t))
                    }
                }

                function Ce(e) {
                    Se ? _e ? _e.push(e) : _e = [e] : Se = e
                }

                function je() {
                    if (Se) {
                        var e = Se,
                            t = _e;
                        if (_e = Se = null, Ee(e), t)
                            for (e = 0; e < t.length; e++) Ee(t[e])
                    }
                }

                function Pe(e, t) {
                    return e(t)
                }

                function Te() {}
                var Me = !1;

                function De(e, t, n) {
                    if (Me) return e(t, n);
                    Me = !0;
                    try {
                        return Pe(e, t, n)
                    } finally {
                        Me = !1, (null !== Se || null !== _e) && (Te(), je())
                    }
                }

                function Ne(e, t) {
                    var n = e.stateNode;
                    if (null === n) return null;
                    var r = xa(n);
                    if (null === r) return null;
                    n = r[t];
                    e: switch (t) {
                        case "onClick":
                        case "onClickCapture":
                        case "onDoubleClick":
                        case "onDoubleClickCapture":
                        case "onMouseDown":
                        case "onMouseDownCapture":
                        case "onMouseMove":
                        case "onMouseMoveCapture":
                        case "onMouseUp":
                        case "onMouseUpCapture":
                        case "onMouseEnter":
                            (r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)), e = !r;
                            break e;
                        default:
                            e = !1
                    }
                    if (e) return null;
                    if (n && "function" !== typeof n) throw Error(o(231, t, typeof n));
                    return n
                }
                var Re = !1;
                if (c) try {
                    var Oe = {};
                    Object.defineProperty(Oe, "passive", {
                        get: function() {
                            Re = !0
                        }
                    }), window.addEventListener("test", Oe, Oe), window.removeEventListener("test", Oe, Oe)
                } catch (ce) {
                    Re = !1
                }

                function Le(e, t, n, r, a, o, i, u, l) {
                    var s = Array.prototype.slice.call(arguments, 3);
                    try {
                        t.apply(n, s)
                    } catch (c) {
                        this.onError(c)
                    }
                }
                var Fe = !1,
                    Ae = null,
                    Ie = !1,
                    ze = null,
                    Ue = {
                        onError: function(e) {
                            Fe = !0, Ae = e
                        }
                    };

                function Be(e, t, n, r, a, o, i, u, l) {
                    Fe = !1, Ae = null, Le.apply(Ue, arguments)
                }

                function Ve(e) {
                    var t = e,
                        n = e;
                    if (e.alternate)
                        for (; t.return;) t = t.return;
                    else {
                        e = t;
                        do {
                            0 !== (4098 & (t = e).flags) && (n = t.return), e = t.return
                        } while (e)
                    }
                    return 3 === t.tag ? n : null
                }

                function He(e) {
                    if (13 === e.tag) {
                        var t = e.memoizedState;
                        if (null === t && (null !== (e = e.alternate) && (t = e.memoizedState)), null !== t) return t.dehydrated
                    }
                    return null
                }

                function We(e) {
                    if (Ve(e) !== e) throw Error(o(188))
                }

                function Ke(e) {
                    return null !== (e = function(e) {
                        var t = e.alternate;
                        if (!t) {
                            if (null === (t = Ve(e))) throw Error(o(188));
                            return t !== e ? null : e
                        }
                        for (var n = e, r = t;;) {
                            var a = n.return;
                            if (null === a) break;
                            var i = a.alternate;
                            if (null === i) {
                                if (null !== (r = a.return)) {
                                    n = r;
                                    continue
                                }
                                break
                            }
                            if (a.child === i.child) {
                                for (i = a.child; i;) {
                                    if (i === n) return We(a), e;
                                    if (i === r) return We(a), t;
                                    i = i.sibling
                                }
                                throw Error(o(188))
                            }
                            if (n.return !== r.return) n = a, r = i;
                            else {
                                for (var u = !1, l = a.child; l;) {
                                    if (l === n) {
                                        u = !0, n = a, r = i;
                                        break
                                    }
                                    if (l === r) {
                                        u = !0, r = a, n = i;
                                        break
                                    }
                                    l = l.sibling
                                }
                                if (!u) {
                                    for (l = i.child; l;) {
                                        if (l === n) {
                                            u = !0, n = i, r = a;
                                            break
                                        }
                                        if (l === r) {
                                            u = !0, r = i, n = a;
                                            break
                                        }
                                        l = l.sibling
                                    }
                                    if (!u) throw Error(o(189))
                                }
                            }
                            if (n.alternate !== r) throw Error(o(190))
                        }
                        if (3 !== n.tag) throw Error(o(188));
                        return n.stateNode.current === n ? e : t
                    }(e)) ? qe(e) : null
                }

                function qe(e) {
                    if (5 === e.tag || 6 === e.tag) return e;
                    for (e = e.child; null !== e;) {
                        var t = qe(e);
                        if (null !== t) return t;
                        e = e.sibling
                    }
                    return null
                }
                var $e = a.unstable_scheduleCallback,
                    Ge = a.unstable_cancelCallback,
                    Qe = a.unstable_shouldYield,
                    Ye = a.unstable_requestPaint,
                    Ze = a.unstable_now,
                    Xe = a.unstable_getCurrentPriorityLevel,
                    Je = a.unstable_ImmediatePriority,
                    et = a.unstable_UserBlockingPriority,
                    tt = a.unstable_NormalPriority,
                    nt = a.unstable_LowPriority,
                    rt = a.unstable_IdlePriority,
                    at = null,
                    ot = null;
                var it = Math.clz32 ? Math.clz32 : function(e) {
                        return e >>>= 0, 0 === e ? 32 : 31 - (ut(e) / lt | 0) | 0
                    },
                    ut = Math.log,
                    lt = Math.LN2;
                var st = 64,
                    ct = 4194304;

                function ft(e) {
                    switch (e & -e) {
                        case 1:
                            return 1;
                        case 2:
                            return 2;
                        case 4:
                            return 4;
                        case 8:
                            return 8;
                        case 16:
                            return 16;
                        case 32:
                            return 32;
                        case 64:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                            return 4194240 & e;
                        case 4194304:
                        case 8388608:
                        case 16777216:
                        case 33554432:
                        case 67108864:
                            return 130023424 & e;
                        case 134217728:
                            return 134217728;
                        case 268435456:
                            return 268435456;
                        case 536870912:
                            return 536870912;
                        case 1073741824:
                            return 1073741824;
                        default:
                            return e
                    }
                }

                function dt(e, t) {
                    var n = e.pendingLanes;
                    if (0 === n) return 0;
                    var r = 0,
                        a = e.suspendedLanes,
                        o = e.pingedLanes,
                        i = 268435455 & n;
                    if (0 !== i) {
                        var u = i & ~a;
                        0 !== u ? r = ft(u) : 0 !== (o &= i) && (r = ft(o))
                    } else 0 !== (i = n & ~a) ? r = ft(i) : 0 !== o && (r = ft(o));
                    if (0 === r) return 0;
                    if (0 !== t && t !== r && 0 === (t & a) && ((a = r & -r) >= (o = t & -t) || 16 === a && 0 !== (4194240 & o))) return t;
                    if (0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes))
                        for (e = e.entanglements, t &= r; 0 < t;) a = 1 << (n = 31 - it(t)), r |= e[n], t &= ~a;
                    return r
                }

                function pt(e, t) {
                    switch (e) {
                        case 1:
                        case 2:
                        case 4:
                            return t + 250;
                        case 8:
                        case 16:
                        case 32:
                        case 64:
                        case 128:
                        case 256:
                        case 512:
                        case 1024:
                        case 2048:
                        case 4096:
                        case 8192:
                        case 16384:
                        case 32768:
                        case 65536:
                        case 131072:
                        case 262144:
                        case 524288:
                        case 1048576:
                        case 2097152:
                            return t + 5e3;
                        default:
                            return -1
                    }
                }

                function ht(e) {
                    return 0 !== (e = -1073741825 & e.pendingLanes) ? e : 1073741824 & e ? 1073741824 : 0
                }

                function vt() {
                    var e = st;
                    return 0 === (4194240 & (st <<= 1)) && (st = 64), e
                }

                function mt(e) {
                    for (var t = [], n = 0; 31 > n; n++) t.push(e);
                    return t
                }

                function bt(e, t, n) {
                    e.pendingLanes |= t, 536870912 !== t && (e.suspendedLanes = 0, e.pingedLanes = 0), (e = e.eventTimes)[t = 31 - it(t)] = n
                }

                function yt(e, t) {
                    var n = e.entangledLanes |= t;
                    for (e = e.entanglements; n;) {
                        var r = 31 - it(n),
                            a = 1 << r;
                        a & t | e[r] & t && (e[r] |= t), n &= ~a
                    }
                }
                var gt = 0;

                function wt(e) {
                    return 1 < (e &= -e) ? 4 < e ? 0 !== (268435455 & e) ? 16 : 536870912 : 4 : 1
                }
                var xt, kt, St, _t, Et, Ct = !1,
                    jt = [],
                    Pt = null,
                    Tt = null,
                    Mt = null,
                    Dt = new Map,
                    Nt = new Map,
                    Rt = [],
                    Ot = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

                function Lt(e, t) {
                    switch (e) {
                        case "focusin":
                        case "focusout":
                            Pt = null;
                            break;
                        case "dragenter":
                        case "dragleave":
                            Tt = null;
                            break;
                        case "mouseover":
                        case "mouseout":
                            Mt = null;
                            break;
                        case "pointerover":
                        case "pointerout":
                            Dt.delete(t.pointerId);
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                            Nt.delete(t.pointerId)
                    }
                }

                function Ft(e, t, n, r, a, o) {
                    return null === e || e.nativeEvent !== o ? (e = {
                        blockedOn: t,
                        domEventName: n,
                        eventSystemFlags: r,
                        nativeEvent: o,
                        targetContainers: [a]
                    }, null !== t && (null !== (t = ga(t)) && kt(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, null !== a && -1 === t.indexOf(a) && t.push(a), e)
                }

                function At(e) {
                    var t = ya(e.target);
                    if (null !== t) {
                        var n = Ve(t);
                        if (null !== n)
                            if (13 === (t = n.tag)) {
                                if (null !== (t = He(n))) return e.blockedOn = t, void Et(e.priority, (function() {
                                    St(n)
                                }))
                            } else if (3 === t && n.stateNode.current.memoizedState.isDehydrated) return void(e.blockedOn = 3 === n.tag ? n.stateNode.containerInfo : null)
                    }
                    e.blockedOn = null
                }

                function It(e) {
                    if (null !== e.blockedOn) return !1;
                    for (var t = e.targetContainers; 0 < t.length;) {
                        var n = Qt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
                        if (null !== n) return null !== (t = ga(n)) && kt(t), e.blockedOn = n, !1;
                        var r = new(n = e.nativeEvent).constructor(n.type, n);
                        we = r, n.target.dispatchEvent(r), we = null, t.shift()
                    }
                    return !0
                }

                function zt(e, t, n) {
                    It(e) && n.delete(t)
                }

                function Ut() {
                    Ct = !1, null !== Pt && It(Pt) && (Pt = null), null !== Tt && It(Tt) && (Tt = null), null !== Mt && It(Mt) && (Mt = null), Dt.forEach(zt), Nt.forEach(zt)
                }

                function Bt(e, t) {
                    e.blockedOn === t && (e.blockedOn = null, Ct || (Ct = !0, a.unstable_scheduleCallback(a.unstable_NormalPriority, Ut)))
                }

                function Vt(e) {
                    function t(t) {
                        return Bt(t, e)
                    }
                    if (0 < jt.length) {
                        Bt(jt[0], e);
                        for (var n = 1; n < jt.length; n++) {
                            var r = jt[n];
                            r.blockedOn === e && (r.blockedOn = null)
                        }
                    }
                    for (null !== Pt && Bt(Pt, e), null !== Tt && Bt(Tt, e), null !== Mt && Bt(Mt, e), Dt.forEach(t), Nt.forEach(t), n = 0; n < Rt.length; n++)(r = Rt[n]).blockedOn === e && (r.blockedOn = null);
                    for (; 0 < Rt.length && null === (n = Rt[0]).blockedOn;) At(n), null === n.blockedOn && Rt.shift()
                }
                var Ht = w.ReactCurrentBatchConfig,
                    Wt = !0;

                function Kt(e, t, n, r) {
                    var a = gt,
                        o = Ht.transition;
                    Ht.transition = null;
                    try {
                        gt = 1, $t(e, t, n, r)
                    } finally {
                        gt = a, Ht.transition = o
                    }
                }

                function qt(e, t, n, r) {
                    var a = gt,
                        o = Ht.transition;
                    Ht.transition = null;
                    try {
                        gt = 4, $t(e, t, n, r)
                    } finally {
                        gt = a, Ht.transition = o
                    }
                }

                function $t(e, t, n, r) {
                    if (Wt) {
                        var a = Qt(e, t, n, r);
                        if (null === a) Wr(e, t, r, Gt, n), Lt(e, r);
                        else if (function(e, t, n, r, a) {
                                switch (t) {
                                    case "focusin":
                                        return Pt = Ft(Pt, e, t, n, r, a), !0;
                                    case "dragenter":
                                        return Tt = Ft(Tt, e, t, n, r, a), !0;
                                    case "mouseover":
                                        return Mt = Ft(Mt, e, t, n, r, a), !0;
                                    case "pointerover":
                                        var o = a.pointerId;
                                        return Dt.set(o, Ft(Dt.get(o) || null, e, t, n, r, a)), !0;
                                    case "gotpointercapture":
                                        return o = a.pointerId, Nt.set(o, Ft(Nt.get(o) || null, e, t, n, r, a)), !0
                                }
                                return !1
                            }(a, e, t, n, r)) r.stopPropagation();
                        else if (Lt(e, r), 4 & t && -1 < Ot.indexOf(e)) {
                            for (; null !== a;) {
                                var o = ga(a);
                                if (null !== o && xt(o), null === (o = Qt(e, t, n, r)) && Wr(e, t, r, Gt, n), o === a) break;
                                a = o
                            }
                            null !== a && r.stopPropagation()
                        } else Wr(e, t, r, null, n)
                    }
                }
                var Gt = null;

                function Qt(e, t, n, r) {
                    if (Gt = null, null !== (e = ya(e = xe(r))))
                        if (null === (t = Ve(e))) e = null;
                        else if (13 === (n = t.tag)) {
                        if (null !== (e = He(t))) return e;
                        e = null
                    } else if (3 === n) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return 3 === t.tag ? t.stateNode.containerInfo : null;
                        e = null
                    } else t !== e && (e = null);
                    return Gt = e, null
                }

                function Yt(e) {
                    switch (e) {
                        case "cancel":
                        case "click":
                        case "close":
                        case "contextmenu":
                        case "copy":
                        case "cut":
                        case "auxclick":
                        case "dblclick":
                        case "dragend":
                        case "dragstart":
                        case "drop":
                        case "focusin":
                        case "focusout":
                        case "input":
                        case "invalid":
                        case "keydown":
                        case "keypress":
                        case "keyup":
                        case "mousedown":
                        case "mouseup":
                        case "paste":
                        case "pause":
                        case "play":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointerup":
                        case "ratechange":
                        case "reset":
                        case "resize":
                        case "seeked":
                        case "submit":
                        case "touchcancel":
                        case "touchend":
                        case "touchstart":
                        case "volumechange":
                        case "change":
                        case "selectionchange":
                        case "textInput":
                        case "compositionstart":
                        case "compositionend":
                        case "compositionupdate":
                        case "beforeblur":
                        case "afterblur":
                        case "beforeinput":
                        case "blur":
                        case "fullscreenchange":
                        case "focus":
                        case "hashchange":
                        case "popstate":
                        case "select":
                        case "selectstart":
                            return 1;
                        case "drag":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "mousemove":
                        case "mouseout":
                        case "mouseover":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "scroll":
                        case "toggle":
                        case "touchmove":
                        case "wheel":
                        case "mouseenter":
                        case "mouseleave":
                        case "pointerenter":
                        case "pointerleave":
                            return 4;
                        case "message":
                            switch (Xe()) {
                                case Je:
                                    return 1;
                                case et:
                                    return 4;
                                case tt:
                                case nt:
                                    return 16;
                                case rt:
                                    return 536870912;
                                default:
                                    return 16
                            }
                        default:
                            return 16
                    }
                }
                var Zt = null,
                    Xt = null,
                    Jt = null;

                function en() {
                    if (Jt) return Jt;
                    var e, t, n = Xt,
                        r = n.length,
                        a = "value" in Zt ? Zt.value : Zt.textContent,
                        o = a.length;
                    for (e = 0; e < r && n[e] === a[e]; e++);
                    var i = r - e;
                    for (t = 1; t <= i && n[r - t] === a[o - t]; t++);
                    return Jt = a.slice(e, 1 < t ? 1 - t : void 0)
                }

                function tn(e) {
                    var t = e.keyCode;
                    return "charCode" in e ? 0 === (e = e.charCode) && 13 === t && (e = 13) : e = t, 10 === e && (e = 13), 32 <= e || 13 === e ? e : 0
                }

                function nn() {
                    return !0
                }

                function rn() {
                    return !1
                }

                function an(e) {
                    function t(t, n, r, a, o) {
                        for (var i in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = a, this.target = o, this.currentTarget = null, e) e.hasOwnProperty(i) && (t = e[i], this[i] = t ? t(a) : a[i]);
                        return this.isDefaultPrevented = (null != a.defaultPrevented ? a.defaultPrevented : !1 === a.returnValue) ? nn : rn, this.isPropagationStopped = rn, this
                    }
                    return A(t.prototype, {
                        preventDefault: function() {
                            this.defaultPrevented = !0;
                            var e = this.nativeEvent;
                            e && (e.preventDefault ? e.preventDefault() : "unknown" !== typeof e.returnValue && (e.returnValue = !1), this.isDefaultPrevented = nn)
                        },
                        stopPropagation: function() {
                            var e = this.nativeEvent;
                            e && (e.stopPropagation ? e.stopPropagation() : "unknown" !== typeof e.cancelBubble && (e.cancelBubble = !0), this.isPropagationStopped = nn)
                        },
                        persist: function() {},
                        isPersistent: nn
                    }), t
                }
                var on, un, ln, sn = {
                        eventPhase: 0,
                        bubbles: 0,
                        cancelable: 0,
                        timeStamp: function(e) {
                            return e.timeStamp || Date.now()
                        },
                        defaultPrevented: 0,
                        isTrusted: 0
                    },
                    cn = an(sn),
                    fn = A({}, sn, {
                        view: 0,
                        detail: 0
                    }),
                    dn = an(fn),
                    pn = A({}, fn, {
                        screenX: 0,
                        screenY: 0,
                        clientX: 0,
                        clientY: 0,
                        pageX: 0,
                        pageY: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        altKey: 0,
                        metaKey: 0,
                        getModifierState: En,
                        button: 0,
                        buttons: 0,
                        relatedTarget: function(e) {
                            return void 0 === e.relatedTarget ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
                        },
                        movementX: function(e) {
                            return "movementX" in e ? e.movementX : (e !== ln && (ln && "mousemove" === e.type ? (on = e.screenX - ln.screenX, un = e.screenY - ln.screenY) : un = on = 0, ln = e), on)
                        },
                        movementY: function(e) {
                            return "movementY" in e ? e.movementY : un
                        }
                    }),
                    hn = an(pn),
                    vn = an(A({}, pn, {
                        dataTransfer: 0
                    })),
                    mn = an(A({}, fn, {
                        relatedTarget: 0
                    })),
                    bn = an(A({}, sn, {
                        animationName: 0,
                        elapsedTime: 0,
                        pseudoElement: 0
                    })),
                    yn = A({}, sn, {
                        clipboardData: function(e) {
                            return "clipboardData" in e ? e.clipboardData : window.clipboardData
                        }
                    }),
                    gn = an(yn),
                    wn = an(A({}, sn, {
                        data: 0
                    })),
                    xn = {
                        Esc: "Escape",
                        Spacebar: " ",
                        Left: "ArrowLeft",
                        Up: "ArrowUp",
                        Right: "ArrowRight",
                        Down: "ArrowDown",
                        Del: "Delete",
                        Win: "OS",
                        Menu: "ContextMenu",
                        Apps: "ContextMenu",
                        Scroll: "ScrollLock",
                        MozPrintableKey: "Unidentified"
                    },
                    kn = {
                        8: "Backspace",
                        9: "Tab",
                        12: "Clear",
                        13: "Enter",
                        16: "Shift",
                        17: "Control",
                        18: "Alt",
                        19: "Pause",
                        20: "CapsLock",
                        27: "Escape",
                        32: " ",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "ArrowLeft",
                        38: "ArrowUp",
                        39: "ArrowRight",
                        40: "ArrowDown",
                        45: "Insert",
                        46: "Delete",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "NumLock",
                        145: "ScrollLock",
                        224: "Meta"
                    },
                    Sn = {
                        Alt: "altKey",
                        Control: "ctrlKey",
                        Meta: "metaKey",
                        Shift: "shiftKey"
                    };

                function _n(e) {
                    var t = this.nativeEvent;
                    return t.getModifierState ? t.getModifierState(e) : !!(e = Sn[e]) && !!t[e]
                }

                function En() {
                    return _n
                }
                var Cn = A({}, fn, {
                        key: function(e) {
                            if (e.key) {
                                var t = xn[e.key] || e.key;
                                if ("Unidentified" !== t) return t
                            }
                            return "keypress" === e.type ? 13 === (e = tn(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? kn[e.keyCode] || "Unidentified" : ""
                        },
                        code: 0,
                        location: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        altKey: 0,
                        metaKey: 0,
                        repeat: 0,
                        locale: 0,
                        getModifierState: En,
                        charCode: function(e) {
                            return "keypress" === e.type ? tn(e) : 0
                        },
                        keyCode: function(e) {
                            return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                        },
                        which: function(e) {
                            return "keypress" === e.type ? tn(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0
                        }
                    }),
                    jn = an(Cn),
                    Pn = an(A({}, pn, {
                        pointerId: 0,
                        width: 0,
                        height: 0,
                        pressure: 0,
                        tangentialPressure: 0,
                        tiltX: 0,
                        tiltY: 0,
                        twist: 0,
                        pointerType: 0,
                        isPrimary: 0
                    })),
                    Tn = an(A({}, fn, {
                        touches: 0,
                        targetTouches: 0,
                        changedTouches: 0,
                        altKey: 0,
                        metaKey: 0,
                        ctrlKey: 0,
                        shiftKey: 0,
                        getModifierState: En
                    })),
                    Mn = an(A({}, sn, {
                        propertyName: 0,
                        elapsedTime: 0,
                        pseudoElement: 0
                    })),
                    Dn = A({}, pn, {
                        deltaX: function(e) {
                            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
                        },
                        deltaY: function(e) {
                            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
                        },
                        deltaZ: 0,
                        deltaMode: 0
                    }),
                    Nn = an(Dn),
                    Rn = [9, 13, 27, 32],
                    On = c && "CompositionEvent" in window,
                    Ln = null;
                c && "documentMode" in document && (Ln = document.documentMode);
                var Fn = c && "TextEvent" in window && !Ln,
                    An = c && (!On || Ln && 8 < Ln && 11 >= Ln),
                    In = String.fromCharCode(32),
                    zn = !1;

                function Un(e, t) {
                    switch (e) {
                        case "keyup":
                            return -1 !== Rn.indexOf(t.keyCode);
                        case "keydown":
                            return 229 !== t.keyCode;
                        case "keypress":
                        case "mousedown":
                        case "focusout":
                            return !0;
                        default:
                            return !1
                    }
                }

                function Bn(e) {
                    return "object" === typeof(e = e.detail) && "data" in e ? e.data : null
                }
                var Vn = !1;
                var Hn = {
                    color: !0,
                    date: !0,
                    datetime: !0,
                    "datetime-local": !0,
                    email: !0,
                    month: !0,
                    number: !0,
                    password: !0,
                    range: !0,
                    search: !0,
                    tel: !0,
                    text: !0,
                    time: !0,
                    url: !0,
                    week: !0
                };

                function Wn(e) {
                    var t = e && e.nodeName && e.nodeName.toLowerCase();
                    return "input" === t ? !!Hn[e.type] : "textarea" === t
                }

                function Kn(e, t, n, r) {
                    Ce(r), 0 < (t = qr(t, "onChange")).length && (n = new cn("onChange", "change", null, n, r), e.push({
                        event: n,
                        listeners: t
                    }))
                }
                var qn = null,
                    $n = null;

                function Gn(e) {
                    Ir(e, 0)
                }

                function Qn(e) {
                    if ($(wa(e))) return e
                }

                function Yn(e, t) {
                    if ("change" === e) return t
                }
                var Zn = !1;
                if (c) {
                    var Xn;
                    if (c) {
                        var Jn = "oninput" in document;
                        if (!Jn) {
                            var er = document.createElement("div");
                            er.setAttribute("oninput", "return;"), Jn = "function" === typeof er.oninput
                        }
                        Xn = Jn
                    } else Xn = !1;
                    Zn = Xn && (!document.documentMode || 9 < document.documentMode)
                }

                function tr() {
                    qn && (qn.detachEvent("onpropertychange", nr), $n = qn = null)
                }

                function nr(e) {
                    if ("value" === e.propertyName && Qn($n)) {
                        var t = [];
                        Kn(t, $n, e, xe(e)), De(Gn, t)
                    }
                }

                function rr(e, t, n) {
                    "focusin" === e ? (tr(), $n = n, (qn = t).attachEvent("onpropertychange", nr)) : "focusout" === e && tr()
                }

                function ar(e) {
                    if ("selectionchange" === e || "keyup" === e || "keydown" === e) return Qn($n)
                }

                function or(e, t) {
                    if ("click" === e) return Qn(t)
                }

                function ir(e, t) {
                    if ("input" === e || "change" === e) return Qn(t)
                }
                var ur = "function" === typeof Object.is ? Object.is : function(e, t) {
                    return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t
                };

                function lr(e, t) {
                    if (ur(e, t)) return !0;
                    if ("object" !== typeof e || null === e || "object" !== typeof t || null === t) return !1;
                    var n = Object.keys(e),
                        r = Object.keys(t);
                    if (n.length !== r.length) return !1;
                    for (r = 0; r < n.length; r++) {
                        var a = n[r];
                        if (!f.call(t, a) || !ur(e[a], t[a])) return !1
                    }
                    return !0
                }

                function sr(e) {
                    for (; e && e.firstChild;) e = e.firstChild;
                    return e
                }

                function cr(e, t) {
                    var n, r = sr(e);
                    for (e = 0; r;) {
                        if (3 === r.nodeType) {
                            if (n = e + r.textContent.length, e <= t && n >= t) return {
                                node: r,
                                offset: t - e
                            };
                            e = n
                        }
                        e: {
                            for (; r;) {
                                if (r.nextSibling) {
                                    r = r.nextSibling;
                                    break e
                                }
                                r = r.parentNode
                            }
                            r = void 0
                        }
                        r = sr(r)
                    }
                }

                function fr(e, t) {
                    return !(!e || !t) && (e === t || (!e || 3 !== e.nodeType) && (t && 3 === t.nodeType ? fr(e, t.parentNode) : "contains" in e ? e.contains(t) : !!e.compareDocumentPosition && !!(16 & e.compareDocumentPosition(t))))
                }

                function dr() {
                    for (var e = window, t = G(); t instanceof e.HTMLIFrameElement;) {
                        try {
                            var n = "string" === typeof t.contentWindow.location.href
                        } catch (r) {
                            n = !1
                        }
                        if (!n) break;
                        t = G((e = t.contentWindow).document)
                    }
                    return t
                }

                function pr(e) {
                    var t = e && e.nodeName && e.nodeName.toLowerCase();
                    return t && ("input" === t && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === t || "true" === e.contentEditable)
                }

                function hr(e) {
                    var t = dr(),
                        n = e.focusedElem,
                        r = e.selectionRange;
                    if (t !== n && n && n.ownerDocument && fr(n.ownerDocument.documentElement, n)) {
                        if (null !== r && pr(n))
                            if (t = r.start, void 0 === (e = r.end) && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
                            else if ((e = (t = n.ownerDocument || document) && t.defaultView || window).getSelection) {
                            e = e.getSelection();
                            var a = n.textContent.length,
                                o = Math.min(r.start, a);
                            r = void 0 === r.end ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = cr(n, o);
                            var i = cr(n, r);
                            a && i && (1 !== e.rangeCount || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && ((t = t.createRange()).setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)))
                        }
                        for (t = [], e = n; e = e.parentNode;) 1 === e.nodeType && t.push({
                            element: e,
                            left: e.scrollLeft,
                            top: e.scrollTop
                        });
                        for ("function" === typeof n.focus && n.focus(), n = 0; n < t.length; n++)(e = t[n]).element.scrollLeft = e.left, e.element.scrollTop = e.top
                    }
                }
                var vr = c && "documentMode" in document && 11 >= document.documentMode,
                    mr = null,
                    br = null,
                    yr = null,
                    gr = !1;

                function wr(e, t, n) {
                    var r = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
                    gr || null == mr || mr !== G(r) || ("selectionStart" in (r = mr) && pr(r) ? r = {
                        start: r.selectionStart,
                        end: r.selectionEnd
                    } : r = {
                        anchorNode: (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection()).anchorNode,
                        anchorOffset: r.anchorOffset,
                        focusNode: r.focusNode,
                        focusOffset: r.focusOffset
                    }, yr && lr(yr, r) || (yr = r, 0 < (r = qr(br, "onSelect")).length && (t = new cn("onSelect", "select", null, t, n), e.push({
                        event: t,
                        listeners: r
                    }), t.target = mr)))
                }

                function xr(e, t) {
                    var n = {};
                    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
                }
                var kr = {
                        animationend: xr("Animation", "AnimationEnd"),
                        animationiteration: xr("Animation", "AnimationIteration"),
                        animationstart: xr("Animation", "AnimationStart"),
                        transitionend: xr("Transition", "TransitionEnd")
                    },
                    Sr = {},
                    _r = {};

                function Er(e) {
                    if (Sr[e]) return Sr[e];
                    if (!kr[e]) return e;
                    var t, n = kr[e];
                    for (t in n)
                        if (n.hasOwnProperty(t) && t in _r) return Sr[e] = n[t];
                    return e
                }
                c && (_r = document.createElement("div").style, "AnimationEvent" in window || (delete kr.animationend.animation, delete kr.animationiteration.animation, delete kr.animationstart.animation), "TransitionEvent" in window || delete kr.transitionend.transition);
                var Cr = Er("animationend"),
                    jr = Er("animationiteration"),
                    Pr = Er("animationstart"),
                    Tr = Er("transitionend"),
                    Mr = new Map,
                    Dr = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

                function Nr(e, t) {
                    Mr.set(e, t), l(t, [e])
                }
                for (var Rr = 0; Rr < Dr.length; Rr++) {
                    var Or = Dr[Rr];
                    Nr(Or.toLowerCase(), "on" + (Or[0].toUpperCase() + Or.slice(1)))
                }
                Nr(Cr, "onAnimationEnd"), Nr(jr, "onAnimationIteration"), Nr(Pr, "onAnimationStart"), Nr("dblclick", "onDoubleClick"), Nr("focusin", "onFocus"), Nr("focusout", "onBlur"), Nr(Tr, "onTransitionEnd"), s("onMouseEnter", ["mouseout", "mouseover"]), s("onMouseLeave", ["mouseout", "mouseover"]), s("onPointerEnter", ["pointerout", "pointerover"]), s("onPointerLeave", ["pointerout", "pointerover"]), l("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), l("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), l("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), l("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
                var Lr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
                    Fr = new Set("cancel close invalid load scroll toggle".split(" ").concat(Lr));

                function Ar(e, t, n) {
                    var r = e.type || "unknown-event";
                    e.currentTarget = n,
                        function(e, t, n, r, a, i, u, l, s) {
                            if (Be.apply(this, arguments), Fe) {
                                if (!Fe) throw Error(o(198));
                                var c = Ae;
                                Fe = !1, Ae = null, Ie || (Ie = !0, ze = c)
                            }
                        }(r, t, void 0, e), e.currentTarget = null
                }

                function Ir(e, t) {
                    t = 0 !== (4 & t);
                    for (var n = 0; n < e.length; n++) {
                        var r = e[n],
                            a = r.event;
                        r = r.listeners;
                        e: {
                            var o = void 0;
                            if (t)
                                for (var i = r.length - 1; 0 <= i; i--) {
                                    var u = r[i],
                                        l = u.instance,
                                        s = u.currentTarget;
                                    if (u = u.listener, l !== o && a.isPropagationStopped()) break e;
                                    Ar(a, u, s), o = l
                                } else
                                    for (i = 0; i < r.length; i++) {
                                        if (l = (u = r[i]).instance, s = u.currentTarget, u = u.listener, l !== o && a.isPropagationStopped()) break e;
                                        Ar(a, u, s), o = l
                                    }
                        }
                    }
                    if (Ie) throw e = ze, Ie = !1, ze = null, e
                }

                function zr(e, t) {
                    var n = t[va];
                    void 0 === n && (n = t[va] = new Set);
                    var r = e + "__bubble";
                    n.has(r) || (Hr(t, e, 2, !1), n.add(r))
                }

                function Ur(e, t, n) {
                    var r = 0;
                    t && (r |= 4), Hr(n, e, r, t)
                }
                var Br = "_reactListening" + Math.random().toString(36).slice(2);

                function Vr(e) {
                    if (!e[Br]) {
                        e[Br] = !0, i.forEach((function(t) {
                            "selectionchange" !== t && (Fr.has(t) || Ur(t, !1, e), Ur(t, !0, e))
                        }));
                        var t = 9 === e.nodeType ? e : e.ownerDocument;
                        null === t || t[Br] || (t[Br] = !0, Ur("selectionchange", !1, t))
                    }
                }

                function Hr(e, t, n, r) {
                    switch (Yt(t)) {
                        case 1:
                            var a = Kt;
                            break;
                        case 4:
                            a = qt;
                            break;
                        default:
                            a = $t
                    }
                    n = a.bind(null, t, n, e), a = void 0, !Re || "touchstart" !== t && "touchmove" !== t && "wheel" !== t || (a = !0), r ? void 0 !== a ? e.addEventListener(t, n, {
                        capture: !0,
                        passive: a
                    }) : e.addEventListener(t, n, !0) : void 0 !== a ? e.addEventListener(t, n, {
                        passive: a
                    }) : e.addEventListener(t, n, !1)
                }

                function Wr(e, t, n, r, a) {
                    var o = r;
                    if (0 === (1 & t) && 0 === (2 & t) && null !== r) e: for (;;) {
                        if (null === r) return;
                        var i = r.tag;
                        if (3 === i || 4 === i) {
                            var u = r.stateNode.containerInfo;
                            if (u === a || 8 === u.nodeType && u.parentNode === a) break;
                            if (4 === i)
                                for (i = r.return; null !== i;) {
                                    var l = i.tag;
                                    if ((3 === l || 4 === l) && ((l = i.stateNode.containerInfo) === a || 8 === l.nodeType && l.parentNode === a)) return;
                                    i = i.return
                                }
                            for (; null !== u;) {
                                if (null === (i = ya(u))) return;
                                if (5 === (l = i.tag) || 6 === l) {
                                    r = o = i;
                                    continue e
                                }
                                u = u.parentNode
                            }
                        }
                        r = r.return
                    }
                    De((function() {
                        var r = o,
                            a = xe(n),
                            i = [];
                        e: {
                            var u = Mr.get(e);
                            if (void 0 !== u) {
                                var l = cn,
                                    s = e;
                                switch (e) {
                                    case "keypress":
                                        if (0 === tn(n)) break e;
                                    case "keydown":
                                    case "keyup":
                                        l = jn;
                                        break;
                                    case "focusin":
                                        s = "focus", l = mn;
                                        break;
                                    case "focusout":
                                        s = "blur", l = mn;
                                        break;
                                    case "beforeblur":
                                    case "afterblur":
                                        l = mn;
                                        break;
                                    case "click":
                                        if (2 === n.button) break e;
                                    case "auxclick":
                                    case "dblclick":
                                    case "mousedown":
                                    case "mousemove":
                                    case "mouseup":
                                    case "mouseout":
                                    case "mouseover":
                                    case "contextmenu":
                                        l = hn;
                                        break;
                                    case "drag":
                                    case "dragend":
                                    case "dragenter":
                                    case "dragexit":
                                    case "dragleave":
                                    case "dragover":
                                    case "dragstart":
                                    case "drop":
                                        l = vn;
                                        break;
                                    case "touchcancel":
                                    case "touchend":
                                    case "touchmove":
                                    case "touchstart":
                                        l = Tn;
                                        break;
                                    case Cr:
                                    case jr:
                                    case Pr:
                                        l = bn;
                                        break;
                                    case Tr:
                                        l = Mn;
                                        break;
                                    case "scroll":
                                        l = dn;
                                        break;
                                    case "wheel":
                                        l = Nn;
                                        break;
                                    case "copy":
                                    case "cut":
                                    case "paste":
                                        l = gn;
                                        break;
                                    case "gotpointercapture":
                                    case "lostpointercapture":
                                    case "pointercancel":
                                    case "pointerdown":
                                    case "pointermove":
                                    case "pointerout":
                                    case "pointerover":
                                    case "pointerup":
                                        l = Pn
                                }
                                var c = 0 !== (4 & t),
                                    f = !c && "scroll" === e,
                                    d = c ? null !== u ? u + "Capture" : null : u;
                                c = [];
                                for (var p, h = r; null !== h;) {
                                    var v = (p = h).stateNode;
                                    if (5 === p.tag && null !== v && (p = v, null !== d && (null != (v = Ne(h, d)) && c.push(Kr(h, v, p)))), f) break;
                                    h = h.return
                                }
                                0 < c.length && (u = new l(u, s, null, n, a), i.push({
                                    event: u,
                                    listeners: c
                                }))
                            }
                        }
                        if (0 === (7 & t)) {
                            if (l = "mouseout" === e || "pointerout" === e, (!(u = "mouseover" === e || "pointerover" === e) || n === we || !(s = n.relatedTarget || n.fromElement) || !ya(s) && !s[ha]) && (l || u) && (u = a.window === a ? a : (u = a.ownerDocument) ? u.defaultView || u.parentWindow : window, l ? (l = r, null !== (s = (s = n.relatedTarget || n.toElement) ? ya(s) : null) && (s !== (f = Ve(s)) || 5 !== s.tag && 6 !== s.tag) && (s = null)) : (l = null, s = r), l !== s)) {
                                if (c = hn, v = "onMouseLeave", d = "onMouseEnter", h = "mouse", "pointerout" !== e && "pointerover" !== e || (c = Pn, v = "onPointerLeave", d = "onPointerEnter", h = "pointer"), f = null == l ? u : wa(l), p = null == s ? u : wa(s), (u = new c(v, h + "leave", l, n, a)).target = f, u.relatedTarget = p, v = null, ya(a) === r && ((c = new c(d, h + "enter", s, n, a)).target = p, c.relatedTarget = f, v = c), f = v, l && s) e: {
                                    for (d = s, h = 0, p = c = l; p; p = $r(p)) h++;
                                    for (p = 0, v = d; v; v = $r(v)) p++;
                                    for (; 0 < h - p;) c = $r(c),
                                    h--;
                                    for (; 0 < p - h;) d = $r(d),
                                    p--;
                                    for (; h--;) {
                                        if (c === d || null !== d && c === d.alternate) break e;
                                        c = $r(c), d = $r(d)
                                    }
                                    c = null
                                }
                                else c = null;
                                null !== l && Gr(i, u, l, c, !1), null !== s && null !== f && Gr(i, f, s, c, !0)
                            }
                            if ("select" === (l = (u = r ? wa(r) : window).nodeName && u.nodeName.toLowerCase()) || "input" === l && "file" === u.type) var m = Yn;
                            else if (Wn(u))
                                if (Zn) m = ir;
                                else {
                                    m = ar;
                                    var b = rr
                                }
                            else(l = u.nodeName) && "input" === l.toLowerCase() && ("checkbox" === u.type || "radio" === u.type) && (m = or);
                            switch (m && (m = m(e, r)) ? Kn(i, m, n, a) : (b && b(e, u, r), "focusout" === e && (b = u._wrapperState) && b.controlled && "number" === u.type && ee(u, "number", u.value)), b = r ? wa(r) : window, e) {
                                case "focusin":
                                    (Wn(b) || "true" === b.contentEditable) && (mr = b, br = r, yr = null);
                                    break;
                                case "focusout":
                                    yr = br = mr = null;
                                    break;
                                case "mousedown":
                                    gr = !0;
                                    break;
                                case "contextmenu":
                                case "mouseup":
                                case "dragend":
                                    gr = !1, wr(i, n, a);
                                    break;
                                case "selectionchange":
                                    if (vr) break;
                                case "keydown":
                                case "keyup":
                                    wr(i, n, a)
                            }
                            var y;
                            if (On) e: {
                                switch (e) {
                                    case "compositionstart":
                                        var g = "onCompositionStart";
                                        break e;
                                    case "compositionend":
                                        g = "onCompositionEnd";
                                        break e;
                                    case "compositionupdate":
                                        g = "onCompositionUpdate";
                                        break e
                                }
                                g = void 0
                            }
                            else Vn ? Un(e, n) && (g = "onCompositionEnd") : "keydown" === e && 229 === n.keyCode && (g = "onCompositionStart");
                            g && (An && "ko" !== n.locale && (Vn || "onCompositionStart" !== g ? "onCompositionEnd" === g && Vn && (y = en()) : (Xt = "value" in (Zt = a) ? Zt.value : Zt.textContent, Vn = !0)), 0 < (b = qr(r, g)).length && (g = new wn(g, e, null, n, a), i.push({
                                event: g,
                                listeners: b
                            }), y ? g.data = y : null !== (y = Bn(n)) && (g.data = y))), (y = Fn ? function(e, t) {
                                switch (e) {
                                    case "compositionend":
                                        return Bn(t);
                                    case "keypress":
                                        return 32 !== t.which ? null : (zn = !0, In);
                                    case "textInput":
                                        return (e = t.data) === In && zn ? null : e;
                                    default:
                                        return null
                                }
                            }(e, n) : function(e, t) {
                                if (Vn) return "compositionend" === e || !On && Un(e, t) ? (e = en(), Jt = Xt = Zt = null, Vn = !1, e) : null;
                                switch (e) {
                                    case "paste":
                                    default:
                                        return null;
                                    case "keypress":
                                        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                                            if (t.char && 1 < t.char.length) return t.char;
                                            if (t.which) return String.fromCharCode(t.which)
                                        }
                                        return null;
                                    case "compositionend":
                                        return An && "ko" !== t.locale ? null : t.data
                                }
                            }(e, n)) && (0 < (r = qr(r, "onBeforeInput")).length && (a = new wn("onBeforeInput", "beforeinput", null, n, a), i.push({
                                event: a,
                                listeners: r
                            }), a.data = y))
                        }
                        Ir(i, t)
                    }))
                }

                function Kr(e, t, n) {
                    return {
                        instance: e,
                        listener: t,
                        currentTarget: n
                    }
                }

                function qr(e, t) {
                    for (var n = t + "Capture", r = []; null !== e;) {
                        var a = e,
                            o = a.stateNode;
                        5 === a.tag && null !== o && (a = o, null != (o = Ne(e, n)) && r.unshift(Kr(e, o, a)), null != (o = Ne(e, t)) && r.push(Kr(e, o, a))), e = e.return
                    }
                    return r
                }

                function $r(e) {
                    if (null === e) return null;
                    do {
                        e = e.return
                    } while (e && 5 !== e.tag);
                    return e || null
                }

                function Gr(e, t, n, r, a) {
                    for (var o = t._reactName, i = []; null !== n && n !== r;) {
                        var u = n,
                            l = u.alternate,
                            s = u.stateNode;
                        if (null !== l && l === r) break;
                        5 === u.tag && null !== s && (u = s, a ? null != (l = Ne(n, o)) && i.unshift(Kr(n, l, u)) : a || null != (l = Ne(n, o)) && i.push(Kr(n, l, u))), n = n.return
                    }
                    0 !== i.length && e.push({
                        event: t,
                        listeners: i
                    })
                }
                var Qr = /\r\n?/g,
                    Yr = /\u0000|\uFFFD/g;

                function Zr(e) {
                    return ("string" === typeof e ? e : "" + e).replace(Qr, "\n").replace(Yr, "")
                }

                function Xr(e, t, n) {
                    if (t = Zr(t), Zr(e) !== t && n) throw Error(o(425))
                }

                function Jr() {}
                var ea = null,
                    ta = null;

                function na(e, t) {
                    return "textarea" === e || "noscript" === e || "string" === typeof t.children || "number" === typeof t.children || "object" === typeof t.dangerouslySetInnerHTML && null !== t.dangerouslySetInnerHTML && null != t.dangerouslySetInnerHTML.__html
                }
                var ra = "function" === typeof setTimeout ? setTimeout : void 0,
                    aa = "function" === typeof clearTimeout ? clearTimeout : void 0,
                    oa = "function" === typeof Promise ? Promise : void 0,
                    ia = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof oa ? function(e) {
                        return oa.resolve(null).then(e).catch(ua)
                    } : ra;

                function ua(e) {
                    setTimeout((function() {
                        throw e
                    }))
                }

                function la(e, t) {
                    var n = t,
                        r = 0;
                    do {
                        var a = n.nextSibling;
                        if (e.removeChild(n), a && 8 === a.nodeType)
                            if ("/$" === (n = a.data)) {
                                if (0 === r) return e.removeChild(a), void Vt(t);
                                r--
                            } else "$" !== n && "$?" !== n && "$!" !== n || r++;
                        n = a
                    } while (n);
                    Vt(t)
                }

                function sa(e) {
                    for (; null != e; e = e.nextSibling) {
                        var t = e.nodeType;
                        if (1 === t || 3 === t) break;
                        if (8 === t) {
                            if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
                            if ("/$" === t) return null
                        }
                    }
                    return e
                }

                function ca(e) {
                    e = e.previousSibling;
                    for (var t = 0; e;) {
                        if (8 === e.nodeType) {
                            var n = e.data;
                            if ("$" === n || "$!" === n || "$?" === n) {
                                if (0 === t) return e;
                                t--
                            } else "/$" === n && t++
                        }
                        e = e.previousSibling
                    }
                    return null
                }
                var fa = Math.random().toString(36).slice(2),
                    da = "__reactFiber$" + fa,
                    pa = "__reactProps$" + fa,
                    ha = "__reactContainer$" + fa,
                    va = "__reactEvents$" + fa,
                    ma = "__reactListeners$" + fa,
                    ba = "__reactHandles$" + fa;

                function ya(e) {
                    var t = e[da];
                    if (t) return t;
                    for (var n = e.parentNode; n;) {
                        if (t = n[ha] || n[da]) {
                            if (n = t.alternate, null !== t.child || null !== n && null !== n.child)
                                for (e = ca(e); null !== e;) {
                                    if (n = e[da]) return n;
                                    e = ca(e)
                                }
                            return t
                        }
                        n = (e = n).parentNode
                    }
                    return null
                }

                function ga(e) {
                    return !(e = e[da] || e[ha]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e
                }

                function wa(e) {
                    if (5 === e.tag || 6 === e.tag) return e.stateNode;
                    throw Error(o(33))
                }

                function xa(e) {
                    return e[pa] || null
                }
                var ka = [],
                    Sa = -1;

                function _a(e) {
                    return {
                        current: e
                    }
                }

                function Ea(e) {
                    0 > Sa || (e.current = ka[Sa], ka[Sa] = null, Sa--)
                }

                function Ca(e, t) {
                    Sa++, ka[Sa] = e.current, e.current = t
                }
                var ja = {},
                    Pa = _a(ja),
                    Ta = _a(!1),
                    Ma = ja;

                function Da(e, t) {
                    var n = e.type.contextTypes;
                    if (!n) return ja;
                    var r = e.stateNode;
                    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
                    var a, o = {};
                    for (a in n) o[a] = t[a];
                    return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o
                }

                function Na(e) {
                    return null !== (e = e.childContextTypes) && void 0 !== e
                }

                function Ra() {
                    Ea(Ta), Ea(Pa)
                }

                function Oa(e, t, n) {
                    if (Pa.current !== ja) throw Error(o(168));
                    Ca(Pa, t), Ca(Ta, n)
                }

                function La(e, t, n) {
                    var r = e.stateNode;
                    if (t = t.childContextTypes, "function" !== typeof r.getChildContext) return n;
                    for (var a in r = r.getChildContext())
                        if (!(a in t)) throw Error(o(108, H(e) || "Unknown", a));
                    return A({}, n, r)
                }

                function Fa(e) {
                    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ja, Ma = Pa.current, Ca(Pa, e), Ca(Ta, Ta.current), !0
                }

                function Aa(e, t, n) {
                    var r = e.stateNode;
                    if (!r) throw Error(o(169));
                    n ? (e = La(e, t, Ma), r.__reactInternalMemoizedMergedChildContext = e, Ea(Ta), Ea(Pa), Ca(Pa, e)) : Ea(Ta), Ca(Ta, n)
                }
                var Ia = null,
                    za = !1,
                    Ua = !1;

                function Ba(e) {
                    null === Ia ? Ia = [e] : Ia.push(e)
                }

                function Va() {
                    if (!Ua && null !== Ia) {
                        Ua = !0;
                        var e = 0,
                            t = gt;
                        try {
                            var n = Ia;
                            for (gt = 1; e < n.length; e++) {
                                var r = n[e];
                                do {
                                    r = r(!0)
                                } while (null !== r)
                            }
                            Ia = null, za = !1
                        } catch (a) {
                            throw null !== Ia && (Ia = Ia.slice(e + 1)), $e(Je, Va), a
                        } finally {
                            gt = t, Ua = !1
                        }
                    }
                    return null
                }
                var Ha = [],
                    Wa = 0,
                    Ka = null,
                    qa = 0,
                    $a = [],
                    Ga = 0,
                    Qa = null,
                    Ya = 1,
                    Za = "";

                function Xa(e, t) {
                    Ha[Wa++] = qa, Ha[Wa++] = Ka, Ka = e, qa = t
                }

                function Ja(e, t, n) {
                    $a[Ga++] = Ya, $a[Ga++] = Za, $a[Ga++] = Qa, Qa = e;
                    var r = Ya;
                    e = Za;
                    var a = 32 - it(r) - 1;
                    r &= ~(1 << a), n += 1;
                    var o = 32 - it(t) + a;
                    if (30 < o) {
                        var i = a - a % 5;
                        o = (r & (1 << i) - 1).toString(32), r >>= i, a -= i, Ya = 1 << 32 - it(t) + a | n << a | r, Za = o + e
                    } else Ya = 1 << o | n << a | r, Za = e
                }

                function eo(e) {
                    null !== e.return && (Xa(e, 1), Ja(e, 1, 0))
                }

                function to(e) {
                    for (; e === Ka;) Ka = Ha[--Wa], Ha[Wa] = null, qa = Ha[--Wa], Ha[Wa] = null;
                    for (; e === Qa;) Qa = $a[--Ga], $a[Ga] = null, Za = $a[--Ga], $a[Ga] = null, Ya = $a[--Ga], $a[Ga] = null
                }
                var no = null,
                    ro = null,
                    ao = !1,
                    oo = null;

                function io(e, t) {
                    var n = Ds(5, null, null, 0);
                    n.elementType = "DELETED", n.stateNode = t, n.return = e, null === (t = e.deletions) ? (e.deletions = [n], e.flags |= 16) : t.push(n)
                }

                function uo(e, t) {
                    switch (e.tag) {
                        case 5:
                            var n = e.type;
                            return null !== (t = 1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t) && (e.stateNode = t, no = e, ro = sa(t.firstChild), !0);
                        case 6:
                            return null !== (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) && (e.stateNode = t, no = e, ro = null, !0);
                        case 13:
                            return null !== (t = 8 !== t.nodeType ? null : t) && (n = null !== Qa ? {
                                id: Ya,
                                overflow: Za
                            } : null, e.memoizedState = {
                                dehydrated: t,
                                treeContext: n,
                                retryLane: 1073741824
                            }, (n = Ds(18, null, null, 0)).stateNode = t, n.return = e, e.child = n, no = e, ro = null, !0);
                        default:
                            return !1
                    }
                }

                function lo(e) {
                    return 0 !== (1 & e.mode) && 0 === (128 & e.flags)
                }

                function so(e) {
                    if (ao) {
                        var t = ro;
                        if (t) {
                            var n = t;
                            if (!uo(e, t)) {
                                if (lo(e)) throw Error(o(418));
                                t = sa(n.nextSibling);
                                var r = no;
                                t && uo(e, t) ? io(r, n) : (e.flags = -4097 & e.flags | 2, ao = !1, no = e)
                            }
                        } else {
                            if (lo(e)) throw Error(o(418));
                            e.flags = -4097 & e.flags | 2, ao = !1, no = e
                        }
                    }
                }

                function co(e) {
                    for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;) e = e.return;
                    no = e
                }

                function fo(e) {
                    if (e !== no) return !1;
                    if (!ao) return co(e), ao = !0, !1;
                    var t;
                    if ((t = 3 !== e.tag) && !(t = 5 !== e.tag) && (t = "head" !== (t = e.type) && "body" !== t && !na(e.type, e.memoizedProps)), t && (t = ro)) {
                        if (lo(e)) throw po(), Error(o(418));
                        for (; t;) io(e, t), t = sa(t.nextSibling)
                    }
                    if (co(e), 13 === e.tag) {
                        if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null)) throw Error(o(317));
                        e: {
                            for (e = e.nextSibling, t = 0; e;) {
                                if (8 === e.nodeType) {
                                    var n = e.data;
                                    if ("/$" === n) {
                                        if (0 === t) {
                                            ro = sa(e.nextSibling);
                                            break e
                                        }
                                        t--
                                    } else "$" !== n && "$!" !== n && "$?" !== n || t++
                                }
                                e = e.nextSibling
                            }
                            ro = null
                        }
                    } else ro = no ? sa(e.stateNode.nextSibling) : null;
                    return !0
                }

                function po() {
                    for (var e = ro; e;) e = sa(e.nextSibling)
                }

                function ho() {
                    ro = no = null, ao = !1
                }

                function vo(e) {
                    null === oo ? oo = [e] : oo.push(e)
                }
                var mo = w.ReactCurrentBatchConfig;

                function bo(e, t) {
                    if (e && e.defaultProps) {
                        for (var n in t = A({}, t), e = e.defaultProps) void 0 === t[n] && (t[n] = e[n]);
                        return t
                    }
                    return t
                }
                var yo = _a(null),
                    go = null,
                    wo = null,
                    xo = null;

                function ko() {
                    xo = wo = go = null
                }

                function So(e) {
                    var t = yo.current;
                    Ea(yo), e._currentValue = t
                }

                function _o(e, t, n) {
                    for (; null !== e;) {
                        var r = e.alternate;
                        if ((e.childLanes & t) !== t ? (e.childLanes |= t, null !== r && (r.childLanes |= t)) : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
                        e = e.return
                    }
                }

                function Eo(e, t) {
                    go = e, xo = wo = null, null !== (e = e.dependencies) && null !== e.firstContext && (0 !== (e.lanes & t) && (wu = !0), e.firstContext = null)
                }

                function Co(e) {
                    var t = e._currentValue;
                    if (xo !== e)
                        if (e = {
                                context: e,
                                memoizedValue: t,
                                next: null
                            }, null === wo) {
                            if (null === go) throw Error(o(308));
                            wo = e, go.dependencies = {
                                lanes: 0,
                                firstContext: e
                            }
                        } else wo = wo.next = e;
                    return t
                }
                var jo = null;

                function Po(e) {
                    null === jo ? jo = [e] : jo.push(e)
                }

                function To(e, t, n, r) {
                    var a = t.interleaved;
                    return null === a ? (n.next = n, Po(t)) : (n.next = a.next, a.next = n), t.interleaved = n, Mo(e, r)
                }

                function Mo(e, t) {
                    e.lanes |= t;
                    var n = e.alternate;
                    for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e;) e.childLanes |= t, null !== (n = e.alternate) && (n.childLanes |= t), n = e, e = e.return;
                    return 3 === n.tag ? n.stateNode : null
                }
                var Do = !1;

                function No(e) {
                    e.updateQueue = {
                        baseState: e.memoizedState,
                        firstBaseUpdate: null,
                        lastBaseUpdate: null,
                        shared: {
                            pending: null,
                            interleaved: null,
                            lanes: 0
                        },
                        effects: null
                    }
                }

                function Ro(e, t) {
                    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                        baseState: e.baseState,
                        firstBaseUpdate: e.firstBaseUpdate,
                        lastBaseUpdate: e.lastBaseUpdate,
                        shared: e.shared,
                        effects: e.effects
                    })
                }

                function Oo(e, t) {
                    return {
                        eventTime: e,
                        lane: t,
                        tag: 0,
                        payload: null,
                        callback: null,
                        next: null
                    }
                }

                function Lo(e, t, n) {
                    var r = e.updateQueue;
                    if (null === r) return null;
                    if (r = r.shared, 0 !== (2 & Pl)) {
                        var a = r.pending;
                        return null === a ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, Mo(e, n)
                    }
                    return null === (a = r.interleaved) ? (t.next = t, Po(r)) : (t.next = a.next, a.next = t), r.interleaved = t, Mo(e, n)
                }

                function Fo(e, t, n) {
                    if (null !== (t = t.updateQueue) && (t = t.shared, 0 !== (4194240 & n))) {
                        var r = t.lanes;
                        n |= r &= e.pendingLanes, t.lanes = n, yt(e, n)
                    }
                }

                function Ao(e, t) {
                    var n = e.updateQueue,
                        r = e.alternate;
                    if (null !== r && n === (r = r.updateQueue)) {
                        var a = null,
                            o = null;
                        if (null !== (n = n.firstBaseUpdate)) {
                            do {
                                var i = {
                                    eventTime: n.eventTime,
                                    lane: n.lane,
                                    tag: n.tag,
                                    payload: n.payload,
                                    callback: n.callback,
                                    next: null
                                };
                                null === o ? a = o = i : o = o.next = i, n = n.next
                            } while (null !== n);
                            null === o ? a = o = t : o = o.next = t
                        } else a = o = t;
                        return n = {
                            baseState: r.baseState,
                            firstBaseUpdate: a,
                            lastBaseUpdate: o,
                            shared: r.shared,
                            effects: r.effects
                        }, void(e.updateQueue = n)
                    }
                    null === (e = n.lastBaseUpdate) ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
                }

                function Io(e, t, n, r) {
                    var a = e.updateQueue;
                    Do = !1;
                    var o = a.firstBaseUpdate,
                        i = a.lastBaseUpdate,
                        u = a.shared.pending;
                    if (null !== u) {
                        a.shared.pending = null;
                        var l = u,
                            s = l.next;
                        l.next = null, null === i ? o = s : i.next = s, i = l;
                        var c = e.alternate;
                        null !== c && ((u = (c = c.updateQueue).lastBaseUpdate) !== i && (null === u ? c.firstBaseUpdate = s : u.next = s, c.lastBaseUpdate = l))
                    }
                    if (null !== o) {
                        var f = a.baseState;
                        for (i = 0, c = s = l = null, u = o;;) {
                            var d = u.lane,
                                p = u.eventTime;
                            if ((r & d) === d) {
                                null !== c && (c = c.next = {
                                    eventTime: p,
                                    lane: 0,
                                    tag: u.tag,
                                    payload: u.payload,
                                    callback: u.callback,
                                    next: null
                                });
                                e: {
                                    var h = e,
                                        v = u;
                                    switch (d = t, p = n, v.tag) {
                                        case 1:
                                            if ("function" === typeof(h = v.payload)) {
                                                f = h.call(p, f, d);
                                                break e
                                            }
                                            f = h;
                                            break e;
                                        case 3:
                                            h.flags = -65537 & h.flags | 128;
                                        case 0:
                                            if (null === (d = "function" === typeof(h = v.payload) ? h.call(p, f, d) : h) || void 0 === d) break e;
                                            f = A({}, f, d);
                                            break e;
                                        case 2:
                                            Do = !0
                                    }
                                }
                                null !== u.callback && 0 !== u.lane && (e.flags |= 64, null === (d = a.effects) ? a.effects = [u] : d.push(u))
                            } else p = {
                                eventTime: p,
                                lane: d,
                                tag: u.tag,
                                payload: u.payload,
                                callback: u.callback,
                                next: null
                            }, null === c ? (s = c = p, l = f) : c = c.next = p, i |= d;
                            if (null === (u = u.next)) {
                                if (null === (u = a.shared.pending)) break;
                                u = (d = u).next, d.next = null, a.lastBaseUpdate = d, a.shared.pending = null
                            }
                        }
                        if (null === c && (l = f), a.baseState = l, a.firstBaseUpdate = s, a.lastBaseUpdate = c, null !== (t = a.shared.interleaved)) {
                            a = t;
                            do {
                                i |= a.lane, a = a.next
                            } while (a !== t)
                        } else null === o && (a.shared.lanes = 0);
                        Fl |= i, e.lanes = i, e.memoizedState = f
                    }
                }

                function zo(e, t, n) {
                    if (e = t.effects, t.effects = null, null !== e)
                        for (t = 0; t < e.length; t++) {
                            var r = e[t],
                                a = r.callback;
                            if (null !== a) {
                                if (r.callback = null, r = n, "function" !== typeof a) throw Error(o(191, a));
                                a.call(r)
                            }
                        }
                }
                var Uo = (new r.Component).refs;

                function Bo(e, t, n, r) {
                    n = null === (n = n(r, t = e.memoizedState)) || void 0 === n ? t : A({}, t, n), e.memoizedState = n, 0 === e.lanes && (e.updateQueue.baseState = n)
                }
                var Vo = {
                    isMounted: function(e) {
                        return !!(e = e._reactInternals) && Ve(e) === e
                    },
                    enqueueSetState: function(e, t, n) {
                        e = e._reactInternals;
                        var r = es(),
                            a = ts(e),
                            o = Oo(r, a);
                        o.payload = t, void 0 !== n && null !== n && (o.callback = n), null !== (t = Lo(e, o, a)) && (ns(t, e, a, r), Fo(t, e, a))
                    },
                    enqueueReplaceState: function(e, t, n) {
                        e = e._reactInternals;
                        var r = es(),
                            a = ts(e),
                            o = Oo(r, a);
                        o.tag = 1, o.payload = t, void 0 !== n && null !== n && (o.callback = n), null !== (t = Lo(e, o, a)) && (ns(t, e, a, r), Fo(t, e, a))
                    },
                    enqueueForceUpdate: function(e, t) {
                        e = e._reactInternals;
                        var n = es(),
                            r = ts(e),
                            a = Oo(n, r);
                        a.tag = 2, void 0 !== t && null !== t && (a.callback = t), null !== (t = Lo(e, a, r)) && (ns(t, e, r, n), Fo(t, e, r))
                    }
                };

                function Ho(e, t, n, r, a, o, i) {
                    return "function" === typeof(e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, o, i) : !t.prototype || !t.prototype.isPureReactComponent || (!lr(n, r) || !lr(a, o))
                }

                function Wo(e, t, n) {
                    var r = !1,
                        a = ja,
                        o = t.contextType;
                    return "object" === typeof o && null !== o ? o = Co(o) : (a = Na(t) ? Ma : Pa.current, o = (r = null !== (r = t.contextTypes) && void 0 !== r) ? Da(e, a) : ja), t = new t(n, o), e.memoizedState = null !== t.state && void 0 !== t.state ? t.state : null, t.updater = Vo, e.stateNode = t, t._reactInternals = e, r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t
                }

                function Ko(e, t, n, r) {
                    e = t.state, "function" === typeof t.componentWillReceiveProps && t.componentWillReceiveProps(n, r), "function" === typeof t.UNSAFE_componentWillReceiveProps && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vo.enqueueReplaceState(t, t.state, null)
                }

                function qo(e, t, n, r) {
                    var a = e.stateNode;
                    a.props = n, a.state = e.memoizedState, a.refs = Uo, No(e);
                    var o = t.contextType;
                    "object" === typeof o && null !== o ? a.context = Co(o) : (o = Na(t) ? Ma : Pa.current, a.context = Da(e, o)), a.state = e.memoizedState, "function" === typeof(o = t.getDerivedStateFromProps) && (Bo(e, t, o, n), a.state = e.memoizedState), "function" === typeof t.getDerivedStateFromProps || "function" === typeof a.getSnapshotBeforeUpdate || "function" !== typeof a.UNSAFE_componentWillMount && "function" !== typeof a.componentWillMount || (t = a.state, "function" === typeof a.componentWillMount && a.componentWillMount(), "function" === typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount(), t !== a.state && Vo.enqueueReplaceState(a, a.state, null), Io(e, n, a, r), a.state = e.memoizedState), "function" === typeof a.componentDidMount && (e.flags |= 4194308)
                }

                function $o(e, t, n) {
                    if (null !== (e = n.ref) && "function" !== typeof e && "object" !== typeof e) {
                        if (n._owner) {
                            if (n = n._owner) {
                                if (1 !== n.tag) throw Error(o(309));
                                var r = n.stateNode
                            }
                            if (!r) throw Error(o(147, e));
                            var a = r,
                                i = "" + e;
                            return null !== t && null !== t.ref && "function" === typeof t.ref && t.ref._stringRef === i ? t.ref : (t = function(e) {
                                var t = a.refs;
                                t === Uo && (t = a.refs = {}), null === e ? delete t[i] : t[i] = e
                            }, t._stringRef = i, t)
                        }
                        if ("string" !== typeof e) throw Error(o(284));
                        if (!n._owner) throw Error(o(290, e))
                    }
                    return e
                }

                function Go(e, t) {
                    throw e = Object.prototype.toString.call(t), Error(o(31, "[object Object]" === e ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
                }

                function Qo(e) {
                    return (0, e._init)(e._payload)
                }

                function Yo(e) {
                    function t(t, n) {
                        if (e) {
                            var r = t.deletions;
                            null === r ? (t.deletions = [n], t.flags |= 16) : r.push(n)
                        }
                    }

                    function n(n, r) {
                        if (!e) return null;
                        for (; null !== r;) t(n, r), r = r.sibling;
                        return null
                    }

                    function r(e, t) {
                        for (e = new Map; null !== t;) null !== t.key ? e.set(t.key, t) : e.set(t.index, t), t = t.sibling;
                        return e
                    }

                    function a(e, t) {
                        return (e = Rs(e, t)).index = 0, e.sibling = null, e
                    }

                    function i(t, n, r) {
                        return t.index = r, e ? null !== (r = t.alternate) ? (r = r.index) < n ? (t.flags |= 2, n) : r : (t.flags |= 2, n) : (t.flags |= 1048576, n)
                    }

                    function u(t) {
                        return e && null === t.alternate && (t.flags |= 2), t
                    }

                    function l(e, t, n, r) {
                        return null === t || 6 !== t.tag ? ((t = As(n, e.mode, r)).return = e, t) : ((t = a(t, n)).return = e, t)
                    }

                    function s(e, t, n, r) {
                        var o = n.type;
                        return o === S ? f(e, t, n.props.children, r, n.key) : null !== t && (t.elementType === o || "object" === typeof o && null !== o && o.$$typeof === N && Qo(o) === t.type) ? ((r = a(t, n.props)).ref = $o(e, t, n), r.return = e, r) : ((r = Os(n.type, n.key, n.props, null, e.mode, r)).ref = $o(e, t, n), r.return = e, r)
                    }

                    function c(e, t, n, r) {
                        return null === t || 4 !== t.tag || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? ((t = Is(n, e.mode, r)).return = e, t) : ((t = a(t, n.children || [])).return = e, t)
                    }

                    function f(e, t, n, r, o) {
                        return null === t || 7 !== t.tag ? ((t = Ls(n, e.mode, r, o)).return = e, t) : ((t = a(t, n)).return = e, t)
                    }

                    function d(e, t, n) {
                        if ("string" === typeof t && "" !== t || "number" === typeof t) return (t = As("" + t, e.mode, n)).return = e, t;
                        if ("object" === typeof t && null !== t) {
                            switch (t.$$typeof) {
                                case x:
                                    return (n = Os(t.type, t.key, t.props, null, e.mode, n)).ref = $o(e, null, t), n.return = e, n;
                                case k:
                                    return (t = Is(t, e.mode, n)).return = e, t;
                                case N:
                                    return d(e, (0, t._init)(t._payload), n)
                            }
                            if (te(t) || L(t)) return (t = Ls(t, e.mode, n, null)).return = e, t;
                            Go(e, t)
                        }
                        return null
                    }

                    function p(e, t, n, r) {
                        var a = null !== t ? t.key : null;
                        if ("string" === typeof n && "" !== n || "number" === typeof n) return null !== a ? null : l(e, t, "" + n, r);
                        if ("object" === typeof n && null !== n) {
                            switch (n.$$typeof) {
                                case x:
                                    return n.key === a ? s(e, t, n, r) : null;
                                case k:
                                    return n.key === a ? c(e, t, n, r) : null;
                                case N:
                                    return p(e, t, (a = n._init)(n._payload), r)
                            }
                            if (te(n) || L(n)) return null !== a ? null : f(e, t, n, r, null);
                            Go(e, n)
                        }
                        return null
                    }

                    function h(e, t, n, r, a) {
                        if ("string" === typeof r && "" !== r || "number" === typeof r) return l(t, e = e.get(n) || null, "" + r, a);
                        if ("object" === typeof r && null !== r) {
                            switch (r.$$typeof) {
                                case x:
                                    return s(t, e = e.get(null === r.key ? n : r.key) || null, r, a);
                                case k:
                                    return c(t, e = e.get(null === r.key ? n : r.key) || null, r, a);
                                case N:
                                    return h(e, t, n, (0, r._init)(r._payload), a)
                            }
                            if (te(r) || L(r)) return f(t, e = e.get(n) || null, r, a, null);
                            Go(t, r)
                        }
                        return null
                    }

                    function v(a, o, u, l) {
                        for (var s = null, c = null, f = o, v = o = 0, m = null; null !== f && v < u.length; v++) {
                            f.index > v ? (m = f, f = null) : m = f.sibling;
                            var b = p(a, f, u[v], l);
                            if (null === b) {
                                null === f && (f = m);
                                break
                            }
                            e && f && null === b.alternate && t(a, f), o = i(b, o, v), null === c ? s = b : c.sibling = b, c = b, f = m
                        }
                        if (v === u.length) return n(a, f), ao && Xa(a, v), s;
                        if (null === f) {
                            for (; v < u.length; v++) null !== (f = d(a, u[v], l)) && (o = i(f, o, v), null === c ? s = f : c.sibling = f, c = f);
                            return ao && Xa(a, v), s
                        }
                        for (f = r(a, f); v < u.length; v++) null !== (m = h(f, a, v, u[v], l)) && (e && null !== m.alternate && f.delete(null === m.key ? v : m.key), o = i(m, o, v), null === c ? s = m : c.sibling = m, c = m);
                        return e && f.forEach((function(e) {
                            return t(a, e)
                        })), ao && Xa(a, v), s
                    }

                    function m(a, u, l, s) {
                        var c = L(l);
                        if ("function" !== typeof c) throw Error(o(150));
                        if (null == (l = c.call(l))) throw Error(o(151));
                        for (var f = c = null, v = u, m = u = 0, b = null, y = l.next(); null !== v && !y.done; m++, y = l.next()) {
                            v.index > m ? (b = v, v = null) : b = v.sibling;
                            var g = p(a, v, y.value, s);
                            if (null === g) {
                                null === v && (v = b);
                                break
                            }
                            e && v && null === g.alternate && t(a, v), u = i(g, u, m), null === f ? c = g : f.sibling = g, f = g, v = b
                        }
                        if (y.done) return n(a, v), ao && Xa(a, m), c;
                        if (null === v) {
                            for (; !y.done; m++, y = l.next()) null !== (y = d(a, y.value, s)) && (u = i(y, u, m), null === f ? c = y : f.sibling = y, f = y);
                            return ao && Xa(a, m), c
                        }
                        for (v = r(a, v); !y.done; m++, y = l.next()) null !== (y = h(v, a, m, y.value, s)) && (e && null !== y.alternate && v.delete(null === y.key ? m : y.key), u = i(y, u, m), null === f ? c = y : f.sibling = y, f = y);
                        return e && v.forEach((function(e) {
                            return t(a, e)
                        })), ao && Xa(a, m), c
                    }
                    return function e(r, o, i, l) {
                        if ("object" === typeof i && null !== i && i.type === S && null === i.key && (i = i.props.children), "object" === typeof i && null !== i) {
                            switch (i.$$typeof) {
                                case x:
                                    e: {
                                        for (var s = i.key, c = o; null !== c;) {
                                            if (c.key === s) {
                                                if ((s = i.type) === S) {
                                                    if (7 === c.tag) {
                                                        n(r, c.sibling), (o = a(c, i.props.children)).return = r, r = o;
                                                        break e
                                                    }
                                                } else if (c.elementType === s || "object" === typeof s && null !== s && s.$$typeof === N && Qo(s) === c.type) {
                                                    n(r, c.sibling), (o = a(c, i.props)).ref = $o(r, c, i), o.return = r, r = o;
                                                    break e
                                                }
                                                n(r, c);
                                                break
                                            }
                                            t(r, c), c = c.sibling
                                        }
                                        i.type === S ? ((o = Ls(i.props.children, r.mode, l, i.key)).return = r, r = o) : ((l = Os(i.type, i.key, i.props, null, r.mode, l)).ref = $o(r, o, i), l.return = r, r = l)
                                    }
                                    return u(r);
                                case k:
                                    e: {
                                        for (c = i.key; null !== o;) {
                                            if (o.key === c) {
                                                if (4 === o.tag && o.stateNode.containerInfo === i.containerInfo && o.stateNode.implementation === i.implementation) {
                                                    n(r, o.sibling), (o = a(o, i.children || [])).return = r, r = o;
                                                    break e
                                                }
                                                n(r, o);
                                                break
                                            }
                                            t(r, o), o = o.sibling
                                        }(o = Is(i, r.mode, l)).return = r,
                                        r = o
                                    }
                                    return u(r);
                                case N:
                                    return e(r, o, (c = i._init)(i._payload), l)
                            }
                            if (te(i)) return v(r, o, i, l);
                            if (L(i)) return m(r, o, i, l);
                            Go(r, i)
                        }
                        return "string" === typeof i && "" !== i || "number" === typeof i ? (i = "" + i, null !== o && 6 === o.tag ? (n(r, o.sibling), (o = a(o, i)).return = r, r = o) : (n(r, o), (o = As(i, r.mode, l)).return = r, r = o), u(r)) : n(r, o)
                    }
                }
                var Zo = Yo(!0),
                    Xo = Yo(!1),
                    Jo = {},
                    ei = _a(Jo),
                    ti = _a(Jo),
                    ni = _a(Jo);

                function ri(e) {
                    if (e === Jo) throw Error(o(174));
                    return e
                }

                function ai(e, t) {
                    switch (Ca(ni, t), Ca(ti, e), Ca(ei, Jo), e = t.nodeType) {
                        case 9:
                        case 11:
                            t = (t = t.documentElement) ? t.namespaceURI : le(null, "");
                            break;
                        default:
                            t = le(t = (e = 8 === e ? t.parentNode : t).namespaceURI || null, e = e.tagName)
                    }
                    Ea(ei), Ca(ei, t)
                }

                function oi() {
                    Ea(ei), Ea(ti), Ea(ni)
                }

                function ii(e) {
                    ri(ni.current);
                    var t = ri(ei.current),
                        n = le(t, e.type);
                    t !== n && (Ca(ti, e), Ca(ei, n))
                }

                function ui(e) {
                    ti.current === e && (Ea(ei), Ea(ti))
                }
                var li = _a(0);

                function si(e) {
                    for (var t = e; null !== t;) {
                        if (13 === t.tag) {
                            var n = t.memoizedState;
                            if (null !== n && (null === (n = n.dehydrated) || "$?" === n.data || "$!" === n.data)) return t
                        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
                            if (0 !== (128 & t.flags)) return t
                        } else if (null !== t.child) {
                            t.child.return = t, t = t.child;
                            continue
                        }
                        if (t === e) break;
                        for (; null === t.sibling;) {
                            if (null === t.return || t.return === e) return null;
                            t = t.return
                        }
                        t.sibling.return = t.return, t = t.sibling
                    }
                    return null
                }
                var ci = [];

                function fi() {
                    for (var e = 0; e < ci.length; e++) ci[e]._workInProgressVersionPrimary = null;
                    ci.length = 0
                }
                var di = w.ReactCurrentDispatcher,
                    pi = w.ReactCurrentBatchConfig,
                    hi = 0,
                    vi = null,
                    mi = null,
                    bi = null,
                    yi = !1,
                    gi = !1,
                    wi = 0,
                    xi = 0;

                function ki() {
                    throw Error(o(321))
                }

                function Si(e, t) {
                    if (null === t) return !1;
                    for (var n = 0; n < t.length && n < e.length; n++)
                        if (!ur(e[n], t[n])) return !1;
                    return !0
                }

                function _i(e, t, n, r, a, i) {
                    if (hi = i, vi = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, di.current = null === e || null === e.memoizedState ? uu : lu, e = n(r, a), gi) {
                        i = 0;
                        do {
                            if (gi = !1, wi = 0, 25 <= i) throw Error(o(301));
                            i += 1, bi = mi = null, t.updateQueue = null, di.current = su, e = n(r, a)
                        } while (gi)
                    }
                    if (di.current = iu, t = null !== mi && null !== mi.next, hi = 0, bi = mi = vi = null, yi = !1, t) throw Error(o(300));
                    return e
                }

                function Ei() {
                    var e = 0 !== wi;
                    return wi = 0, e
                }

                function Ci() {
                    var e = {
                        memoizedState: null,
                        baseState: null,
                        baseQueue: null,
                        queue: null,
                        next: null
                    };
                    return null === bi ? vi.memoizedState = bi = e : bi = bi.next = e, bi
                }

                function ji() {
                    if (null === mi) {
                        var e = vi.alternate;
                        e = null !== e ? e.memoizedState : null
                    } else e = mi.next;
                    var t = null === bi ? vi.memoizedState : bi.next;
                    if (null !== t) bi = t, mi = e;
                    else {
                        if (null === e) throw Error(o(310));
                        e = {
                            memoizedState: (mi = e).memoizedState,
                            baseState: mi.baseState,
                            baseQueue: mi.baseQueue,
                            queue: mi.queue,
                            next: null
                        }, null === bi ? vi.memoizedState = bi = e : bi = bi.next = e
                    }
                    return bi
                }

                function Pi(e, t) {
                    return "function" === typeof t ? t(e) : t
                }

                function Ti(e) {
                    var t = ji(),
                        n = t.queue;
                    if (null === n) throw Error(o(311));
                    n.lastRenderedReducer = e;
                    var r = mi,
                        a = r.baseQueue,
                        i = n.pending;
                    if (null !== i) {
                        if (null !== a) {
                            var u = a.next;
                            a.next = i.next, i.next = u
                        }
                        r.baseQueue = a = i, n.pending = null
                    }
                    if (null !== a) {
                        i = a.next, r = r.baseState;
                        var l = u = null,
                            s = null,
                            c = i;
                        do {
                            var f = c.lane;
                            if ((hi & f) === f) null !== s && (s = s.next = {
                                lane: 0,
                                action: c.action,
                                hasEagerState: c.hasEagerState,
                                eagerState: c.eagerState,
                                next: null
                            }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
                            else {
                                var d = {
                                    lane: f,
                                    action: c.action,
                                    hasEagerState: c.hasEagerState,
                                    eagerState: c.eagerState,
                                    next: null
                                };
                                null === s ? (l = s = d, u = r) : s = s.next = d, vi.lanes |= f, Fl |= f
                            }
                            c = c.next
                        } while (null !== c && c !== i);
                        null === s ? u = r : s.next = l, ur(r, t.memoizedState) || (wu = !0), t.memoizedState = r, t.baseState = u, t.baseQueue = s, n.lastRenderedState = r
                    }
                    if (null !== (e = n.interleaved)) {
                        a = e;
                        do {
                            i = a.lane, vi.lanes |= i, Fl |= i, a = a.next
                        } while (a !== e)
                    } else null === a && (n.lanes = 0);
                    return [t.memoizedState, n.dispatch]
                }

                function Mi(e) {
                    var t = ji(),
                        n = t.queue;
                    if (null === n) throw Error(o(311));
                    n.lastRenderedReducer = e;
                    var r = n.dispatch,
                        a = n.pending,
                        i = t.memoizedState;
                    if (null !== a) {
                        n.pending = null;
                        var u = a = a.next;
                        do {
                            i = e(i, u.action), u = u.next
                        } while (u !== a);
                        ur(i, t.memoizedState) || (wu = !0), t.memoizedState = i, null === t.baseQueue && (t.baseState = i), n.lastRenderedState = i
                    }
                    return [i, r]
                }

                function Di() {}

                function Ni(e, t) {
                    var n = vi,
                        r = ji(),
                        a = t(),
                        i = !ur(r.memoizedState, a);
                    if (i && (r.memoizedState = a, wu = !0), r = r.queue, Wi(Li.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || null !== bi && 1 & bi.memoizedState.tag) {
                        if (n.flags |= 2048, zi(9, Oi.bind(null, n, r, a, t), void 0, null), null === Tl) throw Error(o(349));
                        0 !== (30 & hi) || Ri(n, t, a)
                    }
                    return a
                }

                function Ri(e, t, n) {
                    e.flags |= 16384, e = {
                        getSnapshot: t,
                        value: n
                    }, null === (t = vi.updateQueue) ? (t = {
                        lastEffect: null,
                        stores: null
                    }, vi.updateQueue = t, t.stores = [e]) : null === (n = t.stores) ? t.stores = [e] : n.push(e)
                }

                function Oi(e, t, n, r) {
                    t.value = n, t.getSnapshot = r, Fi(t) && Ai(e)
                }

                function Li(e, t, n) {
                    return n((function() {
                        Fi(t) && Ai(e)
                    }))
                }

                function Fi(e) {
                    var t = e.getSnapshot;
                    e = e.value;
                    try {
                        var n = t();
                        return !ur(e, n)
                    } catch (r) {
                        return !0
                    }
                }

                function Ai(e) {
                    var t = Mo(e, 1);
                    null !== t && ns(t, e, 1, -1)
                }

                function Ii(e) {
                    var t = Ci();
                    return "function" === typeof e && (e = e()), t.memoizedState = t.baseState = e, e = {
                        pending: null,
                        interleaved: null,
                        lanes: 0,
                        dispatch: null,
                        lastRenderedReducer: Pi,
                        lastRenderedState: e
                    }, t.queue = e, e = e.dispatch = nu.bind(null, vi, e), [t.memoizedState, e]
                }

                function zi(e, t, n, r) {
                    return e = {
                        tag: e,
                        create: t,
                        destroy: n,
                        deps: r,
                        next: null
                    }, null === (t = vi.updateQueue) ? (t = {
                        lastEffect: null,
                        stores: null
                    }, vi.updateQueue = t, t.lastEffect = e.next = e) : null === (n = t.lastEffect) ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e
                }

                function Ui() {
                    return ji().memoizedState
                }

                function Bi(e, t, n, r) {
                    var a = Ci();
                    vi.flags |= e, a.memoizedState = zi(1 | t, n, void 0, void 0 === r ? null : r)
                }

                function Vi(e, t, n, r) {
                    var a = ji();
                    r = void 0 === r ? null : r;
                    var o = void 0;
                    if (null !== mi) {
                        var i = mi.memoizedState;
                        if (o = i.destroy, null !== r && Si(r, i.deps)) return void(a.memoizedState = zi(t, n, o, r))
                    }
                    vi.flags |= e, a.memoizedState = zi(1 | t, n, o, r)
                }

                function Hi(e, t) {
                    return Bi(8390656, 8, e, t)
                }

                function Wi(e, t) {
                    return Vi(2048, 8, e, t)
                }

                function Ki(e, t) {
                    return Vi(4, 2, e, t)
                }

                function qi(e, t) {
                    return Vi(4, 4, e, t)
                }

                function $i(e, t) {
                    return "function" === typeof t ? (e = e(), t(e), function() {
                        t(null)
                    }) : null !== t && void 0 !== t ? (e = e(), t.current = e, function() {
                        t.current = null
                    }) : void 0
                }

                function Gi(e, t, n) {
                    return n = null !== n && void 0 !== n ? n.concat([e]) : null, Vi(4, 4, $i.bind(null, t, e), n)
                }

                function Qi() {}

                function Yi(e, t) {
                    var n = ji();
                    t = void 0 === t ? null : t;
                    var r = n.memoizedState;
                    return null !== r && null !== t && Si(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
                }

                function Zi(e, t) {
                    var n = ji();
                    t = void 0 === t ? null : t;
                    var r = n.memoizedState;
                    return null !== r && null !== t && Si(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
                }

                function Xi(e, t, n) {
                    return 0 === (21 & hi) ? (e.baseState && (e.baseState = !1, wu = !0), e.memoizedState = n) : (ur(n, t) || (n = vt(), vi.lanes |= n, Fl |= n, e.baseState = !0), t)
                }

                function Ji(e, t) {
                    var n = gt;
                    gt = 0 !== n && 4 > n ? n : 4, e(!0);
                    var r = pi.transition;
                    pi.transition = {};
                    try {
                        e(!1), t()
                    } finally {
                        gt = n, pi.transition = r
                    }
                }

                function eu() {
                    return ji().memoizedState
                }

                function tu(e, t, n) {
                    var r = ts(e);
                    if (n = {
                            lane: r,
                            action: n,
                            hasEagerState: !1,
                            eagerState: null,
                            next: null
                        }, ru(e)) au(t, n);
                    else if (null !== (n = To(e, t, n, r))) {
                        ns(n, e, r, es()), ou(n, t, r)
                    }
                }

                function nu(e, t, n) {
                    var r = ts(e),
                        a = {
                            lane: r,
                            action: n,
                            hasEagerState: !1,
                            eagerState: null,
                            next: null
                        };
                    if (ru(e)) au(t, a);
                    else {
                        var o = e.alternate;
                        if (0 === e.lanes && (null === o || 0 === o.lanes) && null !== (o = t.lastRenderedReducer)) try {
                            var i = t.lastRenderedState,
                                u = o(i, n);
                            if (a.hasEagerState = !0, a.eagerState = u, ur(u, i)) {
                                var l = t.interleaved;
                                return null === l ? (a.next = a, Po(t)) : (a.next = l.next, l.next = a), void(t.interleaved = a)
                            }
                        } catch (s) {}
                        null !== (n = To(e, t, a, r)) && (ns(n, e, r, a = es()), ou(n, t, r))
                    }
                }

                function ru(e) {
                    var t = e.alternate;
                    return e === vi || null !== t && t === vi
                }

                function au(e, t) {
                    gi = yi = !0;
                    var n = e.pending;
                    null === n ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
                }

                function ou(e, t, n) {
                    if (0 !== (4194240 & n)) {
                        var r = t.lanes;
                        n |= r &= e.pendingLanes, t.lanes = n, yt(e, n)
                    }
                }
                var iu = {
                        readContext: Co,
                        useCallback: ki,
                        useContext: ki,
                        useEffect: ki,
                        useImperativeHandle: ki,
                        useInsertionEffect: ki,
                        useLayoutEffect: ki,
                        useMemo: ki,
                        useReducer: ki,
                        useRef: ki,
                        useState: ki,
                        useDebugValue: ki,
                        useDeferredValue: ki,
                        useTransition: ki,
                        useMutableSource: ki,
                        useSyncExternalStore: ki,
                        useId: ki,
                        unstable_isNewReconciler: !1
                    },
                    uu = {
                        readContext: Co,
                        useCallback: function(e, t) {
                            return Ci().memoizedState = [e, void 0 === t ? null : t], e
                        },
                        useContext: Co,
                        useEffect: Hi,
                        useImperativeHandle: function(e, t, n) {
                            return n = null !== n && void 0 !== n ? n.concat([e]) : null, Bi(4194308, 4, $i.bind(null, t, e), n)
                        },
                        useLayoutEffect: function(e, t) {
                            return Bi(4194308, 4, e, t)
                        },
                        useInsertionEffect: function(e, t) {
                            return Bi(4, 2, e, t)
                        },
                        useMemo: function(e, t) {
                            var n = Ci();
                            return t = void 0 === t ? null : t, e = e(), n.memoizedState = [e, t], e
                        },
                        useReducer: function(e, t, n) {
                            var r = Ci();
                            return t = void 0 !== n ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                                pending: null,
                                interleaved: null,
                                lanes: 0,
                                dispatch: null,
                                lastRenderedReducer: e,
                                lastRenderedState: t
                            }, r.queue = e, e = e.dispatch = tu.bind(null, vi, e), [r.memoizedState, e]
                        },
                        useRef: function(e) {
                            return e = {
                                current: e
                            }, Ci().memoizedState = e
                        },
                        useState: Ii,
                        useDebugValue: Qi,
                        useDeferredValue: function(e) {
                            return Ci().memoizedState = e
                        },
                        useTransition: function() {
                            var e = Ii(!1),
                                t = e[0];
                            return e = Ji.bind(null, e[1]), Ci().memoizedState = e, [t, e]
                        },
                        useMutableSource: function() {},
                        useSyncExternalStore: function(e, t, n) {
                            var r = vi,
                                a = Ci();
                            if (ao) {
                                if (void 0 === n) throw Error(o(407));
                                n = n()
                            } else {
                                if (n = t(), null === Tl) throw Error(o(349));
                                0 !== (30 & hi) || Ri(r, t, n)
                            }
                            a.memoizedState = n;
                            var i = {
                                value: n,
                                getSnapshot: t
                            };
                            return a.queue = i, Hi(Li.bind(null, r, i, e), [e]), r.flags |= 2048, zi(9, Oi.bind(null, r, i, n, t), void 0, null), n
                        },
                        useId: function() {
                            var e = Ci(),
                                t = Tl.identifierPrefix;
                            if (ao) {
                                var n = Za;
                                t = ":" + t + "R" + (n = (Ya & ~(1 << 32 - it(Ya) - 1)).toString(32) + n), 0 < (n = wi++) && (t += "H" + n.toString(32)), t += ":"
                            } else t = ":" + t + "r" + (n = xi++).toString(32) + ":";
                            return e.memoizedState = t
                        },
                        unstable_isNewReconciler: !1
                    },
                    lu = {
                        readContext: Co,
                        useCallback: Yi,
                        useContext: Co,
                        useEffect: Wi,
                        useImperativeHandle: Gi,
                        useInsertionEffect: Ki,
                        useLayoutEffect: qi,
                        useMemo: Zi,
                        useReducer: Ti,
                        useRef: Ui,
                        useState: function() {
                            return Ti(Pi)
                        },
                        useDebugValue: Qi,
                        useDeferredValue: function(e) {
                            return Xi(ji(), mi.memoizedState, e)
                        },
                        useTransition: function() {
                            return [Ti(Pi)[0], ji().memoizedState]
                        },
                        useMutableSource: Di,
                        useSyncExternalStore: Ni,
                        useId: eu,
                        unstable_isNewReconciler: !1
                    },
                    su = {
                        readContext: Co,
                        useCallback: Yi,
                        useContext: Co,
                        useEffect: Wi,
                        useImperativeHandle: Gi,
                        useInsertionEffect: Ki,
                        useLayoutEffect: qi,
                        useMemo: Zi,
                        useReducer: Mi,
                        useRef: Ui,
                        useState: function() {
                            return Mi(Pi)
                        },
                        useDebugValue: Qi,
                        useDeferredValue: function(e) {
                            var t = ji();
                            return null === mi ? t.memoizedState = e : Xi(t, mi.memoizedState, e)
                        },
                        useTransition: function() {
                            return [Mi(Pi)[0], ji().memoizedState]
                        },
                        useMutableSource: Di,
                        useSyncExternalStore: Ni,
                        useId: eu,
                        unstable_isNewReconciler: !1
                    };

                function cu(e, t) {
                    try {
                        var n = "",
                            r = t;
                        do {
                            n += B(r), r = r.return
                        } while (r);
                        var a = n
                    } catch (o) {
                        a = "\nError generating stack: " + o.message + "\n" + o.stack
                    }
                    return {
                        value: e,
                        source: t,
                        stack: a,
                        digest: null
                    }
                }

                function fu(e, t, n) {
                    return {
                        value: e,
                        source: null,
                        stack: null != n ? n : null,
                        digest: null != t ? t : null
                    }
                }

                function du(e, t) {
                    try {
                        console.error(t.value)
                    } catch (n) {
                        setTimeout((function() {
                            throw n
                        }))
                    }
                }
                var pu = "function" === typeof WeakMap ? WeakMap : Map;

                function hu(e, t, n) {
                    (n = Oo(-1, n)).tag = 3, n.payload = {
                        element: null
                    };
                    var r = t.value;
                    return n.callback = function() {
                        Wl || (Wl = !0, Kl = r), du(0, t)
                    }, n
                }

                function vu(e, t, n) {
                    (n = Oo(-1, n)).tag = 3;
                    var r = e.type.getDerivedStateFromError;
                    if ("function" === typeof r) {
                        var a = t.value;
                        n.payload = function() {
                            return r(a)
                        }, n.callback = function() {
                            du(0, t)
                        }
                    }
                    var o = e.stateNode;
                    return null !== o && "function" === typeof o.componentDidCatch && (n.callback = function() {
                        du(0, t), "function" !== typeof r && (null === ql ? ql = new Set([this]) : ql.add(this));
                        var e = t.stack;
                        this.componentDidCatch(t.value, {
                            componentStack: null !== e ? e : ""
                        })
                    }), n
                }

                function mu(e, t, n) {
                    var r = e.pingCache;
                    if (null === r) {
                        r = e.pingCache = new pu;
                        var a = new Set;
                        r.set(t, a)
                    } else void 0 === (a = r.get(t)) && (a = new Set, r.set(t, a));
                    a.has(n) || (a.add(n), e = Es.bind(null, e, t, n), t.then(e, e))
                }

                function bu(e) {
                    do {
                        var t;
                        if ((t = 13 === e.tag) && (t = null === (t = e.memoizedState) || null !== t.dehydrated), t) return e;
                        e = e.return
                    } while (null !== e);
                    return null
                }

                function yu(e, t, n, r, a) {
                    return 0 === (1 & e.mode) ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, 1 === n.tag && (null === n.alternate ? n.tag = 17 : ((t = Oo(-1, 1)).tag = 2, Lo(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = a, e)
                }
                var gu = w.ReactCurrentOwner,
                    wu = !1;

                function xu(e, t, n, r) {
                    t.child = null === e ? Xo(t, null, n, r) : Zo(t, e.child, n, r)
                }

                function ku(e, t, n, r, a) {
                    n = n.render;
                    var o = t.ref;
                    return Eo(t, a), r = _i(e, t, n, r, o, a), n = Ei(), null === e || wu ? (ao && n && eo(t), t.flags |= 1, xu(e, t, r, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Wu(e, t, a))
                }

                function Su(e, t, n, r, a) {
                    if (null === e) {
                        var o = n.type;
                        return "function" !== typeof o || Ns(o) || void 0 !== o.defaultProps || null !== n.compare || void 0 !== n.defaultProps ? ((e = Os(n.type, null, r, t, t.mode, a)).ref = t.ref, e.return = t, t.child = e) : (t.tag = 15, t.type = o, _u(e, t, o, r, a))
                    }
                    if (o = e.child, 0 === (e.lanes & a)) {
                        var i = o.memoizedProps;
                        if ((n = null !== (n = n.compare) ? n : lr)(i, r) && e.ref === t.ref) return Wu(e, t, a)
                    }
                    return t.flags |= 1, (e = Rs(o, r)).ref = t.ref, e.return = t, t.child = e
                }

                function _u(e, t, n, r, a) {
                    if (null !== e) {
                        var o = e.memoizedProps;
                        if (lr(o, r) && e.ref === t.ref) {
                            if (wu = !1, t.pendingProps = r = o, 0 === (e.lanes & a)) return t.lanes = e.lanes, Wu(e, t, a);
                            0 !== (131072 & e.flags) && (wu = !0)
                        }
                    }
                    return ju(e, t, n, r, a)
                }

                function Eu(e, t, n) {
                    var r = t.pendingProps,
                        a = r.children,
                        o = null !== e ? e.memoizedState : null;
                    if ("hidden" === r.mode)
                        if (0 === (1 & t.mode)) t.memoizedState = {
                            baseLanes: 0,
                            cachePool: null,
                            transitions: null
                        }, Ca(Rl, Nl), Nl |= n;
                        else {
                            if (0 === (1073741824 & n)) return e = null !== o ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                                baseLanes: e,
                                cachePool: null,
                                transitions: null
                            }, t.updateQueue = null, Ca(Rl, Nl), Nl |= e, null;
                            t.memoizedState = {
                                baseLanes: 0,
                                cachePool: null,
                                transitions: null
                            }, r = null !== o ? o.baseLanes : n, Ca(Rl, Nl), Nl |= r
                        }
                    else null !== o ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, Ca(Rl, Nl), Nl |= r;
                    return xu(e, t, a, n), t.child
                }

                function Cu(e, t) {
                    var n = t.ref;
                    (null === e && null !== n || null !== e && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
                }

                function ju(e, t, n, r, a) {
                    var o = Na(n) ? Ma : Pa.current;
                    return o = Da(t, o), Eo(t, a), n = _i(e, t, n, r, o, a), r = Ei(), null === e || wu ? (ao && r && eo(t), t.flags |= 1, xu(e, t, n, a), t.child) : (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Wu(e, t, a))
                }

                function Pu(e, t, n, r, a) {
                    if (Na(n)) {
                        var o = !0;
                        Fa(t)
                    } else o = !1;
                    if (Eo(t, a), null === t.stateNode) Hu(e, t), Wo(t, n, r), qo(t, n, r, a), r = !0;
                    else if (null === e) {
                        var i = t.stateNode,
                            u = t.memoizedProps;
                        i.props = u;
                        var l = i.context,
                            s = n.contextType;
                        "object" === typeof s && null !== s ? s = Co(s) : s = Da(t, s = Na(n) ? Ma : Pa.current);
                        var c = n.getDerivedStateFromProps,
                            f = "function" === typeof c || "function" === typeof i.getSnapshotBeforeUpdate;
                        f || "function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps || (u !== r || l !== s) && Ko(t, i, r, s), Do = !1;
                        var d = t.memoizedState;
                        i.state = d, Io(t, r, i, a), l = t.memoizedState, u !== r || d !== l || Ta.current || Do ? ("function" === typeof c && (Bo(t, n, c, r), l = t.memoizedState), (u = Do || Ho(t, n, u, r, d, l, s)) ? (f || "function" !== typeof i.UNSAFE_componentWillMount && "function" !== typeof i.componentWillMount || ("function" === typeof i.componentWillMount && i.componentWillMount(), "function" === typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount()), "function" === typeof i.componentDidMount && (t.flags |= 4194308)) : ("function" === typeof i.componentDidMount && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), i.props = r, i.state = l, i.context = s, r = u) : ("function" === typeof i.componentDidMount && (t.flags |= 4194308), r = !1)
                    } else {
                        i = t.stateNode, Ro(e, t), u = t.memoizedProps, s = t.type === t.elementType ? u : bo(t.type, u), i.props = s, f = t.pendingProps, d = i.context, "object" === typeof(l = n.contextType) && null !== l ? l = Co(l) : l = Da(t, l = Na(n) ? Ma : Pa.current);
                        var p = n.getDerivedStateFromProps;
                        (c = "function" === typeof p || "function" === typeof i.getSnapshotBeforeUpdate) || "function" !== typeof i.UNSAFE_componentWillReceiveProps && "function" !== typeof i.componentWillReceiveProps || (u !== f || d !== l) && Ko(t, i, r, l), Do = !1, d = t.memoizedState, i.state = d, Io(t, r, i, a);
                        var h = t.memoizedState;
                        u !== f || d !== h || Ta.current || Do ? ("function" === typeof p && (Bo(t, n, p, r), h = t.memoizedState), (s = Do || Ho(t, n, s, r, d, h, l) || !1) ? (c || "function" !== typeof i.UNSAFE_componentWillUpdate && "function" !== typeof i.componentWillUpdate || ("function" === typeof i.componentWillUpdate && i.componentWillUpdate(r, h, l), "function" === typeof i.UNSAFE_componentWillUpdate && i.UNSAFE_componentWillUpdate(r, h, l)), "function" === typeof i.componentDidUpdate && (t.flags |= 4), "function" === typeof i.getSnapshotBeforeUpdate && (t.flags |= 1024)) : ("function" !== typeof i.componentDidUpdate || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" !== typeof i.getSnapshotBeforeUpdate || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = h), i.props = r, i.state = h, i.context = l, r = s) : ("function" !== typeof i.componentDidUpdate || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), "function" !== typeof i.getSnapshotBeforeUpdate || u === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1)
                    }
                    return Tu(e, t, n, r, o, a)
                }

                function Tu(e, t, n, r, a, o) {
                    Cu(e, t);
                    var i = 0 !== (128 & t.flags);
                    if (!r && !i) return a && Aa(t, n, !1), Wu(e, t, o);
                    r = t.stateNode, gu.current = t;
                    var u = i && "function" !== typeof n.getDerivedStateFromError ? null : r.render();
                    return t.flags |= 1, null !== e && i ? (t.child = Zo(t, e.child, null, o), t.child = Zo(t, null, u, o)) : xu(e, t, u, o), t.memoizedState = r.state, a && Aa(t, n, !0), t.child
                }

                function Mu(e) {
                    var t = e.stateNode;
                    t.pendingContext ? Oa(0, t.pendingContext, t.pendingContext !== t.context) : t.context && Oa(0, t.context, !1), ai(e, t.containerInfo)
                }

                function Du(e, t, n, r, a) {
                    return ho(), vo(a), t.flags |= 256, xu(e, t, n, r), t.child
                }
                var Nu, Ru, Ou, Lu = {
                    dehydrated: null,
                    treeContext: null,
                    retryLane: 0
                };

                function Fu(e) {
                    return {
                        baseLanes: e,
                        cachePool: null,
                        transitions: null
                    }
                }

                function Au(e, t, n) {
                    var r, a = t.pendingProps,
                        i = li.current,
                        u = !1,
                        l = 0 !== (128 & t.flags);
                    if ((r = l) || (r = (null === e || null !== e.memoizedState) && 0 !== (2 & i)), r ? (u = !0, t.flags &= -129) : null !== e && null === e.memoizedState || (i |= 1), Ca(li, 1 & i), null === e) return so(t), null !== (e = t.memoizedState) && null !== (e = e.dehydrated) ? (0 === (1 & t.mode) ? t.lanes = 1 : "$!" === e.data ? t.lanes = 8 : t.lanes = 1073741824, null) : (l = a.children, e = a.fallback, u ? (a = t.mode, u = t.child, l = {
                        mode: "hidden",
                        children: l
                    }, 0 === (1 & a) && null !== u ? (u.childLanes = 0, u.pendingProps = l) : u = Fs(l, a, 0, null), e = Ls(e, a, n, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Fu(n), t.memoizedState = Lu, e) : Iu(t, l));
                    if (null !== (i = e.memoizedState) && null !== (r = i.dehydrated)) return function(e, t, n, r, a, i, u) {
                        if (n) return 256 & t.flags ? (t.flags &= -257, zu(e, t, u, r = fu(Error(o(422))))) : null !== t.memoizedState ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, a = t.mode, r = Fs({
                            mode: "visible",
                            children: r.children
                        }, a, 0, null), (i = Ls(i, a, u, null)).flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, 0 !== (1 & t.mode) && Zo(t, e.child, null, u), t.child.memoizedState = Fu(u), t.memoizedState = Lu, i);
                        if (0 === (1 & t.mode)) return zu(e, t, u, null);
                        if ("$!" === a.data) {
                            if (r = a.nextSibling && a.nextSibling.dataset) var l = r.dgst;
                            return r = l, zu(e, t, u, r = fu(i = Error(o(419)), r, void 0))
                        }
                        if (l = 0 !== (u & e.childLanes), wu || l) {
                            if (null !== (r = Tl)) {
                                switch (u & -u) {
                                    case 4:
                                        a = 2;
                                        break;
                                    case 16:
                                        a = 8;
                                        break;
                                    case 64:
                                    case 128:
                                    case 256:
                                    case 512:
                                    case 1024:
                                    case 2048:
                                    case 4096:
                                    case 8192:
                                    case 16384:
                                    case 32768:
                                    case 65536:
                                    case 131072:
                                    case 262144:
                                    case 524288:
                                    case 1048576:
                                    case 2097152:
                                    case 4194304:
                                    case 8388608:
                                    case 16777216:
                                    case 33554432:
                                    case 67108864:
                                        a = 32;
                                        break;
                                    case 536870912:
                                        a = 268435456;
                                        break;
                                    default:
                                        a = 0
                                }
                                0 !== (a = 0 !== (a & (r.suspendedLanes | u)) ? 0 : a) && a !== i.retryLane && (i.retryLane = a, Mo(e, a), ns(r, e, a, -1))
                            }
                            return vs(), zu(e, t, u, r = fu(Error(o(421))))
                        }
                        return "$?" === a.data ? (t.flags |= 128, t.child = e.child, t = js.bind(null, e), a._reactRetry = t, null) : (e = i.treeContext, ro = sa(a.nextSibling), no = t, ao = !0, oo = null, null !== e && ($a[Ga++] = Ya, $a[Ga++] = Za, $a[Ga++] = Qa, Ya = e.id, Za = e.overflow, Qa = t), t = Iu(t, r.children), t.flags |= 4096, t)
                    }(e, t, l, a, r, i, n);
                    if (u) {
                        u = a.fallback, l = t.mode, r = (i = e.child).sibling;
                        var s = {
                            mode: "hidden",
                            children: a.children
                        };
                        return 0 === (1 & l) && t.child !== i ? ((a = t.child).childLanes = 0, a.pendingProps = s, t.deletions = null) : (a = Rs(i, s)).subtreeFlags = 14680064 & i.subtreeFlags, null !== r ? u = Rs(r, u) : (u = Ls(u, l, n, null)).flags |= 2, u.return = t, a.return = t, a.sibling = u, t.child = a, a = u, u = t.child, l = null === (l = e.child.memoizedState) ? Fu(n) : {
                            baseLanes: l.baseLanes | n,
                            cachePool: null,
                            transitions: l.transitions
                        }, u.memoizedState = l, u.childLanes = e.childLanes & ~n, t.memoizedState = Lu, a
                    }
                    return e = (u = e.child).sibling, a = Rs(u, {
                        mode: "visible",
                        children: a.children
                    }), 0 === (1 & t.mode) && (a.lanes = n), a.return = t, a.sibling = null, null !== e && (null === (n = t.deletions) ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = a, t.memoizedState = null, a
                }

                function Iu(e, t) {
                    return (t = Fs({
                        mode: "visible",
                        children: t
                    }, e.mode, 0, null)).return = e, e.child = t
                }

                function zu(e, t, n, r) {
                    return null !== r && vo(r), Zo(t, e.child, null, n), (e = Iu(t, t.pendingProps.children)).flags |= 2, t.memoizedState = null, e
                }

                function Uu(e, t, n) {
                    e.lanes |= t;
                    var r = e.alternate;
                    null !== r && (r.lanes |= t), _o(e.return, t, n)
                }

                function Bu(e, t, n, r, a) {
                    var o = e.memoizedState;
                    null === o ? e.memoizedState = {
                        isBackwards: t,
                        rendering: null,
                        renderingStartTime: 0,
                        last: r,
                        tail: n,
                        tailMode: a
                    } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a)
                }

                function Vu(e, t, n) {
                    var r = t.pendingProps,
                        a = r.revealOrder,
                        o = r.tail;
                    if (xu(e, t, r.children, n), 0 !== (2 & (r = li.current))) r = 1 & r | 2, t.flags |= 128;
                    else {
                        if (null !== e && 0 !== (128 & e.flags)) e: for (e = t.child; null !== e;) {
                            if (13 === e.tag) null !== e.memoizedState && Uu(e, n, t);
                            else if (19 === e.tag) Uu(e, n, t);
                            else if (null !== e.child) {
                                e.child.return = e, e = e.child;
                                continue
                            }
                            if (e === t) break e;
                            for (; null === e.sibling;) {
                                if (null === e.return || e.return === t) break e;
                                e = e.return
                            }
                            e.sibling.return = e.return, e = e.sibling
                        }
                        r &= 1
                    }
                    if (Ca(li, r), 0 === (1 & t.mode)) t.memoizedState = null;
                    else switch (a) {
                        case "forwards":
                            for (n = t.child, a = null; null !== n;) null !== (e = n.alternate) && null === si(e) && (a = n), n = n.sibling;
                            null === (n = a) ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Bu(t, !1, a, n, o);
                            break;
                        case "backwards":
                            for (n = null, a = t.child, t.child = null; null !== a;) {
                                if (null !== (e = a.alternate) && null === si(e)) {
                                    t.child = a;
                                    break
                                }
                                e = a.sibling, a.sibling = n, n = a, a = e
                            }
                            Bu(t, !0, n, null, o);
                            break;
                        case "together":
                            Bu(t, !1, null, null, void 0);
                            break;
                        default:
                            t.memoizedState = null
                    }
                    return t.child
                }

                function Hu(e, t) {
                    0 === (1 & t.mode) && null !== e && (e.alternate = null, t.alternate = null, t.flags |= 2)
                }

                function Wu(e, t, n) {
                    if (null !== e && (t.dependencies = e.dependencies), Fl |= t.lanes, 0 === (n & t.childLanes)) return null;
                    if (null !== e && t.child !== e.child) throw Error(o(153));
                    if (null !== t.child) {
                        for (n = Rs(e = t.child, e.pendingProps), t.child = n, n.return = t; null !== e.sibling;) e = e.sibling, (n = n.sibling = Rs(e, e.pendingProps)).return = t;
                        n.sibling = null
                    }
                    return t.child
                }

                function Ku(e, t) {
                    if (!ao) switch (e.tailMode) {
                        case "hidden":
                            t = e.tail;
                            for (var n = null; null !== t;) null !== t.alternate && (n = t), t = t.sibling;
                            null === n ? e.tail = null : n.sibling = null;
                            break;
                        case "collapsed":
                            n = e.tail;
                            for (var r = null; null !== n;) null !== n.alternate && (r = n), n = n.sibling;
                            null === r ? t || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null
                    }
                }

                function qu(e) {
                    var t = null !== e.alternate && e.alternate.child === e.child,
                        n = 0,
                        r = 0;
                    if (t)
                        for (var a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= 14680064 & a.subtreeFlags, r |= 14680064 & a.flags, a.return = e, a = a.sibling;
                    else
                        for (a = e.child; null !== a;) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
                    return e.subtreeFlags |= r, e.childLanes = n, t
                }

                function $u(e, t, n) {
                    var r = t.pendingProps;
                    switch (to(t), t.tag) {
                        case 2:
                        case 16:
                        case 15:
                        case 0:
                        case 11:
                        case 7:
                        case 8:
                        case 12:
                        case 9:
                        case 14:
                            return qu(t), null;
                        case 1:
                        case 17:
                            return Na(t.type) && Ra(), qu(t), null;
                        case 3:
                            return r = t.stateNode, oi(), Ea(Ta), Ea(Pa), fi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), null !== e && null !== e.child || (fo(t) ? t.flags |= 4 : null === e || e.memoizedState.isDehydrated && 0 === (256 & t.flags) || (t.flags |= 1024, null !== oo && (is(oo), oo = null))), qu(t), null;
                        case 5:
                            ui(t);
                            var a = ri(ni.current);
                            if (n = t.type, null !== e && null != t.stateNode) Ru(e, t, n, r), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
                            else {
                                if (!r) {
                                    if (null === t.stateNode) throw Error(o(166));
                                    return qu(t), null
                                }
                                if (e = ri(ei.current), fo(t)) {
                                    r = t.stateNode, n = t.type;
                                    var i = t.memoizedProps;
                                    switch (r[da] = t, r[pa] = i, e = 0 !== (1 & t.mode), n) {
                                        case "dialog":
                                            zr("cancel", r), zr("close", r);
                                            break;
                                        case "iframe":
                                        case "object":
                                        case "embed":
                                            zr("load", r);
                                            break;
                                        case "video":
                                        case "audio":
                                            for (a = 0; a < Lr.length; a++) zr(Lr[a], r);
                                            break;
                                        case "source":
                                            zr("error", r);
                                            break;
                                        case "img":
                                        case "image":
                                        case "link":
                                            zr("error", r), zr("load", r);
                                            break;
                                        case "details":
                                            zr("toggle", r);
                                            break;
                                        case "input":
                                            Y(r, i), zr("invalid", r);
                                            break;
                                        case "select":
                                            r._wrapperState = {
                                                wasMultiple: !!i.multiple
                                            }, zr("invalid", r);
                                            break;
                                        case "textarea":
                                            ae(r, i), zr("invalid", r)
                                    }
                                    for (var l in ye(n, i), a = null, i)
                                        if (i.hasOwnProperty(l)) {
                                            var s = i[l];
                                            "children" === l ? "string" === typeof s ? r.textContent !== s && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, s, e), a = ["children", s]) : "number" === typeof s && r.textContent !== "" + s && (!0 !== i.suppressHydrationWarning && Xr(r.textContent, s, e), a = ["children", "" + s]) : u.hasOwnProperty(l) && null != s && "onScroll" === l && zr("scroll", r)
                                        } switch (n) {
                                        case "input":
                                            q(r), J(r, i, !0);
                                            break;
                                        case "textarea":
                                            q(r), ie(r);
                                            break;
                                        case "select":
                                        case "option":
                                            break;
                                        default:
                                            "function" === typeof i.onClick && (r.onclick = Jr)
                                    }
                                    r = a, t.updateQueue = r, null !== r && (t.flags |= 4)
                                } else {
                                    l = 9 === a.nodeType ? a : a.ownerDocument, "http://www.w3.org/1999/xhtml" === e && (e = ue(n)), "http://www.w3.org/1999/xhtml" === e ? "script" === n ? ((e = l.createElement("div")).innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : "string" === typeof r.is ? e = l.createElement(n, {
                                        is: r.is
                                    }) : (e = l.createElement(n), "select" === n && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[da] = t, e[pa] = r, Nu(e, t), t.stateNode = e;
                                    e: {
                                        switch (l = ge(n, r), n) {
                                            case "dialog":
                                                zr("cancel", e), zr("close", e), a = r;
                                                break;
                                            case "iframe":
                                            case "object":
                                            case "embed":
                                                zr("load", e), a = r;
                                                break;
                                            case "video":
                                            case "audio":
                                                for (a = 0; a < Lr.length; a++) zr(Lr[a], e);
                                                a = r;
                                                break;
                                            case "source":
                                                zr("error", e), a = r;
                                                break;
                                            case "img":
                                            case "image":
                                            case "link":
                                                zr("error", e), zr("load", e), a = r;
                                                break;
                                            case "details":
                                                zr("toggle", e), a = r;
                                                break;
                                            case "input":
                                                Y(e, r), a = Q(e, r), zr("invalid", e);
                                                break;
                                            case "option":
                                            default:
                                                a = r;
                                                break;
                                            case "select":
                                                e._wrapperState = {
                                                    wasMultiple: !!r.multiple
                                                }, a = A({}, r, {
                                                    value: void 0
                                                }), zr("invalid", e);
                                                break;
                                            case "textarea":
                                                ae(e, r), a = re(e, r), zr("invalid", e)
                                        }
                                        for (i in ye(n, a), s = a)
                                            if (s.hasOwnProperty(i)) {
                                                var c = s[i];
                                                "style" === i ? me(e, c) : "dangerouslySetInnerHTML" === i ? null != (c = c ? c.__html : void 0) && fe(e, c) : "children" === i ? "string" === typeof c ? ("textarea" !== n || "" !== c) && de(e, c) : "number" === typeof c && de(e, "" + c) : "suppressContentEditableWarning" !== i && "suppressHydrationWarning" !== i && "autoFocus" !== i && (u.hasOwnProperty(i) ? null != c && "onScroll" === i && zr("scroll", e) : null != c && g(e, i, c, l))
                                            } switch (n) {
                                            case "input":
                                                q(e), J(e, r, !1);
                                                break;
                                            case "textarea":
                                                q(e), ie(e);
                                                break;
                                            case "option":
                                                null != r.value && e.setAttribute("value", "" + W(r.value));
                                                break;
                                            case "select":
                                                e.multiple = !!r.multiple, null != (i = r.value) ? ne(e, !!r.multiple, i, !1) : null != r.defaultValue && ne(e, !!r.multiple, r.defaultValue, !0);
                                                break;
                                            default:
                                                "function" === typeof a.onClick && (e.onclick = Jr)
                                        }
                                        switch (n) {
                                            case "button":
                                            case "input":
                                            case "select":
                                            case "textarea":
                                                r = !!r.autoFocus;
                                                break e;
                                            case "img":
                                                r = !0;
                                                break e;
                                            default:
                                                r = !1
                                        }
                                    }
                                    r && (t.flags |= 4)
                                }
                                null !== t.ref && (t.flags |= 512, t.flags |= 2097152)
                            }
                            return qu(t), null;
                        case 6:
                            if (e && null != t.stateNode) Ou(0, t, e.memoizedProps, r);
                            else {
                                if ("string" !== typeof r && null === t.stateNode) throw Error(o(166));
                                if (n = ri(ni.current), ri(ei.current), fo(t)) {
                                    if (r = t.stateNode, n = t.memoizedProps, r[da] = t, (i = r.nodeValue !== n) && null !== (e = no)) switch (e.tag) {
                                        case 3:
                                            Xr(r.nodeValue, n, 0 !== (1 & e.mode));
                                            break;
                                        case 5:
                                            !0 !== e.memoizedProps.suppressHydrationWarning && Xr(r.nodeValue, n, 0 !== (1 & e.mode))
                                    }
                                    i && (t.flags |= 4)
                                } else(r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(r))[da] = t, t.stateNode = r
                            }
                            return qu(t), null;
                        case 13:
                            if (Ea(li), r = t.memoizedState, null === e || null !== e.memoizedState && null !== e.memoizedState.dehydrated) {
                                if (ao && null !== ro && 0 !== (1 & t.mode) && 0 === (128 & t.flags)) po(), ho(), t.flags |= 98560, i = !1;
                                else if (i = fo(t), null !== r && null !== r.dehydrated) {
                                    if (null === e) {
                                        if (!i) throw Error(o(318));
                                        if (!(i = null !== (i = t.memoizedState) ? i.dehydrated : null)) throw Error(o(317));
                                        i[da] = t
                                    } else ho(), 0 === (128 & t.flags) && (t.memoizedState = null), t.flags |= 4;
                                    qu(t), i = !1
                                } else null !== oo && (is(oo), oo = null), i = !0;
                                if (!i) return 65536 & t.flags ? t : null
                            }
                            return 0 !== (128 & t.flags) ? (t.lanes = n, t) : ((r = null !== r) !== (null !== e && null !== e.memoizedState) && r && (t.child.flags |= 8192, 0 !== (1 & t.mode) && (null === e || 0 !== (1 & li.current) ? 0 === Ol && (Ol = 3) : vs())), null !== t.updateQueue && (t.flags |= 4), qu(t), null);
                        case 4:
                            return oi(), null === e && Vr(t.stateNode.containerInfo), qu(t), null;
                        case 10:
                            return So(t.type._context), qu(t), null;
                        case 19:
                            if (Ea(li), null === (i = t.memoizedState)) return qu(t), null;
                            if (r = 0 !== (128 & t.flags), null === (l = i.rendering))
                                if (r) Ku(i, !1);
                                else {
                                    if (0 !== Ol || null !== e && 0 !== (128 & e.flags))
                                        for (e = t.child; null !== e;) {
                                            if (null !== (l = si(e))) {
                                                for (t.flags |= 128, Ku(i, !1), null !== (r = l.updateQueue) && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; null !== n;) e = r, (i = n).flags &= 14680066, null === (l = i.alternate) ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = l.childLanes, i.lanes = l.lanes, i.child = l.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = l.memoizedProps, i.memoizedState = l.memoizedState, i.updateQueue = l.updateQueue, i.type = l.type, e = l.dependencies, i.dependencies = null === e ? null : {
                                                    lanes: e.lanes,
                                                    firstContext: e.firstContext
                                                }), n = n.sibling;
                                                return Ca(li, 1 & li.current | 2), t.child
                                            }
                                            e = e.sibling
                                        }
                                    null !== i.tail && Ze() > Vl && (t.flags |= 128, r = !0, Ku(i, !1), t.lanes = 4194304)
                                }
                            else {
                                if (!r)
                                    if (null !== (e = si(l))) {
                                        if (t.flags |= 128, r = !0, null !== (n = e.updateQueue) && (t.updateQueue = n, t.flags |= 4), Ku(i, !0), null === i.tail && "hidden" === i.tailMode && !l.alternate && !ao) return qu(t), null
                                    } else 2 * Ze() - i.renderingStartTime > Vl && 1073741824 !== n && (t.flags |= 128, r = !0, Ku(i, !1), t.lanes = 4194304);
                                i.isBackwards ? (l.sibling = t.child, t.child = l) : (null !== (n = i.last) ? n.sibling = l : t.child = l, i.last = l)
                            }
                            return null !== i.tail ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Ze(), t.sibling = null, n = li.current, Ca(li, r ? 1 & n | 2 : 1 & n), t) : (qu(t), null);
                        case 22:
                        case 23:
                            return fs(), r = null !== t.memoizedState, null !== e && null !== e.memoizedState !== r && (t.flags |= 8192), r && 0 !== (1 & t.mode) ? 0 !== (1073741824 & Nl) && (qu(t), 6 & t.subtreeFlags && (t.flags |= 8192)) : qu(t), null;
                        case 24:
                        case 25:
                            return null
                    }
                    throw Error(o(156, t.tag))
                }

                function Gu(e, t) {
                    switch (to(t), t.tag) {
                        case 1:
                            return Na(t.type) && Ra(), 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                        case 3:
                            return oi(), Ea(Ta), Ea(Pa), fi(), 0 !== (65536 & (e = t.flags)) && 0 === (128 & e) ? (t.flags = -65537 & e | 128, t) : null;
                        case 5:
                            return ui(t), null;
                        case 13:
                            if (Ea(li), null !== (e = t.memoizedState) && null !== e.dehydrated) {
                                if (null === t.alternate) throw Error(o(340));
                                ho()
                            }
                            return 65536 & (e = t.flags) ? (t.flags = -65537 & e | 128, t) : null;
                        case 19:
                            return Ea(li), null;
                        case 4:
                            return oi(), null;
                        case 10:
                            return So(t.type._context), null;
                        case 22:
                        case 23:
                            return fs(), null;
                        default:
                            return null
                    }
                }
                Nu = function(e, t) {
                    for (var n = t.child; null !== n;) {
                        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
                        else if (4 !== n.tag && null !== n.child) {
                            n.child.return = n, n = n.child;
                            continue
                        }
                        if (n === t) break;
                        for (; null === n.sibling;) {
                            if (null === n.return || n.return === t) return;
                            n = n.return
                        }
                        n.sibling.return = n.return, n = n.sibling
                    }
                }, Ru = function(e, t, n, r) {
                    var a = e.memoizedProps;
                    if (a !== r) {
                        e = t.stateNode, ri(ei.current);
                        var o, i = null;
                        switch (n) {
                            case "input":
                                a = Q(e, a), r = Q(e, r), i = [];
                                break;
                            case "select":
                                a = A({}, a, {
                                    value: void 0
                                }), r = A({}, r, {
                                    value: void 0
                                }), i = [];
                                break;
                            case "textarea":
                                a = re(e, a), r = re(e, r), i = [];
                                break;
                            default:
                                "function" !== typeof a.onClick && "function" === typeof r.onClick && (e.onclick = Jr)
                        }
                        for (c in ye(n, r), n = null, a)
                            if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c])
                                if ("style" === c) {
                                    var l = a[c];
                                    for (o in l) l.hasOwnProperty(o) && (n || (n = {}), n[o] = "")
                                } else "dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (u.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
                        for (c in r) {
                            var s = r[c];
                            if (l = null != a ? a[c] : void 0, r.hasOwnProperty(c) && s !== l && (null != s || null != l))
                                if ("style" === c)
                                    if (l) {
                                        for (o in l) !l.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
                                        for (o in s) s.hasOwnProperty(o) && l[o] !== s[o] && (n || (n = {}), n[o] = s[o])
                                    } else n || (i || (i = []), i.push(c, n)), n = s;
                            else "dangerouslySetInnerHTML" === c ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, null != s && l !== s && (i = i || []).push(c, s)) : "children" === c ? "string" !== typeof s && "number" !== typeof s || (i = i || []).push(c, "" + s) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (u.hasOwnProperty(c) ? (null != s && "onScroll" === c && zr("scroll", e), i || l === s || (i = [])) : (i = i || []).push(c, s))
                        }
                        n && (i = i || []).push("style", n);
                        var c = i;
                        (t.updateQueue = c) && (t.flags |= 4)
                    }
                }, Ou = function(e, t, n, r) {
                    n !== r && (t.flags |= 4)
                };
                var Qu = !1,
                    Yu = !1,
                    Zu = "function" === typeof WeakSet ? WeakSet : Set,
                    Xu = null;

                function Ju(e, t) {
                    var n = e.ref;
                    if (null !== n)
                        if ("function" === typeof n) try {
                            n(null)
                        } catch (r) {
                            _s(e, t, r)
                        } else n.current = null
                }

                function el(e, t, n) {
                    try {
                        n()
                    } catch (r) {
                        _s(e, t, r)
                    }
                }
                var tl = !1;

                function nl(e, t, n) {
                    var r = t.updateQueue;
                    if (null !== (r = null !== r ? r.lastEffect : null)) {
                        var a = r = r.next;
                        do {
                            if ((a.tag & e) === e) {
                                var o = a.destroy;
                                a.destroy = void 0, void 0 !== o && el(t, n, o)
                            }
                            a = a.next
                        } while (a !== r)
                    }
                }

                function rl(e, t) {
                    if (null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)) {
                        var n = t = t.next;
                        do {
                            if ((n.tag & e) === e) {
                                var r = n.create;
                                n.destroy = r()
                            }
                            n = n.next
                        } while (n !== t)
                    }
                }

                function al(e) {
                    var t = e.ref;
                    if (null !== t) {
                        var n = e.stateNode;
                        e.tag, e = n, "function" === typeof t ? t(e) : t.current = e
                    }
                }

                function ol(e) {
                    var t = e.alternate;
                    null !== t && (e.alternate = null, ol(t)), e.child = null, e.deletions = null, e.sibling = null, 5 === e.tag && (null !== (t = e.stateNode) && (delete t[da], delete t[pa], delete t[va], delete t[ma], delete t[ba])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
                }

                function il(e) {
                    return 5 === e.tag || 3 === e.tag || 4 === e.tag
                }

                function ul(e) {
                    e: for (;;) {
                        for (; null === e.sibling;) {
                            if (null === e.return || il(e.return)) return null;
                            e = e.return
                        }
                        for (e.sibling.return = e.return, e = e.sibling; 5 !== e.tag && 6 !== e.tag && 18 !== e.tag;) {
                            if (2 & e.flags) continue e;
                            if (null === e.child || 4 === e.tag) continue e;
                            e.child.return = e, e = e.child
                        }
                        if (!(2 & e.flags)) return e.stateNode
                    }
                }

                function ll(e, t, n) {
                    var r = e.tag;
                    if (5 === r || 6 === r) e = e.stateNode, t ? 8 === n.nodeType ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (8 === n.nodeType ? (t = n.parentNode).insertBefore(e, n) : (t = n).appendChild(e), null !== (n = n._reactRootContainer) && void 0 !== n || null !== t.onclick || (t.onclick = Jr));
                    else if (4 !== r && null !== (e = e.child))
                        for (ll(e, t, n), e = e.sibling; null !== e;) ll(e, t, n), e = e.sibling
                }

                function sl(e, t, n) {
                    var r = e.tag;
                    if (5 === r || 6 === r) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
                    else if (4 !== r && null !== (e = e.child))
                        for (sl(e, t, n), e = e.sibling; null !== e;) sl(e, t, n), e = e.sibling
                }
                var cl = null,
                    fl = !1;

                function dl(e, t, n) {
                    for (n = n.child; null !== n;) pl(e, t, n), n = n.sibling
                }

                function pl(e, t, n) {
                    if (ot && "function" === typeof ot.onCommitFiberUnmount) try {
                        ot.onCommitFiberUnmount(at, n)
                    } catch (u) {}
                    switch (n.tag) {
                        case 5:
                            Yu || Ju(n, t);
                        case 6:
                            var r = cl,
                                a = fl;
                            cl = null, dl(e, t, n), fl = a, null !== (cl = r) && (fl ? (e = cl, n = n.stateNode, 8 === e.nodeType ? e.parentNode.removeChild(n) : e.removeChild(n)) : cl.removeChild(n.stateNode));
                            break;
                        case 18:
                            null !== cl && (fl ? (e = cl, n = n.stateNode, 8 === e.nodeType ? la(e.parentNode, n) : 1 === e.nodeType && la(e, n), Vt(e)) : la(cl, n.stateNode));
                            break;
                        case 4:
                            r = cl, a = fl, cl = n.stateNode.containerInfo, fl = !0, dl(e, t, n), cl = r, fl = a;
                            break;
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            if (!Yu && (null !== (r = n.updateQueue) && null !== (r = r.lastEffect))) {
                                a = r = r.next;
                                do {
                                    var o = a,
                                        i = o.destroy;
                                    o = o.tag, void 0 !== i && (0 !== (2 & o) || 0 !== (4 & o)) && el(n, t, i), a = a.next
                                } while (a !== r)
                            }
                            dl(e, t, n);
                            break;
                        case 1:
                            if (!Yu && (Ju(n, t), "function" === typeof(r = n.stateNode).componentWillUnmount)) try {
                                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
                            } catch (u) {
                                _s(n, t, u)
                            }
                            dl(e, t, n);
                            break;
                        case 21:
                            dl(e, t, n);
                            break;
                        case 22:
                            1 & n.mode ? (Yu = (r = Yu) || null !== n.memoizedState, dl(e, t, n), Yu = r) : dl(e, t, n);
                            break;
                        default:
                            dl(e, t, n)
                    }
                }

                function hl(e) {
                    var t = e.updateQueue;
                    if (null !== t) {
                        e.updateQueue = null;
                        var n = e.stateNode;
                        null === n && (n = e.stateNode = new Zu), t.forEach((function(t) {
                            var r = Ps.bind(null, e, t);
                            n.has(t) || (n.add(t), t.then(r, r))
                        }))
                    }
                }

                function vl(e, t) {
                    var n = t.deletions;
                    if (null !== n)
                        for (var r = 0; r < n.length; r++) {
                            var a = n[r];
                            try {
                                var i = e,
                                    u = t,
                                    l = u;
                                e: for (; null !== l;) {
                                    switch (l.tag) {
                                        case 5:
                                            cl = l.stateNode, fl = !1;
                                            break e;
                                        case 3:
                                        case 4:
                                            cl = l.stateNode.containerInfo, fl = !0;
                                            break e
                                    }
                                    l = l.return
                                }
                                if (null === cl) throw Error(o(160));
                                pl(i, u, a), cl = null, fl = !1;
                                var s = a.alternate;
                                null !== s && (s.return = null), a.return = null
                            } catch (c) {
                                _s(a, t, c)
                            }
                        }
                    if (12854 & t.subtreeFlags)
                        for (t = t.child; null !== t;) ml(t, e), t = t.sibling
                }

                function ml(e, t) {
                    var n = e.alternate,
                        r = e.flags;
                    switch (e.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            if (vl(t, e), bl(e), 4 & r) {
                                try {
                                    nl(3, e, e.return), rl(3, e)
                                } catch (m) {
                                    _s(e, e.return, m)
                                }
                                try {
                                    nl(5, e, e.return)
                                } catch (m) {
                                    _s(e, e.return, m)
                                }
                            }
                            break;
                        case 1:
                            vl(t, e), bl(e), 512 & r && null !== n && Ju(n, n.return);
                            break;
                        case 5:
                            if (vl(t, e), bl(e), 512 & r && null !== n && Ju(n, n.return), 32 & e.flags) {
                                var a = e.stateNode;
                                try {
                                    de(a, "")
                                } catch (m) {
                                    _s(e, e.return, m)
                                }
                            }
                            if (4 & r && null != (a = e.stateNode)) {
                                var i = e.memoizedProps,
                                    u = null !== n ? n.memoizedProps : i,
                                    l = e.type,
                                    s = e.updateQueue;
                                if (e.updateQueue = null, null !== s) try {
                                    "input" === l && "radio" === i.type && null != i.name && Z(a, i), ge(l, u);
                                    var c = ge(l, i);
                                    for (u = 0; u < s.length; u += 2) {
                                        var f = s[u],
                                            d = s[u + 1];
                                        "style" === f ? me(a, d) : "dangerouslySetInnerHTML" === f ? fe(a, d) : "children" === f ? de(a, d) : g(a, f, d, c)
                                    }
                                    switch (l) {
                                        case "input":
                                            X(a, i);
                                            break;
                                        case "textarea":
                                            oe(a, i);
                                            break;
                                        case "select":
                                            var p = a._wrapperState.wasMultiple;
                                            a._wrapperState.wasMultiple = !!i.multiple;
                                            var h = i.value;
                                            null != h ? ne(a, !!i.multiple, h, !1) : p !== !!i.multiple && (null != i.defaultValue ? ne(a, !!i.multiple, i.defaultValue, !0) : ne(a, !!i.multiple, i.multiple ? [] : "", !1))
                                    }
                                    a[pa] = i
                                } catch (m) {
                                    _s(e, e.return, m)
                                }
                            }
                            break;
                        case 6:
                            if (vl(t, e), bl(e), 4 & r) {
                                if (null === e.stateNode) throw Error(o(162));
                                a = e.stateNode, i = e.memoizedProps;
                                try {
                                    a.nodeValue = i
                                } catch (m) {
                                    _s(e, e.return, m)
                                }
                            }
                            break;
                        case 3:
                            if (vl(t, e), bl(e), 4 & r && null !== n && n.memoizedState.isDehydrated) try {
                                Vt(t.containerInfo)
                            } catch (m) {
                                _s(e, e.return, m)
                            }
                            break;
                        case 4:
                        default:
                            vl(t, e), bl(e);
                            break;
                        case 13:
                            vl(t, e), bl(e), 8192 & (a = e.child).flags && (i = null !== a.memoizedState, a.stateNode.isHidden = i, !i || null !== a.alternate && null !== a.alternate.memoizedState || (Bl = Ze())), 4 & r && hl(e);
                            break;
                        case 22:
                            if (f = null !== n && null !== n.memoizedState, 1 & e.mode ? (Yu = (c = Yu) || f, vl(t, e), Yu = c) : vl(t, e), bl(e), 8192 & r) {
                                if (c = null !== e.memoizedState, (e.stateNode.isHidden = c) && !f && 0 !== (1 & e.mode))
                                    for (Xu = e, f = e.child; null !== f;) {
                                        for (d = Xu = f; null !== Xu;) {
                                            switch (h = (p = Xu).child, p.tag) {
                                                case 0:
                                                case 11:
                                                case 14:
                                                case 15:
                                                    nl(4, p, p.return);
                                                    break;
                                                case 1:
                                                    Ju(p, p.return);
                                                    var v = p.stateNode;
                                                    if ("function" === typeof v.componentWillUnmount) {
                                                        r = p, n = p.return;
                                                        try {
                                                            t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount()
                                                        } catch (m) {
                                                            _s(r, n, m)
                                                        }
                                                    }
                                                    break;
                                                case 5:
                                                    Ju(p, p.return);
                                                    break;
                                                case 22:
                                                    if (null !== p.memoizedState) {
                                                        xl(d);
                                                        continue
                                                    }
                                            }
                                            null !== h ? (h.return = p, Xu = h) : xl(d)
                                        }
                                        f = f.sibling
                                    }
                                e: for (f = null, d = e;;) {
                                    if (5 === d.tag) {
                                        if (null === f) {
                                            f = d;
                                            try {
                                                a = d.stateNode, c ? "function" === typeof(i = a.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none" : (l = d.stateNode, u = void 0 !== (s = d.memoizedProps.style) && null !== s && s.hasOwnProperty("display") ? s.display : null, l.style.display = ve("display", u))
                                            } catch (m) {
                                                _s(e, e.return, m)
                                            }
                                        }
                                    } else if (6 === d.tag) {
                                        if (null === f) try {
                                            d.stateNode.nodeValue = c ? "" : d.memoizedProps
                                        } catch (m) {
                                            _s(e, e.return, m)
                                        }
                                    } else if ((22 !== d.tag && 23 !== d.tag || null === d.memoizedState || d === e) && null !== d.child) {
                                        d.child.return = d, d = d.child;
                                        continue
                                    }
                                    if (d === e) break e;
                                    for (; null === d.sibling;) {
                                        if (null === d.return || d.return === e) break e;
                                        f === d && (f = null), d = d.return
                                    }
                                    f === d && (f = null), d.sibling.return = d.return, d = d.sibling
                                }
                            }
                            break;
                        case 19:
                            vl(t, e), bl(e), 4 & r && hl(e);
                        case 21:
                    }
                }

                function bl(e) {
                    var t = e.flags;
                    if (2 & t) {
                        try {
                            e: {
                                for (var n = e.return; null !== n;) {
                                    if (il(n)) {
                                        var r = n;
                                        break e
                                    }
                                    n = n.return
                                }
                                throw Error(o(160))
                            }
                            switch (r.tag) {
                                case 5:
                                    var a = r.stateNode;
                                    32 & r.flags && (de(a, ""), r.flags &= -33), sl(e, ul(e), a);
                                    break;
                                case 3:
                                case 4:
                                    var i = r.stateNode.containerInfo;
                                    ll(e, ul(e), i);
                                    break;
                                default:
                                    throw Error(o(161))
                            }
                        }
                        catch (u) {
                            _s(e, e.return, u)
                        }
                        e.flags &= -3
                    }
                    4096 & t && (e.flags &= -4097)
                }

                function yl(e, t, n) {
                    Xu = e, gl(e, t, n)
                }

                function gl(e, t, n) {
                    for (var r = 0 !== (1 & e.mode); null !== Xu;) {
                        var a = Xu,
                            o = a.child;
                        if (22 === a.tag && r) {
                            var i = null !== a.memoizedState || Qu;
                            if (!i) {
                                var u = a.alternate,
                                    l = null !== u && null !== u.memoizedState || Yu;
                                u = Qu;
                                var s = Yu;
                                if (Qu = i, (Yu = l) && !s)
                                    for (Xu = a; null !== Xu;) l = (i = Xu).child, 22 === i.tag && null !== i.memoizedState ? kl(a) : null !== l ? (l.return = i, Xu = l) : kl(a);
                                for (; null !== o;) Xu = o, gl(o, t, n), o = o.sibling;
                                Xu = a, Qu = u, Yu = s
                            }
                            wl(e)
                        } else 0 !== (8772 & a.subtreeFlags) && null !== o ? (o.return = a, Xu = o) : wl(e)
                    }
                }

                function wl(e) {
                    for (; null !== Xu;) {
                        var t = Xu;
                        if (0 !== (8772 & t.flags)) {
                            var n = t.alternate;
                            try {
                                if (0 !== (8772 & t.flags)) switch (t.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Yu || rl(5, t);
                                        break;
                                    case 1:
                                        var r = t.stateNode;
                                        if (4 & t.flags && !Yu)
                                            if (null === n) r.componentDidMount();
                                            else {
                                                var a = t.elementType === t.type ? n.memoizedProps : bo(t.type, n.memoizedProps);
                                                r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                                            } var i = t.updateQueue;
                                        null !== i && zo(t, i, r);
                                        break;
                                    case 3:
                                        var u = t.updateQueue;
                                        if (null !== u) {
                                            if (n = null, null !== t.child) switch (t.child.tag) {
                                                case 5:
                                                case 1:
                                                    n = t.child.stateNode
                                            }
                                            zo(t, u, n)
                                        }
                                        break;
                                    case 5:
                                        var l = t.stateNode;
                                        if (null === n && 4 & t.flags) {
                                            n = l;
                                            var s = t.memoizedProps;
                                            switch (t.type) {
                                                case "button":
                                                case "input":
                                                case "select":
                                                case "textarea":
                                                    s.autoFocus && n.focus();
                                                    break;
                                                case "img":
                                                    s.src && (n.src = s.src)
                                            }
                                        }
                                        break;
                                    case 6:
                                    case 4:
                                    case 12:
                                    case 19:
                                    case 17:
                                    case 21:
                                    case 22:
                                    case 23:
                                    case 25:
                                        break;
                                    case 13:
                                        if (null === t.memoizedState) {
                                            var c = t.alternate;
                                            if (null !== c) {
                                                var f = c.memoizedState;
                                                if (null !== f) {
                                                    var d = f.dehydrated;
                                                    null !== d && Vt(d)
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        throw Error(o(163))
                                }
                                Yu || 512 & t.flags && al(t)
                            } catch (p) {
                                _s(t, t.return, p)
                            }
                        }
                        if (t === e) {
                            Xu = null;
                            break
                        }
                        if (null !== (n = t.sibling)) {
                            n.return = t.return, Xu = n;
                            break
                        }
                        Xu = t.return
                    }
                }

                function xl(e) {
                    for (; null !== Xu;) {
                        var t = Xu;
                        if (t === e) {
                            Xu = null;
                            break
                        }
                        var n = t.sibling;
                        if (null !== n) {
                            n.return = t.return, Xu = n;
                            break
                        }
                        Xu = t.return
                    }
                }

                function kl(e) {
                    for (; null !== Xu;) {
                        var t = Xu;
                        try {
                            switch (t.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    var n = t.return;
                                    try {
                                        rl(4, t)
                                    } catch (l) {
                                        _s(t, n, l)
                                    }
                                    break;
                                case 1:
                                    var r = t.stateNode;
                                    if ("function" === typeof r.componentDidMount) {
                                        var a = t.return;
                                        try {
                                            r.componentDidMount()
                                        } catch (l) {
                                            _s(t, a, l)
                                        }
                                    }
                                    var o = t.return;
                                    try {
                                        al(t)
                                    } catch (l) {
                                        _s(t, o, l)
                                    }
                                    break;
                                case 5:
                                    var i = t.return;
                                    try {
                                        al(t)
                                    } catch (l) {
                                        _s(t, i, l)
                                    }
                            }
                        } catch (l) {
                            _s(t, t.return, l)
                        }
                        if (t === e) {
                            Xu = null;
                            break
                        }
                        var u = t.sibling;
                        if (null !== u) {
                            u.return = t.return, Xu = u;
                            break
                        }
                        Xu = t.return
                    }
                }
                var Sl, _l = Math.ceil,
                    El = w.ReactCurrentDispatcher,
                    Cl = w.ReactCurrentOwner,
                    jl = w.ReactCurrentBatchConfig,
                    Pl = 0,
                    Tl = null,
                    Ml = null,
                    Dl = 0,
                    Nl = 0,
                    Rl = _a(0),
                    Ol = 0,
                    Ll = null,
                    Fl = 0,
                    Al = 0,
                    Il = 0,
                    zl = null,
                    Ul = null,
                    Bl = 0,
                    Vl = 1 / 0,
                    Hl = null,
                    Wl = !1,
                    Kl = null,
                    ql = null,
                    $l = !1,
                    Gl = null,
                    Ql = 0,
                    Yl = 0,
                    Zl = null,
                    Xl = -1,
                    Jl = 0;

                function es() {
                    return 0 !== (6 & Pl) ? Ze() : -1 !== Xl ? Xl : Xl = Ze()
                }

                function ts(e) {
                    return 0 === (1 & e.mode) ? 1 : 0 !== (2 & Pl) && 0 !== Dl ? Dl & -Dl : null !== mo.transition ? (0 === Jl && (Jl = vt()), Jl) : 0 !== (e = gt) ? e : e = void 0 === (e = window.event) ? 16 : Yt(e.type)
                }

                function ns(e, t, n, r) {
                    if (50 < Yl) throw Yl = 0, Zl = null, Error(o(185));
                    bt(e, n, r), 0 !== (2 & Pl) && e === Tl || (e === Tl && (0 === (2 & Pl) && (Al |= n), 4 === Ol && us(e, Dl)), rs(e, r), 1 === n && 0 === Pl && 0 === (1 & t.mode) && (Vl = Ze() + 500, za && Va()))
                }

                function rs(e, t) {
                    var n = e.callbackNode;
                    ! function(e, t) {
                        for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
                            var i = 31 - it(o),
                                u = 1 << i,
                                l = a[i]; - 1 === l ? 0 !== (u & n) && 0 === (u & r) || (a[i] = pt(u, t)) : l <= t && (e.expiredLanes |= u), o &= ~u
                        }
                    }(e, t);
                    var r = dt(e, e === Tl ? Dl : 0);
                    if (0 === r) null !== n && Ge(n), e.callbackNode = null, e.callbackPriority = 0;
                    else if (t = r & -r, e.callbackPriority !== t) {
                        if (null != n && Ge(n), 1 === t) 0 === e.tag ? function(e) {
                            za = !0, Ba(e)
                        }(ls.bind(null, e)) : Ba(ls.bind(null, e)), ia((function() {
                            0 === (6 & Pl) && Va()
                        })), n = null;
                        else {
                            switch (wt(r)) {
                                case 1:
                                    n = Je;
                                    break;
                                case 4:
                                    n = et;
                                    break;
                                case 16:
                                default:
                                    n = tt;
                                    break;
                                case 536870912:
                                    n = rt
                            }
                            n = Ts(n, as.bind(null, e))
                        }
                        e.callbackPriority = t, e.callbackNode = n
                    }
                }

                function as(e, t) {
                    if (Xl = -1, Jl = 0, 0 !== (6 & Pl)) throw Error(o(327));
                    var n = e.callbackNode;
                    if (ks() && e.callbackNode !== n) return null;
                    var r = dt(e, e === Tl ? Dl : 0);
                    if (0 === r) return null;
                    if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = ms(e, r);
                    else {
                        t = r;
                        var a = Pl;
                        Pl |= 2;
                        var i = hs();
                        for (Tl === e && Dl === t || (Hl = null, Vl = Ze() + 500, ds(e, t));;) try {
                            ys();
                            break
                        } catch (l) {
                            ps(e, l)
                        }
                        ko(), El.current = i, Pl = a, null !== Ml ? t = 0 : (Tl = null, Dl = 0, t = Ol)
                    }
                    if (0 !== t) {
                        if (2 === t && (0 !== (a = ht(e)) && (r = a, t = os(e, a))), 1 === t) throw n = Ll, ds(e, 0), us(e, r), rs(e, Ze()), n;
                        if (6 === t) us(e, r);
                        else {
                            if (a = e.current.alternate, 0 === (30 & r) && ! function(e) {
                                    for (var t = e;;) {
                                        if (16384 & t.flags) {
                                            var n = t.updateQueue;
                                            if (null !== n && null !== (n = n.stores))
                                                for (var r = 0; r < n.length; r++) {
                                                    var a = n[r],
                                                        o = a.getSnapshot;
                                                    a = a.value;
                                                    try {
                                                        if (!ur(o(), a)) return !1
                                                    } catch (u) {
                                                        return !1
                                                    }
                                                }
                                        }
                                        if (n = t.child, 16384 & t.subtreeFlags && null !== n) n.return = t, t = n;
                                        else {
                                            if (t === e) break;
                                            for (; null === t.sibling;) {
                                                if (null === t.return || t.return === e) return !0;
                                                t = t.return
                                            }
                                            t.sibling.return = t.return, t = t.sibling
                                        }
                                    }
                                    return !0
                                }(a) && (2 === (t = ms(e, r)) && (0 !== (i = ht(e)) && (r = i, t = os(e, i))), 1 === t)) throw n = Ll, ds(e, 0), us(e, r), rs(e, Ze()), n;
                            switch (e.finishedWork = a, e.finishedLanes = r, t) {
                                case 0:
                                case 1:
                                    throw Error(o(345));
                                case 2:
                                case 5:
                                    xs(e, Ul, Hl);
                                    break;
                                case 3:
                                    if (us(e, r), (130023424 & r) === r && 10 < (t = Bl + 500 - Ze())) {
                                        if (0 !== dt(e, 0)) break;
                                        if (((a = e.suspendedLanes) & r) !== r) {
                                            es(), e.pingedLanes |= e.suspendedLanes & a;
                                            break
                                        }
                                        e.timeoutHandle = ra(xs.bind(null, e, Ul, Hl), t);
                                        break
                                    }
                                    xs(e, Ul, Hl);
                                    break;
                                case 4:
                                    if (us(e, r), (4194240 & r) === r) break;
                                    for (t = e.eventTimes, a = -1; 0 < r;) {
                                        var u = 31 - it(r);
                                        i = 1 << u, (u = t[u]) > a && (a = u), r &= ~i
                                    }
                                    if (r = a, 10 < (r = (120 > (r = Ze() - r) ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * _l(r / 1960)) - r)) {
                                        e.timeoutHandle = ra(xs.bind(null, e, Ul, Hl), r);
                                        break
                                    }
                                    xs(e, Ul, Hl);
                                    break;
                                default:
                                    throw Error(o(329))
                            }
                        }
                    }
                    return rs(e, Ze()), e.callbackNode === n ? as.bind(null, e) : null
                }

                function os(e, t) {
                    var n = zl;
                    return e.current.memoizedState.isDehydrated && (ds(e, t).flags |= 256), 2 !== (e = ms(e, t)) && (t = Ul, Ul = n, null !== t && is(t)), e
                }

                function is(e) {
                    null === Ul ? Ul = e : Ul.push.apply(Ul, e)
                }

                function us(e, t) {
                    for (t &= ~Il, t &= ~Al, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
                        var n = 31 - it(t),
                            r = 1 << n;
                        e[n] = -1, t &= ~r
                    }
                }

                function ls(e) {
                    if (0 !== (6 & Pl)) throw Error(o(327));
                    ks();
                    var t = dt(e, 0);
                    if (0 === (1 & t)) return rs(e, Ze()), null;
                    var n = ms(e, t);
                    if (0 !== e.tag && 2 === n) {
                        var r = ht(e);
                        0 !== r && (t = r, n = os(e, r))
                    }
                    if (1 === n) throw n = Ll, ds(e, 0), us(e, t), rs(e, Ze()), n;
                    if (6 === n) throw Error(o(345));
                    return e.finishedWork = e.current.alternate, e.finishedLanes = t, xs(e, Ul, Hl), rs(e, Ze()), null
                }

                function ss(e, t) {
                    var n = Pl;
                    Pl |= 1;
                    try {
                        return e(t)
                    } finally {
                        0 === (Pl = n) && (Vl = Ze() + 500, za && Va())
                    }
                }

                function cs(e) {
                    null !== Gl && 0 === Gl.tag && 0 === (6 & Pl) && ks();
                    var t = Pl;
                    Pl |= 1;
                    var n = jl.transition,
                        r = gt;
                    try {
                        if (jl.transition = null, gt = 1, e) return e()
                    } finally {
                        gt = r, jl.transition = n, 0 === (6 & (Pl = t)) && Va()
                    }
                }

                function fs() {
                    Nl = Rl.current, Ea(Rl)
                }

                function ds(e, t) {
                    e.finishedWork = null, e.finishedLanes = 0;
                    var n = e.timeoutHandle;
                    if (-1 !== n && (e.timeoutHandle = -1, aa(n)), null !== Ml)
                        for (n = Ml.return; null !== n;) {
                            var r = n;
                            switch (to(r), r.tag) {
                                case 1:
                                    null !== (r = r.type.childContextTypes) && void 0 !== r && Ra();
                                    break;
                                case 3:
                                    oi(), Ea(Ta), Ea(Pa), fi();
                                    break;
                                case 5:
                                    ui(r);
                                    break;
                                case 4:
                                    oi();
                                    break;
                                case 13:
                                case 19:
                                    Ea(li);
                                    break;
                                case 10:
                                    So(r.type._context);
                                    break;
                                case 22:
                                case 23:
                                    fs()
                            }
                            n = n.return
                        }
                    if (Tl = e, Ml = e = Rs(e.current, null), Dl = Nl = t, Ol = 0, Ll = null, Il = Al = Fl = 0, Ul = zl = null, null !== jo) {
                        for (t = 0; t < jo.length; t++)
                            if (null !== (r = (n = jo[t]).interleaved)) {
                                n.interleaved = null;
                                var a = r.next,
                                    o = n.pending;
                                if (null !== o) {
                                    var i = o.next;
                                    o.next = a, r.next = i
                                }
                                n.pending = r
                            } jo = null
                    }
                    return e
                }

                function ps(e, t) {
                    for (;;) {
                        var n = Ml;
                        try {
                            if (ko(), di.current = iu, yi) {
                                for (var r = vi.memoizedState; null !== r;) {
                                    var a = r.queue;
                                    null !== a && (a.pending = null), r = r.next
                                }
                                yi = !1
                            }
                            if (hi = 0, bi = mi = vi = null, gi = !1, wi = 0, Cl.current = null, null === n || null === n.return) {
                                Ol = 1, Ll = t, Ml = null;
                                break
                            }
                            e: {
                                var i = e,
                                    u = n.return,
                                    l = n,
                                    s = t;
                                if (t = Dl, l.flags |= 32768, null !== s && "object" === typeof s && "function" === typeof s.then) {
                                    var c = s,
                                        f = l,
                                        d = f.tag;
                                    if (0 === (1 & f.mode) && (0 === d || 11 === d || 15 === d)) {
                                        var p = f.alternate;
                                        p ? (f.updateQueue = p.updateQueue, f.memoizedState = p.memoizedState, f.lanes = p.lanes) : (f.updateQueue = null, f.memoizedState = null)
                                    }
                                    var h = bu(u);
                                    if (null !== h) {
                                        h.flags &= -257, yu(h, u, l, 0, t), 1 & h.mode && mu(i, c, t), s = c;
                                        var v = (t = h).updateQueue;
                                        if (null === v) {
                                            var m = new Set;
                                            m.add(s), t.updateQueue = m
                                        } else v.add(s);
                                        break e
                                    }
                                    if (0 === (1 & t)) {
                                        mu(i, c, t), vs();
                                        break e
                                    }
                                    s = Error(o(426))
                                } else if (ao && 1 & l.mode) {
                                    var b = bu(u);
                                    if (null !== b) {
                                        0 === (65536 & b.flags) && (b.flags |= 256), yu(b, u, l, 0, t), vo(cu(s, l));
                                        break e
                                    }
                                }
                                i = s = cu(s, l),
                                4 !== Ol && (Ol = 2),
                                null === zl ? zl = [i] : zl.push(i),
                                i = u;do {
                                    switch (i.tag) {
                                        case 3:
                                            i.flags |= 65536, t &= -t, i.lanes |= t, Ao(i, hu(0, s, t));
                                            break e;
                                        case 1:
                                            l = s;
                                            var y = i.type,
                                                g = i.stateNode;
                                            if (0 === (128 & i.flags) && ("function" === typeof y.getDerivedStateFromError || null !== g && "function" === typeof g.componentDidCatch && (null === ql || !ql.has(g)))) {
                                                i.flags |= 65536, t &= -t, i.lanes |= t, Ao(i, vu(i, l, t));
                                                break e
                                            }
                                    }
                                    i = i.return
                                } while (null !== i)
                            }
                            ws(n)
                        } catch (w) {
                            t = w, Ml === n && null !== n && (Ml = n = n.return);
                            continue
                        }
                        break
                    }
                }

                function hs() {
                    var e = El.current;
                    return El.current = iu, null === e ? iu : e
                }

                function vs() {
                    0 !== Ol && 3 !== Ol && 2 !== Ol || (Ol = 4), null === Tl || 0 === (268435455 & Fl) && 0 === (268435455 & Al) || us(Tl, Dl)
                }

                function ms(e, t) {
                    var n = Pl;
                    Pl |= 2;
                    var r = hs();
                    for (Tl === e && Dl === t || (Hl = null, ds(e, t));;) try {
                        bs();
                        break
                    } catch (a) {
                        ps(e, a)
                    }
                    if (ko(), Pl = n, El.current = r, null !== Ml) throw Error(o(261));
                    return Tl = null, Dl = 0, Ol
                }

                function bs() {
                    for (; null !== Ml;) gs(Ml)
                }

                function ys() {
                    for (; null !== Ml && !Qe();) gs(Ml)
                }

                function gs(e) {
                    var t = Sl(e.alternate, e, Nl);
                    e.memoizedProps = e.pendingProps, null === t ? ws(e) : Ml = t, Cl.current = null
                }

                function ws(e) {
                    var t = e;
                    do {
                        var n = t.alternate;
                        if (e = t.return, 0 === (32768 & t.flags)) {
                            if (null !== (n = $u(n, t, Nl))) return void(Ml = n)
                        } else {
                            if (null !== (n = Gu(n, t))) return n.flags &= 32767, void(Ml = n);
                            if (null === e) return Ol = 6, void(Ml = null);
                            e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null
                        }
                        if (null !== (t = t.sibling)) return void(Ml = t);
                        Ml = t = e
                    } while (null !== t);
                    0 === Ol && (Ol = 5)
                }

                function xs(e, t, n) {
                    var r = gt,
                        a = jl.transition;
                    try {
                        jl.transition = null, gt = 1,
                            function(e, t, n, r) {
                                do {
                                    ks()
                                } while (null !== Gl);
                                if (0 !== (6 & Pl)) throw Error(o(327));
                                n = e.finishedWork;
                                var a = e.finishedLanes;
                                if (null === n) return null;
                                if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(o(177));
                                e.callbackNode = null, e.callbackPriority = 0;
                                var i = n.lanes | n.childLanes;
                                if (function(e, t) {
                                        var n = e.pendingLanes & ~t;
                                        e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
                                        var r = e.eventTimes;
                                        for (e = e.expirationTimes; 0 < n;) {
                                            var a = 31 - it(n),
                                                o = 1 << a;
                                            t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o
                                        }
                                    }(e, i), e === Tl && (Ml = Tl = null, Dl = 0), 0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags) || $l || ($l = !0, Ts(tt, (function() {
                                        return ks(), null
                                    }))), i = 0 !== (15990 & n.flags), 0 !== (15990 & n.subtreeFlags) || i) {
                                    i = jl.transition, jl.transition = null;
                                    var u = gt;
                                    gt = 1;
                                    var l = Pl;
                                    Pl |= 4, Cl.current = null,
                                        function(e, t) {
                                            if (ea = Wt, pr(e = dr())) {
                                                if ("selectionStart" in e) var n = {
                                                    start: e.selectionStart,
                                                    end: e.selectionEnd
                                                };
                                                else e: {
                                                    var r = (n = (n = e.ownerDocument) && n.defaultView || window).getSelection && n.getSelection();
                                                    if (r && 0 !== r.rangeCount) {
                                                        n = r.anchorNode;
                                                        var a = r.anchorOffset,
                                                            i = r.focusNode;
                                                        r = r.focusOffset;
                                                        try {
                                                            n.nodeType, i.nodeType
                                                        } catch (x) {
                                                            n = null;
                                                            break e
                                                        }
                                                        var u = 0,
                                                            l = -1,
                                                            s = -1,
                                                            c = 0,
                                                            f = 0,
                                                            d = e,
                                                            p = null;
                                                        t: for (;;) {
                                                            for (var h; d !== n || 0 !== a && 3 !== d.nodeType || (l = u + a), d !== i || 0 !== r && 3 !== d.nodeType || (s = u + r), 3 === d.nodeType && (u += d.nodeValue.length), null !== (h = d.firstChild);) p = d, d = h;
                                                            for (;;) {
                                                                if (d === e) break t;
                                                                if (p === n && ++c === a && (l = u), p === i && ++f === r && (s = u), null !== (h = d.nextSibling)) break;
                                                                p = (d = p).parentNode
                                                            }
                                                            d = h
                                                        }
                                                        n = -1 === l || -1 === s ? null : {
                                                            start: l,
                                                            end: s
                                                        }
                                                    } else n = null
                                                }
                                                n = n || {
                                                    start: 0,
                                                    end: 0
                                                }
                                            } else n = null;
                                            for (ta = {
                                                    focusedElem: e,
                                                    selectionRange: n
                                                }, Wt = !1, Xu = t; null !== Xu;)
                                                if (e = (t = Xu).child, 0 !== (1028 & t.subtreeFlags) && null !== e) e.return = t, Xu = e;
                                                else
                                                    for (; null !== Xu;) {
                                                        t = Xu;
                                                        try {
                                                            var v = t.alternate;
                                                            if (0 !== (1024 & t.flags)) switch (t.tag) {
                                                                case 0:
                                                                case 11:
                                                                case 15:
                                                                case 5:
                                                                case 6:
                                                                case 4:
                                                                case 17:
                                                                    break;
                                                                case 1:
                                                                    if (null !== v) {
                                                                        var m = v.memoizedProps,
                                                                            b = v.memoizedState,
                                                                            y = t.stateNode,
                                                                            g = y.getSnapshotBeforeUpdate(t.elementType === t.type ? m : bo(t.type, m), b);
                                                                        y.__reactInternalSnapshotBeforeUpdate = g
                                                                    }
                                                                    break;
                                                                case 3:
                                                                    var w = t.stateNode.containerInfo;
                                                                    1 === w.nodeType ? w.textContent = "" : 9 === w.nodeType && w.documentElement && w.removeChild(w.documentElement);
                                                                    break;
                                                                default:
                                                                    throw Error(o(163))
                                                            }
                                                        } catch (x) {
                                                            _s(t, t.return, x)
                                                        }
                                                        if (null !== (e = t.sibling)) {
                                                            e.return = t.return, Xu = e;
                                                            break
                                                        }
                                                        Xu = t.return
                                                    }
                                            v = tl, tl = !1
                                        }(e, n), ml(n, e), hr(ta), Wt = !!ea, ta = ea = null, e.current = n, yl(n, e, a), Ye(), Pl = l, gt = u, jl.transition = i
                                } else e.current = n;
                                if ($l && ($l = !1, Gl = e, Ql = a), i = e.pendingLanes, 0 === i && (ql = null), function(e) {
                                        if (ot && "function" === typeof ot.onCommitFiberRoot) try {
                                            ot.onCommitFiberRoot(at, e, void 0, 128 === (128 & e.current.flags))
                                        } catch (t) {}
                                    }(n.stateNode), rs(e, Ze()), null !== t)
                                    for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, {
                                        componentStack: a.stack,
                                        digest: a.digest
                                    });
                                if (Wl) throw Wl = !1, e = Kl, Kl = null, e;
                                0 !== (1 & Ql) && 0 !== e.tag && ks(), i = e.pendingLanes, 0 !== (1 & i) ? e === Zl ? Yl++ : (Yl = 0, Zl = e) : Yl = 0, Va()
                            }(e, t, n, r)
                    } finally {
                        jl.transition = a, gt = r
                    }
                    return null
                }

                function ks() {
                    if (null !== Gl) {
                        var e = wt(Ql),
                            t = jl.transition,
                            n = gt;
                        try {
                            if (jl.transition = null, gt = 16 > e ? 16 : e, null === Gl) var r = !1;
                            else {
                                if (e = Gl, Gl = null, Ql = 0, 0 !== (6 & Pl)) throw Error(o(331));
                                var a = Pl;
                                for (Pl |= 4, Xu = e.current; null !== Xu;) {
                                    var i = Xu,
                                        u = i.child;
                                    if (0 !== (16 & Xu.flags)) {
                                        var l = i.deletions;
                                        if (null !== l) {
                                            for (var s = 0; s < l.length; s++) {
                                                var c = l[s];
                                                for (Xu = c; null !== Xu;) {
                                                    var f = Xu;
                                                    switch (f.tag) {
                                                        case 0:
                                                        case 11:
                                                        case 15:
                                                            nl(8, f, i)
                                                    }
                                                    var d = f.child;
                                                    if (null !== d) d.return = f, Xu = d;
                                                    else
                                                        for (; null !== Xu;) {
                                                            var p = (f = Xu).sibling,
                                                                h = f.return;
                                                            if (ol(f), f === c) {
                                                                Xu = null;
                                                                break
                                                            }
                                                            if (null !== p) {
                                                                p.return = h, Xu = p;
                                                                break
                                                            }
                                                            Xu = h
                                                        }
                                                }
                                            }
                                            var v = i.alternate;
                                            if (null !== v) {
                                                var m = v.child;
                                                if (null !== m) {
                                                    v.child = null;
                                                    do {
                                                        var b = m.sibling;
                                                        m.sibling = null, m = b
                                                    } while (null !== m)
                                                }
                                            }
                                            Xu = i
                                        }
                                    }
                                    if (0 !== (2064 & i.subtreeFlags) && null !== u) u.return = i, Xu = u;
                                    else e: for (; null !== Xu;) {
                                        if (0 !== (2048 & (i = Xu).flags)) switch (i.tag) {
                                            case 0:
                                            case 11:
                                            case 15:
                                                nl(9, i, i.return)
                                        }
                                        var y = i.sibling;
                                        if (null !== y) {
                                            y.return = i.return, Xu = y;
                                            break e
                                        }
                                        Xu = i.return
                                    }
                                }
                                var g = e.current;
                                for (Xu = g; null !== Xu;) {
                                    var w = (u = Xu).child;
                                    if (0 !== (2064 & u.subtreeFlags) && null !== w) w.return = u, Xu = w;
                                    else e: for (u = g; null !== Xu;) {
                                        if (0 !== (2048 & (l = Xu).flags)) try {
                                            switch (l.tag) {
                                                case 0:
                                                case 11:
                                                case 15:
                                                    rl(9, l)
                                            }
                                        } catch (k) {
                                            _s(l, l.return, k)
                                        }
                                        if (l === u) {
                                            Xu = null;
                                            break e
                                        }
                                        var x = l.sibling;
                                        if (null !== x) {
                                            x.return = l.return, Xu = x;
                                            break e
                                        }
                                        Xu = l.return
                                    }
                                }
                                if (Pl = a, Va(), ot && "function" === typeof ot.onPostCommitFiberRoot) try {
                                    ot.onPostCommitFiberRoot(at, e)
                                } catch (k) {}
                                r = !0
                            }
                            return r
                        } finally {
                            gt = n, jl.transition = t
                        }
                    }
                    return !1
                }

                function Ss(e, t, n) {
                    e = Lo(e, t = hu(0, t = cu(n, t), 1), 1), t = es(), null !== e && (bt(e, 1, t), rs(e, t))
                }

                function _s(e, t, n) {
                    if (3 === e.tag) Ss(e, e, n);
                    else
                        for (; null !== t;) {
                            if (3 === t.tag) {
                                Ss(t, e, n);
                                break
                            }
                            if (1 === t.tag) {
                                var r = t.stateNode;
                                if ("function" === typeof t.type.getDerivedStateFromError || "function" === typeof r.componentDidCatch && (null === ql || !ql.has(r))) {
                                    t = Lo(t, e = vu(t, e = cu(n, e), 1), 1), e = es(), null !== t && (bt(t, 1, e), rs(t, e));
                                    break
                                }
                            }
                            t = t.return
                        }
                }

                function Es(e, t, n) {
                    var r = e.pingCache;
                    null !== r && r.delete(t), t = es(), e.pingedLanes |= e.suspendedLanes & n, Tl === e && (Dl & n) === n && (4 === Ol || 3 === Ol && (130023424 & Dl) === Dl && 500 > Ze() - Bl ? ds(e, 0) : Il |= n), rs(e, t)
                }

                function Cs(e, t) {
                    0 === t && (0 === (1 & e.mode) ? t = 1 : (t = ct, 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
                    var n = es();
                    null !== (e = Mo(e, t)) && (bt(e, t, n), rs(e, n))
                }

                function js(e) {
                    var t = e.memoizedState,
                        n = 0;
                    null !== t && (n = t.retryLane), Cs(e, n)
                }

                function Ps(e, t) {
                    var n = 0;
                    switch (e.tag) {
                        case 13:
                            var r = e.stateNode,
                                a = e.memoizedState;
                            null !== a && (n = a.retryLane);
                            break;
                        case 19:
                            r = e.stateNode;
                            break;
                        default:
                            throw Error(o(314))
                    }
                    null !== r && r.delete(t), Cs(e, n)
                }

                function Ts(e, t) {
                    return $e(e, t)
                }

                function Ms(e, t, n, r) {
                    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
                }

                function Ds(e, t, n, r) {
                    return new Ms(e, t, n, r)
                }

                function Ns(e) {
                    return !(!(e = e.prototype) || !e.isReactComponent)
                }

                function Rs(e, t) {
                    var n = e.alternate;
                    return null === n ? ((n = Ds(e.tag, t, e.key, e.mode)).elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = 14680064 & e.flags, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = null === t ? null : {
                        lanes: t.lanes,
                        firstContext: t.firstContext
                    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
                }

                function Os(e, t, n, r, a, i) {
                    var u = 2;
                    if (r = e, "function" === typeof e) Ns(e) && (u = 1);
                    else if ("string" === typeof e) u = 5;
                    else e: switch (e) {
                        case S:
                            return Ls(n.children, a, i, t);
                        case _:
                            u = 8, a |= 8;
                            break;
                        case E:
                            return (e = Ds(12, n, t, 2 | a)).elementType = E, e.lanes = i, e;
                        case T:
                            return (e = Ds(13, n, t, a)).elementType = T, e.lanes = i, e;
                        case M:
                            return (e = Ds(19, n, t, a)).elementType = M, e.lanes = i, e;
                        case R:
                            return Fs(n, a, i, t);
                        default:
                            if ("object" === typeof e && null !== e) switch (e.$$typeof) {
                                case C:
                                    u = 10;
                                    break e;
                                case j:
                                    u = 9;
                                    break e;
                                case P:
                                    u = 11;
                                    break e;
                                case D:
                                    u = 14;
                                    break e;
                                case N:
                                    u = 16, r = null;
                                    break e
                            }
                            throw Error(o(130, null == e ? e : typeof e, ""))
                    }
                    return (t = Ds(u, n, t, a)).elementType = e, t.type = r, t.lanes = i, t
                }

                function Ls(e, t, n, r) {
                    return (e = Ds(7, e, r, t)).lanes = n, e
                }

                function Fs(e, t, n, r) {
                    return (e = Ds(22, e, r, t)).elementType = R, e.lanes = n, e.stateNode = {
                        isHidden: !1
                    }, e
                }

                function As(e, t, n) {
                    return (e = Ds(6, e, null, t)).lanes = n, e
                }

                function Is(e, t, n) {
                    return (t = Ds(4, null !== e.children ? e.children : [], e.key, t)).lanes = n, t.stateNode = {
                        containerInfo: e.containerInfo,
                        pendingChildren: null,
                        implementation: e.implementation
                    }, t
                }

                function zs(e, t, n, r, a) {
                    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = mt(0), this.expirationTimes = mt(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = mt(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null
                }

                function Us(e, t, n, r, a, o, i, u, l) {
                    return e = new zs(e, t, n, u, l), 1 === t ? (t = 1, !0 === o && (t |= 8)) : t = 0, o = Ds(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = {
                        element: r,
                        isDehydrated: n,
                        cache: null,
                        transitions: null,
                        pendingSuspenseBoundaries: null
                    }, No(o), e
                }

                function Bs(e, t, n) {
                    var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
                    return {
                        $$typeof: k,
                        key: null == r ? null : "" + r,
                        children: e,
                        containerInfo: t,
                        implementation: n
                    }
                }

                function Vs(e) {
                    if (!e) return ja;
                    e: {
                        if (Ve(e = e._reactInternals) !== e || 1 !== e.tag) throw Error(o(170));
                        var t = e;do {
                            switch (t.tag) {
                                case 3:
                                    t = t.stateNode.context;
                                    break e;
                                case 1:
                                    if (Na(t.type)) {
                                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                                        break e
                                    }
                            }
                            t = t.return
                        } while (null !== t);
                        throw Error(o(171))
                    }
                    if (1 === e.tag) {
                        var n = e.type;
                        if (Na(n)) return La(e, n, t)
                    }
                    return t
                }

                function Hs(e, t, n, r, a, o, i, u, l) {
                    return (e = Us(n, r, !0, e, 0, o, 0, u, l)).context = Vs(null), n = e.current, (o = Oo(r = es(), a = ts(n))).callback = void 0 !== t && null !== t ? t : null, Lo(n, o, a), e.current.lanes = a, bt(e, a, r), rs(e, r), e
                }

                function Ws(e, t, n, r) {
                    var a = t.current,
                        o = es(),
                        i = ts(a);
                    return n = Vs(n), null === t.context ? t.context = n : t.pendingContext = n, (t = Oo(o, i)).payload = {
                        element: e
                    }, null !== (r = void 0 === r ? null : r) && (t.callback = r), null !== (e = Lo(a, t, i)) && (ns(e, a, i, o), Fo(e, a, i)), i
                }

                function Ks(e) {
                    return (e = e.current).child ? (e.child.tag, e.child.stateNode) : null
                }

                function qs(e, t) {
                    if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
                        var n = e.retryLane;
                        e.retryLane = 0 !== n && n < t ? n : t
                    }
                }

                function $s(e, t) {
                    qs(e, t), (e = e.alternate) && qs(e, t)
                }
                Sl = function(e, t, n) {
                    if (null !== e)
                        if (e.memoizedProps !== t.pendingProps || Ta.current) wu = !0;
                        else {
                            if (0 === (e.lanes & n) && 0 === (128 & t.flags)) return wu = !1,
                                function(e, t, n) {
                                    switch (t.tag) {
                                        case 3:
                                            Mu(t), ho();
                                            break;
                                        case 5:
                                            ii(t);
                                            break;
                                        case 1:
                                            Na(t.type) && Fa(t);
                                            break;
                                        case 4:
                                            ai(t, t.stateNode.containerInfo);
                                            break;
                                        case 10:
                                            var r = t.type._context,
                                                a = t.memoizedProps.value;
                                            Ca(yo, r._currentValue), r._currentValue = a;
                                            break;
                                        case 13:
                                            if (null !== (r = t.memoizedState)) return null !== r.dehydrated ? (Ca(li, 1 & li.current), t.flags |= 128, null) : 0 !== (n & t.child.childLanes) ? Au(e, t, n) : (Ca(li, 1 & li.current), null !== (e = Wu(e, t, n)) ? e.sibling : null);
                                            Ca(li, 1 & li.current);
                                            break;
                                        case 19:
                                            if (r = 0 !== (n & t.childLanes), 0 !== (128 & e.flags)) {
                                                if (r) return Vu(e, t, n);
                                                t.flags |= 128
                                            }
                                            if (null !== (a = t.memoizedState) && (a.rendering = null, a.tail = null, a.lastEffect = null), Ca(li, li.current), r) break;
                                            return null;
                                        case 22:
                                        case 23:
                                            return t.lanes = 0, Eu(e, t, n)
                                    }
                                    return Wu(e, t, n)
                                }(e, t, n);
                            wu = 0 !== (131072 & e.flags)
                        }
                    else wu = !1, ao && 0 !== (1048576 & t.flags) && Ja(t, qa, t.index);
                    switch (t.lanes = 0, t.tag) {
                        case 2:
                            var r = t.type;
                            Hu(e, t), e = t.pendingProps;
                            var a = Da(t, Pa.current);
                            Eo(t, n), a = _i(null, t, r, e, a, n);
                            var i = Ei();
                            return t.flags |= 1, "object" === typeof a && null !== a && "function" === typeof a.render && void 0 === a.$$typeof ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Na(r) ? (i = !0, Fa(t)) : i = !1, t.memoizedState = null !== a.state && void 0 !== a.state ? a.state : null, No(t), a.updater = Vo, t.stateNode = a, a._reactInternals = t, qo(t, r, e, n), t = Tu(null, t, r, !0, i, n)) : (t.tag = 0, ao && i && eo(t), xu(null, t, a, n), t = t.child), t;
                        case 16:
                            r = t.elementType;
                            e: {
                                switch (Hu(e, t), e = t.pendingProps, r = (a = r._init)(r._payload), t.type = r, a = t.tag = function(e) {
                                        if ("function" === typeof e) return Ns(e) ? 1 : 0;
                                        if (void 0 !== e && null !== e) {
                                            if ((e = e.$$typeof) === P) return 11;
                                            if (e === D) return 14
                                        }
                                        return 2
                                    }(r), e = bo(r, e), a) {
                                    case 0:
                                        t = ju(null, t, r, e, n);
                                        break e;
                                    case 1:
                                        t = Pu(null, t, r, e, n);
                                        break e;
                                    case 11:
                                        t = ku(null, t, r, e, n);
                                        break e;
                                    case 14:
                                        t = Su(null, t, r, bo(r.type, e), n);
                                        break e
                                }
                                throw Error(o(306, r, ""))
                            }
                            return t;
                        case 0:
                            return r = t.type, a = t.pendingProps, ju(e, t, r, a = t.elementType === r ? a : bo(r, a), n);
                        case 1:
                            return r = t.type, a = t.pendingProps, Pu(e, t, r, a = t.elementType === r ? a : bo(r, a), n);
                        case 3:
                            e: {
                                if (Mu(t), null === e) throw Error(o(387));r = t.pendingProps,
                                a = (i = t.memoizedState).element,
                                Ro(e, t),
                                Io(t, r, null, n);
                                var u = t.memoizedState;
                                if (r = u.element, i.isDehydrated) {
                                    if (i = {
                                            element: r,
                                            isDehydrated: !1,
                                            cache: u.cache,
                                            pendingSuspenseBoundaries: u.pendingSuspenseBoundaries,
                                            transitions: u.transitions
                                        }, t.updateQueue.baseState = i, t.memoizedState = i, 256 & t.flags) {
                                        t = Du(e, t, r, n, a = cu(Error(o(423)), t));
                                        break e
                                    }
                                    if (r !== a) {
                                        t = Du(e, t, r, n, a = cu(Error(o(424)), t));
                                        break e
                                    }
                                    for (ro = sa(t.stateNode.containerInfo.firstChild), no = t, ao = !0, oo = null, n = Xo(t, null, r, n), t.child = n; n;) n.flags = -3 & n.flags | 4096, n = n.sibling
                                } else {
                                    if (ho(), r === a) {
                                        t = Wu(e, t, n);
                                        break e
                                    }
                                    xu(e, t, r, n)
                                }
                                t = t.child
                            }
                            return t;
                        case 5:
                            return ii(t), null === e && so(t), r = t.type, a = t.pendingProps, i = null !== e ? e.memoizedProps : null, u = a.children, na(r, a) ? u = null : null !== i && na(r, i) && (t.flags |= 32), Cu(e, t), xu(e, t, u, n), t.child;
                        case 6:
                            return null === e && so(t), null;
                        case 13:
                            return Au(e, t, n);
                        case 4:
                            return ai(t, t.stateNode.containerInfo), r = t.pendingProps, null === e ? t.child = Zo(t, null, r, n) : xu(e, t, r, n), t.child;
                        case 11:
                            return r = t.type, a = t.pendingProps, ku(e, t, r, a = t.elementType === r ? a : bo(r, a), n);
                        case 7:
                            return xu(e, t, t.pendingProps, n), t.child;
                        case 8:
                        case 12:
                            return xu(e, t, t.pendingProps.children, n), t.child;
                        case 10:
                            e: {
                                if (r = t.type._context, a = t.pendingProps, i = t.memoizedProps, u = a.value, Ca(yo, r._currentValue), r._currentValue = u, null !== i)
                                    if (ur(i.value, u)) {
                                        if (i.children === a.children && !Ta.current) {
                                            t = Wu(e, t, n);
                                            break e
                                        }
                                    } else
                                        for (null !== (i = t.child) && (i.return = t); null !== i;) {
                                            var l = i.dependencies;
                                            if (null !== l) {
                                                u = i.child;
                                                for (var s = l.firstContext; null !== s;) {
                                                    if (s.context === r) {
                                                        if (1 === i.tag) {
                                                            (s = Oo(-1, n & -n)).tag = 2;
                                                            var c = i.updateQueue;
                                                            if (null !== c) {
                                                                var f = (c = c.shared).pending;
                                                                null === f ? s.next = s : (s.next = f.next, f.next = s), c.pending = s
                                                            }
                                                        }
                                                        i.lanes |= n, null !== (s = i.alternate) && (s.lanes |= n), _o(i.return, n, t), l.lanes |= n;
                                                        break
                                                    }
                                                    s = s.next
                                                }
                                            } else if (10 === i.tag) u = i.type === t.type ? null : i.child;
                                            else if (18 === i.tag) {
                                                if (null === (u = i.return)) throw Error(o(341));
                                                u.lanes |= n, null !== (l = u.alternate) && (l.lanes |= n), _o(u, n, t), u = i.sibling
                                            } else u = i.child;
                                            if (null !== u) u.return = i;
                                            else
                                                for (u = i; null !== u;) {
                                                    if (u === t) {
                                                        u = null;
                                                        break
                                                    }
                                                    if (null !== (i = u.sibling)) {
                                                        i.return = u.return, u = i;
                                                        break
                                                    }
                                                    u = u.return
                                                }
                                            i = u
                                        }
                                xu(e, t, a.children, n),
                                t = t.child
                            }
                            return t;
                        case 9:
                            return a = t.type, r = t.pendingProps.children, Eo(t, n), r = r(a = Co(a)), t.flags |= 1, xu(e, t, r, n), t.child;
                        case 14:
                            return a = bo(r = t.type, t.pendingProps), Su(e, t, r, a = bo(r.type, a), n);
                        case 15:
                            return _u(e, t, t.type, t.pendingProps, n);
                        case 17:
                            return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : bo(r, a), Hu(e, t), t.tag = 1, Na(r) ? (e = !0, Fa(t)) : e = !1, Eo(t, n), Wo(t, r, a), qo(t, r, a, n), Tu(null, t, r, !0, e, n);
                        case 19:
                            return Vu(e, t, n);
                        case 22:
                            return Eu(e, t, n)
                    }
                    throw Error(o(156, t.tag))
                };
                var Gs = "function" === typeof reportError ? reportError : function(e) {
                    console.error(e)
                };

                function Qs(e) {
                    this._internalRoot = e
                }

                function Ys(e) {
                    this._internalRoot = e
                }

                function Zs(e) {
                    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
                }

                function Xs(e) {
                    return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
                }

                function Js() {}

                function ec(e, t, n, r, a) {
                    var o = n._reactRootContainer;
                    if (o) {
                        var i = o;
                        if ("function" === typeof a) {
                            var u = a;
                            a = function() {
                                var e = Ks(i);
                                u.call(e)
                            }
                        }
                        Ws(t, i, e, a)
                    } else i = function(e, t, n, r, a) {
                        if (a) {
                            if ("function" === typeof r) {
                                var o = r;
                                r = function() {
                                    var e = Ks(i);
                                    o.call(e)
                                }
                            }
                            var i = Hs(t, r, e, 0, null, !1, 0, "", Js);
                            return e._reactRootContainer = i, e[ha] = i.current, Vr(8 === e.nodeType ? e.parentNode : e), cs(), i
                        }
                        for (; a = e.lastChild;) e.removeChild(a);
                        if ("function" === typeof r) {
                            var u = r;
                            r = function() {
                                var e = Ks(l);
                                u.call(e)
                            }
                        }
                        var l = Us(e, 0, !1, null, 0, !1, 0, "", Js);
                        return e._reactRootContainer = l, e[ha] = l.current, Vr(8 === e.nodeType ? e.parentNode : e), cs((function() {
                            Ws(t, l, n, r)
                        })), l
                    }(n, t, e, a, r);
                    return Ks(i)
                }
                Ys.prototype.render = Qs.prototype.render = function(e) {
                    var t = this._internalRoot;
                    if (null === t) throw Error(o(409));
                    Ws(e, t, null, null)
                }, Ys.prototype.unmount = Qs.prototype.unmount = function() {
                    var e = this._internalRoot;
                    if (null !== e) {
                        this._internalRoot = null;
                        var t = e.containerInfo;
                        cs((function() {
                            Ws(null, e, null, null)
                        })), t[ha] = null
                    }
                }, Ys.prototype.unstable_scheduleHydration = function(e) {
                    if (e) {
                        var t = _t();
                        e = {
                            blockedOn: null,
                            target: e,
                            priority: t
                        };
                        for (var n = 0; n < Rt.length && 0 !== t && t < Rt[n].priority; n++);
                        Rt.splice(n, 0, e), 0 === n && At(e)
                    }
                }, xt = function(e) {
                    switch (e.tag) {
                        case 3:
                            var t = e.stateNode;
                            if (t.current.memoizedState.isDehydrated) {
                                var n = ft(t.pendingLanes);
                                0 !== n && (yt(t, 1 | n), rs(t, Ze()), 0 === (6 & Pl) && (Vl = Ze() + 500, Va()))
                            }
                            break;
                        case 13:
                            cs((function() {
                                var t = Mo(e, 1);
                                if (null !== t) {
                                    var n = es();
                                    ns(t, e, 1, n)
                                }
                            })), $s(e, 1)
                    }
                }, kt = function(e) {
                    if (13 === e.tag) {
                        var t = Mo(e, 134217728);
                        if (null !== t) ns(t, e, 134217728, es());
                        $s(e, 134217728)
                    }
                }, St = function(e) {
                    if (13 === e.tag) {
                        var t = ts(e),
                            n = Mo(e, t);
                        if (null !== n) ns(n, e, t, es());
                        $s(e, t)
                    }
                }, _t = function() {
                    return gt
                }, Et = function(e, t) {
                    var n = gt;
                    try {
                        return gt = e, t()
                    } finally {
                        gt = n
                    }
                }, ke = function(e, t, n) {
                    switch (t) {
                        case "input":
                            if (X(e, n), t = n.name, "radio" === n.type && null != t) {
                                for (n = e; n.parentNode;) n = n.parentNode;
                                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                                    var r = n[t];
                                    if (r !== e && r.form === e.form) {
                                        var a = xa(r);
                                        if (!a) throw Error(o(90));
                                        $(r), X(r, a)
                                    }
                                }
                            }
                            break;
                        case "textarea":
                            oe(e, n);
                            break;
                        case "select":
                            null != (t = n.value) && ne(e, !!n.multiple, t, !1)
                    }
                }, Pe = ss, Te = cs;
                var tc = {
                        usingClientEntryPoint: !1,
                        Events: [ga, wa, xa, Ce, je, ss]
                    },
                    nc = {
                        findFiberByHostInstance: ya,
                        bundleType: 0,
                        version: "18.2.0",
                        rendererPackageName: "react-dom"
                    },
                    rc = {
                        bundleType: nc.bundleType,
                        version: nc.version,
                        rendererPackageName: nc.rendererPackageName,
                        rendererConfig: nc.rendererConfig,
                        overrideHookState: null,
                        overrideHookStateDeletePath: null,
                        overrideHookStateRenamePath: null,
                        overrideProps: null,
                        overridePropsDeletePath: null,
                        overridePropsRenamePath: null,
                        setErrorHandler: null,
                        setSuspenseHandler: null,
                        scheduleUpdate: null,
                        currentDispatcherRef: w.ReactCurrentDispatcher,
                        findHostInstanceByFiber: function(e) {
                            return null === (e = Ke(e)) ? null : e.stateNode
                        },
                        findFiberByHostInstance: nc.findFiberByHostInstance || function() {
                            return null
                        },
                        findHostInstancesForRefresh: null,
                        scheduleRefresh: null,
                        scheduleRoot: null,
                        setRefreshHandler: null,
                        getCurrentFiber: null,
                        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
                    };
                if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
                    var ac = __REACT_DEVTOOLS_GLOBAL_HOOK__;
                    if (!ac.isDisabled && ac.supportsFiber) try {
                        at = ac.inject(rc), ot = ac
                    } catch (ce) {}
                }
                t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tc, t.createPortal = function(e, t) {
                    var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
                    if (!Zs(t)) throw Error(o(200));
                    return Bs(e, t, null, n)
                }, t.createRoot = function(e, t) {
                    if (!Zs(e)) throw Error(o(299));
                    var n = !1,
                        r = "",
                        a = Gs;
                    return null !== t && void 0 !== t && (!0 === t.unstable_strictMode && (n = !0), void 0 !== t.identifierPrefix && (r = t.identifierPrefix), void 0 !== t.onRecoverableError && (a = t.onRecoverableError)), t = Us(e, 1, !1, null, 0, n, 0, r, a), e[ha] = t.current, Vr(8 === e.nodeType ? e.parentNode : e), new Qs(t)
                }, t.findDOMNode = function(e) {
                    if (null == e) return null;
                    if (1 === e.nodeType) return e;
                    var t = e._reactInternals;
                    if (void 0 === t) {
                        if ("function" === typeof e.render) throw Error(o(188));
                        throw e = Object.keys(e).join(","), Error(o(268, e))
                    }
                    return e = null === (e = Ke(t)) ? null : e.stateNode
                }, t.flushSync = function(e) {
                    return cs(e)
                }, t.hydrate = function(e, t, n) {
                    if (!Xs(t)) throw Error(o(200));
                    return ec(null, e, t, !0, n)
                }, t.hydrateRoot = function(e, t, n) {
                    if (!Zs(e)) throw Error(o(405));
                    var r = null != n && n.hydratedSources || null,
                        a = !1,
                        i = "",
                        u = Gs;
                    if (null !== n && void 0 !== n && (!0 === n.unstable_strictMode && (a = !0), void 0 !== n.identifierPrefix && (i = n.identifierPrefix), void 0 !== n.onRecoverableError && (u = n.onRecoverableError)), t = Hs(t, null, e, 1, null != n ? n : null, a, 0, i, u), e[ha] = t.current, Vr(e), r)
                        for (e = 0; e < r.length; e++) a = (a = (n = r[e])._getVersion)(n._source), null == t.mutableSourceEagerHydrationData ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(n, a);
                    return new Ys(t)
                }, t.render = function(e, t, n) {
                    if (!Xs(t)) throw Error(o(200));
                    return ec(null, e, t, !1, n)
                }, t.unmountComponentAtNode = function(e) {
                    if (!Xs(e)) throw Error(o(40));
                    return !!e._reactRootContainer && (cs((function() {
                        ec(null, null, e, !1, (function() {
                            e._reactRootContainer = null, e[ha] = null
                        }))
                    })), !0)
                }, t.unstable_batchedUpdates = ss, t.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
                    if (!Xs(n)) throw Error(o(200));
                    if (null == e || void 0 === e._reactInternals) throw Error(o(38));
                    return ec(e, t, n, !1, r)
                }, t.version = "18.2.0-next-9e3b772b8-20220608"
            },
            1739: function(e, t, n) {
                "use strict";
                var r = n(1168);
                t.s = r.createRoot, r.hydrateRoot
            },
            1168: function(e, t, n) {
                "use strict";
                ! function e() {
                    if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
                        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
                    } catch (t) {
                        console.error(t)
                    }
                }(), e.exports = n(534)
            },
            3095: function(e, t) {
                "use strict";

                function n(e, t) {
                    var n = e.length;
                    e.push(t);
                    e: for (; 0 < n;) {
                        var r = n - 1 >>> 1,
                            a = e[r];
                        if (!(0 < o(a, t))) break e;
                        e[r] = t, e[n] = a, n = r
                    }
                }

                function r(e) {
                    return 0 === e.length ? null : e[0]
                }

                function a(e) {
                    if (0 === e.length) return null;
                    var t = e[0],
                        n = e.pop();
                    if (n !== t) {
                        e[0] = n;
                        e: for (var r = 0, a = e.length, i = a >>> 1; r < i;) {
                            var u = 2 * (r + 1) - 1,
                                l = e[u],
                                s = u + 1,
                                c = e[s];
                            if (0 > o(l, n)) s < a && 0 > o(c, l) ? (e[r] = c, e[s] = n, r = s) : (e[r] = l, e[u] = n, r = u);
                            else {
                                if (!(s < a && 0 > o(c, n))) break e;
                                e[r] = c, e[s] = n, r = s
                            }
                        }
                    }
                    return t
                }

                function o(e, t) {
                    var n = e.sortIndex - t.sortIndex;
                    return 0 !== n ? n : e.id - t.id
                }
                if ("object" === typeof performance && "function" === typeof performance.now) {
                    var i = performance;
                    t.unstable_now = function() {
                        return i.now()
                    }
                } else {
                    var u = Date,
                        l = u.now();
                    t.unstable_now = function() {
                        return u.now() - l
                    }
                }
                var s = [],
                    c = [],
                    f = 1,
                    d = null,
                    p = 3,
                    h = !1,
                    v = !1,
                    m = !1,
                    b = "function" === typeof setTimeout ? setTimeout : null,
                    y = "function" === typeof clearTimeout ? clearTimeout : null,
                    g = "undefined" !== typeof setImmediate ? setImmediate : null;

                function w(e) {
                    for (var t = r(c); null !== t;) {
                        if (null === t.callback) a(c);
                        else {
                            if (!(t.startTime <= e)) break;
                            a(c), t.sortIndex = t.expirationTime, n(s, t)
                        }
                        t = r(c)
                    }
                }

                function x(e) {
                    if (m = !1, w(e), !v)
                        if (null !== r(s)) v = !0, R(k);
                        else {
                            var t = r(c);
                            null !== t && O(x, t.startTime - e)
                        }
                }

                function k(e, n) {
                    v = !1, m && (m = !1, y(C), C = -1), h = !0;
                    var o = p;
                    try {
                        for (w(n), d = r(s); null !== d && (!(d.expirationTime > n) || e && !T());) {
                            var i = d.callback;
                            if ("function" === typeof i) {
                                d.callback = null, p = d.priorityLevel;
                                var u = i(d.expirationTime <= n);
                                n = t.unstable_now(), "function" === typeof u ? d.callback = u : d === r(s) && a(s), w(n)
                            } else a(s);
                            d = r(s)
                        }
                        if (null !== d) var l = !0;
                        else {
                            var f = r(c);
                            null !== f && O(x, f.startTime - n), l = !1
                        }
                        return l
                    } finally {
                        d = null, p = o, h = !1
                    }
                }
                "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
                var S, _ = !1,
                    E = null,
                    C = -1,
                    j = 5,
                    P = -1;

                function T() {
                    return !(t.unstable_now() - P < j)
                }

                function M() {
                    if (null !== E) {
                        var e = t.unstable_now();
                        P = e;
                        var n = !0;
                        try {
                            n = E(!0, e)
                        } finally {
                            n ? S() : (_ = !1, E = null)
                        }
                    } else _ = !1
                }
                if ("function" === typeof g) S = function() {
                    g(M)
                };
                else if ("undefined" !== typeof MessageChannel) {
                    var D = new MessageChannel,
                        N = D.port2;
                    D.port1.onmessage = M, S = function() {
                        N.postMessage(null)
                    }
                } else S = function() {
                    b(M, 0)
                };

                function R(e) {
                    E = e, _ || (_ = !0, S())
                }

                function O(e, n) {
                    C = b((function() {
                        e(t.unstable_now())
                    }), n)
                }
                t.unstable_IdlePriority = 5, t.unstable_ImmediatePriority = 1, t.unstable_LowPriority = 4, t.unstable_NormalPriority = 3, t.unstable_Profiling = null, t.unstable_UserBlockingPriority = 2, t.unstable_cancelCallback = function(e) {
                    e.callback = null
                }, t.unstable_continueExecution = function() {
                    v || h || (v = !0, R(k))
                }, t.unstable_forceFrameRate = function(e) {
                    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < e ? Math.floor(1e3 / e) : 5
                }, t.unstable_getCurrentPriorityLevel = function() {
                    return p
                }, t.unstable_getFirstCallbackNode = function() {
                    return r(s)
                }, t.unstable_next = function(e) {
                    switch (p) {
                        case 1:
                        case 2:
                        case 3:
                            var t = 3;
                            break;
                        default:
                            t = p
                    }
                    var n = p;
                    p = t;
                    try {
                        return e()
                    } finally {
                        p = n
                    }
                }, t.unstable_pauseExecution = function() {}, t.unstable_requestPaint = function() {}, t.unstable_runWithPriority = function(e, t) {
                    switch (e) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            break;
                        default:
                            e = 3
                    }
                    var n = p;
                    p = e;
                    try {
                        return t()
                    } finally {
                        p = n
                    }
                }, t.unstable_scheduleCallback = function(e, a, o) {
                    var i = t.unstable_now();
                    switch ("object" === typeof o && null !== o ? o = "number" === typeof(o = o.delay) && 0 < o ? i + o : i : o = i, e) {
                        case 1:
                            var u = -1;
                            break;
                        case 2:
                            u = 250;
                            break;
                        case 5:
                            u = 1073741823;
                            break;
                        case 4:
                            u = 1e4;
                            break;
                        default:
                            u = 5e3
                    }
                    return e = {
                        id: f++,
                        callback: a,
                        priorityLevel: e,
                        startTime: o,
                        expirationTime: u = o + u,
                        sortIndex: -1
                    }, o > i ? (e.sortIndex = o, n(c, e), null === r(s) && e === r(c) && (m ? (y(C), C = -1) : m = !0, O(x, o - i))) : (e.sortIndex = u, n(s, e), v || h || (v = !0, R(k))), e
                }, t.unstable_shouldYield = T, t.unstable_wrapCallback = function(e) {
                    var t = p;
                    return function() {
                        var n = p;
                        p = t;
                        try {
                            return e.apply(this, arguments)
                        } finally {
                            p = n
                        }
                    }
                }
            },
            2224: function(e, t, n) {
                "use strict";
                e.exports = n(3095)
            },
            3897: function(e) {
                e.exports = function(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                    return r
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            5372: function(e) {
                e.exports = function(e) {
                    if (Array.isArray(e)) return e
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            3405: function(e, t, n) {
                var r = n(3897);
                e.exports = function(e) {
                    if (Array.isArray(e)) return r(e)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6115: function(e) {
                e.exports = function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            7156: function(e) {
                function t(e, t, n, r, a, o, i) {
                    try {
                        var u = e[o](i),
                            l = u.value
                    } catch (s) {
                        return void n(s)
                    }
                    u.done ? t(l) : Promise.resolve(l).then(r, a)
                }
                e.exports = function(e) {
                    return function() {
                        var n = this,
                            r = arguments;
                        return new Promise((function(a, o) {
                            var i = e.apply(n, r);

                            function u(e) {
                                t(i, a, o, u, l, "next", e)
                            }

                            function l(e) {
                                t(i, a, o, u, l, "throw", e)
                            }
                            u(void 0)
                        }))
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6690: function(e) {
                e.exports = function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            3515: function(e, t, n) {
                var r = n(6015),
                    a = n(9617);

                function o(t, n, i) {
                    return a() ? (e.exports = o = Reflect.construct.bind(), e.exports.__esModule = !0, e.exports.default = e.exports) : (e.exports = o = function(e, t, n) {
                        var a = [null];
                        a.push.apply(a, t);
                        var o = new(Function.bind.apply(e, a));
                        return n && r(o, n.prototype), o
                    }, e.exports.__esModule = !0, e.exports.default = e.exports), o.apply(null, arguments)
                }
                e.exports = o, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            9728: function(e, t, n) {
                var r = n(4062);

                function a(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, r(a.key), a)
                    }
                }
                e.exports = function(e, t, n) {
                    return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            4704: function(e, t, n) {
                var r = n(6116);
                e.exports = function(e, t) {
                    var n = "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (!n) {
                        if (Array.isArray(e) || (n = r(e)) || t && e && "number" === typeof e.length) {
                            n && (e = n);
                            var a = 0,
                                o = function() {};
                            return {
                                s: o,
                                n: function() {
                                    return a >= e.length ? {
                                        done: !0
                                    } : {
                                        done: !1,
                                        value: e[a++]
                                    }
                                },
                                e: function(e) {
                                    throw e
                                },
                                f: o
                            }
                        }
                        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                    }
                    var i, u = !0,
                        l = !1;
                    return {
                        s: function() {
                            n = n.call(e)
                        },
                        n: function() {
                            var e = n.next();
                            return u = e.done, e
                        },
                        e: function(e) {
                            l = !0, i = e
                        },
                        f: function() {
                            try {
                                u || null == n.return || n.return()
                            } finally {
                                if (l) throw i
                            }
                        }
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6389: function(e, t, n) {
                var r = n(3808),
                    a = n(9617),
                    o = n(4993);
                e.exports = function(e) {
                    var t = a();
                    return function() {
                        var n, a = r(e);
                        if (t) {
                            var i = r(this).constructor;
                            n = Reflect.construct(a, arguments, i)
                        } else n = a.apply(this, arguments);
                        return o(this, n)
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            3808: function(e) {
                function t(n) {
                    return e.exports = t = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                        return e.__proto__ || Object.getPrototypeOf(e)
                    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n)
                }
                e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            1655: function(e, t, n) {
                var r = n(6015);
                e.exports = function(e, t) {
                    if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), t && r(e, t)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6035: function(e) {
                e.exports = function(e) {
                    return -1 !== Function.toString.call(e).indexOf("[native code]")
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            9617: function(e) {
                e.exports = function() {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                    } catch (e) {
                        return !1
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            9498: function(e) {
                e.exports = function(e) {
                    if ("undefined" !== typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            8872: function(e) {
                e.exports = function(e, t) {
                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != n) {
                        var r, a, o, i, u = [],
                            l = !0,
                            s = !1;
                        try {
                            if (o = (n = n.call(e)).next, 0 === t) {
                                if (Object(n) !== n) return;
                                l = !1
                            } else
                                for (; !(l = (r = o.call(n)).done) && (u.push(r.value), u.length !== t); l = !0);
                        } catch (c) {
                            s = !0, a = c
                        } finally {
                            try {
                                if (!l && null != n.return && (i = n.return(), Object(i) !== i)) return
                            } finally {
                                if (s) throw a
                            }
                        }
                        return u
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            2218: function(e) {
                e.exports = function() {
                    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            2281: function(e) {
                e.exports = function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            4993: function(e, t, n) {
                var r = n(8698).default,
                    a = n(6115);
                e.exports = function(e, t) {
                    if (t && ("object" === r(t) || "function" === typeof t)) return t;
                    if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                    return a(e)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            7061: function(e, t, n) {
                var r = n(8698).default;

                function a() {
                    "use strict";
                    e.exports = a = function() {
                        return t
                    }, e.exports.__esModule = !0, e.exports.default = e.exports;
                    var t = {},
                        n = Object.prototype,
                        o = n.hasOwnProperty,
                        i = Object.defineProperty || function(e, t, n) {
                            e[t] = n.value
                        },
                        u = "function" == typeof Symbol ? Symbol : {},
                        l = u.iterator || "@@iterator",
                        s = u.asyncIterator || "@@asyncIterator",
                        c = u.toStringTag || "@@toStringTag";

                    function f(e, t, n) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }), e[t]
                    }
                    try {
                        f({}, "")
                    } catch (D) {
                        f = function(e, t, n) {
                            return e[t] = n
                        }
                    }

                    function d(e, t, n, r) {
                        var a = t && t.prototype instanceof v ? t : v,
                            o = Object.create(a.prototype),
                            u = new P(r || []);
                        return i(o, "_invoke", {
                            value: _(e, n, u)
                        }), o
                    }

                    function p(e, t, n) {
                        try {
                            return {
                                type: "normal",
                                arg: e.call(t, n)
                            }
                        } catch (D) {
                            return {
                                type: "throw",
                                arg: D
                            }
                        }
                    }
                    t.wrap = d;
                    var h = {};

                    function v() {}

                    function m() {}

                    function b() {}
                    var y = {};
                    f(y, l, (function() {
                        return this
                    }));
                    var g = Object.getPrototypeOf,
                        w = g && g(g(T([])));
                    w && w !== n && o.call(w, l) && (y = w);
                    var x = b.prototype = v.prototype = Object.create(y);

                    function k(e) {
                        ["next", "throw", "return"].forEach((function(t) {
                            f(e, t, (function(e) {
                                return this._invoke(t, e)
                            }))
                        }))
                    }

                    function S(e, t) {
                        function n(a, i, u, l) {
                            var s = p(e[a], e, i);
                            if ("throw" !== s.type) {
                                var c = s.arg,
                                    f = c.value;
                                return f && "object" == r(f) && o.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                                    n("next", e, u, l)
                                }), (function(e) {
                                    n("throw", e, u, l)
                                })) : t.resolve(f).then((function(e) {
                                    c.value = e, u(c)
                                }), (function(e) {
                                    return n("throw", e, u, l)
                                }))
                            }
                            l(s.arg)
                        }
                        var a;
                        i(this, "_invoke", {
                            value: function(e, r) {
                                function o() {
                                    return new t((function(t, a) {
                                        n(e, r, t, a)
                                    }))
                                }
                                return a = a ? a.then(o, o) : o()
                            }
                        })
                    }

                    function _(e, t, n) {
                        var r = "suspendedStart";
                        return function(a, o) {
                            if ("executing" === r) throw new Error("Generator is already running");
                            if ("completed" === r) {
                                if ("throw" === a) throw o;
                                return M()
                            }
                            for (n.method = a, n.arg = o;;) {
                                var i = n.delegate;
                                if (i) {
                                    var u = E(i, n);
                                    if (u) {
                                        if (u === h) continue;
                                        return u
                                    }
                                }
                                if ("next" === n.method) n.sent = n._sent = n.arg;
                                else if ("throw" === n.method) {
                                    if ("suspendedStart" === r) throw r = "completed", n.arg;
                                    n.dispatchException(n.arg)
                                } else "return" === n.method && n.abrupt("return", n.arg);
                                r = "executing";
                                var l = p(e, t, n);
                                if ("normal" === l.type) {
                                    if (r = n.done ? "completed" : "suspendedYield", l.arg === h) continue;
                                    return {
                                        value: l.arg,
                                        done: n.done
                                    }
                                }
                                "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg)
                            }
                        }
                    }

                    function E(e, t) {
                        var n = t.method,
                            r = e.iterator[n];
                        if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, E(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h;
                        var a = p(r, e.iterator, t.arg);
                        if ("throw" === a.type) return t.method = "throw", t.arg = a.arg, t.delegate = null, h;
                        var o = a.arg;
                        return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, h) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, h)
                    }

                    function C(e) {
                        var t = {
                            tryLoc: e[0]
                        };
                        1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                    }

                    function j(e) {
                        var t = e.completion || {};
                        t.type = "normal", delete t.arg, e.completion = t
                    }

                    function P(e) {
                        this.tryEntries = [{
                            tryLoc: "root"
                        }], e.forEach(C, this), this.reset(!0)
                    }

                    function T(e) {
                        if (e) {
                            var t = e[l];
                            if (t) return t.call(e);
                            if ("function" == typeof e.next) return e;
                            if (!isNaN(e.length)) {
                                var n = -1,
                                    r = function t() {
                                        for (; ++n < e.length;)
                                            if (o.call(e, n)) return t.value = e[n], t.done = !1, t;
                                        return t.value = void 0, t.done = !0, t
                                    };
                                return r.next = r
                            }
                        }
                        return {
                            next: M
                        }
                    }

                    function M() {
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    return m.prototype = b, i(x, "constructor", {
                        value: b,
                        configurable: !0
                    }), i(b, "constructor", {
                        value: m,
                        configurable: !0
                    }), m.displayName = f(b, c, "GeneratorFunction"), t.isGeneratorFunction = function(e) {
                        var t = "function" == typeof e && e.constructor;
                        return !!t && (t === m || "GeneratorFunction" === (t.displayName || t.name))
                    }, t.mark = function(e) {
                        return Object.setPrototypeOf ? Object.setPrototypeOf(e, b) : (e.__proto__ = b, f(e, c, "GeneratorFunction")), e.prototype = Object.create(x), e
                    }, t.awrap = function(e) {
                        return {
                            __await: e
                        }
                    }, k(S.prototype), f(S.prototype, s, (function() {
                        return this
                    })), t.AsyncIterator = S, t.async = function(e, n, r, a, o) {
                        void 0 === o && (o = Promise);
                        var i = new S(d(e, n, r, a), o);
                        return t.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                            return e.done ? e.value : i.next()
                        }))
                    }, k(x), f(x, c, "Generator"), f(x, l, (function() {
                        return this
                    })), f(x, "toString", (function() {
                        return "[object Generator]"
                    })), t.keys = function(e) {
                        var t = Object(e),
                            n = [];
                        for (var r in t) n.push(r);
                        return n.reverse(),
                            function e() {
                                for (; n.length;) {
                                    var r = n.pop();
                                    if (r in t) return e.value = r, e.done = !1, e
                                }
                                return e.done = !0, e
                            }
                    }, t.values = T, P.prototype = {
                        constructor: P,
                        reset: function(e) {
                            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(j), !e)
                                for (var t in this) "t" === t.charAt(0) && o.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                        },
                        stop: function() {
                            this.done = !0;
                            var e = this.tryEntries[0].completion;
                            if ("throw" === e.type) throw e.arg;
                            return this.rval
                        },
                        dispatchException: function(e) {
                            if (this.done) throw e;
                            var t = this;

                            function n(n, r) {
                                return i.type = "throw", i.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                            }
                            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                                var a = this.tryEntries[r],
                                    i = a.completion;
                                if ("root" === a.tryLoc) return n("end");
                                if (a.tryLoc <= this.prev) {
                                    var u = o.call(a, "catchLoc"),
                                        l = o.call(a, "finallyLoc");
                                    if (u && l) {
                                        if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                                        if (this.prev < a.finallyLoc) return n(a.finallyLoc)
                                    } else if (u) {
                                        if (this.prev < a.catchLoc) return n(a.catchLoc, !0)
                                    } else {
                                        if (!l) throw new Error("try statement without catch or finally");
                                        if (this.prev < a.finallyLoc) return n(a.finallyLoc)
                                    }
                                }
                            }
                        },
                        abrupt: function(e, t) {
                            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                                var r = this.tryEntries[n];
                                if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                                    var a = r;
                                    break
                                }
                            }
                            a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                            var i = a ? a.completion : {};
                            return i.type = e, i.arg = t, a ? (this.method = "next", this.next = a.finallyLoc, h) : this.complete(i)
                        },
                        complete: function(e, t) {
                            if ("throw" === e.type) throw e.arg;
                            return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), h
                        },
                        finish: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), j(n), h
                            }
                        },
                        catch: function(e) {
                            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                                var n = this.tryEntries[t];
                                if (n.tryLoc === e) {
                                    var r = n.completion;
                                    if ("throw" === r.type) {
                                        var a = r.arg;
                                        j(n)
                                    }
                                    return a
                                }
                            }
                            throw new Error("illegal catch attempt")
                        },
                        delegateYield: function(e, t, n) {
                            return this.delegate = {
                                iterator: T(e),
                                resultName: t,
                                nextLoc: n
                            }, "next" === this.method && (this.arg = void 0), h
                        }
                    }, t
                }
                e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6015: function(e) {
                function t(n, r) {
                    return e.exports = t = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                        return e.__proto__ = t, e
                    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n, r)
                }
                e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            7424: function(e, t, n) {
                var r = n(5372),
                    a = n(8872),
                    o = n(6116),
                    i = n(2218);
                e.exports = function(e, t) {
                    return r(e) || a(e, t) || o(e, t) || i()
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            1589: function(e, t, n) {
                var r = n(5372),
                    a = n(9498),
                    o = n(6116),
                    i = n(2218);
                e.exports = function(e) {
                    return r(e) || a(e) || o(e) || i()
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            861: function(e, t, n) {
                var r = n(3405),
                    a = n(9498),
                    o = n(6116),
                    i = n(2281);
                e.exports = function(e) {
                    return r(e) || a(e) || o(e) || i()
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            5036: function(e, t, n) {
                var r = n(8698).default;
                e.exports = function(e, t) {
                    if ("object" !== r(e) || null === e) return e;
                    var n = e[Symbol.toPrimitive];
                    if (void 0 !== n) {
                        var a = n.call(e, t || "default");
                        if ("object" !== r(a)) return a;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === t ? String : Number)(e)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            4062: function(e, t, n) {
                var r = n(8698).default,
                    a = n(5036);
                e.exports = function(e) {
                    var t = a(e, "string");
                    return "symbol" === r(t) ? t : String(t)
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            8698: function(e) {
                function t(n) {
                    return e.exports = t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n)
                }
                e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            6116: function(e, t, n) {
                var r = n(3897);
                e.exports = function(e, t) {
                    if (e) {
                        if ("string" === typeof e) return r(e, t);
                        var n = Object.prototype.toString.call(e).slice(8, -1);
                        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(e, t) : void 0
                    }
                }, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            3496: function(e, t, n) {
                var r = n(3808),
                    a = n(6015),
                    o = n(6035),
                    i = n(3515);

                function u(t) {
                    var n = "function" === typeof Map ? new Map : void 0;
                    return e.exports = u = function(e) {
                        if (null === e || !o(e)) return e;
                        if ("function" !== typeof e) throw new TypeError("Super expression must either be null or a function");
                        if ("undefined" !== typeof n) {
                            if (n.has(e)) return n.get(e);
                            n.set(e, t)
                        }

                        function t() {
                            return i(e, arguments, r(this).constructor)
                        }
                        return t.prototype = Object.create(e.prototype, {
                            constructor: {
                                value: t,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), a(t, e)
                    }, e.exports.__esModule = !0, e.exports.default = e.exports, u(t)
                }
                e.exports = u, e.exports.__esModule = !0, e.exports.default = e.exports
            },
            5671: function(e, t, n) {
                "use strict";

                function r(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }
                n.d(t, {
                    Z: function() {
                        return r
                    }
                })
            },
            3144: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Z: function() {
                        return o
                    }
                });
                var r = n(9142);

                function a(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var a = t[n];
                        a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, (0, r.Z)(a.key), a)
                    }
                }

                function o(e, t, n) {
                    return t && a(e.prototype, t), n && a(e, n), Object.defineProperty(e, "prototype", {
                        writable: !1
                    }), e
                }
            },
            9142: function(e, t, n) {
                "use strict";
                n.d(t, {
                    Z: function() {
                        return a
                    }
                });
                var r = n(1002);

                function a(e) {
                    var t = function(e, t) {
                        if ("object" !== (0, r.Z)(e) || null === e) return e;
                        var n = e[Symbol.toPrimitive];
                        if (void 0 !== n) {
                            var a = n.call(e, t || "default");
                            if ("object" !== (0, r.Z)(a)) return a;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return ("string" === t ? String : Number)(e)
                    }(e, "string");
                    return "symbol" === (0, r.Z)(t) ? t : String(t)
                }
            },
            1002: function(e, t, n) {
                "use strict";

                function r(e) {
                    return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    }, r(e)
                }
                n.d(t, {
                    Z: function() {
                        return r
                    }
                })
            },
            4751: function(e, t, n) {
                "use strict";
                n.r(t), n.d(t, {
                    Store: function() {
                        return i
                    },
                    clear: function() {
                        return d
                    },
                    close: function() {
                        return h
                    },
                    del: function() {
                        return f
                    },
                    get: function() {
                        return l
                    },
                    keys: function() {
                        return p
                    },
                    set: function() {
                        return s
                    },
                    update: function() {
                        return c
                    }
                });
                var r, a = n(5671),
                    o = n(3144),
                    i = function() {
                        function e() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "keyval-store",
                                n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "keyval";
                            (0, a.Z)(this, e), this.storeName = n, this._dbName = t, this._storeName = n, this._init()
                        }
                        return (0, o.Z)(e, [{
                            key: "_init",
                            value: function() {
                                var e = this;
                                this._dbp || (this._dbp = new Promise((function(t, n) {
                                    var r = indexedDB.open(e._dbName);
                                    r.onerror = function() {
                                        return n(r.error)
                                    }, r.onsuccess = function() {
                                        return t(r.result)
                                    }, r.onupgradeneeded = function() {
                                        r.result.createObjectStore(e._storeName)
                                    }
                                })))
                            }
                        }, {
                            key: "_withIDBStore",
                            value: function(e, t) {
                                var n = this;
                                return this._init(), this._dbp.then((function(r) {
                                    return new Promise((function(a, o) {
                                        var i = r.transaction(n.storeName, e);
                                        i.oncomplete = function() {
                                            return a()
                                        }, i.onabort = i.onerror = function() {
                                            return o(i.error)
                                        }, t(i.objectStore(n.storeName))
                                    }))
                                }))
                            }
                        }, {
                            key: "_close",
                            value: function() {
                                var e = this;
                                return this._init(), this._dbp.then((function(t) {
                                    t.close(), e._dbp = void 0
                                }))
                            }
                        }]), e
                    }();

                function u() {
                    return r || (r = new i), r
                }

                function l(e) {
                    var t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u();
                    return n._withIDBStore("readwrite", (function(n) {
                        t = n.get(e)
                    })).then((function() {
                        return t.result
                    }))
                }

                function s(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : u();
                    return n._withIDBStore("readwrite", (function(n) {
                        n.put(t, e)
                    }))
                }

                function c(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : u();
                    return n._withIDBStore("readwrite", (function(n) {
                        var r = n.get(e);
                        r.onsuccess = function() {
                            n.put(t(r.result), e)
                        }
                    }))
                }

                function f(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : u();
                    return t._withIDBStore("readwrite", (function(t) {
                        t.delete(e)
                    }))
                }

                function d() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u();
                    return e._withIDBStore("readwrite", (function(e) {
                        e.clear()
                    }))
                }

                function p() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u(),
                        t = [];
                    return e._withIDBStore("readwrite", (function(e) {
                        (e.openKeyCursor || e.openCursor).call(e).onsuccess = function() {
                            this.result && (t.push(this.result.key), this.result.continue())
                        }
                    })).then((function() {
                        return t
                    }))
                }

                function h() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u();
                    return e._close()
                }
            }
        },
        t = {};

    function n(r) {
        var a = t[r];
        if (void 0 !== a) return a.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.exports
    }
    n.amdO = {}, n.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return n.d(t, {
                a: t
            }), t
        },
        function() {
            var e, t = Object.getPrototypeOf ? function(e) {
                return Object.getPrototypeOf(e)
            } : function(e) {
                return e.__proto__
            };
            n.t = function(r, a) {
                if (1 & a && (r = this(r)), 8 & a) return r;
                if ("object" === typeof r && r) {
                    if (4 & a && r.__esModule) return r;
                    if (16 & a && "function" === typeof r.then) return r
                }
                var o = Object.create(null);
                n.r(o);
                var i = {};
                e = e || [null, t({}), t([]), t(t)];
                for (var u = 2 & a && r;
                    "object" == typeof u && !~e.indexOf(u); u = t(u)) Object.getOwnPropertyNames(u).forEach((function(e) {
                    i[e] = function() {
                        return r[e]
                    }
                }));
                return i.default = function() {
                    return r
                }, n.d(o, i), o
            }
        }(), n.d = function(e, t) {
            for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, {
                enumerable: !0,
                get: t[r]
            })
        }, n.g = function() {
            if ("object" === typeof globalThis) return globalThis;
            try {
                return this || new Function("return this")()
            } catch (e) {
                if ("object" === typeof window) return window
            }
        }(), n.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.r = function(e) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        },
        function() {
            "use strict";
            var e = n(1739),
                t = n(697),
                r = n.t(t, 2),
                a = n(9142);

            function o(e, t, n) {
                return (t = (0, a.Z)(t)) in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }

            function i(e, t) {
                var n = Object.keys(e);
                if (Object.getOwnPropertySymbols) {
                    var r = Object.getOwnPropertySymbols(e);
                    t && (r = r.filter((function(t) {
                        return Object.getOwnPropertyDescriptor(e, t).enumerable
                    }))), n.push.apply(n, r)
                }
                return n
            }

            function u(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? i(Object(n), !0).forEach((function(t) {
                        o(e, t, n[t])
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                    }))
                }
                return e
            }
            var l = n(7076);

            function s(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
                return r
            }

            function c(e) {
                if ("undefined" !== typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
            }

            function f(e, t) {
                if (e) {
                    if ("string" === typeof e) return s(e, t);
                    var n = Object.prototype.toString.call(e).slice(8, -1);
                    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0
                }
            }

            function d(e) {
                return function(e) {
                    if (Array.isArray(e)) return s(e)
                }(e) || c(e) || f(e) || function() {
                    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }()
            }
            var p = n(1002);

            function h() {
                h = function() {
                    return e
                };
                var e = {},
                    t = Object.prototype,
                    n = t.hasOwnProperty,
                    r = Object.defineProperty || function(e, t, n) {
                        e[t] = n.value
                    },
                    a = "function" == typeof Symbol ? Symbol : {},
                    o = a.iterator || "@@iterator",
                    i = a.asyncIterator || "@@asyncIterator",
                    u = a.toStringTag || "@@toStringTag";

                function l(e, t, n) {
                    return Object.defineProperty(e, t, {
                        value: n,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }), e[t]
                }
                try {
                    l({}, "")
                } catch (M) {
                    l = function(e, t, n) {
                        return e[t] = n
                    }
                }

                function s(e, t, n, a) {
                    var o = t && t.prototype instanceof d ? t : d,
                        i = Object.create(o.prototype),
                        u = new j(a || []);
                    return r(i, "_invoke", {
                        value: S(e, n, u)
                    }), i
                }

                function c(e, t, n) {
                    try {
                        return {
                            type: "normal",
                            arg: e.call(t, n)
                        }
                    } catch (M) {
                        return {
                            type: "throw",
                            arg: M
                        }
                    }
                }
                e.wrap = s;
                var f = {};

                function d() {}

                function v() {}

                function m() {}
                var b = {};
                l(b, o, (function() {
                    return this
                }));
                var y = Object.getPrototypeOf,
                    g = y && y(y(P([])));
                g && g !== t && n.call(g, o) && (b = g);
                var w = m.prototype = d.prototype = Object.create(b);

                function x(e) {
                    ["next", "throw", "return"].forEach((function(t) {
                        l(e, t, (function(e) {
                            return this._invoke(t, e)
                        }))
                    }))
                }

                function k(e, t) {
                    function a(r, o, i, u) {
                        var l = c(e[r], e, o);
                        if ("throw" !== l.type) {
                            var s = l.arg,
                                f = s.value;
                            return f && "object" == (0, p.Z)(f) && n.call(f, "__await") ? t.resolve(f.__await).then((function(e) {
                                a("next", e, i, u)
                            }), (function(e) {
                                a("throw", e, i, u)
                            })) : t.resolve(f).then((function(e) {
                                s.value = e, i(s)
                            }), (function(e) {
                                return a("throw", e, i, u)
                            }))
                        }
                        u(l.arg)
                    }
                    var o;
                    r(this, "_invoke", {
                        value: function(e, n) {
                            function r() {
                                return new t((function(t, r) {
                                    a(e, n, t, r)
                                }))
                            }
                            return o = o ? o.then(r, r) : r()
                        }
                    })
                }

                function S(e, t, n) {
                    var r = "suspendedStart";
                    return function(a, o) {
                        if ("executing" === r) throw new Error("Generator is already running");
                        if ("completed" === r) {
                            if ("throw" === a) throw o;
                            return T()
                        }
                        for (n.method = a, n.arg = o;;) {
                            var i = n.delegate;
                            if (i) {
                                var u = _(i, n);
                                if (u) {
                                    if (u === f) continue;
                                    return u
                                }
                            }
                            if ("next" === n.method) n.sent = n._sent = n.arg;
                            else if ("throw" === n.method) {
                                if ("suspendedStart" === r) throw r = "completed", n.arg;
                                n.dispatchException(n.arg)
                            } else "return" === n.method && n.abrupt("return", n.arg);
                            r = "executing";
                            var l = c(e, t, n);
                            if ("normal" === l.type) {
                                if (r = n.done ? "completed" : "suspendedYield", l.arg === f) continue;
                                return {
                                    value: l.arg,
                                    done: n.done
                                }
                            }
                            "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg)
                        }
                    }
                }

                function _(e, t) {
                    var n = t.method,
                        r = e.iterator[n];
                    if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, _(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f;
                    var a = c(r, e.iterator, t.arg);
                    if ("throw" === a.type) return t.method = "throw", t.arg = a.arg, t.delegate = null, f;
                    var o = a.arg;
                    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, f) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, f)
                }

                function E(e) {
                    var t = {
                        tryLoc: e[0]
                    };
                    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
                }

                function C(e) {
                    var t = e.completion || {};
                    t.type = "normal", delete t.arg, e.completion = t
                }

                function j(e) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }], e.forEach(E, this), this.reset(!0)
                }

                function P(e) {
                    if (e) {
                        var t = e[o];
                        if (t) return t.call(e);
                        if ("function" == typeof e.next) return e;
                        if (!isNaN(e.length)) {
                            var r = -1,
                                a = function t() {
                                    for (; ++r < e.length;)
                                        if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
                                    return t.value = void 0, t.done = !0, t
                                };
                            return a.next = a
                        }
                    }
                    return {
                        next: T
                    }
                }

                function T() {
                    return {
                        value: void 0,
                        done: !0
                    }
                }
                return v.prototype = m, r(w, "constructor", {
                    value: m,
                    configurable: !0
                }), r(m, "constructor", {
                    value: v,
                    configurable: !0
                }), v.displayName = l(m, u, "GeneratorFunction"), e.isGeneratorFunction = function(e) {
                    var t = "function" == typeof e && e.constructor;
                    return !!t && (t === v || "GeneratorFunction" === (t.displayName || t.name))
                }, e.mark = function(e) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(e, m) : (e.__proto__ = m, l(e, u, "GeneratorFunction")), e.prototype = Object.create(w), e
                }, e.awrap = function(e) {
                    return {
                        __await: e
                    }
                }, x(k.prototype), l(k.prototype, i, (function() {
                    return this
                })), e.AsyncIterator = k, e.async = function(t, n, r, a, o) {
                    void 0 === o && (o = Promise);
                    var i = new k(s(t, n, r, a), o);
                    return e.isGeneratorFunction(n) ? i : i.next().then((function(e) {
                        return e.done ? e.value : i.next()
                    }))
                }, x(w), l(w, u, "Generator"), l(w, o, (function() {
                    return this
                })), l(w, "toString", (function() {
                    return "[object Generator]"
                })), e.keys = function(e) {
                    var t = Object(e),
                        n = [];
                    for (var r in t) n.push(r);
                    return n.reverse(),
                        function e() {
                            for (; n.length;) {
                                var r = n.pop();
                                if (r in t) return e.value = r, e.done = !1, e
                            }
                            return e.done = !0, e
                        }
                }, e.values = P, j.prototype = {
                    constructor: j,
                    reset: function(e) {
                        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(C), !e)
                            for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0)
                    },
                    stop: function() {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval
                    },
                    dispatchException: function(e) {
                        if (this.done) throw e;
                        var t = this;

                        function r(n, r) {
                            return i.type = "throw", i.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r
                        }
                        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                            var o = this.tryEntries[a],
                                i = o.completion;
                            if ("root" === o.tryLoc) return r("end");
                            if (o.tryLoc <= this.prev) {
                                var u = n.call(o, "catchLoc"),
                                    l = n.call(o, "finallyLoc");
                                if (u && l) {
                                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                                    if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                                } else if (u) {
                                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0)
                                } else {
                                    if (!l) throw new Error("try statement without catch or finally");
                                    if (this.prev < o.finallyLoc) return r(o.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(e, t) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var a = this.tryEntries[r];
                            if (a.tryLoc <= this.prev && n.call(a, "finallyLoc") && this.prev < a.finallyLoc) {
                                var o = a;
                                break
                            }
                        }
                        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
                        var i = o ? o.completion : {};
                        return i.type = e, i.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, f) : this.complete(i)
                    },
                    complete: function(e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), f
                    },
                    finish: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), C(n), f
                        }
                    },
                    catch: function(e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                            var n = this.tryEntries[t];
                            if (n.tryLoc === e) {
                                var r = n.completion;
                                if ("throw" === r.type) {
                                    var a = r.arg;
                                    C(n)
                                }
                                return a
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(e, t, n) {
                        return this.delegate = {
                            iterator: P(e),
                            resultName: t,
                            nextLoc: n
                        }, "next" === this.method && (this.arg = void 0), f
                    }
                }, e
            }

            function v(e, t, n, r, a, o, i) {
                try {
                    var u = e[o](i),
                        l = u.value
                } catch (s) {
                    return void n(s)
                }
                u.done ? t(l) : Promise.resolve(l).then(r, a)
            }

            function m(e) {
                return function() {
                    var t = this,
                        n = arguments;
                    return new Promise((function(r, a) {
                        var o = e.apply(t, n);

                        function i(e) {
                            v(o, r, a, i, u, "next", e)
                        }

                        function u(e) {
                            v(o, r, a, i, u, "throw", e)
                        }
                        i(void 0)
                    }))
                }
            }

            function b(e) {
                if (Array.isArray(e)) return e
            }

            function y() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }

            function g(e, t) {
                return b(e) || function(e, t) {
                    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                    if (null != n) {
                        var r, a, o, i, u = [],
                            l = !0,
                            s = !1;
                        try {
                            if (o = (n = n.call(e)).next, 0 === t) {
                                if (Object(n) !== n) return;
                                l = !1
                            } else
                                for (; !(l = (r = o.call(n)).done) && (u.push(r.value), u.length !== t); l = !0);
                        } catch (c) {
                            s = !0, a = c
                        } finally {
                            try {
                                if (!l && null != n.return && (i = n.return(), Object(i) !== i)) return
                            } finally {
                                if (s) throw a
                            }
                        }
                        return u
                    }
                }(e, t) || f(e, t) || y()
            }
            var w, x = function(e) {
                for (var t = [], n = {
                        text: "",
                        hasBeenQuotedOrEscaped: !1,
                        unfinished: !1
                    }, r = !1, a = !1, o = "", i = 0; i < e.length; i++) {
                    var u = e[i];
                    r ? (n.text += "n" === u ? "\n" : "t" === u ? "\t" : u, r = !1) : "\\" === u ? (r = !0, n.hasBeenQuotedOrEscaped = !0) : !['"', "'"].includes(u) || a && o !== u ? " " !== u || a ? n.text += u : n.text && (t.push(n), n = {
                        text: "",
                        hasBeenQuotedOrEscaped: !1,
                        unfinished: !1
                    }) : (a = !a, o = u, n.hasBeenQuotedOrEscaped = !0)
                }
                return n.unfinished = r || a, (n.text || n.unfinished || n.hasBeenQuotedOrEscaped) && t.push(n), t
            };
            ! function(e) {
                e.Unidentified = "Unidentified", e.Alt = "Alt", e.AltGraph = "AltGraph", e.CapsLock = "CapsLock", e.Control = "Control", e.Fn = "Fn", e.FnLock = "FnLock", e.Meta = "Meta", e.NumLock = "NumLock", e.ScrollLock = "ScrollLock", e.Shift = "Shift", e.Symbol = "Symbol", e.SymbolLock = "SymbolLock", e.Hyper = "Hyper", e.Super = "Super", e.Enter = "Enter", e.Tab = "Tab", e.ArrowDown = "ArrowDown", e.ArrowLeft = "ArrowLeft", e.ArrowRight = "ArrowRight", e.ArrowUp = "ArrowUp", e.End = "End", e.Home = "Home", e.PageDown = "PageDown", e.PageUp = "PageUp", e.Backspace = "Backspace", e.Clear = "Clear", e.Copy = "Copy", e.CrSel = "CrSel", e.Cut = "Cut", e.Delete = "Delete", e.EraseEof = "EraseEof", e.ExSel = "ExSel", e.Insert = "Insert", e.Paste = "Paste", e.Redo = "Redo", e.Undo = "Undo", e.Accept = "Accept", e.Again = "Again", e.Attn = "Attn", e.Cancel = "Cancel", e.ContextMenu = "ContextMenu", e.Escape = "Escape", e.Execute = "Execute", e.Find = "Find", e.Help = "Help", e.Pause = "Pause", e.Play = "Play", e.Props = "Props", e.Select = "Select", e.ZoomIn = "ZoomIn", e.ZoomOut = "ZoomOut", e.BrightnessDown = "BrightnessDown", e.BrightnessUp = "BrightnessUp", e.Eject = "Eject", e.LogOff = "LogOff", e.Power = "Power", e.PowerOff = "PowerOff", e.PrintScreen = "PrintScreen", e.Hibernate = "Hibernate", e.Standby = "Standby", e.WakeUp = "WakeUp", e.AllCandidates = "AllCandidates", e.Alphanumeric = "Alphanumeric", e.CodeInput = "CodeInput", e.Compose = "Compose", e.Convert = "Convert", e.Dead = "Dead", e.FinalMode = "FinalMode", e.GroupFirst = "GroupFirst", e.GroupLast = "GroupLast", e.GroupNext = "GroupNext", e.GroupPrevious = "GroupPrevious", e.ModeChange = "ModeChange", e.NextCandidate = "NextCandidate", e.NonConvert = "NonConvert", e.PreviousCandidate = "PreviousCandidate", e.Process = "Process", e.SingleCandidate = "SingleCandidate", e.HangulMode = "HangulMode", e.HanjaMode = "HanjaMode", e.JunjaMode = "JunjaMode", e.Eisu = "Eisu", e.Hankaku = "Hankaku", e.Hiragana = "Hiragana", e.HiraganaKatakana = "HiraganaKatakana", e.KanaMode = "KanaMode", e.KanjiMode = "KanjiMode", e.Katakana = "Katakana", e.Romaji = "Romaji", e.Zenkaku = "Zenkaku", e.ZenkakuHankaku = "ZenkakuHankaku", e.F1 = "F1", e.F2 = "F2", e.F3 = "F3", e.F4 = "F4", e.F5 = "F5", e.F6 = "F6", e.F7 = "F7", e.F8 = "F8", e.F9 = "F9", e.F10 = "F10", e.F11 = "F11", e.F12 = "F12", e.Soft1 = "Soft1", e.Soft2 = "Soft2", e.Soft3 = "Soft3", e.Soft4 = "Soft4", e.ChannelDown = "ChannelDown", e.ChannelUp = "ChannelUp", e.Close = "Close", e.MailForward = "MailForward", e.MailReply = "MailReply", e.MailSend = "MailSend", e.MediaClose = "MediaClose", e.MediaFastForward = "MediaFastForward", e.MediaPause = "MediaPause", e.MediaPlay = "MediaPlay", e.MediaPlayPause = "MediaPlayPause", e.MediaRecord = "MediaRecord", e.MediaRewind = "MediaRewind", e.MediaStop = "MediaStop", e.MediaTrackNext = "MediaTrackNext", e.MediaTrackPrevious = "MediaTrackPrevious", e.New = "New", e.Open = "Open", e.Print = "Print", e.Save = "Save", e.SpellCheck = "SpellCheck", e.Key11 = "Key11", e.Key12 = "Key12", e.AudioBalanceLeft = "AudioBalanceLeft", e.AudioBalanceRight = "AudioBalanceRight", e.AudioBassBoostDown = "AudioBassBoostDown", e.AudioBassBoostToggle = "AudioBassBoostToggle", e.AudioBassBoostUp = "AudioBassBoostUp", e.AudioFaderFront = "AudioFaderFront", e.AudioFaderRear = "AudioFaderRear", e.AudioSurroundModeNext = "AudioSurroundModeNext", e.AudioTrebleDown = "AudioTrebleDown", e.AudioTrebleUp = "AudioTrebleUp", e.AudioVolumeDown = "AudioVolumeDown", e.AudioVolumeUp = "AudioVolumeUp", e.AudioVolumeMute = "AudioVolumeMute", e.MicrophoneToggle = "MicrophoneToggle", e.MicrophoneVolumeDown = "MicrophoneVolumeDown", e.MicrophoneVolumeUp = "MicrophoneVolumeUp", e.MicrophoneVolumeMute = "MicrophoneVolumeMute", e.SpeechCorrectionList = "SpeechCorrectionList", e.SpeechInputToggle = "SpeechInputToggle", e.LaunchApplication1 = "LaunchApplication1", e.LaunchApplication2 = "LaunchApplication2", e.LaunchCalendar = "LaunchCalendar", e.LaunchContacts = "LaunchContacts", e.LaunchMail = "LaunchMail", e.LaunchMediaPlayer = "LaunchMediaPlayer", e.LaunchMusicPlayer = "LaunchMusicPlayer", e.LaunchPhone = "LaunchPhone", e.LaunchScreenSaver = "LaunchScreenSaver", e.LaunchSpreadsheet = "LaunchSpreadsheet", e.LaunchWebBrowser = "LaunchWebBrowser", e.LaunchWebCam = "LaunchWebCam", e.LaunchWordProcessor = "LaunchWordProcessor", e.BrowserBack = "BrowserBack", e.BrowserFavorites = "BrowserFavorites", e.BrowserForward = "BrowserForward", e.BrowserHome = "BrowserHome", e.BrowserRefresh = "BrowserRefresh", e.BrowserSearch = "BrowserSearch", e.BrowserStop = "BrowserStop", e.AppSwitch = "AppSwitch", e.Call = "Call", e.Camera = "Camera", e.CameraFocus = "CameraFocus", e.EndCall = "EndCall", e.GoBack = "GoBack", e.GoHome = "GoHome", e.HeadsetHook = "HeadsetHook", e.LastNumberRedial = "LastNumberRedial", e.Notification = "Notification", e.MannerMode = "MannerMode", e.VoiceDial = "VoiceDial", e.TV = "TV", e.TV3DMode = "TV3DMode", e.TVAntennaCable = "TVAntennaCable", e.TVAudioDescription = "TVAudioDescription", e.TVAudioDescriptionMixDown = "TVAudioDescriptionMixDown", e.TVAudioDescriptionMixUp = "TVAudioDescriptionMixUp", e.TVContentsMenu = "TVContentsMenu", e.TVDataService = "TVDataService", e.TVInput = "TVInput", e.TVInputComponent1 = "TVInputComponent1", e.TVInputComponent2 = "TVInputComponent2", e.TVInputComposite1 = "TVInputComposite1", e.TVInputComposite2 = "TVInputComposite2", e.TVInputHDMI1 = "TVInputHDMI1", e.TVInputHDMI2 = "TVInputHDMI2", e.TVInputHDMI3 = "TVInputHDMI3", e.TVInputHDMI4 = "TVInputHDMI4", e.TVInputVGA1 = "TVInputVGA1", e.TVMediaContext = "TVMediaContext", e.TVNetwork = "TVNetwork", e.TVNumberEntry = "TVNumberEntry", e.TVPower = "TVPower", e.TVRadioService = "TVRadioService", e.TVSatellite = "TVSatellite", e.TVSatelliteBS = "TVSatelliteBS", e.TVSatelliteCS = "TVSatelliteCS", e.TVSatelliteToggle = "TVSatelliteToggle", e.TVTerrestrialAnalog = "TVTerrestrialAnalog", e.TVTerrestrialDigital = "TVTerrestrialDigital", e.TVTimer = "TVTimer", e.AVRInput = "AVRInput", e.AVRPower = "AVRPower", e.ColorF0Red = "ColorF0Red", e.ColorF1Green = "ColorF1Green", e.ColorF2Yellow = "ColorF2Yellow", e.ColorF3Blue = "ColorF3Blue", e.ColorF4Grey = "ColorF4Grey", e.ColorF5Brown = "ColorF5Brown", e.ClosedCaptionToggle = "ClosedCaptionToggle", e.Dimmer = "Dimmer", e.DisplaySwap = "DisplaySwap", e.DVR = "DVR", e.Exit = "Exit", e.FavoriteClear0 = "FavoriteClear0", e.FavoriteClear1 = "FavoriteClear1", e.FavoriteClear2 = "FavoriteClear2", e.FavoriteClear3 = "FavoriteClear3", e.FavoriteRecall0 = "FavoriteRecall0", e.FavoriteRecall1 = "FavoriteRecall1", e.FavoriteRecall2 = "FavoriteRecall2", e.FavoriteRecall3 = "FavoriteRecall3", e.FavoriteStore0 = "FavoriteStore0", e.FavoriteStore1 = "FavoriteStore1", e.FavoriteStore2 = "FavoriteStore2", e.FavoriteStore3 = "FavoriteStore3", e.Guide = "Guide", e.GuideNextDay = "GuideNextDay", e.GuidePreviousDay = "GuidePreviousDay", e.Info = "Info", e.InstantReplay = "InstantReplay", e.Link = "Link", e.ListProgram = "ListProgram", e.LiveContent = "LiveContent", e.Lock = "Lock", e.MediaApps = "MediaApps", e.MediaAudioTrack = "MediaAudioTrack", e.MediaLast = "MediaLast", e.MediaSkipBackward = "MediaSkipBackward", e.MediaSkipForward = "MediaSkipForward", e.MediaStepBackward = "MediaStepBackward", e.MediaStepForward = "MediaStepForward", e.MediaTopMenu = "MediaTopMenu", e.NavigateIn = "NavigateIn", e.NavigateNext = "NavigateNext", e.NavigateOut = "NavigateOut", e.NavigatePrevious = "NavigatePrevious", e.NextFavoriteChannel = "NextFavoriteChannel", e.NextUserProfile = "NextUserProfile", e.OnDemand = "OnDemand", e.Pairing = "Pairing", e.PinPDown = "PinPDown", e.PinPMove = "PinPMove", e.PinPToggle = "PinPToggle", e.PinPUp = "PinPUp", e.PlaySpeedDown = "PlaySpeedDown", e.PlaySpeedReset = "PlaySpeedReset", e.PlaySpeedUp = "PlaySpeedUp", e.RandomToggle = "RandomToggle", e.RcLowBattery = "RcLowBattery", e.RecordSpeedNext = "RecordSpeedNext", e.RfBypass = "RfBypass", e.ScanChannelsToggle = "ScanChannelsToggle", e.ScreenModeNext = "ScreenModeNext", e.Settings = "Settings", e.SplitScreenToggle = "SplitScreenToggle", e.STBInput = "STBInput", e.STBPower = "STBPower", e.Subtitle = "Subtitle", e.Teletext = "Teletext", e.VideoModeNext = "VideoModeNext", e.Wink = "Wink", e.ZoomToggle = "ZoomToggle"
            }(w || (w = {}));
            var k, S = Object.values(w),
                _ = function(e) {
                    return function(e) {
                        return S.includes(e)
                    }(e) || function(e) {
                        return !!e.match(/^(?:F|(?:Soft))\d+$/)
                    }(e)
                },
                E = function(e) {
                    return e.length > 0 && e[e.length - 1].unfinished
                },
                C = n(3157),
                j = new(n.n(C)()),
                P = j.getEngine(),
                T = j.getOS(),
                M = j.getDevice(),
                D = "iOS" === T.name,
                N = null === (k = T.name) || void 0 === k ? void 0 : k.startsWith("Android"),
                R = "Windows" === T.name,
                O = "Mac OS" === T.name,
                L = N && "Gecko" === P.name,
                F = "WebKit" === P.name,
                A = "mobile" === M.type,
                I = "tablet" === M.type,
                z = A || I,
                U = (M.vendor, function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f, p, v, m;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.userInput, r = t.prefix, a = t.history, o = t.isCommandRunning, i = t.setUserInput, u = t.setCursorPosition, l = t.setHistory, s = t.setHistoryIndex, c = t.setHistoryUserInputCache, f = t.insertTextAtCursor, p = t.onRunCommand, v = x(n), !E(v)) {
                                        e.next = 5;
                                        break
                                    }
                                    return f("\n"), e.abrupt("return");
                                case 5:
                                    return o.current = !0, e.prev = 6, e.next = 9, p(n, v, r);
                                case 9:
                                    m = [].concat(d(a), d(n.trim() ? [n] : [])), l(m), s(m.length), i(""), u(0), c([]);
                                case 15:
                                    return e.prev = 15, o.current = !1, e.finish(15);
                                case 18:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [6, , 15, 18]
                        ])
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }()),
                B = function() {
                    var e = m(h().mark((function e() {
                        var t, n, r, a;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (!(n = null === (t = window.getSelection()) || void 0 === t ? void 0 : t.toString())) {
                                        e.next = 9;
                                        break
                                    }
                                    if (null === (r = navigator.clipboard) || void 0 === r || !r.writeText) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.next = 5, navigator.clipboard.writeText(n);
                                case 5:
                                    e.next = 8;
                                    break;
                                case 7:
                                    document.execCommand("copy");
                                case 8:
                                    null === (a = window.getSelection()) || void 0 === a || a.removeAllRanges();
                                case 9:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }(),
                V = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.clipboardText, r = t.insertTextAtCursor, void 0 !== n) {
                                        e.next = 3;
                                        break
                                    }
                                    throw new Error("clipboard text is undefined");
                                case 3:
                                    n.length > 0 && r(n);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }();
            V.passClipboardText = !0;
            var H = R ? [{
                    key: "v",
                    ctrlKey: !0
                }, {
                    key: w.Insert,
                    shiftKey: !0
                }] : N ? [{
                    key: "v",
                    ctrlKey: !0
                }] : O || D ? [{
                    key: "v",
                    metaKey: !0
                }] : [{
                    key: "v",
                    ctrlKey: !0
                }, {
                    key: "v",
                    metaKey: !0
                }, {
                    key: w.Insert,
                    shiftKey: !0
                }],
                W = [{
                    keys: [{
                        key: w.Enter
                    }],
                    handler: U
                }, {
                    keys: [{
                        key: w.Backspace
                    }],
                    handler: function(e) {
                        var t = e.userInput,
                            n = e.cursorPosition,
                            r = e.setUserInput,
                            a = e.setCursorPosition;
                        n > 0 && (r(t.slice(0, n - 1) + t.slice(n)), a(n - 1))
                    }
                }, {
                    keys: [{
                        key: w.Delete
                    }],
                    handler: function(e) {
                        var t = e.userInput,
                            n = e.cursorPosition;
                        (0, e.setUserInput)(t.slice(0, n) + t.slice(n + 1))
                    }
                }, {
                    keys: [{
                        key: w.ArrowUp
                    }, {
                        key: w.ArrowDown
                    }],
                    handler: function(e) {
                        var t = e.key,
                            n = e.history,
                            r = e.historyIndex,
                            a = e.userInput,
                            o = e.historyUserInputCache,
                            i = e.setHistoryIndex,
                            u = e.setUserInput,
                            l = e.setCursorPosition,
                            s = e.setHistoryUserInputCache,
                            c = t === w.ArrowUp ? -1 : 1,
                            f = Math.min(Math.max(r + c, 0), n.length);
                        if (f !== r) {
                            var p, h, v = null !== (p = null !== (h = o[f]) && void 0 !== h ? h : n[f]) && void 0 !== p ? p : "";
                            s((function(e) {
                                var t = d(e);
                                return t[r] = a && a !== n[r] ? a : void 0, t
                            })), i(f), u(v), l(v.length)
                        }
                    }
                }, {
                    keys: [{
                        key: w.ArrowLeft
                    }, {
                        key: w.ArrowRight
                    }],
                    handler: function(e) {
                        var t = e.key,
                            n = e.userInput,
                            r = e.setCursorPosition,
                            a = t === w.ArrowLeft ? -1 : 1;
                        r((function(e) {
                            return Math.min(Math.max(e + a, 0), n.length)
                        }))
                    }
                }, {
                    keys: [{
                        key: "c",
                        ctrlKey: !0
                    }],
                    handler: function(e) {
                        var t = e.userInput,
                            n = e.prefix,
                            r = e.setUserInput,
                            a = e.setCursorPosition,
                            o = e.setHistoryUserInputCache;
                        (0, e.onAbortInput)(t, n), r(""), a(0), o([])
                    }
                }, {
                    keys: [{
                        key: "u",
                        ctrlKey: !0
                    }],
                    handler: function(e) {
                        var t = e.userInput,
                            n = e.cursorPosition,
                            r = e.setUserInput,
                            a = e.setCursorPosition;
                        r(t.slice(n)), a(0)
                    }
                }, {
                    keys: [{
                        key: "k",
                        ctrlKey: !0
                    }],
                    handler: function(e) {
                        var t = e.userInput,
                            n = e.cursorPosition;
                        (0, e.setUserInput)(t.slice(0, n))
                    }
                }, {
                    keys: [{
                        key: "C",
                        ctrlKey: !0,
                        shiftKey: !0
                    }, {
                        key: "c",
                        metaKey: !0
                    }, {
                        key: w.Copy
                    }],
                    handler: B
                }, {
                    keys: [].concat(H, [{
                        key: "V",
                        ctrlKey: !0,
                        shiftKey: !0
                    }, {
                        key: w.Paste
                    }, {
                        key: w.Insert,
                        shiftKey: !0
                    }]),
                    handler: V
                }, {
                    keys: [{
                        key: w.Tab
                    }, {
                        key: w.Tab,
                        shiftKey: !0
                    }],
                    handler: function() {}
                }],
                K = function(e, t) {
                    return e.key === t.key && e.shiftKey === !!t.shiftKey && e.ctrlKey === !!t.ctrlKey && e.altKey === !!t.altKey && e.metaKey === !!t.metaKey
                },
                q = function(e) {
                    return H.some((function(t) {
                        return K(e, t)
                    }))
                },
                $ = function(e) {
                    var t = W.find((function(t) {
                        return function(e, t) {
                            return t.keys.some((function(t) {
                                return K(e, t)
                            }))
                        }(e, t)
                    }));
                    return null === t || void 0 === t ? void 0 : t.handler
                },
                G = function() {
                    var e = g((0, t.useState)(!0), 2),
                        n = e[0],
                        r = e[1],
                        a = g((0, t.useState)(0), 2),
                        o = a[0],
                        i = a[1];
                    (0, t.useEffect)((function() {
                        var e;
                        r(!0);
                        var t = setTimeout((function() {
                            e = setInterval((function() {
                                r((function(e) {
                                    return !e
                                }))
                            }), 550)
                        }), 275);
                        return function() {
                            clearTimeout(t), e && clearInterval(e)
                        }
                    }), [o]);
                    return {
                        isCursorFull: n,
                        onResetCursorBlinking: function() {
                            return i((function(e) {
                                return (e + 1) % 100
                            }))
                        }
                    }
                },
                Q = function(e, t) {
                    return "".concat(e.user, "@").concat(e.host, " ").concat(function(e, t) {
                        if (t === e.userHomeDir) return "~";
                        if ("/" === t) return "/";
                        var n = t.split("/");
                        return n[n.length - 1]
                    }(e, t), " $").concat("\xa0")
                },
                Y = function(e, n, r, a, o) {
                    var i = g((0, t.useState)([]), 2),
                        u = i[0],
                        l = i[1],
                        s = g((0, t.useState)(0), 2),
                        c = s[0],
                        f = s[1],
                        p = g((0, t.useState)(""), 2),
                        v = p[0],
                        b = p[1],
                        y = g((0, t.useState)(0), 2),
                        w = y[0],
                        k = y[1],
                        S = g((0, t.useState)([]), 2),
                        E = S[0],
                        C = S[1],
                        j = (0, t.useRef)(!1),
                        P = G(),
                        T = P.isCursorFull,
                        M = P.onResetCursorBlinking,
                        D = Q(e, n),
                        N = function(e) {
                            b(v.slice(0, w) + e + v.slice(w)), k(w + e.length)
                        },
                        R = function() {
                            var e = m(h().mark((function e(t) {
                                var n, i, s;
                                return h().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (n = $(t), i = !n && !_(t.key) && !t.ctrlKey && !t.metaKey && !t.altKey, n || i) {
                                                e.next = 5;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 5:
                                            if (null === n || void 0 === n || !n.passClipboardText) {
                                                e.next = 11;
                                                break
                                            }
                                            return e.next = 8, o(t);
                                        case 8:
                                            e.t0 = e.sent, e.next = 12;
                                            break;
                                        case 11:
                                            e.t0 = void 0;
                                        case 12:
                                            if (s = e.t0, t.preventDefault(), M(), !j.current) {
                                                e.next = 17;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 17:
                                            if (!n) {
                                                e.next = 22;
                                                break
                                            }
                                            return e.next = 20, n({
                                                key: t.key,
                                                history: u,
                                                setHistory: l,
                                                historyIndex: c,
                                                setHistoryIndex: f,
                                                userInput: v,
                                                setUserInput: b,
                                                cursorPosition: w,
                                                setCursorPosition: k,
                                                historyUserInputCache: E,
                                                setHistoryUserInputCache: C,
                                                isCommandRunning: j,
                                                prefix: D,
                                                clipboardText: s,
                                                insertTextAtCursor: N,
                                                onAbortInput: a,
                                                onRunCommand: r
                                            });
                                        case 20:
                                            e.next = 23;
                                            break;
                                        case 22:
                                            N(t.key);
                                        case 23:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }(),
                        O = function() {
                            var e = m(h().mark((function e(t) {
                                var n, a;
                                return h().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (!j.current) {
                                                e.next = 2;
                                                break
                                            }
                                            return e.abrupt("return");
                                        case 2:
                                            return j.current = !0, e.prev = 3, n = x(t), b(t), k(t.length), e.next = 9, r(t, n, D);
                                        case 9:
                                            l((function(e) {
                                                var n = [].concat(d(e), [t]);
                                                return a = n.length, n
                                            })), f((function() {
                                                return a
                                            })), b(""), k(0), C([]);
                                        case 14:
                                            return e.prev = 14, j.current = !1, e.finish(14);
                                        case 17:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, null, [
                                    [3, , 14, 17]
                                ])
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }();
                    return {
                        prefix: D,
                        userInput: v,
                        cursorPosition: w,
                        isCursorFull: T,
                        onKeyDown: R,
                        onMobileInput: function(e) {
                            M(), j.current || N(e)
                        },
                        onRunCommandProgrammatically: O
                    }
                },
                Z = "ontouchend" in document,
                X = "visualViewport" in window,
                J = Z,
                ee = Z && X,
                te = function() {
                    var e = g((0, t.useState)(J), 2),
                        n = e[0],
                        r = e[1],
                        a = (0, t.useRef)(ee);
                    return {
                        hasSoftwareKeyboard: n,
                        detectSoftwareKeyboard: function() {
                            a.current && (new Promise((function(e) {
                                if (!window.visualViewport) throw new Error("visualViewport not available");
                                var t = !1,
                                    n = function n() {
                                        var r;
                                        t = !0, null === (r = window.visualViewport) || void 0 === r || r.removeEventListener("resize", n), e(!0)
                                    };
                                window.visualViewport.addEventListener("resize", n), setTimeout((function() {
                                    var r;
                                    t || (null === (r = window.visualViewport) || void 0 === r || r.removeEventListener("resize", n), e(!1))
                                }), 1500)
                            })).then((function(e) {
                                return r(e)
                            })), a.current = !1)
                        }
                    }
                },
                ne = function(e) {
                    return e.preventDefault()
                },
                re = function(e, n) {
                    var r = (0, t.useRef)(!1),
                        a = te(),
                        o = a.hasSoftwareKeyboard,
                        i = a.detectSoftwareKeyboard;
                    if (!o) return {
                        hasSoftwareKeyboard: o,
                        showFakeInput: !1
                    };
                    return {
                        hasSoftwareKeyboard: o,
                        showFakeInput: !0,
                        onDivClick: function() {
                            var t, n;
                            if (r.current) return r.current = !1, void(null === (n = e.current) || void 0 === n || n.blur());
                            i(), e.current !== document.activeElement && (null === (t = e.current) || void 0 === t || t.focus())
                        },
                        onDivMouseDown: function() {
                            D && e.current === document.activeElement && (r.current = !0)
                        },
                        onFakeInputKeyDown: ne,
                        onFakeInputChange: function(e) {
                            e.target.value && (n(e.target.value), e.target.value = "", L && (e.target.blur(), e.target.focus()))
                        }
                    }
                },
                ae = function(e) {
                    if (!e) return 80;
                    var t = e.getBoundingClientRect().width,
                        n = function(e) {
                            var t = document.createElement("div");
                            t.style.position = "absolute", t.style.top = "0", t.style.visibility = "hidden", t.style.width = "1ch", e.appendChild(t);
                            var n = t.getBoundingClientRect().width;
                            return e.removeChild(t), n
                        }(e);
                    return Math.floor(t / n)
                },
                oe = "pointer-events-none absolute right-px bottom-px -z-10 h-px w-px opacity-0",
                ie = (0, t.forwardRef)((function(e, t) {
                    return (0, l.jsxs)(l.Fragment, {
                        children: [(0, l.jsx)("input", u({
                            type: "text",
                            className: oe,
                            ref: t,
                            spellCheck: "false",
                            autoCorrect: "off",
                            autoCapitalize: "none",
                            autoComplete: "off",
                            enterKeyHint: "send",
                            id: "terminal-fi",
                            "aria-describedby": "terminal-fi-aria"
                        }, e)), (0, l.jsx)("label", {
                            htmlFor: "terminal-fi",
                            className: "sr-only",
                            children: "Input"
                        }), (0, l.jsx)("span", {
                            id: "terminal-fi-aria",
                            className: "sr-only",
                            children: "Input"
                        })]
                    })
                }));
            ie.displayName = "FakeInput";
            var ue = ie,
                le = function() {
                    var e = g((0, t.useState)(""), 2),
                        n = e[0],
                        r = e[1];
                    return {
                        output: n,
                        writeToStdout: function(e) {
                            r((function(t) {
                                return t + e
                            }))
                        }
                    }
                },
                se = function(e, n, r) {
                    var a = g((0, t.useState)(n || e.userHomeDir), 2),
                        o = a[0],
                        i = a[1],
                        u = g((0, t.useState)(o), 2),
                        l = u[0],
                        s = u[1];
                    return (0, t.useEffect)((function() {
                        null === r || void 0 === r || r(o)
                    }), [o]), {
                        workDir: o,
                        prevWorkDir: l,
                        setWorkDir: function(e) {
                            s(o), i(e)
                        }
                    }
                };

            function ce(e) {
                return b(e) || c(e) || f(e) || y()
            }
            var fe = function(e) {
                    var t = function(e) {
                            if (e.length >= 3) {
                                var t = e[e.length - 2];
                                if (!t.hasBeenQuotedOrEscaped) {
                                    var n = e[e.length - 1].text;
                                    if (">" === t.text) return {
                                        path: n,
                                        append: !1
                                    };
                                    if (">>" === t.text) return {
                                        path: n,
                                        append: !0
                                    }
                                }
                            }
                        }(e),
                        n = ce((t ? e.slice(0, -2) : e).map((function(e) {
                            return e.text
                        })));
                    return {
                        command: n[0],
                        args: n.slice(1),
                        outputFile: t
                    }
                },
                de = function(e) {
                    var t, n = [];
                    for (t = 0; t < e.length; t++) {
                        var r = e[t];
                        if (!(r.startsWith("-") && r.length > 1) || r.startsWith("--")) break;
                        n.push.apply(n, d(r.slice(1).split("")))
                    }
                    return {
                        flags: n,
                        rest: e.slice(t)
                    }
                },
                pe = function(e) {
                    return void 0 !== e.error
                },
                he = function(e, t, n) {
                    var r = new Date(e, t, n);
                    return e < 100 && r.setFullYear(r.getFullYear() - 1900), r
                },
                ve = function(e, t, n) {
                    var r = he(t, e, 1);
                    return n.map((function(e) {
                        var t = function(e, t) {
                            var n = new Date(e);
                            return n.setMonth(n.getMonth() + t), n
                        }(r, e);
                        return {
                            month: t.getMonth(),
                            year: t.getFullYear()
                        }
                    }))
                },
                me = function(e) {
                    var t = parseInt(e);
                    return !e.match(/^\d{1,4}$/) || isNaN(t) || t < 1 || t > 9999 ? {
                        error: "cal: year '".concat(e, "' not in range 1..9999")
                    } : {
                        number: t
                    }
                },
                be = function(e, t, n) {
                    var r = function(e) {
                        var t = parseInt(e);
                        return !e.match(/^\d{1,2}$/) || isNaN(t) || t < 1 || t > 12 ? {
                            error: "cal: ".concat(e, " is not a month number (1..12)")
                        } : {
                            number: t - 1
                        }
                    }(e);
                    if (pe(r)) return {
                        error: r.error
                    };
                    var a = me(t);
                    return pe(a) ? {
                        error: a.error
                    } : {
                        value: ve(r.number, a.number, n)
                    }
                },
                ye = function(e) {
                    var t = de(e),
                        n = t.flags,
                        r = g(t.rest, 2),
                        a = r[0],
                        o = r[1],
                        i = n.includes("3"),
                        u = i ? [-1, 0, 1] : [0];
                    return a ? o ? be(a, o, u) : function(e, t) {
                        var n = me(e);
                        return pe(n) ? {
                            error: n.error
                        } : t ? {
                            error: "cal: -3 together with a given year but no given month is not supported."
                        } : {
                            value: new Array(12).fill(null).map((function(e, t) {
                                return {
                                    month: t,
                                    year: n.number
                                }
                            }))
                        }
                    }(a, i) : function(e) {
                        var t = new Date;
                        return {
                            value: ve(t.getMonth(), t.getFullYear(), e)
                        }
                    }(u)
                },
                ge = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                we = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                xe = function(e) {
                    return " ".repeat(e)
                },
                ke = xe(2),
                Se = ge.join(" "),
                _e = Se + ke,
                Ee = Se.length,
                Ce = function(e) {
                    return e.toString().padStart(2, " ")
                },
                je = function(e, t, n) {
                    var r = we[e],
                        a = n ? "".concat(r, " ").concat(t) : r,
                        o = Ee - a.length;
                    return xe(Math.floor(o / 2)) + a + xe(Math.ceil(o / 2)) + ke
                },
                Pe = function(e, t, n) {
                    return [je(e, t, n), _e].concat(d(function(e, t) {
                        for (var n = [], r = he(t, e, 1).getDay(), a = he(t, e + 1, 0).getDate(), o = 1, i = 0; i < 6; i++) {
                            for (var u = [], l = 0; l < ge.length; l++) 0 === i && l < r ? u.push(xe(2)) : o <= a ? (u.push(Ce(o)), o++) : u.push(xe(2));
                            n.push(u.join(" ") + ke)
                        }
                        return n
                    }(e, t)), [""])
                },
                Te = function(e, t) {
                    var n = Math.ceil(e.length / t);
                    return new Array(n).fill(null).map((function(n, r) {
                        return function(e) {
                            return new Array(9).fill(null).map((function(t, n) {
                                return e.map((function(e) {
                                    return e[n]
                                })).join("")
                            }))
                        }(e.slice(r * t, (r + 1) * t))
                    })).flat()
                },
                Me = function(e, t) {
                    var n = e.toString(),
                        r = t * Ee + 2 * (t - 1) - n.length;
                    return xe(Math.floor(r / 2)) + n + xe(Math.ceil(r / 2))
                },
                De = function(e, t) {
                    var n = function(e) {
                            var t = e.every((function(t) {
                                return t.year === e[0].year
                            }));
                            return e.length > 1 && t
                        }(e),
                        r = function(e) {
                            return Math.max(Math.min(Math.floor(e / (Ee + 2)), 3), 1)
                        }(t);
                    return [].concat(d(n ? [Me(e[0].year, r)] : []), d(Te(e.map((function(e) {
                        var t = e.month,
                            r = e.year;
                        return Pe(t, r, !n)
                    })), r))).join("\n")
                },
                Ne = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.getTerminalColumns, a = ye(n), void 0 === a.error) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        output: a.error + "\n"
                                    });
                                case 4:
                                    return o = De(a.value, r()), e.abrupt("return", {
                                        output: o
                                    });
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Re = Ne,
                Oe = n(7237),
                Le = n.n(Oe);

            function Fe(e) {
                "" === e && (e = ".");
                for (var t = e.charAt(0) === ze, n = (e = Be(e)).split(ze), r = [], a = 0; a < n.length; a++) {
                    var o = n[a];
                    "." !== o && (".." === o && (t || !t && r.length > 0 && ".." !== r[0]) ? r.pop() : r.push(o))
                }
                if (!t && r.length < 2)
                    if (1 === r.length) "" === r[0] && r.unshift(".");
                    else r.push(".");
                return e = r.join(ze), t && e.charAt(0) !== ze && (e = ze + e), e
            }

            function Ae() {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
                    if ("string" !== typeof n) throw new TypeError("Invalid argument type to path.join: " + typeof n);
                    "" !== n && (n.charAt(0) === ze && (e = []), e.push(n))
                }
                var r = Fe(e.join(ze));
                if (r.length > 1 && r.charAt(r.length - 1) === ze) return r.substr(0, r.length - 1);
                if (r.charAt(0) !== ze) {
                    "." !== r.charAt(0) || 1 !== r.length && r.charAt(1) !== ze || (r = 1 === r.length ? "" : r.substr(2));
                    var a = process.cwd();
                    r = "" !== r ? Fe(a + ("/" !== a ? ze : "") + r) : a
                }
                return r
            }

            function Ie(e, t) {
                var n;
                e = Ae(e), t = Ae(t);
                var r = e.split(ze),
                    a = t.split(ze);
                a.shift(), r.shift();
                var o = 0,
                    i = [];
                for (n = 0; n < r.length; n++) {
                    if (r[n] !== a[n]) {
                        o = r.length - n;
                        break
                    }
                }
                i = a.slice(n), 1 === r.length && "" === r[0] && (o = 0), o > r.length && (o = r.length);
                var u = "";
                for (n = 0; n < o; n++) u += "../";
                return (u += i.join(ze)).length > 1 && u.charAt(u.length - 1) === ze && (u = u.substr(0, u.length - 1)), u
            }
            var ze = "/",
                Ue = new RegExp("//+", "g");

            function Be(e) {
                return e = e.replace(Ue, ze)
            }
            var Ve, He = function(e, t, n) {
                    if (e) return ["~", "~/"].includes(e) ? t.userHomeDir : e.startsWith("~/") ? Le().normalize(Le().resolve(t.userHomeDir, e.slice(2))) : Le().normalize(Le().resolve(n, e))
                },
                We = function(e, t) {
                    for (var n = 0; n < (arguments.length <= 2 ? 0 : arguments.length - 2); n++) {
                        var r = n + 2 < 2 || arguments.length <= n + 2 ? void 0 : arguments[n + 2],
                            a = 0 === r.length ? "" : Ie(t, r) || ".";
                        e = e.replaceAll("%".concat(n + 1), a)
                    }
                    return e + "\n"
                },
                Ke = function(e, t) {
                    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++) r[a - 2] = arguments[a];
                    return {
                        output: We.apply(void 0, [e, t].concat(r))
                    }
                },
                qe = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = He(n[0], r, o)) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: cat <file>"));
                                case 4:
                                    return e.prev = 4, e.next = 7, a.promises.stat(u);
                                case 7:
                                    if (e.sent.isFile()) {
                                        e.next = 10;
                                        break
                                    }
                                    return e.abrupt("return", i("cat: %1: Is a directory", u));
                                case 10:
                                    return e.next = 12, a.promises.readFile(u, {
                                        encoding: "utf8"
                                    });
                                case 12:
                                    return e.t0 = e.sent.toString(), e.abrupt("return", {
                                        output: e.t0
                                    });
                                case 16:
                                    e.prev = 16, e.t1 = e.catch(4), e.t2 = e.t1.code, e.next = "ENOENT" === e.t2 ? 21 : 22;
                                    break;
                                case 21:
                                    return e.abrupt("return", i("cat: %1: No such file or directory", u));
                                case 22:
                                    throw e.t1;
                                case 23:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [4, 16]
                        ])
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                $e = qe,
                Ge = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = t.args, a = t.terminalConfig, o = t.fs, i = t.workDir, u = t.prevWorkDir, l = t.errorOutput, s = "-" === r[0], c = s ? u : null !== (n = He(r[0], a, i)) && void 0 !== n ? n : a.userHomeDir, e.prev = 3, e.next = 6, o.promises.stat(c);
                                case 6:
                                    if (e.sent.isDirectory()) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return", l("cd: not a directory: %1", c));
                                case 9:
                                    return e.abrupt("return", {
                                        workDir: c,
                                        output: s ? "".concat(c, "\n") : ""
                                    });
                                case 12:
                                    e.prev = 12, e.t0 = e.catch(3), e.t1 = e.t0.code, e.next = "ENOENT" === e.t1 ? 17 : 18;
                                    break;
                                case 17:
                                    return e.abrupt("return", l("cd: no such file or directory: %1", c));
                                case 18:
                                    throw e.t0;
                                case 19:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [3, 12]
                        ])
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Qe = Ge;

            function Ye(e, t) {
                var n = "undefined" !== typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (!n) {
                    if (Array.isArray(e) || (n = f(e)) || t && e && "number" === typeof e.length) {
                        n && (e = n);
                        var r = 0,
                            a = function() {};
                        return {
                            s: a,
                            n: function() {
                                return r >= e.length ? {
                                    done: !0
                                } : {
                                    done: !1,
                                    value: e[r++]
                                }
                            },
                            e: function(e) {
                                throw e
                            },
                            f: a
                        }
                    }
                    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                }
                var o, i = !0,
                    u = !1;
                return {
                    s: function() {
                        n = n.call(e)
                    },
                    n: function() {
                        var e = n.next();
                        return i = e.done, e
                    },
                    e: function(e) {
                        u = !0, o = e
                    },
                    f: function() {
                        try {
                            i || null == n.return || n.return()
                        } finally {
                            if (u) throw o
                        }
                    }
                }
            }! function(e) {
                e.file = "file", e.directory = "directory"
            }(Ve || (Ve = {}));
            var Ze = function() {
                    var e = m(h().mark((function e(t, n) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, t.promises.stat(n);
                                case 3:
                                    return e.abrupt("return", !0);
                                case 6:
                                    if (e.prev = 6, e.t0 = e.catch(0), "ENOENT" !== e.t0.code) {
                                        e.next = 10;
                                        break
                                    }
                                    return e.abrupt("return", !1);
                                case 10:
                                    throw e.t0;
                                case 11:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 6]
                        ])
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                Xe = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, t.promises.stat(n);
                                case 3:
                                    return r = e.sent, e.abrupt("return", r.isDirectory());
                                case 7:
                                    if (e.prev = 7, e.t0 = e.catch(0), "ENOENT" !== e.t0.code) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.abrupt("return", !1);
                                case 11:
                                    throw e.t0;
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 7]
                        ])
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                Je = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, t.promises.stat(n);
                                case 3:
                                    return r = e.sent, e.abrupt("return", r.isFile());
                                case 7:
                                    if (e.prev = 7, e.t0 = e.catch(0), "ENOENT" !== e.t0.code) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.abrupt("return", !1);
                                case 11:
                                    throw e.t0;
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 7]
                        ])
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                et = function() {
                    var e = m(h().mark((function e(t, n) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, t.promises.readdir(n);
                                case 2:
                                    return e.t0 = e.sent.length, e.abrupt("return", 0 === e.t0);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                tt = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = Le().dirname(n), e.next = 3, Ze(t, r);
                                case 3:
                                    if (e.sent) {
                                        e.next = 7;
                                        break
                                    }
                                    e.t0 = void 0, e.next = 15;
                                    break;
                                case 7:
                                    return e.next = 9, Xe(t, r);
                                case 9:
                                    if (!e.sent) {
                                        e.next = 13;
                                        break
                                    }
                                    e.t1 = Ve.directory, e.next = 14;
                                    break;
                                case 13:
                                    e.t1 = Ve.file;
                                case 14:
                                    e.t0 = e.t1;
                                case 15:
                                    return e.abrupt("return", e.t0);
                                case 16:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                nt = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, tt(t, n);
                                case 2:
                                    return o = e.sent, e.abrupt("return", o ? o !== Ve.directory ? a : void 0 : r);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                rt = function(e, t) {
                    return e.path.localeCompare(t.path)
                },
                at = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a, o;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Xe(t, n);
                                case 2:
                                    if (!e.sent) {
                                        e.next = 17;
                                        break
                                    }
                                    return e.next = 5, t.promises.readdir(n);
                                case 5:
                                    return a = e.sent.map((function(e) {
                                        return Le().normalize(Le().join(n, e))
                                    })), e.t0 = [{
                                        path: n,
                                        type: Ve.directory
                                    }], e.t1 = d, e.next = 10, Promise.all(a.map((function(e) {
                                        return at(t, e, r)
                                    })));
                                case 10:
                                    return e.t2 = e.sent.reduce((function(e, t) {
                                        return e.concat(t)
                                    }), []), e.t3 = (0, e.t1)(e.t2), (o = e.t0.concat.call(e.t0, e.t3)).sort(r), e.abrupt("return", o);
                                case 17:
                                    return e.abrupt("return", [{
                                        path: n,
                                        type: Ve.file
                                    }]);
                                case 18:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                ot = "cp: %1: No such file or directory",
                it = "cp: %1: Not a directory",
                ut = function(e, t, n) {
                    var r = Ie(e, n.path);
                    return Le().normalize(Le().join(t, r))
                },
                lt = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, nt(t, n, r(ot, n), r(it, n));
                                case 2:
                                    return a = e.sent, e.abrupt("return", a ? {
                                        error: a
                                    } : void 0);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                st = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, lt(t, r, a);
                                case 2:
                                    if (!(o = e.sent)) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return", o);
                                case 5:
                                    return e.next = 7, Ze(t, r);
                                case 7:
                                    if (!e.sent) {
                                        e.next = 22;
                                        break
                                    }
                                    return e.next = 10, Xe(t, r);
                                case 10:
                                    if (!e.sent) {
                                        e.next = 18;
                                        break
                                    }
                                    if (n.type !== Ve.directory) {
                                        e.next = 15;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        skip: !0
                                    });
                                case 15:
                                    return e.abrupt("return", {
                                        error: a("cp: cannot overwrite directory %1 with non-directory %2", r, n.path)
                                    });
                                case 16:
                                    e.next = 22;
                                    break;
                                case 18:
                                    if (n.type !== Ve.directory) {
                                        e.next = 22;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: a(it, r)
                                    });
                                case 22:
                                    return e.abrupt("return", {
                                        skip: !1
                                    });
                                case 23:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                ct = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o, i, u, l, s, c, f, d;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, at(t, n, rt);
                                case 2:
                                    o = e.sent, i = "", u = Ye(o), e.prev = 5, u.s();
                                case 7:
                                    if ((l = u.n()).done) {
                                        e.next = 30;
                                        break
                                    }
                                    return s = l.value, c = ut(n, r, s), e.next = 12, st(t, s, c, a);
                                case 12:
                                    if (!("error" in (f = e.sent))) {
                                        e.next = 16;
                                        break
                                    }
                                    return i += f.error, e.abrupt("continue", 28);
                                case 16:
                                    if (!f.skip) {
                                        e.next = 18;
                                        break
                                    }
                                    return e.abrupt("continue", 28);
                                case 18:
                                    if (s.type !== Ve.directory) {
                                        e.next = 23;
                                        break
                                    }
                                    return e.next = 21, t.promises.mkdir(c);
                                case 21:
                                    e.next = 28;
                                    break;
                                case 23:
                                    return e.next = 25, t.promises.readFile(s.path);
                                case 25:
                                    return d = e.sent, e.next = 28, t.promises.writeFile(c, d);
                                case 28:
                                    e.next = 7;
                                    break;
                                case 30:
                                    e.next = 35;
                                    break;
                                case 32:
                                    e.prev = 32, e.t0 = e.catch(5), u.e(e.t0);
                                case 35:
                                    return e.prev = 35, u.f(), e.finish(35);
                                case 38:
                                    return e.abrupt("return", i);
                                case 39:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [5, 32, 35, 38]
                        ])
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                ft = function() {
                    var e = m(h().mark((function e(t, n, r, a, o) {
                        var i, u, l, s, c;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Ze(t, r);
                                case 2:
                                    if (e.sent) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: o(ot, r)
                                    });
                                case 4:
                                    return e.next = 6, Xe(t, r);
                                case 6:
                                    if (!(i = e.sent) || n) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: o("cp: %1 is a directory (not copied).", r)
                                    });
                                case 9:
                                    return e.next = 11, Ze(t, a);
                                case 11:
                                    return u = e.sent, e.next = 14, Xe(t, a);
                                case 14:
                                    return l = e.sent, s = u && (l || i) ? Le().normalize(Le().join(a, Le().basename(r))) : a, e.next = 18, lt(t, s, o);
                                case 18:
                                    if (!(c = e.sent)) {
                                        e.next = 21;
                                        break
                                    }
                                    return e.abrupt("return", c);
                                case 21:
                                    if (r !== s) {
                                        e.next = 23;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: o("cp: %1 and %2 are identical (not copied).", r, s)
                                    });
                                case 23:
                                    return e.abrupt("return", {
                                        targetPath: s
                                    });
                                case 24:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a, o) {
                        return e.apply(this, arguments)
                    }
                }(),
                dt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f, d, p, v, m;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = t.errorPrintf, l = de(n), s = l.flags, c = l.rest, f = s.includes("r") || s.includes("R"), d = He(c[0], r, o), p = He(c[1], r, o), d && p) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: cp [-rR] <source> <target>"));
                                case 7:
                                    return e.next = 9, ft(a, f, d, p, u);
                                case 9:
                                    if (!("error" in (v = e.sent))) {
                                        e.next = 12;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        output: v.error
                                    });
                                case 12:
                                    return e.next = 14, ct(a, d, v.targetPath, u);
                                case 14:
                                    return m = e.sent, e.abrupt("return", {
                                        output: m
                                    });
                                case 16:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                pt = dt,
                ht = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                vt = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                mt = function(e) {
                    return e.toString().padStart(2, "0")
                },
                bt = function(e) {
                    var t = ht[e.getDay()],
                        n = vt[e.getMonth()],
                        r = mt(e.getDate()),
                        a = mt(e.getHours()),
                        o = mt(e.getMinutes()),
                        i = mt(e.getSeconds()),
                        u = e.getFullYear();
                    return "".concat(t, " ").concat(n, " ").concat(r, " ").concat(a, ":").concat(o, ":").concat(i, " ").concat(u)
                },
                yt = function() {
                    var e = m(h().mark((function e() {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", {
                                        output: bt(new Date) + "\n"
                                    });
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }(),
                gt = yt,
                wt = function() {
                    var e = m(h().mark((function e(t) {
                        var n;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = t.args, e.abrupt("return", {
                                        output: n.join(" ") + "\n"
                                    });
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                xt = wt,
                kt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = He(n[0], r, o)) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: find <path>"));
                                case 4:
                                    return e.next = 6, Ze(a, u);
                                case 6:
                                    if (e.sent) {
                                        e.next = 8;
                                        break
                                    }
                                    return e.abrupt("return", i("find: %1: No such file or directory", u));
                                case 8:
                                    return e.next = 10, at(a, u, rt);
                                case 10:
                                    return l = e.sent, e.abrupt("return", {
                                        output: l.map((function(e) {
                                            return "".concat(n[0], "/").concat(Ie(u, e.path), "\n")
                                        })).join("")
                                    });
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                St = kt,
                _t = function() {
                    var e = m(h().mark((function e(t) {
                        var n;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = t.terminalConfig, e.abrupt("return", {
                                        output: n.user + "\n"
                                    });
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Et = _t,
                Ct = function(e) {
                    return e.map((function(e) {
                        return "".concat(e.formattedName, "\n")
                    })).join("")
                },
                jt = function(e, t) {
                    for (var n = Math.max.apply(Math, d(e.map((function(e) {
                            return e.formattedName.length
                        })))), r = Math.max(n + 2, 16), a = Math.floor(t / r), o = Math.ceil(e.length / a), i = function(t, n) {
                            return e[function(e, t) {
                                return e + t * o
                            }(t, n)]
                        }, u = "", l = 0; l < o; l++) {
                        for (var s = 0; s < a; s++) {
                            var c = i(l, s),
                                f = !!i(l, s + 1);
                            if (c) {
                                var p = c.formattedName;
                                u += f ? p.padEnd(r) : p
                            }
                        }
                        u += "\n"
                    }
                    return u
                },
                Pt = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, t.promises.readdir(n);
                                case 2:
                                    return r = e.sent, e.abrupt("return", 64 + 32 * r.length);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                Tt = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, t.promises.readFile(n);
                                case 2:
                                    return r = e.sent, e.abrupt("return", r.length);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                Mt = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", Promise.all(r.map(function() {
                                        var e = m(h().mark((function e(r) {
                                            var a, o, i, u, l, s, c, f, d, p, v, m, b, y, g, w;
                                            return h().wrap((function(e) {
                                                for (;;) switch (e.prev = e.next) {
                                                    case 0:
                                                        return e.next = 2, n.promises.stat(r.path);
                                                    case 2:
                                                        if (a = e.sent, !(o = a.isDirectory())) {
                                                            e.next = 10;
                                                            break
                                                        }
                                                        return e.next = 7, Pt(n, r.path);
                                                    case 7:
                                                        e.t0 = e.sent, e.next = 13;
                                                        break;
                                                    case 10:
                                                        return e.next = 12, Tt(n, r.path);
                                                    case 12:
                                                        e.t0 = e.sent;
                                                    case 13:
                                                        return i = e.t0, u = o ? "d" : "-", l = o ? "rwxr-xr-x" : "rwxr--r--", s = o ? (i / 32).toString() : "1", c = t.user, f = t.group, d = i.toString(), p = new Date(a.mtimeMs), v = p.toLocaleString("default", {
                                                            month: "short"
                                                        }), m = p.toLocaleString("default", {
                                                            day: "numeric"
                                                        }).padStart(2), b = p.toLocaleString("default", {
                                                            year: "numeric"
                                                        }), y = p.toLocaleString("default", {
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        }), g = Math.abs(p.getTime() - Date.now()) > 15768e6, w = g ? b.padEnd(y.length) : y, e.abrupt("return", {
                                                            name: r.formattedName,
                                                            sizeNumber: i,
                                                            type: u,
                                                            permissions: l,
                                                            links: s,
                                                            owner: c,
                                                            group: f,
                                                            size: d,
                                                            month: v,
                                                            day: m,
                                                            yearOrTime: w
                                                        });
                                                    case 28:
                                                    case "end":
                                                        return e.stop()
                                                }
                                            }), e)
                                        })));
                                        return function(t) {
                                            return e.apply(this, arguments)
                                        }
                                    }())));
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                Dt = function(e) {
                    return e.reduce((function(e, t) {
                        return e + Math.ceil(t.sizeNumber / 512)
                    }), 0)
                },
                Nt = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a, o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Mt(t, n, r);
                                case 2:
                                    return a = e.sent, o = Math.max.apply(Math, d(a.map((function(e) {
                                        return e.size.length
                                    })))), i = Math.max.apply(Math, d(a.map((function(e) {
                                        return e.links.length
                                    })))), e.abrupt("return", "total ".concat(Dt(a), "\n") + a.map((function(e) {
                                        var t = e.type,
                                            n = e.permissions,
                                            r = e.links,
                                            a = e.owner,
                                            u = e.group,
                                            l = e.size,
                                            s = e.month,
                                            c = e.day,
                                            f = e.yearOrTime,
                                            d = e.name;
                                        return "".concat(t).concat(n, "  ").concat(r.padStart(i), " ").concat(a, "  ").concat(u, "  ").concat(l.padStart(o), " ").concat(s, " ").concat(c, " ").concat(f, " ").concat(d, "\n")
                                    })).join(""));
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                Rt = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.t0 = [], e.t1 = d, e.next = 5, t.promises.readdir(n);
                                case 5:
                                    return e.t2 = e.sent.filter((function(e) {
                                        return r || !e.startsWith(".")
                                    })), e.t3 = (0, e.t1)(e.t2), e.t4 = d(r ? ["."].concat(d("/" !== n ? [".."] : [])) : []), (a = e.t0.concat.call(e.t0, e.t3, e.t4)).sort((function(e, t) {
                                        return e.localeCompare(t)
                                    })), e.abrupt("return", a);
                                case 13:
                                    e.prev = 13, e.t5 = e.catch(0), e.t6 = e.t5.code, e.next = "ENOTDIR" === e.t6 ? 18 : 19;
                                    break;
                                case 18:
                                    return e.abrupt("return", [Le().basename(n)]);
                                case 19:
                                    throw e.t5;
                                case 20:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 13]
                        ])
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                Ot = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (o = Le().normalize(Le().join(r, n)), e.t0 = a, !e.t0) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.next = 5, Xe(t, o);
                                case 5:
                                    e.t0 = e.sent;
                                case 6:
                                    if (!e.t0) {
                                        e.next = 10;
                                        break
                                    }
                                    e.t1 = "".concat(n, "/"), e.next = 11;
                                    break;
                                case 10:
                                    e.t1 = n;
                                case 11:
                                    return i = e.t1, e.abrupt("return", {
                                        name: n,
                                        path: o,
                                        formattedName: i
                                    });
                                case 13:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                Lt = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.abrupt("return", Promise.all(n.map((function(e) {
                                        return Ot(t, e, r, a)
                                    }))));
                                case 1:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                Ft = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Rt(t, n, r);
                                case 2:
                                    return o = e.sent, e.next = 5, Lt(t, o, n, a);
                                case 5:
                                    return e.abrupt("return", e.sent);
                                case 6:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                At = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f, d, p, v, m, b, y;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = t.args, a = t.terminalConfig, o = t.fs, i = t.workDir, u = t.errorOutput, l = t.getTerminalColumns, s = de(r), c = s.flags, f = s.rest, d = c.includes("1"), p = c.includes("a"), v = c.includes("l"), m = c.includes("F"), b = null !== (n = He(f[0], a, i)) && void 0 !== n ? n : i, e.prev = 7, e.next = 10, Ft(o, b, p, m);
                                case 10:
                                    if (y = e.sent, !v) {
                                        e.next = 17;
                                        break
                                    }
                                    return e.next = 14, Nt(a, o, y);
                                case 14:
                                    e.t0 = e.sent, e.next = 18;
                                    break;
                                case 17:
                                    e.t0 = d ? Ct(y) : jt(y, l());
                                case 18:
                                    return e.t1 = e.t0, e.abrupt("return", {
                                        output: e.t1
                                    });
                                case 22:
                                    e.prev = 22, e.t2 = e.catch(7), e.t3 = e.t2.code, e.next = "ENOENT" === e.t3 ? 27 : 28;
                                    break;
                                case 27:
                                    return e.abrupt("return", u("ls: %1: No such file or directory", b));
                                case 28:
                                    throw e.t2;
                                case 29:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [7, 22]
                        ])
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                It = At,
                zt = function() {
                    var e = m(h().mark((function e(t) {
                        var n;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = t.workDir, e.abrupt("return", {
                                        output: n + "\n"
                                    });
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Ut = zt,
                Bt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = He(n[0], r, o)) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: touch <file>"));
                                case 4:
                                    return e.next = 6, Ze(a, u);
                                case 6:
                                    if (e.sent) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.next = 9, a.promises.writeFile(u, "");
                                case 9:
                                    e.next = 11;
                                    break;
                                case 11:
                                    return e.abrupt("return", {
                                        output: ""
                                    });
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Vt = Bt,
                Ht = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, nt(t, n, r("mkdir: %1: No such file or directory", Le().dirname(n)), r("mkdir: %1: Not a directory", Le().dirname(n)));
                                case 2:
                                    if (!(a = e.sent)) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return", a);
                                case 5:
                                    return e.next = 7, Ze(t, n);
                                case 7:
                                    if (!e.sent) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return", r("mkdir: %1: File exists", n));
                                case 9:
                                    return e.next = 11, t.promises.mkdir(n);
                                case 11:
                                    return e.abrupt("return", {
                                        output: ""
                                    });
                                case 12:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                Wt = function() {
                    var e = m(h().mark((function e(t, n, r) {
                        var a, o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    a = n.split("/"), o = 0;
                                case 2:
                                    if (!(o < a.length)) {
                                        e.next = 16;
                                        break
                                    }
                                    return i = Le().join.apply(Le(), ["/"].concat(d(a.slice(0, o + 1)))), e.next = 6, Je(t, i);
                                case 6:
                                    if (!e.sent) {
                                        e.next = 8;
                                        break
                                    }
                                    return e.abrupt("return", r("mkdir: %1: Not a directory", i));
                                case 8:
                                    return e.next = 10, Ze(t, i);
                                case 10:
                                    if (e.sent) {
                                        e.next = 13;
                                        break
                                    }
                                    return e.next = 13, t.promises.mkdir(i);
                                case 13:
                                    o++, e.next = 2;
                                    break;
                                case 16:
                                    return e.abrupt("return", {
                                        output: ""
                                    });
                                case 17:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r) {
                        return e.apply(this, arguments)
                    }
                }(),
                Kt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = de(n), l = u.flags, s = u.rest, c = l.includes("p"), f = He(s[0], r, o)) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: mkdir [-p] <directory_name>"));
                                case 6:
                                    return e.abrupt("return", c ? Wt(a, f, i) : Ht(a, f, i));
                                case 7:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                qt = Kt,
                $t = "mv: rename %1 to %2: No such file or directory",
                Gt = "mv: rename %1 to %2: Not a directory",
                Qt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = He(n[0], r, o), l = He(n[1], r, o), u && l) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: mv <source> <target>"));
                                case 5:
                                    return e.next = 7, Ze(a, u);
                                case 7:
                                    if (e.sent) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return", i($t, u, l));
                                case 9:
                                    return e.next = 11, Xe(a, u);
                                case 11:
                                    return s = e.sent, e.next = 14, Xe(a, l);
                                case 14:
                                    if (!e.sent) {
                                        e.next = 18;
                                        break
                                    }
                                    e.t0 = Le().normalize(Le().join(l, Le().basename(u))), e.next = 19;
                                    break;
                                case 18:
                                    e.t0 = l;
                                case 19:
                                    return c = e.t0, e.next = 22, nt(a, c, i($t, u, c), i(Gt, u, c));
                                case 22:
                                    if (!(f = e.sent)) {
                                        e.next = 25;
                                        break
                                    }
                                    return e.abrupt("return", f);
                                case 25:
                                    if (u !== c) {
                                        e.next = 27;
                                        break
                                    }
                                    return e.abrupt("return", i("mv: %1 and %2 are identical", u, c));
                                case 27:
                                    return e.next = 29, Ze(a, c);
                                case 29:
                                    if (!e.sent) {
                                        e.next = 50;
                                        break
                                    }
                                    return e.next = 32, Xe(a, c);
                                case 32:
                                    if (!e.sent) {
                                        e.next = 46;
                                        break
                                    }
                                    if (!s) {
                                        e.next = 43;
                                        break
                                    }
                                    return e.next = 37, et(a, c);
                                case 37:
                                    if (!e.sent) {
                                        e.next = 40;
                                        break
                                    }
                                    e.next = 41;
                                    break;
                                case 40:
                                    return e.abrupt("return", i("mv: rename %1 to %2: Directory not empty", u, c));
                                case 41:
                                    e.next = 44;
                                    break;
                                case 43:
                                    return e.abrupt("return", i("mv: rename %1 to %2: Is a directory", u, c));
                                case 44:
                                    e.next = 50;
                                    break;
                                case 46:
                                    if (!s) {
                                        e.next = 50;
                                        break
                                    }
                                    return e.abrupt("return", i(Gt, u, c));
                                case 50:
                                    return e.next = 52, a.promises.rename(u, c);
                                case 52:
                                    return e.abrupt("return", {
                                        output: ""
                                    });
                                case 53:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Yt = Qt,
                Zt = function() {
                    var e = m(h().mark((function e(t, n) {
                        var r, a, o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, Xe(t, n);
                                case 2:
                                    if (!e.sent) {
                                        e.next = 28;
                                        break
                                    }
                                    return e.next = 5, t.promises.readdir(n);
                                case 5:
                                    r = e.sent, a = Ye(r), e.prev = 7, a.s();
                                case 9:
                                    if ((o = a.n()).done) {
                                        e.next = 15;
                                        break
                                    }
                                    return i = o.value, e.next = 13, Zt(t, Le().normalize(Le().join(n, i)));
                                case 13:
                                    e.next = 9;
                                    break;
                                case 15:
                                    e.next = 20;
                                    break;
                                case 17:
                                    e.prev = 17, e.t0 = e.catch(7), a.e(e.t0);
                                case 20:
                                    return e.prev = 20, a.f(), e.finish(20);
                                case 23:
                                    if ("/" === n) {
                                        e.next = 26;
                                        break
                                    }
                                    return e.next = 26, t.promises.rmdir(n);
                                case 26:
                                    e.next = 30;
                                    break;
                                case 28:
                                    return e.next = 30, t.promises.unlink(n);
                                case 30:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [7, 17, 20, 23]
                        ])
                    })));
                    return function(t, n) {
                        return e.apply(this, arguments)
                    }
                }(),
                Xt = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i, u, l, s, c, f, d;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = t.fs, o = t.workDir, i = t.errorOutput, u = de(n), l = u.flags, s = u.rest, c = l.includes("r") || l.includes("R"), f = s[0], d = He(f, r, o)) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return", i("usage: rm [-rR] <file>"));
                                case 7:
                                    return e.next = 9, Ze(a, d);
                                case 9:
                                    if (e.sent) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.abrupt("return", i("rm: %1: No such file or directory", d));
                                case 11:
                                    return e.next = 13, Xe(a, d);
                                case 13:
                                    if (!e.sent) {
                                        e.next = 18;
                                        break
                                    }
                                    if (c) {
                                        e.next = 16;
                                        break
                                    }
                                    return e.abrupt("return", i("rm: %1: is a directory", d));
                                case 16:
                                    if ("." !== f && ".." !== f) {
                                        e.next = 18;
                                        break
                                    }
                                    return e.abrupt("return", i('rm: "." and ".." may not be removed'));
                                case 18:
                                    return e.next = 20, Zt(a, d);
                                case 20:
                                    return e.abrupt("return", {
                                        output: ""
                                    });
                                case 21:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Jt = {
                    cal: Re,
                    cat: $e,
                    cd: Qe,
                    cp: pt,
                    date: gt,
                    echo: xt,
                    find: St,
                    logname: Et,
                    ls: It,
                    pwd: Ut,
                    touch: Vt,
                    mkdir: qt,
                    mv: Yt,
                    rm: Xt,
                    clear: xt,
                },
                en = function(e) {
                    return "".concat(e.shell, ": no such file or directory: %1")
                },
                tn = function(e) {
                    return "".concat(e.shell, ": is a directory: %1")
                },
                nn = function(e) {
                    return "".concat(e.shell, ": not a directory: %1")
                },
                rn = function(e) {
                    return "".concat(e.shell, ": an error occurred while writing to %1")
                },
                an = function() {
                    var e = m(h().mark((function e(t, n, r, a) {
                        var o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (o = r, e.t0 = a, !e.t0) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.next = 5, Ze(t, n);
                                case 5:
                                    e.t0 = e.sent;
                                case 6:
                                    if (!e.t0) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.next = 9, t.promises.readFile(n, {
                                        encoding: "utf8"
                                    });
                                case 9:
                                    i = e.sent, o = i + o;
                                case 11:
                                    return e.next = 13, t.promises.writeFile(n, o, "utf8");
                                case 13:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t, n, r, a) {
                        return e.apply(this, arguments)
                    }
                }(),
                on = function() {
                    var e = m(h().mark((function e(t, n, r, a, o) {
                        var i, u;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (i = He(o.path, t, r)) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: We(en(t), r, o.path)
                                    });
                                case 3:
                                    return e.next = 5, Xe(n, i);
                                case 5:
                                    if (!e.sent) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: We(tn(t), r, i)
                                    });
                                case 7:
                                    return e.next = 9, nt(n, i, We(en(t), r, i), We(nn(t), r, i));
                                case 9:
                                    if (!(u = e.sent)) {
                                        e.next = 12;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        error: u
                                    });
                                case 12:
                                    return e.prev = 12, e.next = 15, an(n, i, a, o.append);
                                case 15:
                                    e.next = 21;
                                    break;
                                case 17:
                                    return e.prev = 17, e.t0 = e.catch(12), console.log(e.t0), e.abrupt("return", {
                                        error: We(rn(t), r, i)
                                    });
                                case 21:
                                    return e.abrupt("return", {});
                                case 22:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [12, 17]
                        ])
                    })));
                    return function(t, n, r, a, o) {
                        return e.apply(this, arguments)
                    }
                }(),
                un = function(e, t, n, r, a, o, i, u, l) {
                    var s = function() {
                            var o = m(h().mark((function o(i) {
                                var l, s, c;
                                return h().wrap((function(o) {
                                    for (;;) switch (o.prev = o.next) {
                                        case 0:
                                            if (l = i.command, s = i.args, l) {
                                                o.next = 3;
                                                break
                                            }
                                            return o.abrupt("return", {
                                                output: ""
                                            });
                                        case 3:
                                            if (c = t[l]) {
                                                o.next = 6;
                                                break
                                            }
                                            return o.abrupt("return", {
                                                output: "Unsupported command: ".concat(l, "\n")
                                            });
                                        case 6:
                                            return o.prev = 6, o.next = 9, c({
                                                args: s,
                                                terminalConfig: e,
                                                fs: n,
                                                workDir: r,
                                                prevWorkDir: a,
                                                availableCommands: t,
                                                errorOutput: function(e) {
                                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
                                                    return Ke.apply(void 0, [e, r].concat(n))
                                                },
                                                errorPrintf: function(e) {
                                                    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) n[a - 1] = arguments[a];
                                                    return We.apply(void 0, [e, r].concat(n))
                                                },
                                                getTerminalColumns: u
                                            });
                                        case 9:
                                            return o.abrupt("return", o.sent);
                                        case 12:
                                            return o.prev = 12, o.t0 = o.catch(6), console.error(o.t0), o.abrupt("return", {
                                                output: "".concat(e.shell, ": an error occurred running the command\n")
                                            });
                                        case 16:
                                        case "end":
                                            return o.stop()
                                    }
                                }), o, null, [
                                    [6, 12]
                                ])
                            })));
                            return function(e) {
                                return o.apply(this, arguments)
                            }
                        }(),
                        c = function(e, t) {
                            i("".concat(t).concat(e, "\n"))
                        },
                        f = function() {
                            var t = m(h().mark((function t(a, o) {
                                var u;
                                return h().wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                        case 0:
                                            if (!o) {
                                                t.next = 7;
                                                break
                                            }
                                            return t.next = 3, on(e, n, r, a, o);
                                        case 3:
                                            (u = t.sent).error && i(u.error), t.next = 8;
                                            break;
                                        case 7:
                                            i(a);
                                        case 8:
                                        case "end":
                                            return t.stop()
                                    }
                                }), t)
                            })));
                            return function(e, n) {
                                return t.apply(this, arguments)
                            }
                        }(),
                        d = function(e) {
                            e.workDir && o(e.workDir)
                        },
                        p = function(e, t, a) {
                            null === l || void 0 === l || l({
                                command: e,
                                parsedCommand: t,
                                exitCode: 0,
                                workDirBeforeCommand: r,
                                workDirAfterCommand: a.workDir || r,
                                fs: n
                            })
                        },
                        v = function() {
                            var e = m(h().mark((function e(t, n, r) {
                                var a, o;
                                return h().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return a = fe(n), e.next = 3, s(a);
                                        case 3:
                                            return o = e.sent, c(t, r), e.next = 7, f(o.output, a.outputFile);
                                        case 7:
                                            d(o), p(t, a, o);
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e)
                            })));
                            return function(t, n, r) {
                                return e.apply(this, arguments)
                            }
                        }();
                    return {
                        onAbortInput: c,
                        onRunCommand: v
                    }
                };

            function ln(e, t) {
                if (null == e) return {};
                var n, r, a = function(e, t) {
                    if (null == e) return {};
                    var n, r, a = {},
                        o = Object.keys(e);
                    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                    return a
                }(e, t);
                if (Object.getOwnPropertySymbols) {
                    var o = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (a[n] = e[n])
                }
                return a
            }
            var sn = ["className", "children", "contentRef"],
                cn = (0, t.forwardRef)((function(e, t) {
                    var n = e.className,
                        r = e.children,
                        a = e.contentRef,
                        o = ln(e, sn);
                    return (0, l.jsx)("div", u(u({
                        className: "relative whitespace-pre-wrap break-all bg-gray-800 font-mono text-gray-100 outline-none selection:bg-pink-500 selection:text-pink-100 ".concat(n || ""),
                        ref: t
                    }, o), {}, {
                        children: (0, l.jsx)("div", {
                            className: "relative",
                            ref: a,
                            children: r
                        })
                    }))
                }));
            cn.displayName = "TerminalOutput";
            var fn = cn,
                dn = function(e) {
                    var t = e.isFull,
                        n = e.children,
                        r = "\n" === n;
                    return (0, l.jsxs)(l.Fragment, {
                        children: [(0, l.jsx)("span", {
                            className: t ? "bg-gray-100 text-gray-800 selection:bg-gray-100 selection:text-pink-500" : void 0,
                            children: !r && n || "".concat("\u200b").concat("\xa0")
                        }), r && n]
                    })
                },
                pn = (0, t.forwardRef)((function(e, t) {
                    var n = e.input,
                        r = e.cursorPosition,
                        a = e.isCursorFull;
                    return (0, l.jsxs)("span", {
                        ref: t,
                        children: [n.slice(0, r), (0, l.jsx)(dn, {
                            isFull: a,
                            children: n.slice(r, r + 1)
                        }), n.slice(r + 1)]
                    })
                }));
            pn.displayName = "InputWithCursor";
            var hn, vn, mn = pn,
                bn = function() {
                    var e = (0, t.useRef)(!0);
                    return (0, t.useEffect)((function() {
                            return function() {
                                e.current = !0
                            }
                        }), []),
                        function() {
                            var t = e.current;
                            return e.current = !1, t
                        }
                },
                yn = null !== (hn = window.visualViewport) && void 0 !== hn ? hn : window,
                gn = function(e) {
                    return yn.addEventListener("resize", e, {
                            passive: !0
                        }),
                        function() {
                            return yn.removeEventListener("resize", e)
                        }
                };
            ! function(e) {
                e.SoftKeyboardOpen = "SoftKeyboardOpen", e.DesktopWindowResize = "DesktopWindowResize", e.InputOrOutputChanged = "InputOrOutputChanged"
            }(vn || (vn = {}));
            var wn = function(e, n, r, a, o) {
                    var i = (0, t.useCallback)((function(t) {
                            if (!n.current) throw new Error("Reference to content is empty");
                            e(n.current, t)
                        }), [e]),
                        u = bn();
                    (0, t.useLayoutEffect)((function() {
                        u() || i(vn.InputOrOutputChanged)
                    }), [r, a, o]), (0, t.useEffect)((function() {
                        if (!z) return gn((function() {
                            return i(vn.DesktopWindowResize)
                        }))
                    }), [i]);
                    return {
                        onFakeInputFocus: function() {
                            var e = gn((function() {
                                e(), i(vn.SoftKeyboardOpen)
                            }))
                        }
                    }
                },
                xn = (0, t.forwardRef)((function(e, t) {
                    return (0, l.jsxs)(l.Fragment, {
                        children: [(0, l.jsx)("textarea", {
                            ref: t,
                            className: oe,
                            onKeyDown: function(e) {
                                return e.stopPropagation()
                            },
                            id: "terminal-fta",
                            "aria-describedby": "terminal-fta-aria"
                        }), (0, l.jsx)("label", {
                            htmlFor: "terminal-fta",
                            className: "sr-only",
                            children: "Input"
                        }), (0, l.jsx)("span", {
                            id: "terminal-fta-aria",
                            className: "sr-only",
                            children: "Input"
                        })]
                    })
                }));
            xn.displayName = "FakeTextArea";
            var kn = xn,
                Sn = function(e) {
                    return e.target.focus()
                },
                _n = function(e, t) {
                    return new Promise((function(n, r) {
                        var a = !1,
                            o = function r() {
                                a = !0, e.removeEventListener("input", r);
                                var o = e.value;
                                e.value = "", Sn(t), n(o)
                            };
                        e.value = "", e.focus(), e.addEventListener("input", o), e.dispatchEvent(function(e) {
                            return new KeyboardEvent("keydown", {
                                charCode: e.charCode,
                                code: e.code,
                                isComposing: e.nativeEvent.isComposing,
                                key: e.key,
                                keyCode: e.keyCode,
                                location: e.location,
                                repeat: e.repeat,
                                altKey: e.altKey,
                                ctrlKey: e.ctrlKey,
                                metaKey: e.metaKey,
                                shiftKey: e.shiftKey,
                                detail: e.detail,
                                view: e.nativeEvent.view,
                                which: e.which,
                                bubbles: e.bubbles,
                                cancelable: e.cancelable,
                                composed: e.nativeEvent.composed
                            })
                        }(t)), setTimeout((function() {
                            a || (e.removeEventListener("input", o), Sn(t), r(new Error("Clipboard text not received")))
                        }), 700)
                    }))
                },
                En = function() {
                    var e = (0, t.useRef)(null),
                        n = function() {
                            var t = m(h().mark((function t(n) {
                                var r;
                                return h().wrap((function(t) {
                                    for (;;) switch (t.prev = t.next) {
                                        case 0:
                                            if (!q(n) || !e.current) {
                                                t.next = 10;
                                                break
                                            }
                                            return t.prev = 1, t.next = 4, _n(e.current, n);
                                        case 4:
                                            return t.abrupt("return", t.sent);
                                        case 7:
                                            t.prev = 7, t.t0 = t.catch(1), console.error(t.t0);
                                        case 10:
                                            if ("function" !== typeof(null === (r = navigator.clipboard) || void 0 === r ? void 0 : r.readText)) {
                                                t.next = 20;
                                                break
                                            }
                                            return t.prev = 11, t.next = 14, navigator.clipboard.readText();
                                        case 14:
                                            return t.abrupt("return", t.sent);
                                        case 17:
                                            t.prev = 17, t.t1 = t.catch(11), console.error(t.t1);
                                        case 20:
                                            return t.abrupt("return", "");
                                        case 21:
                                        case "end":
                                            return t.stop()
                                    }
                                }), t, null, [
                                    [1, 7],
                                    [11, 17]
                                ])
                            })));
                            return function(e) {
                                return t.apply(this, arguments)
                            }
                        }();
                    return {
                        fakeTextArea: (0, l.jsx)(kn, {
                            ref: e
                        }),
                        getClipboardText: n
                    }
                },
                Cn = function(e) {
                    var t = window.scrollX,
                        n = window.scrollY;
                    e.focus({
                        preventScroll: !0
                    }), window.scrollTo(t, n)
                },
                jn = function() {
                    var e = window.getSelection();
                    e && !e.isCollapsed && e.removeAllRanges()
                },
                Pn = function(e, n, r, a) {
                    (0, t.useImperativeHandle)(e, (function() {
                        return {
                            runCommand: function(e) {
                                return a(e)
                            },
                            dispatchEvent: function() {
                                for (var e, t = arguments.length, r = new Array(t), a = 0; a < t; a++) r[a] = arguments[a];
                                return null === (e = n.current) || void 0 === e ? void 0 : e.dispatchEvent.apply(e, r)
                            },
                            focus: function() {
                                for (var e, t = arguments.length, r = new Array(t), a = 0; a < t; a++) r[a] = arguments[a];
                                return null === (e = n.current) || void 0 === e ? void 0 : e.focus.apply(e, r)
                            },
                            scrollToBottom: function(e) {
                                var t;
                                null === (t = n.current) || void 0 === t || t.scrollTo({
                                    left: 0,
                                    top: n.current.scrollHeight,
                                    behavior: e ? "smooth" : "auto"
                                })
                            },
                            getCommandList: function() {
                                return r
                            }
                        }
                    }), [a])
                };
            "undefined" === typeof window && console.log("");
            var Tn = (0, t.forwardRef)((function(e, n) {
                var r = e.config,
                    a = e.additionalCommands,
                    o = e.fs,
                    i = e.initialWorkDir,
                    s = e.className,
                    c = e.children,
                    f = e.onShouldScrollToBottom,
                    d = e.onCommandExecuted,
                    p = e.onWorkDirChanged,
                    h = (0, t.useRef)(null),
                    v = (0, t.useRef)(null),
                    m = (0, t.useRef)(null),
                    b = le(),
                    y = b.output,
                    g = b.writeToStdout,
                    w = se(r, i, p),
                    x = w.workDir,
                    k = w.prevWorkDir,
                    S = w.setWorkDir,
                    _ = u(u({}, Jt), a),
                    E = un(r, _, o, x, k, S, g, (function() {
                        return ae(h.current)
                    }), d),
                    C = E.onRunCommand,
                    j = E.onAbortInput,
                    P = En(),
                    T = P.fakeTextArea,
                    M = P.getClipboardText,
                    D = Y(r, x, C, j, M),
                    N = D.prefix,
                    R = D.userInput,
                    O = D.cursorPosition,
                    L = D.isCursorFull,
                    F = D.onKeyDown,
                    A = D.onMobileInput,
                    I = D.onRunCommandProgrammatically;
                Pn(n, h, _, I);
                var z = re(m, A),
                    U = z.hasSoftwareKeyboard,
                    B = z.showFakeInput,
                    V = z.onDivClick,
                    H = z.onDivMouseDown,
                    W = z.onFakeInputKeyDown,
                    K = z.onFakeInputChange,
                    q = wn(f, v, y, R, O).onFakeInputFocus;
                return (0, t.useEffect)((function() {
                    h.current && Cn(h.current)
                }), []), (0, t.useEffect)((function() {
                    !U && h.current && Cn(h.current)
                }), [U]), (0, t.useEffect)((function() {
                    jn()
                }), [y, N, R, O]), (0, l.jsxs)(fn, {
                    ref: h,
                    className: s,
                    contentRef: v,
                    tabIndex: 0,
                    onClick: V,
                    onMouseDown: H,
                    onKeyDown: F,
                    children: [c, y, N, (0, l.jsx)(mn, {
                        input: R,
                        cursorPosition: O,
                        isCursorFull: L
                    }), B && (0, l.jsx)(ue, {
                        ref: m,
                        onKeyDown: W,
                        onChange: K,
                        onFocus: q
                    }), T]
                })
            }));
            Tn.displayName = "Terminal";
            var Mn, Dn = Tn,
                Nn = n(6311),
                Rn = n.n(Nn),
                On = "terminal",
                Ln = "/home",
                Fn = "".concat(Ln, "/").concat(On),
                An = "".concat(Fn, "/Documents"),
                In = "".concat(An, "/.cryptoKeys"),
                zn = "".concat(Fn, "/Downloads"),
                Un = "".concat(Fn, "/Pictures"),
                Bn = "".concat(Fn, "/Music"),
                Vn = ["/dev", "/etc", "/lib", "/media", "/mnt", "/opt", "/proc", "/root", "/run", "/sys", "/tmp", "/usr", "/var", Ln, Fn, An, In, zn, Un, Bn],
                Hn = {
                    user: On,
                    group: "staff",
                    host: "cyber_linux",
                    shell: "shell",
                    userHomeDir: Fn
                },
                Wn = "web-terminal",
                Kn = function() {
                    var e = m(h().mark((function e(t) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, t.promises.readdir("/");
                                case 2:
                                    return e.t0 = e.sent.length, e.abrupt("return", e.t0 > 0);
                                case 4:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                qn = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    n = Ye(Vn), e.prev = 1, n.s();
                                case 3:
                                    if ((r = n.n()).done) {
                                        e.next = 15;
                                        break
                                    }
                                    return a = r.value, e.prev = 5, e.next = 8, t.promises.mkdir(a);
                                case 8:
                                    e.next = 13;
                                    break;
                                case 10:
                                    e.prev = 10, e.t0 = e.catch(5), console.error(e.t0, a);
                                case 13:
                                    e.next = 3;
                                    break;
                                case 15:
                                    e.next = 20;
                                    break;
                                case 17:
                                    e.prev = 17, e.t1 = e.catch(1), n.e(e.t1);
                                case 20:
                                    return e.prev = 20, n.f(), e.finish(20);
                                case 23:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [1, 17, 20, 23],
                            [5, 10]
                        ])
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                $n = function() {
                    var e = m(h().mark((function e(t) {
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.next = 2, t.promises.writeFile("".concat(An, "/empty-file.txt"), "");
                                case 2:
                                    return e.next = 4, t.promises.writeFile("".concat(An, "/plan-for-world-domination.txt"), "1. Gather a team of highly trained hamsters.\n2. Train the hamsters in advanced tactics and strategy.\n3. Outfit the hamsters with tiny suits of armor and laser guns.\n4. Use the hamsters to infiltrate the governments of major world powers.\n");
                                case 4:
                                    return e.next = 6, t.promises.writeFile("".concat(zn, "/.biggest-secret.txt"), "My pasta recipe\n===============\n\n1. Boil water.\n2. Add pasta.\n3. Add sauce.\n4. Add cheese.\n5. Add salt and pepper.\n6. Stir.\n7. Serve.\n\nYummy!\n");
                                case 6:
                                    return e.next = 8, t.promises.writeFile("".concat(In, "/wallet.txt"), "-----BEGIN PGP PUBLIC KEY BLOCK-----\nComment: ABAF 11C6 5A29 70B1 30AB  E3C4 79BE 3E43 0041 1886\n\nxsBNBE55CJIBCACkn+aOLmsaq1ejUcXCAOXkO3w7eiLqjR/ziTL2KZ30p7bxP8cT\nUXvfM7fwE7EnqCCkji25x2xsoKXB8AlUswIEYUFCOupj2BOsVmJ/rKZW7fCvKTOK\n+BguKjebDxNbgmif39bfSnHDWrW832f5HrYmZn7a/VySDQFdul8Gl/R6gs6PHJbg\njjt+K7Px6cQVMVNvY/VBWdvA1zckO/4h6gf3kWWZN+Wlq8wv/pxft8QzNFgweH9o\n5bj4tnQ+wMCLCLiDsgEuVawoOAkg3dRMugIUoiKoBKw7b21q9Vjp4jezRvciC6Ys\n4kGUSFG1ZjIn3MpY3f3xZ3yuYwrxQ8JcA7KTABEBAAHOwE0ETnkIkgEIAN+ybgD0\nIlgKRPJ3eksafd+KORseBWwxUy3GH0yAg/4jZCsfHZ7jpbRKzxNTKW1kE6ClSqeh\nUsuXT5Vc1eh6079erN3y+JNxl6zZPC9v+5GNyc28qSfNejt4wmwa/y86T7oQfgo7\n7o8Gu/aO/xzOjw7jSDDR3u9p/hFVtsqzptxZzvs3hVaiLS+0mar9qYZheaCUqOXO\nKVo38Vg5gkOhMEwKvZs9x3fINU/t8ckxOHq6KiLap5Bq87XP0ZJsCaMBwdLYhOFx\nAiEVtlzwyo3DvMplIahqqNELb71YDhpMq/Hu+42oR3pqASCPLfO/0GUSdAGXJVhv\n7L7ng02ETSBmVOUAEQEAAcLAdgQYAQIACQUCTnkIkgIbDAAhCRB5vj5DAEEYhhYh\nBKuvEcZaKXCxMKvjxHm+PkMAQRiG6hsH/0WLUZUbmqc+rXhLRYpgRbc3z3Uvfstp\neYOH3vuv+PZ3Jk6hgiJXivHprq6uGr1RtyA3D+R7TVM0zjLsSFb+UWfElBdIyN2x\ncZxv0fBR68OTYUxXWH2CQcuWpFSVOmNV1DBMH3Ax3htaFmzHJtOcaHqjx0LAERoY\n2wexIFg7zU5etMT99xkSAoJ4pbbF0pGJrO7oy7lYtTqAHLac5zqgvbMolmMAJ+WV\nDMHHn7rPY3hKPQkE6hvPhFHYksSUwRyQxt2pshL5z6fTYi0yYI5GBqR/viT5MRtp\nnHdlNUeeG+pCpqdnPWLgjkjAcnGRSxgt12BivKVkf4zA0OUHm7cjXfw=\n=HpqG\n-----END PGP PUBLIC KEY BLOCK-----\n");
                                case 8:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                Gn = function() {
                    var e = m(h().mark((function e() {
                        var t, n, r = arguments;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return t = r.length > 0 && void 0 !== r[0] && r[0], n = new(Rn())(Wn, {
                                        wipe: t
                                    }), e.next = 4, Kn(n);
                                case 4:
                                    if (e.sent) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.next = 7, qn(n);
                                case 7:
                                    return e.next = 9, $n(n);
                                case 9:
                                    return e.abrupt("return", n);
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function() {
                        return e.apply(this, arguments)
                    }
                }(),
                Qn = n(5671),
                Yn = n(3144);

            function Zn(e, t) {
                return Zn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                    return e.__proto__ = t, e
                }, Zn(e, t)
            }

            function Xn(e, t) {
                if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), Object.defineProperty(e, "prototype", {
                    writable: !1
                }), t && Zn(e, t)
            }

            function Jn(e) {
                return Jn = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                    return e.__proto__ || Object.getPrototypeOf(e)
                }, Jn(e)
            }

            function er() {
                if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" === typeof Proxy) return !0;
                try {
                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}))), !0
                } catch (e) {
                    return !1
                }
            }

            function tr(e, t) {
                if (t && ("object" === (0, p.Z)(t) || "function" === typeof t)) return t;
                if (void 0 !== t) throw new TypeError("Derived constructors may only return object or undefined");
                return function(e) {
                    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }(e)
            }

            function nr(e) {
                var t = er();
                return function() {
                    var n, r = Jn(e);
                    if (t) {
                        var a = Jn(this).constructor;
                        n = Reflect.construct(r, arguments, a)
                    } else n = r.apply(this, arguments);
                    return tr(this, n)
                }
            }

            function rr(e, t, n) {
                return rr = er() ? Reflect.construct.bind() : function(e, t, n) {
                    var r = [null];
                    r.push.apply(r, t);
                    var a = new(Function.bind.apply(e, r));
                    return n && Zn(a, n.prototype), a
                }, rr.apply(null, arguments)
            }

            function ar(e) {
                var t = "function" === typeof Map ? new Map : void 0;
                return ar = function(e) {
                    if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;
                    var n;
                    if ("function" !== typeof e) throw new TypeError("Super expression must either be null or a function");
                    if ("undefined" !== typeof t) {
                        if (t.has(e)) return t.get(e);
                        t.set(e, r)
                    }

                    function r() {
                        return rr(e, arguments, Jn(this).constructor)
                    }
                    return r.prototype = Object.create(e.prototype, {
                        constructor: {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), Zn(r, e)
                }, ar(e)
            }

            function or() {
                return or = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, or.apply(this, arguments)
            }! function(e) {
                e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
            }(Mn || (Mn = {}));
            var ir, ur = "popstate";

            function lr(e, t) {
                if (!1 === e || null === e || "undefined" === typeof e) throw new Error(t)
            }

            function sr(e, t) {
                if (!e) {
                    "undefined" !== typeof console && console.warn(t);
                    try {
                        throw new Error(t)
                    } catch (n) {}
                }
            }

            function cr(e, t) {
                return {
                    usr: e.state,
                    key: e.key,
                    idx: t
                }
            }

            function fr(e, t, n, r) {
                return void 0 === n && (n = null), or({
                    pathname: "string" === typeof e ? e : e.pathname,
                    search: "",
                    hash: ""
                }, "string" === typeof t ? pr(t) : t, {
                    state: n,
                    key: t && t.key || r || Math.random().toString(36).substr(2, 8)
                })
            }

            function dr(e) {
                var t = e.pathname,
                    n = void 0 === t ? "/" : t,
                    r = e.search,
                    a = void 0 === r ? "" : r,
                    o = e.hash,
                    i = void 0 === o ? "" : o;
                return a && "?" !== a && (n += "?" === a.charAt(0) ? a : "?" + a), i && "#" !== i && (n += "#" === i.charAt(0) ? i : "#" + i), n
            }

            function pr(e) {
                var t = {};
                if (e) {
                    var n = e.indexOf("#");
                    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
                    var r = e.indexOf("?");
                    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e)
                }
                return t
            }

            function hr(e, t, n, r) {
                void 0 === r && (r = {});
                var a = r,
                    o = a.window,
                    i = void 0 === o ? document.defaultView : o,
                    u = a.v5Compat,
                    l = void 0 !== u && u,
                    s = i.history,
                    c = Mn.Pop,
                    f = null,
                    d = p();

                function p() {
                    return (s.state || {
                        idx: null
                    }).idx
                }

                function h() {
                    var e = Mn.Pop,
                        t = p();
                    if (null != t) {
                        var n = t - d;
                        c = e, d = t, f && f({
                            action: c,
                            location: m.location,
                            delta: n
                        })
                    } else sr(!1, "You are trying to block a POP navigation to a location that was not created by @remix-run/router. The block will fail silently in production, but in general you should do all navigation with the router (instead of using window.history.pushState directly) to avoid this situation.")
                }

                function v(e) {
                    var t = "null" !== i.location.origin ? i.location.origin : i.location.href,
                        n = "string" === typeof e ? e : dr(e);
                    return lr(t, "No window.location.(origin|href) available to create URL for href: " + n), new URL(n, t)
                }
                null == d && (d = 0, s.replaceState(or({}, s.state, {
                    idx: d
                }), ""));
                var m = {
                    get action() {
                        return c
                    },
                    get location() {
                        return e(i, s)
                    },
                    listen: function(e) {
                        if (f) throw new Error("A history only accepts one active listener");
                        return i.addEventListener(ur, h), f = e,
                            function() {
                                i.removeEventListener(ur, h), f = null
                            }
                    },
                    createHref: function(e) {
                        return t(i, e)
                    },
                    createURL: v,
                    encodeLocation: function(e) {
                        var t = v(e);
                        return {
                            pathname: t.pathname,
                            search: t.search,
                            hash: t.hash
                        }
                    },
                    push: function(e, t) {
                        c = Mn.Push;
                        var r = fr(m.location, e, t);
                        n && n(r, e);
                        var a = cr(r, d = p() + 1),
                            o = m.createHref(r);
                        try {
                            s.pushState(a, "", o)
                        } catch (u) {
                            i.location.assign(o)
                        }
                        l && f && f({
                            action: c,
                            location: m.location,
                            delta: 1
                        })
                    },
                    replace: function(e, t) {
                        c = Mn.Replace;
                        var r = fr(m.location, e, t);
                        n && n(r, e);
                        var a = cr(r, d = p()),
                            o = m.createHref(r);
                        s.replaceState(a, "", o), l && f && f({
                            action: c,
                            location: m.location,
                            delta: 0
                        })
                    },
                    go: function(e) {
                        return s.go(e)
                    }
                };
                return m
            }

            function vr(e, t, n) {
                return void 0 === t && (t = []), void 0 === n && (n = new Set), e.map((function(e, r) {
                    var a = [].concat(d(t), [r]),
                        o = "string" === typeof e.id ? e.id : a.join("-");
                    return lr(!0 !== e.index || !e.children, "Cannot specify children on an index route"), lr(!n.has(o), 'Found a route id collision on id "' + o + "\".  Route id's must be globally unique within Data Router usages"), n.add(o),
                        function(e) {
                            return !0 === e.index
                        }(e) ? or({}, e, {
                            id: o
                        }) : or({}, e, {
                            id: o,
                            children: e.children ? vr(e.children, a, n) : void 0
                        })
                }))
            }

            function mr(e, t, n) {
                void 0 === n && (n = "/");
                var r = Er(("string" === typeof t ? pr(t) : t).pathname || "/", n);
                if (null == r) return null;
                var a = br(e);
                ! function(e) {
                    e.sort((function(e, t) {
                        return e.score !== t.score ? t.score - e.score : function(e, t) {
                            var n = e.length === t.length && e.slice(0, -1).every((function(e, n) {
                                return e === t[n]
                            }));
                            return n ? e[e.length - 1] - t[t.length - 1] : 0
                        }(e.routesMeta.map((function(e) {
                            return e.childrenIndex
                        })), t.routesMeta.map((function(e) {
                            return e.childrenIndex
                        })))
                    }))
                }(a);
                for (var o = null, i = 0; null == o && i < a.length; ++i) o = kr(a[i], _r(r));
                return o
            }

            function br(e, t, n, r) {
                void 0 === t && (t = []), void 0 === n && (n = []), void 0 === r && (r = "");
                var a = function(e, a, o) {
                    var i = {
                        relativePath: void 0 === o ? e.path || "" : o,
                        caseSensitive: !0 === e.caseSensitive,
                        childrenIndex: a,
                        route: e
                    };
                    i.relativePath.startsWith("/") && (lr(i.relativePath.startsWith(r), 'Absolute route path "' + i.relativePath + '" nested under path "' + r + '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'), i.relativePath = i.relativePath.slice(r.length));
                    var u = Mr([r, i.relativePath]),
                        l = n.concat(i);
                    e.children && e.children.length > 0 && (lr(!0 !== e.index, 'Index routes must not have child routes. Please remove all child routes from route path "' + u + '".'), br(e.children, t, l, u)), (null != e.path || e.index) && t.push({
                        path: u,
                        score: xr(u, e.index),
                        routesMeta: l
                    })
                };
                return e.forEach((function(e, t) {
                    var n;
                    if ("" !== e.path && null != (n = e.path) && n.includes("?")) {
                        var r, o = Ye(yr(e.path));
                        try {
                            for (o.s(); !(r = o.n()).done;) {
                                var i = r.value;
                                a(e, t, i)
                            }
                        } catch (u) {
                            o.e(u)
                        } finally {
                            o.f()
                        }
                    } else a(e, t)
                })), t
            }

            function yr(e) {
                var t = e.split("/");
                if (0 === t.length) return [];
                var n = ce(t),
                    r = n[0],
                    a = n.slice(1),
                    o = r.endsWith("?"),
                    i = r.replace(/\?$/, "");
                if (0 === a.length) return o ? [i, ""] : [i];
                var u = yr(a.join("/")),
                    l = [];
                return l.push.apply(l, d(u.map((function(e) {
                    return "" === e ? i : [i, e].join("/")
                })))), o && l.push.apply(l, d(u)), l.map((function(t) {
                    return e.startsWith("/") && "" === t ? "/" : t
                }))
            }! function(e) {
                e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
            }(ir || (ir = {}));
            var gr = /^:\w+$/,
                wr = function(e) {
                    return "*" === e
                };

            function xr(e, t) {
                var n = e.split("/"),
                    r = n.length;
                return n.some(wr) && (r += -2), t && (r += 2), n.filter((function(e) {
                    return !wr(e)
                })).reduce((function(e, t) {
                    return e + (gr.test(t) ? 3 : "" === t ? 1 : 10)
                }), r)
            }

            function kr(e, t) {
                for (var n = e.routesMeta, r = {}, a = "/", o = [], i = 0; i < n.length; ++i) {
                    var u = n[i],
                        l = i === n.length - 1,
                        s = "/" === a ? t : t.slice(a.length) || "/",
                        c = Sr({
                            path: u.relativePath,
                            caseSensitive: u.caseSensitive,
                            end: l
                        }, s);
                    if (!c) return null;
                    Object.assign(r, c.params);
                    var f = u.route;
                    o.push({
                        params: r,
                        pathname: Mr([a, c.pathname]),
                        pathnameBase: Dr(Mr([a, c.pathnameBase])),
                        route: f
                    }), "/" !== c.pathnameBase && (a = Mr([a, c.pathnameBase]))
                }
                return o
            }

            function Sr(e, t) {
                "string" === typeof e && (e = {
                    path: e,
                    caseSensitive: !1,
                    end: !0
                });
                var n = function(e, t, n) {
                        void 0 === t && (t = !1);
                        void 0 === n && (n = !0);
                        Cr("*" === e || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were "' + e.replace(/\*$/, "/*") + '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' + e.replace(/\*$/, "/*") + '".');
                        var r = [],
                            a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (function(e, t) {
                                return r.push(t), "/([^\\/]+)"
                            }));
                        e.endsWith("*") ? (r.push("*"), a += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : "" !== e && "/" !== e && (a += "(?:(?=\\/|$))");
                        var o = new RegExp(a, t ? void 0 : "i");
                        return [o, r]
                    }(e.path, e.caseSensitive, e.end),
                    r = g(n, 2),
                    a = r[0],
                    o = r[1],
                    i = t.match(a);
                if (!i) return null;
                var u = i[0],
                    l = u.replace(/(.)\/+$/, "$1"),
                    s = i.slice(1);
                return {
                    params: o.reduce((function(e, t, n) {
                        if ("*" === t) {
                            var r = s[n] || "";
                            l = u.slice(0, u.length - r.length).replace(/(.)\/+$/, "$1")
                        }
                        return e[t] = function(e, t) {
                            try {
                                return decodeURIComponent(e)
                            } catch (n) {
                                return Cr(!1, 'The value for the URL param "' + t + '" will not be decoded because the string "' + e + '" is a malformed URL segment. This is probably due to a bad percent encoding (' + n + ")."), e
                            }
                        }(s[n] || "", t), e
                    }), {}),
                    pathname: u,
                    pathnameBase: l,
                    pattern: e
                }
            }

            function _r(e) {
                try {
                    return decodeURI(e)
                } catch (t) {
                    return Cr(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' + t + ")."), e
                }
            }

            function Er(e, t) {
                if ("/" === t) return e;
                if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
                var n = t.endsWith("/") ? t.length - 1 : t.length,
                    r = e.charAt(n);
                return r && "/" !== r ? null : e.slice(n) || "/"
            }

            function Cr(e, t) {
                if (!e) {
                    "undefined" !== typeof console && console.warn(t);
                    try {
                        throw new Error(t)
                    } catch (n) {}
                }
            }

            function jr(e, t, n, r) {
                return "Cannot include a '" + e + "' character in a manually specified `to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the `to." + n + '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
            }

            function Pr(e) {
                return e.filter((function(e, t) {
                    return 0 === t || e.route.path && e.route.path.length > 0
                }))
            }

            function Tr(e, t, n, r) {
                var a;
                void 0 === r && (r = !1), "string" === typeof e ? a = pr(e) : (lr(!(a = or({}, e)).pathname || !a.pathname.includes("?"), jr("?", "pathname", "search", a)), lr(!a.pathname || !a.pathname.includes("#"), jr("#", "pathname", "hash", a)), lr(!a.search || !a.search.includes("#"), jr("#", "search", "hash", a)));
                var o, i = "" === e || "" === a.pathname,
                    u = i ? "/" : a.pathname;
                if (r || null == u) o = n;
                else {
                    var l = t.length - 1;
                    if (u.startsWith("..")) {
                        for (var s = u.split("/");
                            ".." === s[0];) s.shift(), l -= 1;
                        a.pathname = s.join("/")
                    }
                    o = l >= 0 ? t[l] : "/"
                }
                var c = function(e, t) {
                        void 0 === t && (t = "/");
                        var n = "string" === typeof e ? pr(e) : e,
                            r = n.pathname,
                            a = n.search,
                            o = void 0 === a ? "" : a,
                            i = n.hash,
                            u = void 0 === i ? "" : i,
                            l = r ? r.startsWith("/") ? r : function(e, t) {
                                var n = t.replace(/\/+$/, "").split("/");
                                return e.split("/").forEach((function(e) {
                                    ".." === e ? n.length > 1 && n.pop() : "." !== e && n.push(e)
                                })), n.length > 1 ? n.join("/") : "/"
                            }(r, t) : t;
                        return {
                            pathname: l,
                            search: Nr(o),
                            hash: Rr(u)
                        }
                    }(a, o),
                    f = u && "/" !== u && u.endsWith("/"),
                    d = (i || "." === u) && n.endsWith("/");
                return c.pathname.endsWith("/") || !f && !d || (c.pathname += "/"), c
            }
            var Mr = function(e) {
                    return e.join("/").replace(/\/\/+/g, "/")
                },
                Dr = function(e) {
                    return e.replace(/\/+$/, "").replace(/^\/*/, "/")
                },
                Nr = function(e) {
                    return e && "?" !== e ? e.startsWith("?") ? e : "?" + e : ""
                },
                Rr = function(e) {
                    return e && "#" !== e ? e.startsWith("#") ? e : "#" + e : ""
                },
                Or = function(e) {
                    Xn(n, e);
                    var t = nr(n);

                    function n() {
                        return (0, Qn.Z)(this, n), t.apply(this, arguments)
                    }
                    return (0, Yn.Z)(n)
                }(ar(Error)),
                Lr = function() {
                    function e(t, n) {
                        var r, a = this;
                        (0, Qn.Z)(this, e), this.pendingKeysSet = new Set, this.subscribers = new Set, this.deferredKeys = [], lr(t && "object" === typeof t && !Array.isArray(t), "defer() only accepts plain objects"), this.abortPromise = new Promise((function(e, t) {
                            return r = t
                        })), this.controller = new AbortController;
                        var i = function() {
                            return r(new Or("Deferred data aborted"))
                        };
                        this.unlistenAbortSignal = function() {
                            return a.controller.signal.removeEventListener("abort", i)
                        }, this.controller.signal.addEventListener("abort", i), this.data = Object.entries(t).reduce((function(e, t) {
                            var n = g(t, 2),
                                r = n[0],
                                i = n[1];
                            return Object.assign(e, o({}, r, a.trackPromise(r, i)))
                        }), {}), this.init = n
                    }
                    return (0, Yn.Z)(e, [{
                        key: "trackPromise",
                        value: function(e, t) {
                            var n = this;
                            if (!(t instanceof Promise)) return t;
                            this.deferredKeys.push(e), this.pendingKeysSet.add(e);
                            var r = Promise.race([t, this.abortPromise]).then((function(t) {
                                return n.onSettle(r, e, null, t)
                            }), (function(t) {
                                return n.onSettle(r, e, t)
                            }));
                            return r.catch((function() {})), Object.defineProperty(r, "_tracked", {
                                get: function() {
                                    return !0
                                }
                            }), r
                        }
                    }, {
                        key: "onSettle",
                        value: function(e, t, n, r) {
                            return this.controller.signal.aborted && n instanceof Or ? (this.unlistenAbortSignal(), Object.defineProperty(e, "_error", {
                                get: function() {
                                    return n
                                }
                            }), Promise.reject(n)) : (this.pendingKeysSet.delete(t), this.done && this.unlistenAbortSignal(), n ? (Object.defineProperty(e, "_error", {
                                get: function() {
                                    return n
                                }
                            }), this.emit(!1, t), Promise.reject(n)) : (Object.defineProperty(e, "_data", {
                                get: function() {
                                    return r
                                }
                            }), this.emit(!1, t), r))
                        }
                    }, {
                        key: "emit",
                        value: function(e, t) {
                            this.subscribers.forEach((function(n) {
                                return n(e, t)
                            }))
                        }
                    }, {
                        key: "subscribe",
                        value: function(e) {
                            var t = this;
                            return this.subscribers.add(e),
                                function() {
                                    return t.subscribers.delete(e)
                                }
                        }
                    }, {
                        key: "cancel",
                        value: function() {
                            var e = this;
                            this.controller.abort(), this.pendingKeysSet.forEach((function(t, n) {
                                return e.pendingKeysSet.delete(n)
                            })), this.emit(!0)
                        }
                    }, {
                        key: "resolveData",
                        value: function() {
                            var e = m(h().mark((function e(t) {
                                var n, r, a = this;
                                return h().wrap((function(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (n = !1, this.done) {
                                                e.next = 7;
                                                break
                                            }
                                            return r = function() {
                                                return a.cancel()
                                            }, t.addEventListener("abort", r), e.next = 6, new Promise((function(e) {
                                                a.subscribe((function(n) {
                                                    t.removeEventListener("abort", r), (n || a.done) && e(n)
                                                }))
                                            }));
                                        case 6:
                                            n = e.sent;
                                        case 7:
                                            return e.abrupt("return", n);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }), e, this)
                            })));
                            return function(t) {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "done",
                        get: function() {
                            return 0 === this.pendingKeysSet.size
                        }
                    }, {
                        key: "unwrappedData",
                        get: function() {
                            return lr(null !== this.data && this.done, "Can only unwrap data on initialized and settled deferreds"), Object.entries(this.data).reduce((function(e, t) {
                                var n = g(t, 2),
                                    r = n[0],
                                    a = n[1];
                                return Object.assign(e, o({}, r, function(e) {
                                    if (! function(e) {
                                            return e instanceof Promise && !0 === e._tracked
                                        }(e)) return e;
                                    if (e._error) throw e._error;
                                    return e._data
                                }(a)))
                            }), {})
                        }
                    }, {
                        key: "pendingKeys",
                        get: function() {
                            return Array.from(this.pendingKeysSet)
                        }
                    }]), e
                }();
            var Fr = (0, Yn.Z)((function e(t, n, r, a) {
                (0, Qn.Z)(this, e), void 0 === a && (a = !1), this.status = t, this.statusText = n || "", this.internal = a, r instanceof Error ? (this.data = r.toString(), this.error = r) : this.data = r
            }));

            function Ar(e) {
                return e instanceof Fr
            }
            var Ir = ["post", "put", "patch", "delete"],
                zr = new Set(Ir),
                Ur = ["get"].concat(Ir),
                Br = new Set(Ur),
                Vr = new Set([301, 302, 303, 307, 308]),
                Hr = new Set([307, 308]),
                Wr = {
                    state: "idle",
                    location: void 0,
                    formMethod: void 0,
                    formAction: void 0,
                    formEncType: void 0,
                    formData: void 0
                },
                Kr = {
                    state: "idle",
                    data: void 0,
                    formMethod: void 0,
                    formAction: void 0,
                    formEncType: void 0,
                    formData: void 0
                },
                qr = {
                    state: "unblocked",
                    proceed: void 0,
                    reset: void 0,
                    location: void 0
                },
                $r = "undefined" !== typeof window && "undefined" !== typeof window.document && "undefined" !== typeof window.document.createElement,
                Gr = !$r;

            function Qr(e) {
                lr(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
                var t = vr(e.routes),
                    n = null,
                    r = new Set,
                    a = null,
                    i = null,
                    u = null,
                    l = null != e.hydrationData,
                    s = mr(t, e.history.location, e.basename),
                    c = null;
                if (null == s) {
                    var f = ca(404, {
                            pathname: e.history.location.pathname
                        }),
                        p = sa(t);
                    s = p.matches, c = o({}, p.route.id, f)
                }
                var v, b, y = !s.some((function(e) {
                        return e.route.loader
                    })) || null != e.hydrationData,
                    w = {
                        historyAction: e.history.action,
                        location: e.history.location,
                        matches: s,
                        initialized: y,
                        navigation: Wr,
                        restoreScrollPosition: null == e.hydrationData && null,
                        preventScrollReset: !1,
                        revalidation: "idle",
                        loaderData: e.hydrationData && e.hydrationData.loaderData || {},
                        actionData: e.hydrationData && e.hydrationData.actionData || null,
                        errors: e.hydrationData && e.hydrationData.errors || c,
                        fetchers: new Map,
                        blockers: new Map
                    },
                    x = Mn.Pop,
                    k = !1,
                    S = !1,
                    _ = !1,
                    E = [],
                    C = [],
                    j = new Map,
                    P = 0,
                    T = -1,
                    M = new Map,
                    D = new Set,
                    N = new Map,
                    R = new Map,
                    O = null,
                    L = new Map,
                    F = !1;

                function A(e) {
                    w = or({}, w, e), r.forEach((function(e) {
                        return e(w)
                    }))
                }

                function I(t, n) {
                    var r, a, o, i = null != w.actionData && null != w.navigation.formMethod && ga(w.navigation.formMethod) && "loading" === w.navigation.state && !0 !== (null == (r = t.state) ? void 0 : r._isRedirect);
                    o = n.actionData ? Object.keys(n.actionData).length > 0 ? n.actionData : null : i ? w.actionData : null;
                    var u, l = n.loaderData ? ua(w.loaderData, n.loaderData, n.matches || [], n.errors) : w.loaderData,
                        s = Ye(L);
                    try {
                        for (s.s(); !(u = s.n()).done;) {
                            ue(g(u.value, 1)[0])
                        }
                    } catch (f) {
                        s.e(f)
                    } finally {
                        s.f()
                    }
                    var c = !0 === k || null != w.navigation.formMethod && ga(w.navigation.formMethod) && !0 !== (null == (a = t.state) ? void 0 : a._isRedirect);
                    A(or({}, n, {
                        actionData: o,
                        loaderData: l,
                        historyAction: x,
                        location: t,
                        initialized: !0,
                        navigation: Wr,
                        revalidation: "idle",
                        restoreScrollPosition: de(t, n.matches || w.matches),
                        preventScrollReset: c,
                        blockers: new Map(w.blockers)
                    })), S || x === Mn.Pop || (x === Mn.Push ? e.history.push(t, t.state) : x === Mn.Replace && e.history.replace(t, t.state)), x = Mn.Pop, k = !1, S = !1, _ = !1, E = [], C = []
                }

                function z(e, t) {
                    return U.apply(this, arguments)
                }

                function U() {
                    return U = m(h().mark((function t(n, r) {
                        var a, o, i, u, l, s, c, f, d, p;
                        return h().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if ("number" !== typeof n) {
                                        t.next = 3;
                                        break
                                    }
                                    return e.history.go(n), t.abrupt("return");
                                case 3:
                                    if (a = Yr(n, r), o = a.path, i = a.submission, u = a.error, l = w.location, s = or({}, s = fr(w.location, o, r && r.state), e.history.encodeLocation(s)), c = r && null != r.replace ? r.replace : void 0, f = Mn.Push, !0 === c ? f = Mn.Replace : !1 === c || null != i && ga(i.formMethod) && i.formAction === w.location.pathname + w.location.search && (f = Mn.Replace), d = r && "preventScrollReset" in r ? !0 === r.preventScrollReset : void 0, !(p = se({
                                            currentLocation: l,
                                            nextLocation: s,
                                            historyAction: f
                                        }))) {
                                        t.next = 15;
                                        break
                                    }
                                    return le(p, {
                                        state: "blocked",
                                        location: s,
                                        proceed: function() {
                                            le(p, {
                                                state: "proceeding",
                                                proceed: void 0,
                                                reset: void 0,
                                                location: s
                                            }), z(n, r)
                                        },
                                        reset: function() {
                                            ue(p), A({
                                                blockers: new Map(w.blockers)
                                            })
                                        }
                                    }), t.abrupt("return");
                                case 15:
                                    return t.next = 17, B(f, s, {
                                        submission: i,
                                        pendingError: u,
                                        preventScrollReset: d,
                                        replace: r && r.replace
                                    });
                                case 17:
                                    return t.abrupt("return", t.sent);
                                case 18:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    }))), U.apply(this, arguments)
                }

                function B(e, t, n) {
                    return V.apply(this, arguments)
                }

                function V() {
                    return V = m(h().mark((function n(r, a, i) {
                        var u, l, s, c, f, d, p, v, m, y, g, _, E, C, j;
                        return h().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    if (b && b.abort(), b = null, x = r, S = !0 === (i && i.startUninterruptedRevalidation), fe(w.location, w.matches), k = !0 === (i && i.preventScrollReset), u = i && i.overrideNavigation, l = mr(t, a, e.basename)) {
                                        n.next = 14;
                                        break
                                    }
                                    return s = ca(404, {
                                        pathname: a.pathname
                                    }), c = sa(t), f = c.matches, d = c.route, ce(), I(a, {
                                        matches: f,
                                        loaderData: {},
                                        errors: o({}, d.id, s)
                                    }), n.abrupt("return");
                                case 14:
                                    if (!pa(w.location, a)) {
                                        n.next = 17;
                                        break
                                    }
                                    return I(a, {
                                        matches: l
                                    }), n.abrupt("return");
                                case 17:
                                    if (b = new AbortController, p = ra(e.history, a, b.signal, i && i.submission), !i || !i.pendingError) {
                                        n.next = 23;
                                        break
                                    }
                                    m = o({}, la(l).route.id, i.pendingError), n.next = 34;
                                    break;
                                case 23:
                                    if (!(i && i.submission && ga(i.submission.formMethod))) {
                                        n.next = 34;
                                        break
                                    }
                                    return n.next = 26, H(p, a, i.submission, l, {
                                        replace: i.replace
                                    });
                                case 26:
                                    if (!(y = n.sent).shortCircuited) {
                                        n.next = 29;
                                        break
                                    }
                                    return n.abrupt("return");
                                case 29:
                                    v = y.pendingActionData, m = y.pendingActionError, g = or({
                                        state: "loading",
                                        location: a
                                    }, i.submission), u = g, p = new Request(p.url, {
                                        signal: p.signal
                                    });
                                case 34:
                                    return n.next = 36, K(p, a, l, u, i && i.submission, i && i.replace, v, m);
                                case 36:
                                    if (_ = n.sent, E = _.shortCircuited, C = _.loaderData, j = _.errors, !E) {
                                        n.next = 42;
                                        break
                                    }
                                    return n.abrupt("return");
                                case 42:
                                    b = null, I(a, or({
                                        matches: l
                                    }, v ? {
                                        actionData: v
                                    } : {}, {
                                        loaderData: C,
                                        errors: j
                                    }));
                                case 44:
                                case "end":
                                    return n.stop()
                            }
                        }), n)
                    }))), V.apply(this, arguments)
                }

                function H(e, t, n, r, a) {
                    return W.apply(this, arguments)
                }

                function W() {
                    return W = m(h().mark((function e(t, n, r, a, i) {
                        var u, l, s, c;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (ee(), A({
                                            navigation: or({
                                                state: "submitting",
                                                location: n
                                            }, r)
                                        }), (l = Ca(a, n)).route.action) {
                                        e.next = 8;
                                        break
                                    }
                                    u = {
                                        type: ir.error,
                                        error: ca(405, {
                                            method: t.method,
                                            pathname: n.pathname,
                                            routeId: l.route.id
                                        })
                                    }, e.next = 13;
                                    break;
                                case 8:
                                    return e.next = 10, ta("action", t, l, a, v.basename);
                                case 10:
                                    if (u = e.sent, !t.signal.aborted) {
                                        e.next = 13;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        shortCircuited: !0
                                    });
                                case 13:
                                    if (!ma(u)) {
                                        e.next = 18;
                                        break
                                    }
                                    return s = i && null != i.replace ? i.replace : u.location === w.location.pathname + w.location.search, e.next = 17, Y(w, u, {
                                        submission: r,
                                        replace: s
                                    });
                                case 17:
                                    return e.abrupt("return", {
                                        shortCircuited: !0
                                    });
                                case 18:
                                    if (!va(u)) {
                                        e.next = 22;
                                        break
                                    }
                                    return c = la(a, l.route.id), !0 !== (i && i.replace) && (x = Mn.Push), e.abrupt("return", {
                                        pendingActionData: {},
                                        pendingActionError: o({}, c.route.id, u.error)
                                    });
                                case 22:
                                    if (!ha(u)) {
                                        e.next = 24;
                                        break
                                    }
                                    throw ca(400, {
                                        type: "defer-action"
                                    });
                                case 24:
                                    return e.abrupt("return", {
                                        pendingActionData: o({}, l.route.id, u.data)
                                    });
                                case 25:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    }))), W.apply(this, arguments)
                }

                function K(e, t, n, r, a, o, i, u) {
                    return q.apply(this, arguments)
                }

                function q() {
                    return q = m(h().mark((function t(n, r, a, o, i, u, l, s) {
                        var c, f, d, p, v, m, y, x, k, M, D, O, L, F, z, U, B;
                        return h().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if ((c = o) || (f = or({
                                            state: "loading",
                                            location: r,
                                            formMethod: void 0,
                                            formAction: void 0,
                                            formEncType: void 0,
                                            formData: void 0
                                        }, i), c = f), d = i || (c.formMethod && c.formAction && c.formData && c.formEncType ? {
                                            formMethod: c.formMethod,
                                            formAction: c.formAction,
                                            formData: c.formData,
                                            formEncType: c.formEncType
                                        } : void 0), p = Xr(e.history, w, a, d, r, _, E, C, l, s, N), v = g(p, 2), m = v[0], y = v[1], ce((function(e) {
                                            return !(a && a.some((function(t) {
                                                return t.route.id === e
                                            }))) || m && m.some((function(t) {
                                                return t.route.id === e
                                            }))
                                        })), 0 !== m.length || 0 !== y.length) {
                                        t.next = 8;
                                        break
                                    }
                                    return I(r, or({
                                        matches: a,
                                        loaderData: {},
                                        errors: s || null
                                    }, l ? {
                                        actionData: l
                                    } : {})), t.abrupt("return", {
                                        shortCircuited: !0
                                    });
                                case 8:
                                    return S || (y.forEach((function(e) {
                                        var t = g(e, 1)[0],
                                            n = w.fetchers.get(t),
                                            r = {
                                                state: "loading",
                                                data: n && n.data,
                                                formMethod: void 0,
                                                formAction: void 0,
                                                formEncType: void 0,
                                                formData: void 0,
                                                " _hasFetcherDoneAnything ": !0
                                            };
                                        w.fetchers.set(t, r)
                                    })), x = l || w.actionData, A(or({
                                        navigation: c
                                    }, x ? 0 === Object.keys(x).length ? {
                                        actionData: null
                                    } : {
                                        actionData: x
                                    } : {}, y.length > 0 ? {
                                        fetchers: new Map(w.fetchers)
                                    } : {}))), T = ++P, y.forEach((function(e) {
                                        var t = g(e, 1)[0];
                                        return j.set(t, b)
                                    })), t.next = 13, X(w.matches, a, m, y, n);
                                case 13:
                                    if (k = t.sent, M = k.results, D = k.loaderResults, O = k.fetcherResults, !n.signal.aborted) {
                                        t.next = 19;
                                        break
                                    }
                                    return t.abrupt("return", {
                                        shortCircuited: !0
                                    });
                                case 19:
                                    if (y.forEach((function(e) {
                                            var t = g(e, 1)[0];
                                            return j.delete(t)
                                        })), !(L = fa(M))) {
                                        t.next = 25;
                                        break
                                    }
                                    return t.next = 24, Y(w, L, {
                                        replace: u
                                    });
                                case 24:
                                    return t.abrupt("return", {
                                        shortCircuited: !0
                                    });
                                case 25:
                                    return F = ia(w, a, m, D, s, y, O, R), z = F.loaderData, U = F.errors, R.forEach((function(e, t) {
                                        e.subscribe((function(n) {
                                            (n || e.done) && R.delete(t)
                                        }))
                                    })), oe(), B = ie(T), t.abrupt("return", or({
                                        loaderData: z,
                                        errors: U
                                    }, B || y.length > 0 ? {
                                        fetchers: new Map(w.fetchers)
                                    } : {}));
                                case 30:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    }))), q.apply(this, arguments)
                }

                function $(e) {
                    return w.fetchers.get(e) || Kr
                }

                function G() {
                    return G = m(h().mark((function n(r, a, i, u, l, s) {
                        var c, f, d, p, m, y, k, S, O, L, F, z, U, B, V, H, W, K, q, $, G, Q, Z, J, ne, re;
                        return h().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    if (ee(), N.delete(r), u.route.action) {
                                        n.next = 6;
                                        break
                                    }
                                    return c = ca(405, {
                                        method: s.formMethod,
                                        pathname: i,
                                        routeId: a
                                    }), te(r, a, c), n.abrupt("return");
                                case 6:
                                    return f = w.fetchers.get(r), d = or({
                                        state: "submitting"
                                    }, s, {
                                        data: f && f.data,
                                        " _hasFetcherDoneAnything ": !0
                                    }), w.fetchers.set(r, d), A({
                                        fetchers: new Map(w.fetchers)
                                    }), p = new AbortController, m = ra(e.history, i, p.signal, s), j.set(r, p), n.next = 15, ta("action", m, u, l, v.basename);
                                case 15:
                                    if (y = n.sent, !m.signal.aborted) {
                                        n.next = 19;
                                        break
                                    }
                                    return j.get(r) === p && j.delete(r), n.abrupt("return");
                                case 19:
                                    if (!ma(y)) {
                                        n.next = 26;
                                        break
                                    }
                                    return j.delete(r), D.add(r), k = or({
                                        state: "loading"
                                    }, s, {
                                        data: void 0,
                                        " _hasFetcherDoneAnything ": !0
                                    }), w.fetchers.set(r, k), A({
                                        fetchers: new Map(w.fetchers)
                                    }), n.abrupt("return", Y(w, y, {
                                        isFetchActionRedirect: !0
                                    }));
                                case 26:
                                    if (!va(y)) {
                                        n.next = 29;
                                        break
                                    }
                                    return te(r, a, y.error), n.abrupt("return");
                                case 29:
                                    if (!ha(y)) {
                                        n.next = 31;
                                        break
                                    }
                                    throw ca(400, {
                                        type: "defer-action"
                                    });
                                case 31:
                                    return S = w.navigation.location || w.location, O = ra(e.history, S, p.signal), lr(L = "idle" !== w.navigation.state ? mr(t, w.navigation.location, e.basename) : w.matches, "Didn't find any matches after fetcher action"), F = ++P, M.set(r, F), z = or({
                                        state: "loading",
                                        data: y.data
                                    }, s, {
                                        " _hasFetcherDoneAnything ": !0
                                    }), w.fetchers.set(r, z), U = Xr(e.history, w, L, s, S, _, E, C, o({}, u.route.id, y.data), void 0, N), B = g(U, 2), V = B[0], (H = B[1]).filter((function(e) {
                                        return g(e, 1)[0] !== r
                                    })).forEach((function(e) {
                                        var t = g(e, 1)[0],
                                            n = w.fetchers.get(t),
                                            r = {
                                                state: "loading",
                                                data: n && n.data,
                                                formMethod: void 0,
                                                formAction: void 0,
                                                formEncType: void 0,
                                                formData: void 0,
                                                " _hasFetcherDoneAnything ": !0
                                            };
                                        w.fetchers.set(t, r), j.set(t, p)
                                    })), A({
                                        fetchers: new Map(w.fetchers)
                                    }), n.next = 44, X(w.matches, L, V, H, O);
                                case 44:
                                    if (W = n.sent, K = W.results, q = W.loaderResults, $ = W.fetcherResults, !p.signal.aborted) {
                                        n.next = 50;
                                        break
                                    }
                                    return n.abrupt("return");
                                case 50:
                                    if (M.delete(r), j.delete(r), H.forEach((function(e) {
                                            var t = g(e, 1)[0];
                                            return j.delete(t)
                                        })), !(G = fa(K))) {
                                        n.next = 56;
                                        break
                                    }
                                    return n.abrupt("return", Y(w, G));
                                case 56:
                                    Q = ia(w, w.matches, V, q, void 0, H, $, R), Z = Q.loaderData, J = Q.errors, ne = {
                                        state: "idle",
                                        data: y.data,
                                        formMethod: void 0,
                                        formAction: void 0,
                                        formEncType: void 0,
                                        formData: void 0,
                                        " _hasFetcherDoneAnything ": !0
                                    }, w.fetchers.set(r, ne), re = ie(F), "loading" === w.navigation.state && F > T ? (lr(x, "Expected pending action"), b && b.abort(), I(w.navigation.location, {
                                        matches: L,
                                        loaderData: Z,
                                        errors: J,
                                        fetchers: new Map(w.fetchers)
                                    })) : (A(or({
                                        errors: J,
                                        loaderData: ua(w.loaderData, Z, L, J)
                                    }, re ? {
                                        fetchers: new Map(w.fetchers)
                                    } : {})), _ = !1);
                                case 61:
                                case "end":
                                    return n.stop()
                            }
                        }), n)
                    }))), G.apply(this, arguments)
                }

                function Q() {
                    return Q = m(h().mark((function t(n, r, a, i, u, l) {
                        var s, c, f, d, p, m, b;
                        return h().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return s = w.fetchers.get(n), c = or({
                                        state: "loading",
                                        formMethod: void 0,
                                        formAction: void 0,
                                        formEncType: void 0,
                                        formData: void 0
                                    }, l, {
                                        data: s && s.data,
                                        " _hasFetcherDoneAnything ": !0
                                    }), w.fetchers.set(n, c), A({
                                        fetchers: new Map(w.fetchers)
                                    }), f = new AbortController, d = ra(e.history, a, f.signal), j.set(n, f), t.next = 9, ta("loader", d, i, u, v.basename);
                                case 9:
                                    if (!ha(p = t.sent)) {
                                        t.next = 17;
                                        break
                                    }
                                    return t.next = 13, ka(p, d.signal, !0);
                                case 13:
                                    if (t.t0 = t.sent, t.t0) {
                                        t.next = 16;
                                        break
                                    }
                                    t.t0 = p;
                                case 16:
                                    p = t.t0;
                                case 17:
                                    if (j.get(n) === f && j.delete(n), !d.signal.aborted) {
                                        t.next = 20;
                                        break
                                    }
                                    return t.abrupt("return");
                                case 20:
                                    if (!ma(p)) {
                                        t.next = 24;
                                        break
                                    }
                                    return t.next = 23, Y(w, p);
                                case 23:
                                    return t.abrupt("return");
                                case 24:
                                    if (!va(p)) {
                                        t.next = 29;
                                        break
                                    }
                                    return m = la(w.matches, r), w.fetchers.delete(n), A({
                                        fetchers: new Map(w.fetchers),
                                        errors: o({}, m.route.id, p.error)
                                    }), t.abrupt("return");
                                case 29:
                                    lr(!ha(p), "Unhandled fetcher deferred data"), b = {
                                        state: "idle",
                                        data: p.data,
                                        formMethod: void 0,
                                        formAction: void 0,
                                        formEncType: void 0,
                                        formData: void 0,
                                        " _hasFetcherDoneAnything ": !0
                                    }, w.fetchers.set(n, b), A({
                                        fetchers: new Map(w.fetchers)
                                    });
                                case 33:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    }))), Q.apply(this, arguments)
                }

                function Y(e, t, n) {
                    return Z.apply(this, arguments)
                }

                function Z() {
                    return Z = m(h().mark((function t(n, r, a) {
                        var o, i, u, l, s, c, f, d, p, v, m, y, g;
                        return h().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (u = (i = void 0 === a ? {} : a).submission, l = i.replace, s = i.isFetchActionRedirect, r.revalidate && (_ = !0), lr(c = fr(n.location, r.location, or({
                                            _isRedirect: !0
                                        }, s ? {
                                            _isFetchActionRedirect: !0
                                        } : {})), "Expected a location on the redirect navigation"), !$r || "undefined" === typeof(null == (o = window) ? void 0 : o.location)) {
                                        t.next = 9;
                                        break
                                    }
                                    if (f = e.history.createURL(r.location).origin, window.location.origin === f) {
                                        t.next = 9;
                                        break
                                    }
                                    return l ? window.location.replace(r.location) : window.location.assign(r.location), t.abrupt("return");
                                case 9:
                                    if (b = null, d = !0 === l ? Mn.Replace : Mn.Push, p = n.navigation, v = p.formMethod, m = p.formAction, y = p.formEncType, g = p.formData, !u && v && m && g && y && (u = {
                                            formMethod: v,
                                            formAction: m,
                                            formEncType: y,
                                            formData: g
                                        }), !(Hr.has(r.status) && u && ga(u.formMethod))) {
                                        t.next = 18;
                                        break
                                    }
                                    return t.next = 16, B(d, c, {
                                        submission: or({}, u, {
                                            formAction: r.location
                                        }),
                                        preventScrollReset: k
                                    });
                                case 16:
                                    t.next = 20;
                                    break;
                                case 18:
                                    return t.next = 20, B(d, c, {
                                        overrideNavigation: {
                                            state: "loading",
                                            location: c,
                                            formMethod: u ? u.formMethod : void 0,
                                            formAction: u ? u.formAction : void 0,
                                            formEncType: u ? u.formEncType : void 0,
                                            formData: u ? u.formData : void 0
                                        },
                                        preventScrollReset: k
                                    });
                                case 20:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    }))), Z.apply(this, arguments)
                }

                function X(e, t, n, r, a) {
                    return J.apply(this, arguments)
                }

                function J() {
                    return J = m(h().mark((function t(n, r, a, o, i) {
                        var u, l, s;
                        return h().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.next = 2, Promise.all([].concat(d(a.map((function(e) {
                                        return ta("loader", i, e, r, v.basename)
                                    }))), d(o.map((function(t) {
                                        var n = g(t, 4),
                                            r = n[1],
                                            a = n[2],
                                            o = n[3];
                                        return ta("loader", ra(e.history, r, i.signal), a, o, v.basename)
                                    })))));
                                case 2:
                                    return u = t.sent, l = u.slice(0, a.length), s = u.slice(a.length), t.next = 7, Promise.all([wa(n, a, l, i.signal, !1, w.loaderData), wa(n, o.map((function(e) {
                                        return g(e, 3)[2]
                                    })), s, i.signal, !0)]);
                                case 7:
                                    return t.abrupt("return", {
                                        results: u,
                                        loaderResults: l,
                                        fetcherResults: s
                                    });
                                case 8:
                                case "end":
                                    return t.stop()
                            }
                        }), t)
                    }))), J.apply(this, arguments)
                }

                function ee() {
                    var e;
                    _ = !0, (e = E).push.apply(e, d(ce())), N.forEach((function(e, t) {
                        j.has(t) && (C.push(t), re(t))
                    }))
                }

                function te(e, t, n) {
                    var r = la(w.matches, t);
                    ne(e), A({
                        errors: o({}, r.route.id, n),
                        fetchers: new Map(w.fetchers)
                    })
                }

                function ne(e) {
                    j.has(e) && re(e), N.delete(e), M.delete(e), D.delete(e), w.fetchers.delete(e)
                }

                function re(e) {
                    var t = j.get(e);
                    lr(t, "Expected fetch controller: " + e), t.abort(), j.delete(e)
                }

                function ae(e) {
                    var t, n = Ye(e);
                    try {
                        for (n.s(); !(t = n.n()).done;) {
                            var r = t.value,
                                a = {
                                    state: "idle",
                                    data: $(r).data,
                                    formMethod: void 0,
                                    formAction: void 0,
                                    formEncType: void 0,
                                    formData: void 0,
                                    " _hasFetcherDoneAnything ": !0
                                };
                            w.fetchers.set(r, a)
                        }
                    } catch (o) {
                        n.e(o)
                    } finally {
                        n.f()
                    }
                }

                function oe() {
                    var e, t = [],
                        n = Ye(D);
                    try {
                        for (n.s(); !(e = n.n()).done;) {
                            var r = e.value,
                                a = w.fetchers.get(r);
                            lr(a, "Expected fetcher: " + r), "loading" === a.state && (D.delete(r), t.push(r))
                        }
                    } catch (o) {
                        n.e(o)
                    } finally {
                        n.f()
                    }
                    ae(t)
                }

                function ie(e) {
                    var t, n = [],
                        r = Ye(M);
                    try {
                        for (r.s(); !(t = r.n()).done;) {
                            var a = g(t.value, 2),
                                o = a[0];
                            if (a[1] < e) {
                                var i = w.fetchers.get(o);
                                lr(i, "Expected fetcher: " + o), "loading" === i.state && (re(o), M.delete(o), n.push(o))
                            }
                        }
                    } catch (u) {
                        r.e(u)
                    } finally {
                        r.f()
                    }
                    return ae(n), n.length > 0
                }

                function ue(e) {
                    w.blockers.delete(e), L.delete(e), O === e && (O = null)
                }

                function le(e, t) {
                    var n = w.blockers.get(e) || qr;
                    lr("unblocked" === n.state && "blocked" === t.state || "blocked" === n.state && "blocked" === t.state || "blocked" === n.state && "proceeding" === t.state || "blocked" === n.state && "unblocked" === t.state || "proceeding" === n.state && "unblocked" === t.state, "Invalid blocker state transition: " + n.state + " -> " + t.state), w.blockers.set(e, t), A({
                        blockers: new Map(w.blockers)
                    })
                }

                function se(e) {
                    var t = e.currentLocation,
                        n = e.nextLocation,
                        r = e.historyAction;
                    if (null != O) {
                        var a = L.get(O);
                        lr(a, "Could not find a function for the active blocker");
                        var o = w.blockers.get(O);
                        if (!o || "proceeding" !== o.state) return a({
                            currentLocation: t,
                            nextLocation: n,
                            historyAction: r
                        }) ? O : void 0
                    }
                }

                function ce(e) {
                    var t = [];
                    return R.forEach((function(n, r) {
                        e && !e(r) || (n.cancel(), t.push(r), R.delete(r))
                    })), t
                }

                function fe(e, t) {
                    if (a && i && u) {
                        var n = t.map((function(e) {
                                return Ea(e, w.loaderData)
                            })),
                            r = i(e, n) || e.key;
                        a[r] = u()
                    }
                }

                function de(e, t) {
                    if (a && i && u) {
                        var n = t.map((function(e) {
                                return Ea(e, w.loaderData)
                            })),
                            r = i(e, n) || e.key,
                            o = a[r];
                        if ("number" === typeof o) return o
                    }
                    return null
                }
                return v = {
                    get basename() {
                        return e.basename
                    },
                    get state() {
                        return w
                    },
                    get routes() {
                        return t
                    },
                    initialize: function() {
                        return n = e.history.listen((function(t) {
                            var n = t.action,
                                r = t.location,
                                a = t.delta;
                            if (!F) {
                                var o = se({
                                    currentLocation: w.location,
                                    nextLocation: r,
                                    historyAction: n
                                });
                                return o ? (F = !0, e.history.go(-1 * a), void le(o, {
                                    state: "blocked",
                                    location: r,
                                    proceed: function() {
                                        le(o, {
                                            state: "proceeding",
                                            proceed: void 0,
                                            reset: void 0,
                                            location: r
                                        }), e.history.go(a)
                                    },
                                    reset: function() {
                                        ue(o), A({
                                            blockers: new Map(v.state.blockers)
                                        })
                                    }
                                })) : B(n, r)
                            }
                            F = !1
                        })), w.initialized || B(Mn.Pop, w.location), v
                    },
                    subscribe: function(e) {
                        return r.add(e),
                            function() {
                                return r.delete(e)
                            }
                    },
                    enableScrollRestoration: function(e, t, n) {
                        if (a = e, u = t, i = n || function(e) {
                                return e.key
                            }, !l && w.navigation === Wr) {
                            l = !0;
                            var r = de(w.location, w.matches);
                            null != r && A({
                                restoreScrollPosition: r
                            })
                        }
                        return function() {
                            a = null, u = null, i = null
                        }
                    },
                    navigate: z,
                    fetch: function(n, r, a, o) {
                        if (Gr) throw new Error("router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback.");
                        j.has(n) && re(n);
                        var i = mr(t, a, e.basename);
                        if (i) {
                            var u = Yr(a, o, !0),
                                l = u.path,
                                s = u.submission,
                                c = Ca(i, l);
                            s && ga(s.formMethod) ? function(e, t, n, r, a, o) {
                                G.apply(this, arguments)
                            }(n, r, l, c, i, s) : (N.set(n, [l, c, i]), function(e, t, n, r, a, o) {
                                Q.apply(this, arguments)
                            }(n, r, l, c, i, s))
                        } else te(n, r, ca(404, {
                            pathname: a
                        }))
                    },
                    revalidate: function() {
                        ee(), A({
                            revalidation: "loading"
                        }), "submitting" !== w.navigation.state && ("idle" !== w.navigation.state ? B(x || w.historyAction, w.navigation.location, {
                            overrideNavigation: w.navigation
                        }) : B(w.historyAction, w.location, {
                            startUninterruptedRevalidation: !0
                        }))
                    },
                    createHref: function(t) {
                        return e.history.createHref(t)
                    },
                    encodeLocation: function(t) {
                        return e.history.encodeLocation(t)
                    },
                    getFetcher: $,
                    deleteFetcher: ne,
                    dispose: function() {
                        n && n(), r.clear(), b && b.abort(), w.fetchers.forEach((function(e, t) {
                            return ne(t)
                        })), w.blockers.forEach((function(e, t) {
                            return ue(t)
                        }))
                    },
                    getBlocker: function(e, t) {
                        var n = w.blockers.get(e) || qr;
                        return L.get(e) !== t && (L.set(e, t), null == O ? O = e : e !== O && Cr(!1, "A router only supports one blocker at a time")), n
                    },
                    deleteBlocker: ue,
                    _internalFetchControllers: j,
                    _internalActiveDeferreds: R
                }, v
            }
            Symbol("deferred");

            function Yr(e, t, n) {
                void 0 === n && (n = !1);
                var r, a = "string" === typeof e ? e : dr(e);
                if (!t || ! function(e) {
                        return null != e && "formData" in e
                    }(t)) return {
                    path: a
                };
                if (t.formMethod && !ya(t.formMethod)) return {
                    path: a,
                    error: ca(405, {
                        method: t.formMethod
                    })
                };
                if (t.formData && ga((r = {
                        formMethod: t.formMethod || "get",
                        formAction: da(a),
                        formEncType: t && t.formEncType || "application/x-www-form-urlencoded",
                        formData: t.formData
                    }).formMethod)) return {
                    path: a,
                    submission: r
                };
                var o = pr(a);
                try {
                    var i = aa(t.formData);
                    n && o.search && _a(o.search) && i.append("index", ""), o.search = "?" + i
                } catch (u) {
                    return {
                        path: a,
                        error: ca(400)
                    }
                }
                return {
                    path: dr(o),
                    submission: r
                }
            }

            function Zr(e, t) {
                var n = e;
                if (t) {
                    var r = e.findIndex((function(e) {
                        return e.route.id === t
                    }));
                    r >= 0 && (n = e.slice(0, r))
                }
                return n
            }

            function Xr(e, t, n, r, a, o, i, u, l, s, c) {
                var f = s ? Object.values(s)[0] : l ? Object.values(l)[0] : void 0,
                    d = Zr(n, s ? Object.keys(s)[0] : void 0).filter((function(n, u) {
                        return null != n.route.loader && (function(e, t, n) {
                            var r = !t || n.route.id !== t.route.id,
                                a = void 0 === e[n.route.id];
                            return r || a
                        }(t.loaderData, t.matches[u], n) || i.some((function(e) {
                            return e === n.route.id
                        })) || ea(e, t.location, t.matches[u], r, a, n, o, f))
                    })),
                    p = [];
                return c && c.forEach((function(t, n) {
                    var a = g(t, 3),
                        i = a[0],
                        l = a[1],
                        s = a[2];
                    if (u.includes(n)) p.push([n, i, l, s]);
                    else if (o) {
                        ea(e, i, l, r, i, l, o, f) && p.push([n, i, l, s])
                    }
                })), [d, p]
            }

            function Jr(e, t) {
                var n = e.route.path;
                return e.pathname !== t.pathname || n && n.endsWith("*") && e.params["*"] !== t.params["*"]
            }

            function ea(e, t, n, r, a, o, i, u) {
                var l = e.createURL(t),
                    s = n.params,
                    c = e.createURL(a),
                    f = o.params,
                    d = Jr(n, o) || l.toString() === c.toString() || l.search !== c.search || i;
                if (o.route.shouldRevalidate) {
                    var p = o.route.shouldRevalidate(or({
                        currentUrl: l,
                        currentParams: s,
                        nextUrl: c,
                        nextParams: f
                    }, r, {
                        actionResult: u,
                        defaultShouldRevalidate: d
                    }));
                    if ("boolean" === typeof p) return p
                }
                return d
            }

            function ta(e, t, n, r, a, o, i, u) {
                return na.apply(this, arguments)
            }

            function na() {
                return na = m(h().mark((function e(t, n, r, a, o, i, u, l) {
                    var s, c, f, d, p, v, m, b, y, g, w, x, k, S, _, E;
                    return h().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return void 0 === o && (o = "/"), void 0 === i && (i = !1), void 0 === u && (u = !1), d = new Promise((function(e, t) {
                                    return f = t
                                })), p = function() {
                                    return f()
                                }, n.signal.addEventListener("abort", p), e.prev = 6, lr(v = r.route[t], "Could not find the " + t + ' to run on the "' + r.route.id + '" route'), e.next = 11, Promise.race([v({
                                    request: n,
                                    params: r.params,
                                    context: l
                                }), d]);
                            case 11:
                                lr(void 0 !== (c = e.sent), "You defined " + ("action" === t ? "an action" : "a loader") + ' for route "' + r.route.id + "\" but didn't return anything from your `" + t + "` function. Please return a value or `null`."), e.next = 19;
                                break;
                            case 15:
                                e.prev = 15, e.t0 = e.catch(6), s = ir.error, c = e.t0;
                            case 19:
                                return e.prev = 19, n.signal.removeEventListener("abort", p), e.finish(19);
                            case 22:
                                if (!ba(c)) {
                                    e.next = 48;
                                    break
                                }
                                if (m = c.status, !Vr.has(m)) {
                                    e.next = 33;
                                    break
                                }
                                if (lr(b = c.headers.get("Location"), "Redirects returned/thrown from loaders/actions must have a Location header"), /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(b) ? i || (k = new URL(n.url), (S = b.startsWith("//") ? new URL(k.protocol + b) : new URL(b)).origin === k.origin && (b = S.pathname + S.search + S.hash)) : (y = a.slice(0, a.indexOf(r) + 1), g = Pr(y).map((function(e) {
                                        return e.pathnameBase
                                    })), lr(dr(w = Tr(b, g, new URL(n.url).pathname)), "Unable to resolve redirect location: " + b), o && (x = w.pathname, w.pathname = "/" === x ? o : Mr([o, x])), b = dr(w)), !i) {
                                    e.next = 32;
                                    break
                                }
                                throw c.headers.set("Location", b), c;
                            case 32:
                                return e.abrupt("return", {
                                    type: ir.redirect,
                                    status: m,
                                    location: b,
                                    revalidate: null !== c.headers.get("X-Remix-Revalidate")
                                });
                            case 33:
                                if (!u) {
                                    e.next = 35;
                                    break
                                }
                                throw {
                                    type: s || ir.data, response: c
                                };
                            case 35:
                                if (!(E = c.headers.get("Content-Type")) || !/\bapplication\/json\b/.test(E)) {
                                    e.next = 42;
                                    break
                                }
                                return e.next = 39, c.json();
                            case 39:
                                _ = e.sent, e.next = 45;
                                break;
                            case 42:
                                return e.next = 44, c.text();
                            case 44:
                                _ = e.sent;
                            case 45:
                                if (s !== ir.error) {
                                    e.next = 47;
                                    break
                                }
                                return e.abrupt("return", {
                                    type: s,
                                    error: new Fr(m, c.statusText, _),
                                    headers: c.headers
                                });
                            case 47:
                                return e.abrupt("return", {
                                    type: ir.data,
                                    data: _,
                                    statusCode: c.status,
                                    headers: c.headers
                                });
                            case 48:
                                if (s !== ir.error) {
                                    e.next = 50;
                                    break
                                }
                                return e.abrupt("return", {
                                    type: s,
                                    error: c
                                });
                            case 50:
                                if (!(c instanceof Lr)) {
                                    e.next = 52;
                                    break
                                }
                                return e.abrupt("return", {
                                    type: ir.deferred,
                                    deferredData: c
                                });
                            case 52:
                                return e.abrupt("return", {
                                    type: ir.data,
                                    data: c
                                });
                            case 53:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [6, 15, 19, 22]
                    ])
                }))), na.apply(this, arguments)
            }

            function ra(e, t, n, r) {
                var a = e.createURL(da(t)).toString(),
                    o = {
                        signal: n
                    };
                if (r && ga(r.formMethod)) {
                    var i = r.formMethod,
                        u = r.formEncType,
                        l = r.formData;
                    o.method = i.toUpperCase(), o.body = "application/x-www-form-urlencoded" === u ? aa(l) : l
                }
                return new Request(a, o)
            }

            function aa(e) {
                var t, n = new URLSearchParams,
                    r = Ye(e.entries());
                try {
                    for (r.s(); !(t = r.n()).done;) {
                        var a = g(t.value, 2),
                            o = a[0],
                            i = a[1];
                        lr("string" === typeof i, 'File inputs are not supported with encType "application/x-www-form-urlencoded", please use "multipart/form-data" instead.'), n.append(o, i)
                    }
                } catch (u) {
                    r.e(u)
                } finally {
                    r.f()
                }
                return n
            }

            function oa(e, t, n, r, a) {
                var o, i = {},
                    u = null,
                    l = !1,
                    s = {};
                return n.forEach((function(n, c) {
                    var f = t[c].route.id;
                    if (lr(!ma(n), "Cannot handle redirect results in processLoaderData"), va(n)) {
                        var d = la(e, f),
                            p = n.error;
                        r && (p = Object.values(r)[0], r = void 0), null == (u = u || {})[d.route.id] && (u[d.route.id] = p), i[f] = void 0, l || (l = !0, o = Ar(n.error) ? n.error.status : 500), n.headers && (s[f] = n.headers)
                    } else ha(n) ? (a.set(f, n.deferredData), i[f] = n.deferredData.data) : i[f] = n.data, null == n.statusCode || 200 === n.statusCode || l || (o = n.statusCode), n.headers && (s[f] = n.headers)
                })), r && (u = r, i[Object.keys(r)[0]] = void 0), {
                    loaderData: i,
                    errors: u,
                    statusCode: o || 200,
                    loaderHeaders: s
                }
            }

            function ia(e, t, n, r, a, i, u, l) {
                for (var s = oa(t, n, r, a, l), c = s.loaderData, f = s.errors, d = 0; d < i.length; d++) {
                    var p = g(i[d], 3),
                        h = p[0],
                        v = p[2];
                    lr(void 0 !== u && void 0 !== u[d], "Did not find corresponding fetcher result");
                    var m = u[d];
                    if (va(m)) {
                        var b = la(e.matches, v.route.id);
                        f && f[b.route.id] || (f = or({}, f, o({}, b.route.id, m.error))), e.fetchers.delete(h)
                    } else if (ma(m)) lr(!1, "Unhandled fetcher revalidation redirect");
                    else if (ha(m)) lr(!1, "Unhandled fetcher deferred data");
                    else {
                        var y = {
                            state: "idle",
                            data: m.data,
                            formMethod: void 0,
                            formAction: void 0,
                            formEncType: void 0,
                            formData: void 0,
                            " _hasFetcherDoneAnything ": !0
                        };
                        e.fetchers.set(h, y)
                    }
                }
                return {
                    loaderData: c,
                    errors: f
                }
            }

            function ua(e, t, n, r) {
                var a, o = or({}, t),
                    i = Ye(n);
                try {
                    for (i.s(); !(a = i.n()).done;) {
                        var u = a.value.route.id;
                        if (t.hasOwnProperty(u) ? void 0 !== t[u] && (o[u] = t[u]) : void 0 !== e[u] && (o[u] = e[u]), r && r.hasOwnProperty(u)) break
                    }
                } catch (l) {
                    i.e(l)
                } finally {
                    i.f()
                }
                return o
            }

            function la(e, t) {
                return (t ? e.slice(0, e.findIndex((function(e) {
                    return e.route.id === t
                })) + 1) : d(e)).reverse().find((function(e) {
                    return !0 === e.route.hasErrorBoundary
                })) || e[0]
            }

            function sa(e) {
                var t = e.find((function(e) {
                    return e.index || !e.path || "/" === e.path
                })) || {
                    id: "__shim-error-route__"
                };
                return {
                    matches: [{
                        params: {},
                        pathname: "",
                        pathnameBase: "",
                        route: t
                    }],
                    route: t
                }
            }

            function ca(e, t) {
                var n = void 0 === t ? {} : t,
                    r = n.pathname,
                    a = n.routeId,
                    o = n.method,
                    i = n.type,
                    u = "Unknown Server Error",
                    l = "Unknown @remix-run/router error";
                return 400 === e ? (u = "Bad Request", l = o && r && a ? "You made a " + o + ' request to "' + r + '" but did not provide a `loader` for route "' + a + '", so there is no way to handle the request.' : "defer-action" === i ? "defer() is not supported in actions" : "Cannot submit binary form data using GET") : 403 === e ? (u = "Forbidden", l = 'Route "' + a + '" does not match URL "' + r + '"') : 404 === e ? (u = "Not Found", l = 'No route matches URL "' + r + '"') : 405 === e && (u = "Method Not Allowed", o && r && a ? l = "You made a " + o.toUpperCase() + ' request to "' + r + '" but did not provide an `action` for route "' + a + '", so there is no way to handle the request.' : o && (l = 'Invalid request method "' + o.toUpperCase() + '"')), new Fr(e || 500, u, new Error(l), !0)
            }

            function fa(e) {
                for (var t = e.length - 1; t >= 0; t--) {
                    var n = e[t];
                    if (ma(n)) return n
                }
            }

            function da(e) {
                return dr(or({}, "string" === typeof e ? pr(e) : e, {
                    hash: ""
                }))
            }

            function pa(e, t) {
                return e.pathname === t.pathname && e.search === t.search && e.hash !== t.hash
            }

            function ha(e) {
                return e.type === ir.deferred
            }

            function va(e) {
                return e.type === ir.error
            }

            function ma(e) {
                return (e && e.type) === ir.redirect
            }

            function ba(e) {
                return null != e && "number" === typeof e.status && "string" === typeof e.statusText && "object" === typeof e.headers && "undefined" !== typeof e.body
            }

            function ya(e) {
                return Br.has(e)
            }

            function ga(e) {
                return zr.has(e)
            }

            function wa(e, t, n, r, a, o) {
                return xa.apply(this, arguments)
            }

            function xa() {
                return (xa = m(h().mark((function e(t, n, r, a, o, i) {
                    var u, l;
                    return h().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                u = h().mark((function e(u) {
                                    var l, s, c, f;
                                    return h().wrap((function(e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                if (l = r[u], s = n[u], c = t.find((function(e) {
                                                        return e.route.id === s.route.id
                                                    })), f = null != c && !Jr(c, s) && void 0 !== (i && i[s.route.id]), !ha(l) || !o && !f) {
                                                    e.next = 7;
                                                    break
                                                }
                                                return e.next = 7, ka(l, a, o).then((function(e) {
                                                    e && (r[u] = e || r[u])
                                                }));
                                            case 7:
                                            case "end":
                                                return e.stop()
                                        }
                                    }), e)
                                })), l = 0;
                            case 2:
                                if (!(l < r.length)) {
                                    e.next = 7;
                                    break
                                }
                                return e.delegateYield(u(l), "t0", 4);
                            case 4:
                                l++, e.next = 2;
                                break;
                            case 7:
                            case "end":
                                return e.stop()
                        }
                    }), e)
                })))).apply(this, arguments)
            }

            function ka(e, t, n) {
                return Sa.apply(this, arguments)
            }

            function Sa() {
                return (Sa = m(h().mark((function e(t, n, r) {
                    return h().wrap((function(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return void 0 === r && (r = !1), e.next = 3, t.deferredData.resolveData(n);
                            case 3:
                                if (!e.sent) {
                                    e.next = 6;
                                    break
                                }
                                return e.abrupt("return");
                            case 6:
                                if (!r) {
                                    e.next = 14;
                                    break
                                }
                                return e.prev = 7, e.abrupt("return", {
                                    type: ir.data,
                                    data: t.deferredData.unwrappedData
                                });
                            case 11:
                                return e.prev = 11, e.t0 = e.catch(7), e.abrupt("return", {
                                    type: ir.error,
                                    error: e.t0
                                });
                            case 14:
                                return e.abrupt("return", {
                                    type: ir.data,
                                    data: t.deferredData.data
                                });
                            case 15:
                            case "end":
                                return e.stop()
                        }
                    }), e, null, [
                        [7, 11]
                    ])
                })))).apply(this, arguments)
            }

            function _a(e) {
                return new URLSearchParams(e).getAll("index").some((function(e) {
                    return "" === e
                }))
            }

            function Ea(e, t) {
                var n = e.route,
                    r = e.pathname,
                    a = e.params;
                return {
                    id: n.id,
                    pathname: r,
                    params: a,
                    data: t[n.id],
                    handle: n.handle
                }
            }

            function Ca(e, t) {
                var n = "string" === typeof t ? pr(t).search : t.search;
                if (e[e.length - 1].route.index && _a(n || "")) return e[e.length - 1];
                var r = Pr(e);
                return r[r.length - 1]
            }

            function ja() {
                return ja = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, ja.apply(this, arguments)
            }
            var Pa = "function" === typeof Object.is ? Object.is : function(e, t) {
                    return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t
                },
                Ta = t.useState,
                Ma = t.useEffect,
                Da = t.useLayoutEffect,
                Na = t.useDebugValue;

            function Ra(e) {
                var t = e.getSnapshot,
                    n = e.value;
                try {
                    var r = t();
                    return !Pa(n, r)
                } catch (a) {
                    return !0
                }
            }
            "undefined" === typeof window || "undefined" === typeof window.document || window.document.createElement;
            var Oa = r.useSyncExternalStore,
                La = t.createContext(null);
            var Fa = t.createContext(null);
            var Aa = t.createContext(null);
            var Ia = t.createContext(null);
            var za = t.createContext(null);
            var Ua = t.createContext({
                outlet: null,
                matches: []
            });
            var Ba = t.createContext(null);

            function Va() {
                return null != t.useContext(za)
            }

            function Ha() {
                return Va() || lr(!1), t.useContext(za).location
            }

            function Wa() {
                Va() || lr(!1);
                var e = t.useContext(Ia),
                    n = e.basename,
                    r = e.navigator,
                    a = t.useContext(Ua).matches,
                    o = Ha().pathname,
                    i = JSON.stringify(Pr(a).map((function(e) {
                        return e.pathnameBase
                    }))),
                    u = t.useRef(!1);
                t.useEffect((function() {
                    u.current = !0
                }));
                var l = t.useCallback((function(e, t) {
                    if (void 0 === t && (t = {}), u.current)
                        if ("number" !== typeof e) {
                            var a = Tr(e, JSON.parse(i), o, "path" === t.relative);
                            "/" !== n && (a.pathname = "/" === a.pathname ? n : Mr([n, a.pathname])), (t.replace ? r.replace : r.push)(a, t.state, t)
                        } else r.go(e)
                }), [n, r, i, o]);
                return l
            }

            function Ka(e, n) {
                var r = (void 0 === n ? {} : n).relative,
                    a = t.useContext(Ua).matches,
                    o = Ha().pathname,
                    i = JSON.stringify(Pr(a).map((function(e) {
                        return e.pathnameBase
                    })));
                return t.useMemo((function() {
                    return Tr(e, JSON.parse(i), o, "path" === r)
                }), [e, i, o, r])
            }

            function qa() {
                var e = function() {
                        var e, n = t.useContext(Ba),
                            r = Xa(Ga.UseRouteError),
                            a = Ja(Ga.UseRouteError);
                        if (n) return n;
                        return null == (e = r.errors) ? void 0 : e[a]
                    }(),
                    n = Ar(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
                    r = e instanceof Error ? e.stack : null,
                    a = "rgba(200, 200, 200, 0.5)",
                    o = {
                        padding: "0.5rem",
                        backgroundColor: a
                    },
                    i = {
                        padding: "2px 4px",
                        backgroundColor: a
                    };
                return t.createElement(t.Fragment, null, t.createElement("h2", null, "Unhandled Thrown Error!"), t.createElement("h3", {
                    style: {
                        fontStyle: "italic"
                    }
                }, n), r ? t.createElement("pre", {
                    style: o
                }, r) : null, t.createElement("p", null, "\ud83d\udcbf Hey developer \ud83d\udc4b"), t.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own\xa0", t.createElement("code", {
                    style: i
                }, "errorElement"), " props on\xa0", t.createElement("code", {
                    style: i
                }, "<Route>")))
            }
            var $a, Ga, Qa = function(e) {
                Xn(r, e);
                var n = nr(r);

                function r(e) {
                    var t;
                    return (0, Qn.Z)(this, r), (t = n.call(this, e)).state = {
                        location: e.location,
                        error: e.error
                    }, t
                }
                return (0, Yn.Z)(r, [{
                    key: "componentDidCatch",
                    value: function(e, t) {
                        console.error("React Router caught the following error during render", e, t)
                    }
                }, {
                    key: "render",
                    value: function() {
                        return this.state.error ? t.createElement(Ua.Provider, {
                            value: this.props.routeContext
                        }, t.createElement(Ba.Provider, {
                            value: this.state.error,
                            children: this.props.component
                        })) : this.props.children
                    }
                }], [{
                    key: "getDerivedStateFromError",
                    value: function(e) {
                        return {
                            error: e
                        }
                    }
                }, {
                    key: "getDerivedStateFromProps",
                    value: function(e, t) {
                        return t.location !== e.location ? {
                            error: e.error,
                            location: e.location
                        } : {
                            error: e.error || t.error,
                            location: t.location
                        }
                    }
                }]), r
            }(t.Component);

            function Ya(e) {
                var n = e.routeContext,
                    r = e.match,
                    a = e.children,
                    o = t.useContext(La);
                return o && o.static && o.staticContext && r.route.errorElement && (o.staticContext._deepestRenderedBoundaryId = r.route.id), t.createElement(Ua.Provider, {
                    value: n
                }, a)
            }

            function Za(e, n, r) {
                if (void 0 === n && (n = []), null == e) {
                    if (null == r || !r.errors) return null;
                    e = r.matches
                }
                var a = e,
                    o = null == r ? void 0 : r.errors;
                if (null != o) {
                    var i = a.findIndex((function(e) {
                        return e.route.id && (null == o ? void 0 : o[e.route.id])
                    }));
                    i >= 0 || lr(!1), a = a.slice(0, Math.min(a.length, i + 1))
                }
                return a.reduceRight((function(e, i, u) {
                    var l = i.route.id ? null == o ? void 0 : o[i.route.id] : null,
                        s = r ? i.route.errorElement || t.createElement(qa, null) : null,
                        c = n.concat(a.slice(0, u + 1)),
                        f = function() {
                            return t.createElement(Ya, {
                                match: i,
                                routeContext: {
                                    outlet: e,
                                    matches: c
                                }
                            }, l ? s : void 0 !== i.route.element ? i.route.element : e)
                        };
                    return r && (i.route.errorElement || 0 === u) ? t.createElement(Qa, {
                        location: r.location,
                        component: s,
                        error: l,
                        children: f(),
                        routeContext: {
                            outlet: null,
                            matches: c
                        }
                    }) : f()
                }), null)
            }

            function Xa(e) {
                var n = t.useContext(Fa);
                return n || lr(!1), n
            }

            function Ja(e) {
                var n = function(e) {
                        var n = t.useContext(Ua);
                        return n || lr(!1), n
                    }(),
                    r = n.matches[n.matches.length - 1];
                return r.route.id || lr(!1), r.route.id
            }! function(e) {
                e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator"
            }($a || ($a = {})),
            function(e) {
                e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator"
            }(Ga || (Ga = {}));
            var eo;

            function to(e) {
                var n = e.fallbackElement,
                    r = e.router,
                    a = Oa(r.subscribe, (function() {
                        return r.state
                    }), (function() {
                        return r.state
                    })),
                    o = t.useMemo((function() {
                        return {
                            createHref: r.createHref,
                            encodeLocation: r.encodeLocation,
                            go: function(e) {
                                return r.navigate(e)
                            },
                            push: function(e, t, n) {
                                return r.navigate(e, {
                                    state: t,
                                    preventScrollReset: null == n ? void 0 : n.preventScrollReset
                                })
                            },
                            replace: function(e, t, n) {
                                return r.navigate(e, {
                                    replace: !0,
                                    state: t,
                                    preventScrollReset: null == n ? void 0 : n.preventScrollReset
                                })
                            }
                        }
                    }), [r]),
                    i = r.basename || "/";
                return t.createElement(t.Fragment, null, t.createElement(La.Provider, {
                    value: {
                        router: r,
                        navigator: o,
                        static: !1,
                        basename: i
                    }
                }, t.createElement(Fa.Provider, {
                    value: a
                }, t.createElement(ro, {
                    basename: r.basename,
                    location: r.state.location,
                    navigationType: r.state.historyAction,
                    navigator: o
                }, r.state.initialized ? t.createElement(ao, null) : n))), null)
            }

            function no(e) {
                lr(!1)
            }

            function ro(e) {
                var n = e.basename,
                    r = void 0 === n ? "/" : n,
                    a = e.children,
                    o = void 0 === a ? null : a,
                    i = e.location,
                    u = e.navigationType,
                    l = void 0 === u ? Mn.Pop : u,
                    s = e.navigator,
                    c = e.static,
                    f = void 0 !== c && c;
                Va() && lr(!1);
                var d = r.replace(/^\/*/, "/"),
                    p = t.useMemo((function() {
                        return {
                            basename: d,
                            navigator: s,
                            static: f
                        }
                    }), [d, s, f]);
                "string" === typeof i && (i = pr(i));
                var h = i,
                    v = h.pathname,
                    m = void 0 === v ? "/" : v,
                    b = h.search,
                    y = void 0 === b ? "" : b,
                    g = h.hash,
                    w = void 0 === g ? "" : g,
                    x = h.state,
                    k = void 0 === x ? null : x,
                    S = h.key,
                    _ = void 0 === S ? "default" : S,
                    E = t.useMemo((function() {
                        var e = Er(m, d);
                        return null == e ? null : {
                            pathname: e,
                            search: y,
                            hash: w,
                            state: k,
                            key: _
                        }
                    }), [d, m, y, w, k, _]);
                return null == E ? null : t.createElement(Ia.Provider, {
                    value: p
                }, t.createElement(za.Provider, {
                    children: o,
                    value: {
                        location: E,
                        navigationType: l
                    }
                }))
            }

            function ao(e) {
                var n = e.children,
                    r = e.location,
                    a = t.useContext(La);
                return function(e, n) {
                    Va() || lr(!1);
                    var r, a = t.useContext(Ia).navigator,
                        o = t.useContext(Fa),
                        i = t.useContext(Ua).matches,
                        u = i[i.length - 1],
                        l = u ? u.params : {},
                        s = (u && u.pathname, u ? u.pathnameBase : "/"),
                        c = (u && u.route, Ha());
                    if (n) {
                        var f, d = "string" === typeof n ? pr(n) : n;
                        "/" === s || (null == (f = d.pathname) ? void 0 : f.startsWith(s)) || lr(!1), r = d
                    } else r = c;
                    var p = r.pathname || "/",
                        h = mr(e, {
                            pathname: "/" === s ? p : p.slice(s.length) || "/"
                        }),
                        v = Za(h && h.map((function(e) {
                            return Object.assign({}, e, {
                                params: Object.assign({}, l, e.params),
                                pathname: Mr([s, a.encodeLocation ? a.encodeLocation(e.pathname).pathname : e.pathname]),
                                pathnameBase: "/" === e.pathnameBase ? s : Mr([s, a.encodeLocation ? a.encodeLocation(e.pathnameBase).pathname : e.pathnameBase])
                            })
                        })), i, o || void 0);
                    return n && v ? t.createElement(za.Provider, {
                        value: {
                            location: ja({
                                pathname: "/",
                                search: "",
                                hash: "",
                                state: null,
                                key: "default"
                            }, r),
                            navigationType: Mn.Pop
                        }
                    }, v) : v
                }(a && !n ? a.router.routes : io(n), r)
            }! function(e) {
                e[e.pending = 0] = "pending", e[e.success = 1] = "success", e[e.error = 2] = "error"
            }(eo || (eo = {}));
            var oo = new Promise((function() {}));
            t.Component;

            function io(e, n) {
                void 0 === n && (n = []);
                var r = [];
                return t.Children.forEach(e, (function(e, a) {
                    if (t.isValidElement(e))
                        if (e.type !== t.Fragment) {
                            e.type !== no && lr(!1), e.props.index && e.props.children && lr(!1);
                            var o = [].concat(d(n), [a]),
                                i = {
                                    id: e.props.id || o.join("-"),
                                    caseSensitive: e.props.caseSensitive,
                                    element: e.props.element,
                                    index: e.props.index,
                                    path: e.props.path,
                                    loader: e.props.loader,
                                    action: e.props.action,
                                    errorElement: e.props.errorElement,
                                    hasErrorBoundary: null != e.props.errorElement,
                                    shouldRevalidate: e.props.shouldRevalidate,
                                    handle: e.props.handle
                                };
                            e.props.children && (i.children = io(e.props.children, o)), r.push(i)
                        } else r.push.apply(r, io(e.props.children, n))
                })), r
            }

            function uo(e) {
                return e.map((function(e) {
                    var t = ja({}, e);
                    return null == t.hasErrorBoundary && (t.hasErrorBoundary = null != t.errorElement), t.children && (t.children = uo(t.children)), t
                }))
            }
            var lo = function(e) {
                var t = e.router;
                return (0, l.jsx)(to, {
                    router: t
                })
            };

            function so() {
                return so = Object.assign ? Object.assign.bind() : function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                    }
                    return e
                }, so.apply(this, arguments)
            }

            function co(e, t) {
                if (null == e) return {};
                var n, r, a = {},
                    o = Object.keys(e);
                for (r = 0; r < o.length; r++) n = o[r], t.indexOf(n) >= 0 || (a[n] = e[n]);
                return a
            }
            var fo = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"];

            function po() {
                var e, t = null == (e = window) ? void 0 : e.__staticRouterHydrationData;
                return t && t.errors && (t = so({}, t, {
                    errors: ho(t.errors)
                })), t
            }

            function ho(e) {
                if (!e) return null;
                for (var t = {}, n = 0, r = Object.entries(e); n < r.length; n++) {
                    var a = g(r[n], 2),
                        o = a[0],
                        i = a[1];
                    if (i && "RouteErrorResponse" === i.__type) t[o] = new Fr(i.status, i.statusText, i.data, !0 === i.internal);
                    else if (i && "Error" === i.__type) {
                        var u = new Error(i.message);
                        u.stack = "", t[o] = u
                    } else t[o] = i
                }
                return t
            }
            var vo = t.forwardRef((function(e, n) {
                var r = e.onClick,
                    a = e.relative,
                    o = e.reloadDocument,
                    i = e.replace,
                    u = e.state,
                    l = e.target,
                    s = e.to,
                    c = e.preventScrollReset,
                    f = co(e, fo),
                    d = function(e, n) {
                        var r = (void 0 === n ? {} : n).relative;
                        Va() || lr(!1);
                        var a = t.useContext(Ia),
                            o = a.basename,
                            i = a.navigator,
                            u = Ka(e, {
                                relative: r
                            }),
                            l = u.hash,
                            s = u.pathname,
                            c = u.search,
                            f = s;
                        return "/" !== o && (f = "/" === s ? o : Mr([o, s])), i.createHref({
                            pathname: f,
                            search: c,
                            hash: l
                        })
                    }(s, {
                        relative: a
                    }),
                    p = function(e, n) {
                        var r = void 0 === n ? {} : n,
                            a = r.target,
                            o = r.replace,
                            i = r.state,
                            u = r.preventScrollReset,
                            l = r.relative,
                            s = Wa(),
                            c = Ha(),
                            f = Ka(e, {
                                relative: l
                            });
                        return t.useCallback((function(t) {
                            if (function(e, t) {
                                    return 0 === e.button && (!t || "_self" === t) && ! function(e) {
                                        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
                                    }(e)
                                }(t, a)) {
                                t.preventDefault();
                                var n = void 0 !== o ? o : dr(c) === dr(f);
                                s(e, {
                                    replace: n,
                                    state: i,
                                    preventScrollReset: u,
                                    relative: l
                                })
                            }
                        }), [c, s, f, o, i, a, e, u, l])
                    }(s, {
                        replace: i,
                        state: u,
                        target: l,
                        preventScrollReset: c,
                        relative: a
                    });
                return t.createElement("a", so({}, f, {
                    href: d,
                    onClick: o ? r : function(e) {
                        r && r(e), e.defaultPrevented || p(e)
                    },
                    ref: n,
                    target: l
                }))
            }));
            var mo, bo;
            (function(e) {
                e.UseScrollRestoration = "useScrollRestoration", e.UseSubmitImpl = "useSubmitImpl", e.UseFetcher = "useFetcher"
            })(mo || (mo = {})),
            function(e) {
                e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration"
            }(bo || (bo = {}));
            var yo = function(e) {
                    var t = Object.keys(e);
                    return t.sort(), t.join(", ")
                },
                go = function() {
                    var e = m(h().mark((function e(t) {
                        var n;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return n = t.availableCommands, e.abrupt("return", {
                                        output: "Supported commands: ".concat(yo(n), "\n\nLearn how to use the terminal: https://www.terminaltutor.com\n")
                                    });
                                case 2:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                wo = go,
                xo = function() {
                    var e = m(h().mark((function e(t) {
                        var n, r, a, o, i;
                        return h().wrap((function(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (n = t.args, r = t.terminalConfig, a = de(n), o = a.flags, i = a.rest, o.includes("f") || i.includes("--force")) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return", {
                                        output: 'Run "resetterm --force" to reset the file system to its original state\n'
                                    });
                                case 5:
                                    return e.next = 7, Gn(!0);
                                case 7:
                                    return e.abrupt("return", {
                                        output: "File system reset successfully.\n",
                                        workDir: r.userHomeDir
                                    });
                                case 8:
                                case "end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                }(),
                ko = {
                    help: wo,
                    resetterm: xo
                },
                So = ["className"],
                _o = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("div", {
                        className: "inline whitespace-normal break-normal",
                        onClick: function(e) {
                            return e.stopPropagation()
                        },
                        children: t
                    })
                },
                Eo = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h1", {
                        className: "inline font-bold",
                        children: t
                    })
                },
                Co = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h2", {
                        className: "inline text-gray-400",
                        children: t
                    })
                },
                jo = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h2", {
                        className: "inline",
                        children: t
                    })
                },
                Po = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h3", {
                        className: "inline italic",
                        children: t
                    })
                },
                To = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h4", {
                        className: "inline italic",
                        children: t
                    })
                },
                Mo = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("h5", {
                        className: "inline italic",
                        children: t
                    })
                },
                Do = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("p", {
                        className: "inline text-gray-400",
                        children: t
                    })
                },
                No = function(e) {
                    var t = e.children;
                    return (0, l.jsx)("ul", {
                        className: "list-outside list-disc pl-8 text-gray-400",
                        children: t
                    })
                },
                Ro = "underline hover:text-gray-500",
                Oo = function(e) {
                    var t = e.href,
                        n = e.children;
                    return (0, l.jsx)("a", {
                        href: t,
                        target: "_blank",
                        rel: "noopener",
                        className: Ro,
                        children: n
                    })
                },
                Lo = function(e) {
                    var t = e.className,
                        n = ln(e, So);
                    return (0, l.jsx)(vo, u({
                        className: Ro + (t ? " ".concat(t) : "")
                    }, n))
                },
                Fo = function(e) {
                    var t = e.hideHelp,
                        n = e.linkToMain;
                    return (0, l.jsxs)(_o, {
                        children: [n ? (0, l.jsx)(Lo, {
                            to: "/",
                            children: (0, l.jsx)(Eo, {
                                children: "ONterminal"
                            })
                        }) : (0, l.jsx)(Eo, {
                            children: " Θ WEBterminal Θ"
                        }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Co, {
                            children: "Online UNIX terminal simulator (bash, shell, zsh - Linux, Mac, BSD)"
                        }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                            children: ["Copyright \xa9 2024 ", (0, l.jsx)(Oo, {
                                href: "https://linktr.ee/CYBERGUILD",
                                children: "Cyberguild"
                            }), " (", (0, l.jsx)(Lo, {
                                to: "/imprint",
                                children: "Imprint"
                            }), " |", " ", (0, l.jsx)(Lo, {
                                to: "/privacy",
                                children: "Privacy Policy"
                            }), ")"]
                        }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), !t && (0, l.jsxs)(l.Fragment, {
                            children: [(0, l.jsxs)(Do, {
                                children: [(0, l.jsxs)("span", {
                                    className: "sr-only",
                                    children: ["Start typing your commands into the command line / console.", " "]
                                }), 'To print available commands, type "help" and press Enter.', (0, l.jsx)("span", {
                                    className: "hidden lg:inline",
                                    children: " "
                                }), (0, l.jsx)("br", {
                                    className: "lg:hidden"
                                }), (0, l.jsx)("br", {
                                    className: "lg:hidden"
                                }), (0, l.jsx)(Oo, {
                                    href: "https://github.com/JempUnkn/WEBterminal",
                                    children: "Learn how to use the terminal."
                                })]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {})]
                        })]
                    })
                },
                Ao = function(e, t) {
                    F ? function(e, t) {
                        var n = e.getBoundingClientRect(),
                            r = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                        (n.top < 0 || n.bottom > r) && window.scrollTo({
                            left: 0,
                            top: window.scrollY + n.bottom - r,
                            behavior: t ? "smooth" : "auto"
                        })
                    }(e, t) : e.scrollIntoView({
                        behavior: t ? "smooth" : "auto",
                        block: "end",
                        inline: "nearest"
                    })
                },
                Io = function(e, t) {
                    return Ao(e, t === vn.SoftKeyboardOpen)
                },
                zo = function(e) {
                    var t = e.fs;
                    return (0, l.jsx)(Dn, {
                        config: Hn,
                        additionalCommands: ko,
                        fs: t,
                        className: "min-h-full w-full",
                        onShouldScrollToBottom: Io,
                        children: (0, l.jsx)(Fo, {})
                    })
                },
                Uo = Q(Hn, Hn.userHomeDir),
                Bo = function() {
                    return (0, l.jsxs)(fn, {
                        className: "min-h-full w-full",
                        children: [(0, l.jsx)(Fo, {
                            linkToMain: !0,
                            hideHelp: !0
                        }), Uo, 'wget "', window.location.href, '"', (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)("span", {
                            className: "text-red-500",
                            children: "404 - Not Found."
                        }), " Go back to the", " ", (0, l.jsx)(Lo, {
                            to: "/",
                            children: "main terminal"
                        }), "."]
                    })
                },
                Vo = function() {
                    (0, t.useEffect)((function() {
                        var e = function() {
                            var e = document.createElement("meta");
                            return e.name = "robots", e.content = "noindex", e
                        }();
                        return document.head.appendChild(e),
                            function() {
                                document.head.removeChild(e)
                            }
                    }), [])
                },
                Ho = function() {
                    return Vo(), (0, l.jsxs)(fn, {
                        className: "min-h-full w-full",
                        children: [(0, l.jsx)(Fo, {
                            linkToMain: !0,
                            hideHelp: !0
                        }), (0, l.jsxs)(_o, {
                            children: [Uo, "cat imprint.txt", (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(jo, {
                                children: "Information according to \xa7 5 TMG:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Cyberguild"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Po, {
                                children: "Address:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["Street 50, Авиамоторная улица", (0, l.jsx)("br", {}), "Locality 111020, Moscovo", (0, l.jsx)("br", {}), "Country Russian Federation, RU (RUS) Subregion Eastern Europe"]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Po, {
                                children: "Contact:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["Email: ", (0, l.jsx)(Oo, {
                                    href: "mailto:support@cyberguild77.slmail.me",
                                    children: "support@cyberguild77.slmail.me"
                                }), (0, l.jsx)("br", {}), "Telephone: +88 888 888888"]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(jo, {
                                children: "Responsible for journalistic and editorial content according to \xa7 55 Abs. 2 RStV:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Cyberguild (see above for contact details)"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(jo, {
                                children: "Online Dispute Resolution:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["The European Commission provides a platform for online dispute resolution (according to Article 14 paragraph 1 ODR Regulation) at", " ", (0, l.jsx)(Oo, {
                                    href: "https://ec.europa.eu/consumers/odr/",
                                    children: "https://ec.europa.eu/consumers/odr/"
                                }), ".", (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), "I am neither willing nor obligated to participate in dispute resolution proceedings before a consumer arbitration board."]
                            })]
                        })]
                    })
                },
                Wo = function() {
                    return Vo(), (0, l.jsxs)(fn, {
                        className: "min-h-full w-full",
                        children: [(0, l.jsx)(Fo, {
                            linkToMain: !0,
                            hideHelp: !0
                        }), (0, l.jsxs)(_o, {
                            children: [Uo, "cat privacy.txt", (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(jo, {
                                children: "Privacy Policy"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Personal data (usually referred to just as \u201edata\u201c below) will only be processed by us to the extent necessary and for the purpose of providing a functional and user-friendly website, including its contents, and the services offered there."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Per Art. 4 No. 1 of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation (hereinafter referred to as the \u201eGDPR\u201c), \u201eprocessing\u201c refers to any operation or set of operations such as collection, recording, organization, structuring, storage, adaptation, alteration, retrieval, consultation, use, disclosure by transmission, dissemination, or otherwise making available, alignment, or combination, restriction, erasure, or destruction performed on personal data, whether by automated means or not."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The following privacy policy is intended to inform you in particular about the type, scope, purpose, duration, and legal basis for the processing of such data either under our own control or in conjunction with others. We also inform you below about the third-party components we use to optimize our website and improve the user experience which may result in said third parties also processing data they collect and control."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Our privacy policy is structured as follows:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["\xa0\xa0I. Information about us as controllers of your data", (0, l.jsx)("br", {}), "\xa0II. The rights of users and data subjects", (0, l.jsx)("br", {}), "III. Information about the data processing"]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Po, {
                                children: "I. Information about us as controllers of your data"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The party responsible for this website (the \u201econtroller\u201c) for purposes of data protection law is:"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["Cyberguild", (0, l.jsx)("br", {}), "Street 50, Авиамоторная улица", (0, l.jsx)("br", {}), "Locality 111020, Moscovo", (0, l.jsx)("br", {}), "Country Russian Federation, RU (RUS) Subregion Eastern Europe"]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: ["Email: ", (0, l.jsx)(Oo, {
                                    href: "mailto:support@cyberguild77.slmail.me",
                                    children: "support@cyberguild77.slmail.me"
                                }), (0, l.jsx)("br", {}), "Telephone: +88 888 888888"]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Po, {
                                children: "II. The rights of users and data subjects"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "With regard to the data processing to be described in more detail below, users and data subjects have the right"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(No, {
                                children: [(0, l.jsx)("li", {
                                    children: "to confirmation of whether data concerning them is being processed, information about the data being processed, further information about the nature of the data processing, and copies of the data (cf. also Art. 15 GDPR);"
                                }), (0, l.jsx)("li", {
                                    children: "to correct or complete incorrect or incomplete data (cf. also Art. 16 GDPR);"
                                }), (0, l.jsx)("li", {
                                    children: "to the immediate deletion of data concerning them (cf. also Art. 17 DSGVO), or, alternatively, if further processing is necessary as stipulated in Art. 17 Para. 3 GDPR, to restrict said processing per Art. 18 GDPR;"
                                }), (0, l.jsx)("li", {
                                    children: "to receive copies of the data concerning them and/or provided by them and to have the same transmitted to other providers/controllers (cf. also Art. 20 GDPR);"
                                }), (0, l.jsx)("li", {
                                    children: "to file complaints with the supervisory authority if they believe that data concerning them is being processed by the controller in breach of data protection provisions (see also Art. 77 GDPR)."
                                })]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "In addition, the controller is obliged to inform all recipients to whom it discloses data of any such corrections, deletions, or restrictions placed on processing the same per Art. 16, 17 Para. 1, 18 GDPR. However, this obligation does not apply if such notification is impossible or involves a disproportionate effort. Nevertheless, users have a right to information about these recipients."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: (0, l.jsx)("strong", {
                                    children: "Likewise, under Art. 21 GDPR, users and data subjects have the right to object to the controller\u2019s future processing of their data pursuant to Art. 6 Para. 1 lit. f) GDPR. In particular, an objection to data processing for the purpose of direct advertising is permissible."
                                })
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Po, {
                                children: "III. Information about the data processing"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Your data processed when using our website will be deleted or blocked as soon as the purpose for its storage ceases to apply, provided the deletion of the same is not in breach of any statutory storage obligations or unless otherwise stipulated below."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(To, {
                                children: "Cookies"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Mo, {
                                children: "a) Session cookies"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "We use cookies on our website. Cookies are small text files or other storage technologies stored on your computer by your browser. These cookies process certain specific information about you, such as your browser, location data, or IP address."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "This processing makes our website more user-friendly, efficient, and secure, allowing us, for example, to display our website in different languages or to offer a shopping cart function."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The legal basis for such processing is Art. 6 Para. 1 lit. b) GDPR, insofar as these cookies are used to collect data to initiate or process contractual relationships."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If the processing does not serve to initiate or process a contract, our legitimate interest lies in improving the functionality of our website. The legal basis is then Art. 6 Para. 1 lit. f) GDPR."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "When you close your browser, these session cookies are deleted."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Mo, {
                                children: "b) Third-party cookies"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If necessary, our website may also use cookies from companies with whom we cooperate for the purpose of advertising, analyzing, or improving the features of our website."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Please refer to the following information for details, in particular for the legal basis and purpose of such third-party collection and processing of data collected through cookies."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Mo, {
                                children: "c) Disabling cookies"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "You can refuse the use of cookies by changing the settings on your browser. Likewise, you can use the browser to delete cookies that have already been stored. However, the steps and measures required vary, depending on the browser you use. If you have any questions, please use the help function or consult the documentation for your browser or contact its maker for support."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If you prevent or restrict the installation of cookies, not all of the functions on our site may be fully usable."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(To, {
                                children: "Contact"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If you contact us via email or the contact form, the data you provide will be used for the purpose of processing your request. We must have this data in order to process and answer your inquiry; otherwise we will not be able to answer it in full or at all."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The legal basis for this data processing is Art. 6 Para. 1 lit. b) GDPR."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Your data will be deleted once we have fully answered your inquiry and there is no further legal obligation to store your data, such as if an order or contract resulted therefrom."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(To, {
                                children: "Newsletter"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If you register for our free newsletter, the data requested from you for this purpose, i.e. your email address and, optionally, your name and address, will be sent to us. We also store the IP address of your computer and the date and time of your registration. During the registration process, we will obtain your consent to receive this newsletter and the type of content it will offer, with reference made to this privacy policy. The data collected will be used exclusively to send the newsletter and will not be passed on to third parties."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The legal basis for this is Art. 6 Para. 1 lit. a) GDPR."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "You may revoke your prior consent to receive this newsletter under Art. 7 Para. 3 GDPR with future effect. All you have to do is inform us that you are revoking your consent or click on the unsubscribe link contained in each newsletter."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(To, {
                                children: "Server data"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "For technical reasons, the following data sent by your internet browser to us or to our server provider will be collected, especially to ensure a secure and stable website: These server log files record the type and version of your browser, operating system, the website from which you came (referrer URL), the webpages on our site visited, the date and time of your visit, as well as the IP address from which you visited our site."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The data thus collected will be temporarily stored, but not in association with any other of your data."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The basis for this storage is Art. 6 Para. 1 lit. f) GDPR. Our legitimate interest lies in the improvement, stability, functionality, and security of our website."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The data will be deleted within no more than seven days, unless continued storage is required for evidentiary purposes. In which case, all or part of the data will be excluded from deletion until the investigation of the relevant incident is finally resolved."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(To, {
                                children: "Sendinblue"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "We offer you the opportunity to register for our free newsletter on our website."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "We use Sendinblue to send newsletters. Sendinblue is a service provided by the company Sendinblue GmbH, K\xf6penicker Str. 126, 10179 Berlin, hereinafter referred to as \u201c Sendinblue \u201e."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "If you sign up to receive our newsletter, the data requested during the registration process (your email address) will be processed by Sendinblue. For this your IP address and the date of your registration will be saved along with the time. As a further part of the registration process, your consent to the sending of the newsletter will be obtained, the content will be described in concrete terms and reference made to this data protection declaration."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Additionally at"
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(No, {
                                children: [(0, l.jsx)("li", {
                                    children: (0, l.jsx)(Oo, {
                                        href: "https://www.sendinblue.com/legal/privacypolicy/",
                                        children: "https://www.sendinblue.com/legal/privacypolicy/"
                                    })
                                }), (0, l.jsx)("li", {
                                    children: (0, l.jsx)(Oo, {
                                        href: "https://www.sendinblue.com/information-for-email-recipients/",
                                        children: "Information for Email Recipients"
                                    })
                                })]
                            }), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Sendinblue offers further data protection information."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The newsletters sent by Sendinblue contain technologies by which we can analyse whether and when an email was opened and whether and which links contained in the newsletter were followed. We save this data in addition to the technical data (system data and IP address) so that the respective newsletter can be best tailored to your wishes and interests. The data thus collected is used to continuously improve the quality of our newsletters."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "The legal basis for sending the newsletter and the analysis is Art. 6 Para. 1 lit. a.) EU General Data Protection Regulation (GDPR)."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsx)(Do, {
                                children: "Consent to the newsletter being sent can be revoked at any time with future effect in accordance with Art. 7 Para. 3 GDPR. To do this, you only have to inform us of your revocation or click the unsubscribe link contained in each newsletter."
                            }), (0, l.jsx)("br", {}), (0, l.jsx)("br", {}), (0, l.jsxs)(Do, {
                                children: [(0, l.jsx)(Oo, {
                                    href: "https://www.generator-datenschutzerkl\xe4rung.de",
                                    children: "Model Data Protection Statement"
                                }), " ", "by", " ", (0, l.jsx)(Oo, {
                                    href: "https://www.ratgeberrecht.eu/",
                                    children: "Anwaltskanzlei Wei\xdf & Partner"
                                })]
                            })]
                        })]
                    })
                },
                Ko = function(e) {
                    return function(e, t) {
                        return Qr({
                            basename: null == t ? void 0 : t.basename,
                            history: (n = {
                                window: null == t ? void 0 : t.window
                            }, void 0 === n && (n = {}), hr((function(e, t) {
                                var n = e.location;
                                return fr("", {
                                    pathname: n.pathname,
                                    search: n.search,
                                    hash: n.hash
                                }, t.state && t.state.usr || null, t.state && t.state.key || "default")
                            }), (function(e, t) {
                                return "string" === typeof t ? t : dr(t)
                            }), null, n)),
                            hydrationData: (null == t ? void 0 : t.hydrationData) || po(),
                            routes: uo(e)
                        }).initialize();
                        var n
                    }([{
                        path: "/",
                        element: (0, l.jsx)(zo, {
                            fs: e
                        }),
                        errorElement: (0, l.jsx)(Bo, {})
                    }, {
                        path: "/imprint",
                        element: (0, l.jsx)(Ho, {}),
                        errorElement: (0, l.jsx)(Bo, {})
                    }, {
                        path: "/privacy",
                        element: (0, l.jsx)(Wo, {}),
                        errorElement: (0, l.jsx)(Bo, {})
                    }])
                },
                qo = document.getElementById("app");
            if (qo) {
                var $o;
                if (document.querySelectorAll("html, body").forEach((function(e) {
                        return e.classList.add("h-full", "bg-gray-800")
                    })), F) null === ($o = document.querySelector("html")) || void 0 === $o || $o.classList.add("overflow-y-scroll"), qo.classList.add("h-px", "min-h-full");
                else qo.classList.add("h-full", "overflow-y-scroll");
                Gn().then((function(n) {
                    var r = Ko(n);
                    (0, e.s)(qo).render((0, l.jsx)(t.StrictMode, {
                        children: (0, l.jsx)(lo, {
                            router: r
                        })
                    }))
                })).catch((function(e) {
                    return console.error(e)
                }))
            } else console.error("React root not found")
        }()
}();