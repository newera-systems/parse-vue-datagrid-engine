import { PropType } from "vue";
import { EngineRuleGroup, EngineSimpleRule, FilterRuleInterface, GroupOperator } from "@/index";
import { RuleDefinition } from "query-builder-vue";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<FilterRuleInterface | null>;
        default: null;
    };
    visibleName: {
        type: StringConstructor;
        default: string;
    };
    target: {
        type: StringConstructor;
        required: true;
    };
    operator: {
        type: PropType<GroupOperator>;
        default: () => GroupOperator.AND;
    };
    fieldList: {
        type: PropType<string[]>;
        default: () => never[];
    };
}, {}, {
    error: boolean;
    localValue: FilterRuleInterface;
}, {
    children(): Array<EngineSimpleRule>;
    allowedRules(): Array<RuleDefinition>;
    localConditions(): Array<EngineSimpleRule>;
}, {
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule>;
    checkIfValidRule(rule: EngineSimpleRule): boolean;
    _getLocalRule(identifier: string): EngineSimpleRule;
    _setRuleInFilter(group: EngineRuleGroup, ruleToInsert: EngineSimpleRule, valid?: boolean): boolean;
    updateLocalRule(rule: EngineSimpleRule): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<FilterRuleInterface | null>;
        default: null;
    };
    visibleName: {
        type: StringConstructor;
        default: string;
    };
    target: {
        type: StringConstructor;
        required: true;
    };
    operator: {
        type: PropType<GroupOperator>;
        default: () => GroupOperator.AND;
    };
    fieldList: {
        type: PropType<string[]>;
        default: () => never[];
    };
}>>, {
    value: FilterRuleInterface | null;
    operator: GroupOperator;
    visibleName: string;
    fieldList: string[];
}>;
export default _default;
