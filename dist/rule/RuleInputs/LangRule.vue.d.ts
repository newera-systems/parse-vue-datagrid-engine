import { PropType } from "vue";
import { EngineRuleData, EngineSubOperators, RegistrationLanguage, SimpleRuleType } from "@/index";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<RegistrationLanguage, SimpleRuleType.String>>;
        default: () => EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
    };
}, {}, {
    lang: RegistrationLanguage;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {
    langOptions(): Array<{
        value: string;
        text: string;
    }>;
}, {
    update(): void;
    updateOutput(): void;
}, import("vue").DefineComponent<{
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
        type: PropType<EngineRuleData<RegistrationLanguage, SimpleRuleType.String>>;
        default: () => EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
    };
}>>, {
    value: EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
}>;
export default _default;
