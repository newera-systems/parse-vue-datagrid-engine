import { RuleDefinition, RuleSlotProps } from "query-builder-vue";
import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    ruleCtrl: {
        type: PropType<RuleSlotProps>;
        required: true;
    };
    rules: {
        type: PropType<RuleDefinition[]>;
        required: true;
    };
}, {}, {}, {
    ruleName(): string;
}, {
    getTranslation(key: string): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    ruleCtrl: {
        type: PropType<RuleSlotProps>;
        required: true;
    };
    rules: {
        type: PropType<RuleDefinition[]>;
        required: true;
    };
}>>, {}>;
export default _default;
