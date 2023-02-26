import { PropType } from 'vue';
import { EngineRuleData, EngineSubOperators, SimpleRuleType } from '@/index';
declare const _default: {
    components: {
        OperatorDropdown: import("vue/types/vue").ExtendedVue<import("vue").default<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue").default<Record<string, any>, Record<string, any>, never, never, any>>, {
            operator: EngineSubOperators;
        }, {
            update(): void;
            setOperation(index: number): void;
            getTranslation(key: string, force?: boolean): string;
            getOperatorTranslation(key: EngineSubOperators): string;
        }, unknown, {
            value: EngineSubOperators;
            options: EngineSubOperators[];
        }, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
    };
    props: {
        value: {
            type: PropType<EngineRuleData<string, SimpleRuleType.String>>;
            default(): {
                type: SimpleRuleType;
                value: string;
                operator: EngineSubOperators;
            };
        };
    };
    data(): {
        content: string;
        operator: EngineSubOperators;
        operatorList: EngineSubOperators[];
    };
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
