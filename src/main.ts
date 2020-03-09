import Vue from 'vue'
import App from './App.vue'
//@ts-ignore
import VueInputAutowidth from 'vue-input-autowidth'

Vue.use(VueInputAutowidth);

Vue.config.productionTip = false;

Vue.directive('digitsOnly', (el, binding) => {
    if (!(el instanceof HTMLInputElement))
        return;
    if (/[^0-9.]+/i.test(el.value)) {
        let newValue = el.value.replace(/[^0-9.]+/ig, '');
        if(newValue === ''){
          newValue = '0';
        }
        el.value = newValue;
        if (binding instanceof HTMLInputElement)
            //@ts-ignore
            binding.value = el.value;
    }
});

new Vue({
    render: h => h(App),
}).$mount('#app');
