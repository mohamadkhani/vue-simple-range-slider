<template>
    <div class="simple-range-slider">
        <div class="simple-range-slider-bg-bar" :style="{background: barColor}">
            <div class="simple-range-slider-bar"
                 v-if="isRange"
                 :style="barStyle"
            />
            <div
                    v-if="popoverMerged"
                    style="right: unset"
                    class="simple-range-slider-popover simple-range-slider-merged-popover"
                    :style="mergedPopoverStyle">
                <label>
                    <input
                            type="text"
                            ref="input1"
                            v-digits-only
                            v-model.number="anchor1Value"
                            v-autowidth="{maxWidth: '960px', minWidth: '12px', comfortZone: 0}"
                    />
                </label>

                <label>
                    <input
                            type="text"
                            ref="input_"
                            disabled
                            value="-"
                            v-autowidth="{maxWidth: '960px', minWidth: '0', comfortZone: 0}"
                    />
                </label>
                <label>
                    <input
                            type="text"
                            ref="input2"
                            v-digits-only
                            v-model.number="anchor2Value"
                            v-autowidth="{maxWidth: '960px', minWidth: '12px', comfortZone: 0}"
                    />
                </label>
            </div>


            <div
                    class="simple-range-slider-anchor"
                    :style="anchor1Style"
            >
                <div
                        tabindex="1"
                        @mousedown="mouseDown(1, $event)"
                        @keydown="keyDown(1,$event)"
                        class="simple-range-slider-handle"/>
                <div
                        v-if="!popoverMerged"
                        :style="{right: isRtl?'0 !important':'',left: isRtl?'unset':''}"
                        class="simple-range-slider-popover simple-range-slider-popover-left"
                >
                    <label>
                        <input
                                type="text"
                                ref="input1"
                                v-digits-only
                                v-model.number="anchor1Value"
                                v-autowidth="{maxWidth: '960px', minWidth: '12px', comfortZone: 0}"
                        />
                    </label>
                </div>
                <div class="simple-range-slider-popover-arrow"/>
            </div>

            <div
                    v-if="isRange"
                    class="simple-range-slider-anchor"
                    :style="anchor2Style"
            >
                <div
                        tabindex="1"
                        @mousedown="mouseDown(2, $event)"
                        @keydown="keyDown(2,$event)"
                        class="simple-range-slider-handle"/>
                <div
                        v-if="!popoverMerged"
                        :style="{left: isRtl?'-3px !important':'',right: isRtl?'unset !important':''}"
                        class="simple-range-slider-popover">
                    <label>
                        <input
                                type="text"
                                ref="input2"
                                v-digits-only
                                v-model.number="anchor2Value"
                                v-autowidth="{maxWidth: '960px', minWidth: '12px', comfortZone: 0}"
                        />
                    </label>
                </div>

                <div class="simple-range-slider-popover-arrow"/>

            </div>


        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

    @Component
    export default class VueSimpleRangeSlider extends Vue {
        @Prop() private msg!: string;
        @Prop({default: 0}) min!: number;
        @Prop({default: 100}) max!: number;
        @Prop({default: false, type: Boolean}) logarithmic!: boolean;
        @Prop({required: true}) value!: [number, number] | number;
        @Prop() activeBarColor?: string;
        @Prop() barColor?: string;

        // Slider value and component internal value are inconsistent
        private get isNotSync() {

            const isNotSnc = Array.isArray(this.value)
                ? (!this.tempValue || !Array.isArray(this.tempValue)) ||
                //@ts-ignore
                this.value.some((val, index) => val !== this.tempValue[index])
                : this.value !== this.tempValue;
            return isNotSnc;
        }


        get syncValue() {
            if (Array.isArray(this.value) && this.isNotSync) {
                const value = this.value as [number, number];
                this.value1ToPosition(value[0]);
                this.value2ToPosition(value[1]);
            } else if (this.isNotSync) {
                const value = this.value as [number, number];
                this.value1ToPosition(this.value as number);
            }
            return this.value;
        }

        tempValue!: number | [number, number];

        // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
        set syncValue($value) {
            this.tempValue = $value;
            this.$emit('input', $value);
        }


        isRtl = false;

        @Watch('popoverMerged')
        popoverMergedStateChange() {
            if (this.$refs.input1 instanceof HTMLInputElement && document.activeElement === this.$refs.input1) {
                const position = this.$refs.input1.selectionStart as number;
                this.$nextTick().then(() => {
                    if (this.$refs.input1 instanceof HTMLInputElement) {
                        this.$refs.input1.focus();
                        this.$refs.input1.setSelectionRange(position, position);
                    }
                });
            }
            if (this.$refs.input2 instanceof HTMLInputElement && document.activeElement === this.$refs.input2) {
                const position = this.$refs.input2.selectionStart as number;
                this.$nextTick().then(() => {
                    if (this.$refs.input2 instanceof HTMLInputElement) {
                        this.$refs.input2.focus();
                        this.$refs.input2.setSelectionRange(position, position);
                    }
                });
            }
        }

        get popoverMerged() {
            return this.anchor2Position - this.anchor1Position < (this.input1Width + this.input2Width) + 4
                && this.isRange;
        }

        get isRange() {
            return Array.isArray(this.value)
        }

        get anchor1Style() {
            return {
                transform: 'translateX(' + (this.isRtl ? (this.width - this.anchor1Position - 7.5) : (this.anchor1Position - 7.5)) + 'px)'
            }
        }

        get barStyle() {
            return {
                transform: 'translateX(' + (this.isRtl ? (this.width - this.anchor2Position) : (this.anchor1Position)) + 'px)',
                width: (this.anchor2Position - this.anchor1Position) + 'px',
                background: this.activeBarColor
            }
        }

        get anchor2Style() {
            return {
                transform: 'translateX(' + (this.isRtl ? (this.width - this.anchor2Position - 7.5) : (this.anchor2Position - 7.5)) + 'px)'
            }
        }

        get mergedPopoverStyle() {
            let translateX = (
                    (this.isRtl ? (this.width - this.anchor2Position - 7.5) : (this.anchor2Position - 7.5)) +
                    (this.isRtl ? (this.width - this.anchor1Position - 7.5) : (this.anchor1Position - 7.5))
                ) / 2
                - (this.input1Width + this.input2Width + this.dashInput) / 2 + 3;
            translateX = Math.max(translateX, -10);
            translateX = Math.min(translateX, this.width - (this.input1Width + this.input2Width + this.dashInput) + 10);
            return {
                transform: 'translateX(' + translateX + 'px)',
                width: (this.anchor2Position - this.anchor1Position + 7.5) + 'px',
                direction: this.isRtl ? 'rtl' : 'ltr',
                minWidth: ((this.input1Width + this.input2Width + this.dashInput)) + 6 + 'px'
            }
        }

        get anchor1Value(): number {
            this.$nextTick().then(() => {
                if (this.$refs.input1 instanceof HTMLElement) {
                    this.input1Width = Math.max(12, Number.parseInt(this.$refs.input1.style.width.replace('px', '')));
                }
            });
            if (Array.isArray(this.syncValue))
                return this.syncValue[0];
            return this.syncValue;
        }

        set anchor1Value($value) {
            $value = Math.max(this.minAnchorValue, Math.min(this.maxAnchorValue, $value));
            if (this.isRange) {
                $value = Math.min(this.anchor2Value, $value);
            }
            if (this.isRange) {
                const value = [...this.syncValue as [number, number]] as [number, number];
                value[0] = $value;
                this.syncValue = value;
            } else {
                this.syncValue = $value;
            }
            this.value1ToPosition($value);
        }

        value1ToPosition($value: number) {
            if (this.logarithmic) {
                this.anchor1PositionV = this.unLog($value);
            } else {
                this.anchor1PositionV = Math.round($value * this.scale);
            }
        }

        get anchor2Value(): number {
            this.$nextTick().then(() => {
                if (this.$refs.input2 instanceof HTMLElement) {
                    this.input2Width = Math.max(12, Number.parseInt(this.$refs.input2.style.width.replace('px', '')));
                }
            });
            if (Array.isArray(this.syncValue))
                return this.syncValue[1];
            return this.syncValue;
        }

        set anchor2Value($value) {
            $value = Math.max(this.minAnchorValue, Math.min(this.maxAnchorValue, $value));
            if (this.isRange) {
                $value = Math.max(this.anchor1Value, $value);
            }
            if (this.isRange) {
                const value = [...this.syncValue as [number, number]] as [number, number];
                value[1] = $value;
                this.syncValue = value
            } else {
                this.syncValue = $value
            }
            this.value2ToPosition($value);
        }

        value2ToPosition($value: number) {
            if (this.isRange) {
                if (this.logarithmic) {
                    this.anchor2PositionV = this.unLog($value);
                } else {
                    this.anchor2PositionV = Math.round($value * this.scale);
                }
            }
        }


        anchor1PositionV = 0;

        get anchor1Position() {
            return this.anchor1PositionV;
        }

        input1Width = 0;
        input2Width = 0;
        dashInput = 0;

        // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
        set anchor1Position($position) {
            if (Array.isArray(this.syncValue)) {
                $position = Math.min(this.anchor2Position, $position);
            }

            if (this.logarithmic) {
                this.anchor1Value = this.log($position);
            } else {
                this.anchor1Value = Math.round($position / this.scale);
            }
            this.anchor1PositionV = Math.max(0, Math.min(this.width, $position));
        }

        anchor2PositionV = 0;

        get anchor2Position() {
            return this.anchor2PositionV;
        }

        set anchor2Position($position) {
            if (Array.isArray(this.syncValue)) {
                $position = Math.max(this.anchor1Position, $position);
            }
            if (this.logarithmic) {
                this.anchor2Value = this.log($position);
            } else {
                this.anchor2Value = Math.round($position / this.scale);
            }
            this.anchor2PositionV = Math.max(0, Math.min(this.width, $position));
        }

        width = 50;

        get minAnchorValue() {
            return this.min;
        }

        get maxAnchorValue() {
            return this.max;
        }

        get scale(): number {
            return (this.width - 7.5) / (this.maxAnchorValue - this.minAnchorValue);
        }

        draggingAnchor = 0;
        dragStartX = 0;
        dragStartPosition = 0;

        mouseDown($anchor: number, $event: MouseEvent) {
            this.draggingAnchor = $anchor;
            this.dragStartX = $event.x;
            if ($anchor == 1) {
                this.dragStartPosition = this.anchor1Position;
            } else {
                this.dragStartPosition = this.anchor2Position;
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win: any = window;

            win.$SRSMouseMove = ($event: MouseEvent) => {
                if ($anchor == 1) {
                    if (this.isRtl) {
                        this.anchor1Position = this.dragStartPosition + this.dragStartX - $event.x;
                    } else {
                        this.anchor1Position = this.dragStartPosition - this.dragStartX + $event.x;
                    }
                } else {
                    if (this.isRtl) {
                        this.anchor2Position = this.dragStartPosition + this.dragStartX - $event.x;
                    } else {
                        this.anchor2Position = this.dragStartPosition - this.dragStartX + $event.x;
                    }
                }
                this.$forceUpdate();
            };

            win.$SRSMouseUp = () => {
                document.removeEventListener('mouseup', win.$SRSMouseUp);
                document.removeEventListener('mousemove', win.$SRSMouseMove);
            };
            document.addEventListener('mousemove', win.$SRSMouseMove);
            document.addEventListener('mouseup', win.$SRSMouseUp);
        }

        changingByKey = false;

        keyDown($anchor: number, $event: KeyboardEvent) {
            if (this.changingByKey)
                return;
            this.changingByKey = true;
            let speed = 40;
            let count = 0;
            const change = () => {
                if (
                    (!this.isRtl && ($event.code === "ArrowDown" || $event.code === "ArrowLeft"))
                    ||
                    (this.isRtl && ($event.code === "ArrowUp" || $event.code === "ArrowRight"))
                ) {
                    if ($anchor == 1) {
                        this.anchor1Position--;
                    }
                    if ($anchor == 2) {
                        this.anchor2Position--;
                    }
                } else if (
                    (!this.isRtl && ($event.code === "ArrowUp" || $event.code === "ArrowRight"))
                    ||
                    (this.isRtl && ($event.code === "ArrowDown" || $event.code === "ArrowLeft"))
                ) {
                    if ($anchor == 1) {
                        this.anchor1Position++;
                    }
                    if ($anchor == 2) {
                        this.anchor2Position++;
                    }
                }
            };
            change();
            const intervalKey = setInterval(() => {
                count++;
                if (count < speed) {
                    return;
                }
                if (speed > 1)
                    speed--;
                change();
            }, 5);
            if ($event.target instanceof HTMLElement) {
                $event.target.addEventListener('keyup', () => {
                    this.changingByKey = false;
                    clearInterval(intervalKey);
                });
            }
        }

        mounted() {

            if (this.getStyle(this.$el as HTMLElement, 'direction') === 'rtl') {
                this.isRtl = true;
            }
            this.width = this.$el.getBoundingClientRect().width - 20;
            //this.valueChanged(this.value);
            setTimeout(() => {
                this.width = this.$el.getBoundingClientRect().width - 20;
            });
            if (this.$refs.input_ instanceof HTMLElement) {
                this.dashInput = Number.parseInt(this.$refs.input_.style.width.replace("px", ""));
            }

        }

        getStyle(el: HTMLElement, styleProp: string) {
            let y;
            // @ts-ignore
            if (el.currentStyle)
                // @ts-ignore
                y = el.currentStyle[styleProp];
            // @ts-ignore
            else if (window.getComputedStyle)
                // @ts-ignore
                y = document.defaultView.getComputedStyle(el, null)
                    .getPropertyValue(styleProp);
            return y;
        }

        log(pos: number) {
            pos = Math.max(0, pos);
            const valueRange = Math.log(this.maxAnchorValue - this.minAnchorValue);
            const scale = valueRange / this.width;
            let num = Math.floor(Math.exp(scale * pos));// Math.ceil((Math.pow(pos / this.width, base) + 1 ) * valueRange);
            if (num - 1 !== 0) {
                const r10 = Math.pow(10, Math.floor(Math.log10(num - 1 + this.minAnchorValue)));
                num = Math.floor(num / r10) * r10;
            } else {
                num = num - 1 + this.minAnchorValue;
            }
            return num;
        }

        unLog(num: number) {
            num++;
            const valueRange = Math.log(this.maxAnchorValue - this.minAnchorValue);
            const scale = valueRange / this.width;
            if (this.isRtl) {
                return Math.ceil((Math.log(num) / Math.log(Math.E)) / scale);
            } else {
                return Math.floor((Math.log(num) / Math.log(Math.E)) / scale);
            }
        }

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
