import { defineComponent as Z, ref as U, reactive as ae, onMounted as oe, getCurrentInstance as le, onUnmounted as se, computed as w, watch as X, openBlock as T, createElementBlock as E, createElementVNode as c, normalizeStyle as I, unref as a, createCommentVNode as N, renderSlot as V, Fragment as ue, toDisplayString as j, withModifiers as Q, createTextVNode as de, pushScopeId as ce, popScopeId as fe } from "vue";
const ve = Math.max, pe = Math.min;
function Y(m, y, r) {
  let S, x, P, C, g, k, p = 0, L = !1, u = !1, _ = !0;
  if (typeof m != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  y = Number(y) || 0, typeof r == "object" && (L = !!r.leading, u = "maxWait" in r, P = u ? ve(Number(r.maxWait) || 0, y) : P, _ = "trailing" in r ? !!r.trailing : _);
  function W(i) {
    let l = S, h = x;
    return S = x = void 0, p = i, C = m.apply(h, l), C;
  }
  function D(i) {
    return p = i, g = setTimeout(R, y), L ? W(i) : C;
  }
  function f(i) {
    let l = i - k, h = i - p, M = y - l;
    return console.log("remainingWait"), u ? pe(M, P - h) : M;
  }
  function t(i) {
    let l = i - k, h = i - p;
    return k === void 0 || l >= y || l < 0 || u && h >= P;
  }
  function R() {
    const i = Date.now();
    if (t(i))
      return F(i);
    g = setTimeout(R, f(i));
  }
  function F(i) {
    return g = void 0, _ && S ? W(i) : (S = x = void 0, C);
  }
  function J() {
    g !== void 0 && clearTimeout(g), p = 0, S = k = x = g = void 0;
  }
  function H() {
    return g === void 0 ? C : F(Date.now());
  }
  function d() {
    let i = Date.now(), l = t(i);
    if (S = arguments, x = this, k = i, l) {
      if (g === void 0)
        return D(k);
      if (u)
        return g = setTimeout(R, y), W(k);
    }
    return g === void 0 && (g = setTimeout(R, y)), C;
  }
  return d.cancel = J, d.flush = H, d;
}
const $ = (m) => (ce("data-v-8bfea492"), m = m(), fe(), m), ge = { class: "simple-range-slider" }, me = ["innerHTML"], ye = /* @__PURE__ */ de("|"), he = ["textContent"], we = ["textContent"], Se = /* @__PURE__ */ $(() => /* @__PURE__ */ c("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), xe = ["textContent"], Re = /* @__PURE__ */ $(() => /* @__PURE__ */ c("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), be = Z({
  name: "VueSimpleRangeSlider"
}), Ae = /* @__PURE__ */ Z({
  ...be,
  props: {
    modelValue: null,
    value: null,
    exponential: { type: Boolean, default: !1 },
    barColor: null,
    activeBarColor: null,
    max: { default: 100 },
    min: { default: 0 },
    keepJustSignificantFigures: { type: Boolean, default: !0 },
    significantFigures: { default: 2 }
  },
  emits: ["input", "update:model-value"],
  setup(m, { emit: y }) {
    const r = m, S = (e, n) => (n === 2 && (e = Math.min(t.width, Math.max(t.anchor1PositionV, e))), n === 1 && (e = Math.max(0, Math.min(l.value ? t.anchor2PositionV : t.width, e))), e), x = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        return k((e - r.min) / n, n) * t.width;
      } else
        return (e - r.min) * H.value;
    }, P = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        let o = Math.round(g(e / t.width, n) * n) + r.min;
        return r.keepJustSignificantFigures && (o = C(o)), o;
      } else
        return r.min + Math.round(e / H.value);
    }, C = (e) => Number(e.toPrecision(r.significantFigures)), g = (e, n) => {
      const o = Math.E + n;
      return (Math.pow(o, e) - 1) / (Math.pow(o, 1) - 1);
    }, k = (e, n) => {
      const o = Math.E;
      return Math.log(e * (n + o) + 1) / Math.log(o + n);
    }, p = U(), L = U(), u = U(), _ = U(), W = U(), D = U(), f = {}, t = ae({
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
    }), R = 15;
    oe(() => {
      var n, o;
      const e = le();
      re((n = e == null ? void 0 : e.proxy) == null ? void 0 : n.$el, "direction") === "rtl" && (t.isRtl = !0), f.ro3 = new ResizeObserver((b) => {
        t.width = b[0].contentRect.width - (l.value ? R : 0);
      }), D.value && (f.ro3.unobserve(D.value), t.width = ((o = D.value.getBoundingClientRect()) == null ? void 0 : o.width) - (l.value ? R : 0));
    }), se(() => {
      var e;
      (e = f == null ? void 0 : f.ro3) == null || e.disconnect();
    });
    const F = (e) => {
      M.value = P(e);
    }, J = (e) => {
      h.value = P(e);
    }, H = w(() => t.width / (r.max - r.min)), d = w({
      get: () => t.anchor2PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = S(e, 2), t.anchor2PositionV !== e && (t.anchor2PositionV = e), F(e));
      }
    }), i = w({
      get: () => t.anchor1PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = S(e, 1), t.anchor1PositionV !== e && (t.anchor1PositionV = e), J(e));
      }
    }), l = w(() => Array.isArray(s.value)), h = w({
      get: () => l.value && Array.isArray(s.value) ? s.value[0] : !l.value && !Array.isArray(s.value) ? s.value : void 0,
      set: (e) => {
        if (l.value && Array.isArray(s.value)) {
          if (e === s.value[0])
            return;
          s.value = [e || 0, s.value[1]];
        } else if (!l.value && !Array.isArray(s.value)) {
          if (e === s.value)
            return;
          s.value = e;
        }
      }
    }), M = w({
      get: () => l.value && Array.isArray(s.value) ? s.value[1] : !l.value && !Array.isArray(s.value) ? s.value : void 0,
      set: (e) => {
        if (l.value && Array.isArray(s.value)) {
          if (e === s.value[1])
            return;
          s.value = [s.value[0], e || 0];
        } else if (!l.value && !Array.isArray(s.value)) {
          if (e === s.value)
            return;
          s.value = e;
        }
      }
    }), s = w({
      get: () => r.modelValue,
      set: (e) => {
        Array.isArray(e) && Array.isArray(r.modelValue) && e[0] === r.modelValue[0] && e[1] === r.modelValue[1] || !Array.isArray(e) && e === r.modelValue || y("update:model-value", e);
      }
    });
    X(() => L.value, (e) => {
      f.ro1 && f.ro1.disconnect(), f.ro1 = new ResizeObserver((n) => {
        t.input1Width = n[0].target.getBoundingClientRect().width;
      }), e && f.ro1.observe(e);
    }, { immediate: !0 }), X(() => _.value, (e) => {
      f.ro2 && f.ro2.disconnect(), f.ro2 = new ResizeObserver((n) => {
        t.input2Width = n[0].target.getBoundingClientRect().width;
      }), e && f.ro2.observe(e);
    }, { immediate: !0 }), X(() => W.value, (e) => {
      var n;
      t.dashInput = ((n = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : n.width) || 30;
    }, {
      immediate: !0
    }), X(() => s.value, (e, n) => {
      t.isDragging || (Array.isArray(e) ? (i.value = x(e[0]), d.value = x(e[1])) : e ? i.value = x(e) : i.value = 0);
    }, { immediate: !0 });
    const K = Y((e) => {
      setTimeout(() => {
        var n;
        h.value = Number.parseInt(((n = u.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, 1e3), B = Y((e) => {
      setTimeout(() => {
        var n;
        M.value = Number.parseInt(((n = u.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, 1e3), O = w(() => d.value - i.value < t.input1Width + t.input2Width - 15 && l.value);
    X(() => O.value, () => {
      if (p.value instanceof HTMLInputElement && document.activeElement === p.value) {
        const e = p.value.selectionStart;
        p.value instanceof HTMLInputElement && (p.value.focus(), p.value.setSelectionRange(e, e));
      }
      if (u.value instanceof HTMLInputElement && document.activeElement === u.value) {
        const e = u.value.selectionStart;
        u.value instanceof HTMLInputElement && (u.value.focus(), u.value.setSelectionRange(e, e));
      }
    });
    const ee = w(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - d.value : i.value) + "px)",
      width: d.value - i.value + 15 + "px",
      background: r.activeBarColor
    })), te = w(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - i.value + (l.value ? 7.5 : -7.5) : i.value - 7.5) + "px)"
    })), ne = w(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - t.anchor2PositionV - 7.5 : t.anchor2PositionV + 7.5) + "px)"
    })), ie = w(() => {
      let e = ((t.isRtl ? t.width - d.value - R / 2 : d.value - R / 2) + (t.isRtl ? t.width - i.value - R / 2 : i.value - R / 2)) / 2 - (t.input1Width + t.input2Width + t.dashInput) / 2 + 1;
      return e = Math.max(e, -10), e = Math.min(e, t.width - (t.input1Width + t.input2Width + t.dashInput) + 10), {
        transform: "translateX(" + e + "px)",
        width: d.value - i.value + "px",
        direction: t.isRtl ? "rtl" : "ltr",
        minWidth: t.input1Width + t.input2Width + t.dashInput + 6 + "px"
      };
    }), q = (e, n) => {
      n.preventDefault(), t.isDragging = !0, t.draggingAnchor = e, t.dragStartX = n.x, e == 1 ? t.dragStartPosition = i.value : t.dragStartPosition = d.value;
      const o = window;
      o.$SRSMouseMove = (A) => {
        A.preventDefault(), e == 1 ? t.isRtl ? i.value = t.dragStartPosition + t.dragStartX - A.x : i.value = t.dragStartPosition - t.dragStartX + A.x : t.isRtl ? d.value = t.dragStartPosition + t.dragStartX - A.x : d.value = t.dragStartPosition - t.dragStartX + A.x;
      };
      const b = () => {
        t.isDragging = !1, document.removeEventListener("mouseup", b), document.removeEventListener("mousemove", o.$SRSMouseMove);
      };
      document.addEventListener("mousemove", o.$SRSMouseMove), document.addEventListener("mouseup", b);
    }, G = (e, n) => {
      if (t.changingByKey)
        return;
      t.changingByKey = !0;
      let o = 40, b = 0;
      const A = () => {
        !t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft") || t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") ? (e == 1 && i.value--, e == 2 && d.value--) : (!t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") || t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft")) && (e == 1 && i.value++, e == 2 && d.value++);
      };
      A();
      const z = setInterval(() => {
        b++, !(b < o) && (o > 1 && o--, A());
      }, 5);
      n.target instanceof HTMLElement && n.target.addEventListener("keyup", () => {
        t.changingByKey = !1, clearInterval(z);
      });
    }, re = (e, n) => {
      let o;
      return e.currentStyle ? o = e.currentStyle[n] : window.getComputedStyle && (o = document.defaultView.getComputedStyle(e, null).getPropertyValue(n)), o;
    };
    return (e, n) => {
      var o, b, A, z;
      return T(), E("div", ge, [
        c("div", {
          class: "simple-range-slider-bg-bar",
          style: I({ background: m.barColor }),
          ref_key: "bar",
          ref: D
        }, [
          a(l) ? (T(), E("div", {
            key: 0,
            class: "simple-range-slider-bar",
            style: I(a(ee))
          }, null, 4)) : N("", !0),
          a(O) ? (T(), E("div", {
            key: 1,
            style: I([{ right: "unset" }, a(ie)]),
            class: "simple-range-slider-popover simple-range-slider-merged-popover"
          }, [
            c("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input1Container",
              ref: L
            }, [
              V(e.$slots, "prefix", { value: a(h) }, void 0, !0),
              c("div", {
                ref_key: "input1",
                ref: p,
                class: "input1",
                style: { display: "inline-block" },
                contenteditable: "true",
                innerHTML: (o = a(h)) == null ? void 0 : o.toLocaleString("en-US"),
                onKeydown: n[0] || (n[0] = (...v) => a(K) && a(K)(...v))
              }, null, 40, me),
              V(e.$slots, "suffix", { value: a(h) }, void 0, !0)
            ], 512),
            c("label", null, [
              c("div", {
                style: { display: "inline-block", padding: "0 3px" },
                ref_key: "input_",
                ref: W
              }, [
                e.$slots.splitter ? V(e.$slots, "splitter", { key: 0 }, void 0, !0) : (T(), E(ue, { key: 1 }, [
                  ye
                ], 64))
              ], 512)
            ]),
            c("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input2Container",
              ref: _
            }, [
              V(e.$slots, "prefix", { value: a(M) }, void 0, !0),
              c("div", {
                ref_key: "input2",
                ref: u,
                class: "input2",
                style: { display: "inline-block" },
                contenteditable: "true",
                textContent: j((b = a(M)) == null ? void 0 : b.toLocaleString("en-US")),
                onKeydown: n[1] || (n[1] = (...v) => a(B) && a(B)(...v))
              }, null, 40, he),
              V(e.$slots, "suffix", { value: a(M) }, void 0, !0)
            ], 512)
          ], 4)) : N("", !0),
          c("div", {
            class: "simple-range-slider-anchor",
            style: I(a(te))
          }, [
            c("div", {
              tabindex: "1",
              onMousedown: n[2] || (n[2] = Q((v) => q(1, v), ["prevent", "stop"])),
              onKeydown: n[3] || (n[3] = (v) => G(1, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? N("", !0) : (T(), E("div", {
              key: 0,
              style: I({
                right: t.isRtl ? "0 !important" : "",
                left: t.isRtl ? "unset" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-left"
            }, [
              c("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input1Container",
                ref: L
              }, [
                V(e.$slots, "prefix", { value: a(K) }, void 0, !0),
                c("div", {
                  ref_key: "input1",
                  ref: p,
                  class: "input1",
                  contenteditable: "true",
                  textContent: j((A = a(h)) == null ? void 0 : A.toLocaleString("en-US")),
                  style: { display: "inline-block" },
                  onKeydown: n[4] || (n[4] = (...v) => a(K) && a(K)(...v))
                }, null, 40, we),
                V(e.$slots, "suffix", { value: a(K) }, void 0, !0)
              ], 512)
            ], 4)),
            Se
          ], 4),
          a(l) ? (T(), E("div", {
            key: 2,
            class: "simple-range-slider-anchor",
            style: I(a(ne))
          }, [
            c("div", {
              tabindex: "1",
              onMousedown: n[5] || (n[5] = Q((v) => q(2, v), ["prevent", "stop"])),
              onKeydown: n[6] || (n[6] = (v) => G(2, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? N("", !0) : (T(), E("div", {
              key: 0,
              style: I({
                left: t.isRtl ? "-3px !important" : "",
                right: t.isRtl ? "unset !important" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-right"
            }, [
              c("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input2Container",
                ref: _
              }, [
                V(e.$slots, "prefix", { value: a(B) }, void 0, !0),
                c("div", {
                  ref_key: "input2",
                  ref: u,
                  class: "input2",
                  contenteditable: "true",
                  textContent: j((z = a(M)) == null ? void 0 : z.toLocaleString("en-US")),
                  style: { display: "inline-block" },
                  onKeydown: n[7] || (n[7] = (...v) => a(B) && a(B)(...v))
                }, null, 40, xe),
                V(e.$slots, "suffix", { value: a(B) }, void 0, !0)
              ], 512)
            ], 4)),
            Re
          ], 4)) : N("", !0)
        ], 4)
      ]);
    };
  }
});
const ke = (m, y) => {
  const r = m.__vccOpts || m;
  for (const [S, x] of y)
    r[S] = x;
  return r;
}, Pe = /* @__PURE__ */ ke(Ae, [["__scopeId", "data-v-8bfea492"]]);
export {
  Pe as default
};
