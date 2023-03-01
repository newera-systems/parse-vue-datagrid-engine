import { Component, PropType } from "vue";
import { DataGridModifiedCell, FieldDefinitionWithExtra, FieldType, GridEntityItem } from "@/index";
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        required: true;
    };
    field: {
        type: PropType<FieldDefinitionWithExtra>;
        required: true;
    };
    viewerConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        required: true;
    };
    editorConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        required: true;
    };
}, {}, {
    modified: boolean;
    editMode: boolean;
    buttonId: string;
}, {
    writable(): boolean;
    viewerComponent(): Component | string;
    editorComponent(): Component | string;
}, {
    _startEdition(): void;
    _prepareCellModification(modification: DataGridModifiedCell): void;
    _onCloseEdition(): void;
    saveModification(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        required: true;
    };
    field: {
        type: PropType<FieldDefinitionWithExtra>;
        required: true;
    };
    viewerConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        required: true;
    };
    editorConfig: {
        type: PropType<Record<FieldType, Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>>>;
        required: true;
    };
}>>, {}>;
export default _default;
