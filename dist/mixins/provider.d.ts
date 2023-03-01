import { PropType } from "vue";
import { DataGridProviderFunction, DataGridProviderPromiseResult, GridEntityItem, ProviderContext } from "@/index";
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
}, {}, {
    localBusy: boolean;
    localItems: GridEntityItem[];
    cellKeyRemount: number;
    context: ProviderContext;
}, {
    hasProviderFunction(): boolean;
}, {
    _providerSetLocal(items: Array<GridEntityItem> | any): void;
    _checkIfIdFieldPresent(list: Array<any>): boolean;
    _providerUpdate(): void;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
}>>, {}>;
export default _default;
