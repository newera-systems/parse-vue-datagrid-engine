import { PropType } from "vue";
import { EngineRuleData, EngineSubOperators, RegistrationLanguage, SimpleRuleType } from "@/index";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day>>;
        default: () => EngineRuleData<string, SimpleRuleType.Date>;
    };
}, {}, {
    dateContent: string;
    lang: RegistrationLanguage;
    DateType: SimpleRuleType;
    typeList: SimpleRuleType[];
    config: {
        enableTime: boolean;
        dateFormat: string;
    };
    weekdays: {
        value: number;
        en: string;
        fr: string;
    }[];
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {}, {
    update(): Promise<void>;
    setType(index: number): void;
    updateOutput(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day>>;
        default: () => EngineRuleData<string, SimpleRuleType.Date>;
    };
}>>, {
    value: EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day>;
}>;
export default _default;
