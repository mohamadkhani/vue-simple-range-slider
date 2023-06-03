<template>
    <div class="simple-range-slider" ref="root">
        <div class="simple-range-slider-bg-bar" :style="{ background: barColor }" ref="bar">
            <div class="simple-range-slider-bar" v-if="isRange" :style="barStyle" />
            <div
                v-if="isPopoverMerged"
                style="right: unset"
                class="simple-range-slider-popover simple-range-slider-merged-popover"
                :style="mergedPopoverStyle"
            >
                <div class="simple-range-slider-input-container" ref="input1Container">
                    <slot name="prefix" :value="anchor1Value" />
                    <div
                        ref="input1"
                        class="input1"
                        style="display: inline-block"
                        :contenteditable="popoverContentEditable"
                        v-html="anchor1Value?.toLocaleString('en-US')"
                        @keydown="input1Keydown"
                    />
                    <slot name="suffix" :value="anchor1Value" />
                </div>

                <label>
                    <div style="display: inline-block; padding: 0 3px" ref="input_">
                        <slot v-if="$slots.splitter" name="splitter" />
                        <template v-else>|</template>
                    </div>
                </label>
                <div class="simple-range-slider-input-container" ref="input2Container">
                    <slot name="prefix" :value="anchor2Value" />
                    <div
                        ref="input2"
                        class="input2"
                        style="display: inline-block"
                        :contenteditable="popoverContentEditable"
                        @keydown="input2Keydown"
                    >
                        {{ anchor2Value?.toLocaleString('en-US') }}
                    </div>
                    <slot name="suffix" :value="anchor2Value" />
                </div>
            </div>

            <div class="simple-range-slider-anchor" :style="anchor1Style">
                <div
                    tabindex="1"
                    @mousedown.stop="mouseDown(1, $event)"
                    @keydown.stop="keyDown(1, $event)"
                    class="simple-range-slider-handle"
                />
                <div
                    v-if="!isPopoverMerged"
                    :style="{
                        right: state.isRtl ? '0 !important' : '',
                        left: state.isRtl ? 'unset' : ''
                    }"
                    class="simple-range-slider-popover simple-range-slider-popover-left"
                >
                    <div class="simple-range-slider-input-container" ref="input1Container">
                        <slot name="prefix" :value="input1Keydown" />
                        <div
                            ref="input1"
                            class="input1"
                            :contenteditable="popoverContentEditable"
                            style="display: inline-block"
                            @keydown="input1Keydown"
                        >
                            {{ anchor1Value?.toLocaleString('en-US') }}
                        </div>
                        <slot name="suffix" :value="input1Keydown" />
                    </div>
                </div>
                <div class="simple-range-slider-popover-arrow" />
            </div>

            <div v-if="isRange" class="simple-range-slider-anchor" :style="anchor2Style">
                <div
                    tabindex="1"
                    @mousedown.stop="mouseDown(2, $event)"
                    @keydown.stop="keyDown(2, $event)"
                    class="simple-range-slider-handle"
                />
                <div
                    v-if="!isPopoverMerged"
                    :style="{
                        left: state.isRtl ? '-3px !important' : '',
                        right: state.isRtl ? 'unset !important' : ''
                    }"
                    class="simple-range-slider-popover simple-range-slider-popover-right"
                >
                    <div class="simple-range-slider-input-container" ref="input2Container">
                        <slot name="prefix" :value="input2Keydown" />
                        <div
                            ref="input2"
                            class="input2"
                            :contenteditable="popoverContentEditable"
                            style="display: inline-block"
                            @keydown="input2Keydown"
                        >
                            {{ anchor2Value?.toLocaleString('en-US') }}
                        </div>
                        <slot name="suffix" :value="input2Keydown" />
                    </div>
                </div>

                <div class="simple-range-slider-popover-arrow" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref, watch, CSSProperties, reactive, onUnmounted, defineComponent } from 'vue';
import { isVue2 } from 'vue-demi';
import { debounce } from '../utils.js';

const positionLimits = ($position: number, $anchorIndex: number) => {
    if ($anchorIndex === 2) {
        $position = Math.min(
            state.width,
            Math.max(
                valueToPosition(anchor1Value.value !== undefined ? anchor1Value.value : props.min),
                $position
            )
        );
    }
    if ($anchorIndex === 1) {
        $position = Math.min(
            isRange.value
                ? valueToPosition(anchor2Value.value !== undefined ? anchor2Value.value : props.max)
                : state.width,
            $position
        );
        $position = Math.max(0, $position);
    }
    return $position;
};

const valueToPosition = ($value: number) => {
    if (props.exponential) {
        const valueRange = props.max - props.min;
        return unExp(($value - props.min) / valueRange, valueRange) * state.width;
    } else {
        return ($value - props.min) * scale.value;
    }
};

const positionToValue = ($position: number) => {
    if (props.exponential) {
        const valueRange = props.max - props.min;
        let r = Math.round(exp($position / state.width, valueRange) * valueRange) + props.min;
        if (props.keepJustSignificantFigures) {
            r = roundValue(r);
        }
        return r;
    } else {
        return props.min + Math.round($position / scale.value);
    }
};

const roundValue = (input: number) => {
    return Number(input.toPrecision(props.significantFigures));
};

const exp = (input: number, valueRange: number) => {
    const base = Math.E + valueRange;
    return (Math.pow(base, input) - 1) / (Math.pow(base, 1) - 1); // Math.ceil((Math.pow(pos / state.width, base) + 1 ) * valueRange);
};

const unExp = (input: number, valueRange: number): number => {
    const base = Math.E;
    const out = Math.log(input * (valueRange + base) + 1) / Math.log(base + valueRange);
    return out;
};

const props = withDefaults(
    defineProps<{
        modelValue?: [number, number] | number | undefined;
        value?: [number, number] | number | undefined;
        exponential?: boolean;
        barColor?: string;
        activeBarColor?: string;
        max?: number;
        min?: number;
        keepJustSignificantFigures?: boolean;
        significantFigures?: number;
        popoverContentEditable?: boolean;
    }>(),
    {
        min: 0,
        max: 100,
        exponential: false,
        activeBarColor: '#7e7e7e',
        barColor: '#bebebe',
        keepJustSignificantFigures: true,
        significantFigures: 2,
        popoverContentEditable: true
    }
);
const emit = defineEmits<{
    (e: 'input', value: [number, number] | number | undefined): void;
    (e: 'update:model-value', value: [number, number] | number | undefined): void;
}>();

const input1 = ref<HTMLDivElement>();
const input1Container = ref<HTMLDivElement>();
const input2 = ref<HTMLDivElement>();
const input2Container = ref<HTMLDivElement>();
const input_ = ref<HTMLDivElement>();
const bar = ref<HTMLDivElement>();
const root = ref<HTMLDivElement>();

const resizeObservers: { ro1?: ResizeObserver; ro2?: ResizeObserver; ro3?: ResizeObserver } = {};
const state = reactive<{
    input1Width: number;
    input2Width: number;
    dashInput: number;
    anchor1PositionV: number;
    anchor2PositionV: number;
    isRtl: boolean;
    width: number;
    draggingAnchor: number;
    dragStartX: number;
    dragStartPosition: number;
    isDragging: boolean;
    changingByKey?: number;
}>({
    input1Width: 0,
    input2Width: 0,
    dashInput: 80,
    anchor1PositionV: 0,
    anchor2PositionV: 0,
    isRtl: false,
    width: 100,
    draggingAnchor: 0,
    dragStartX: 0,
    dragStartPosition: 0,
    isDragging: false,
});
const anchorWidth = 15;

onMounted(() => {
    if (getStyle(root.value as HTMLElement, 'direction') === 'rtl') {
        state.isRtl = true;
    }
    resizeObservers.ro3 = new ResizeObserver((o) => {
        state.width = o[0].contentRect.width - (isRange.value ? anchorWidth : 0);
    });
    if (bar.value) {
        resizeObservers.ro3.observe(bar.value);
        state.width = bar.value.getBoundingClientRect()?.width - (isRange.value ? anchorWidth : 0);
    }
});

onUnmounted(() => {
    resizeObservers?.ro3?.disconnect();
});

const updateAnchor2Value = ($position: number) => {
    anchor2Value.value = positionToValue($position);
};

//const setAnchor2Position = debounce(setAnchor2PositionUD, 10);

const updateAnchor1Value = ($position: number) => {
    anchor1Value.value = positionToValue($position);
};

//const setAnchor1Position = debounce(setAnchor1PositionUD, 10);

const scale = computed((): number => {
    return state.width / (props.max - props.min);
});

const anchor2Position = computed({
    get: () => {
        return state.anchor2PositionV;
    },
    set: ($position) => {
        if ($position == state.anchor1PositionV) return;
        $position = positionLimits($position, 2);
        if (state.anchor2PositionV !== $position) state.anchor2PositionV = $position;
        updateAnchor2Value($position);
    }
});

const anchor1Position = computed({
    get: () => {
        return state.anchor1PositionV;
    },

    set: ($position) => {
        if ($position == state.anchor1PositionV) return;
        $position = positionLimits($position, 1);
        if (state.anchor1PositionV !== $position) state.anchor1PositionV = $position;
        updateAnchor1Value($position);
    }
});

const isRange = computed(() => {
    return Array.isArray(iValue.value);
});

const anchor1Value = computed<number | undefined>({
    get: () => {
        if (isRange.value && Array.isArray(iValue.value)) {
            return iValue.value[0];
        } else if (!isRange.value && !Array.isArray(iValue.value)) {
            return iValue.value;
        } else {
            return undefined;
        }
    },
    set: ($value: number | undefined) => {
        if (isRange.value && Array.isArray(iValue.value)) {
            if ($value === iValue.value[0]) return;
            iValue.value = [$value || 0, iValue.value[1]];
        } else if (!isRange.value && !Array.isArray(iValue.value)) {
            if ($value === iValue.value) return;
            iValue.value = $value;
        }
    }
});

const anchor2Value = computed<number | undefined>({
    get: () => {
        if (isRange.value && Array.isArray(iValue.value)) {
            return iValue.value[1];
        } else if (!isRange.value && !Array.isArray(iValue.value)) {
            return iValue.value;
        } else {
            return undefined;
        }
    },
    set: ($value: number | undefined) => {
        if (isRange.value && Array.isArray(iValue.value)) {
            if ($value === iValue.value[1]) return;
            iValue.value = [iValue.value[0], $value || 0];
        } else if (!isRange.value && !Array.isArray(iValue.value)) {
            if ($value === iValue.value) return;
            iValue.value = $value;
        }
    }
});

const ISVUE2 = process.env.ISVUE2;

const iValue = computed({
    get: () => {
        if (ISVUE2 || isVue2) return props.value;
        else return props.modelValue;
    },
    set: (value) => {
        if (
            (Array.isArray(value) &&
                Array.isArray(props.modelValue) &&
                value[0] === props.modelValue[0] &&
                value[1] === props.modelValue[1]) ||
            (!Array.isArray(value) && value === props.modelValue)
        ) {
            return;
        }
        if (ISVUE2 || isVue2) emit('input', value);
        else emit('update:model-value', value);
    }
});

watch(
    () => input1Container.value,
    (v) => {
        if (resizeObservers.ro1) {
            resizeObservers.ro1.disconnect();
        }
        resizeObservers.ro1 = new ResizeObserver((o) => {
            state.input1Width = o[0].target.getBoundingClientRect().width;
        });
        if (v) resizeObservers.ro1.observe(v);
    },
    { immediate: true }
);
watch(
    () => input2Container.value,
    (v) => {
        if (resizeObservers.ro2) {
            resizeObservers.ro2.disconnect();
        }
        resizeObservers.ro2 = new ResizeObserver((o) => {
            state.input2Width = o[0].target.getBoundingClientRect().width;
        });
        if (v) resizeObservers.ro2.observe(v);
    },
    { immediate: true }
);
watch(
    () => input_.value,
    (v) => {
        state.dashInput = v?.getBoundingClientRect()?.width || 30;
    },
    {
        immediate: true
    }
);

watch(
    () => ({
        value: iValue.value,
        scale: scale.value,
        exponential: props.exponential
    }),
    ({ value: current }) => {
        if (state.isDragging) return;
        if (Array.isArray(current)) {
            anchor1Position.value = valueToPosition(current[0]);
            anchor2Position.value = valueToPosition(current[1]);
        } else {
            if (current) {
                anchor1Position.value = valueToPosition(current);
            } else {
                anchor1Position.value = 0;
            }
        }
    },
    { immediate: true }
);

const input1KeydownUD = ($event: KeyboardEvent) => {
    setTimeout(() => {
        if (!props.popoverContentEditable) {
            if (!input1.value) return;
            input1.value.innerText = String(anchor1Value.value);
        } else {
            anchor1Value.value = Number.parseInt(input1.value?.innerText.replace(/,/g, '') || '0');
        }
    }, 100);
};
const input1Keydown = debounce(input1KeydownUD, 1000);
const input2KeydownUD = ($event: KeyboardEvent) => {
    setTimeout(() => {
        if (!props.popoverContentEditable) {
            if (!input2.value) return;
            input2.value.innerText = String(anchor2Value.value);
        } else {
            anchor2Value.value = Number.parseInt(input2.value?.innerText.replace(/,/g, '') || '0');
        }
    }, 100);
};
const input2Keydown = debounce(input2KeydownUD, 1000);

const isPopoverMerged = computed(() => {
    return (
        anchor2Position.value - anchor1Position.value < state.input1Width + state.input2Width - 15 &&
        isRange.value
    );
});

watch(
    () => isPopoverMerged.value,
    () => {
        if (input1.value instanceof HTMLInputElement && document.activeElement === input1.value) {
            const position = input1.value.selectionStart as number;
            if (input1.value instanceof HTMLInputElement) {
                input1.value.focus();
                input1.value.setSelectionRange(position, position);
            }
        }
        if (input2.value instanceof HTMLInputElement && document.activeElement === input2.value) {
            const position = input2.value.selectionStart as number;
            if (input2.value instanceof HTMLInputElement) {
                input2.value.focus();
                input2.value.setSelectionRange(position, position);
            }
        }
    }
);

const barStyle = computed(() => {
    return {
        transform:
            'translateX(' +
            (state.isRtl ? state.width - anchor2Position.value : anchor1Position.value) +
            'px)',
        width: anchor2Position.value - anchor1Position.value + 15 + 'px',
        background: props.activeBarColor
    };
});

const anchor1Style = computed(() => {
    return {
        transform:
            'translateX(' +
            (state.isRtl
                ? state.width - anchor1Position.value + (isRange.value ? 7.5 : -7.5)
                : anchor1Position.value - 7.5) +
            'px)'
    };
});

const anchor2Style = computed(() => {
    return {
        transform:
            'translateX(' +
            (state.isRtl ? state.width - state.anchor2PositionV - 7.5 : state.anchor2PositionV + 7.5) +
            'px)'
    };
});

const mergedPopoverStyle = computed<CSSProperties>(() => {
    let translateX =
        ((state.isRtl
            ? state.width - anchor2Position.value - anchorWidth / 2
            : anchor2Position.value - anchorWidth / 2) +
            (state.isRtl
                ? state.width - anchor1Position.value - anchorWidth / 2
                : anchor1Position.value - anchorWidth / 2)) /
            2 -
        (state.input1Width + state.input2Width + state.dashInput) / 2 +
        1;
    translateX = Math.max(translateX, -10);
    translateX = Math.min(
        translateX,
        state.width - (state.input1Width + state.input2Width + state.dashInput) + 10
    );
    return {
        transform: 'translateX(' + translateX + 'px)',
        width: anchor2Position.value - anchor1Position.value + 'px',
        direction: state.isRtl ? 'rtl' : 'ltr',
        minWidth: state.input1Width + state.input2Width + state.dashInput + 6 + 'px'
    };
});

const mouseDown = ($anchor: number, $event: MouseEvent) => {
    //$event.preventDefault();
    //$event.stopPropagation();
    state.isDragging = true;
    state.draggingAnchor = $anchor;
    state.dragStartX = $event.x;
    if ($anchor == 1) {
        state.dragStartPosition = anchor1Position.value;
    } else {
        state.dragStartPosition = anchor2Position.value;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win: any = window;

    win.$SRSMouseMove = ($event: MouseEvent) => {
        $event.preventDefault();
        $event.stopPropagation();
        if (!state.isDragging) return;
        if ($anchor == 1) {
            if (state.isRtl) {
                anchor1Position.value = state.dragStartPosition + state.dragStartX - $event.x;
            } else {
                anchor1Position.value = state.dragStartPosition - state.dragStartX + $event.x;
            }
        } else {
            if (state.isRtl) {
                anchor2Position.value = state.dragStartPosition + state.dragStartX - $event.x;
            } else {
                anchor2Position.value = state.dragStartPosition - state.dragStartX + $event.x;
            }
        }
    };

    win.mouseUp = ($event: MouseEvent) => {
        state.isDragging = false;
        document.removeEventListener('mouseup', win.mouseUp);
        document.removeEventListener('mousemove', win.$SRSMouseMove);
        $event.preventDefault();
        $event.stopPropagation();
    };
    document.addEventListener('mousemove', win.$SRSMouseMove);
    document.addEventListener('mouseup', win.mouseUp);
};

const keyDown = ($anchor: number, $event: KeyboardEvent) => {
    if (state.changingByKey === $anchor) return;
    state.changingByKey = $anchor;
    let speed = 40;
    let count = 0;
    const change = () => {
        if (
            (!state.isRtl && ($event.code === 'ArrowDown' || $event.code === 'ArrowLeft')) ||
            (state.isRtl && ($event.code === 'ArrowUp' || $event.code === 'ArrowRight'))
        ) {
            if ($anchor == 1) {
                anchor1Position.value--;
            }
            if ($anchor == 2) {
                anchor2Position.value--;
            }
        } else if (
            (!state.isRtl && ($event.code === 'ArrowUp' || $event.code === 'ArrowRight')) ||
            (state.isRtl && ($event.code === 'ArrowDown' || $event.code === 'ArrowLeft'))
        ) {
            if ($anchor == 1) {
                anchor1Position.value++;
            }
            if ($anchor == 2) {
                anchor2Position.value++;
            }
        }
    };
    change();
    const intervalKey = setInterval(() => {
        count++;
        if (count < speed) {
            return;
        }
        if (speed > 1) speed--;
        change();
    }, 5);
    if ($event.target instanceof HTMLElement) {
        $event.target.addEventListener('keyup', () => {
            state.changingByKey = undefined;
            clearInterval(intervalKey);
        });
    }
};

const getStyle = (el: HTMLElement, styleProp: string) => {
    let y;
    // @ts-ignore
    if (el.currentStyle)
        // @ts-ignore
        y = el.currentStyle[styleProp];
    // @ts-ignore
    else if (window.getComputedStyle)
        // @ts-ignore
        y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    return y;
};
</script>
<script lang="ts">
export default defineComponent({
    name: 'VueSimpleRangeSlider'
});
</script>

<style scoped lang="sass">
.simple-range-slider
  padding-top: 2px
  padding-bottom: 1px
  .simple-range-slider-input-container
    display: flex

  .simple-range-slider-bg-bar
    direction: ltr
    background: #bebebe
    min-width: 50px
    height: 4px
    position: relative
    margin: 40px 10px 20px 10px
    border-radius: 1.5px

    .simple-range-slider-bar
      height: 100%
      background: #6699ff

    .simple-range-slider-anchor
      width: 15px
      height: 15px
      position: absolute
      top: -6.5px
      background: #fefefe
      box-shadow: 0 0 4px 3px rgba(0, 0, 0, .2)
      border-radius: 8px

      .simple-range-slider-handle
        height: 100%
        width: 100%
        opacity: .5
        cursor: pointer
        user-select: none

      .simple-range-slider-handle:focus
        outline: none
        border-radius: 8px
        box-shadow: 0 0 3px 3px rgb(111, 132, 190)


      .simple-range-slider-popover-left
        left: -3px
        right: unset !important


      .simple-range-slider-popover-arrow
        color: white
        position: absolute
        top: -5px
        left: 1px
        width: 0
        height: 0
        border-left: 5px solid transparent
        border-right: 5px solid transparent
        border-top: 5px solid currentColor
        transform-origin: 50% 50%

  .simple-range-slider-popover
      right: 0
      position: absolute
      bottom: 20px
      background: white
      padding: 3px
      border-radius: 5px
      box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, .2)

      input
          border: none
          outline: none
          vertical-align: top
          direction: ltr
          padding: 0

  .simple-range-slider-merged-popover
      bottom: 15px
      .simple-range-slider-input-container
        display: inline-block
</style>
