import Vue from 'vue';
import { EngineSubOperators } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
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
export default _default;
