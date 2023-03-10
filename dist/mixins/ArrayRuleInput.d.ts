import { PropType } from 'vue';
import { EngineRuleData, EngineSubOperators, RegistrationLanguage, SimpleRuleType } from '@/index';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<string[], SimpleRuleType.Array>>;
        default: () => EngineRuleData<string[], SimpleRuleType.Array>;
    };
}, {}, {
    content: string[];
    lang: RegistrationLanguage;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
    options: never[];
}, {}, {
    update(): void;
    updateOutput(): void;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineRuleData<string[], SimpleRuleType.Array>>;
        default: () => EngineRuleData<string[], SimpleRuleType.Array>;
    };
}>>, {
    value: EngineRuleData<string[], SimpleRuleType.Array>;
}>;
export default _default;
