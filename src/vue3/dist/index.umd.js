(function(e,T){typeof exports=="object"&&typeof module<"u"?module.exports=T(require("vue")):typeof define=="function"&&define.amd?define(["vue"],T):(e=typeof globalThis<"u"?globalThis:e||self,e.VueSimpleRangeSlider=T(e.Vue))})(this,function(e){"use strict";const T=Math.max,F=Math.min;function K(g,y,o){let S,w,b,R,m,v,p=0,M=!1,d=!1,A=!0;if(typeof g!="function")throw new TypeError(FUNC_ERROR_TEXT);y=Number(y)||0,typeof o=="object"&&(M=!!o.leading,d="maxWait"in o,b=d?T(Number(o.maxWait)||0,y):b,A="trailing"in o?!!o.trailing:A);function C(i){let a=S,h=w;return S=w=void 0,p=i,R=g.apply(h,a),R}function N(i){return p=i,m=setTimeout(V,y),M?C(i):R}function c(i){let a=i-v,h=i-p,E=y-a;return console.log("remainingWait"),d?F(E,b-h):E}function n(i){let a=i-v,h=i-p;return v===void 0||a>=y||a<0||d&&h>=b}function V(){const i=Date.now();if(n(i))return B(i);m=setTimeout(V,c(i))}function B(i){return m=void 0,A&&S?C(i):(S=w=void 0,R)}function W(){m!==void 0&&clearTimeout(m),p=0,S=v=w=m=void 0}function I(){return m===void 0?R:B(Date.now())}function u(){let i=Date.now(),a=n(i);if(S=arguments,w=this,v=i,a){if(m===void 0)return N(v);if(d)return m=setTimeout(V,y),C(v)}return m===void 0&&(m=setTimeout(V,y)),R}return u.cancel=W,u.flush=I,u}const U=g=>(e.pushScopeId("data-v-8bfea492"),g=g(),e.popScopeId(),g),H={class:"simple-range-slider"},O=["innerHTML"],j=e.createTextVNode("|"),J=["textContent"],q=["textContent"],G=U(()=>e.createElementVNode("div",{class:"simple-range-slider-popover-arrow"},null,-1)),Q=["textContent"],Y=U(()=>e.createElementVNode("div",{class:"simple-range-slider-popover-arrow"},null,-1)),Z=e.defineComponent({name:"VueSimpleRangeSlider"}),$=e.defineComponent({...Z,props:{modelValue:null,value:null,exponential:{type:Boolean,default:!1},barColor:null,activeBarColor:null,max:{default:100},min:{default:0},keepJustSignificantFigures:{type:Boolean,default:!0},significantFigures:{default:2}},emits:["input","update:model-value"],setup(g,{emit:y}){const o=g,S=(t,r)=>(r===2&&(t=Math.min(n.width,Math.max(n.anchor1PositionV,t))),r===1&&(t=Math.max(0,Math.min(a.value?n.anchor2PositionV:n.width,t))),t),w=t=>{if(o.exponential){const r=o.max-o.min;return v((t-o.min)/r,r)*n.width}else return(t-o.min)*I.value},b=t=>{if(o.exponential){const r=o.max-o.min;let l=Math.round(m(t/n.width,r)*r)+o.min;return o.keepJustSignificantFigures&&(l=R(l)),l}else return o.min+Math.round(t/I.value)},R=t=>Number(t.toPrecision(o.significantFigures)),m=(t,r)=>{const l=Math.E+r;return(Math.pow(l,t)-1)/(Math.pow(l,1)-1)},v=(t,r)=>{const l=Math.E;return Math.log(t*(r+l)+1)/Math.log(l+r)},p=e.ref(),M=e.ref(),d=e.ref(),A=e.ref(),C=e.ref(),N=e.ref(),c={},n=e.reactive({input1Width:0,input2Width:0,dashInput:80,anchor1PositionV:0,anchor2PositionV:0,isRtl:!1,width:100,draggingAnchor:0,dragStartX:0,dragStartPosition:0,isDragging:!1,changingByKey:!1}),V=15;e.onMounted(()=>{var r,l;const t=e.getCurrentInstance();ie((r=t==null?void 0:t.proxy)==null?void 0:r.$el,"direction")==="rtl"&&(n.isRtl=!0),c.ro3=new ResizeObserver(k=>{n.width=k[0].contentRect.width-(a.value?V:0)}),N.value&&(c.ro3.unobserve(N.value),n.width=((l=N.value.getBoundingClientRect())==null?void 0:l.width)-(a.value?V:0))}),e.onUnmounted(()=>{var t;(t=c==null?void 0:c.ro3)==null||t.disconnect()});const B=t=>{E.value=b(t)},W=t=>{h.value=b(t)},I=e.computed(()=>n.width/(o.max-o.min)),u=e.computed({get:()=>n.anchor2PositionV,set:t=>{t!=n.anchor1PositionV&&(t=S(t,2),n.anchor2PositionV!==t&&(n.anchor2PositionV=t),B(t))}}),i=e.computed({get:()=>n.anchor1PositionV,set:t=>{t!=n.anchor1PositionV&&(t=S(t,1),n.anchor1PositionV!==t&&(n.anchor1PositionV=t),W(t))}}),a=e.computed(()=>Array.isArray(s.value)),h=e.computed({get:()=>a.value&&Array.isArray(s.value)?s.value[0]:!a.value&&!Array.isArray(s.value)?s.value:void 0,set:t=>{if(a.value&&Array.isArray(s.value)){if(t===s.value[0])return;s.value=[t||0,s.value[1]]}else if(!a.value&&!Array.isArray(s.value)){if(t===s.value)return;s.value=t}}}),E=e.computed({get:()=>a.value&&Array.isArray(s.value)?s.value[1]:!a.value&&!Array.isArray(s.value)?s.value:void 0,set:t=>{if(a.value&&Array.isArray(s.value)){if(t===s.value[1])return;s.value=[s.value[0],t||0]}else if(!a.value&&!Array.isArray(s.value)){if(t===s.value)return;s.value=t}}}),s=e.computed({get:()=>o.modelValue,set:t=>{Array.isArray(t)&&Array.isArray(o.modelValue)&&t[0]===o.modelValue[0]&&t[1]===o.modelValue[1]||!Array.isArray(t)&&t===o.modelValue||y("update:model-value",t)}});e.watch(()=>M.value,t=>{c.ro1&&c.ro1.disconnect(),c.ro1=new ResizeObserver(r=>{n.input1Width=r[0].target.getBoundingClientRect().width}),t&&c.ro1.observe(t)},{immediate:!0}),e.watch(()=>A.value,t=>{c.ro2&&c.ro2.disconnect(),c.ro2=new ResizeObserver(r=>{n.input2Width=r[0].target.getBoundingClientRect().width}),t&&c.ro2.observe(t)},{immediate:!0}),e.watch(()=>C.value,t=>{var r;n.dashInput=((r=t==null?void 0:t.getBoundingClientRect())==null?void 0:r.width)||30},{immediate:!0}),e.watch(()=>s.value,(t,r)=>{n.isDragging||(Array.isArray(t)?(i.value=w(t[0]),u.value=w(t[1])):t?i.value=w(t):i.value=0)},{immediate:!0});const _=K(t=>{setTimeout(()=>{var r;h.value=Number.parseInt(((r=d.value)==null?void 0:r.innerText.replace(/,/,""))||"0")},100)},1e3),P=K(t=>{setTimeout(()=>{var r;E.value=Number.parseInt(((r=d.value)==null?void 0:r.innerText.replace(/,/,""))||"0")},100)},1e3),L=e.computed(()=>u.value-i.value<n.input1Width+n.input2Width-15&&a.value);e.watch(()=>L.value,()=>{if(p.value instanceof HTMLInputElement&&document.activeElement===p.value){const t=p.value.selectionStart;p.value instanceof HTMLInputElement&&(p.value.focus(),p.value.setSelectionRange(t,t))}if(d.value instanceof HTMLInputElement&&document.activeElement===d.value){const t=d.value.selectionStart;d.value instanceof HTMLInputElement&&(d.value.focus(),d.value.setSelectionRange(t,t))}});const ee=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-u.value:i.value)+"px)",width:u.value-i.value+15+"px",background:o.activeBarColor})),te=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-i.value+(a.value?7.5:-7.5):i.value-7.5)+"px)"})),ne=e.computed(()=>({transform:"translateX("+(n.isRtl?n.width-n.anchor2PositionV-7.5:n.anchor2PositionV+7.5)+"px)"})),re=e.computed(()=>{let t=((n.isRtl?n.width-u.value-V/2:u.value-V/2)+(n.isRtl?n.width-i.value-V/2:i.value-V/2))/2-(n.input1Width+n.input2Width+n.dashInput)/2+1;return t=Math.max(t,-10),t=Math.min(t,n.width-(n.input1Width+n.input2Width+n.dashInput)+10),{transform:"translateX("+t+"px)",width:u.value-i.value+"px",direction:n.isRtl?"rtl":"ltr",minWidth:n.input1Width+n.input2Width+n.dashInput+6+"px"}}),X=(t,r)=>{r.preventDefault(),n.isDragging=!0,n.draggingAnchor=t,n.dragStartX=r.x,t==1?n.dragStartPosition=i.value:n.dragStartPosition=u.value;const l=window;l.$SRSMouseMove=x=>{x.preventDefault(),t==1?n.isRtl?i.value=n.dragStartPosition+n.dragStartX-x.x:i.value=n.dragStartPosition-n.dragStartX+x.x:n.isRtl?u.value=n.dragStartPosition+n.dragStartX-x.x:u.value=n.dragStartPosition-n.dragStartX+x.x};const k=()=>{n.isDragging=!1,document.removeEventListener("mouseup",k),document.removeEventListener("mousemove",l.$SRSMouseMove)};document.addEventListener("mousemove",l.$SRSMouseMove),document.addEventListener("mouseup",k)},z=(t,r)=>{if(n.changingByKey)return;n.changingByKey=!0;let l=40,k=0;const x=()=>{!n.isRtl&&(r.code==="ArrowDown"||r.code==="ArrowLeft")||n.isRtl&&(r.code==="ArrowUp"||r.code==="ArrowRight")?(t==1&&i.value--,t==2&&u.value--):(!n.isRtl&&(r.code==="ArrowUp"||r.code==="ArrowRight")||n.isRtl&&(r.code==="ArrowDown"||r.code==="ArrowLeft"))&&(t==1&&i.value++,t==2&&u.value++)};x();const D=setInterval(()=>{k++,!(k<l)&&(l>1&&l--,x())},5);r.target instanceof HTMLElement&&r.target.addEventListener("keyup",()=>{n.changingByKey=!1,clearInterval(D)})},ie=(t,r)=>{let l;return t.currentStyle?l=t.currentStyle[r]:window.getComputedStyle&&(l=document.defaultView.getComputedStyle(t,null).getPropertyValue(r)),l};return(t,r)=>{var l,k,x,D;return e.openBlock(),e.createElementBlock("div",H,[e.createElementVNode("div",{class:"simple-range-slider-bg-bar",style:e.normalizeStyle({background:g.barColor}),ref_key:"bar",ref:N},[e.unref(a)?(e.openBlock(),e.createElementBlock("div",{key:0,class:"simple-range-slider-bar",style:e.normalizeStyle(e.unref(ee))},null,4)):e.createCommentVNode("",!0),e.unref(L)?(e.openBlock(),e.createElementBlock("div",{key:1,style:e.normalizeStyle([{right:"unset"},e.unref(re)]),class:"simple-range-slider-popover simple-range-slider-merged-popover"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input1Container",ref:M},[e.renderSlot(t.$slots,"prefix",{value:e.unref(h)},void 0,!0),e.createElementVNode("div",{ref_key:"input1",ref:p,class:"input1",style:{display:"inline-block"},contenteditable:"true",innerHTML:(l=e.unref(h))==null?void 0:l.toLocaleString("en-US"),onKeydown:r[0]||(r[0]=(...f)=>e.unref(_)&&e.unref(_)(...f))},null,40,O),e.renderSlot(t.$slots,"suffix",{value:e.unref(h)},void 0,!0)],512),e.createElementVNode("label",null,[e.createElementVNode("div",{style:{display:"inline-block",padding:"0 3px"},ref_key:"input_",ref:C},[t.$slots.splitter?e.renderSlot(t.$slots,"splitter",{key:0},void 0,!0):(e.openBlock(),e.createElementBlock(e.Fragment,{key:1},[j],64))],512)]),e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input2Container",ref:A},[e.renderSlot(t.$slots,"prefix",{value:e.unref(E)},void 0,!0),e.createElementVNode("div",{ref_key:"input2",ref:d,class:"input2",style:{display:"inline-block"},contenteditable:"true",textContent:e.toDisplayString((k=e.unref(E))==null?void 0:k.toLocaleString("en-US")),onKeydown:r[1]||(r[1]=(...f)=>e.unref(P)&&e.unref(P)(...f))},null,40,J),e.renderSlot(t.$slots,"suffix",{value:e.unref(E)},void 0,!0)],512)],4)):e.createCommentVNode("",!0),e.createElementVNode("div",{class:"simple-range-slider-anchor",style:e.normalizeStyle(e.unref(te))},[e.createElementVNode("div",{tabindex:"1",onMousedown:r[2]||(r[2]=e.withModifiers(f=>X(1,f),["prevent","stop"])),onKeydown:r[3]||(r[3]=f=>z(1,f)),class:"simple-range-slider-handle"},null,32),e.unref(L)?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,style:e.normalizeStyle({right:n.isRtl?"0 !important":"",left:n.isRtl?"unset":""}),class:"simple-range-slider-popover simple-range-slider-popover-left"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input1Container",ref:M},[e.renderSlot(t.$slots,"prefix",{value:e.unref(_)},void 0,!0),e.createElementVNode("div",{ref_key:"input1",ref:p,class:"input1",contenteditable:"true",textContent:e.toDisplayString((x=e.unref(h))==null?void 0:x.toLocaleString("en-US")),style:{display:"inline-block"},onKeydown:r[4]||(r[4]=(...f)=>e.unref(_)&&e.unref(_)(...f))},null,40,q),e.renderSlot(t.$slots,"suffix",{value:e.unref(_)},void 0,!0)],512)],4)),G],4),e.unref(a)?(e.openBlock(),e.createElementBlock("div",{key:2,class:"simple-range-slider-anchor",style:e.normalizeStyle(e.unref(ne))},[e.createElementVNode("div",{tabindex:"1",onMousedown:r[5]||(r[5]=e.withModifiers(f=>X(2,f),["prevent","stop"])),onKeydown:r[6]||(r[6]=f=>z(2,f)),class:"simple-range-slider-handle"},null,32),e.unref(L)?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,style:e.normalizeStyle({left:n.isRtl?"-3px !important":"",right:n.isRtl?"unset !important":""}),class:"simple-range-slider-popover simple-range-slider-popover-right"},[e.createElementVNode("div",{class:"simple-range-slider-input-container",ref_key:"input2Container",ref:A},[e.renderSlot(t.$slots,"prefix",{value:e.unref(P)},void 0,!0),e.createElementVNode("div",{ref_key:"input2",ref:d,class:"input2",contenteditable:"true",textContent:e.toDisplayString((D=e.unref(E))==null?void 0:D.toLocaleString("en-US")),style:{display:"inline-block"},onKeydown:r[7]||(r[7]=(...f)=>e.unref(P)&&e.unref(P)(...f))},null,40,Q),e.renderSlot(t.$slots,"suffix",{value:e.unref(P)},void 0,!0)],512)],4)),Y],4)):e.createCommentVNode("",!0)],4)])}}}),oe="";return((g,y)=>{const o=g.__vccOpts||g;for(const[S,w]of y)o[S]=w;return o})($,[["__scopeId","data-v-8bfea492"]])});
