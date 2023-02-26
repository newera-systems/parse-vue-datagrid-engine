import Vue from 'vue';
import { EngineRuleGroup, EngineSimpleRule, FilterRuleInterface } from '@/index';
import { RuleDefinition } from 'query-builder-vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    error: boolean;
    localValue: FilterRuleInterface;
}, {
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule>;
    checkIfValidRule(rule: EngineSimpleRule): boolean;
    _getLocalRule(identifier: string): EngineSimpleRule;
    _setRuleInFilter(group: EngineRuleGroup, ruleToInsert: EngineSimpleRule, valid?: boolean): boolean;
    updateLocalRule(rule: EngineSimpleRule): void;
}, {
    children: EngineSimpleRule[];
    allowedRules: RuleDefinition[];
    localConditions: EngineSimpleRule[];
}, {
    value: FilterRuleInterface | null;
    visibleName: string;
    target: string;
    operator: string;
    fieldList: string[];
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
