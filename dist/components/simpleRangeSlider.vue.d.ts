declare const _default: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            max: number;
            exponential: boolean;
            min: number;
            activeBarColor: string;
            barColor: string;
            keepJustSignificantFigures: boolean;
            significantFigures: number;
        }> & Omit<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
            modelValue?: [number, number] | number | undefined;
            value?: [number, number] | number | undefined;
            exponential?: boolean;
            barColor?: string;
            activeBarColor?: string;
            max?: number;
            min?: number;
            keepJustSignificantFigures?: boolean;
            significantFigures?: number;
        }>, {
            min: number;
            max: number;
            exponential: boolean;
            activeBarColor: string;
            barColor: string;
            keepJustSignificantFigures: boolean;
            significantFigures: number;
        }>>> & {
            onInput?: (value: number | [number, number]) => any;
            "onUpdate:model-value"?: (value: number | [number, number]) => any;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, "max" | "exponential" | "min" | "activeBarColor" | "barColor" | "keepJustSignificantFigures" | "significantFigures">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>;
        $emit: ((event: "input", value: number | [number, number]) => void) & ((event: "update:model-value", value: number | [number, number]) => void);
        $el: any;
        $options: import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
            modelValue?: [number, number] | number | undefined;
            value?: [number, number] | number | undefined;
            exponential?: boolean;
            barColor?: string;
            activeBarColor?: string;
            max?: number;
            min?: number;
            keepJustSignificantFigures?: boolean;
            significantFigures?: number;
        }>, {
            min: number;
            max: number;
            exponential: boolean;
            activeBarColor: string;
            barColor: string;
            keepJustSignificantFigures: boolean;
            significantFigures: number;
        }>>> & {
            onInput?: (value: number | [number, number]) => any;
            "onUpdate:model-value"?: (value: number | [number, number]) => any;
        }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
            input: (value: number | [number, number]) => void;
        } & {
            "update:model-value": (value: number | [number, number]) => void;
        }, string, {
            max: number;
            exponential: boolean;
            min: number;
            activeBarColor: string;
            barColor: string;
            keepJustSignificantFigures: boolean;
            significantFigures: number;
        }> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            renderTriggered?: ((e: import("vue").DebuggerEvent) => void) | ((e: import("vue").DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void) | ((err: unknown, instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>>, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import("vue").nextTick;
        $watch(source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean>): import("vue").WatchStopHandle;
    } & Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
        modelValue?: [number, number] | number | undefined;
        value?: [number, number] | number | undefined;
        exponential?: boolean;
        barColor?: string;
        activeBarColor?: string;
        max?: number;
        min?: number;
        keepJustSignificantFigures?: boolean;
        significantFigures?: number;
    }>, {
        min: number;
        max: number;
        exponential: boolean;
        activeBarColor: string;
        barColor: string;
        keepJustSignificantFigures: boolean;
        significantFigures: number;
    }>>> & {
        onInput?: (value: number | [number, number]) => any;
        "onUpdate:model-value"?: (value: number | [number, number]) => any;
    } & import("vue").ShallowUnwrapRef<{}> & {} & import("vue").ComponentCustomProperties;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<{
    modelValue?: [number, number] | number | undefined;
    value?: [number, number] | number | undefined;
    exponential?: boolean;
    barColor?: string;
    activeBarColor?: string;
    max?: number;
    min?: number;
    keepJustSignificantFigures?: boolean;
    significantFigures?: number;
}>, {
    min: number;
    max: number;
    exponential: boolean;
    activeBarColor: string;
    barColor: string;
    keepJustSignificantFigures: boolean;
    significantFigures: number;
}>>> & {
    onInput?: (value: number | [number, number]) => any;
    "onUpdate:model-value"?: (value: number | [number, number]) => any;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    input: (value: number | [number, number]) => void;
} & {
    "update:model-value": (value: number | [number, number]) => void;
}, string, {
    max: number;
    exponential: boolean;
    min: number;
    activeBarColor: string;
    barColor: string;
    keepJustSignificantFigures: boolean;
    significantFigures: number;
}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: any;
});
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? P[K] & {
        default: D[K];
    } : P[K];
};
