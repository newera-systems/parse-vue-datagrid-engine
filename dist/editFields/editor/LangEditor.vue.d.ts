import Vue from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { LocaleInterface } from '@/fieldsData';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    isModified: boolean;
    valid: boolean;
    editValue: string;
    locales: LocaleInterface[];
}, {
    saveModification(): void;
    discardChanges(): void;
}, {
    selectedLang: LocaleInterface;
}, {
    item: GridEntityItem;
    rawValue: unknown;
    field: FieldDefinition;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
