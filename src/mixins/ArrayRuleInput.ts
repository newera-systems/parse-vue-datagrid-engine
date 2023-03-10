import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';
import { defineComponent, PropType } from 'vue';
import {
  EngineRuleData,
  EngineSubOperators,
  MultiOperatorOptions,
  RegistrationLanguage,
  SimpleRuleType,
} from '@/index';

export default defineComponent({
  components: {
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<Array<string>, SimpleRuleType.Array>>,
      default: () =>
        ({
          type: SimpleRuleType.Array,
          value: [],
          operator: EngineSubOperators.Contains,
        } as EngineRuleData<Array<string>, SimpleRuleType.Array>),
    },
  },
  data() {
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
    this.lang = (this.$DataGrid.lang as RegistrationLanguage) ?? 'fr';
  },
  beforeMount(): void {
    this.update();
  },
  methods: {
    update(): void {
      try {
        if (this.value) {
          this.content = this.value.value;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.content = [];
        this.operator = EngineSubOperators.Contains;
      }
    },
    updateOutput(): void {
      this.$emit('input', {
        type: SimpleRuleType.Array,
        value: this.content,
        operator: this.operator,
      } as EngineRuleData<Array<string>, SimpleRuleType.Array>);
    },
  },
  watch: {
    value: {
      deep: true,
      handler: 'update',
    },
    operator: {
      deep: true,
      handler: 'updateOutput',
    },
    content: {
      deep: true,
      handler: 'updateOutput',
    },
  },
});
