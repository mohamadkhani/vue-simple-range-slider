import { defineComponent as te, ref as T, reactive as de, onMounted as ce, onUnmounted as fe, computed as h, watch as N, openBlock as I, createElementBlock as L, createElementVNode as f, normalizeStyle as C, unref as a, createCommentVNode as F, renderSlot as V, Fragment as ve, toDisplayString as q, withModifiers as Z, createTextVNode as pe, pushScopeId as ge, popScopeId as me } from "vue";
import { isVue2 as $ } from "vue-demi";
const ye = Math.max, he = Math.min;
function ee(y, g, r) {
  let w, S, P, M, m, b, p = 0, W = !1, d = !1, E = !0;
  if (typeof y != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  g = Number(g) || 0, typeof r == "object" && (W = !!r.leading, d = "maxWait" in r, P = d ? ye(Number(r.maxWait) || 0, g) : P, E = "trailing" in r ? !!r.trailing : E);
  function _(i) {
    let o = w, u = S;
    return w = S = void 0, p = i, M = y.apply(u, o), M;
  }
  function D(i) {
    return p = i, m = setTimeout(t, g), W ? _(i) : M;
  }
  function H(i) {
    let o = i - b, u = i - p, x = g - o;
    return console.log("remainingWait"), d ? he(x, P - u) : x;
  }
  function c(i) {
    let o = i - b, u = i - p;
    return b === void 0 || o >= g || o < 0 || d && u >= P;
  }
  function t() {
    const i = Date.now();
    if (c(i))
      return A(i);
    m = setTimeout(t, H(i));
  }
  function A(i) {
    return m = void 0, E && w ? _(i) : (w = S = void 0, M);
  }
  function J() {
    m !== void 0 && clearTimeout(m), p = 0, w = b = S = m = void 0;
  }
  function j() {
    return m === void 0 ? M : A(Date.now());
  }
  function K() {
    let i = Date.now(), o = c(i);
    if (w = arguments, S = this, b = i, o) {
      if (m === void 0)
        return D(b);
      if (d)
        return m = setTimeout(t, g), _(b);
    }
    return m === void 0 && (m = setTimeout(t, g)), M;
  }
  return K.cancel = J, K.flush = j, K;
}
const ne = (y) => (ge("data-v-d4a25ad5"), y = y(), me(), y), we = ["innerHTML"], Se = /* @__PURE__ */ pe("|"), Re = /* @__PURE__ */ ne(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), be = /* @__PURE__ */ ne(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), Ae = te({
  name: "VueSimpleRangeSlider"
}), xe = /* @__PURE__ */ te({
  ...Ae,
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
  setup(y, { emit: g }) {
    var Y;
    const r = y, w = (e, n) => (n === 2 && (e = Math.min(t.width, Math.max(t.anchor1PositionV, e))), n === 1 && (e = Math.max(0, Math.min(u.value ? t.anchor2PositionV : t.width, e))), e), S = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        return b((e - r.min) / n, n) * t.width;
      } else
        return (e - r.min) * K.value;
    }, P = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        let s = Math.round(m(e / t.width, n) * n) + r.min;
        return r.keepJustSignificantFigures && (s = M(s)), s;
      } else
        return r.min + Math.round(e / K.value);
    }, M = (e) => Number(e.toPrecision(r.significantFigures)), m = (e, n) => {
      const s = Math.E + n;
      return (Math.pow(s, e) - 1) / (Math.pow(s, 1) - 1);
    }, b = (e, n) => {
      const s = Math.E;
      return Math.log(e * (n + s) + 1) / Math.log(s + n);
    }, p = T(), W = T(), d = T(), E = T(), _ = T(), D = T(), H = T(), c = {}, t = de({
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
    }), A = 15;
    ce(() => {
      var e;
      ue(H.value, "direction") === "rtl" && (t.isRtl = !0), c.ro3 = new ResizeObserver((n) => {
        t.width = n[0].contentRect.width - (u.value ? A : 0);
      }), D.value && (c.ro3.unobserve(D.value), t.width = ((e = D.value.getBoundingClientRect()) == null ? void 0 : e.width) - (u.value ? A : 0));
    }), fe(() => {
      var e;
      (e = c == null ? void 0 : c.ro3) == null || e.disconnect();
    });
    const J = (e) => {
      U.value = P(e);
    }, j = (e) => {
      x.value = P(e);
    }, K = h(() => t.width / (r.max - r.min)), i = h({
      get: () => t.anchor2PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = w(e, 2), t.anchor2PositionV !== e && (t.anchor2PositionV = e), J(e));
      }
    }), o = h({
      get: () => t.anchor1PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = w(e, 1), t.anchor1PositionV !== e && (t.anchor1PositionV = e), j(e));
      }
    }), u = h(() => Array.isArray(l.value)), x = h({
      get: () => u.value && Array.isArray(l.value) ? l.value[0] : !u.value && !Array.isArray(l.value) ? l.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(l.value)) {
          if (e === l.value[0])
            return;
          l.value = [e || 0, l.value[1]];
        } else if (!u.value && !Array.isArray(l.value)) {
          if (e === l.value)
            return;
          l.value = e;
        }
      }
    }), U = h({
      get: () => u.value && Array.isArray(l.value) ? l.value[1] : !u.value && !Array.isArray(l.value) ? l.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(l.value)) {
          if (e === l.value[1])
            return;
          l.value = [l.value[0], e || 0];
        } else if (!u.value && !Array.isArray(l.value)) {
          if (e === l.value)
            return;
          l.value = e;
        }
      }
    }), ie = (Y = process == null ? void 0 : process.env) == null ? void 0 : Y.ISVUE2, re = process == null ? void 0 : process.env, l = h({
      get: () => (console.log("isVue", ie), console.log("env", re), $ ? r.value : r.modelValue),
      set: (e) => {
        Array.isArray(e) && Array.isArray(r.modelValue) && e[0] === r.modelValue[0] && e[1] === r.modelValue[1] || !Array.isArray(e) && e === r.modelValue || g($ ? "input" : "update:model-value", e);
      }
    });
    N(() => W.value, (e) => {
      c.ro1 && c.ro1.disconnect(), c.ro1 = new ResizeObserver((n) => {
        t.input1Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro1.observe(e);
    }, { immediate: !0 }), N(() => E.value, (e) => {
      c.ro2 && c.ro2.disconnect(), c.ro2 = new ResizeObserver((n) => {
        t.input2Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro2.observe(e);
    }, { immediate: !0 }), N(() => _.value, (e) => {
      var n;
      t.dashInput = ((n = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : n.width) || 30;
    }, {
      immediate: !0
    }), N(() => l.value, (e, n) => {
      t.isDragging || (Array.isArray(e) ? (o.value = S(e[0]), i.value = S(e[1])) : e ? o.value = S(e) : o.value = 0);
    }, { immediate: !0 });
    const B = ee((e) => {
      setTimeout(() => {
        var n;
        x.value = Number.parseInt(((n = d.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, 1e3), X = ee((e) => {
      setTimeout(() => {
        var n;
        U.value = Number.parseInt(((n = d.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, 1e3), O = h(() => i.value - o.value < t.input1Width + t.input2Width - 15 && u.value);
    N(() => O.value, () => {
      if (p.value instanceof HTMLInputElement && document.activeElement === p.value) {
        const e = p.value.selectionStart;
        p.value instanceof HTMLInputElement && (p.value.focus(), p.value.setSelectionRange(e, e));
      }
      if (d.value instanceof HTMLInputElement && document.activeElement === d.value) {
        const e = d.value.selectionStart;
        d.value instanceof HTMLInputElement && (d.value.focus(), d.value.setSelectionRange(e, e));
      }
    });
    const ae = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - i.value : o.value) + "px)",
      width: i.value - o.value + 15 + "px",
      background: r.activeBarColor
    })), oe = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - o.value + (u.value ? 7.5 : -7.5) : o.value - 7.5) + "px)"
    })), le = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - t.anchor2PositionV - 7.5 : t.anchor2PositionV + 7.5) + "px)"
    })), se = h(() => {
      let e = ((t.isRtl ? t.width - i.value - A / 2 : i.value - A / 2) + (t.isRtl ? t.width - o.value - A / 2 : o.value - A / 2)) / 2 - (t.input1Width + t.input2Width + t.dashInput) / 2 + 1;
      return e = Math.max(e, -10), e = Math.min(e, t.width - (t.input1Width + t.input2Width + t.dashInput) + 10), {
        transform: "translateX(" + e + "px)",
        width: i.value - o.value + "px",
        direction: t.isRtl ? "rtl" : "ltr",
        minWidth: t.input1Width + t.input2Width + t.dashInput + 6 + "px"
      };
    }), G = (e, n) => {
      n.preventDefault(), t.isDragging = !0, t.draggingAnchor = e, t.dragStartX = n.x, e == 1 ? t.dragStartPosition = o.value : t.dragStartPosition = i.value;
      const s = window;
      s.$SRSMouseMove = (R) => {
        R.preventDefault(), e == 1 ? t.isRtl ? o.value = t.dragStartPosition + t.dragStartX - R.x : o.value = t.dragStartPosition - t.dragStartX + R.x : t.isRtl ? i.value = t.dragStartPosition + t.dragStartX - R.x : i.value = t.dragStartPosition - t.dragStartX + R.x;
      };
      const k = () => {
        t.isDragging = !1, document.removeEventListener("mouseup", k), document.removeEventListener("mousemove", s.$SRSMouseMove);
      };
      document.addEventListener("mousemove", s.$SRSMouseMove), document.addEventListener("mouseup", k);
    }, Q = (e, n) => {
      if (t.changingByKey)
        return;
      t.changingByKey = !0;
      let s = 40, k = 0;
      const R = () => {
        !t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft") || t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") ? (e == 1 && o.value--, e == 2 && i.value--) : (!t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") || t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft")) && (e == 1 && o.value++, e == 2 && i.value++);
      };
      R();
      const z = setInterval(() => {
        k++, !(k < s) && (s > 1 && s--, R());
      }, 5);
      n.target instanceof HTMLElement && n.target.addEventListener("keyup", () => {
        t.changingByKey = !1, clearInterval(z);
      });
    }, ue = (e, n) => {
      let s;
      return e.currentStyle ? s = e.currentStyle[n] : window.getComputedStyle && (s = document.defaultView.getComputedStyle(e, null).getPropertyValue(n)), s;
    };
    return (e, n) => {
      var s, k, R, z;
      return I(), L("div", {
        class: "simple-range-slider",
        ref_key: "root",
        ref: H
      }, [
        f("div", {
          class: "simple-range-slider-bg-bar",
          style: C({ background: y.barColor }),
          ref_key: "bar",
          ref: D
        }, [
          a(u) ? (I(), L("div", {
            key: 0,
            class: "simple-range-slider-bar",
            style: C(a(ae))
          }, null, 4)) : F("", !0),
          a(O) ? (I(), L("div", {
            key: 1,
            style: C([{ right: "unset" }, a(se)]),
            class: "simple-range-slider-popover simple-range-slider-merged-popover"
          }, [
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input1Container",
              ref: W
            }, [
              V(e.$slots, "prefix", { value: a(x) }, void 0, !0),
              f("div", {
                ref_key: "input1",
                ref: p,
                class: "input1",
                style: { display: "inline-block" },
                contenteditable: "true",
                innerHTML: (s = a(x)) == null ? void 0 : s.toLocaleString("en-US"),
                onKeydown: n[0] || (n[0] = (...v) => a(B) && a(B)(...v))
              }, null, 40, we),
              V(e.$slots, "suffix", { value: a(x) }, void 0, !0)
            ], 512),
            f("label", null, [
              f("div", {
                style: { display: "inline-block", padding: "0 3px" },
                ref_key: "input_",
                ref: _
              }, [
                e.$slots.splitter ? V(e.$slots, "splitter", { key: 0 }, void 0, !0) : (I(), L(ve, { key: 1 }, [
                  Se
                ], 64))
              ], 512)
            ]),
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input2Container",
              ref: E
            }, [
              V(e.$slots, "prefix", { value: a(U) }, void 0, !0),
              f("div", {
                ref_key: "input2",
                ref: d,
                class: "input2",
                style: { display: "inline-block" },
                contenteditable: "true",
                onKeydown: n[1] || (n[1] = (...v) => a(X) && a(X)(...v))
              }, q((k = a(U)) == null ? void 0 : k.toLocaleString("en-US")), 545),
              V(e.$slots, "suffix", { value: a(U) }, void 0, !0)
            ], 512)
          ], 4)) : F("", !0),
          f("div", {
            class: "simple-range-slider-anchor",
            style: C(a(oe))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[2] || (n[2] = Z((v) => G(1, v), ["prevent", "stop"])),
              onKeydown: n[3] || (n[3] = (v) => Q(1, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? F("", !0) : (I(), L("div", {
              key: 0,
              style: C({
                right: t.isRtl ? "0 !important" : "",
                left: t.isRtl ? "unset" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-left"
            }, [
              f("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input1Container",
                ref: W
              }, [
                V(e.$slots, "prefix", { value: a(B) }, void 0, !0),
                f("div", {
                  ref_key: "input1",
                  ref: p,
                  class: "input1",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: n[4] || (n[4] = (...v) => a(B) && a(B)(...v))
                }, q((R = a(x)) == null ? void 0 : R.toLocaleString("en-US")), 545),
                V(e.$slots, "suffix", { value: a(B) }, void 0, !0)
              ], 512)
            ], 4)),
            Re
          ], 4),
          a(u) ? (I(), L("div", {
            key: 2,
            class: "simple-range-slider-anchor",
            style: C(a(le))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[5] || (n[5] = Z((v) => G(2, v), ["prevent", "stop"])),
              onKeydown: n[6] || (n[6] = (v) => Q(2, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? F("", !0) : (I(), L("div", {
              key: 0,
              style: C({
                left: t.isRtl ? "-3px !important" : "",
                right: t.isRtl ? "unset !important" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-right"
            }, [
              f("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input2Container",
                ref: E
              }, [
                V(e.$slots, "prefix", { value: a(X) }, void 0, !0),
                f("div", {
                  ref_key: "input2",
                  ref: d,
                  class: "input2",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: n[7] || (n[7] = (...v) => a(X) && a(X)(...v))
                }, q((z = a(U)) == null ? void 0 : z.toLocaleString("en-US")), 545),
                V(e.$slots, "suffix", { value: a(X) }, void 0, !0)
              ], 512)
            ], 4)),
            be
          ], 4)) : F("", !0)
        ], 4)
      ], 512);
    };
  }
});
const ke = (y, g) => {
  const r = y.__vccOpts || y;
  for (const [w, S] of g)
    r[w] = S;
  return r;
}, Te = /* @__PURE__ */ ke(xe, [["__scopeId", "data-v-d4a25ad5"]]);
export {
  Te as default
};
