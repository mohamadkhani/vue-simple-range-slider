import Vue from "vue";
import VueSimpleRangeSlider from "@/components/VueSimpleRangeSlider.vue";

//@ts-ignore
import VueInputAutowidth from 'vue-input-autowidth'


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

Vue.use(VueInputAutowidth);

Vue.component('vueSimpleRangeSlider',VueSimpleRangeSlider);

export default Vue.component('vueSimpleRangeSlider',VueSimpleRangeSlider);