import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SimpleRangeSlider from './simpleRangeSlider.vue';
import { test, expect } from 'vitest';

test('simpleRangeSliderComponent', async () => {
    expect(SimpleRangeSlider).toBeTruthy();
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = window.ResizeObserver || ResizeObserver;

    const wrapper = mount(SimpleRangeSlider, {
        props: {
            modelValue: [0, 100],
            min: 100,
            max: 1000
        }
    });

    for (let i = 0; i <= 1000; i++) {
        wrapper.setProps({
            value: [i, 100]
        });

        await nextTick();
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        const input1 = wrapper.find('.input1');
        const input2 = wrapper.find('.input2');

        expect(input1?.element).toBeTruthy();
        expect(input2?.element).toBeTruthy();

        // Assert the rendered text of the component
        expect(input1.text()).toBe((i).toLocaleString('en-US'));
        expect(input2.text()).toBe((100).toLocaleString('en-US'));
    }
});
