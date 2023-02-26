import Vue from 'vue';
import { EngineRuleData, EngineSubOperators, RegistrationLanguage, SimpleRuleType } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
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
}, {
    update(): Promise<void>;
    setType(index: number): void;
    updateOutput(): void;
}, unknown, {
    value: EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day> | {
        type: SimpleRuleType;
        value: null;
        operator: EngineSubOperators;
    };
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
