import { PropType } from 'vue';
import { EngineSubOperators } from '@/index';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineSubOperators>;
        default: null;
    };
    options: {
        type: PropType<EngineSubOperators[]>;
        default: never[];
    };
}, {}, {
    operator: EngineSubOperators;
}, {}, {
    update(): void;
    setOperation(index: number): void;
    getTranslation(key: string, force?: boolean): string;
    getOperatorTranslation(key: EngineSubOperators): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineSubOperators>;
        default: null;
    };
    options: {
        type: PropType<EngineSubOperators[]>;
        default: never[];
    };
}>>, {
    value: EngineSubOperators;
    options: EngineSubOperators[];
}>;
export default _default;
