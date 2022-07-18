import { Vue2, isVue2, install } from "vue-demi";
import { createApp } from "vue";
import App from "./App.vue";
import VueCompositionAPI from "@vue/composition-api";
let V;
if (isVue2) {
  Vue2.config.productionTip = false;
  Vue2.use(VueCompositionAPI);

  /* Vue2.directive("digitsOnly", (el, binding) => {
    if (!(el instanceof HTMLInputElement)) return;
    if (/[^0-9.]+/i.test(el.value)) {
      let newValue = el.value.replace(/[^0-9.]+/gi, "");
      if (newValue === "") {
        newValue = "0";
      }
      el.value = newValue;
      if (binding instanceof HTMLInputElement)
        //@ts-ignore
        binding.value = el.value;
    }
  }); */
  V = Vue2;
} else {
  install(createApp(App).mount("#app"));
}
/* new Vue.Vue2({
    render: (h) => h(App),
  }).$mount("#app"); */
