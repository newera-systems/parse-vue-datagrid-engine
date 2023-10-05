import { type QueryBuilderConfig, type RuleDefinition } from 'query-builder-vue';
import { type Component } from 'vue';
import StringRule from '@/rule/RuleInputs/StringRule.vue';
import NumberRule from '@/rule/RuleInputs/NumberRule.vue';
import MoneyRule from '@/rule/RuleInputs/MoneyRule.vue';
import LangRule from '@/rule/RuleInputs/LangRule.vue';
import DateRule from '@/rule/RuleInputs/DateRule.vue';
import BooleanRule from '@/rule/RuleInputs/BooleanRule.vue';
import { GroupOperator, type RuleCompTypes } from '@/datagrid-bvue';
import OtherRule from '@/rule/RuleInputs/OtherRule.vue';

export interface SchemaDefinition {
  identifier: string;
  name: string;
  type: RuleCompTypes | string;
  chain?: string[];
}

export type SchemaList = Record<string, SchemaDefinition[]>;

export interface RuleDefinitionWithChain extends RuleDefinition {
  chain?: string[];
}

export const componentsList: Record<RuleCompTypes | string, Component> = {
  Boolean: BooleanRule,
  String: StringRule,
  Number: NumberRule,
  Percent: NumberRule,
  Money: MoneyRule,
  Lang: LangRule,
  Date: DateRule,
};

export class RuleEngineConfig {
  public draggable: boolean;
  public rules: RuleDefinitionWithChain[];
  private readonly target: string;
  private readonly schemas: SchemaList;

  constructor(schemaList: SchemaList, target: string, draggable = true) {
    this.target = target;
    this.draggable = draggable;
    this.rules = [];
    this.schemas = schemaList;
    this.build();
  }

  getConfig(): QueryBuilderConfig {
    return {
      operators: [
        {
          name: 'AND',
          identifier: GroupOperator.AND,
        },
        {
          name: 'OR',
          identifier: GroupOperator.OR,
        },
      ],
      rules: this.rules,
      colors: ['#6610f2', '#ff9f43', '#ffc107', '#ea5455'],
      dragging: {
        animation: 300,
        disabled: this.draggable,
        dragClass: 'sortable-drag',
      },
    };
  }

  build(): void {
    const data = this.schemas[this.target];
    if (data === undefined) {
      console.warn('[DataGrid Rule: Schema of the target not found]');
      return;
    }
    for (const rule of data) {
      this.rules.push({
        component: componentsList[rule.type] ?? OtherRule,
        identifier: rule.identifier,
        name: rule.name,
        initialValue: null,
        chain: rule.chain,
      });
    }
  }
}
