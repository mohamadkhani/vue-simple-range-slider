<template>
  <div dir="ltr" style="margin-left: 100px; font-size: 20px">
    {{ state.value1 }} <input v-model.number="state.value1[0]" />
    <VueSimpleRangeSlider
      style="width: 1000px"
      :min="0"
      :max="1000000"
      :exponential="true"
      v-model="state.value1"
      active-bar-color="red"
      bar-color="blue"
    />
    {{ state.value2 }}
    <VueSimpleRangeSlider
      style="width: 100px"
      :min="10"
      :max="40"
      v-model="state.value2"
    />

    {{ state.value1 }}
    <VueSimpleRangeSlider
      style="width: 1000px; direction: rtl"
      :min="0"
      :max="1000000"
      :exponential="true"
      v-model="state.value1"
      active-bar-color="#7e7e7e"
      bar-color="#bebebe"
      :significant-figures="4"
    />
    {{ state.value2 }}
    <VueSimpleRangeSlider
      style="width: 100px; direction: rtl"
      :min="0"
      :max="40"
      v-model="state.value2"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import VueSimpleRangeSlider from "./components/VueSimpleRangeSlider.vue";
export default defineComponent({
  components: { VueSimpleRangeSlider },
  setup: () => {
    const state = reactive<{ value1: [number, number]; value2: number }>({
      value1: [0, 10],
      value2: 3,
    });
    return { state };
  },
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
