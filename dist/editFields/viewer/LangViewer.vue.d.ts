import Vue from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { LocaleInterface } from '@/fieldsData';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    visibleData: string;
    locales: LocaleInterface[];
    lang: LocaleInterface;
    error: boolean;
    isNull: boolean;
}, {
    setLang(): void;
}, unknown, {
    item: GridEntityItem;
    rawValue: unknown;
    field: FieldDefinition;
    writable: boolean;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
