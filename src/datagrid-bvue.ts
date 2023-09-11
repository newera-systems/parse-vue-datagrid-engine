import { type Component } from 'vue';
import { type PluginObject } from 'vue/types/plugin';
import DataGridTable from './components/Table.vue';
import RuleEngineFilter from '@components/RuleEngineFilter.vue';
import RuleEditorModal from '@components/RuleEditorModal.vue';
import { editorComponentsList, viewerComponentsList } from '@/editFields/config';
import { componentsList, RuleEngineConfig, type SchemaList } from '@/rule/RuleElementCreator';
import { type Money } from 'ts-money';
import { type Language } from '@/fieldsData';

export interface GridFieldOptions {
  canView: boolean;
  canEdit: boolean;
  canFilter: boolean;
  canRead: boolean;
  canSort: boolean;
}

export enum FieldType {
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Money = 'Money',
  Percent = 'Percent',
  Lang = 'Lang',
  Date = 'Date',
  OtherEntity = 'Pointer',
  Array = 'Array',
}

export enum RuleCompTypes {
  Boolean = 'Boolean',
  String = 'String',
  Number = 'Number',
  Money = 'Money',
  Lang = 'Lang',
  Date = 'Date',
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

type indexObject = Record<string | number, any>;

export interface GridEntityItem extends indexObject {
  id: string;
}

export type DataGridProviderPromiseResult = Promise<GridEntityItem[] | null>;

type ProviderCallBack = (items: GridEntityItem[]) => void;

export type DataGridProviderFunction = (
  ctx: ProviderContext,
  callback: ProviderCallBack
) => GridEntityItem[] | DataGridProviderPromiseResult | any;

export interface DataGridModifiedCell {
  item: GridEntityItem;
  fieldKey: string;
  newValue: any;
}

export type ModificationHandler = (data: DataGridModifiedCell) => void | Promise<void>;

export enum RuleActions {
  INSERT = 'insertText',
  REPLACE = 'replaceText',
  EXEC = 'executeFunction',
  LIST = 'listTable',
  DELETE = 'deleteObject',
  NONE = 'none',
}

// rule action
export interface RuleGroupAction {
  type: RuleActions;
  value: string;
}

export enum EngineSubOperators {
  EqualTo = 'equalTo',
  NotEqual = 'notEqualTo',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith',
  Matches = 'matches',
  GreaterThan = 'greaterThan',
  GreaterThanOrEqualTo = 'greaterThanOrEqualTo',
  LessThan = 'lessThan',
  LessThanOrEqualTo = 'lessThanOrEqualTo',
  Contains = 'contains',
  ContainsAll = 'containsAll',
  Before = 'before',
  After = 'after',
}

export enum SimpleRuleType {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Money = 'money',
  Date = 'date',
  Day = 'day',
  Boolean = 'boolean',
}

export interface EngineRuleData<V, T> {
  type: T;
  value: V;
  operator: EngineSubOperators;
}

export enum RegistrationGender {
  NONE = '',
  MALE = 'male',
  FEMALE = 'female',
}

export const StringOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.EqualTo,
  EngineSubOperators.NotEqual,
  EngineSubOperators.StartsWith,
  EngineSubOperators.EndsWith,
  EngineSubOperators.Matches,
];
export const NumberOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.EqualTo,
  EngineSubOperators.NotEqual,
  EngineSubOperators.GreaterThan,
  EngineSubOperators.LessThan,
  EngineSubOperators.GreaterThanOrEqualTo,
  EngineSubOperators.LessThanOrEqualTo,
];
export const BooleanOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.EqualTo,
  EngineSubOperators.NotEqual,
];
export const MoneyOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.EqualTo,
  EngineSubOperators.NotEqual,
  EngineSubOperators.GreaterThan,
  EngineSubOperators.LessThan,
  EngineSubOperators.GreaterThanOrEqualTo,
  EngineSubOperators.LessThanOrEqualTo,
];
export const DateOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.EqualTo,
  EngineSubOperators.NotEqual,
  EngineSubOperators.GreaterThan,
  EngineSubOperators.LessThan,
  EngineSubOperators.GreaterThanOrEqualTo,
  EngineSubOperators.LessThanOrEqualTo,
  EngineSubOperators.Before,
  EngineSubOperators.After,
];
export const MultiOperatorOptions: EngineSubOperators[] = [
  EngineSubOperators.Contains,
  EngineSubOperators.ContainsAll,
];

export interface EngineSimpleRule {
  identifier: string;
  value:
    | EngineRuleData<boolean, SimpleRuleType.Boolean>
    | EngineRuleData<string, SimpleRuleType.Date>
    | EngineRuleData<string, SimpleRuleType.Day>
    | EngineRuleData<string, SimpleRuleType.String>
    | EngineRuleData<number, SimpleRuleType.Number>
    | EngineRuleData<string[], SimpleRuleType.Array>
    | EngineRuleData<Money, SimpleRuleType.Money>
    | EngineRuleData<RegistrationGender, SimpleRuleType.String>
    | EngineRuleData<Language, SimpleRuleType.String>;
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

export enum GroupOperator {
  AND = 'AND',
  OR = 'OR',
}

export interface DataGridOptions {
  lang?: 'fr' | 'en'; // language
  i18n?: boolean; // use i18n or not (default: true)
  verbose?: boolean; // verbose mode for debug, showing null and undefined values (default: false)
  projectName?: string;
  customFieldTypes?: Array<{
    name: string;
    viewer: Component;
    editor: Component;
  }>;
  calendarTime?: boolean;
  dateFormat?: string; // default: 'ddd DD-MM-YY HH:mm'
  customRulesComponents?: Record<RuleCompTypes | string, Component>;
  ruleSchemas: SchemaList;
}

export interface IDataGridPrototype {
  lang: 'fr' | 'en'; // language
  i18n?: boolean; // use i18n or not
  verbose?: boolean; // verbose mode for debug, showing null and undefined values
  projectName: string;
  dateFormat: string;
  calendarTime: boolean; // default: true
  _viewer: Record<FieldType | string, Component>; // field types viewer components
  _editors: Record<FieldType | string, Component>; // field types editors components
  _ruleSchemas: SchemaList; // rule schemas list for rule engine component
  ruleEngineConfigs: Record<string, RuleEngineConfig>;
}

function initAllSchemasConfig(schemas: SchemaList): Record<string, RuleEngineConfig> {
  const configs: Record<string, RuleEngineConfig> = {};
  for (const target of Object.keys(schemas)) {
    configs[target] = new RuleEngineConfig(schemas, target);
  }
  return configs;
}

const DataGridPlugin: PluginObject<DataGridOptions> = {
  install(Vue, options) {
    Vue.component('DataGridTable', DataGridTable);
    Vue.component('RuleEngineFilter', RuleEngineFilter);
    Vue.component('RuleEngineCreatorModal', RuleEditorModal);
    const DataGrid: IDataGridPrototype = {
      lang: 'fr' as 'fr' | 'en',
      i18n: false,
      verbose: false,
      projectName: '',
      dateFormat: 'ddd DD-MM-YY HH:mm',
      calendarTime: true,
      _viewer: viewerComponentsList,
      _editors: editorComponentsList,
      _ruleSchemas: {},
      ruleEngineConfigs: {},
    };
    Vue.prototype.$DataGrid = DataGrid;
    if (options?.lang !== undefined) {
      Vue.prototype.$DataGrid.lang = options.lang;
    }
    if (options?.verbose !== undefined) {
      Vue.prototype.$DataGrid.verbose = options.verbose;
    }
    if (options?.i18n !== undefined) {
      Vue.prototype.$DataGrid.i18n = options.i18n;
    }
    if (options?.calendarTime !== undefined) {
      Vue.prototype.$DataGrid.calendarTime = options.calendarTime;
    }
    if (options?.dateFormat !== undefined) {
      Vue.prototype.$DataGrid.dateFormat = options.dateFormat;
    }
    if (options?.customFieldTypes != null) {
      options.customFieldTypes.forEach(field => {
        viewerComponentsList[field.name] = field.viewer;
        editorComponentsList[field.name] = field.editor;
      });
    }
    if (options?.customRulesComponents != null) {
      for (const key of Object.keys(options.customRulesComponents)) {
        componentsList[key] = options.customRulesComponents[key];
      }
    }
    if (options?.ruleSchemas != null) {
      Vue.prototype.$DataGrid._ruleSchemas = options?.ruleSchemas;
      Vue.prototype.$DataGrid.ruleEngineConfigs = initAllSchemasConfig(options?.ruleSchemas);
    }
  },
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue !== undefined && window.Vue.use !== undefined) {
  window.Vue.use(DataGridPlugin);
}

export default DataGridPlugin;
export * from './namedExports';
export * from './ParseModelDecorator/index';
