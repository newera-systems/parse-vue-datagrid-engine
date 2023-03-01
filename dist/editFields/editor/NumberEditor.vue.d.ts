import { PropType } from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<unknown>;
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}, {}, {
    isModified: boolean;
    valid: boolean;
    editValue: number;
    editMode: boolean;
}, {}, {
    saveModification(): void;
    discardChanges(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<unknown>;
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}>>, {}>;
export default _default;
