<template>
  <b-modal
    :id="id"
    ref="ruleCreatorModal"
    :cancel-title="cancelText"
    :ok-title="okText"
    :size="modalSize"
    :title="modalTitle"
    :visible="value"
    centered
    modal-class="modal-primary"
    no-close-on-backdrop
    no-enforce-focus
    @cancel="onCancel"
    @hidden="onHidden"
    @ok="onOk"
    @shown="onShown"
  >
    <b-tabs pills>
      <b-tab active>
        <template #title>
          <BIconFilterSquareFill />
          <span class="ml-1">{{ $t('Rule.creation') }}</span>
        </template>
        <h6 class="card-title text-center my-1">{{ target }}</h6>
        <b-form @submit.prevent>
          <b-row>
            <b-col>
              <b-form-group :label="$t('Rule.name')" label-cols-md="4" label-for="modal-rule-name">
                <b-input-group
                  :class="validName ? 'is-valid' : 'is-invalid'"
                  class="input-group-merge"
                >
                  <b-input-group-prepend is-text>
                    <BIconFileRuledFill />
                  </b-input-group-prepend>
                  <b-form-input
                    id="modal-rule-name"
                    v-model="localValue.name"
                    :state="validName"
                    list="input-list"
                    placeholder="conditions-xyz"
                  />
                </b-input-group>
                <b-form-datalist id="rule-input-list" :options="nameOptions" />
                <b-form-invalid-feedback :state="validName">
                  {{ $t('Form.nameError', { min: 4 }) }}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
        <p v-if="invalidIdentifier.length !== 0">
          <b-alert show variant="danger">
            <b-icon-x-circle-fill class="mr-1" />
            {{ $t('Error.identifierNotValidForEntity') }} "{{ localValue.target }}",
            <br />
            {{
              $t('Error.identifierHelpMsg', {
                fields: invalidIdentifier.toString(),
              })
            }}
          </b-alert>
        </p>
        <query-builder v-else v-model="localValue.conditions" :config="builderConfig">
          <template #groupOperator="props">
            <group-operator-slot :group-operator="props" />
          </template>

          <template #groupControl="props">
            <group-ctrl-slot :group-ctrl="props" />
          </template>

          <template #rule="props">
            <rule-slot :ruleCtrl="props" :rules="builderConfig.rules" />
          </template>
        </query-builder>
      </b-tab>
      <b-tab>
        <template #title>
          <BIconLightningFill />
          <span class="ml-1">Action</span>
        </template>
        <div>
          <b-form class="mt-2" @submit.prevent>
            <b-row>
              <b-col>
                <b-form-group label="Action" label-cols-md="4" label-for="modal-rule-action-type">
                  <b-form-select
                    id="modal-rule-action-type"
                    v-model="localValue.action.type"
                    :options="actionOptions"
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col v-if="!useEditor">
                <b-form-group label="Value" label-cols-md="4" label-for="modal-rule-action-value">
                  <b-form-textarea
                    id="modal-rule-action-value"
                    v-model="localValue.action.value"
                    placeholder="Enter your action value"
                    rows="5"
                  />
                </b-form-group>
              </b-col>
              <b-col v-else>
                <slot
                  :onEditorInput="onEditorInput"
                  :value="localValue.action.value"
                  name="editor"
                />
              </b-col>
            </b-row>
          </b-form>
        </div>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import {
  BAlert,
  BCol,
  BForm,
  BFormDatalist,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BFormSelect,
  BFormTextarea,
  BIconFileRuledFill,
  BIconFilterSquareFill,
  BIconLightningFill,
  BIconXCircleFill,
  BInputGroup,
  BInputGroupPrepend,
  BModal,
  BRow,
  BTab,
  BTabs,
  BvModalEvent,
} from 'bootstrap-vue';
import {
  EngineRuleGroup,
  EngineSimpleRule,
  FilterRuleInterface,
  GroupOperator,
  IDataGridPrototype,
  RuleActions,
} from '@/index';
import QueryBuilder, {
  OperatorDefinition,
  QueryBuilderConfig,
  RuleDefinition,
} from 'query-builder-vue';
import { RuleEngineConfig } from '@/rule/RuleElementCreator';
import GroupOperatorSlot from '@components/builder/GroupOperatorSlot.vue';
import GroupCtrlSlot from '@components/builder/GroupCtrlSlot.vue';
import RuleSlot from '@components/builder/RuleSlot.vue';
import VueI18n from 'vue-i18n';
import modalTranslation from '@/translation/modal';

Vue.use(VueI18n);
export default defineComponent({
  name: 'RuleEngineCreatorModal',
  i18n: new VueI18n(modalTranslation),
  components: {
    QueryBuilder,
    GroupOperatorSlot,
    GroupCtrlSlot,
    RuleSlot,
    BAlert,
    BCol,
    BForm,
    BFormDatalist,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BFormSelect,
    BFormTextarea,
    BIconFileRuledFill,
    BIconFilterSquareFill,
    BIconLightningFill,
    BIconXCircleFill,
    BInputGroup,
    BInputGroupPrepend,
    BModal,
    BRow,
    BTab,
    BTabs,
  },
  props: {
    rule: {
      type: Object as PropType<FilterRuleInterface | null>,
      default: null,
    },
    target: {
      type: String,
      required: true,
    },
    modalTitle: {
      type: String,
      default: 'Add Rule',
    },
    modalSize: {
      type: String,
      default: 'lg',
    },
    okText: {
      type: String,
      default: 'Create',
    },
    cancelText: {
      type: String,
      default: 'Cancel',
    },
    value: {
      type: Boolean,
      default: false,
    },
    useEditor: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localValue: {
        name: 'Name',
        target: this.target,
        conditions: {
          operatorIdentifier: 'AND',
          children: [],
        },
        action: { type: RuleActions.LIST, value: '' },
      } as FilterRuleInterface,
      actionOptions: Object.values(RuleActions),
      builderConfig: {
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
      } as QueryBuilderConfig,
      groups: null,
      loading: false,
      targetError: false,
      id: `rule-creator-${Math.random().toString(36).substr(2, 9)}`,
      testQuil: '',
    };
  },
  computed: {
    modal(): BModal {
      return this.$refs.ruleCreatorModal as BModal;
    },
    nameOptions(): string[] {
      const firstPart = this.rule ? this.rule.name : this.localValue.name.trim();
      const secondPart = this.rule
        ? this.rule.conditions.children.length
        : this.localValue.conditions.children.length;
      const thirdPart = this.rule ? this.rule.action.type : this.localValue.action.type;
      return [
        `R-${firstPart}-G${secondPart}-A${thirdPart}`,
        `R-${firstPart}-G${secondPart}`,
        `R-${firstPart}-A${thirdPart}`,
        `R-${firstPart}`,
      ];
    },
    validName(): boolean {
      return this.localValue.name.length >= 4;
    },
    targetRules(): RuleDefinition[] {
      // @ts-expect-error DataGrid is  set by plugin config
      const engine: RuleEngineConfig = (this.$DataGrid as IDataGridPrototype).ruleEngineConfigs[
        this.localValue.target
      ];
      if (!engine) {
        console.error('[DataGrid Rule Modal] target rule config schema not found');
        this.targetError = true;
      } else {
        this.targetError = false;
        return engine.rules;
      }
      return [];
    },
    allowedIdentifier(): string[] {
      return this.targetRules.map(rule => rule.identifier);
    },
    presentIdentifier(): string[] {
      return this.getSimpleRules(this.localValue.conditions).map(rule => rule.identifier);
    },
    invalidIdentifier(): string[] {
      return this.presentIdentifier.filter(
        identifier => !this.allowedIdentifier.includes(identifier)
      );
    },
    valid(): boolean {
      return this.validName && !this.targetError && this.invalidIdentifier.length === 0;
    },
  },
  beforeMount() {
    if (this.rule) {
      this.localValue = { ...this.rule };
    }
    if (!this.target || !this.localValue.target) {
      this.targetError = true;
      throw new Error('[DataGrid] Modal creation Target is required');
    }
    this.builderConfig.rules = this.targetRules;
  },
  methods: {
    getSimpleRules(rule: EngineRuleGroup): Array<EngineSimpleRule> {
      const children: Array<EngineSimpleRule> = [];
      for (const child of rule.children) {
        if ('identifier' in child && child.identifier) {
          children.push(child);
        }
        if ('operatorIdentifier' in child && child.operatorIdentifier) {
          children.push(...this.getSimpleRules(child));
        }
      }
      return children;
    },
    onOk(bvModalEvt: BvModalEvent) {
      bvModalEvt.preventDefault();
      if (this.valid) {
        this.$emit('edited', this.localValue);
        this.$emit('input', false);
      }
    },
    onCancel() {
      this.$emit('cancel');
    },
    onHidden() {
      this.$emit('input', false);
    },
    onShown() {
      this.$emit('input', true);
    },
    toggleModal() {
      this.modal.toggle();
    },
    onEditorInput(value: string) {
      this.localValue.action.value = value;
    },
  },
  watch: {
    rule: {
      handler: function (val) {
        if (val) {
          this.localValue = { ...val };
        }
      },
      deep: true,
    },
    target(val) {
      this.localValue.target = val;
    },
  },
});
</script>
