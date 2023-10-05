<template>
  <b-button :id="id" variant="outline-primary">
    <BIconGearWideConnected width="24" />
    <b-popover :show.sync="show" custom-class="table-config-popover" :target="id" triggers="focus">
      <template #title>{{ $t('DataGrid.configuration') }}</template>
      <b-tabs>
        <b-tab :title="$t('visibilityAndOrder')">
          <table class="table">
            <thead>
              <tr>
                <th>{{ $t('order') }}</th>
                <th>{{ $t('id') }}</th>
                <th>{{ $t('visible') }}</th>
              </tr>
            </thead>
            <draggable v-model="fieldsUpdated" class="cursor-move" tag="tbody">
              <tr v-for="field in fieldsUpdated" :key="field.identifier" class="draggable-row">
                <template v-if="field.config.canView && existingFields.includes(field.identifier)">
                  <td><BIconGripVertical /></td>
                  <td><field-name-printer :definition="field"></field-name-printer></td>
                  <td>
                    <b-form-checkbox
                      v-model="field.config.canRead"
                      class="custom-control-secondary"
                    />
                  </td>
                </template>
              </tr>
            </draggable>
          </table>
        </b-tab>
        <b-tab :title="$t('filters')">
          <table class="table">
            <thead>
              <tr>
                <th>{{ $t('id') }}</th>
                <th>{{ $t('filter') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="field in fieldsUpdated.filter(f => f.config.canView)"
                :key="field.identifier"
              >
                <td><field-name-printer :definition="field"></field-name-printer></td>
                <td>
                  <b-form-checkbox
                    v-model="field.config.canFilter"
                    class="custom-control-secondary"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
        <b-tab :title="$t('sorting')">
          <table class="table striped small">
            <thead>
              <tr>
                <th>{{ $t('id') }}</th>
                <th>{{ $t('visible') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="field in fieldsUpdated.filter(
                  f =>
                    (f.config.canView || f.config.canSort) && existingFields.includes(f.identifier)
                )"
                :key="field.identifier"
              >
                <td><field-name-printer :definition="field"></field-name-printer></td>
                <td>
                  <b-form-checkbox
                    v-model="field.config.canSort"
                    class="custom-control-secondary"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </b-tab>
      </b-tabs>
    </b-popover>
  </b-button>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import draggable from 'vuedraggable';
import { FieldDefinition } from '@/datagrid-bvue';
import {
  BFormCheckbox,
  BTab,
  BTabs,
  BIconGripVertical,
  BPopover,
  BIconGearWideConnected,
  BButton,
} from 'bootstrap-vue';
import VueI18n from 'vue-i18n';
import tableTranslate from '@/translation/table';
import _ from 'lodash';
import FieldNamePrinter from '@components/FieldNamePrinter.vue';

Vue.use(VueI18n);
export default defineComponent({
  name: 'ToolbarConfig',
  i18n: new VueI18n(tableTranslate),
  components: {
    FieldNamePrinter,
    BButton,
    BIconGearWideConnected,
    BPopover,
    draggable,
    BIconGripVertical,
    BTabs,
    BTab,
    BFormCheckbox,
  },
  props: {
    value: {
      type: Array as PropType<FieldDefinition[]>,
      required: true,
      default: () => [],
    },
    existingFields: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => [],
    },
  },
  data() {
    const randomId = Math.random().toString(36).substr(2, 9);
    return {
      id: `table-config-${randomId}`,
      show: false,
      fieldsUpdated: [...this.value],
    };
  },
  methods: {
    update() {
      this.$emit('input', this.fieldsUpdated);
    },
  },
  watch: {
    fieldsUpdated: {
      deep: true,
      handler() {
        this.update();
      },
    },
    value: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!_.isEqual(newValue, this.fieldsUpdated)) {
          this.fieldsUpdated = [...newValue];
        }
      },
    },
  },
});
</script>

<style scoped>
.popover.table-config-popover {
  min-width: 450px;
  max-width: 700px !important;
}
.draggable-row:hover {
  cursor: grab;
}
</style>
