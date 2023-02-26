<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input
        v-model="moneyAmount"
        :state="state"
        autocomplete="off"
        placeholder="123.45"
        trim
      />
      <b-input-group-append>
        <b-dropdown :text="currency" right variant="outline-primary">
          <b-dropdown-item
            v-for="(cur, index) of currencyList"
            :key="`cur-${index}`"
            @click="setCurrency(index)"
          >
            {{ cur }}
          </b-dropdown-item>
        </b-dropdown>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {Money} from 'ts-money'
import {
  EngineRuleData,
  EngineSubOperators,
  MoneyOperatorOptions,
  SimpleRuleType,
} from '@/index'
import {
  BDropdown,
  BDropdownItem,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import fieldInput from '@/mixins/RuleFieldInput'
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue'

export default Vue.extend({
  mixins: [fieldInput],
  components: {
    OperatorDropdown,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BDropdown,
    BDropdownItem,
  },
  props: {
    value: {
      type: Object as PropType<EngineRuleData<Money, SimpleRuleType.Money>>,
      default: null,
    },
  },
  data() {
    return {
      operator: EngineSubOperators.EqualTo,
      operatorList: MoneyOperatorOptions,
      moneyAmount: '',
      currency: 'CAD',
      currencyList: ['CAD'],
    }
  },
  computed: {
    state(): boolean | null {
      if (this.moneyAmount.trim() === '') {
        return null
      }
      return Number.parseFloat(this.moneyAmount).toFixed(2) === this.moneyAmount
    },
  },
  methods: {
    setCurrency(index: number): void {
      this.currency = this.currencyList[index]
    },
    update() {
      try {
        if (!!this.value) {
          this.currency = this.value.value.currency
          this.moneyAmount = Money.fromInteger(
            this.value.value.amount,
            this.currency
          ).toString()
          this.operator = this.value.operator
        }
      } catch (e) {
        this.moneyAmount = '0.00'
        this.currency = 'CAD'
        this.operator = EngineSubOperators.EqualTo
      }
    },
    updateOutput() {
      if (this.state) {
        const newAmount = Money.fromDecimal(
          Number.parseFloat(this.moneyAmount),
          this.currency
        )
        this.$emit('input', {
          type: SimpleRuleType.Money,
          value: newAmount,
          operator: this.operator,
        } as EngineRuleData<Money, SimpleRuleType.Money>)
      }
    },
  },
  watch: {
    moneyAmount: {
      deep: true,
      handler: 'updateOutput',
    },
    currency: {
      deep: true,
      handler: 'updateOutput',
    },
  },
})
</script>
