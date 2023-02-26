<template>
  <div class="rule-filter-box">
    <b-button
      :id="id"
      :variant="isEmpty ? 'outline-secondary' : 'outline-info'"
      class="rule-button"
      pill
      size="sm"
    >
      {{ getTranslation(definition.name) }}:
      <strong class="">{{ status }}</strong>
      <BIconChevronDown class="mx-1" />
      <BIconXLg
        v-show="!isEmpty"
        class="text-danger mx-1 scale"
        @click.prevent.stop="clearRule"
      />
    </b-button>
    <b-popover
      :show.sync="showPopup"
      :target="id"
      custom-class="big-custom-popover"
      triggers="focus"
      variant="primary"
      @keyup.enter.stop="updateRule"
    >
      <template #title>{{ getTranslation(definition.name) }}</template>
      <component :is="definition.component" v-model="editValue" />
      <b-button type="submit" variant="success" @click="updateRule">
        {{ $t('update') }}
      </b-button>
    </b-popover>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {RuleDefinition} from 'query-builder-vue'
import {
  EngineRuleData,
  EngineSimpleRule,
  RegistrationGender,
  RegistrationLanguage,
  SimpleRuleType,
} from '@/index'
import {Money} from 'ts-money'
import {BButton, BIconChevronDown, BIconXLg, BPopover} from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import filterTranslate from '@/translation/filter'

export type RuleDataObject =
  | EngineRuleData<string, SimpleRuleType.Date>
  | EngineRuleData<string, SimpleRuleType.Day>
  | EngineRuleData<string, SimpleRuleType.String>
  | EngineRuleData<number, SimpleRuleType.Number>
  | EngineRuleData<Array<string>, SimpleRuleType.Array>
  | EngineRuleData<Money, SimpleRuleType.Money>
  | EngineRuleData<RegistrationGender, SimpleRuleType.String>
  | EngineRuleData<RegistrationLanguage, SimpleRuleType.String>

Vue.use(VueI18n)
export default Vue.extend({
  name: 'RuleFilterInput',
  i18n: new VueI18n(filterTranslate),
  components: {
    BIconChevronDown,
    BIconXLg,
    BPopover,
    BButton,
  },
  props: {
    definition: {
      type: Object as PropType<RuleDefinition>,
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
      id: `button-modify-${this.definition.identifier}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      showPopup: false,
    }
  },
  computed: {
    status(): string {
      if (this.value?.value) {
        if (typeof this.value?.value.value !== 'undefined') {
          return `${this.getOperatorTranslation(this.value.value.operator)} "${
            this.value.value.value
          }"`
        }
      }
      return this.$t('all').toString() ?? 'all'
    },
    isEmpty(): boolean {
      if (this.value?.value) {
        if (this.value.value.operator || this.value.value.value) {
          return false
        }
      }
      return true
    },
  },
  methods: {
    clearRule() {
      this.$emit('input', {
        identifier: this.definition.identifier,
        value: null,
      })
    },
    updateRule() {
      this.showPopup = false
      this.$emit('input', {
        identifier: this.definition.identifier,
        value: {...this.editValue},
      } as EngineSimpleRule)
    },
    getTranslation(key: string, force = false): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n || force) {
        return this.$t(key).toString() ?? key
      }
      return key
    },
    getOperatorTranslation(key: string): string {
      const t = this.getTranslation(`Operator.${key}`, true)
      if (t === `Operator.${key}`) {
        return key
      }
      return t
    },
  },
})
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
