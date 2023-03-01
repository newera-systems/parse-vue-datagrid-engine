import { PropType } from "vue";
import { FieldDefinition, GridEntityItem } from "@/index";
import dayjs from "dayjs";
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<string | number | Date | dayjs.Dayjs | null | undefined>;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
    writable: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}, {}, {
    visibleData: dayjs.Dayjs;
    isNull: boolean;
    error: boolean;
}, {}, {
    displayDate(): string;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<string | number | Date | dayjs.Dayjs | null | undefined>;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
    writable: {
        type: BooleanConstructor;
        required: true;
        default: boolean;
    };
}>>, {}>;
export default _default;
