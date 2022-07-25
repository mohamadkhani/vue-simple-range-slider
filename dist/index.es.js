import { defineComponent as te, ref as T, reactive as se, onMounted as ue, onUnmounted as de, computed as h, watch as N, openBlock as I, createElementBlock as L, createElementVNode as f, normalizeStyle as C, unref as a, createCommentVNode as F, renderSlot as V, Fragment as ce, toDisplayString as q, withModifiers as Z, createTextVNode as fe, pushScopeId as pe, popScopeId as ve } from "vue";
import { isVue2 as $ } from "vue-demi";
const ge = Math.max, me = Math.min;
function ee(y, g, r) {
  let w, S, E, M, m, R, v = 0, D = !1, d = !1, P = !0;
  if (typeof y != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  g = Number(g) || 0, typeof r == "object" && (D = !!r.leading, d = "maxWait" in r, E = d ? ge(Number(r.maxWait) || 0, g) : E, P = "trailing" in r ? !!r.trailing : P);
  function _(i) {
    let l = w, u = S;
    return w = S = void 0, v = i, M = y.apply(u, l), M;
  }
  function W(i) {
    return v = i, m = setTimeout(t, g), D ? _(i) : M;
  }
  function H(i) {
    let l = i - R, u = i - v, x = g - l;
    return console.log("remainingWait"), d ? me(x, E - u) : x;
  }
  function c(i) {
    let l = i - R, u = i - v;
    return R === void 0 || l >= g || l < 0 || d && u >= E;
  }
  function t() {
    const i = Date.now();
    if (c(i))
      return A(i);
    m = setTimeout(t, H(i));
  }
  function A(i) {
    return m = void 0, P && w ? _(i) : (w = S = void 0, M);
  }
  function J() {
    m !== void 0 && clearTimeout(m), v = 0, w = R = S = m = void 0;
  }
  function j() {
    return m === void 0 ? M : A(Date.now());
  }
  function K() {
    let i = Date.now(), l = c(i);
    if (w = arguments, S = this, R = i, l) {
      if (m === void 0)
        return W(R);
      if (d)
        return m = setTimeout(t, g), _(R);
    }
    return m === void 0 && (m = setTimeout(t, g)), M;
  }
  return K.cancel = J, K.flush = j, K;
}
const ne = (y) => (pe("data-v-fed9e47b"), y = y(), ve(), y), ye = ["innerHTML"], he = /* @__PURE__ */ fe("|"), we = /* @__PURE__ */ ne(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), Se = /* @__PURE__ */ ne(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), be = te({
  name: "VueSimpleRangeSlider"
}), Re = /* @__PURE__ */ te({
  ...be,
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
    const r = y, w = (e, n) => (n === 2 && (e = Math.min(t.width, Math.max(t.anchor1PositionV, e))), n === 1 && (e = Math.max(0, Math.min(u.value ? t.anchor2PositionV : t.width, e))), e), S = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        return R((e - r.min) / n, n) * t.width;
      } else
        return (e - r.min) * K.value;
    }, E = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        let s = Math.round(m(e / t.width, n) * n) + r.min;
        return r.keepJustSignificantFigures && (s = M(s)), s;
      } else
        return r.min + Math.round(e / K.value);
    }, M = (e) => Number(e.toPrecision(r.significantFigures)), m = (e, n) => {
      const s = Math.E + n;
      return (Math.pow(s, e) - 1) / (Math.pow(s, 1) - 1);
    }, R = (e, n) => {
      const s = Math.E;
      return Math.log(e * (n + s) + 1) / Math.log(s + n);
    }, v = T(), D = T(), d = T(), P = T(), _ = T(), W = T(), H = T(), c = {}, t = se({
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
    ue(() => {
      var e;
      oe(H.value, "direction") === "rtl" && (t.isRtl = !0), c.ro3 = new ResizeObserver((n) => {
        t.width = n[0].contentRect.width - (u.value ? A : 0);
      }), W.value && (c.ro3.unobserve(W.value), t.width = ((e = W.value.getBoundingClientRect()) == null ? void 0 : e.width) - (u.value ? A : 0));
    }), de(() => {
      var e;
      (e = c == null ? void 0 : c.ro3) == null || e.disconnect();
    });
    const J = (e) => {
      U.value = E(e);
    }, j = (e) => {
      x.value = E(e);
    }, K = h(() => t.width / (r.max - r.min)), i = h({
      get: () => t.anchor2PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = w(e, 2), t.anchor2PositionV !== e && (t.anchor2PositionV = e), J(e));
      }
    }), l = h({
      get: () => t.anchor1PositionV,
      set: (e) => {
        e != t.anchor1PositionV && (e = w(e, 1), t.anchor1PositionV !== e && (t.anchor1PositionV = e), j(e));
      }
    }), u = h(() => Array.isArray(o.value)), x = h({
      get: () => u.value && Array.isArray(o.value) ? o.value[0] : !u.value && !Array.isArray(o.value) ? o.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(o.value)) {
          if (e === o.value[0])
            return;
          o.value = [e || 0, o.value[1]];
        } else if (!u.value && !Array.isArray(o.value)) {
          if (e === o.value)
            return;
          o.value = e;
        }
      }
    }), U = h({
      get: () => u.value && Array.isArray(o.value) ? o.value[1] : !u.value && !Array.isArray(o.value) ? o.value : void 0,
      set: (e) => {
        if (u.value && Array.isArray(o.value)) {
          if (e === o.value[1])
            return;
          o.value = [o.value[0], e || 0];
        } else if (!u.value && !Array.isArray(o.value)) {
          if (e === o.value)
            return;
          o.value = e;
        }
      }
    }), G = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0 }.ISVUE2, o = h({
      get: () => $ || G ? r.value : r.modelValue,
      set: (e) => {
        Array.isArray(e) && Array.isArray(r.modelValue) && e[0] === r.modelValue[0] && e[1] === r.modelValue[1] || !Array.isArray(e) && e === r.modelValue || g($ || G ? "input" : "update:model-value", e);
      }
    });
    N(() => D.value, (e) => {
      c.ro1 && c.ro1.disconnect(), c.ro1 = new ResizeObserver((n) => {
        t.input1Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro1.observe(e);
    }, { immediate: !0 }), N(() => P.value, (e) => {
      c.ro2 && c.ro2.disconnect(), c.ro2 = new ResizeObserver((n) => {
        t.input2Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro2.observe(e);
    }, { immediate: !0 }), N(() => _.value, (e) => {
      var n;
      t.dashInput = ((n = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : n.width) || 30;
    }, {
      immediate: !0
    }), N(() => o.value, (e, n) => {
      t.isDragging || (Array.isArray(e) ? (l.value = S(e[0]), i.value = S(e[1])) : e ? l.value = S(e) : l.value = 0);
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
    }, 1e3), O = h(() => i.value - l.value < t.input1Width + t.input2Width - 15 && u.value);
    N(() => O.value, () => {
      if (v.value instanceof HTMLInputElement && document.activeElement === v.value) {
        const e = v.value.selectionStart;
        v.value instanceof HTMLInputElement && (v.value.focus(), v.value.setSelectionRange(e, e));
      }
      if (d.value instanceof HTMLInputElement && document.activeElement === d.value) {
        const e = d.value.selectionStart;
        d.value instanceof HTMLInputElement && (d.value.focus(), d.value.setSelectionRange(e, e));
      }
    });
    const ie = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - i.value : l.value) + "px)",
      width: i.value - l.value + 15 + "px",
      background: r.activeBarColor
    })), re = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - l.value + (u.value ? 7.5 : -7.5) : l.value - 7.5) + "px)"
    })), ae = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - t.anchor2PositionV - 7.5 : t.anchor2PositionV + 7.5) + "px)"
    })), le = h(() => {
      let e = ((t.isRtl ? t.width - i.value - A / 2 : i.value - A / 2) + (t.isRtl ? t.width - l.value - A / 2 : l.value - A / 2)) / 2 - (t.input1Width + t.input2Width + t.dashInput) / 2 + 1;
      return e = Math.max(e, -10), e = Math.min(e, t.width - (t.input1Width + t.input2Width + t.dashInput) + 10), {
        transform: "translateX(" + e + "px)",
        width: i.value - l.value + "px",
        direction: t.isRtl ? "rtl" : "ltr",
        minWidth: t.input1Width + t.input2Width + t.dashInput + 6 + "px"
      };
    }), Q = (e, n) => {
      n.preventDefault(), t.isDragging = !0, t.draggingAnchor = e, t.dragStartX = n.x, e == 1 ? t.dragStartPosition = l.value : t.dragStartPosition = i.value;
      const s = window;
      s.$SRSMouseMove = (b) => {
        b.preventDefault(), e == 1 ? t.isRtl ? l.value = t.dragStartPosition + t.dragStartX - b.x : l.value = t.dragStartPosition - t.dragStartX + b.x : t.isRtl ? i.value = t.dragStartPosition + t.dragStartX - b.x : i.value = t.dragStartPosition - t.dragStartX + b.x;
      };
      const k = () => {
        t.isDragging = !1, document.removeEventListener("mouseup", k), document.removeEventListener("mousemove", s.$SRSMouseMove);
      };
      document.addEventListener("mousemove", s.$SRSMouseMove), document.addEventListener("mouseup", k);
    }, Y = (e, n) => {
      if (t.changingByKey)
        return;
      t.changingByKey = !0;
      let s = 40, k = 0;
      const b = () => {
        !t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft") || t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") ? (e == 1 && l.value--, e == 2 && i.value--) : (!t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") || t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft")) && (e == 1 && l.value++, e == 2 && i.value++);
      };
      b();
      const z = setInterval(() => {
        k++, !(k < s) && (s > 1 && s--, b());
      }, 5);
      n.target instanceof HTMLElement && n.target.addEventListener("keyup", () => {
        t.changingByKey = !1, clearInterval(z);
      });
    }, oe = (e, n) => {
      let s;
      return e.currentStyle ? s = e.currentStyle[n] : window.getComputedStyle && (s = document.defaultView.getComputedStyle(e, null).getPropertyValue(n)), s;
    };
    return (e, n) => {
      var s, k, b, z;
      return I(), L("div", {
        class: "simple-range-slider",
        ref_key: "root",
        ref: H
      }, [
        f("div", {
          class: "simple-range-slider-bg-bar",
          style: C({ background: y.barColor }),
          ref_key: "bar",
          ref: W
        }, [
          a(u) ? (I(), L("div", {
            key: 0,
            class: "simple-range-slider-bar",
            style: C(a(ie))
          }, null, 4)) : F("", !0),
          a(O) ? (I(), L("div", {
            key: 1,
            style: C([{ right: "unset" }, a(le)]),
            class: "simple-range-slider-popover simple-range-slider-merged-popover"
          }, [
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input1Container",
              ref: D
            }, [
              V(e.$slots, "prefix", { value: a(x) }, void 0, !0),
              f("div", {
                ref_key: "input1",
                ref: v,
                class: "input1",
                style: { display: "inline-block" },
                contenteditable: "true",
                innerHTML: (s = a(x)) == null ? void 0 : s.toLocaleString("en-US"),
                onKeydown: n[0] || (n[0] = (...p) => a(B) && a(B)(...p))
              }, null, 40, ye),
              V(e.$slots, "suffix", { value: a(x) }, void 0, !0)
            ], 512),
            f("label", null, [
              f("div", {
                style: { display: "inline-block", padding: "0 3px" },
                ref_key: "input_",
                ref: _
              }, [
                e.$slots.splitter ? V(e.$slots, "splitter", { key: 0 }, void 0, !0) : (I(), L(ce, { key: 1 }, [
                  he
                ], 64))
              ], 512)
            ]),
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input2Container",
              ref: P
            }, [
              V(e.$slots, "prefix", { value: a(U) }, void 0, !0),
              f("div", {
                ref_key: "input2",
                ref: d,
                class: "input2",
                style: { display: "inline-block" },
                contenteditable: "true",
                onKeydown: n[1] || (n[1] = (...p) => a(X) && a(X)(...p))
              }, q((k = a(U)) == null ? void 0 : k.toLocaleString("en-US")), 545),
              V(e.$slots, "suffix", { value: a(U) }, void 0, !0)
            ], 512)
          ], 4)) : F("", !0),
          f("div", {
            class: "simple-range-slider-anchor",
            style: C(a(re))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[2] || (n[2] = Z((p) => Q(1, p), ["prevent", "stop"])),
              onKeydown: n[3] || (n[3] = (p) => Y(1, p)),
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
                ref: D
              }, [
                V(e.$slots, "prefix", { value: a(B) }, void 0, !0),
                f("div", {
                  ref_key: "input1",
                  ref: v,
                  class: "input1",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: n[4] || (n[4] = (...p) => a(B) && a(B)(...p))
                }, q((b = a(x)) == null ? void 0 : b.toLocaleString("en-US")), 545),
                V(e.$slots, "suffix", { value: a(B) }, void 0, !0)
              ], 512)
            ], 4)),
            we
          ], 4),
          a(u) ? (I(), L("div", {
            key: 2,
            class: "simple-range-slider-anchor",
            style: C(a(ae))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[5] || (n[5] = Z((p) => Q(2, p), ["prevent", "stop"])),
              onKeydown: n[6] || (n[6] = (p) => Y(2, p)),
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
                ref: P
              }, [
                V(e.$slots, "prefix", { value: a(X) }, void 0, !0),
                f("div", {
                  ref_key: "input2",
                  ref: d,
                  class: "input2",
                  contenteditable: "true",
                  style: { display: "inline-block" },
                  onKeydown: n[7] || (n[7] = (...p) => a(X) && a(X)(...p))
                }, q((z = a(U)) == null ? void 0 : z.toLocaleString("en-US")), 545),
                V(e.$slots, "suffix", { value: a(X) }, void 0, !0)
              ], 512)
            ], 4)),
            Se
          ], 4)) : F("", !0)
        ], 4)
      ], 512);
    };
  }
});
const Ae = (y, g) => {
  const r = y.__vccOpts || y;
  for (const [w, S] of g)
    r[w] = S;
  return r;
}, Ee = /* @__PURE__ */ Ae(Re, [["__scopeId", "data-v-fed9e47b"]]);
export {
  Ee as default
};
