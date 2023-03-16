<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <div class="ruleBoxData">
        <b-form-radio-group
          v-model="lang"
          :options="langOptions"
          text-field="text"
          value-field="value"
        />
      </div>
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BFormGroup, BFormRadioGroup, BInputGroup, BInputGroupPrepend } from 'bootstrap-vue';
import {
  BooleanOperatorOptions,
  EngineRuleData,
  EngineSubOperators,
  RegistrationLanguage,
  SimpleRuleType,
} from '@/datagrid-bvue';
import fieldInput from '@/mixins/RuleFieldInput';
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';
import { LOCALES } from '@/fieldsData';

export default defineComponent({
  name: 'LangRule',
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormRadioGroup,
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<RegistrationLanguage, SimpleRuleType.String>>,
      default: () =>
        ({
          type: SimpleRuleType.String,
          value: RegistrationLanguage.NONE,
          operator: EngineSubOperators.EqualTo,
        } as EngineRuleData<RegistrationLanguage, SimpleRuleType.String>),
    },
  },
  data() {
    return {
      lang: RegistrationLanguage.NONE,
      operator: EngineSubOperators.EqualTo,
      operatorList: BooleanOperatorOptions,
    };
  },
  computed: {
    langOptions(): Array<{ value: string; text: string }> {
      const acceptedLanguages = ['fr', 'en'] as string[];
      return Array.from(LOCALES.values())
        .filter(locale => acceptedLanguages.includes(locale.value))
        .map(locale => ({
          value: locale.value,
          text: locale.name,
        }));
    },
  },
  methods: {
    update() {
      try {
        if (this.value) {
          this.lang = this.value.value;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.lang = RegistrationLanguage.NONE;
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput() {
      this.$emit('input', {
        type: SimpleRuleType.String,
        value: this.lang,
        operator: this.operator,
      } as EngineRuleData<RegistrationLanguage, SimpleRuleType.String>);
    },
  },
  watch: {
    lang() {
      this.updateOutput();
    },
  },
});
</script>

<style lang="scss" scoped>
.ruleBoxData {
  flex: 1 1 auto;
  border: 1px solid #d8d6de;
  border-bottom-right-radius: 0.357rem;
  border-top-right-radius: 0.357rem;
  padding: 0.5rem 0 0 0.5rem;
}
</style>
