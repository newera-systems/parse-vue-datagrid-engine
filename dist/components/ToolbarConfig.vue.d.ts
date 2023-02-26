import Vue from 'vue';
import { FieldDefinition } from '@/index';
import VueI18n from 'vue-i18n';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    fieldsUpdated: FieldDefinition[];
}, {
    update(): void;
    getTranslation(key: string): VueI18n.TranslateResult;
}, unknown, {
    value: FieldDefinition[];
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
