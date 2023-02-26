import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue'
import {PropType} from 'vue'
import {
  EngineRuleData,
  EngineSubOperators,
  SimpleRuleType,
  StringOperatorOptions,
} from '@/index'

export default {
  components: {
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<string, SimpleRuleType.String>>,
      default(): {
        type: SimpleRuleType
        value: string
        operator: EngineSubOperators
      } {
        return {
          type: SimpleRuleType.String,
          value: '',
          operator: EngineSubOperators.EqualTo,
        }
      },
    },
  },
  data(): {
    content: string
    operator: EngineSubOperators
    operatorList: EngineSubOperators[]
  } {
    return {
      content: '',
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
    }
  },
  beforeMount(): void {
    // @ts-expect-error function exist on component
    this.update()
  },
  methods: {
    update(): void {
      try {
        // @ts-expect-error value exist on component
        if (this.value) {
          // @ts-expect-error content exist on component
          this.content = this.value.value
          // @ts-expect-error operator exist on component
          this.operator = this.value.operator
        }
      } catch (e) {
        // @ts-expect-error content exist on component
        this.content = ''
        // @ts-expect-error operator exist on component
        this.operator = EngineSubOperators.EqualTo
      }
    },
    updateOutput(): void {
      // @ts-expect-error emit exist on component
      this.$emit('input', {
        type: SimpleRuleType.String,
        // @ts-expect-error content exist on component
        value: this.content,
        // @ts-expect-error operator exist on component
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.String>)
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
}
