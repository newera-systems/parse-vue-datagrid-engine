import Vue, { Component } from 'vue';
import { BvTableFieldArray } from 'bootstrap-vue';
import { DataGridModifiedCell, DataGridProviderFunction, DataGridProviderPromiseResult, FieldDefinition, FieldDefinitionWithExtra, GridEntityItem, ModificationHandler, ProviderContext } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    localFieldsDef: FieldDefinition[];
    localModificationHandler: ModificationHandler;
    cellKeyRemount: number;
    context: ProviderContext;
    perPageOptions: number[];
    localEntries: number;
}, {
    goToItemEditor(item: GridEntityItem): void;
    getTranslation(key: string): string;
    _getFieldDefinition(fieldId: string): FieldDefinition;
    _defaultModificationHandler(data: DataGridModifiedCell): void;
    _modificationHandlerUpdate(): void;
    _updatedContext(): void;
    updateCell(modification: DataGridModifiedCell): void;
}, {
    columns: BvTableFieldArray;
    filterableFields: string[];
    hasARuleFilterSchema: boolean;
    hasARuleInFilter: boolean;
}, {
    name: string;
    target: string;
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
    paginationEntries: number;
    fields: FieldDefinitionWithExtra[];
    modificationHandler: ModificationHandler;
    viewerConfig: Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    editorConfig: Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
}, {}, import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    cellKeyRemount: number;
    context: ProviderContext;
}, {
    _providerSetLocal(items: any): void;
    _checkIfIdFieldPresent(list: any[]): boolean;
    _providerUpdate(): void;
}, {
    hasProviderFunction: boolean;
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin> | import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    context: ProviderContext;
    perPageOptions: number[];
    localItems: GridEntityItem[];
    localEntries: number;
}, {
    onFiltered(filteredItems: any[]): void;
}, {
    paginatedItems: GridEntityItem[];
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
    paginationEntries: number;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin> | import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localFieldsDef: FieldDefinition[];
    localItems: GridEntityItem[];
}, {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]): void;
    _transformToValidDefinition(fields: any[]): void;
    _constructAdaptedFields(): FieldDefinition[];
    _fieldsUpdate(): void;
}, {
    hasFieldsOption: boolean;
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
    fields: FieldDefinitionWithExtra[];
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin> | import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, unknown, {}, unknown, {
    striped: boolean;
    bordered: boolean;
    borderless: boolean;
    outlined: boolean;
    small: boolean;
    hover: boolean;
    dark: boolean;
    fixed: boolean;
    footClone: boolean;
    headVariant: "dark" | "light" | null;
    noCollapse: boolean;
    responsive: boolean;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
