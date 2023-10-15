<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input
        v-model="content"
        :disabled="operator === 'empty' || operator === 'notEmpty'"
        autocomplete="off"
        trim
      />
    </b-input-group>
    <p v-show="operator === 'matches'" class="m-0 p-0">
      Format:
      <span class="text-danger">/</span>
      <small class="text-info">Pattern</small>
      <span class="text-danger">/</span>
      <small class="text-dark">flags</small>
    </p>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue';
import {
  EngineRuleData,
  EngineSubOperators,
  SimpleRuleType,
  StringOperatorOptions,
} from '@/datagrid-bvue';
import fieldInput from '@/mixins/RuleFieldInput';
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';

export default defineComponent({
  name: 'StringRule',
  computed: {
    EngineSubOperators() {
      return EngineSubOperators;
    },
  },
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BFormInput,
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
      caseSensitive: false,
    };
  },
  methods: {
    update(): void {
      try {
        if (this.value) {
          this.content = this.value.value;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.content = '';
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput() {
      this.$emit('input', {
        type: SimpleRuleType.String,
        value: this.content,
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.String>);
    },
  },
});
</script>

<style lang="scss" scoped></style>
