<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <div class="ruleBoxData">
        <b-form-radio-group
          v-model="selected"
          :options="options"
          text-field="text"
          value-field="value"
        />
      </div>
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BFormGroup, BInputGroup, BInputGroupPrepend } from "bootstrap-vue";
import {
  BooleanOperatorOptions,
  EngineRuleData,
  EngineSubOperators,
  SimpleRuleType
} from "@/datagrid-bvue";
import fieldInput from "@/mixins/RuleFieldInput";
import OperatorDropdown from "@/rule/RuleInputs/OperatorDropdown.vue";

export default defineComponent({
  name: "BooleanRule",
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    OperatorDropdown
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<boolean, SimpleRuleType.Boolean>>,
      default: () =>
        ({
          type: SimpleRuleType.Boolean,
          value: true,
          operator: EngineSubOperators.EqualTo
        } as EngineRuleData<boolean, SimpleRuleType.Boolean>)
    }
  },
  data() {
    return {
      selected: true,
      operator: EngineSubOperators.EqualTo,
      operatorList: BooleanOperatorOptions
    };
  },
  computed: {
    options(): { value: boolean; text: string }[] {
      return [
        { value: true, text: this.getTranslation("yes") },
        { value: false, text: this.getTranslation("no") }
      ];
    }
  },
  methods: {
    update() {
      if (this.value) {
        this.selected = this.value.value ?? true;
        this.operator = this.value.operator ?? EngineSubOperators.EqualTo;
      }
    },
    updateOutput() {
      this.$emit("input", {
        type: SimpleRuleType.Boolean,
        value: this.selected,
        operator: this.operator
      } as EngineRuleData<boolean, SimpleRuleType.Boolean>);
    },
    getTranslation(key: string): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    }
  },
  watch: {
    selected() {
      this.updateOutput();
    }
  }
})
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
