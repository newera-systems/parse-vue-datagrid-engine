import Vue from 'vue';
import { DataGridProviderFunction, DataGridProviderPromiseResult, GridEntityItem, ProviderContext } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    context: ProviderContext;
    perPageOptions: number[];
    localItems: GridEntityItem[];
    localEntries: number;
}, {
    onFiltered(filteredItems: Array<any>): void;
}, {
    paginatedItems: GridEntityItem[];
}, {
    items: GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult;
    paginationEntries: number;
}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin>;
export default _default;
