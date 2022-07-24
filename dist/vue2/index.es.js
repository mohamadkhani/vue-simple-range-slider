import Z, { defineComponent as Re, ref as W, reactive as Ge, onMounted as Je, getCurrentInstance as Ye, onUnmounted as Qe, computed as V, watch as z } from "vue";
var ie = function(e, t) {
  return ie = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var o in r)
      Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
  }, ie(e, t);
};
function Ze(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  ie(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype = t === null ? Object.create(t) : (n.prototype = t.prototype, new n());
}
function Ce(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n)
    return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function qe(e) {
  var t;
  O(e, (t = se()) === null || t === void 0 ? void 0 : t.proxy);
}
var oe, Y = [], xe = function() {
  function e(t) {
    this.active = !0, this.effects = [], this.cleanups = [], this.vm = t;
  }
  return e.prototype.run = function(t) {
    if (this.active)
      try {
        return this.on(), t();
      } finally {
        this.off();
      }
    else
      process.env.NODE_ENV !== "production" && qe("cannot run an inactive effect scope.");
  }, e.prototype.on = function() {
    this.active && (Y.push(this), oe = this);
  }, e.prototype.off = function() {
    this.active && (Y.pop(), oe = Y[Y.length - 1]);
  }, e.prototype.stop = function() {
    this.active && (this.vm.$destroy(), this.effects.forEach(function(t) {
      return t.stop();
    }), this.cleanups.forEach(function(t) {
      return t();
    }), this.active = !1);
  }, e;
}();
(function(e) {
  Ze(t, e);
  function t(n) {
    n === void 0 && (n = !1);
    var r = this, o = void 0;
    return it(function() {
      o = Pe(te());
    }), r = e.call(this, o) || this, n || et(r), r;
  }
  return t;
})(xe);
function et(e, t) {
  var n;
  if (t = t || oe, t && t.active) {
    t.effects.push(e);
    return;
  }
  var r = (n = se()) === null || n === void 0 ? void 0 : n.proxy;
  r && r.$on("hook:destroyed", function() {
    return e.stop();
  });
}
function tt(e) {
  if (!e.scope) {
    var t = new xe(e.proxy);
    e.scope = t, e.proxy.$on("hook:destroyed", function() {
      return t.stop();
    });
  }
  return e.scope;
}
var ae = void 0;
try {
  var T = require("vue");
  T && he(T) ? ae = T : T && "default" in T && he(T.default) && (ae = T.default);
} catch {
}
var K = null, B = null, Q = !0, Oe = "__composition_api_installed__";
function he(e) {
  return e && k(e) && e.name === "Vue";
}
function nt(e) {
  return K && A(e, Oe);
}
function te() {
  return process.env.NODE_ENV !== "production" && ce(K, "must call Vue.use(VueCompositionAPI) before using any function."), K;
}
function Ve() {
  var e = K || ae;
  return process.env.NODE_ENV !== "production" && ce(e, "No vue dependency found."), e;
}
function rt(e) {
  process.env.NODE_ENV !== "production" && K && e.__proto__ !== K.__proto__ && O("[vue-composition-api] another instance of Vue installed"), K = e, Object.defineProperty(e, Oe, {
    configurable: !0,
    writable: !0,
    value: !0
  });
}
function it(e) {
  var t = Q;
  Q = !1;
  try {
    e();
  } finally {
    Q = t;
  }
}
function _e(e) {
  if (!!Q) {
    var t = B;
    t == null || t.scope.off(), B = e, B == null || B.scope.on();
  }
}
function se() {
  return B;
}
var ne = /* @__PURE__ */ new WeakMap();
function q(e) {
  if (ne.has(e))
    return ne.get(e);
  var t = {
    proxy: e,
    update: e.$forceUpdate,
    type: e.$options,
    uid: e._uid,
    emit: e.$emit.bind(e),
    parent: null,
    root: null
  };
  tt(t);
  var n = [
    "data",
    "props",
    "attrs",
    "refs",
    "vnode",
    "slots"
  ];
  return n.forEach(function(r) {
    R(t, r, {
      get: function() {
        return e["$".concat(r)];
      }
    });
  }), R(t, "isMounted", {
    get: function() {
      return e._isMounted;
    }
  }), R(t, "isUnmounted", {
    get: function() {
      return e._isDestroyed;
    }
  }), R(t, "isDeactivated", {
    get: function() {
      return e._inactive;
    }
  }), R(t, "emitted", {
    get: function() {
      return e._events;
    }
  }), ne.set(e, t), e.$parent && (t.parent = q(e.$parent)), e.$root && (t.root = q(e.$root)), t;
}
var ot = function(e) {
  return Object.prototype.toString.call(e);
};
function ge(e) {
  return typeof e == "function" && /native code/.test(e.toString());
}
var at = typeof Symbol < "u" && ge(Symbol) && typeof Reflect < "u" && ge(Reflect.ownKeys), U = function(e) {
  return e;
};
function R(e, t, n) {
  var r = n.get, o = n.set;
  Object.defineProperty(e, t, {
    enumerable: !0,
    configurable: !0,
    get: r || U,
    set: o || U
  });
}
function Ae(e, t, n, r) {
  Object.defineProperty(e, t, {
    value: n,
    enumerable: !!r,
    writable: !0,
    configurable: !0
  });
}
function A(e, t) {
  return Object.hasOwnProperty.call(e, t);
}
function ce(e, t) {
  if (!e)
    throw new Error("[vue-composition-api] ".concat(t));
}
function ut(e) {
  return typeof e == "string" || typeof e == "number" || typeof e == "symbol" || typeof e == "boolean";
}
function X(e) {
  return Array.isArray(e);
}
var st = 4294967295;
function ct(e) {
  var t = parseFloat(String(e));
  return t >= 0 && Math.floor(t) === t && isFinite(e) && t <= st;
}
function ee(e) {
  return e !== null && typeof e == "object";
}
function I(e) {
  return ot(e) === "[object Object]";
}
function k(e) {
  return typeof e == "function";
}
function lt(e) {
  return e == null;
}
function O(e, t) {
  var n = Ve();
  !n || !n.util ? console.warn("[vue-composition-api] ".concat(e)) : n.util.warn(e, t);
}
function Pe(e, t) {
  t === void 0 && (t = {});
  var n = e.config.silent;
  e.config.silent = !0;
  var r = new e(t);
  return e.config.silent = n, r;
}
function ft(e) {
  var t = te();
  return t && e instanceof t;
}
function dt(e, t) {
  return function() {
    for (var n = [], r = 0; r < arguments.length; r++)
      n[r] = arguments[r];
    return e.$scopedSlots[t] ? e.$scopedSlots[t].apply(e, n) : process.env.NODE_ENV !== "production" ? O("slots.".concat(t, '() got called outside of the "render()" scope'), e) : void 0;
  };
}
function pt(e, t) {
  var n;
  if (!e)
    n = {};
  else {
    if (e._normalized)
      return e._normalized;
    n = {};
    for (var r in e)
      e[r] && r[0] !== "$" && (n[r] = !0);
  }
  for (var r in t)
    r in n || (n[r] = !0);
  return n;
}
var G = "composition-api.refKey", ye = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap();
function ht(e, t, n) {
  var r = te(), o = r.util, l = o.warn, a = o.defineReactive;
  process.env.NODE_ENV !== "production" && (lt(e) || ut(e)) && l("Cannot set reactive property on undefined, null, or primitive value: ".concat(e));
  var u = e.__ob__;
  function c() {
    u && ee(n) && !A(n, "__ob__") && le(n);
  }
  if (X(e)) {
    if (ct(t))
      return e.length = Math.max(e.length, t), e.splice(t, 1, n), c(), n;
    if (t === "length" && n !== e.length)
      return e.length = n, u == null || u.dep.notify(), n;
  }
  return t in e && !(t in Object.prototype) ? (e[t] = n, c(), n) : e._isVue || u && u.vmCount ? (process.env.NODE_ENV !== "production" && l("Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option."), n) : u ? (a(u.value, t, n), Ie(e, t, n), c(), u.dep.notify(), n) : (e[t] = n, n);
}
var De = function() {
  function e(t) {
    var n = t.get, r = t.set;
    R(this, "value", {
      get: n,
      set: r
    });
  }
  return e;
}();
function Me(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = new De(e);
  n && (r.effect = !0);
  var o = Object.seal(r);
  return t && vt.set(o, !0), o;
}
function me(e) {
  var t;
  if (C(e))
    return e;
  var n = ke((t = {}, t[G] = e, t));
  return Me({
    get: function() {
      return n[G];
    },
    set: function(r) {
      return n[G] = r;
    }
  });
}
function C(e) {
  return e instanceof De;
}
function _t(e) {
  if (process.env.NODE_ENV !== "production" && !F(e) && O("toRefs() expects a reactive object but received a plain one."), !I(e))
    return e;
  var t = {};
  for (var n in e)
    t[n] = gt(e, n);
  return t;
}
function gt(e, t) {
  t in e || ht(e, t, void 0);
  var n = e[t];
  return C(n) ? n : Me({
    get: function() {
      return e[t];
    },
    set: function(r) {
      return e[t] = r;
    }
  });
}
var Ne = "__v_skip";
function H(e) {
  var t;
  return Boolean(e && A(e, "__ob__") && typeof e.__ob__ == "object" && ((t = e.__ob__) === null || t === void 0 ? void 0 : t[Ne]));
}
function F(e) {
  var t;
  return Boolean(e && A(e, "__ob__") && typeof e.__ob__ == "object" && !(!((t = e.__ob__) === null || t === void 0) && t[Ne]));
}
function ue(e) {
  if (!(!I(e) || H(e) || X(e) || C(e) || ft(e) || ye.has(e))) {
    ye.set(e, !0);
    for (var t = Object.keys(e), n = 0; n < t.length; n++)
      Ie(e, t[n]);
  }
}
function Ie(e, t, n) {
  if (t !== "__ob__" && !H(e[t])) {
    var r, o, l = Object.getOwnPropertyDescriptor(e, t);
    if (l) {
      if (l.configurable === !1)
        return;
      r = l.get, o = l.set, (!r || o) && arguments.length === 2 && (n = e[t]);
    }
    ue(n), R(e, t, {
      get: function() {
        var u = r ? r.call(e) : n;
        return t !== G && C(u) ? u.value : u;
      },
      set: function(u) {
        r && !o || (t !== G && C(n) && !C(u) ? n.value = u : (o && o.call(e, u), n = u), ue(u));
      }
    });
  }
}
function Te(e) {
  var t = Ve(), n;
  if (t.observable)
    n = t.observable(e);
  else {
    var r = Pe(t, {
      data: {
        $$state: e
      }
    });
    n = r._data.$$state;
  }
  return A(n, "__ob__") || le(n), n;
}
function le(e, t) {
  var n, r;
  if (t === void 0 && (t = /* @__PURE__ */ new Set()), !(t.has(e) || A(e, "__ob__") || !Object.isExtensible(e))) {
    Ae(e, "__ob__", yt(e)), t.add(e);
    try {
      for (var o = Ce(Object.keys(e)), l = o.next(); !l.done; l = o.next()) {
        var a = l.value, u = e[a];
        !(I(u) || X(u)) || H(u) || !Object.isExtensible(u) || le(u, t);
      }
    } catch (c) {
      n = { error: c };
    } finally {
      try {
        l && !l.done && (r = o.return) && r.call(o);
      } finally {
        if (n)
          throw n.error;
      }
    }
  }
}
function yt(e) {
  return e === void 0 && (e = {}), {
    value: e,
    dep: {
      notify: U,
      depend: U,
      addSub: U,
      removeSub: U
    }
  };
}
function mt() {
  return Te({}).__ob__;
}
function ke(e) {
  if (!ee(e))
    return process.env.NODE_ENV !== "production" && O('"reactive()" must be called on an object.'), e;
  if (!(I(e) || X(e)) || H(e) || !Object.isExtensible(e))
    return e;
  var t = Te(e);
  return ue(t), t;
}
process.env.NODE_ENV !== "production" && Object.freeze({});
function wt(e, t, n) {
  var r = e.__composition_api_state__ = e.__composition_api_state__ || {};
  r[t] = n;
}
function St(e, t) {
  return (e.__composition_api_state__ || {})[t];
}
var N = {
  set: wt,
  get: St
};
function bt(e, t, n) {
  var r = e.$options.props;
  !(t in e) && !(r && A(r, t)) ? (C(n) ? R(e, t, {
    get: function() {
      return n.value;
    },
    set: function(o) {
      n.value = o;
    }
  }) : R(e, t, {
    get: function() {
      return F(n) && n.__ob__.dep.depend(), n;
    },
    set: function(o) {
      n = o;
    }
  }), process.env.NODE_ENV !== "production" && e.$nextTick(function() {
    Object.keys(e._data).indexOf(t) === -1 && (C(n) ? R(e._data, t, {
      get: function() {
        return n.value;
      },
      set: function(o) {
        n.value = o;
      }
    }) : R(e._data, t, {
      get: function() {
        return n;
      },
      set: function(o) {
        n = o;
      }
    }));
  })) : process.env.NODE_ENV !== "production" && (r && A(r, t) ? O('The setup binding property "'.concat(t, '" is already declared as a prop.'), e) : O('The setup binding property "'.concat(t, '" is already declared.'), e));
}
function Et(e) {
  var t = N.get(e, "rawBindings") || {};
  if (!(!t || !Object.keys(t).length)) {
    for (var n = e.$refs, r = N.get(e, "refs") || [], o = 0; o < r.length; o++) {
      var l = r[o], a = t[l];
      !n[l] && a && C(a) && (a.value = null);
    }
    for (var u = Object.keys(n), c = [], o = 0; o < u.length; o++) {
      var l = u[o], a = t[l];
      n[l] && a && C(a) && (a.value = n[l], c.push(l));
    }
    N.set(e, "refs", c);
  }
}
function we(e) {
  for (var t = [e._vnode]; t.length; ) {
    var n = t.pop();
    if (n && (n.context && Et(n.context), n.children))
      for (var r = 0; r < n.children.length; ++r)
        t.push(n.children[r]);
  }
}
function Se(e, t) {
  var n, r;
  if (!!e) {
    var o = N.get(e, "attrBindings");
    if (!(!o && !t)) {
      if (!o) {
        var l = ke({});
        o = { ctx: t, data: l }, N.set(e, "attrBindings", o), R(t, "attrs", {
          get: function() {
            return o == null ? void 0 : o.data;
          },
          set: function() {
            process.env.NODE_ENV !== "production" && O("Cannot assign to '$attrs' because it is a read-only property", e);
          }
        });
      }
      var a = e.$attrs, u = function(f) {
        A(o.data, f) || R(o.data, f, {
          get: function() {
            return e.$attrs[f];
          }
        });
      };
      try {
        for (var c = Ce(Object.keys(a)), p = c.next(); !p.done; p = c.next()) {
          var _ = p.value;
          u(_);
        }
      } catch (f) {
        n = { error: f };
      } finally {
        try {
          p && !p.done && (r = c.return) && r.call(c);
        } finally {
          if (n)
            throw n.error;
        }
      }
    }
  }
}
function be(e, t) {
  var n = e.$options._parentVnode;
  if (!!n) {
    for (var r = N.get(e, "slots") || [], o = pt(n.data.scopedSlots, e.$slots), l = 0; l < r.length; l++) {
      var a = r[l];
      o[a] || delete t[a];
    }
    for (var u = Object.keys(o), l = 0; l < u.length; l++) {
      var a = u[l];
      t[a] || (t[a] = dt(e, a));
    }
    N.set(e, "slots", u);
  }
}
function re(e, t, n) {
  var r = se();
  _e(e);
  try {
    return t(e);
  } catch (o) {
    if (n)
      n(o);
    else
      throw o;
  } finally {
    _e(r);
  }
}
function Rt(e) {
  e.mixin({
    beforeCreate: t,
    mounted: function() {
      we(this);
    },
    beforeUpdate: function() {
      Se(this);
    },
    updated: function() {
      we(this);
    }
  });
  function t() {
    var a = this, u = a.$options, c = u.setup, p = u.render;
    if (p && (u.render = function() {
      for (var f = this, y = [], S = 0; S < arguments.length; S++)
        y[S] = arguments[S];
      return re(q(a), function() {
        return p.apply(f, y);
      });
    }), !!c) {
      if (!k(c)) {
        process.env.NODE_ENV !== "production" && O('The "setup" option should be a function that returns a object in component definitions.', a);
        return;
      }
      var _ = u.data;
      u.data = function() {
        return n(a, a.$props), k(_) ? _.call(a, a) : _ || {};
      };
    }
  }
  function n(a, u) {
    u === void 0 && (u = {});
    var c = a.$options.setup, p = l(a), _ = q(a);
    _.setupContext = p, Ae(u, "__ob__", mt()), be(a, p.slots);
    var f;
    if (re(_, function() {
      f = c(u, p);
    }), !!f) {
      if (k(f)) {
        var y = f;
        a.$options.render = function() {
          return be(a, p.slots), re(_, function() {
            return y();
          });
        };
        return;
      } else if (ee(f)) {
        F(f) && (f = _t(f)), N.set(a, "rawBindings", f);
        var S = f;
        Object.keys(S).forEach(function(x) {
          var h = S[x];
          if (!C(h))
            if (F(h))
              X(h) && (h = me(h));
            else if (k(h)) {
              var s = h;
              h = h.bind(a), Object.keys(s).forEach(function(E) {
                h[E] = s[E];
              });
            } else
              ee(h) ? o(h) && r(h) : h = me(h);
          bt(a, x, h);
        });
        return;
      }
      process.env.NODE_ENV !== "production" && ce(!1, '"setup" must return a "Object" or a "Function", got "'.concat(Object.prototype.toString.call(f).slice(8, -1), '"'));
    }
  }
  function r(a, u) {
    if (u === void 0 && (u = /* @__PURE__ */ new Set()), !u.has(a) && !(!I(a) || C(a) || F(a) || H(a))) {
      var c = te(), p = c.util.defineReactive;
      Object.keys(a).forEach(function(_) {
        var f = a[_];
        p(a, _, f), f && (u.add(f), r(f, u));
      });
    }
  }
  function o(a, u) {
    return u === void 0 && (u = /* @__PURE__ */ new Map()), u.has(a) ? u.get(a) : (u.set(a, !1), X(a) && F(a) ? (u.set(a, !0), !0) : !I(a) || H(a) || C(a) ? !1 : Object.keys(a).some(function(c) {
      return o(a[c], u);
    }));
  }
  function l(a) {
    var u = { slots: {} }, c = [
      "root",
      "parent",
      "refs",
      "listeners",
      "isServer",
      "ssrContext"
    ], p = ["emit"];
    return c.forEach(function(_) {
      var f = "$".concat(_);
      R(u, _, {
        get: function() {
          return a[f];
        },
        set: function() {
          process.env.NODE_ENV !== "production" && O("Cannot assign to '".concat(_, "' because it is a read-only property"), a);
        }
      });
    }), Se(a, u), p.forEach(function(_) {
      var f = "$".concat(_);
      R(u, _, {
        get: function() {
          return function() {
            for (var y = [], S = 0; S < arguments.length; S++)
              y[S] = arguments[S];
            var x = a[f];
            x.apply(a, y);
          };
        }
      });
    }), process.env.NODE_ENV === "test" && (u._vm = a), u;
  }
}
function Ke(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  for (var n, r, o, l = at ? Reflect.ownKeys(e) : Object.keys(e), a = 0; a < l.length; a++)
    n = l[a], n !== "__ob__" && (r = t[n], o = e[n], A(t, n) ? r !== o && I(r) && !C(r) && I(o) && !C(o) && Ke(o, r) : t[n] = o);
  return t;
}
function Ct(e) {
  if (nt(e)) {
    process.env.NODE_ENV !== "production" && O("[vue-composition-api] already installed. Vue.use(VueCompositionAPI) should be called only once.");
    return;
  }
  process.env.NODE_ENV !== "production" && (e.version ? (e.version[0] !== "2" || e.version[1] !== ".") && O("[vue-composition-api] only works with Vue 2, v".concat(e.version, " found.")) : O("[vue-composition-api] no Vue version found")), e.config.optionMergeStrategies.setup = function(t, n) {
    return function(o, l) {
      return Ke(k(t) ? t(o, l) || {} : void 0, k(n) ? n(o, l) || {} : void 0);
    };
  }, rt(e), Rt(e);
}
var Le = {
  install: function(e) {
    return Ct(e);
  }
};
typeof window < "u" && window.Vue && window.Vue.use(Le);
function xt(e) {
  e = e || Z, e && !e.__composition_api_installed__ && Z.use(Le);
}
xt(Z);
Z.version;
const Ot = Math.max, Vt = Math.min;
function Ee(e, t, n) {
  let r, o, l, a, u, c, p = 0, _ = !1, f = !1, y = !0;
  if (typeof e != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  t = Number(t) || 0, typeof n == "object" && (_ = !!n.leading, f = "maxWait" in n, l = f ? Ot(Number(n.maxWait) || 0, t) : l, y = "trailing" in n ? !!n.trailing : y);
  function S(v) {
    let w = r, P = o;
    return r = o = void 0, p = v, a = e.apply(P, w), a;
  }
  function x(v) {
    return p = v, u = setTimeout(E, t), _ ? S(v) : a;
  }
  function h(v) {
    let w = v - c, P = v - p, L = t - w;
    return console.log("remainingWait"), f ? Vt(L, l - P) : L;
  }
  function s(v) {
    let w = v - c, P = v - p;
    return c === void 0 || w >= t || w < 0 || f && P >= l;
  }
  function E() {
    const v = Date.now();
    if (s(v))
      return j(v);
    u = setTimeout(E, h(v));
  }
  function j(v) {
    return u = void 0, y && r ? S(v) : (r = o = void 0, a);
  }
  function J() {
    u !== void 0 && clearTimeout(u), p = 0, r = c = o = u = void 0;
  }
  function $() {
    return u === void 0 ? a : j(Date.now());
  }
  function b() {
    let v = Date.now(), w = s(v);
    if (r = arguments, o = this, c = v, w) {
      if (u === void 0)
        return x(c);
      if (f)
        return u = setTimeout(E, t), S(c);
    }
    return u === void 0 && (u = setTimeout(E, t)), a;
  }
  return b.cancel = J, b.flush = $, b;
}
const At = Re({
  name: "VueSimpleRangeSlider"
}), Pt = /* @__PURE__ */ Re({
  ...At,
  props: {
    modelValue: null,
    value: null,
    exponential: { type: Boolean, default: !1 },
    barColor: { default: "#bebebe" },
    activeBarColor: { default: "#7e7e7e" },
    max: { default: 100 },
    min: { default: 0 },
    keepJustSignificantFigures: { type: Boolean, default: !0 },
    significantFigures: { default: 2 }
  },
  emits: ["input", "update:model-value"],
  setup(e, { emit: t }) {
    const n = e, r = (i, d) => (d === 2 && (i = Math.min(s.width, Math.max(s.anchor1PositionV, i))), d === 1 && (i = Math.max(0, Math.min(w.value ? s.anchor2PositionV : s.width, i))), i), o = (i) => {
      if (n.exponential) {
        const d = n.max - n.min;
        return c((i - n.min) / d, d) * s.width;
      } else
        return (i - n.min) * $.value;
    }, l = (i) => {
      if (n.exponential) {
        const d = n.max - n.min;
        let m = Math.round(u(i / s.width, d) * d) + n.min;
        return n.keepJustSignificantFigures && (m = a(m)), m;
      } else
        return n.min + Math.round(i / $.value);
    }, a = (i) => Number(i.toPrecision(n.significantFigures)), u = (i, d) => {
      const m = Math.E + d;
      return (Math.pow(m, i) - 1) / (Math.pow(m, 1) - 1);
    }, c = (i, d) => {
      const m = Math.E;
      return Math.log(i * (d + m) + 1) / Math.log(m + d);
    }, p = W(), _ = W(), f = W(), y = W(), S = W(), x = W(), h = {}, s = Ge({
      input1Width: 0,
      input2Width: 0,
      dashInput: 80,
      anchor1PositionV: 0,
      anchor2PositionV: 0,
      isRtl: !1,
      width: 100,
      draggingAnchor: 0,
      dragStartX: 0,
      dragStartPosition: 0,
      isDragging: !1,
      changingByKey: !1
    }), E = 15;
    Je(() => {
      var d, m;
      const i = Ye();
      ve((d = i == null ? void 0 : i.proxy) == null ? void 0 : d.$el, "direction") === "rtl" && (s.isRtl = !0), h.ro3 = new ResizeObserver((D) => {
        s.width = D[0].contentRect.width - (w.value ? E : 0);
      }), x.value && (h.ro3.unobserve(x.value), s.width = ((m = x.value.getBoundingClientRect()) == null ? void 0 : m.width) - (w.value ? E : 0));
    }), Qe(() => {
      var i;
      (i = h == null ? void 0 : h.ro3) == null || i.disconnect();
    });
    const j = (i) => {
      L.value = l(i);
    }, J = (i) => {
      P.value = l(i);
    }, $ = V(() => s.width / (n.max - n.min)), b = V({
      get: () => s.anchor2PositionV,
      set: (i) => {
        i != s.anchor1PositionV && (i = r(i, 2), s.anchor2PositionV !== i && (s.anchor2PositionV = i), j(i));
      }
    }), v = V({
      get: () => s.anchor1PositionV,
      set: (i) => {
        i != s.anchor1PositionV && (i = r(i, 1), s.anchor1PositionV !== i && (s.anchor1PositionV = i), J(i));
      }
    }), w = V(() => Array.isArray(g.value)), P = V({
      get: () => w.value && Array.isArray(g.value) ? g.value[0] : !w.value && !Array.isArray(g.value) ? g.value : void 0,
      set: (i) => {
        if (w.value && Array.isArray(g.value)) {
          if (i === g.value[0])
            return;
          g.value = [i || 0, g.value[1]];
        } else if (!w.value && !Array.isArray(g.value)) {
          if (i === g.value)
            return;
          g.value = i;
        }
      }
    }), L = V({
      get: () => w.value && Array.isArray(g.value) ? g.value[1] : !w.value && !Array.isArray(g.value) ? g.value : void 0,
      set: (i) => {
        if (w.value && Array.isArray(g.value)) {
          if (i === g.value[1])
            return;
          g.value = [g.value[0], i || 0];
        } else if (!w.value && !Array.isArray(g.value)) {
          if (i === g.value)
            return;
          g.value = i;
        }
      }
    }), g = V({
      get: () => n.value,
      set: (i) => {
        Array.isArray(i) && Array.isArray(n.modelValue) && i[0] === n.modelValue[0] && i[1] === n.modelValue[1] || !Array.isArray(i) && i === n.modelValue || t("input", i);
      }
    });
    z(() => _.value, (i) => {
      h.ro1 && h.ro1.disconnect(), h.ro1 = new ResizeObserver((d) => {
        s.input1Width = d[0].target.getBoundingClientRect().width;
      }), i && h.ro1.observe(i);
    }, { immediate: !0 }), z(() => y.value, (i) => {
      h.ro2 && h.ro2.disconnect(), h.ro2 = new ResizeObserver((d) => {
        s.input2Width = d[0].target.getBoundingClientRect().width;
      }), i && h.ro2.observe(i);
    }, { immediate: !0 }), z(() => S.value, (i) => {
      var d;
      s.dashInput = ((d = i == null ? void 0 : i.getBoundingClientRect()) == null ? void 0 : d.width) || 30;
    }, {
      immediate: !0
    }), z(() => g.value, (i, d) => {
      s.isDragging || (Array.isArray(i) ? (v.value = o(i[0]), b.value = o(i[1])) : i ? v.value = o(i) : v.value = 0);
    }, { immediate: !0 });
    const fe = (i) => {
      setTimeout(() => {
        var d;
        P.value = Number.parseInt(((d = f.value) == null ? void 0 : d.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, We = Ee(fe, 1e3), de = (i) => {
      setTimeout(() => {
        var d;
        L.value = Number.parseInt(((d = f.value) == null ? void 0 : d.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, Be = Ee(de, 1e3), pe = V(() => b.value - v.value < s.input1Width + s.input2Width - 15 && w.value);
    z(() => pe.value, () => {
      if (p.value instanceof HTMLInputElement && document.activeElement === p.value) {
        const i = p.value.selectionStart;
        p.value instanceof HTMLInputElement && (p.value.focus(), p.value.setSelectionRange(i, i));
      }
      if (f.value instanceof HTMLInputElement && document.activeElement === f.value) {
        const i = f.value.selectionStart;
        f.value instanceof HTMLInputElement && (f.value.focus(), f.value.setSelectionRange(i, i));
      }
    });
    const Ue = V(() => ({
      transform: "translateX(" + (s.isRtl ? s.width - b.value : v.value) + "px)",
      width: b.value - v.value + 15 + "px",
      background: n.activeBarColor
    })), Fe = V(() => ({
      transform: "translateX(" + (s.isRtl ? s.width - v.value + (w.value ? 7.5 : -7.5) : v.value - 7.5) + "px)"
    })), Xe = V(() => ({
      transform: "translateX(" + (s.isRtl ? s.width - s.anchor2PositionV - 7.5 : s.anchor2PositionV + 7.5) + "px)"
    })), He = V(() => {
      let i = ((s.isRtl ? s.width - b.value - E / 2 : b.value - E / 2) + (s.isRtl ? s.width - v.value - E / 2 : v.value - E / 2)) / 2 - (s.input1Width + s.input2Width + s.dashInput) / 2 + 1;
      return i = Math.max(i, -10), i = Math.min(i, s.width - (s.input1Width + s.input2Width + s.dashInput) + 10), {
        transform: "translateX(" + i + "px)",
        width: b.value - v.value + "px",
        direction: s.isRtl ? "rtl" : "ltr",
        minWidth: s.input1Width + s.input2Width + s.dashInput + 6 + "px"
      };
    }), je = (i, d) => {
      d.preventDefault(), s.isDragging = !0, s.draggingAnchor = i, s.dragStartX = d.x, i == 1 ? s.dragStartPosition = v.value : s.dragStartPosition = b.value;
      const m = window;
      m.$SRSMouseMove = (M) => {
        M.preventDefault(), i == 1 ? s.isRtl ? v.value = s.dragStartPosition + s.dragStartX - M.x : v.value = s.dragStartPosition - s.dragStartX + M.x : s.isRtl ? b.value = s.dragStartPosition + s.dragStartX - M.x : b.value = s.dragStartPosition - s.dragStartX + M.x;
      };
      const D = () => {
        s.isDragging = !1, document.removeEventListener("mouseup", D), document.removeEventListener("mousemove", m.$SRSMouseMove);
      };
      document.addEventListener("mousemove", m.$SRSMouseMove), document.addEventListener("mouseup", D);
    }, $e = (i, d) => {
      if (s.changingByKey)
        return;
      s.changingByKey = !0;
      let m = 40, D = 0;
      const M = () => {
        !s.isRtl && (d.code === "ArrowDown" || d.code === "ArrowLeft") || s.isRtl && (d.code === "ArrowUp" || d.code === "ArrowRight") ? (i == 1 && v.value--, i == 2 && b.value--) : (!s.isRtl && (d.code === "ArrowUp" || d.code === "ArrowRight") || s.isRtl && (d.code === "ArrowDown" || d.code === "ArrowLeft")) && (i == 1 && v.value++, i == 2 && b.value++);
      };
      M();
      const ze = setInterval(() => {
        D++, !(D < m) && (m > 1 && m--, M());
      }, 5);
      d.target instanceof HTMLElement && d.target.addEventListener("keyup", () => {
        s.changingByKey = !1, clearInterval(ze);
      });
    }, ve = (i, d) => {
      let m;
      return i.currentStyle ? m = i.currentStyle[d] : window.getComputedStyle && (m = document.defaultView.getComputedStyle(i, null).getPropertyValue(d)), m;
    };
    return { __sfc: !0, positionLimits: r, valueToPosition: o, positionToValue: l, roundValue: a, exp: u, unExp: c, props: n, emit: t, input1: p, input1Container: _, input2: f, input2Container: y, input_: S, bar: x, resizeObservers: h, state: s, anchorWidth: E, updateAnchor2Value: j, updateAnchor1Value: J, scale: $, anchor2Position: b, anchor1Position: v, isRange: w, anchor1Value: P, anchor2Value: L, iValue: g, input1KeydownUD: fe, input1Keydown: We, input2KeydownUD: de, input2Keydown: Be, isPopoverMerged: pe, barStyle: Ue, anchor1Style: Fe, anchor2Style: Xe, mergedPopoverStyle: He, mouseDown: je, keyDown: $e, getStyle: ve };
  }
});
function Dt(e, t, n, r, o, l, a, u) {
  var c = typeof e == "function" ? e.options : e;
  t && (c.render = t, c.staticRenderFns = n, c._compiled = !0), r && (c.functional = !0), l && (c._scopeId = "data-v-" + l);
  var p;
  if (a ? (p = function(y) {
    y = y || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, !y && typeof __VUE_SSR_CONTEXT__ < "u" && (y = __VUE_SSR_CONTEXT__), o && o.call(this, y), y && y._registeredComponents && y._registeredComponents.add(a);
  }, c._ssrRegister = p) : o && (p = u ? function() {
    o.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot);
  } : o), p)
    if (c.functional) {
      c._injectStyles = p;
      var _ = c.render;
      c.render = function(S, x) {
        return p.call(x), _(S, x);
      };
    } else {
      var f = c.beforeCreate;
      c.beforeCreate = f ? [].concat(f, p) : [p];
    }
  return {
    exports: e,
    options: c
  };
}
var Mt = function() {
  var o, l, a, u;
  var t = this, n = t._self._c, r = t._self._setupProxy;
  return n("div", { staticClass: "simple-range-slider" }, [n("div", { ref: "bar", staticClass: "simple-range-slider-bg-bar", style: { background: t.barColor } }, [r.isRange ? n("div", { staticClass: "simple-range-slider-bar", style: r.barStyle }) : t._e(), r.isPopoverMerged ? n("div", { staticClass: "simple-range-slider-popover simple-range-slider-merged-popover", staticStyle: { right: "unset" }, style: r.mergedPopoverStyle }, [n("div", { ref: "input1Container", staticClass: "simple-range-slider-input-container" }, [t._t("prefix", null, { value: r.anchor1Value }), n("div", { ref: "input1", staticClass: "input1", staticStyle: { display: "inline-block" }, attrs: { contenteditable: "true" }, domProps: { innerHTML: t._s((o = r.anchor1Value) == null ? void 0 : o.toLocaleString("en-US")) }, on: { keydown: r.input1Keydown } }), t._t("suffix", null, { value: r.anchor1Value })], 2), n("label", [n("div", { ref: "input_", staticStyle: { display: "inline-block", padding: "0 3px" } }, [t.$slots.splitter ? t._t("splitter") : [t._v("|")]], 2)]), n("div", { ref: "input2Container", staticClass: "simple-range-slider-input-container" }, [t._t("prefix", null, { value: r.anchor2Value }), n("div", { ref: "input2", staticClass: "input2", staticStyle: { display: "inline-block" }, attrs: { contenteditable: "true" }, domProps: { textContent: t._s((l = r.anchor2Value) == null ? void 0 : l.toLocaleString("en-US")) }, on: { keydown: r.input2Keydown } }), t._t("suffix", null, { value: r.anchor2Value })], 2)]) : t._e(), n("div", { staticClass: "simple-range-slider-anchor", style: r.anchor1Style }, [n("div", { staticClass: "simple-range-slider-handle", attrs: { tabindex: "1" }, on: { mousedown: function(c) {
    return c.preventDefault(), c.stopPropagation(), r.mouseDown(1, c);
  }, keydown: function(c) {
    return r.keyDown(1, c);
  } } }), r.isPopoverMerged ? t._e() : n("div", { staticClass: "simple-range-slider-popover simple-range-slider-popover-left", style: {
    right: r.state.isRtl ? "0 !important" : "",
    left: r.state.isRtl ? "unset" : ""
  } }, [n("div", { ref: "input1Container", staticClass: "simple-range-slider-input-container" }, [t._t("prefix", null, { value: r.input1Keydown }), n("div", { ref: "input1", staticClass: "input1", staticStyle: { display: "inline-block" }, attrs: { contenteditable: "true" }, domProps: { textContent: t._s((a = r.anchor1Value) == null ? void 0 : a.toLocaleString("en-US")) }, on: { keydown: r.input1Keydown } }), t._t("suffix", null, { value: r.input1Keydown })], 2)]), n("div", { staticClass: "simple-range-slider-popover-arrow" })]), r.isRange ? n("div", { staticClass: "simple-range-slider-anchor", style: r.anchor2Style }, [n("div", { staticClass: "simple-range-slider-handle", attrs: { tabindex: "1" }, on: { mousedown: function(c) {
    return c.preventDefault(), c.stopPropagation(), r.mouseDown(2, c);
  }, keydown: function(c) {
    return r.keyDown(2, c);
  } } }), r.isPopoverMerged ? t._e() : n("div", { staticClass: "simple-range-slider-popover simple-range-slider-popover-right", style: {
    left: r.state.isRtl ? "-3px !important" : "",
    right: r.state.isRtl ? "unset !important" : ""
  } }, [n("div", { ref: "input2Container", staticClass: "simple-range-slider-input-container" }, [t._t("prefix", null, { value: r.input2Keydown }), n("div", { ref: "input2", staticClass: "input2", staticStyle: { display: "inline-block" }, attrs: { contenteditable: "true" }, domProps: { textContent: t._s((u = r.anchor2Value) == null ? void 0 : u.toLocaleString("en-US")) }, on: { keydown: r.input2Keydown } }), t._t("suffix", null, { value: r.input2Keydown })], 2)]), n("div", { staticClass: "simple-range-slider-popover-arrow" })]) : t._e()])]);
}, Nt = [], It = /* @__PURE__ */ Dt(Pt, Mt, Nt, !1, null, "66e9e17d", null, null);
const kt = It.exports;
export {
  kt as default
};
