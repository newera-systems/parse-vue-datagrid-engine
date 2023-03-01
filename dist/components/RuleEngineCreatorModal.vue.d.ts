import { PropType } from "vue";
import { BModal, BvModalEvent } from "bootstrap-vue";
import { EngineRuleGroup, EngineSimpleRule, FilterRuleInterface, RuleActions } from "@/index";
import QueryBuilder, { RuleDefinition } from "query-builder-vue";
declare const _default: import("vue").DefineComponent<{
    rule: {
        type: PropType<FilterRuleInterface | null>;
        default: null;
    };
    target: {
        type: StringConstructor;
        required: true;
    };
    modalTitle: {
        type: StringConstructor;
        default: string;
    };
    modalSize: {
        type: StringConstructor;
        default: string;
    };
    okText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: BooleanConstructor;
        default: boolean;
    };
    useEditor: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {}, {
    localValue: FilterRuleInterface;
    actionOptions: RuleActions[];
    builderConfig: QueryBuilder.QueryBuilderConfig;
    groups: null;
    loading: boolean;
    targetError: boolean;
    id: string;
    testQuil: string;
}, {
    modal(): BModal;
    nameOptions(): string[];
    validName(): boolean;
    targetRules(): RuleDefinition[];
    allowedIdentifier(): string[];
    presentIdentifier(): string[];
    invalidIdentifier(): string[];
    valid(): boolean;
}, {
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule>;
    onOk(bvModalEvt: BvModalEvent): void;
    onCancel(): void;
    onHidden(): void;
    onShown(): void;
    toggleModal(): void;
    onEditorInput(value: string): void;
}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    rule: {
        type: PropType<FilterRuleInterface | null>;
        default: null;
    };
    target: {
        type: StringConstructor;
        required: true;
    };
    modalTitle: {
        type: StringConstructor;
        default: string;
    };
    modalSize: {
        type: StringConstructor;
        default: string;
    };
    okText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: BooleanConstructor;
        default: boolean;
    };
    useEditor: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    value: boolean;
    rule: FilterRuleInterface | null;
    modalTitle: string;
    modalSize: string;
    okText: string;
    cancelText: string;
    useEditor: boolean;
}>;
export default _default;
