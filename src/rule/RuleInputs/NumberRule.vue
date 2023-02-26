<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input
        v-model.number="content"
        autocomplete="off"
        trim
        type="number"
      />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import {
  EngineRuleData,
  EngineSubOperators,
  NumberOperatorOptions,
  SimpleRuleType,
} from '@/index'
import fieldInput from '@/mixins/RuleFieldInput'
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue'

export default Vue.extend({
  mixins: [fieldInput],
  components: {
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    OperatorDropdown,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<number, SimpleRuleType.Number>>,
      default() {
        return {
          type: SimpleRuleType.Number,
          value: 0,
          operator: EngineSubOperators.EqualTo,
        }
      },
    },
  },
  data() {
    return {
      content: null as unknown as number,
      operator: EngineSubOperators.EqualTo,
      operatorList: NumberOperatorOptions,
    }
  },
  methods: {
    update() {
      try {
        if (this.value) {
          // @ts-expect-error function called via mixins
          this.content = this.value.value
          this.operator = this.value.operator
        }
      } catch (e) {
        // @ts-expect-error function called via mixins
        this.content = 0
        this.operator = EngineSubOperators.EqualTo
      }
    },
    updateOutput() {
      this.$emit('input', {
        type: 'number',
        value: this.content,
        operator: this.operator,
      } as EngineRuleData<number, SimpleRuleType.Number>)
    },
  },
})
</script>
