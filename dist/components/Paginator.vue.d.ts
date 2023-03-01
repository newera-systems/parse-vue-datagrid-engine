declare const _default: import("vue").DefineComponent<{
    currentPage: {
        type: NumberConstructor;
        default: number;
        required: true;
    };
    perPage: {
        type: NumberConstructor;
        default: number;
    };
    entries: {
        type: NumberConstructor;
        default: number;
    };
}, {}, {
    currentPageNumber: number;
    entriesNumber: number;
    perPageNumber: number;
}, {
    startingIndex(): number;
    endingIndex(): number;
}, {
    update(): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    currentPage: {
        type: NumberConstructor;
        default: number;
        required: true;
    };
    perPage: {
        type: NumberConstructor;
        default: number;
    };
    entries: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    currentPage: number;
    entries: number;
    perPage: number;
}>;
export default _default;
