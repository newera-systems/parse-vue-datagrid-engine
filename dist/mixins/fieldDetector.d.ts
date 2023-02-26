import Vue from 'vue';
import { DataGridProviderFunction, DataGridProviderPromiseResult, FieldDefinition, FieldDefinitionWithExtra, GridEntityItem } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localFieldsDef: FieldDefinition[];
    localItems: GridEntityItem[];
}, {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]): void;
    _transformToValidDefinition(fields: Array<any>): void;
    _constructAdaptedFields(): FieldDefinition[];
    _fieldsUpdate(): void;
}, {
    hasFieldsOption: boolean;
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
    fields: FieldDefinitionWithExtra[];
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
