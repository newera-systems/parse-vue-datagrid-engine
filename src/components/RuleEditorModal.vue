<template>
  <b-modal
    :id="id"
    ref="ruleCreatorModal"
    :cancel-title="cancelText"
    :ok-title="okText"
    :size="size"
    :title="title"
    :visible="visible"
    centered
    modal-class="modal-primary"
    no-close-on-backdrop
    no-enforce-focus
    @cancel="onCancel"
    @hidden="onHidden"
    @ok="onOk"
    @shown="onShown"
  >
    <b-alert :show="error" variant="danger">
      <b-icon-x-circle-fill class="mr-1" />
      {{ errorMessage }}
    </b-alert>
    <b-tabs pills>
      <b-tab active>
        <template #title>
          <BIconFilterSquareFill />
          <span class="ml-1">{{ $t('Rule.creation') }}</span>
        </template>
        <h6 class="card-title text-center my-1">{{ target }}</h6>
        <b-form-group :label="$t('Rule.name')" label-cols-md="4" label-for="modal-rule-name">
          <b-input-group :class="validName ? 'is-valid' : 'is-invalid'" class="input-group-merge">
            <b-input-group-prepend is-text>
              <BIconFileRuledFill />
            </b-input-group-prepend>
            <b-form-input
              id="modal-rule-name"
              v-model="localRule.name"
              :state="validName"
              list="input-list"
              placeholder="conditions-xyz"
            />
          </b-input-group>
          <b-form-invalid-feedback :state="validName">
            {{ $t('Form.nameError', { min: 4 }) }}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-alert :show="invalidIdentifier.length !== 0" variant="danger">
          <b-icon-x-circle-fill class="mr-1" />
          {{ $t('Error.identifierNotValidForEntity') }} "{{ target }}",
          <br />
          {{
            $t('Error.identifierHelpMsg', {
              fields: invalidIdentifier.toString(),
            })
          }}
        </b-alert>
        <QueryBuilderSection v-model="localRule.conditions" :config="builderConfig" />
      </b-tab>
      <b-tab>
        <template #title>
          <BIconLightningFill />
          <span class="ml-1">Action</span>
        </template>
        <ActionTab v-model="localRule.action" :use-external-editor="useEditor">
          <template v-slot:editor="{ value, onEditorInput }">
            <slot :onEditorInput="onEditorInput" :value="value" name="editor" />
          </template>
        </ActionTab>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  EngineRuleGroup,
  EngineSimpleRule,
  FilterRuleInterface,
  GroupOperator,
  IDataGridPrototype,
  RuleActions,
} from '@/datagrid-bvue';
import {
  BAlert,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BIconFileRuledFill,
  BIconFilterSquareFill,
  BIconLightningFill,
  BIconXCircleFill,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BTab,
  BTabs,
  BvModalEvent,
} from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import modalTranslation from '@/translation/modal';
import { OperatorDefinition, QueryBuilderConfig, RuleDefinition } from 'query-builder-vue';
import { RuleEngineConfig } from '@/rule/RuleElementCreator';
import ActionTab from '@components/builder/ActionTab.vue';
import QueryBuilderSection from '@components/builder/QueryBuilderSection.vue';

export default defineComponent({
  name: 'RuleEditorModal',
  i18n: new VueI18n(modalTranslation),
  components: {
    BInputGroupPrepend,
    BFormInput,
    BFormGroup,
    BIconFileRuledFill,
    BInputGroup,
    BFormInvalidFeedback,
    QueryBuilderSection,
    ActionTab,
    BIconFilterSquareFill,
    BIconLightningFill,
    BTabs,
    BTab,
    BIconXCircleFill,
    BAlert,
    BModal,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    rule: {
      type: Object as PropType<FilterRuleInterface | null>,
      default: null,
    },
    target: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<'sm' | 'lg' | 'xl'>,
      default: 'lg',
    },
    title: {
      type: String,
      default: 'Filter Rule Editor',
    },
    okText: {
      type: String,
      default: 'Create',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    useEditor: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:visible', 'update:rule'],
  model: {
    prop: 'visible',
    event: 'update:visible',
  },
  data: function () {
    const random = Math.random().toString(36).substr(2, 9);
    const builderConfig: QueryBuilderConfig = {
      operators: [
        {
          identifier: GroupOperator.AND,
          name: 'AND',
        },
        {
          identifier: GroupOperator.OR,
          name: 'OR',
        },
      ] as OperatorDefinition[],
      rules: [],
      colors: [
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
      ],
      dragging: {
        animation: 250,
      },
    };
    const initRule: FilterRuleInterface = {
      name: '',
      target: this.target,
      conditions: {
        operatorIdentifier: GroupOperator.AND,
        children: [],
      },
      action: { type: RuleActions.LIST, value: '' },
    };
    return {
      id: `rule-creator-${random}`,
      localRule: this.rule ?? initRule,
      builderConfig,
    };
  },
  computed: {
    modal(): BModal {
      return this.$refs.ruleCreatorModal as BModal;
    },
    engine(): RuleEngineConfig | null {
      // @ts-expect-error DataGrid is  set by plugin config
      const engine: RuleEngineConfig = (this.$DataGrid as IDataGridPrototype).ruleEngineConfigs[
        this.target
      ];
      if (!engine) {
        return null;
      }
      return engine;
    },
    error(): boolean {
      if (!this.target) {
        return true;
      }
      if (!this.engine) {
        return true;
      }
      if (this.rule) {
        if (!this.rule.target) {
          return true;
        } else return this.rule.target !== this.target;
      }
      return false;
    },
    errorMessage(): string {
      if (!this.target) {
        return '[DataGrid] Modal Rule Editor Target is required';
      }
      if (!this.engine) {
        return `[DataGrid] Modal Rule Editor Target is not found. Target: ${this.target}`;
      }
      if (this.rule) {
        if (!this.rule.target) {
          return '[DataGrid] Modal Rule Editor Target is required on rule object';
        } else if (this.rule.target !== this.target) {
          return `[DataGrid] Modal Rule Editor Target is not equal to the target prop. Target: ${this.rule.target} Prop: ${this.target}`;
        }
      }
      return '';
    },
    rulesDefinitions(): RuleDefinition[] {
      return this.engine?.rules ?? [];
    },
    allowedIdentifier(): string[] {
      return this.rulesDefinitions.map(rule => rule.identifier);
    },
    presentIdentifier(): string[] {
      if (!this.localRule?.conditions) return [];
      return this.getAllInSimpleRules(this.localRule.conditions).map(rule => rule.identifier);
    },
    invalidIdentifier(): string[] {
      return this.presentIdentifier.filter(
        identifier => !this.allowedIdentifier.includes(identifier)
      );
    },
    validName(): boolean {
      const ruleName = this.localRule?.name ?? '';
      return ruleName.length > 4;
    },
    valid(): boolean {
      return this.validName && !this.error && this.invalidIdentifier.length === 0;
    },
  },
  beforeMount() {},
  methods: {
    setLocalRule(newValue: FilterRuleInterface | null) {
      if (!newValue) {
        this.localRule = {
          name: 'Name',
          target: this.target,
          conditions: {
            operatorIdentifier: GroupOperator.AND,
            children: [],
          },
          action: { type: RuleActions.LIST, value: '' },
        };
      } else {
        this.localRule = { ...newValue };
      }
    },
    onCancel() {
      this.$emit('update:visible', false);
    },
    onHidden() {
      this.$emit('update:visible', false);
    },
    onOk(bvModalEvt: BvModalEvent) {
      bvModalEvt.preventDefault();
      if (this.valid) {
        this.$emit('update:rule', this.localRule);
        this.$emit('update:visible', false);
      }
    },
    onShown() {
      this.$emit('update:visible', true);
    },
    toggleModal() {
      this.modal?.toggle();
    },
    getAllInSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule> {
      const children: Array<EngineSimpleRule> = [];
      for (const child of rule.children) {
        if ('identifier' in child && child.identifier) {
          children.push(child);
        }
        if ('operatorIdentifier' in child && child.operatorIdentifier) {
          children.push(...this.getAllInSimpleRules(child));
        }
      }
      return children;
    },
  },
  watch: {
    rule: {
      handler(newValue) {
        this.setLocalRule(newValue);
      },
      immediate: true,
    },
    target() {},
    rulesDefinitions: {
      handler(val) {
        this.builderConfig.rules = val;
      },
      immediate: true,
      deep: true,
    },
    visible: {
      handler(newValue) {
        if (newValue) {
          this.setLocalRule(this.rule);
        }
      },
    },
  },
});
</script>

<style lang="scss" scoped></style>
