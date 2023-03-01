import { PropType } from "vue";
import { FieldDefinition, GridEntityItem } from "@/index";
import { Money } from "ts-money";
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<number | Money | null | undefined>;
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
    visibleData: Money;
    isNull: boolean;
    error: boolean;
    currency: string;
}, {}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<number | Money | null | undefined>;
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
