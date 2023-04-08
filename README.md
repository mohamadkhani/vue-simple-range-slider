# vue-simple-range-slider
Change your numeric value or numeric range value with dragging handles

[Demo](https://stackblitz.com/edit/vue-simple-range-slider-example?embed=1&file=src/App.vue&view=preview)

## Features

* Single value and range slider support
* Vue3 and Vue2 supports
* Exponential and linear scale support
* Keyboard support
* rtl support

_Requires Vue >=3.2.0 or >=2.7.0_

## Getting Started
```
npm install vue-simple-range-slider
```
Or
```
yarn add vue-simple-range-slider
```

### Example (Vue 3)
```html
<template>
  <div>
    <VueSimpleRangeSlider
      style="width: 300px"
      :min="0"
      :max="1000000"
      exponential
      v-model="state.range"
    >
      <template #prefix="{ value }">$</template>
    </VueSimpleRangeSlider>
      
    <VueSimpleRangeSlider
      style="width: 300px"
      :min="0"
      :max="20"
      v-model="state.number"
    />
      
  </div>
</template>
<script>
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { reactive, defineComponent } from "vue";
export default defineComponent({
  // register the component
  components: { VueSimpleRangeSlider },
  setup() {
    const state = reactive({ range: [20, 1000], number: 10 });
    return { state };
  },
});
</script>
```



### Vue 2

For Vue 2 import the component like this:

```javascript
import VueSimpleRangeSlider from "vue-simple-range-slider/vue2";
import "vue-simple-range-slider/vue2/css";
```



### Props

|Name             |Type|Default|
|---              |---|---|
|value (vue2)      |```number``` Or ```[number,number]```||
|model-value (vue3) |```number``` Or ```[number,number]```||
|min              |```number```                         |```0```   |
|max              |```number```                         |```100``` |
|exponential      |```boolean```                        |```false```|
|bar-color         |```string```                         |```#bebebe```|
|active-bar-color   |```string```                         |```#6699ff```|
|keep-just-significant-figures   |```boolean```                         |```true```|
|significant-figures   |```number```                         |```2```|

### Events
|Name             |Type|
|---              |---|
|input (vue2)      |```(number) => void``` Or ```([number,number]) => void```|
|update:model-value (vue3)      |```(number) => void``` Or ```([number,number]) => void```|


### Slots
|Name             |Type|
|---              |---|
|prefix      |```{value: number}```|
|suffix      |```{value: number}```|
|splitter      |`void`|
