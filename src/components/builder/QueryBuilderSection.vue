<template>
  <div>
    <query-builder v-model="localConditions" :config="config">
      <template #groupOperator="props">
        <group-operator-slot :group-operator="props" />
      </template>

      <template #groupControl="props">
        <group-ctrl-slot :group-ctrl="props" />
      </template>

      <template #rule="props">
        <rule-slot :ruleCtrl="props" :rules="config.rules" />
      </template>
    </query-builder>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import QueryBuilder, { QueryBuilderConfig } from 'query-builder-vue';
import { EngineRuleGroup, GroupOperator } from '../../datagrid-bvue';
import RuleSlot from '../../components/builder/RuleSlot.vue';
import GroupCtrlSlot from '../../components/builder/GroupCtrlSlot.vue';
import GroupOperatorSlot from '../../components/builder/GroupOperatorSlot.vue';

export default defineComponent({
  name: 'QueryBuilderSection',
  components: { GroupOperatorSlot, GroupCtrlSlot, QueryBuilder, RuleSlot },
  props: {
    config: {
      type: Object as PropType<QueryBuilderConfig>,
      required: true,
    },
    conditions: {
      type: Object as PropType<EngineRuleGroup>,
      required: true,
      default: () => ({
        operatorIdentifier: GroupOperator.AND,
        children: [],
      }),
    },
  },
  emits: ['update:conditions'],
  model: {
    prop: 'conditions',
    event: 'update:conditions',
  },
  data() {
    return {
      localConditions: this.conditions,
    };
  },
  watch: {
    localConditions: {
      handler() {
        this.$emit('update:conditions', this.localConditions);
      },
      deep: true,
    },
    conditions: {
      handler() {
        this.localConditions = this.conditions;
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
