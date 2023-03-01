import { PropType } from "vue";
import { DataGridProviderFunction, DataGridProviderPromiseResult, GridEntityItem, ProviderContext } from "@/index";
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
}, {}, {
    context: ProviderContext;
    perPageOptions: number[];
    localItems: GridEntityItem[];
    localEntries: number;
}, {
    paginatedItems(): Array<GridEntityItem>;
}, {
    onFiltered(filteredItems: Array<any>): void;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    paginationEntries: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    paginationEntries: number;
}>;
export default _default;
