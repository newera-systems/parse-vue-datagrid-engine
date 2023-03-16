<template>
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
          <tr v-for="(field, index) in fieldsUpdated" :key="field.identifier">
            <template v-if="field.config.canView && existingFields.includes(field.identifier)">
              <td>{{ index }}</td>
              <td>{{ getTranslation(field.name) }}</td>
              <td>
                <b-form-checkbox v-model="field.config.canRead" class="custom-control-secondary" />
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
          <tr v-for="field in fieldsUpdated.filter(f => f.config.canView)" :key="field.name">
            <td>{{ getTranslation(field.name) }}</td>
            <td>
              <b-form-checkbox v-model="field.config.canFilter" class="custom-control-secondary" />
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
              f => (f.config.canView || f.config.canSort) && existingFields.includes(f.identifier)
            )"
            :key="field.identifier"
          >
            <td>{{ getTranslation(field.name) }}</td>
            <td>
              <b-form-checkbox v-model="field.config.canSort" class="custom-control-secondary" />
            </td>
          </tr>
        </tbody>
      </table>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from "vue";
import draggable from "vuedraggable";
import { FieldDefinition } from "@/datagrid-bvue";
import { BFormCheckbox, BTab, BTabs } from "bootstrap-vue";
import VueI18n from "vue-i18n";
import tableTranslate from "@/translation/table";

Vue.use(VueI18n);
export default defineComponent({
  name: "ToolbarConfig",
  i18n: new VueI18n(tableTranslate),
  components: {
    draggable,
    BTabs,
    BTab,
    BFormCheckbox
  },
  props: {
    value: {
      type: Array as PropType<FieldDefinition[]>,
      required: true,
      default: () => []
    },
    existingFields: {
      type: Array as PropType<string[]>,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      fieldsUpdated: [] as FieldDefinition[]
    };
  },
  beforeMount() {
    this.fieldsUpdated = this.value;
  },
  methods: {
    update() {
      this.$emit("input", this.fieldsUpdated);
    },
    getTranslation(key: string) {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key);
      }
      return key;
    }
  },
  watch: {
    fieldsUpdated: {
      deep: true,
      handler() {
        this.update();
      }
    }
  }
})
</script>
