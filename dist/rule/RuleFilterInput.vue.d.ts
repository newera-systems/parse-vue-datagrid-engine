import Vue from 'vue';
import { RuleDefinition } from 'query-builder-vue';
import { EngineRuleData, EngineSimpleRule, RegistrationGender, RegistrationLanguage, SimpleRuleType } from '@/index';
import { Money } from 'ts-money';
export type RuleDataObject = EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day> | EngineRuleData<string, SimpleRuleType.String> | EngineRuleData<number, SimpleRuleType.Number> | EngineRuleData<Array<string>, SimpleRuleType.Array> | EngineRuleData<Money, SimpleRuleType.Money> | EngineRuleData<RegistrationGender, SimpleRuleType.String> | EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    editValue: RuleDataObject;
    id: string;
    showPopup: boolean;
}, {
    clearRule(): void;
    updateRule(): void;
    getTranslation(key: string, force?: boolean): string;
    getOperatorTranslation(key: string): string;
}, {
    status: string;
    isEmpty: boolean;
}, {
    definition: RuleDefinition;
    value: EngineSimpleRule | null;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
