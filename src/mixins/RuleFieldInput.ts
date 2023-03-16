import OperatorDropdown from "@/rule/RuleInputs/OperatorDropdown.vue";
import { defineComponent, type PropType } from "vue";
import {
  type EngineRuleData,
  EngineSubOperators,
  SimpleRuleType,
  StringOperatorOptions
} from "@/datagrid-bvue";

export default defineComponent({
  components: {
    OperatorDropdown
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<any, SimpleRuleType>>,
      default: () => ({
        type: SimpleRuleType.String,
        value: "",
        operator: EngineSubOperators.EqualTo
      })
    }
  },
  data() {
    return {
      content: "" as string,
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions
    };
  },
  watch: {
    value: {
      deep: true,
      handler: "update"
    },
    operator: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOutput();
        }
      }
    },
    content: {
      deep: true,
      handler: function(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOutput();
        }
      }
    }
  },
  beforeMount(): void {
    this.update();
  },
  methods: {
    update(): void {
      try {
        this.content = this.value.value;
        this.operator = this.value.operator;
      } catch (e) {
        this.content = "";
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput(): void {
      const val: EngineRuleData<string, SimpleRuleType.String> = {
        type: SimpleRuleType.String,
        value: this.content,
        operator: this.operator
      };
      this.$emit("input", val);
    }
  }
})
