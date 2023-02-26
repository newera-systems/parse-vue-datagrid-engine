import Vue from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { Money } from 'ts-money';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    price: string | null;
    editValue: number | null;
    amount: number | null;
    isModified: boolean;
    currency: string;
}, {
    saveModification(): void;
    discardChanges(): void;
}, {
    state: boolean | null;
}, {
    item: GridEntityItem;
    rawValue: number | Money | null | undefined;
    field: FieldDefinition;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
