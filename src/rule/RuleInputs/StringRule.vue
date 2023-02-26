<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-input v-model="content" autocomplete="off" trim />
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import {EngineSubOperators, StringOperatorOptions} from '@/index'
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
  data() {
    return {
      content: '',
      operator: EngineSubOperators.EqualTo,
      operatorList: StringOperatorOptions,
    }
  },
  methods: {},
})
</script>

<style lang="scss" scoped></style>
