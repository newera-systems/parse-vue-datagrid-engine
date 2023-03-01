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
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}, {}, {
    price: string | null;
    editValue: number | null;
    amount: number | null;
    isModified: boolean;
    currency: string;
}, {
    state(): boolean | null;
}, {
    saveModification(): void;
    discardChanges(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<number | Money | null | undefined>;
        required: true;
    };
    field: {
        type: PropType<FieldDefinition>;
        required: true;
    };
}>>, {}>;
export default _default;
