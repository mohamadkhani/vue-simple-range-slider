<template>
  <div class="simple-range-slider">
    <div class="simple-range-slider-bg-bar" :style="{ background: barColor }">
      <div class="simple-range-slider-bar" v-if="isRange" :style="barStyle" />
      <div
        v-if="isPopoverMerged"
        style="right: unset"
        class="simple-range-slider-popover simple-range-slider-merged-popover"
        :style="mergedPopoverStyle"
      >
        <label>
          <div
            ref="input1"
            style="display: inline-block"
            contenteditable="true"
            @keydown="input1Keydown"
          >
            {{ anchor1Value }}
          </div>
        </label>

        <label>
          <div style="display: inline-block; padding: 0 3px" ref="input_">
            -
          </div>
        </label>
        <label>
          <div
            ref="input2"
            style="display: inline-block"
            contenteditable="true"
            @keydown="input2Keydown"
          >
            {{ anchor2Value }}
          </div>
        </label>
      </div>

      <div class="simple-range-slider-anchor" :style="anchor1Style">
        <div
          tabindex="1"
          @mousedown="mouseDown(1, $event)"
          @keydown="keyDown(1, $event)"
          class="simple-range-slider-handle"
        />
        <div
          v-if="!isPopoverMerged"
          :style="{
            right: isRtl ? '0 !important' : '',
            left: isRtl ? 'unset' : '',
          }"
          class="simple-range-slider-popover simple-range-slider-popover-left"
        >
          <label>
            <div
              ref="input1"
              contenteditable="true"
              v-text="anchor1Value"
              style="display: inline-block"
              @keydown="input1Keydown"
            />
          </label>
        </div>
        <div class="simple-range-slider-popover-arrow" />
      </div>

      <div
        v-if="isRange"
        class="simple-range-slider-anchor"
        :style="anchor2Style"
      >
        <div
          tabindex="1"
          @mousedown="mouseDown(2, $event)"
          @keydown="keyDown(2, $event)"
          class="simple-range-slider-handle"
        />
        <div
          v-if="!isPopoverMerged"
          :style="{
            left: isRtl ? '-3px !important' : '',
            right: isRtl ? 'unset !important' : '',
          }"
          class="simple-range-slider-popover"
        >
          <label>
            <div
              type="text"
              ref="input2"
              contenteditable="true"
              v-text="anchor2Value"
              style="display: inline-block"
              @keydown="input2Keydown"
            />
          </label>
        </div>

        <div class="simple-range-slider-popover-arrow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "@vue/reactivity";
import { getCurrentInstance, onMounted, StyleValue, watch } from "vue-demi";

const props = defineProps<{
  msg?: string;
  default?: number;
  modelValue: [number, number] | number | undefined;
  exponential?: boolean;
  barColor?: string;
  activeBarColor?: string;
  max?: number;
  min?: number;
  significantFigures?: number;
}>();
const emit = defineEmits<{
  (e: "input", value: [number, number] | number): void;
  (e: "update:model-value", value: [number, number] | number | undefined): void;
}>();

const input1 = ref<HTMLDivElement>();
const input2 = ref<HTMLDivElement>();
const input_ = ref<HTMLDivElement>();
const input1Width = ref(0);
const input2Width = ref(0);
const dashInput = ref(80);
const anchor1PositionV = ref(0);
const anchor2PositionV = ref(0);
const isRtl = ref(false);
const anchorWidth = 15;
const resizeObservers: { ro1?: ResizeObserver; ro2?: ResizeObserver } = {};

watch(
  () => input1.value,
  (v) => {
    if (resizeObservers.ro1) {
      resizeObservers.ro1.disconnect();
    }
    resizeObservers.ro1 = new ResizeObserver((o) => {
      input1Width.value = o[0].contentRect.width;
    });
    if (v) resizeObservers.ro1.observe(v);
  },
  { immediate: true }
);
watch(
  () => input2.value,
  (v) => {
    if (resizeObservers.ro2) {
      resizeObservers.ro2.disconnect();
    }
    resizeObservers.ro2 = new ResizeObserver((o) => {
      input2Width.value = o[0].contentRect.width;
    });
    if (v) resizeObservers.ro2.observe(v);
  },
  { immediate: true }
);
watch(
  () => input_.value,
  (v) => {
    dashInput.value = v?.getBoundingClientRect()?.width || 30;
  },
  {
    immediate: true,
  }
);

watch(
  () => props.modelValue,
  (current, prev) => {
    if (isDragging.value) return;
    if (Array.isArray(current)) {
      anchor1Position.value = valueToPosition(current[0], 1);
      anchor2Position.value = valueToPosition(current[1], 2);
    } else {
      if (current) {
        anchor1Position.value = valueToPosition(current, 1);
      } else {
        anchor1Position.value = 0;
      }
    }
  }
);

const input1KeydownUD = ($event: KeyboardEvent) => {
  setTimeout(() => {
    anchor1Value.value = Number.parseInt(input1.value?.innerText || "0");
  }, 100);
};
const input1Keydown = debounce(input1KeydownUD, 1000);
const input2KeydownUD = ($event: KeyboardEvent) => {
  setTimeout(() => {
    anchor2Value.value = Number.parseInt(input2.value?.innerText || "0");
  }, 100);
};
const input2Keydown = debounce(input2KeydownUD, 1000);

const anchor1Value = computed<number | undefined>({
  get: () => {
    if (isRange.value && Array.isArray(props.modelValue)) {
      return props.modelValue[0];
    } else if (!isRange.value && !Array.isArray(props.modelValue)) {
      return props.modelValue;
    }
  },
  set: ($value: number | undefined) => {
    if (isRange.value && Array.isArray(props.modelValue)) {
      if ($value === props.modelValue[0]) return;
      emit("update:model-value", [$value || 0, props.modelValue[1]]);
    } else if (!isRange.value && !Array.isArray(props.modelValue)) {
      if ($value === props.modelValue) return;
      emit("update:model-value", $value);
    }
  },
});

const anchor2Value = computed<number | undefined>({
  get: () => {
    if (isRange.value && Array.isArray(props.modelValue)) {
      return props.modelValue[1];
    } else if (!isRange.value && !Array.isArray(props.modelValue)) {
      return props.modelValue;
    }
  },
  set: ($value: number | undefined) => {
    if (isRange.value && Array.isArray(props.modelValue)) {
      if ($value === props.modelValue[1]) return;
      emit("update:model-value", [props.modelValue[0], $value || 0]);
    } else if (!isRange.value && !Array.isArray(props.modelValue)) {
      if ($value === props.modelValue) return;
      emit("update:model-value", $value);
    }
  },
});

const isRange = computed(() => {
  return Array.isArray(props.modelValue);
});

// eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures

const anchor2Position = computed({
  get: () => {
    return anchor2PositionV.value;
  },
  set: ($position) => {
    if ($position == anchor1PositionV.value) return;
    $position = positionLimits($position, 2);
    anchor2Value.value = positionToValue($position);
    if (anchor2PositionV.value !== $position)
      anchor2PositionV.value = $position;
  },
});

const anchor1Position = computed({
  get: () => {
    return anchor1PositionV.value;
  },

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set: ($position) => {
    if ($position == anchor1PositionV.value) return;
    $position = positionLimits($position, 1);
    anchor1Value.value = positionToValue($position);
    if (anchor1PositionV.value !== $position)
      anchor1PositionV.value = $position;
  },
});

const isPopoverMerged = computed(() => {
  return (
    anchor2Position.value - anchor1Position.value <
      input1Width.value + input2Width.value - 15 && isRange.value
  );
});

watch(
  () => isPopoverMerged.value,
  () => {
    if (
      input1.value instanceof HTMLInputElement &&
      document.activeElement === input1.value
    ) {
      const position = input1.value.selectionStart as number;
      if (input1.value instanceof HTMLInputElement) {
        input1.value.focus();
        input1.value.setSelectionRange(position, position);
      }
    }
    if (
      input2.value instanceof HTMLInputElement &&
      document.activeElement === input2.value
    ) {
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
      "translateX(" +
      (isRtl.value
        ? width.value - anchor2Position.value
        : anchor1Position.value) +
      "px)",
    width: anchor2Position.value - anchor1Position.value + 15 + "px",
    background: props.activeBarColor,
  };
});

const anchor1Style = computed(() => {
  return {
    transform:
      "translateX(" +
      (isRtl.value
        ? width.value - anchor1Position.value + (isRange.value ? 7.5 : -7.5)
        : anchor1Position.value - 7.5) +
      "px)",
  };
});

const anchor2Style = computed(() => {
  return {
    transform:
      "translateX(" +
      (isRtl.value
        ? width.value - anchor2PositionV.value - 7.5
        : anchor2PositionV.value + 7.5) +
      "px)",
  };
});

const mergedPopoverStyle = computed<StyleValue>(() => {
  let translateX =
    ((isRtl.value
      ? width.value - anchor2Position.value - anchorWidth / 2
      : anchor2Position.value - anchorWidth / 2) +
      (isRtl.value
        ? width.value - anchor1Position.value - anchorWidth / 2
        : anchor1Position.value - anchorWidth / 2)) /
      2 -
    (input1Width.value + input2Width.value + dashInput.value) / 2 +
    1;
  translateX = Math.max(translateX, -10);
  translateX = Math.min(
    translateX,
    width.value - (input1Width.value + input2Width.value + dashInput.value) + 10
  );
  return {
    transform: "translateX(" + translateX + "px)",
    width: anchor2Position.value - anchor1Position.value + "px",
    direction: isRtl.value ? "rtl" : "ltr",
    minWidth:
      input1Width.value + input2Width.value + dashInput.value + 6 + "px",
  };
});

const valueToPosition = ($value: number, $anchorIndex: 1 | 2) => {
  if (props.exponential) {
    return unLog($value);
  } else {
    return Math.round($value * scale.value);
  }
};

const positionLimits = ($position: number, $anchorIndex: number) => {
  if ($anchorIndex === 2) {
    $position = Math.min(
      width.value,
      Math.max(anchor1PositionV.value, $position)
    );
  }
  if ($anchorIndex === 1) {
    $position = Math.max(
      0,
      Math.min(isRange.value ? anchor2PositionV.value : width.value, $position)
    );
  }
  return $position;
};

const positionToValue = ($position: number) => {
  /* if (isRange.value && $anchorIndex === 2) {
    $position = Math.max($position - anchorWidth, 0);
  } */
  if (props.exponential) {
    const r = log($position);
    return r;
  } else {
    return Math.round($position / scale.value);
  }
};

const width = ref(50);

const minAnchorValue = computed(() => {
  return props.min || 0;
});

const maxAnchorValue = computed(() => {
  return props.max || 100;
});

const scale = computed((): number => {
  return width.value / (maxAnchorValue.value - minAnchorValue.value);
});

const draggingAnchor = ref(0);
const dragStartX = ref(0);
const dragStartPosition = ref(0);
const isDragging = ref(false);

const mouseDown = ($anchor: number, $event: MouseEvent) => {
  isDragging.value = true;
  draggingAnchor.value = $anchor;
  dragStartX.value = $event.x;
  if ($anchor == 1) {
    dragStartPosition.value = anchor1Position.value;
  } else {
    dragStartPosition.value = anchor2Position.value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win: any = window;

  win.$SRSMouseMove = ($event: MouseEvent) => {
    if ($anchor == 1) {
      if (isRtl.value) {
        anchor1Position.value =
          dragStartPosition.value + dragStartX.value - $event.x;
      } else {
        anchor1Position.value =
          dragStartPosition.value - dragStartX.value + $event.x;
      }
    } else {
      if (isRtl.value) {
        anchor2Position.value =
          dragStartPosition.value + dragStartX.value - $event.x;
      } else {
        anchor2Position.value =
          dragStartPosition.value - dragStartX.value + $event.x;
      }
    }
  };

  win.$SRSMouseUp = () => {
    isDragging.value = false;
    document.removeEventListener("mouseup", win.$SRSMouseUp);
    document.removeEventListener("mousemove", win.$SRSMouseMove);
  };
  document.addEventListener("mousemove", win.$SRSMouseMove);
  document.addEventListener("mouseup", win.$SRSMouseUp);
};

const changingByKey = ref(false);

const keyDown = ($anchor: number, $event: KeyboardEvent) => {
  if (changingByKey.value) return;
  changingByKey.value = true;
  let speed = 40;
  let count = 0;
  const change = () => {
    if (
      (!isRtl.value &&
        ($event.code === "ArrowDown" || $event.code === "ArrowLeft")) ||
      (isRtl.value &&
        ($event.code === "ArrowUp" || $event.code === "ArrowRight"))
    ) {
      if ($anchor == 1) {
        anchor1Position.value--;
      }
      if ($anchor == 2) {
        anchor2Position.value--;
      }
    } else if (
      (!isRtl.value &&
        ($event.code === "ArrowUp" || $event.code === "ArrowRight")) ||
      (isRtl.value &&
        ($event.code === "ArrowDown" || $event.code === "ArrowLeft"))
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
    $event.target.addEventListener("keyup", () => {
      changingByKey.value = false;
      clearInterval(intervalKey);
    });
  }
};

onMounted(() => {
  const instance = getCurrentInstance();
  if (getStyle(instance?.proxy?.$el as HTMLElement, "direction") === "rtl") {
    isRtl.value = true;
  }
  width.value =
    instance?.proxy?.$el.getBoundingClientRect().width -
    20 -
    (isRange.value ? 15 : 0);
});

const getStyle = (el: HTMLElement, styleProp: string) => {
  let y;
  // @ts-ignore
  if (el.currentStyle)
    // @ts-ignore
    y = el.currentStyle[styleProp];
  // @ts-ignore
  else if (window.getComputedStyle)
    // @ts-ignore
    y = document.defaultView
      .getComputedStyle(el, null)
      .getPropertyValue(styleProp);
  return y;
};

const log = (pos: number, round: boolean = true) => {
  pos = Math.max(0, pos);
  const valueRange = Math.log(maxAnchorValue.value - minAnchorValue.value + 1);
  const scale = valueRange / width.value;
  let num = Math.floor(Math.exp(scale * pos)); // Math.ceil((Math.pow(pos / width.value, base) + 1 ) * valueRange);
  if (num - 1 !== 0) {
    if (round) {
      const base = Math.pow(10, props.significantFigures || 2);
      console.log("base", base);
      const r10 = Math.pow(
        base,
        Math.floor(Math.log(num - 1 + minAnchorValue.value) / Math.log(base))
      );
      num = Math.floor(num / r10) * r10;
    }
  } else {
    num = num - 1 + minAnchorValue.value;
  }
  return num;
};

const unLog = (num: number): number => {
  num++;
  const valueRange = Math.log(maxAnchorValue.value - minAnchorValue.value + 1);
  const scale = valueRange / width.value;
  if (isRtl.value) {
    return Math.ceil(Math.log(num) / Math.log(Math.E) / scale);
  } else {
    return Math.floor(Math.log(num) / Math.log(Math.E) / scale);
  }
};

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: any;
  return function (...args: any[]) {
    //@ts-ignore
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
</script>

<style scoped lang="sass">
.simple-range-slider

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
</style>
