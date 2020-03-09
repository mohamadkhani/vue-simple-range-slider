<template>
    <div dir="ltr" style="margin-left: 100px;font-size: 20px">
        {{value1}}
        <VueSimpleRangeSlider
                style="width: 1000px"
                :min="0"
                :max="1000000"
                :logarithmic="true"
                v-model="value1"
                active-bar-color="red"
                bar-color="blue"
        />
        {{value2}}
        <VueSimpleRangeSlider
                style="width: 100px"
                :min="0"
                :max="40"
                v-model="value2"
        />


        {{value1}}
        <VueSimpleRangeSlider
                style="width: 1000px;direction: rtl"
                :min="0"
                :max="1000000"
                :logarithmic="true"
                v-model="value1"
                active-bar-color="red"
                bar-color="blue"
        />
        {{value2}}
        <VueSimpleRangeSlider
                style="width: 100px;direction: rtl"
                :min="0"
                :max="40"
                v-model="value2"
        />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import VueSimpleRangeSlider from './components/VueSimpleRangeSlider.vue';

    @Component({
        components: {
            VueSimpleRangeSlider,
        },
    })
    export default class App extends Vue {
        value1 = [0,10];
        value2 = 3;


    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
<style>
    input{
        font-size: 30px;
    }
</style>
