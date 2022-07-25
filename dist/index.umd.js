(function(e,b){typeof exports=="object"&&typeof module<"u"?module.exports=b(require("vue"),require("vue-demi")):typeof define=="function"&&define.amd?define(["vue","vue-demi"],b):(e=typeof globalThis<"u"?globalThis:e||self,e.VueSimpleRangeSlider=b(e.Vue,e.vueDemi))})(this,function(e,b){"use strict";const H=Math.max,O=Math.min;function U(y,m,o){let h,S,x,R,g,V,p=0,M=!1,u=!1,A=!0;if(typeof y!="function")throw new TypeError(FUNC_ERROR_TEXT);m=Number(m)||0,typeof o=="object"&&(M=!!o.leading,u="maxWait"in o,x=u?H(Number(o.maxWait)||0,m):x,A="trailing"in o?!!o.trailing:A);function N(i){let a=h,d=S;return h=S=void 0,p=i,R=y.apply(d,a),R}function C(i){return p=i,g=setTimeout(n,m),M?N(i):R}function I(i){let a=i-V,d=i-p,v=m-a;return console.log("remainingWait"),u?O(v,x-d):v}function c(i){let a=i-V,d=i-p;return V===void 0||a>=m||a<0||u&&d>=x}function n(){const i=Date.now();if(c(i))return k(i);g=setTimeout(n,I(i))}function k(i){return g=void 0,A&&h?N(i):(h=S=void 0,R)}function W(){g!==void 0&&clearTimeout(g),p=0,h=V=S=g=void 0}function K(){return g===void 0?R:k(Date.now())}function P(){let i=Date.now(),a=c(i);if(h=arguments,S=this,V=i,a){if(g===void 0)return C(V);if(u)return g=setTimeout(n,m),N(V)}return g===void 0&&(g=setTimeout(n,m)),R}return P.cancel=W,P.flush=K,P}const X=y=>(e.pushScopeId("data-v-1509c2ea"),y=y(),e.popScopeId(),y),j=["innerHTML"],q=e.createTextVNode("|"),J=X(()=>e.createElementVNode("div",{class:"simple-range-slider-popover-arrow"},null,-1)),G=X(()=>e.createElementVNode("div",{class:"simple-range-slider-popover-arrow"},null,-1)),Q=e.defineComponent({name:"VueSimpleRangeSlider"}),Y=e.defineComponent({...Q,props:{modelValue:null,value:null,exponential:{type:Boolean,default:!1},barColor:{default:"#bebebe"},activeBarColor:{default:"#7e7e7e"},max:{default:100},min:{default:0},keepJustSignificantFigures:{type:Boolean,default:!0},significantFigures:{default:2}},emits:["input","update:model-value"],setup(y,{emit:m}){const o=y,h=(t,r)=>(r===2&&(t=Math.min(n.width,Math.max(n.anchor1PositionV,t))),r===1&&(t=Math.max(0,Math.min(d.value?n.anchor2PositionV:n.width,t))),t),S=t=>{if(o.exponential){const r=o.max-o.min;return V((t-o.min)/r,r)*n.width}else return(t-o.min)*P.value},x=t=>{if(o.exponential){const r=o.max-o.min;let s=Math.round(g(t/n.width,r)*r)+o.min;return o.keepJustSignificantFigures&&(s=R(s)),s}else return o.min+Math.round(t/P.value)},R=t=>Number(t.toPrecision(o.significantFigures)),g=(t,r)=>{const s=Math.E+r;return(Math.pow(s,t)-1)/(Math.pow(s,1)-1)},V=(t,r)=>{const s=Math.E;return Math.log(t*(r+s)+1)/Math.log(s+r)},p=e.ref(),M=e.ref(),u=e.ref(),A=e.ref(),N=e.ref(),C=e.ref(),I=e.ref(),c={},n=e.reactive({input1Width:0,input2Width:0,dashInput:80,anchor1PositionV:0,anchor2PositionV:0,isRtl:!1,width:100,draggingAnchor:0,dragStartX:0,dragStartPosition:0,isDragging:!1,changingByKey:!1}),k=15;e.onMounted(()=>{var t;ne(I.value,"direction")==="rtl"&&(n.isRtl=!0),c.ro3=new ResizeObserver(r=>{n.width=r[0].contentRect.width-(d.value?k:0)}),C.value&&(c.ro3.unobserve(C.value),n.width=((t=C.value.getBoundingClientRect())==null?void 0:t.width)-(d.value?k:0))}),e.onUnmounted(()=>{var t;(t=c==null?void 0:c.ro3)==null||t.disconnect()});const W=t=>{T.value=x(t)},K=t=>{v.value=x(t)},P=e.computed(()=>n.width/(o.max-o.min)),i=e.computed({get:()=>n.anchor2PositionV,set:t=>{t!=n.anchor1PositionV&&(t=h(t,2),n.anchor2PositionV!==t&&(n.anchor2PositionV=t),W(t))}}),a=e.computed({get:()=>n.anchor1PositionV,set:t=>{t!=n.anchor1PositionV&&(t=h(t,1),n.anchor1PositionV!==t&&(n.anchor1PositionV=t),K(t))}}),d=e.computed(()=>Array.isArray(l.value)),v=e.computed({get:()=>d.value&&Array.isArray(l.value)?l.value[0]:!d.value&&!Array.isArray(l.value)?l.value:void 0,set:t=>{if(d.value&&Array.isArray(l.value)){if(t===l.value[0])return;l.value=[t||0,l.value[1]]}else if(!d.value&&!Array.isArray(l.value)){if(t===l.value)return;l.value=t}}}),T=e.computed({get:()=>d.value&&Array.isArray(l.value)?l.value[1]:!d.value&&!Array.isArray(l.value)?l.value:void 0,set:t=>{if(d.value&&Array.isArray(l.value)){if(t===l.value[1])return;l.value=[l.value[0],t||0]}else if(!d.value&&!Array.isArray(l.value)){if(t===l.value)return;l.value=t}}}),l=e.computed({get:()=>b.isVue2?o.value:o.modelValue,set:t=>{Array.isArray(t)&&Array.isArray(o.modelValue)&&t[0]===o.modelValue[0]&&t[1]===o.modelValue[1]||!Array.isArray(t)&&t===o.modelValue||(b.isVue2?m("input",t):m("update:model-value",t))}});e.watch(()=>M.value,t=>{c.ro1&&c.ro1.disconnect(),c.ro1=new ResizeObserver(r=>{n.input1Width=r[0].target.getBoundingClientRect().width}),t&&c.ro1.observe(t)},{immediate:!0}),e.watch(()=>A.value,t=>{c.ro2&&c.ro2.disconnect(),c.ro2=new ResizeObserver(r=>{n.input2Width=r[0].target.getBoundingClientRect().width}),t&&c.ro2.observe(t)},{immediate:!0}),e.watch(()=>N.value,t=>{var r;n.dashInput=((r=t==null?void 0:t.getBoundingClientRect())==null?void 0:r.width)||30},{immediate:!0}),e.watch(()=>l.value,(t,r)=>{n.isDragging||(Array.isArray(t)?(a.value=S(t[0]),i.value=S(t[1])):t?a.value=S(t):a.value=0)},{immediate:!0});const B=U(t=>{setTimeout(()=>{var r;v.value=Number.parseInt(((r=u.value)==null?void 0:r.innerText.replace(/,/,""))||"0")},100)},1e3),L=U(t=>{setTimeout(()=>{var r;T.value=Number.parseInt(((r=u.value)==null?void 0:r.innerText.replace(/,/,""))||"0")},100)},1e3),_=e.computed(()=>i.value-a.value<n.input1Width+n.input2Width-15&&d.value);e.watch(()=>_.value,()=>{if(p.value instanceof HTMLInputElement&&document.activeElement===p.value){const t=p.value.selectionStart;p.value instanceof HTMLInputElement&&(p.value.focus(),p.value.setSelectionRange(t,t))}if(u.value instanceof HTMLInputElement&&document.activeElement===u.value){const t=u.value.selectionStart;u.value instanceof HTMLInputElement&&(u.value.focus(),u.value.setSelectionRange(t,t))}});const Z=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-i.value:a.value)+"px)",width:i.value-a.value+15+"px",background:o.activeBarColor})),$=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-a.value+(d.value?7.5:-7.5):a.value-7.5)+"px)"})),ee=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-n.anchor2PositionV-7.5:n.anchor2PositionV+7.5)+"px)"})),te=e.computed(()=>{let t=((n.isRtl?n.width-i.value-k/2:i.value-k/2)+(n.isRtl?n.width-a.value-k/2:a.value-k/2))/2-(n.input1Width+n.input2Width+n.dashInput)/2+1;return t=Math.max(t,-10),t=Math.min(t,n.width-(n.input1Width+n.input2Width+n.dashInput)+10),{transform:"translateX("+t+"px)",width:i.value-a.value+"px",direction:n.isRtl?"rtl":"ltr",minWidth:n.input1Width+n.input2Width+n.dashInput+6+"px"}}),z=(t,r)=>{r.preventDefault(),n.isDragging=!0,n.draggingAnchor=t,n.dragStartX=r.x,t==1?n.dragStartPosition=a.value:n.dragStartPosition=i.value;const s=window;s.$SRSMouseMove=w=>{w.preventDefault(),t==1?n.isRtl?a.value=n.dragStartPosition+n.dragStartX-w.x:a.value=n.dragStartPosition-n.dragStartX+w.x:n.isRtl?i.value=n.dragStartPosition+n.dragStartX-w.x:i.value=n.dragStartPosition-n.dragStartX+w.x};const E=()=>{n.isDragging=!1,document.removeEventListener("mouseup",E),document.removeEventListener("mousemove",s.$SRSMouseMove)};document.addEventListener("mousemove",s.$SRSMouseMove),document.addEventListener("mouseup",E)},F=(t,r)=>{if(n.changingByKey)return;n.changingByKey=!0;let s=40,E=0;const w=()=>{!n.isRtl&&(r.code==="ArrowDown"||r.code==="ArrowLeft")||n.isRtl&&(r.code==="ArrowUp"||r.code==="ArrowRight")?(t==1&&a.value--,t==2&&i.value--):(!n.isRtl&&(r.code==="ArrowUp"||r.code==="ArrowRight")||n.isRtl&&(r.code==="ArrowDown"||r.code==="ArrowLeft"))&&(t==1&&a.value++,t==2&&i.value++)};w();const D=setInterval(()=>{E++,!(E<s)&&(s>1&&s--,w())},5);r.target instanceof HTMLElement&&r.target.addEventListener("keyup",()=>{n.changingByKey=!1,clearInterval(D)})},ne=(t,r)=>{let s;return t.currentStyle?s=t.currentStyle[r]:window.getComputedStyle&&(s=document.defaultView.getComputedStyle(t,null).getPropertyValue(r)),s};return(t,r)=>{var s,E,w,D;return e.openBlock(),e.createElementBlock("div",{class:"simple-range-slider",ref_key:"root",ref:I},[e.createElementVNode("div",{class:"simple-range-slider-bg-bar",style:e.normalizeStyle({background:y.barColor}),ref_key:"bar",ref:C},[e.unref(d)?(e.openBlock(),e.createElementBlock("div",{key:0,class:"simple-range-slider-bar",style:e.normalizeStyle(e.unref(Z))},null,4)):e.createCommentVNode("",!0),e.unref(_)?(e.openBlock(),e.createElementBlock("div",{key:1,style:e.normalizeStyle([{right:"unset"},e.unref(te)]),class:"simple-range-slider-popover simple-range-slider-merged-popover"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input1Container",ref:M},[e.renderSlot(t.$slots,"prefix",{value:e.unref(v)},void 0,!0),e.createElementVNode("div",{ref_key:"input1",ref:p,class:"input1",style:{display:"inline-block"},contenteditable:"true",innerHTML:(s=e.unref(v))==null?void 0:s.toLocaleString("en-US"),onKeydown:r[0]||(r[0]=(...f)=>e.unref(B)&&e.unref(B)(...f))},null,40,j),e.renderSlot(t.$slots,"suffix",{value:e.unref(v)},void 0,!0)],512),e.createElementVNode("label",null,[e.createElementVNode("div",{style:{display:"inline-block",padding:"0 3px"},ref_key:"input_",ref:N},[t.$slots.splitter?e.renderSlot(t.$slots,"splitter",{key:0},void 0,!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[q],64))],512)]),e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input2Container",ref:A},[e.renderSlot(t.$slots,"prefix",{value:e.unref(T)},void 0,!0),e.createElementVNode("div",{ref_key:"input2",ref:u,class:"input2",style:{display:"inline-block"},contenteditable:"true",onKeydown:r[1]||(r[1]=(...f)=>e.unref(L)&&e.unref(L)(...f))},e.toDisplayString((E=e.unref(T))==null?void 0:E.toLocaleString("en-US")),545),e.renderSlot(t.$slots,"suffix",{value:e.unref(T)},void 0,!0)],512)],4)):e.createCommentVNode("",!0),e.createElementVNode("div",{class:"simple-range-slider-anchor",style:e.normalizeStyle(e.unref($))},[e.createElementVNode("div",{tabindex:"1",onMousedown:r[2]||(r[2]=e.withModifiers(f=>z(1,f),["prevent","stop"])),onKeydown:r[3]||(r[3]=f=>F(1,f)),class:"simple-range-slider-handle"},null,32),e.unref(_)?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,style:e.normalizeStyle({right:n.isRtl?"0 !important":"",left:n.isRtl?"unset":""}),class:"simple-range-slider-popover simple-range-slider-popover-left"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input1Container",ref:M},[e.renderSlot(t.$slots,"prefix",{value:e.unref(B)},void 0,!0),e.createElementVNode("div",{ref_key:"input1",ref:p,class:"input1",contenteditable:"true",style:{display:"inline-block"},onKeydown:r[4]||(r[4]=(...f)=>e.unref(B)&&e.unref(B)(...f))},e.toDisplayString((w=e.unref(v))==null?void 0:w.toLocaleString("en-US")),545),e.renderSlot(t.$slots,"suffix",{value:e.unref(B)},void 0,!0)],512)],4)),J],4),e.unref(d)?(e.openBlock(),e.createElementBlock("div",{key:2,class:"simple-range-slider-anchor",style:e.normalizeStyle(e.unref(ee))},[e.createElementVNode("div",{tabindex:"1",onMousedown:r[5]||(r[5]=e.withModifiers(f=>z(2,f),["prevent","stop"])),onKeydown:r[6]||(r[6]=f=>F(2,f)),class:"simple-range-slider-handle"},null,32),e.unref(_)?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,style:e.normalizeStyle({left:n.isRtl?"-3px !important":"",right:n.isRtl?"unset !important":""}),class:"simple-range-slider-popover simple-range-slider-popover-right"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input2Container",ref:A},[e.renderSlot(t.$slots,"prefix",{value:e.unref(L)},void 0,!0),e.createElementVNode("div",{ref_key:"input2",ref:u,class:"input2",contenteditable:"true",style:{display:"inline-block"},onKeydown:r[7]||(r[7]=(...f)=>e.unref(L)&&e.unref(L)(...f))},e.toDisplayString((D=e.unref(T))==null?void 0:D.toLocaleString("en-US")),545),e.renderSlot(t.$slots,"suffix",{value:e.unref(L)},void 0,!0)],512)],4)),G],4)):e.createCommentVNode("",!0)],4)],512)}}}),re="";return((y,m)=>{const o=y.__vccOpts||y;for(const[h,S]of m)o[h]=S;return o})(Y,[["__scopeId","data-v-1509c2ea"]])});
