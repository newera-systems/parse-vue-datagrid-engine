<template>
  <div class="rule-filter-box">
    <b-button
      :id="id"
      :variant="isEmpty ? 'outline-secondary' : 'outline-info'"
      class="rule-button"
      pill
      size="sm"
    >
      <field-name-printer :definition="definition"></field-name-printer> :
      <strong class="">{{ status }}</strong>
      <BIconChevronDown class="mx-1" />
    </b-button>
    <BIconXLg v-show="!isEmpty" class="text-danger mx-1 scale" @click.prevent.stop="clearRule" />
    <b-popover
      :show="showPopup"
      :target="id"
      custom-class="big-custom-popover"
      placement="bottom"
      triggers="focus"
      variant="primary"
    >
      <template #title>
        <field-name-printer :definition="definition"></field-name-printer>
      </template>
      <div
        class="d-inline-flex align-items-start justify-content-center"
        @submit.prevent.stop="updateRule"
        @keydown.enter.prevent.stop="updateRule"
        @keydown.esc.prevent.stop="abort"
      >
        <component :is="definition.component" ref="ruleComponent" v-model="editValue" />
        <b-button class="ml-1" type="submit" variant="success" @click="updateRule">
          {{ $t('update') }}
        </b-button>
      </div>
    </b-popover>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import { RuleDefinitionWithChain } from '@/rule/RuleElementCreator';
import {
  EngineRuleData,
  EngineSimpleRule,
  RegistrationGender,
  SimpleRuleType,
} from '@/datagrid-bvue';
import { Money } from 'ts-money';
import {
  BButton,
  BForm,
  BIconChevronDown,
  BIconXLg,
  BPopover,
  BIconChevronRight,
} from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import filterTranslate from '../translation/filter';
import { Language } from '../fieldsData';
import FieldNamePrinter from '../components/FieldNamePrinter.vue';

export type RuleDataObject =
  | EngineRuleData<string, SimpleRuleType.Date>
  | EngineRuleData<string, SimpleRuleType.Day>
  | EngineRuleData<string, SimpleRuleType.String>
  | EngineRuleData<number, SimpleRuleType.Number>
  | EngineRuleData<Array<string>, SimpleRuleType.Array>
  | EngineRuleData<Money, SimpleRuleType.Money>
  | EngineRuleData<RegistrationGender, SimpleRuleType.String>
  | EngineRuleData<Language, SimpleRuleType.String>;

Vue.use(VueI18n);
export default defineComponent({
  name: 'RuleFilterInput',
  i18n: new VueI18n(filterTranslate),
  components: {
    FieldNamePrinter,
    BIconChevronDown,
    BIconXLg,
    BPopover,
    BButton,
    BForm,
    BIconChevronRight,
  },
  props: {
    definition: {
      type: Object as PropType<RuleDefinitionWithChain>,
      required: true,
    },
    value: {
      type: Object as PropType<EngineSimpleRule | null>,
      required: true,
    },
  },
  data() {
    return {
      editValue: null as unknown as RuleDataObject,
      id: `button-modify-${this.definition.identifier}-${Math.random().toString(36).substr(2, 9)}`,
      showPopup: false,
    };
  },
  computed: {
    status(): string {
      if (this.value?.value) {
        if (typeof this.value?.value.value !== 'undefined') {
          return `${this.getOperatorTranslation(this.value.value.operator)} "${
            this.value.value.value
          }"`;
        }
      }
      return this.$t('all').toString() ?? 'all';
    },
    isEmpty(): boolean {
      if (this.value?.value) {
        if (this.value.value.operator || this.value.value.value) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    clearRule() {
      this.$emit('input', {
        identifier: this.definition.identifier,
        value: null,
      });
    },
    updateRule() {
      this.showPopup = false;
      this.$emit('input', {
        identifier: this.definition.identifier,
        value: { ...this.editValue },
      } as EngineSimpleRule);
    },
    getTranslation(key: string, force = false): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n || force) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    },
    getOperatorTranslation(key: string): string {
      const t = this.getTranslation(`Operator.${key}`, true);
      if (t === `Operator.${key}`) {
        return key;
      }
      return t;
    },
    abort() {
      this.showPopup = false;
    },
  },
});
</script>

<style scoped>
.rule-filter-box {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 5px 0;
  padding: 0 0;
  border-radius: 0.5rem;
}

.popover.big-custom-popover {
  min-width: 450px;
  max-width: 700px !important;
}

.scale {
  transform: scale(1);
  transition: transform 0.3s;
}

.scale:hover {
  transform: scale(1.2);
}
</style>
