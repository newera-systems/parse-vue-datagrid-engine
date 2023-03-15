<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <BFormSelect v-model="content" :options="options" />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EngineSubOperators, FieldInputMixin, StringOperatorOptions } from "../../src";
import { InvoiceStatus } from "../customFields/InvoiceStatusViewer.vue";
import { BFormGroup, BFormSelect, BInputGroup, BInputGroupPrepend } from "bootstrap-vue";

export default defineComponent({
  mixins: [FieldInputMixin],
  components: {
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormSelect
  },
  data() {
    return {
      content: "",
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
      options: Object.values(InvoiceStatus)
    };
  }
});
</script>

<style lang="scss" scoped></style>
