import { PropType } from 'vue';
import { RuleDefinition } from 'query-builder-vue';
import { EngineRuleData, EngineSimpleRule, RegistrationGender, RegistrationLanguage, SimpleRuleType } from '@/index';
import { Money } from 'ts-money';
export type RuleDataObject = EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day> | EngineRuleData<string, SimpleRuleType.String> | EngineRuleData<number, SimpleRuleType.Number> | EngineRuleData<Array<string>, SimpleRuleType.Array> | EngineRuleData<Money, SimpleRuleType.Money> | EngineRuleData<RegistrationGender, SimpleRuleType.String> | EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
declare const _default: import("vue").DefineComponent<{
    definition: {
        type: PropType<RuleDefinition>;
        required: true;
    };
    value: {
        type: PropType<EngineSimpleRule | null>;
        required: true;
    };
}, {}, {
    editValue: RuleDataObject;
    id: string;
    showPopup: boolean;
}, {
    status(): string;
    isEmpty(): boolean;
}, {
    clearRule(): void;
    updateRule(): void;
    getTranslation(key: string, force?: boolean): string;
    getOperatorTranslation(key: string): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    definition: {
        type: PropType<RuleDefinition>;
        required: true;
    };
    value: {
        type: PropType<EngineSimpleRule | null>;
        required: true;
    };
}>>, {}>;
export default _default;
