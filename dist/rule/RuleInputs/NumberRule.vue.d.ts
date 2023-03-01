import { PropType } from "vue";
import { EngineRuleData, EngineSubOperators, SimpleRuleType } from "@/index";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<number, SimpleRuleType.Number>>;
        default: () => EngineRuleData<number, SimpleRuleType.Number>;
    };
}, {}, {
    content: number;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {}, {
    update(): void;
    updateOutput(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineRuleData<number, SimpleRuleType.Number>>;
        default: () => EngineRuleData<number, SimpleRuleType.Number>;
    };
}>>, {
    value: EngineRuleData<number, SimpleRuleType.Number>;
}>;
export default _default;
