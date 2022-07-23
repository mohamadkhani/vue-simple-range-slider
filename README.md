# vue-simple-range-slider
Change Your numeric value or numeric range value with dragging handles

[Demo]()


## Features

* Single value and range slider support
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

### Example
```html
<template>
  <div>
    <VueSimpleRangeSlider
                    style="width: 300px"
                    :min="0"
                    :max="1000000"
                    :exponential="true"
                    v-model="state.range"
            />
    <VueSimpleRangeSlider
                    style="width: 300px"
                    :min="0"
                    :max="20"
                    v-model="state.number"
            />
  </div>
</template>
<script>
import VueSimpleRangeSlider from 'vue-simple-range-slider';
import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css';
import { reactive } from 'vue';
export default defineComponent({
    // register the component
    components: { VueSimpleRangeSlider },
    setup: (){
      const state = reactive({ range: [20,1000], number: 10 })
      return { state }
    }
})
</script>
```
    
### Props
|Name             |Type|Default|
|---              |---|---|
|value(vue2)      |```number``` Or ```[number,number]```||
|modelValue(vue2) |```number``` Or ```[number,number]```||
|min              |```number```                         |```0```   |
|max              |```number```                         |```100``` |
|exponential      |```boolean```                        |```false```|
|barColor         |```string```                         |```#bebebe```|
|activeBarColor   |```string```                         |```#6699ff```|


