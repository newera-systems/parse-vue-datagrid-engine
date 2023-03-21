import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';
import { defineComponent, type PropType } from 'vue';
import {
  type EngineRuleData,
  EngineSubOperators,
  MultiOperatorOptions,
  SimpleRuleType,
} from '@/datagrid-bvue';
import { Language } from '@/fieldsData';

export default defineComponent({
  components: {
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<string[], SimpleRuleType.Array>>,
      default: () => ({
        type: SimpleRuleType.Array,
        value: [],
        operator: EngineSubOperators.Contains,
      }),
    },
  },
  data() {
    return {
      content: [] as string[],
      lang: Language.FR,
      operator: EngineSubOperators.Contains,
      operatorList: MultiOperatorOptions,
      options: [],
    };
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
  created(): void {
    // @ts-expect-error lang exist on component
    this.lang = (this.$DataGrid.lang as Language) ?? 'fr';
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
        this.content = [];
        this.operator = EngineSubOperators.Contains;
      }
    },
    updateOutput(): void {
      const newValue: EngineRuleData<string[], SimpleRuleType.Array> = {
        type: SimpleRuleType.Array,
        value: this.content,
        operator: this.operator,
      };
      this.$emit('input', newValue);
    },
  },
});
