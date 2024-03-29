<template>
  <section>
    <h3 class="mb-1 p-2 d-flex align-items-center gap-2">
      <span class="text-primary text-capitalize mr-2"> {{ name }} </span>
      <BIconUiChecks :title="$t('grid')" class="mr-2" height="16" variant="secondary" width="16" />
      <BIconCircleFill v-if="localBusy" animation="throb" title="loading" variant="primary" />
    </h3>
    <div>
      <div v-if="context.withFilter && hasARuleFilterSchema">
        <RuleEngineFilter
          v-model="context.FilterRule"
          :field-list="filterableFields"
          :operator="GroupOperator.AND"
          :target="target"
          :visible-name="name"
        />
      </div>
      <b-button-toolbar class="mb-2 mx-2" justify>
        <b-input-group>
          <b-form-select
            v-model="context.perPage"
            :options="perPageOptions"
            variant="outline-primary"
          />
        </b-input-group>
        <b-button-group>
          <b-button
            id="ButtonDataGridFilter"
            :disabled="!hasARuleFilterSchema"
            :pressed="context.withFilter"
            :title="$t('filter')"
            :variant="context.withFilter ? `primary` : `outline-primary`"
            @click="_updateShowFilter(!context.withFilter)"
          >
            <BIconFunnel :class="hasARuleInFilter ? 'text-danger' : ''" width="24" />
          </b-button>
          <b-button id="RefreshButtonDataGrid" variant="outline-primary" @click="_updatedContext">
            <BIconArrowClockwise width="24" />
          </b-button>
          <ToolbarConfig v-model="localFieldsDef" :existing-fields="existingFields" />
        </b-button-group>
      </b-button-toolbar>
      <b-table
        ref="dataGridTable"
        :bordered="bordered"
        :borderless="borderless"
        :busy.sync="localBusy"
        :dark="dark"
        :empty-filtered-text="$t('DataGrid.noDataAfterFiltering')"
        :empty-text="$t('DataGrid.noData')"
        :fields="columns"
        :fixed="fixed"
        :footClone="footClone"
        :headVariant="headVariant"
        :hover="hover"
        :items="paginatedItems"
        :noCollapse="noCollapse"
        :outlined="outlined"
        :responsive="responsive"
        :small="small"
        :sort-by="context.sortBy"
        :sort-desc="context.sortDesc"
        :striped="striped"
        primary-key="id"
        show-empty
      >
        <template #cell()="data">
          <template v-if="data.field.key === '#action'">
            <slot :index="data.index" :item="paginatedItems[data.index]" name="action" />
          </template>
          <template v-else-if="data.field.key === 'id'">
            <b-button
              class="btn-icon"
              size="sm"
              variant="flat-info"
              @click="goToItemEditor(data.item)"
            >
              <BIconPencilSquare style="color: #7952b3" />
            </b-button>
          </template>
          <EditableCells
            v-else
            :editor-config="editorConfig"
            :field="_getFieldDefinition(data.field.key)"
            :item="data.item"
            :raw-value="data.item[data.field.key]"
            :viewer-config="viewerConfig"
            @cellModified="updateCell"
          />
        </template>
      </b-table>
      <DataGridPaginator
        v-model="context.currentPage"
        :entries="localTotalEntries"
        :per-page.sync="context.perPage"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { Component, PropType } from 'vue';
import {
  BButton,
  BButtonGroup,
  BButtonToolbar,
  BFormSelect,
  BIconArrowClockwise,
  BIconCircleFill,
  BIconFunnel,
  BIconPencilSquare,
  BIconUiChecks,
  BInputGroup,
  BTable,
  BvTableFieldArray,
} from 'bootstrap-vue';
import ToolbarConfig from '../components/ToolbarConfig.vue';
import {
  DataGridModifiedCell,
  FieldDefinition,
  FieldType,
  FilterRuleInterface,
  GridEntityItem,
  GroupOperator,
  ModificationHandler,
  ProviderContext,
} from '../datagrid-bvue';
import provider from '../mixins/provider';
import paginatorMixin from '../mixins/paginator';
import EditableCells from '../components/EditableCells.vue';
import fieldDetector from '../mixins/fieldDetector';
import tableStyling from '../mixins/tableStyling';
import { editorComponentsList, viewerComponentsList } from '../editFields/config';
import RuleEngineFilter from '../components/RuleEngineFilter.vue';
import tableTranslate from '../translation/table';
import VueI18n from 'vue-i18n';

function defaultModificationHandler(data: DataGridModifiedCell) {
  const { item, fieldKey, newValue } = data;
  item[fieldKey] = newValue;
}

Vue.use(VueI18n);
export default Vue.extend({
  name: 'DataGridTable',
  i18n: new VueI18n(tableTranslate),
  mixins: [provider, paginatorMixin, fieldDetector, tableStyling],
  components: {
    RuleEngineFilter,
    EditableCells,
    BTable,
    BButtonToolbar,
    BInputGroup,
    BFormSelect,
    BButtonGroup,
    BButton,
    BIconPencilSquare,
    BIconCircleFill,
    BIconUiChecks,
    BIconFunnel,
    BIconArrowClockwise,
    ToolbarConfig,
  },
  props: {
    name: {
      type: String,
      required: true,
      default: () => 'Entity name',
    },
    target: {
      type: String,
      default: () => '',
    },
    modificationHandler: {
      type: Function as PropType<ModificationHandler>,
    },
    viewerConfig: {
      type: Object as PropType<Record<FieldType, Component>>,
      default: () => viewerComponentsList,
    },
    editorConfig: {
      type: Object as PropType<Record<FieldType, Component>>,
      default: () => editorComponentsList,
    },
    showFilter: {
      type: Boolean,
      default: () => false,
    },
    showAction: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const context: ProviderContext = {
      currentPage: 1,
      perPage: 25,
      withFilter: this.showFilter,
      sortBy: null as unknown as string,
      sortDesc: true,
      FilterRule: null as unknown as FilterRuleInterface,
    };
    return {
      localModificationHandler: defaultModificationHandler as ModificationHandler,
      context,
    };
  },
  mounted() {
    this._modificationHandlerUpdate();
  },
  computed: {
    GroupOperator() {
      return GroupOperator;
    },
    columns(): BvTableFieldArray {
      return this.localFieldsDef
        .filter(f => {
          if (f.identifier === 'id' || f.identifier === '#action') {
            return true;
          }
          return f.config.canView && f.config.canRead && this.existingFields.includes(f.identifier);
        })
        .map(f => {
          const tableSortable = f.config.canSort && f.type !== 'Pointer' && f.type !== 'Array';
          return {
            key: f.identifier,
            label: f.identifier === 'id' ? '#' : this.getTranslation(f.name),
            sortable: tableSortable,
          };
        });
    },
    filterableFields(): string[] {
      return this.localFieldsDef
        .filter(f => {
          if (f.identifier === 'id' || f.identifier === '#action') {
            return false;
          }
          return f.config.canView && f.config.canFilter;
        })
        .map(f => f.identifier);
    },
    hasARuleFilterSchema(): boolean {
      try {
        if (this.target) {
          const availableRuleTargets = Object.keys(
            // @ts-expect-error DataGrid defined when using plugin
            this.$DataGrid.ruleEngineConfigs
          );
          return availableRuleTargets.includes(this.target);
        }
      } catch (e) {
        console.error(e);
      }
      return false;
    },
    hasARuleInFilter(): boolean {
      if (!this.context.FilterRule) {
        return false;
      }
      return this.context.FilterRule.conditions.children.length > 0;
    },
  },
  methods: {
    goToItemEditor(item: GridEntityItem) {
      this.$emit('goToEditor', item);
    },
    getTranslation(key: string): string {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key).toString() ?? key;
      }
      return key;
    },
    _getFieldDefinition(fieldId: string): FieldDefinition {
      const index = this.localFieldsDef.findIndex(field => field.identifier === fieldId);
      if (index >= 0) {
        return this.localFieldsDef[index];
      }
      return {
        identifier: fieldId,
        name: fieldId,
        config: {
          canView: true,
          canEdit: false,
          canFilter: false,
          canRead: false,
          canSort: false,
        },
        type: FieldType.String,
      };
    },
    _defaultModificationHandler(data: DataGridModifiedCell) {
      const { item, fieldKey, newValue } = data;
      item[fieldKey] = newValue;
    },
    _modificationHandlerUpdate() {
      if (typeof this.modificationHandler === 'function') {
        if (this.modificationHandler.length >= 1) {
          this.localModificationHandler = this.modificationHandler;
          return;
        }
        console.warn(
          '[DataGrid warn] ModificationHandler need one parameter at least. (data) => void style'
        );
      }
      this.localModificationHandler = this._defaultModificationHandler;
    },
    // when the provider is a function, we need to call it to update the data
    _updatedContext() {
      if (typeof this.items === 'function') {
        this._providerUpdate();
      }
    },
    updateCell(modification: DataGridModifiedCell) {
      const p = this.localModificationHandler(modification);
      if (p) {
        if (typeof p.then === 'function') {
          (p as Promise<void>).then(() => {
            this.$nextTick(() => {
              this._providerUpdate();
            });
          });
        }
      } else {
        this.$nextTick(() => {
          this._providerUpdate();
        });
      }
      this.$emit('modified');
    },
    _updateShowFilter(showFilter: boolean) {
      this.context.withFilter = showFilter;
      this.$emit('update:showFilter', showFilter);
    },
  },
  watch: {
    modificationHandler: {
      deep: true,
      handler() {
        this.$nextTick(this._modificationHandlerUpdate);
      },
    },
    context: {
      deep: true,
      handler() {
        this._updatedContext();
      },
    },
  },
});
</script>
