<template>
  <div class="card">
    <div class="card-body">
      <h2 class="h3 font-weight-normal text-muted">{{ title }}</h2>
      <button class="btn btn-secondary ml-4 btn-sm mb-1" @click="setFilter">set a Test rule</button>
      <RuleEngineFilter
        v-model="filterBuild"
        :field-list="fieldList"
        operator="AND"
        target="Student"
        visible-name="School"
      />
      <div>
        <h4>Generated rule code</h4>
        <pre class="rule-code">
        <code>
            {{ JSON.stringify(filterBuild, null, 2) }}
        </code>
      </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  EngineSubOperators,
  FilterRuleInterface,
  GroupOperator,
  RuleActions,
  SimpleRuleType,
} from '../../src/datagrid-bvue';

export default defineComponent({
  data() {
    return {
      title: 'Rule Filter Component',
      filterBuild: null as unknown as FilterRuleInterface,
      fieldList: ['firstName', 'order', 'language', 'sophomore'],
    };
  },
  methods: {
    setFilter() {
      const ruleValue = {
        type: SimpleRuleType.String,
        value: 'hello test',
        operator: EngineSubOperators.EqualTo,
      };
      this.filterBuild = {
        name: 'Student list',
        target: 'Student',
        conditions: {
          operatorIdentifier: GroupOperator.AND,
          children: [
            {
              identifier: 'firstName',
              value: ruleValue,
            },
            {
              identifier: 'lastName', // not in the field list
              value: ruleValue,
            },
          ],
        },
        action: {
          type: RuleActions.LIST,
          value: '',
        },
      };
    },
  },
  watch: {
    filterBuild: {
      handler: function (val) {
        // console.log('new customRule', val)
      },
      deep: true,
    },
  },
});
</script>

<style scoped></style>
