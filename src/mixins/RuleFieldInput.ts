import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';
import { defineComponent, PropType } from 'vue';
import { EngineRuleData, EngineSubOperators, SimpleRuleType, StringOperatorOptions } from '@/index';

export default defineComponent({
  components: {
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<any, SimpleRuleType>>,
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
      content: '' as string,
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
    };
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
        this.content = '';
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    updateOutput(): void {
      this.$emit('input', {
        type: SimpleRuleType.String,
        value: this.content,
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.String>);
    },
  },
  watch: {
    value: {
      deep: true,
      handler: 'update',
    },
    operator: {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOutput();
        }
      },
    },
    content: {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue !== oldValue) {
          this.updateOutput();
        }
      },
    },
  },
});
