import { PropType } from 'vue';
import { GroupOperatorSlotProps } from 'query-builder-vue';
declare const _default: import("vue").DefineComponent<{
    groupOperator: {
        type: PropType<GroupOperatorSlotProps>;
        required: true;
    };
}, {}, {
    expanded: boolean;
}, {}, {
    selectOperator(operator: string): void;
    getTranslation(key: string): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    groupOperator: {
        type: PropType<GroupOperatorSlotProps>;
        required: true;
    };
}>>, {}>;
export default _default;
