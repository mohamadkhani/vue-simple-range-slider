import { defineComponent as ee, ref as T, reactive as le, onMounted as se, onUnmounted as ue, computed as h, watch as N, openBlock as _, createElementBlock as E, createElementVNode as f, normalizeStyle as L, unref as a, createCommentVNode as F, renderSlot as M, Fragment as de, toDisplayString as q, withModifiers as Y, createTextVNode as ce, pushScopeId as fe, popScopeId as ve } from "vue";
import { isVue2 as Z } from "vue-demi";
const pe = Math.max, ge = Math.min;
function $(y, g, r) {
  let w, S, C, V, m, R, p = 0, I = !1, d = !1, P = !0;
  if (typeof y != "function")
    throw new TypeError(FUNC_ERROR_TEXT);
  g = Number(g) || 0, typeof r == "object" && (I = !!r.leading, d = "maxWait" in r, C = d ? pe(Number(r.maxWait) || 0, g) : C, P = "trailing" in r ? !!r.trailing : P);
  function W(i) {
    let o = w, u = S;
    return w = S = void 0, p = i, V = y.apply(u, o), V;
  }
  function D(i) {
    return p = i, m = setTimeout(t, g), I ? W(i) : V;
  }
  function H(i) {
    let o = i - R, u = i - p, A = g - o;
    return console.log("remainingWait"), d ? ge(A, C - u) : A;
  }
  function c(i) {
    let o = i - R, u = i - p;
    return R === void 0 || o >= g || o < 0 || d && u >= C;
  }
  function t() {
    const i = Date.now();
    if (c(i))
      return b(i);
    m = setTimeout(t, H(i));
  }
  function b(i) {
    return m = void 0, P && w ? W(i) : (w = S = void 0, V);
  }
  function J() {
    m !== void 0 && clearTimeout(m), p = 0, w = R = S = m = void 0;
  }
  function j() {
    return m === void 0 ? V : b(Date.now());
  }
  function K() {
    let i = Date.now(), o = c(i);
    if (w = arguments, S = this, R = i, o) {
      if (m === void 0)
        return D(R);
      if (d)
        return m = setTimeout(t, g), W(R);
    }
    return m === void 0 && (m = setTimeout(t, g)), V;
  }
  return K.cancel = J, K.flush = j, K;
}
const te = (y) => (fe("data-v-62f5882c"), y = y(), ve(), y), me = ["innerHTML"], ye = /* @__PURE__ */ ce("|"), he = ["textContent"], we = ["textContent"], Se = /* @__PURE__ */ te(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), xe = ["textContent"], Re = /* @__PURE__ */ te(() => /* @__PURE__ */ f("div", { class: "simple-range-slider-popover-arrow" }, null, -1)), be = ee({
  name: "VueSimpleRangeSlider"
}), Ae = /* @__PURE__ */ ee({
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
    }, C = (e) => {
      if (r.exponential) {
        const n = r.max - r.min;
        let s = Math.round(m(e / t.width, n) * n) + r.min;
        return r.keepJustSignificantFigures && (s = V(s)), s;
      } else
        return r.min + Math.round(e / K.value);
    }, V = (e) => Number(e.toPrecision(r.significantFigures)), m = (e, n) => {
      const s = Math.E + n;
      return (Math.pow(s, e) - 1) / (Math.pow(s, 1) - 1);
    }, R = (e, n) => {
      const s = Math.E;
      return Math.log(e * (n + s) + 1) / Math.log(s + n);
    }, p = T(), I = T(), d = T(), P = T(), W = T(), D = T(), H = T(), c = {}, t = le({
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
    }), b = 15;
    se(() => {
      var e;
      oe(H.value, "direction") === "rtl" && (t.isRtl = !0), c.ro3 = new ResizeObserver((n) => {
        t.width = n[0].contentRect.width - (u.value ? b : 0);
      }), D.value && (c.ro3.unobserve(D.value), t.width = ((e = D.value.getBoundingClientRect()) == null ? void 0 : e.width) - (u.value ? b : 0));
    }), ue(() => {
      var e;
      (e = c == null ? void 0 : c.ro3) == null || e.disconnect();
    });
    const J = (e) => {
      B.value = C(e);
    }, j = (e) => {
      A.value = C(e);
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
    }), u = h(() => Array.isArray(l.value)), A = h({
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
    }), B = h({
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
    }), l = h({
      get: () => Z ? r.value : r.modelValue,
      set: (e) => {
        Array.isArray(e) && Array.isArray(r.modelValue) && e[0] === r.modelValue[0] && e[1] === r.modelValue[1] || !Array.isArray(e) && e === r.modelValue || g(Z ? "input" : "update:model-value", e);
      }
    });
    N(() => I.value, (e) => {
      c.ro1 && c.ro1.disconnect(), c.ro1 = new ResizeObserver((n) => {
        t.input1Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro1.observe(e);
    }, { immediate: !0 }), N(() => P.value, (e) => {
      c.ro2 && c.ro2.disconnect(), c.ro2 = new ResizeObserver((n) => {
        t.input2Width = n[0].target.getBoundingClientRect().width;
      }), e && c.ro2.observe(e);
    }, { immediate: !0 }), N(() => W.value, (e) => {
      var n;
      t.dashInput = ((n = e == null ? void 0 : e.getBoundingClientRect()) == null ? void 0 : n.width) || 30;
    }, {
      immediate: !0
    }), N(() => l.value, (e, n) => {
      t.isDragging || (Array.isArray(e) ? (o.value = S(e[0]), i.value = S(e[1])) : e ? o.value = S(e) : o.value = 0);
    }, { immediate: !0 });
    const U = $((e) => {
      setTimeout(() => {
        var n;
        A.value = Number.parseInt(((n = d.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
      }, 100);
    }, 1e3), X = $((e) => {
      setTimeout(() => {
        var n;
        B.value = Number.parseInt(((n = d.value) == null ? void 0 : n.innerText.replace(/,/, "")) || "0");
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
    const ne = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - i.value : o.value) + "px)",
      width: i.value - o.value + 15 + "px",
      background: r.activeBarColor
    })), ie = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - o.value + (u.value ? 7.5 : -7.5) : o.value - 7.5) + "px)"
    })), re = h(() => ({
      transform: "translateX(" + (t.isRtl ? t.width - t.anchor2PositionV - 7.5 : t.anchor2PositionV + 7.5) + "px)"
    })), ae = h(() => {
      let e = ((t.isRtl ? t.width - i.value - b / 2 : i.value - b / 2) + (t.isRtl ? t.width - o.value - b / 2 : o.value - b / 2)) / 2 - (t.input1Width + t.input2Width + t.dashInput) / 2 + 1;
      return e = Math.max(e, -10), e = Math.min(e, t.width - (t.input1Width + t.input2Width + t.dashInput) + 10), {
        transform: "translateX(" + e + "px)",
        width: i.value - o.value + "px",
        direction: t.isRtl ? "rtl" : "ltr",
        minWidth: t.input1Width + t.input2Width + t.dashInput + 6 + "px"
      };
    }), G = (e, n) => {
      n.preventDefault(), t.isDragging = !0, t.draggingAnchor = e, t.dragStartX = n.x, e == 1 ? t.dragStartPosition = o.value : t.dragStartPosition = i.value;
      const s = window;
      s.$SRSMouseMove = (x) => {
        x.preventDefault(), e == 1 ? t.isRtl ? o.value = t.dragStartPosition + t.dragStartX - x.x : o.value = t.dragStartPosition - t.dragStartX + x.x : t.isRtl ? i.value = t.dragStartPosition + t.dragStartX - x.x : i.value = t.dragStartPosition - t.dragStartX + x.x;
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
      const x = () => {
        !t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft") || t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") ? (e == 1 && o.value--, e == 2 && i.value--) : (!t.isRtl && (n.code === "ArrowUp" || n.code === "ArrowRight") || t.isRtl && (n.code === "ArrowDown" || n.code === "ArrowLeft")) && (e == 1 && o.value++, e == 2 && i.value++);
      };
      x();
      const z = setInterval(() => {
        k++, !(k < s) && (s > 1 && s--, x());
      }, 5);
      n.target instanceof HTMLElement && n.target.addEventListener("keyup", () => {
        t.changingByKey = !1, clearInterval(z);
      });
    }, oe = (e, n) => {
      let s;
      return e.currentStyle ? s = e.currentStyle[n] : window.getComputedStyle && (s = document.defaultView.getComputedStyle(e, null).getPropertyValue(n)), s;
    };
    return (e, n) => {
      var s, k, x, z;
      return _(), E("div", {
        class: "simple-range-slider",
        ref_key: "root",
        ref: H
      }, [
        f("div", {
          class: "simple-range-slider-bg-bar",
          style: L({ background: y.barColor }),
          ref_key: "bar",
          ref: D
        }, [
          a(u) ? (_(), E("div", {
            key: 0,
            class: "simple-range-slider-bar",
            style: L(a(ne))
          }, null, 4)) : F("", !0),
          a(O) ? (_(), E("div", {
            key: 1,
            style: L([{ right: "unset" }, a(ae)]),
            class: "simple-range-slider-popover simple-range-slider-merged-popover"
          }, [
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input1Container",
              ref: I
            }, [
              M(e.$slots, "prefix", { value: a(A) }, void 0, !0),
              f("div", {
                ref_key: "input1",
                ref: p,
                class: "input1",
                style: { display: "inline-block" },
                contenteditable: "true",
                innerHTML: (s = a(A)) == null ? void 0 : s.toLocaleString("en-US"),
                onKeydown: n[0] || (n[0] = (...v) => a(U) && a(U)(...v))
              }, null, 40, me),
              M(e.$slots, "suffix", { value: a(A) }, void 0, !0)
            ], 512),
            f("label", null, [
              f("div", {
                style: { display: "inline-block", padding: "0 3px" },
                ref_key: "input_",
                ref: W
              }, [
                e.$slots.splitter ? M(e.$slots, "splitter", { key: 0 }, void 0, !0) : (_(), E(de, { key: 1 }, [
                  ye
                ], 64))
              ], 512)
            ]),
            f("div", {
              class: "simple-range-slider-input-container",
              ref_key: "input2Container",
              ref: P
            }, [
              M(e.$slots, "prefix", { value: a(B) }, void 0, !0),
              f("div", {
                ref_key: "input2",
                ref: d,
                class: "input2",
                style: { display: "inline-block" },
                contenteditable: "true",
                textContent: q((k = a(B)) == null ? void 0 : k.toLocaleString("en-US")),
                onKeydown: n[1] || (n[1] = (...v) => a(X) && a(X)(...v))
              }, null, 40, he),
              M(e.$slots, "suffix", { value: a(B) }, void 0, !0)
            ], 512)
          ], 4)) : F("", !0),
          f("div", {
            class: "simple-range-slider-anchor",
            style: L(a(ie))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[2] || (n[2] = Y((v) => G(1, v), ["prevent", "stop"])),
              onKeydown: n[3] || (n[3] = (v) => Q(1, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? F("", !0) : (_(), E("div", {
              key: 0,
              style: L({
                right: t.isRtl ? "0 !important" : "",
                left: t.isRtl ? "unset" : ""
              }),
              class: "simple-range-slider-popover simple-range-slider-popover-left"
            }, [
              f("div", {
                class: "simple-range-slider-input-container",
                ref_key: "input1Container",
                ref: I
              }, [
                M(e.$slots, "prefix", { value: a(U) }, void 0, !0),
                f("div", {
                  ref_key: "input1",
                  ref: p,
                  class: "input1",
                  contenteditable: "true",
                  textContent: q((x = a(A)) == null ? void 0 : x.toLocaleString("en-US")),
                  style: { display: "inline-block" },
                  onKeydown: n[4] || (n[4] = (...v) => a(U) && a(U)(...v))
                }, null, 40, we),
                M(e.$slots, "suffix", { value: a(U) }, void 0, !0)
              ], 512)
            ], 4)),
            Se
          ], 4),
          a(u) ? (_(), E("div", {
            key: 2,
            class: "simple-range-slider-anchor",
            style: L(a(re))
          }, [
            f("div", {
              tabindex: "1",
              onMousedown: n[5] || (n[5] = Y((v) => G(2, v), ["prevent", "stop"])),
              onKeydown: n[6] || (n[6] = (v) => Q(2, v)),
              class: "simple-range-slider-handle"
            }, null, 32),
            a(O) ? F("", !0) : (_(), E("div", {
              key: 0,
              style: L({
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
                M(e.$slots, "prefix", { value: a(X) }, void 0, !0),
                f("div", {
                  ref_key: "input2",
                  ref: d,
                  class: "input2",
                  contenteditable: "true",
                  textContent: q((z = a(B)) == null ? void 0 : z.toLocaleString("en-US")),
                  style: { display: "inline-block" },
                  onKeydown: n[7] || (n[7] = (...v) => a(X) && a(X)(...v))
                }, null, 40, xe),
                M(e.$slots, "suffix", { value: a(X) }, void 0, !0)
              ], 512)
            ], 4)),
            Re
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
}, Te = /* @__PURE__ */ ke(Ae, [["__scopeId", "data-v-62f5882c"]]);
export {
  Te as default
};
