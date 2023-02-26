import { Component } from 'vue';
import { PluginObject } from 'vue/types/plugin';
import DataGridTable from './components/Table.vue';
import { editorComponentsList, viewerComponentsList } from '@/editFields/config';
import { RuleEngineConfig, SchemaList } from '@/rule/RuleElementCreator';
import StringViewer from '@/editFields/viewer/StringViewer.vue';
import StringEditor from '@/editFields/editor/StringEditor.vue';
import NumberEditor from '@/editFields/editor/NumberEditor.vue';
import NumberViewer from '@/editFields/viewer/NumberViewer.vue';
import BooleanViewer from '@/editFields/viewer/BooleanViewer.vue';
import BooleanEditor from '@/editFields/editor/BooleanEditor.vue';
import BooleanRule from '@/rule/RuleInputs/BooleanRule.vue';
import NumberRule from '@/rule/RuleInputs/NumberRule.vue';
import StringRule from '@/rule/RuleInputs/StringRule.vue';
import ArrayInputMixin from '@/mixins/ArrayRuleInput';
import FieldInputMixin from '@/mixins/RuleFieldInput';
import { Money } from 'ts-money';
export interface GridFieldOptions {
    canView: boolean;
    canEdit: boolean;
    canFilter: boolean;
    canRead: boolean;
    canSort: boolean;
}
export declare enum FieldType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Money = "Money",
    Percent = "Percent",
    Lang = "Lang",
    Date = "Date",
    OtherEntity = "Pointer",
    Array = "Array"
}
export declare enum RuleCompTypes {
    Boolean = "Boolean",
    String = "String",
    Number = "Number",
    Money = "Money",
    Lang = "Lang",
    Date = "Date"
}
export interface FieldDefinition {
    identifier: string;
    name: string;
    config: GridFieldOptions;
    type: FieldType;
    targetClass?: string;
}
export interface FieldDefinitionWithExtra extends FieldDefinition {
    specialIcon?: Component;
    onClickExternalRoutine?: (data: any) => Promise<void>;
    pointerName?: string;
    lang?: 'fr' | 'en';
}
export interface ProviderContext {
    currentPage: number;
    perPage: number;
    withFilter: boolean;
    sortBy: string;
    sortDesc: boolean;
    FilterRule?: FilterRuleInterface;
}
type indexObject = {
    [selector: string | number]: any;
};
export interface GridEntityItem extends indexObject {
    id: string;
}
export type DataGridProviderPromiseResult = Promise<Array<GridEntityItem> | null>;
type ProviderCallBack = (items: Array<GridEntityItem>) => void;
export interface DataGridProviderFunction {
    (ctx: ProviderContext, callback: ProviderCallBack): Array<GridEntityItem> | DataGridProviderPromiseResult | any;
}
export interface DataGridModifiedCell {
    item: GridEntityItem;
    field_key: string;
    newValue: any;
}
export type ModificationHandler = (data: DataGridModifiedCell) => void | Promise<void>;
export declare enum RuleActions {
    INSERT = "insertText",
    REPLACE = "replaceText",
    EXEC = "executeFunction",
    LIST = "listTable",
    DELETE = "deleteObject",
    NONE = "none"
}
export interface RuleGroupAction {
    type: RuleActions;
    value: string;
}
export declare enum EngineSubOperators {
    EqualTo = "equalTo",
    NotEqual = "notEqualTo",
    StartsWith = "startsWith",
    EndsWith = "endsWith",
    Matches = "matches",
    GreaterThan = "greaterThan",
    GreaterThanOrEqualTo = "greaterThanOrEqualTo",
    LessThan = "lessThan",
    LessThanOrEqualTo = "lessThanOrEqualTo",
    Contains = "contains",
    ContainsAll = "containsAll",
    Before = "before",
    After = "after"
}
export declare enum SimpleRuleType {
    String = "string",
    Number = "number",
    Array = "array",
    Money = "money",
    Date = "date",
    Day = "day",
    Boolean = "boolean"
}
export interface EngineRuleData<V, T> {
    type: T;
    value: V;
    operator: EngineSubOperators;
}
export declare enum RegistrationGender {
    NONE = "",
    MALE = "male",
    FEMALE = "female"
}
export declare enum RegistrationLanguage {
    NONE = "",
    FR = "fr",
    EN = "en"
}
export declare const StringOperatorOptions: EngineSubOperators[];
export declare const NumberOperatorOptions: EngineSubOperators[];
export declare const BooleanOperatorOptions: EngineSubOperators[];
export declare const MoneyOperatorOptions: EngineSubOperators[];
export declare const DateOperatorOptions: EngineSubOperators[];
export declare const MultiOperatorOptions: EngineSubOperators[];
export interface EngineSimpleRule {
    identifier: string;
    value: EngineRuleData<boolean, SimpleRuleType.Boolean> | EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day> | EngineRuleData<string, SimpleRuleType.String> | EngineRuleData<number, SimpleRuleType.Number> | EngineRuleData<Array<string>, SimpleRuleType.Array> | EngineRuleData<Money, SimpleRuleType.Money> | EngineRuleData<RegistrationGender, SimpleRuleType.String> | EngineRuleData<RegistrationLanguage, SimpleRuleType.String>;
}
export interface EngineRuleGroup {
    operatorIdentifier: GroupOperator;
    children: Array<EngineRuleGroup | EngineSimpleRule>;
}
export interface FilterRuleInterface {
    name: string;
    target: string;
    conditions: EngineRuleGroup;
    action: RuleGroupAction;
}
export declare enum GroupOperator {
    AND = "AND",
    OR = "OR"
}
export interface DataGridOptions {
    lang?: 'fr' | 'en';
    i18n?: boolean;
    projectName?: string;
    customFieldTypes?: Array<{
        name: string;
        viewer: Component;
        editor: Component;
    }>;
    calendarTime?: boolean;
    dateFormat?: string;
    customRulesComponents?: Record<RuleCompTypes | string, Component>;
    ruleSchemas: SchemaList;
}
export interface IDataGridPrototype {
    lang: 'fr' | 'en';
    i18n?: boolean;
    projectName: string;
    dateFormat: string;
    calendarTime: boolean;
    _viewer: Record<FieldType | string, Component>;
    _editors: Record<FieldType | string, Component>;
    _ruleSchemas: SchemaList;
    ruleEngineConfigs: Record<string, RuleEngineConfig>;
}
declare const DataGridPlugin: PluginObject<DataGridOptions>;
export default DataGridPlugin;
export { DataGridTable, editorComponentsList, viewerComponentsList, StringViewer, StringEditor, NumberEditor, NumberViewer, BooleanViewer, BooleanEditor, BooleanRule, NumberRule, StringRule, ArrayInputMixin, FieldInputMixin, };
