import Vue from 'vue';
import { BModal, BvModalEvent } from 'bootstrap-vue';
import { EngineRuleGroup, EngineSimpleRule, FilterRuleInterface, RuleActions } from '@/index';
import QueryBuilder from 'query-builder-vue';
declare const _default: import("vue/types/vue").ExtendedVue<Vue<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => Vue<Record<string, any>, Record<string, any>, never, never, any>>, {
    localValue: FilterRuleInterface;
    actionOptions: RuleActions[];
    builderConfig: QueryBuilder.QueryBuilderConfig;
    groups: null;
    loading: boolean;
    targetError: boolean;
    id: string;
    testQuil: string;
}, {
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule>;
    onOk(bvModalEvt: BvModalEvent): void;
    onCancel(): void;
    onHidden(): void;
    onShown(): void;
    toggleModal(): void;
    onEditorInput(value: string): void;
}, {
    modal: BModal;
    nameOptions: string[];
    validName: boolean;
    targetRules: QueryBuilder.RuleDefinition[];
    allowedIdentifier: string[];
    presentIdentifier: string[];
    invalidIdentifier: string[];
    valid: boolean;
}, {
    rule: FilterRuleInterface | null;
    target: string;
    modalTitle: string;
    modalSize: string;
    okText: string;
    cancelText: string;
    value: boolean;
    useEditor: boolean;
}, {}, import("vue/types/v3-component-options.js").ComponentOptionsMixin, import("vue/types/v3-component-options.js").ComponentOptionsMixin>;
export default _default;
