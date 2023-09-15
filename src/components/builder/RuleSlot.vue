<template>
  <div class="w-100">
    <div>
      <FieldNamePrinter :definition="{ name: ruleName, chain: chain }" />
    </div>
    <div class="w-100">
      <component
        :is="ruleCtrl.ruleComponent"
        :value="ruleCtrl.ruleData"
        @input="ruleCtrl.updateRuleData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { RuleSlotProps } from 'query-builder-vue';

import { defineComponent, PropType } from 'vue';
import FieldNamePrinter from '@components/FieldNamePrinter.vue';
import { RuleDefinitionWithChain } from '@/rule/RuleElementCreator';

export default defineComponent({
  name: 'RuleSlot-Builders',
  components: { FieldNamePrinter },
  props: {
    ruleCtrl: {
      type: Object as PropType<RuleSlotProps>,
      required: true,
    },
    rules: {
      type: Array as PropType<RuleDefinitionWithChain[]>,
      required: true,
    },
  },
  computed: {
    ruleName(): string {
      return this.rules.find(r => r.identifier === this.ruleCtrl.ruleIdentifier)?.name ?? '??';
    },
    chain(): string[] {
      return this.rules.find(r => r.identifier === this.ruleCtrl.ruleIdentifier)?.chain ?? [];
    },
  },
});
</script>
