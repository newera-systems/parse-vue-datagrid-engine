import { Component, PropType } from "vue";
import { BvTableFieldArray } from "bootstrap-vue";
import { DataGridModifiedCell, DataGridProviderFunction, DataGridProviderPromiseResult, FieldDefinition, FieldDefinitionWithExtra, FieldType, GridEntityItem, GroupOperator, ModificationHandler, ProviderContext } from "@/index";
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
        default: () => "Entity name";
    };
    target: {
        type: StringConstructor;
        default: () => "";
    };
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
    modificationHandler: {
        type: PropType<ModificationHandler>;
    };
    viewerConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default: () => Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    };
    editorConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default: () => Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    };
}, {}, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    localFieldsDef: FieldDefinition[];
    localModificationHandler: ModificationHandler;
    cellKeyRemount: number;
    context: ProviderContext;
    perPageOptions: number[];
    localEntries: number;
}, {
    GroupOperator(): typeof GroupOperator;
    columns(): BvTableFieldArray;
    filterableFields(): string[];
    hasARuleFilterSchema(): boolean;
    hasARuleInFilter(): boolean;
}, {
    goToItemEditor(item: GridEntityItem): void;
    getTranslation(key: string): string;
    _getFieldDefinition(fieldId: string): FieldDefinition;
    _defaultModificationHandler(data: DataGridModifiedCell): void;
    _modificationHandlerUpdate(): void;
    _updatedContext(): void;
    updateCell(modification: DataGridModifiedCell): void;
}, import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
}, {}, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    cellKeyRemount: number;
    context: ProviderContext;
}, {
    hasProviderFunction(): boolean;
}, {
    _providerSetLocal(items: any): void;
    _checkIfIdFieldPresent(list: any[]): boolean;
    _providerUpdate(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
}>>, {}> | import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
}, {}, {
    context: ProviderContext;
    perPageOptions: number[];
    localItems: GridEntityItem[];
    localEntries: number;
}, {
    paginatedItems(): GridEntityItem[];
}, {
    onFiltered(filteredItems: any[]): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    paginationEntries: number;
}> | import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    fields: {
        type: PropType<FieldDefinitionWithExtra[]>;
        default: () => never[];
    };
}, {}, {
    localFieldsDef: FieldDefinition[];
    localItems: GridEntityItem[];
}, {
    hasFieldsOption(): boolean;
}, {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]): void;
    _transformToValidDefinition(fields: any[]): void;
    _constructAdaptedFields(): FieldDefinition[];
    _fieldsUpdate(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    fields: {
        type: PropType<FieldDefinitionWithExtra[]>;
        default: () => never[];
    };
}>>, {
    fields: FieldDefinitionWithExtra[];
}> | import("vue").DefineComponent<{
    striped: {
        type: BooleanConstructor;
        default: boolean;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderless: {
        type: BooleanConstructor;
        default: boolean;
    };
    outlined: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    hover: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    footClone: {
        type: BooleanConstructor;
        default: boolean;
    };
    headVariant: {
        type: PropType<"light" | "dark" | null>;
        default: null;
    };
    noCollapse: {
        type: BooleanConstructor;
        default: boolean;
    };
    responsive: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, {}, {}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    striped: {
        type: BooleanConstructor;
        default: boolean;
    };
    bordered: {
        type: BooleanConstructor;
        default: boolean;
    };
    borderless: {
        type: BooleanConstructor;
        default: boolean;
    };
    outlined: {
        type: BooleanConstructor;
        default: boolean;
    };
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
    hover: {
        type: BooleanConstructor;
        default: boolean;
    };
    dark: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    footClone: {
        type: BooleanConstructor;
        default: boolean;
    };
    headVariant: {
        type: PropType<"light" | "dark" | null>;
        default: null;
    };
    noCollapse: {
        type: BooleanConstructor;
        default: boolean;
    };
    responsive: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    fixed: boolean;
    small: boolean;
    dark: boolean;
    striped: boolean;
    bordered: boolean;
    borderless: boolean;
    outlined: boolean;
    hover: boolean;
    footClone: boolean;
    headVariant: "light" | "dark" | null;
    noCollapse: boolean;
    responsive: boolean;
}>, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
        default: () => "Entity name";
    };
    target: {
        type: StringConstructor;
        default: () => "";
    };
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
    modificationHandler: {
        type: PropType<ModificationHandler>;
    };
    viewerConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default: () => Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    };
    editorConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        default: () => Record<string, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    };
}>>, {
    name: string;
    target: string;
    paginationEntries: number;
    viewerConfig: Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    editorConfig: Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
}>;
export default _default;
