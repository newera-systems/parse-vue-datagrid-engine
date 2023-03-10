import { PropType } from 'vue';
import { GroupCtrlSlotProps } from 'query-builder-vue';
declare const _default: import("vue").DefineComponent<{
    groupCtrl: {
        type: PropType<GroupCtrlSlotProps>;
        required: true;
    };
}, {}, {
    selectedRule: string;
    expanded: boolean;
}, {
    ruleName(): string;
}, {
    setRule(rule: string): void;
    addRule(): void;
    getTranslation(key: string): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    groupCtrl: {
        type: PropType<GroupCtrlSlotProps>;
        required: true;
    };
}>>, {}>;
export default _default;
