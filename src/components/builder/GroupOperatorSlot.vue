<template>
  <div class="container-fluid group-operator">
    <BRow>
      <BCol>
        <BDropdown
          :text="getTranslation(groupOperator.currentOperator)"
          dropright
          variant="outline-dark"
        >
          <BDropdownItem
            v-for="operator in groupOperator.operators"
            :key="operator.identifier"
            :variant="groupOperator.currentOperator === operator.identifier ? 'primary' : 'dark'"
            @click="selectOperator(operator.identifier)"
          >
            {{ getTranslation(operator.name) }}
          </BDropdownItem>
        </BDropdown>
      </BCol>
    </BRow>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import { GroupOperatorSlotProps } from 'query-builder-vue';
import { BButton, BCol, BDropdown, BDropdownItem, BRow } from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import filterTranslate from '@/translation/filter';

Vue.use(VueI18n);
export default defineComponent({
  name: 'ModalGroupOperatorSlot',
  i18n: new VueI18n(filterTranslate),
  components: {
    BButton,
    BCol,
    BDropdown,
    BDropdownItem,
    BRow,
  },
  props: {
    groupOperator: {
      type: Object as PropType<GroupOperatorSlotProps>,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    selectOperator(operator: string) {
      this.expanded = false;
      this.groupOperator.updateCurrentOperator(operator);
    },
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

<style scoped>
.group-operator {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>
