import {QueryBuilderConfig, RuleDefinition} from 'query-builder-vue'
import {Component} from 'vue'
import StringRule from '@/rule/RuleInputs/StringRule.vue'
import NumberRule from '@/rule/RuleInputs/NumberRule.vue'
import MoneyRule from '@/rule/RuleInputs/MoneyRule.vue'
import LangRule from '@/rule/RuleInputs/LangRule.vue'
import DateRule from '@/rule/RuleInputs/DateRule.vue'
import BooleanRule from '@/rule/RuleInputs/BooleanRule.vue'
import {GroupOperator, RuleCompTypes} from '@/index'

export interface SchemaDefinition {
  identifier: string
  name: string
  type: RuleCompTypes | string
}

export type SchemaList = {
  [key: string]: SchemaDefinition[]
}

export const componentsList: Record<RuleCompTypes | string, Component> = {
  Boolean: BooleanRule,
  String: StringRule,
  Number: NumberRule,
  Money: MoneyRule,
  Lang: LangRule,
  Date: DateRule,
}

export class RuleEngineConfig {
  public draggable: boolean
  public rules: RuleDefinition[]
  private readonly target: string
  private readonly schemas: SchemaList

  constructor(schemaList: SchemaList, target: string, draggable = true) {
    this.target = target
    this.draggable = draggable
    this.rules = []
    this.schemas = schemaList
    this.build()
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
    }
  }

  build(): void {
    const data = this.schemas[this.target]
    if (!data) {
      console.warn(`[DataGrid Rule: Schema of the target not found]`)
      return
    }
    for (const rule of data) {
      this.rules.push({
        component: componentsList[rule.type],
        identifier: rule.identifier,
        name: rule.name,
        initialValue: null,
      })
    }
  }
}
