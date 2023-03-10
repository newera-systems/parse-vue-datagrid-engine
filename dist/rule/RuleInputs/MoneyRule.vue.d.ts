import { PropType } from 'vue';
import { Money } from 'ts-money';
import { EngineRuleData, EngineSubOperators, SimpleRuleType } from '@/index';
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<EngineRuleData<Money, SimpleRuleType.Money>>;
        default: null;
    };
}, {}, {
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
    moneyAmount: string;
    currency: string;
    currencyList: string[];
}, {
    state(): boolean | null;
}, {
    setCurrency(index: number): void;
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
        type: PropType<EngineRuleData<Money, SimpleRuleType.Money>>;
        default: null;
    };
}>>, {
    value: EngineRuleData<Money, SimpleRuleType.Money>;
}>;
export default _default;
