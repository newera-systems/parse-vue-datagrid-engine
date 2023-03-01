import { PropType } from "vue";
import { FieldDefinition } from "@/index";
import VueI18n from "vue-i18n";
declare const _default: import("vue").DefineComponent<{
    value: {
        type: PropType<FieldDefinition[]>;
        required: true;
        default: () => never[];
    };
}, {}, {
    fieldsUpdated: FieldDefinition[];
}, {}, {
    update(): void;
    getTranslation(key: string): VueI18n.TranslateResult;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: PropType<FieldDefinition[]>;
        required: true;
        default: () => never[];
    };
}>>, {
    value: FieldDefinition[];
}>;
export default _default;
