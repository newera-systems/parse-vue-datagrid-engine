import { PropType } from 'vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { LocaleInterface } from '@/fieldsData';
declare const _default: import("vue").DefineComponent<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<unknown>;
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
    visibleData: string;
    locales: LocaleInterface[];
    lang: LocaleInterface;
    error: boolean;
    isNull: boolean;
}, {}, {
    setLang(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    item: {
        type: PropType<GridEntityItem>;
        required: true;
    };
    rawValue: {
        type: PropType<unknown>;
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
