<template>
  <b-form-group>
    <b-input-group>
      <b-input-group-prepend>
        <OperatorDropdown v-model="operator" :options="operatorList" />
      </b-input-group-prepend>
      <b-form-select
        v-if="DateType === 'day'"
        v-model="dateContent"
        :options="weekdays"
        :text-field="lang"
      />
      <b-form-datepicker v-else v-model="dateContent" :locale="lang" close-button today-button />
      <b-input-group-append>
        <b-dropdown :text="DateType" right variant="outline-primary">
          <b-dropdown-item
            v-for="(cur, index) of typeList"
            :key="`cur-${index}`"
            @click="setType(index)"
          >
            {{ cur }}
          </b-dropdown-item>
        </b-dropdown>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  BDropdown,
  BDropdownItem,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
} from 'bootstrap-vue';
import {
  DateOperatorOptions,
  EngineRuleData,
  EngineSubOperators,
  RegistrationLanguage,
  SimpleRuleType,
} from '@/index';
import OperatorDropdown from '@/rule/RuleInputs/OperatorDropdown.vue';

export default defineComponent({
  name: 'DateRule',
  components: {
    OperatorDropdown,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BFormSelect,
    BFormDatepicker,
    BDropdown,
    BDropdownItem,
  },
  props: {
    value: {
      type: Object as PropType<
        EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day>
      >,
      default: () =>
        ({
          type: SimpleRuleType.Date,
          value: null,
          operator: EngineSubOperators.EqualTo,
        } as unknown as EngineRuleData<string, SimpleRuleType.Date>),
    },
  },
  data() {
    return {
      dateContent: '',
      lang: RegistrationLanguage.FR,
      DateType: SimpleRuleType.Date,
      typeList: [SimpleRuleType.Date, SimpleRuleType.Day],
      config: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
      },
      weekdays: [
        { value: 1, en: 'Monday', fr: 'Lundi' },
        { value: 2, en: 'Tuesday', fr: 'Mardi' },
        { value: 3, en: 'Wednesday', fr: 'Mercredi' },
        { value: 4, en: 'Thursday', fr: 'Jeudi' },
        { value: 5, en: 'Friday', fr: 'Vendredi' },
        { value: 6, en: 'Saturday', fr: 'Samedi' },
        { value: 0, en: 'Sunday', fr: 'Dimanche' },
      ],
      operator: EngineSubOperators.EqualTo,
      operatorList: DateOperatorOptions,
    };
  },
  created() {
    // @ts-expect-error DataGrid is  set by plugin config
    this.lang = (this.$DataGrid.lang as RegistrationLanguage) ?? RegistrationLanguage.FR;
  },
  mounted() {
    this.update();
  },
  methods: {
    async update() {
      try {
        if (this.value) {
          this.dateContent = this.value.value ?? '';
          this.DateType = this.value.type;
          this.operator = this.value.operator;
        }
      } catch (e) {
        this.dateContent = '';
        this.DateType = SimpleRuleType.Date;
        this.operator = EngineSubOperators.EqualTo;
      }
    },
    setType(index: number) {
      this.dateContent = '';
      this.DateType = this.typeList[index];
    },
    updateOutput() {
      this.$emit('input', {
        type: this.DateType,
        value: this.dateContent.toString().trim(),
        operator: this.operator,
      } as EngineRuleData<string, SimpleRuleType.Date> | EngineRuleData<string, SimpleRuleType.Day>);
    },
  },
  watch: {
    value: {
      deep: true,
      handler: 'update',
    },
    operator() {
      this.updateOutput();
    },
    dateContent() {
      this.updateOutput();
    },
    DateType() {
      this.updateOutput();
    },
  },
});
</script>
