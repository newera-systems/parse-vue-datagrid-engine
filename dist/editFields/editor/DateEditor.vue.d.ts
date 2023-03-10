import { PropType } from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import dayjs from 'dayjs';
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<string | number | Date | dayjs.Dayjs | null | undefined>;
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}, {}, {
    isModified: boolean;
    valid: boolean;
    editValue: Date;
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
        type: PropType<string | number | Date | dayjs.Dayjs | null | undefined>;
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}>>, {}>;
export default _default;
