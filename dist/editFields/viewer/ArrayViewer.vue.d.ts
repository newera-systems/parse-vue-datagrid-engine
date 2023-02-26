import Vue, { Component } from 'vue';
import { FieldDefinitionWithExtra, GridEntityItem } from '@/index';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    visibleData: string;
    icon: Component<import("vue/types/options").DefaultData<never>, import("vue/types/options").DefaultMethods<never>, import("vue/types/options").DefaultComputed, import("vue/types/options").DefaultProps, {}>;
    error: boolean;
    isNull: boolean;
}, {
    _handleClick(): void;
}, unknown, {
    item: GridEntityItem;
    rawValue: any[] | null | undefined;
    field: FieldDefinitionWithExtra;
    writable: boolean;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
