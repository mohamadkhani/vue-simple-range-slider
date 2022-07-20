import { isVue2, isVue3 } from "vue-demi";
import Vue from "vue";

import App from "../App.vue";
console.log("isVue2", isVue2, isVue3);

new Vue(App).$mount("#app");
