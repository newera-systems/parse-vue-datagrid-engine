<template>
  <div class="w-100">
    <div>
      <span>{{ ruleName }}</span>
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
import { RuleDefinition, RuleSlotProps } from 'query-builder-vue';

import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RuleSlot-Builders',
  props: {
    ruleCtrl: {
      type: Object as PropType<RuleSlotProps>,
      required: true,
    },
    rules: {
      type: Array as PropType<RuleDefinition[]>,
      required: true,
    },
  },
  computed: {
    ruleName(): string {
      const name = this.rules.find(r => r.identifier === this.ruleCtrl.ruleIdentifier)?.name;
      return name ? this.getTranslation(name) : '??';
    },
  },
  methods: {
    getTranslation(key: string): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    },
  },
});
</script>
