import Vue from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { Money } from 'ts-money';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    visibleData: Money;
    isNull: boolean;
    error: boolean;
    currency: string;
}, unknown, unknown, {
    item: GridEntityItem;
    rawValue: number | Money | null | undefined;
    field: FieldDefinition;
    writable: boolean;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
