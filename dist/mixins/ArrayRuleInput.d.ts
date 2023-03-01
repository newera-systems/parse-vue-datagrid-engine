import { PropType } from "vue";
import { EngineRuleData, EngineSubOperators, RegistrationLanguage, SimpleRuleType } from "@/index";
declare const _default: {
    components: {
        OperatorDropdown: import("vue").DefineComponent<{
            value: {
                type: PropType<EngineSubOperators>;
                default: null;
            };
            options: {
                type: PropType<EngineSubOperators[]>;
                default: never[];
            };
        }, {}, {
            operator: EngineSubOperators;
        }, {}, {
            update(): void;
            setOperation(index: number): void;
            getTranslation(key: string, force?: boolean): string;
            getOperatorTranslation(key: EngineSubOperators): string;
        }, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
            value: {
                type: PropType<EngineSubOperators>;
                default: null;
            };
            options: {
                type: PropType<EngineSubOperators[]>;
                default: never[];
            };
        }>>, {
            value: EngineSubOperators;
            options: EngineSubOperators[];
        }>;
    };
    props: {
        value: {
            type: PropType<EngineRuleData<string[], SimpleRuleType.Array>>;
            default(): {
                type: SimpleRuleType;
                value: [];
                operator: EngineSubOperators;
            };
        };
    };
    data(): {
        content: string[];
        lang: RegistrationLanguage;
        operator: EngineSubOperators;
        operatorList: EngineSubOperators[];
        options: [];
    };
    created(): void;
    beforeMount(): void;
    methods: {
        update(): void;
        updateOutput(): void;
    };
    watch: {
        value: {
            deep: boolean;
            handler: string;
        };
        operator: {
            deep: boolean;
            handler: string;
        };
        content: {
            deep: boolean;
            handler: string;
        };
    };
};
export default _default;
