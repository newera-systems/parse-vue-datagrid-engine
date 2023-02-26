import Vue from 'vue';
import { EngineSubOperators } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    content: string;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
}, {}, unknown, Record<never, any>, {}, {
    components: {
        OperatorDropdown: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
            operator: EngineSubOperators;
        }, {
            update(): void;
            setOperation(index: number): void;
            getTranslation(key: string, force?: boolean): string;
            getOperatorTranslation(key: EngineSubOperators): string;
        }, unknown, {
            value: EngineSubOperators;
            options: EngineSubOperators[];
        }, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
    };
    props: {
        value: {
            type: import("vue").PropType<import("@/index").EngineRuleData<string, import("@/index").SimpleRuleType.String>>;
            default(): {
                type: import("@/index").SimpleRuleType;
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
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
