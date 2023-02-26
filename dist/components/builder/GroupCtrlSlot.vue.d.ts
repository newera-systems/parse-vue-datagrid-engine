import Vue from 'vue';
import { GroupCtrlSlotProps } from 'query-builder-vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    selectedRule: string;
    expanded: boolean;
}, {
    setRule(rule: string): void;
    addRule(): void;
    getTranslation(key: string): string;
}, {
    ruleName: string;
}, {
    groupCtrl: GroupCtrlSlotProps;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
