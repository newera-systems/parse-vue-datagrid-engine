<template>
  <b-dropdown :text="getOperatorTranslation(operator)" right variant="outline-primary">
    <b-dropdown-item
      v-for="(op, index) of options"
      :key="`op-${index}`"
      @click="setOperation(index)"
    >
      {{ getOperatorTranslation(op) }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import { BDropdown, BDropdownItem } from 'bootstrap-vue';
import { EngineSubOperators } from '@/datagrid-bvue';
import VueI18n from 'vue-i18n';
import filterTranslate from '@/translation/filter';

Vue.use(VueI18n);
export default defineComponent({
  name: 'OperatorSelectorDropdown',
  i18n: new VueI18n(filterTranslate),
  components: {
    BDropdown,
    BDropdownItem,
  },
  props: {
    value: {
      type: String as PropType<EngineSubOperators>,
      default: null,
    },
    options: {
      type: Array as PropType<EngineSubOperators[]>,
      default: () => [],
    },
  },
  data() {
    return {
      operator: null as unknown as EngineSubOperators,
    };
  },
  mounted() {
    this.update();
  },
  methods: {
    update() {
      this.operator = this.value;
    },
    setOperation(index: number) {
      this.operator = this.options[index];
      this.$emit('input', this.operator);
    },
    getTranslation(key: string, force = false): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n || force) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    },
    getOperatorTranslation(key: EngineSubOperators): string {
      const t = this.getTranslation(`Operator.${key}`, true);
      if (t === `Operator.${key}`) {
        return key;
      }
      return t;
    },
  },
  watch: {
    value() {
      this.update();
    },
  },
});
</script>
