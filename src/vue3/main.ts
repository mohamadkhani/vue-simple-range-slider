import { isVue2, install, isVue3 } from "vue-demi";
import { createApp } from "vue";

import App from "../App.vue";
console.log("isVue2", isVue2, isVue3);

createApp(App).mount("#app");
