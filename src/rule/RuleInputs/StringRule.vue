<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input v-model="content" autocomplete="off" trim />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import {
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue';
import { EngineRuleData, EngineSubOperators, SimpleRuleType, StringOperatorOptions } from '@/index';
import fieldInput from '@/mixins/RuleFieldInput';
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';

export default defineComponent({
  name: 'StringRule',
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<string, SimpleRuleType.String>>,
      default: () =>
        ({
          type: SimpleRuleType.String,
          value: '',
          operator: EngineSubOperators.EqualTo,
        } as EngineRuleData<string, SimpleRuleType.String>),
    },
  },
  data() {
    return {
      content: '',
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
    };
  },
  methods: {},
});
</script>

<style lang="scss" scoped></style>
