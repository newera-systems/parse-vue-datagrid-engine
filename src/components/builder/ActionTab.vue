<template>
  <b-form class="mt-2" @submit.prevent>
    <b-row>
      <b-col>
        <b-form-group label="Action" label-cols-md="4" label-for="modal-rule-action-type">
          <b-form-select
            id="modal-rule-action-type"
            v-model="localAction.type"
            :options="actionOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          v-if="!useExternalEditor"
          label="Value"
          label-cols-md="4"
          label-for="modal-rule-action-value"
        >
          <b-form-textarea
            id="modal-rule-action-value"
            v-model="localAction.value"
            placeholder="Enter your action value"
            rows="5"
          />
        </b-form-group>
        <template v-else>
          <slot :onEditorInput="onEditorInput" :value="localAction.value" name="editor" />
        </template>
      </b-col>
    </b-row>
  </b-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BCol, BForm, BFormGroup, BFormSelect, BFormTextarea, BRow } from 'bootstrap-vue';
import { RuleActions, RuleGroupAction } from '@/datagrid-bvue';

export default defineComponent({
  components: { BFormTextarea, BFormSelect, BFormGroup, BForm, BCol, BRow },
  props: {
    action: {
      type: Object as PropType<RuleGroupAction>,
      default: () => ({ type: RuleActions.NONE, value: '' }),
    },
    useExternalEditor: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:action'],
  model: {
    prop: 'action',
    event: 'update:action',
  },
  data() {
    return {
      localAction: this.action,
      actionOptions: Object.values(RuleActions),
    };
  },
  methods: {
    onEditorInput(value: string) {
      this.localAction.value = value;
    },
  },
  watch: {
    localValue: {
      handler() {
        this.$emit('update:action', this.localAction);
      },
      deep: true,
    },
    action: {
      handler() {
        this.localAction = this.action;
      },
      deep: true,
    },
  },
});
</script>

<style lang="scss" scoped></style>
