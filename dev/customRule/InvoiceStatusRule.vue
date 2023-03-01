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
import Vue, { defineComponent } from "vue";

import {
  EngineSubOperators,
  StringOperatorOptions,
  FieldInputMixin,
} from "../../src";
import {
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from "bootstrap-vue";

export enum InvoiceStatus {
  NONE = "",
  AWAITING_PAYMENT = "awaiting_payment",
  COMPLETED = "completed",
  CANCELLED_REFUNDED = "cancelled_refunded",
}

export default defineComponent({
  mixins: [FieldInputMixin],
  components: {
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormSelect,
  },
  data() {
    return {
      content: "",
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
      options: Object.values(InvoiceStatus),
    };
  },
});
</script>

<style lang="scss" scoped></style>
