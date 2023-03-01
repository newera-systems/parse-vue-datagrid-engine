import { PropType } from "vue";
import { EngineRuleData, EngineSubOperators, SimpleRuleType } from "@/index";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<string, SimpleRuleType.String>>;
        default: () => EngineRuleData<string, SimpleRuleType.String>;
    };
}, {}, {
    content: string;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {}, {}, import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<any, SimpleRuleType>>;
        default: () => EngineRuleData<string, SimpleRuleType.String>;
    };
}, {}, {
    content: string;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {}, {
    update(): void;
    updateOutput(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineRuleData<any, SimpleRuleType>>;
        default: () => EngineRuleData<string, SimpleRuleType.String>;
    };
}>>, {
    value: EngineRuleData<any, SimpleRuleType>;
}>, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineRuleData<string, SimpleRuleType.String>>;
        default: () => EngineRuleData<string, SimpleRuleType.String>;
    };
}>>, {
    value: EngineRuleData<string, SimpleRuleType.String>;
}>;
export default _default;
