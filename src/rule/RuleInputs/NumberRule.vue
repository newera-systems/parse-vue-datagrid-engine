<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input v-model.number="content" autocomplete="off" trim type="number" />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BFormGroup, BFormInput, BInputGroup, BInputGroupPrepend } from "bootstrap-vue";
import { EngineRuleData, EngineSubOperators, NumberOperatorOptions, SimpleRuleType } from "@/index";
import OperatorDropdown from "@/rule/RuleInputs/OperatorDropdown.vue";

export default defineComponent({
  name: "NumberRule",
  components: {
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupPrepend,
    OperatorDropdown
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<number, SimpleRuleType.Number>>,
      default: () =>
        ({
          type: SimpleRuleType.Number,
          value: 0,
          operator: EngineSubOperators.EqualTo
        } as EngineRuleData<number, SimpleRuleType.Number>)
    }
  },
  data() {
    return {
      content: null as unknown as number,
      operator: EngineSubOperators.EqualTo,
      operatorList: NumberOperatorOptions
    };
  },
  beforeMount() {
    this.update();
  },
  methods: {
    update() {
      try {
        if (this.value) {
          this.content = this.value.value;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.content = 0;
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput() {
      this.$emit("input", {
        type: "number",
        value: this.content,
        operator: this.operator
      } as EngineRuleData<number, SimpleRuleType.Number>);
    }
  },
  watch: {
    value: {
      deep: true,
      handler: "update"
    },
    operator: {
      deep: true,
      handler: "updateOutput"
    },
    content: {
      deep: true,
      handler: "updateOutput"
    }
  }
})
</script>
