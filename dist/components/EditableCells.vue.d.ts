import Vue, { Component } from 'vue';
import { DataGridModifiedCell, FieldDefinitionWithExtra, FieldType, GridEntityItem } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    modified: boolean;
    editMode: boolean;
    buttonId: string;
}, {
    _startEdition(): void;
    _prepareCellModification(modification: DataGridModifiedCell): void;
    _onCloseEdition(): void;
    saveModification(): void;
}, {
    writable: boolean;
    viewerComponent: string | Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>;
    editorComponent: string | Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>;
}, {
    item: GridEntityItem;
    rawValue: unknown;
    field: FieldDefinitionWithExtra;
    viewerConfig: Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
    editorConfig: Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
