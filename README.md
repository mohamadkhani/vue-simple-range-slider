# vue-simple-range-slider
Change Your numeric value or numeric range value with dragging handles

[Demo](https://csb-b2ovr.netlify.com/)


## Features

* Single value and range slider support
* Logarithmic and linear scale support
* Keyboard support
* rtl support

_Requires Vue 2.2+_

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
                    :logarithmic="true"
                    v-model="range"
            />
    <VueSimpleRangeSlider
                    style="width: 300px"
                    :min="0"
                    :max="20"
                    v-model="number"
            />
  </div>
</template>
<script>
import VueSimpleRangeSlider from 'vue-simple-range-slider';
import 'vue-simple-range-slider/dist/vueSimpleRangeSlider.css'
export default {
    // register the component
    components: { VueSimpleRangeSlider },
    data() {
          return {
               range: [20,1000],
               number: 10
          }
    }
}
</script>
```
    
### Props
|Name           |Type|Default|
|---            |---|---|
|value          |```number``` Or ```[number,number]```||
|min            |```number```                         |```0```   |
|max            |```number```                         |```100``` |
|logarithmic    |```boolean```                        |```false```|
|barColor       |```string```                         |```#bebebe```|
|activeBarColor |```string```                         |```#6699ff```|


[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8JJDU889K64AL)
