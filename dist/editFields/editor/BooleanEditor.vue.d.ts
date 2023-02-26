import Vue from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    isModified: boolean;
    valid: boolean;
    editValue: boolean;
}, {
    saveModification(): void;
    discardChanges(): void;
}, unknown, {
    item: GridEntityItem;
    rawValue: unknown;
    field: FieldDefinition;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
