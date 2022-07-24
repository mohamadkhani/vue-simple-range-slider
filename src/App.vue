<template>
    <div dir="ltr" style="margin-left: 100px; font-size: 20px">
        <VueSimpleRangeSlider
            style="width: 500px"
            :min="-10"
            :max="1000000000"
            :exponential="true"
            v-model="state.value1"
            active-bar-color="red"
            :significant-figures="6"
            bar-color="blue"
        >
            <template #suffix> ریال </template>
            <template #prefix> </template>
        </VueSimpleRangeSlider>
        <VueSimpleRangeSlider style="width: 100px" :min="10" :max="40" v-model="state.value2" />

        <VueSimpleRangeSlider
            style="width: 500px; direction: rtl"
            :min="0"
            :max="1000000"
            :exponential="true"
            v-model="state.value3"
            active-bar-color="#7e7e7e"
            bar-color="#bebebe"
            :significant-figures="3"
        />
        <VueSimpleRangeSlider
            style="width: 100px; direction: rtl"
            :min="-10"
            :max="40"
            v-model="state.value4"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import VueSimpleRangeSlider from './components/simpleRangeSlider.vue';
export default defineComponent({
    components: { VueSimpleRangeSlider },
    setup: () => {
        const state = reactive<{
            value1: [number, number];
            value3: [number, number];
            value2: number;
            value4: number;
        }>({
            value1: [10, 1000],
            value3: [10, 30],
            value2: 3,
            value4: 3
        });
        return { state };
    }
});
</script>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px
input
  font-size: 30px
</style>
