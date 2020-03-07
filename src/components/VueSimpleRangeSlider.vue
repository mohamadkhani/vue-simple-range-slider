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
                            :style="{width: ((Math.log10(maxAnchorValue)+1) * 7)+'px'}"
                            v-model="anchor1Value"/>
                </label>
                <label>
                    <input
                            :style="{float:isRtl?'left':'right',width: ((Math.log10(maxAnchorValue)+1) * 7)+'px'}"
                            v-model="anchor2Value"/>
                </label>
            </div>


            <div
                    class="simple-range-slider-anchor"
                    :style="anchor1Style"
            >
                <div
                        tabindex="1"
                        @keydown="keyDown(1,$event)"
                        @mousedown="mouseDown(1)"
                        class="simple-range-slider-handle"/>
                <div
                        v-if="!popoverMerged"
                        :style="{right: isRtl?'0 !important':'',left: isRtl?'unset':''}"
                        class="simple-range-slider-popover simple-range-slider-popover-left"
                >
                    <label>
                        <input
                                :style="{width: ((Math.log10(maxAnchorValue)+1) * 7)+'px'}"
                                v-model="anchor1Value"/>
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
                        @keydown="keyDown(2,$event)"
                        @mousedown="mouseDown(2)"
                        class="simple-range-slider-handle"/>
                <div
                        v-if="!popoverMerged"
                        :style="{left: isRtl?'0 !important':'',right: isRtl?'unset !important':''}"
                        class="simple-range-slider-popover">
                    <label>
                        <input
                                :style="{width: ((Math.log10(maxAnchorValue)+1) * 7)+'px'}"
                                v-model="anchor2Value"/>
                    </label>
                </div>

                <div class="simple-range-slider-popover-arrow"/>

            </div>


        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class VueSimpleRangeSlider extends Vue {
        @Prop() private msg!: string;
        @Prop({default: 0}) min!: number;
        @Prop({default: 100}) max!: number;
        @Prop({default: false, type: Boolean}) logarithmic!: boolean;
        @Prop({required: true}) value!: [number, number] | number;
        @Prop() activeBarColor?: string;
        @Prop() barColor?: string;

        isRtl = false;

        get popoverMerged() {
            return this.anchor2Position - this.anchor1Position < (((Math.log10(this.maxAnchorValue) + 1) * 7) * 2 + 4)
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
                - (Math.log10(this.maxAnchorValue) + 1) * 7;
            translateX = Math.max(translateX, -10);
            translateX = Math.min(translateX, this.width - ((Math.log10(this.maxAnchorValue) + 1) * 7) * 2 + 4);
            return {
                transform: 'translateX(' + translateX + 'px)',
                width: (this.anchor2Position - this.anchor1Position + 7.5) + 'px',
                direction: this.isRtl ? 'rtl' : 'ltr',
                minWidth: (((Math.log10(this.maxAnchorValue) + 1) * 7) * 2 + 4) + 'px'
            }
        }

        get anchor1Value(): number {
            if (Array.isArray(this.value))
                return this.value[0];
            return this.value;
        }

        set anchor1Value($value) {
            $value = Math.max(this.minAnchorValue, Math.min(this.maxAnchorValue, $value));
            if (this.isRange) {
                $value = Math.min(this.anchor2Value, $value);
            }
            if (this.isRange) {
                const value = [...this.value as [number, number]] as [number, number];
                value[0] = $value;
                this.setValue(value);
                if (this.logarithmic) {
                    this.anchor1PositionV = this.unLog($value);
                } else {
                    this.anchor1PositionV = Math.round($value * this.scale);
                }
            } else {
                this.setValue($value)
            }
        }

        get anchor2Value(): number {
            if (Array.isArray(this.value))
                return this.value[1];
            return this.value;
        }

        set anchor2Value($value) {
            $value = Math.max(this.minAnchorValue, Math.min(this.maxAnchorValue, $value));
            if (this.isRange) {
                $value = Math.max(this.anchor1Value, $value);
            }
            if (this.isRange) {
                const value = [...this.value as [number, number]] as [number, number];
                value[1] = $value;
                this.setValue(value);
                if (this.logarithmic) {
                    this.anchor2PositionV = this.unLog($value);
                } else {
                    this.anchor2PositionV = Math.round($value * this.scale);
                }

            } else {
                this.setValue($value)
            }
        }

        setValue($value: [number, number] | number) {
            this.$emit('input', $value)
        }

        anchor1PositionV = 0;

        get anchor1Position() {
            return this.anchor1PositionV;
        }

        set anchor1Position($position) {
            if (Array.isArray(this.value)) {
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
            return this.anchor2PositionV;//this.unLog(this.anchor2Value * this.scale);
        }

        set anchor2Position($position) {
            if (Array.isArray(this.value)) {
                $position = Math.max(this.anchor1Position, $position);
            }
            if (this.logarithmic) {
                this.anchor2Value = this.log($position);
            } else {
                this.anchor2Value = Math.round($position / this.scale);
            }
            this.anchor2PositionV = Math.max(0, Math.min(this.width, $position))
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

        mouseDown($anchor: number) {
            this.draggingAnchor = $anchor;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win: any = window;

            win.$SRSMouseMove = ($event: MouseEvent) => {
                if ($anchor == 1) {
                    if (this.isRtl) {
                        this.anchor1Position = this.width - $event.x + 17.5;
                    } else {
                        this.anchor1Position = $event.x - 15;
                    }
                } else {
                    if (this.isRtl) {
                        this.anchor2Position = this.width - $event.x + 17.5;
                    } else {
                        this.anchor2Position = $event.x - 15;
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
                if ($event.code === "ArrowDown" || $event.code === "ArrowLeft") {
                    if ($anchor == 1) {
                        this.anchor1Position--;
                    }
                    if ($anchor == 2) {
                        this.anchor2Position--;
                    }
                } else if ($event.code === "ArrowUp" || $event.code === "ArrowRight") {
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
            setTimeout(() => {
                this.width = this.$el.getBoundingClientRect().width - 20;
            });
            if (Array.isArray(this.value)) {
                this.anchor1Value = this.value[0];
                this.anchor2Value = this.value[1];
                //this.anchor1PositionV = this.unLog(this.value[0]);
                //this.anchor2PositionV = this.unLog(this.value[1]);
            } else {
                //this.anchor1PositionV = this.unLog(this.value);
                this.anchor1Value = this.value
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
            let num = Math.ceil(Math.exp(scale * pos));// Math.ceil((Math.pow(pos / this.width, base) + 1 ) * valueRange);
            const r10 = Math.pow(10, Math.floor(Math.log10(num)));
            num = Math.ceil(num / r10) * r10;
            return num + this.minAnchorValue;
        }

        unLog(num: number) {
            const valueRange = Math.log(this.maxAnchorValue - this.minAnchorValue);
            const scale = valueRange / this.width;
            return Math.round((Math.log(num + 1) / Math.log(Math.E)) / scale);
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
                    left: 0
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
            top: -27px
            background: white
            padding: 3px
            border-radius: 5px
            box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, .2)

            input
                border: none
                outline: none
                vertical-align: top
                direction: ltr

        .simple-range-slider-merged-popover
            top: -33px
</style>
