import Vue from 'vue';
import { DataGridProviderFunction, DataGridProviderPromiseResult, GridEntityItem, ProviderContext } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    cellKeyRemount: number;
    context: ProviderContext;
}, {
    _providerSetLocal(items: Array<GridEntityItem> | any): void;
    _checkIfIdFieldPresent(list: Array<any>): boolean;
    _providerUpdate(): void;
}, {
    hasProviderFunction: boolean;
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
