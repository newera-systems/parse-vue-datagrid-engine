import OperatorDropdown from "@/rule/RuleInputs/OperatorDropdown.vue";
import { PropType } from "vue";
import {
  EngineRuleData,
  EngineSubOperators,
  MultiOperatorOptions,
  RegistrationLanguage,
  SimpleRuleType,
} from "@/index";

export default {
  components: {
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<
        EngineRuleData<Array<string>, SimpleRuleType.Array>
      >,
      default(): {
        type: SimpleRuleType;
        value: [];
        operator: EngineSubOperators;
      } {
        return {
          type: SimpleRuleType.Array,
          value: [],
          operator: EngineSubOperators.Contains,
        };
      },
    },
  },
  data(): {
    content: string[];
    lang: RegistrationLanguage;
    operator: EngineSubOperators;
    operatorList: EngineSubOperators[];
    options: [];
  } {
    return {
      content: [] as string[],
      lang: RegistrationLanguage.FR,
      operator: EngineSubOperators.Contains,
      operatorList: MultiOperatorOptions,
      options: [],
    };
  },
  created(): void {
    // @ts-expect-error lang exist on component
    this.lang = (this.$DataGrid.lang as RegistrationLanguage) ?? "fr";
  },
  beforeMount(): void {
    // @ts-expect-error function exist on component
    this.update();
  },
  methods: {
    update(): void {
      try {
        // @ts-expect-error value exist on component
        if (this.value) {
          // @ts-expect-error value exist on component
          this.content = this.value.value;
          // @ts-expect-error value exist on component
          this.operator = this.value.operator;
        }
      } catch (e) {
        // @ts-expect-error content exist on component
        this.content = [];
        // @ts-expect-error operator exist on component
        this.operator = EngineSubOperators.Contains;
      }
    },
    updateOutput(): void {
      // @ts-expect-error emit exist on component
      this.$emit("input", {
        type: SimpleRuleType.Array,
        // @ts-expect-error content exist on component
        value: this.content,
        // @ts-expect-error operator exist on component
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.Array>);
    },
  },
  watch: {
    value: {
      deep: true,
      handler: "update",
    },
    operator: {
      deep: true,
      handler: "updateOutput",
    },
    content: {
      deep: true,
      handler: "updateOutput",
    },
  },
};
