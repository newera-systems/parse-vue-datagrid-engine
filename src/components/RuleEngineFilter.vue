<template>
  <div class="mx-4">
    <h5 class="text-capitalize">{{ localValue.name }}</h5>
    <h6 v-if="error" class="p-4 bg-danger rounded text-center text-light">
      {{ $t('Error.target') }}
    </h6>
    <div v-else class="d-flex flex-wrap">
      <RuleFilterInput
        v-for="(ruleDefinition, index) in allowedRules"
        :key="`${ruleDefinition.identifier}-${index}`"
        :definition="ruleDefinition"
        :value="_getLocalRule(ruleDefinition.identifier)"
        @input="updateLocalRule"
      />
    </div>
    <small class="font-weight-lighter" style="font-size: smaller">{{ $t('caseSensitive') }}</small>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import RuleFilterInput from '@/rule/RuleFilterInput.vue';
import {
  EngineRuleGroup,
  EngineSimpleRule,
  FilterRuleInterface,
  GroupOperator,
  IDataGridPrototype,
  RuleActions,
} from '@/datagrid-bvue';
import { RuleDefinitionWithChain, RuleEngineConfig } from '@/rule/RuleElementCreator';
import VueI18n from 'vue-i18n';
import filterTranslate from '@/translation/filter';

Vue.use(VueI18n);
export default defineComponent({
  name: 'RuleEngineFilter',
  i18n: new VueI18n(filterTranslate),
  components: {
    RuleFilterInput,
  },
  props: {
    value: {
      type: Object as PropType<FilterRuleInterface | null>,
      default: null,
    },
    visibleName: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      required: true,
    },
    operator: {
      type: String as PropType<GroupOperator>,
      default: () => GroupOperator.AND,
    },
    fieldList: {
      type: Array as PropType<Array<string>>,
      default: () => [],
    },
  },
  data() {
    return {
      localValue: {
        name: `${this.visibleName} filter`,
        target: this.target,
        conditions: {
          operatorIdentifier: this.operator,
          children: [],
        },
        action: { type: RuleActions.LIST, value: this.visibleName },
      } as FilterRuleInterface,
    };
  },
  computed: {
    // make all rule in a EngineSimpleRule Array
    children(): Array<EngineSimpleRule> {
      const children: Array<EngineSimpleRule> = [];
      for (const rule of this.localValue.conditions.children) {
        if ('identifier' in rule && rule.identifier) {
          children.push(rule);
        }
        if ('operatorIdentifier' in rule && rule.operatorIdentifier) {
          children.push(...this.getSimpleRules(rule));
        }
      }
      return children;
    },
    engine(): RuleEngineConfig | null {
      // @ts-expect-error DataGrid is  set by plugin config
      const engine: RuleEngineConfig = (this.$DataGrid as IDataGridPrototype).ruleEngineConfigs[
        this.target
      ];
      if (!engine) {
        console.error('[DataGrid Rule Modal] target rule config schema not found');
        return null;
      }
      return engine;
    },
    allowedRules(): Array<RuleDefinitionWithChain> {
      if (!this.engine) {
        console.error('[DataGrid Filter] target rule config schema not found');
        return [];
      }
      return this.engine.rules.filter(r => {
        return this.fieldList.includes(r.identifier);
      });
    },
    localConditions(): Array<EngineSimpleRule> {
      return this.allowedRules.map(rule => {
        const found = this.children.find(c => c.identifier === rule.identifier);
        if (found) {
          return found;
        }
        return {
          identifier: rule.identifier,
          value: rule.initialValue,
        };
      });
    },
    error(): boolean {
      return this.engine === null;
    },
  },
  methods: {
    // get all simple rules from a EngineRuleGroup
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule> {
      const children: Array<EngineSimpleRule> = [];
      for (const child of rule.children) {
        if ('identifier' in child && child.identifier) {
          children.push(child);
        }
        if ('operatorIdentifier' in child && child.operatorIdentifier) {
          children.push(...this.getSimpleRules(child));
        }
      }
      return children;
    },
    // check if a rule is valid, and can be added to the customRule
    checkIfValidRule(rule: EngineSimpleRule): boolean {
      if (rule.value) {
        if (typeof rule.value.value === 'boolean') {
          return true;
        }
        return !!rule.value.value;
      }
      return false;
    },
    // accessing local conditions array value
    _getLocalRule(identifier: string): EngineSimpleRule {
      const found = this.localConditions.find(r => r.identifier === identifier);
      if (found) {
        return found;
      } else {
        return <EngineSimpleRule>{
          identifier,
          value: null as any,
        };
      }
    },
    // updating a rule inside a EngineRuleGroup
    _setRuleInFilter(
      group: EngineRuleGroup,
      ruleToInsert: EngineSimpleRule,
      valid: boolean = true
    ): boolean {
      const replaced: boolean[] = [];
      let index = 0;
      for (const rule of group.children) {
        if ('identifier' in rule && rule.identifier) {
          if (rule.identifier === ruleToInsert.identifier && valid) {
            rule.value = ruleToInsert.value;
            replaced.push(true);
          } else if (rule.identifier === ruleToInsert.identifier && !valid) {
            group.children.splice(index, 1);
            replaced.push(true);
          }
        }
        if ('operatorIdentifier' in rule && rule.operatorIdentifier) {
          const found: boolean = this._setRuleInFilter(rule, ruleToInsert);
          replaced.push(found);
        }
        index++;
      }
      return replaced.includes(true);
    },

    updateLocalRule(rule: EngineSimpleRule) {
      const valid = this.checkIfValidRule(rule);
      const replaced = this._setRuleInFilter(this.localValue.conditions, rule, valid);
      if (!replaced && valid) {
        this.localValue.conditions.children.push(rule);
      }
    },
  },
  watch: {
    value: {
      handler(value: FilterRuleInterface | null) {
        const same = JSON.stringify(value) === JSON.stringify(this.localValue);
        if (same) {
          return;
        }
        if (value) {
          this.localValue = { ...value };
        } else {
          this.localValue = {
            name: `${this.visibleName} filter`,
            target: this.target,
            conditions: {
              operatorIdentifier: this.operator,
              children: [],
            },
            action: { type: RuleActions.LIST, value: this.visibleName },
          } as FilterRuleInterface;
        }
      },
      immediate: true,
    },
    localValue: {
      handler(value: FilterRuleInterface) {
        const same = JSON.stringify(value) === JSON.stringify(this.value);
        if (!same) {
          this.$emit('input', { ...value });
        }
      },
      deep: true,
    },
  },
});
</script>
