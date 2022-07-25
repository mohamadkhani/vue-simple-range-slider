/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 679:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__(679)
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject = require("vue");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!../components/simpleRangeSlider.vue?vue&type=template&id=7df46a83&scoped=true&
var render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{ref:"root",staticClass:"simple-range-slider"},[_c('div',{ref:"bar",staticClass:"simple-range-slider-bg-bar",style:({ background: _vm.barColor })},[(_setup.isRange)?_c('div',{staticClass:"simple-range-slider-bar",style:(_setup.barStyle)}):_vm._e(),(_setup.isPopoverMerged)?_c('div',{staticClass:"simple-range-slider-popover simple-range-slider-merged-popover",staticStyle:{"right":"unset"},style:(_setup.mergedPopoverStyle)},[_c('div',{ref:"input1Container",staticClass:"simple-range-slider-input-container"},[_vm._t("prefix",null,{"value":_setup.anchor1Value}),_c('div',{ref:"input1",staticClass:"input1",staticStyle:{"display":"inline-block"},attrs:{"contenteditable":"true"},domProps:{"innerHTML":_vm._s(_setup.anchor1Value?.toLocaleString('en-US'))},on:{"keydown":_setup.input1Keydown}}),_vm._t("suffix",null,{"value":_setup.anchor1Value})],2),_c('label',[_c('div',{ref:"input_",staticStyle:{"display":"inline-block","padding":"0 3px"}},[(_vm.$slots.splitter)?_vm._t("splitter"):[_vm._v("|")]],2)]),_c('div',{ref:"input2Container",staticClass:"simple-range-slider-input-container"},[_vm._t("prefix",null,{"value":_setup.anchor2Value}),_c('div',{ref:"input2",staticClass:"input2",staticStyle:{"display":"inline-block"},attrs:{"contenteditable":"true"},on:{"keydown":_setup.input2Keydown}},[_vm._v(" "+_vm._s(_setup.anchor2Value?.toLocaleString('en-US'))+" ")]),_vm._t("suffix",null,{"value":_setup.anchor2Value})],2)]):_vm._e(),_c('div',{staticClass:"simple-range-slider-anchor",style:(_setup.anchor1Style)},[_c('div',{staticClass:"simple-range-slider-handle",attrs:{"tabindex":"1"},on:{"mousedown":function($event){$event.preventDefault();$event.stopPropagation();return _setup.mouseDown(1, $event)},"keydown":function($event){return _setup.keyDown(1, $event)}}}),(!_setup.isPopoverMerged)?_c('div',{staticClass:"simple-range-slider-popover simple-range-slider-popover-left",style:({
                    right: _setup.state.isRtl ? '0 !important' : '',
                    left: _setup.state.isRtl ? 'unset' : ''
                })},[_c('div',{ref:"input1Container",staticClass:"simple-range-slider-input-container"},[_vm._t("prefix",null,{"value":_setup.input1Keydown}),_c('div',{ref:"input1",staticClass:"input1",staticStyle:{"display":"inline-block"},attrs:{"contenteditable":"true"},on:{"keydown":_setup.input1Keydown}},[_vm._v(" "+_vm._s(_setup.anchor1Value?.toLocaleString('en-US'))+" ")]),_vm._t("suffix",null,{"value":_setup.input1Keydown})],2)]):_vm._e(),_c('div',{staticClass:"simple-range-slider-popover-arrow"})]),(_setup.isRange)?_c('div',{staticClass:"simple-range-slider-anchor",style:(_setup.anchor2Style)},[_c('div',{staticClass:"simple-range-slider-handle",attrs:{"tabindex":"1"},on:{"mousedown":function($event){$event.preventDefault();$event.stopPropagation();return _setup.mouseDown(2, $event)},"keydown":function($event){return _setup.keyDown(2, $event)}}}),(!_setup.isPopoverMerged)?_c('div',{staticClass:"simple-range-slider-popover simple-range-slider-popover-right",style:({
                    left: _setup.state.isRtl ? '-3px !important' : '',
                    right: _setup.state.isRtl ? 'unset !important' : ''
                })},[_c('div',{ref:"input2Container",staticClass:"simple-range-slider-input-container"},[_vm._t("prefix",null,{"value":_setup.input2Keydown}),_c('div',{ref:"input2",staticClass:"input2",staticStyle:{"display":"inline-block"},attrs:{"contenteditable":"true"},on:{"keydown":_setup.input2Keydown}},[_vm._v(" "+_vm._s(_setup.anchor2Value?.toLocaleString('en-US'))+" ")]),_vm._t("suffix",null,{"value":_setup.input2Keydown})],2)]):_vm._e(),_c('div',{staticClass:"simple-range-slider-popover-arrow"})]):_vm._e()])])
}
var staticRenderFns = []


;// CONCATENATED MODULE: ../../node_modules/vue-demi/lib/index.mjs


var isVue2 = false
var isVue3 = true
var Vue2 = (/* unused pure expression or super */ null && (undefined))

function install() {}

function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}




;// CONCATENATED MODULE: ../utils.js
const nativeMax = Math.max;
const nativeMin = Math.min;
function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerId,
    lastCallTime,
    lastInvokeTime = 0,
    leading = false,
    maxing = false,
    trailing = true;
  if (typeof func !== "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = Number(wait) || 0;
  if (typeof options === "object") {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(Number(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    let args = lastArgs,
      thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = wait - timeSinceLastCall;
    console.log("remainingWait");
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime;
    // Either this is the first call, activity has stopped and we're at the trailing
    // edge, the system time has gone backwards and we're treating it as the
    // trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been debounced at
    // least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function debounced() {
    let time = Date.now(),
      isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

function throttle(func, wait, options) {
  let leading = true,
    trailing = true;

  if (typeof func !== "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (typeof options === "object") {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  });
}

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/ts-loader/index.js??clonedRuleSet-40.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!../components/simpleRangeSlider.vue?vue&type=script&lang=ts&setup=true&

const __default__ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
    name: 'VueSimpleRangeSlider'
});



/* harmony default export */ var simpleRangeSlidervue_type_script_lang_ts_setup_true_ = (/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.defineComponent)({
    ...__default__,
    props: {
        modelValue: null,
        value: null,
        exponential: { type: Boolean, default: false },
        barColor: { default: '#bebebe' },
        activeBarColor: { default: '#7e7e7e' },
        max: { default: 100 },
        min: { default: 0 },
        keepJustSignificantFigures: { type: Boolean, default: true },
        significantFigures: { default: 2 }
    },
    emits: ["input", "update:model-value"],
    setup(__props, { emit }) {
        const props = __props;
        const positionLimits = ($position, $anchorIndex) => {
            if ($anchorIndex === 2) {
                $position = Math.min(state.width, Math.max(state.anchor1PositionV, $position));
            }
            if ($anchorIndex === 1) {
                $position = Math.max(0, Math.min(isRange.value ? state.anchor2PositionV : state.width, $position));
            }
            return $position;
        };
        const valueToPosition = ($value) => {
            if (props.exponential) {
                const valueRange = props.max - props.min;
                return unExp(($value - props.min) / valueRange, valueRange) * state.width;
            }
            else {
                return ($value - props.min) * scale.value;
            }
        };
        const positionToValue = ($position) => {
            if (props.exponential) {
                const valueRange = props.max - props.min;
                let r = Math.round(exp($position / state.width, valueRange) * valueRange) + props.min;
                if (props.keepJustSignificantFigures) {
                    r = roundValue(r);
                }
                return r;
            }
            else {
                return props.min + Math.round($position / scale.value);
            }
        };
        const roundValue = (input) => {
            return Number(input.toPrecision(props.significantFigures));
        };
        const exp = (input, valueRange) => {
            const base = Math.E + valueRange;
            return (Math.pow(base, input) - 1) / (Math.pow(base, 1) - 1); // Math.ceil((Math.pow(pos / state.width, base) + 1 ) * valueRange);
        };
        const unExp = (input, valueRange) => {
            const base = Math.E;
            const out = Math.log(input * (valueRange + base) + 1) / Math.log(base + valueRange);
            return out;
        };
        const input1 = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const input1Container = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const input2 = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const input2Container = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const input_ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const bar = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const root = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.ref)();
        const resizeObservers = {};
        const state = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.reactive)({
            input1Width: 0,
            input2Width: 0,
            dashInput: 80,
            anchor1PositionV: 0,
            anchor2PositionV: 0,
            isRtl: false,
            width: 100,
            draggingAnchor: 0,
            dragStartX: 0,
            dragStartPosition: 0,
            isDragging: false,
            changingByKey: false
        });
        const anchorWidth = 15;
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onMounted)(() => {
            if (getStyle(root.value, 'direction') === 'rtl') {
                state.isRtl = true;
            }
            resizeObservers.ro3 = new ResizeObserver((o) => {
                state.width = o[0].contentRect.width - (isRange.value ? anchorWidth : 0);
            });
            if (bar.value) {
                resizeObservers.ro3.unobserve(bar.value);
                state.width = bar.value.getBoundingClientRect()?.width - (isRange.value ? anchorWidth : 0);
            }
        });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.onUnmounted)(() => {
            resizeObservers?.ro3?.disconnect();
        });
        const updateAnchor2Value = ($position) => {
            anchor2Value.value = positionToValue($position);
        };
        //const setAnchor2Position = debounce(setAnchor2PositionUD, 10);
        const updateAnchor1Value = ($position) => {
            anchor1Value.value = positionToValue($position);
        };
        //const setAnchor1Position = debounce(setAnchor1PositionUD, 10);
        const scale = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return state.width / (props.max - props.min);
        });
        const anchor2Position = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)({
            get: () => {
                return state.anchor2PositionV;
            },
            set: ($position) => {
                if ($position == state.anchor1PositionV)
                    return;
                $position = positionLimits($position, 2);
                if (state.anchor2PositionV !== $position)
                    state.anchor2PositionV = $position;
                updateAnchor2Value($position);
            }
        });
        const anchor1Position = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)({
            get: () => {
                return state.anchor1PositionV;
            },
            set: ($position) => {
                if ($position == state.anchor1PositionV)
                    return;
                $position = positionLimits($position, 1);
                if (state.anchor1PositionV !== $position)
                    state.anchor1PositionV = $position;
                updateAnchor1Value($position);
            }
        });
        const isRange = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return Array.isArray(iValue.value);
        });
        const anchor1Value = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)({
            get: () => {
                if (isRange.value && Array.isArray(iValue.value)) {
                    return iValue.value[0];
                }
                else if (!isRange.value && !Array.isArray(iValue.value)) {
                    return iValue.value;
                }
                else {
                    return undefined;
                }
            },
            set: ($value) => {
                if (isRange.value && Array.isArray(iValue.value)) {
                    if ($value === iValue.value[0])
                        return;
                    iValue.value = [$value || 0, iValue.value[1]];
                }
                else if (!isRange.value && !Array.isArray(iValue.value)) {
                    if ($value === iValue.value)
                        return;
                    iValue.value = $value;
                }
            }
        });
        const anchor2Value = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)({
            get: () => {
                if (isRange.value && Array.isArray(iValue.value)) {
                    return iValue.value[1];
                }
                else if (!isRange.value && !Array.isArray(iValue.value)) {
                    return iValue.value;
                }
                else {
                    return undefined;
                }
            },
            set: ($value) => {
                if (isRange.value && Array.isArray(iValue.value)) {
                    if ($value === iValue.value[1])
                        return;
                    iValue.value = [iValue.value[0], $value || 0];
                }
                else if (!isRange.value && !Array.isArray(iValue.value)) {
                    if ($value === iValue.value)
                        return;
                    iValue.value = $value;
                }
            }
        });
        const ISVUE2 = true;
        const iValue = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)({
            get: () => {
                if (ISVUE2 || isVue2)
                    return props.value;
                else
                    return props.modelValue;
            },
            set: (value) => {
                if ((Array.isArray(value) &&
                    Array.isArray(props.modelValue) &&
                    value[0] === props.modelValue[0] &&
                    value[1] === props.modelValue[1]) ||
                    (!Array.isArray(value) && value === props.modelValue)) {
                    return;
                }
                if (ISVUE2 || isVue2)
                    emit('input', value);
                else
                    emit('update:model-value', value);
            }
        });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => input1Container.value, (v) => {
            if (resizeObservers.ro1) {
                resizeObservers.ro1.disconnect();
            }
            resizeObservers.ro1 = new ResizeObserver((o) => {
                state.input1Width = o[0].target.getBoundingClientRect().width;
            });
            if (v)
                resizeObservers.ro1.observe(v);
        }, { immediate: true });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => input2Container.value, (v) => {
            if (resizeObservers.ro2) {
                resizeObservers.ro2.disconnect();
            }
            resizeObservers.ro2 = new ResizeObserver((o) => {
                state.input2Width = o[0].target.getBoundingClientRect().width;
            });
            if (v)
                resizeObservers.ro2.observe(v);
        }, { immediate: true });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => input_.value, (v) => {
            state.dashInput = v?.getBoundingClientRect()?.width || 30;
        }, {
            immediate: true
        });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => iValue.value, (current, prev) => {
            if (state.isDragging)
                return;
            if (Array.isArray(current)) {
                anchor1Position.value = valueToPosition(current[0]);
                anchor2Position.value = valueToPosition(current[1]);
            }
            else {
                if (current) {
                    anchor1Position.value = valueToPosition(current);
                }
                else {
                    anchor1Position.value = 0;
                }
            }
        }, { immediate: true });
        const input1KeydownUD = ($event) => {
            setTimeout(() => {
                anchor1Value.value = Number.parseInt(input2.value?.innerText.replace(/,/, '') || '0');
            }, 100);
        };
        const input1Keydown = debounce(input1KeydownUD, 1000);
        const input2KeydownUD = ($event) => {
            setTimeout(() => {
                anchor2Value.value = Number.parseInt(input2.value?.innerText.replace(/,/, '') || '0');
            }, 100);
        };
        const input2Keydown = debounce(input2KeydownUD, 1000);
        const isPopoverMerged = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return (anchor2Position.value - anchor1Position.value < state.input1Width + state.input2Width - 15 &&
                isRange.value);
        });
        (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.watch)(() => isPopoverMerged.value, () => {
            if (input1.value instanceof HTMLInputElement && document.activeElement === input1.value) {
                const position = input1.value.selectionStart;
                if (input1.value instanceof HTMLInputElement) {
                    input1.value.focus();
                    input1.value.setSelectionRange(position, position);
                }
            }
            if (input2.value instanceof HTMLInputElement && document.activeElement === input2.value) {
                const position = input2.value.selectionStart;
                if (input2.value instanceof HTMLInputElement) {
                    input2.value.focus();
                    input2.value.setSelectionRange(position, position);
                }
            }
        });
        const barStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return {
                transform: 'translateX(' +
                    (state.isRtl ? state.width - anchor2Position.value : anchor1Position.value) +
                    'px)',
                width: anchor2Position.value - anchor1Position.value + 15 + 'px',
                background: props.activeBarColor
            };
        });
        const anchor1Style = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return {
                transform: 'translateX(' +
                    (state.isRtl
                        ? state.width - anchor1Position.value + (isRange.value ? 7.5 : -7.5)
                        : anchor1Position.value - 7.5) +
                    'px)'
            };
        });
        const anchor2Style = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            return {
                transform: 'translateX(' +
                    (state.isRtl ? state.width - state.anchor2PositionV - 7.5 : state.anchor2PositionV + 7.5) +
                    'px)'
            };
        });
        const mergedPopoverStyle = (0,external_commonjs_vue_commonjs2_vue_root_Vue_namespaceObject.computed)(() => {
            let translateX = ((state.isRtl
                ? state.width - anchor2Position.value - anchorWidth / 2
                : anchor2Position.value - anchorWidth / 2) +
                (state.isRtl
                    ? state.width - anchor1Position.value - anchorWidth / 2
                    : anchor1Position.value - anchorWidth / 2)) /
                2 -
                (state.input1Width + state.input2Width + state.dashInput) / 2 +
                1;
            translateX = Math.max(translateX, -10);
            translateX = Math.min(translateX, state.width - (state.input1Width + state.input2Width + state.dashInput) + 10);
            return {
                transform: 'translateX(' + translateX + 'px)',
                width: anchor2Position.value - anchor1Position.value + 'px',
                direction: state.isRtl ? 'rtl' : 'ltr',
                minWidth: state.input1Width + state.input2Width + state.dashInput + 6 + 'px'
            };
        });
        const mouseDown = ($anchor, $event) => {
            $event.preventDefault();
            state.isDragging = true;
            state.draggingAnchor = $anchor;
            state.dragStartX = $event.x;
            if ($anchor == 1) {
                state.dragStartPosition = anchor1Position.value;
            }
            else {
                state.dragStartPosition = anchor2Position.value;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win = window;
            win.$SRSMouseMove = ($event) => {
                $event.preventDefault();
                if ($anchor == 1) {
                    if (state.isRtl) {
                        anchor1Position.value = state.dragStartPosition + state.dragStartX - $event.x;
                    }
                    else {
                        anchor1Position.value = state.dragStartPosition - state.dragStartX + $event.x;
                    }
                }
                else {
                    if (state.isRtl) {
                        anchor2Position.value = state.dragStartPosition + state.dragStartX - $event.x;
                    }
                    else {
                        anchor2Position.value = state.dragStartPosition - state.dragStartX + $event.x;
                    }
                }
            };
            const mouseUp = () => {
                state.isDragging = false;
                document.removeEventListener('mouseup', mouseUp);
                document.removeEventListener('mousemove', win.$SRSMouseMove);
            };
            document.addEventListener('mousemove', win.$SRSMouseMove);
            document.addEventListener('mouseup', mouseUp);
        };
        const keyDown = ($anchor, $event) => {
            if (state.changingByKey)
                return;
            state.changingByKey = true;
            let speed = 40;
            let count = 0;
            const change = () => {
                if ((!state.isRtl && ($event.code === 'ArrowDown' || $event.code === 'ArrowLeft')) ||
                    (state.isRtl && ($event.code === 'ArrowUp' || $event.code === 'ArrowRight'))) {
                    if ($anchor == 1) {
                        anchor1Position.value--;
                    }
                    if ($anchor == 2) {
                        anchor2Position.value--;
                    }
                }
                else if ((!state.isRtl && ($event.code === 'ArrowUp' || $event.code === 'ArrowRight')) ||
                    (state.isRtl && ($event.code === 'ArrowDown' || $event.code === 'ArrowLeft'))) {
                    if ($anchor == 1) {
                        anchor1Position.value++;
                    }
                    if ($anchor == 2) {
                        anchor2Position.value++;
                    }
                }
            };
            change();
            const intervalKey = setInterval(() => {
                count++;
                if (count < speed) {
                    return;
                }
                if (speed > 1)
                    speed--;
                change();
            }, 5);
            if ($event.target instanceof HTMLElement) {
                $event.target.addEventListener('keyup', () => {
                    state.changingByKey = false;
                    clearInterval(intervalKey);
                });
            }
        };
        const getStyle = (el, styleProp) => {
            let y;
            // @ts-ignore
            if (el.currentStyle)
                // @ts-ignore
                y = el.currentStyle[styleProp];
            // @ts-ignore
            else if (window.getComputedStyle)
                // @ts-ignore
                y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
            return y;
        };
        return { __sfc: true, positionLimits, valueToPosition, positionToValue, roundValue, exp, unExp, props, emit, input1, input1Container, input2, input2Container, input_, bar, root, resizeObservers, state, anchorWidth, updateAnchor2Value, updateAnchor1Value, scale, anchor2Position, anchor1Position, isRange, anchor1Value, anchor2Value, ISVUE2, iValue, input1KeydownUD, input1Keydown, input2KeydownUD, input2Keydown, isPopoverMerged, barStyle, anchor1Style, anchor2Style, mergedPopoverStyle, mouseDown, keyDown, getStyle };
    }
}));

;// CONCATENATED MODULE: ../components/simpleRangeSlider.vue?vue&type=script&lang=ts&setup=true&
 /* harmony default export */ var components_simpleRangeSlidervue_type_script_lang_ts_setup_true_ = (simpleRangeSlidervue_type_script_lang_ts_setup_true_); 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-27.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-27.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-27.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-27.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!../components/simpleRangeSlider.vue?vue&type=style&index=0&id=7df46a83&prod&scoped=true&lang=sass&
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ../components/simpleRangeSlider.vue?vue&type=style&index=0&id=7df46a83&prod&scoped=true&lang=sass&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ../components/simpleRangeSlider.vue



;


/* normalize component */

var component = normalizeComponent(
  components_simpleRangeSlidervue_type_script_lang_ts_setup_true_,
  render,
  staticRenderFns,
  false,
  null,
  "7df46a83",
  null
  
)

/* harmony default export */ var simpleRangeSlider = (component.exports);
;// CONCATENATED MODULE: ./lib.ts


/* harmony default export */ var lib = (external_commonjs_vue_commonjs2_vue_root_Vue_default().component('vueSimpleRangeSlider', simpleRangeSlider));

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (lib);


}();
module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.common.js.map