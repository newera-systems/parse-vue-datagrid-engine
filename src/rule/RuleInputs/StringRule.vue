<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input v-model="content" autocomplete="off" trim />
      <b-input-group-append v-show="operator === 'matches'" is-text>
        <b-form-checkbox
          v-model="caseSensitive"
          class="custom-control-info"
          plain
          title="Case sensitive regex"
        />
      </b-input-group-append>
    </b-input-group>
    <p v-show="operator === 'matches'" class="m-0 p-0">
      {{ $t('regexGenerated') }}: <small class="pr-1 text-info"> {{ regex }}</small>
    </p>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BInputGroupText,
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
    BFormCheckbox,
    BInputGroupText,
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
      caseSensitive: false,
    };
  },
  computed: {
    regex(): RegExp {
      if (this.content.startsWith('/') && this.content.endsWith('/')) {
        // Input is already a regex
        const flags = this.content.slice(this.content.lastIndexOf('/') + 1);
        return new RegExp(
          this.content.slice(1, -1).slice(0, -flags.length),
          flags + (this.caseSensitive ? '' : 'i')
        );
      } else {
        // Input is text
        return new RegExp(this.content, this.caseSensitive ? '' : 'i');
      }
    },
  },
  methods: {
    update(): void {
      try {
        if (this.value) {
          this.content = this.value.value;
          this.operator = this.value.operator;
          this.caseSensitive = this.value.caseSensitive ?? false;
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
        caseSensitive: this.caseSensitive,
      } as EngineRuleData<string, SimpleRuleType.String>);
    },
  },
  watch: {
    caseSensitive(newVal, oldVal) {
      if (newVal !== oldVal) this.updateOutput();
    },
  },
});
</script>

<style lang="scss" scoped></style>
