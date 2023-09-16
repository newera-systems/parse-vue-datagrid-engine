<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title font-weight-normal text-muted">DataGridTable Component</h2>
      <p class="card-text font-weight-light">
        This table show case only the DataGridTable component. The fields are hardcoded. <br />
        The data is provided by a function that simulate a server call, and the modification handler
        is also hardcoded.
      </p>
      <p class="card-text font-weight-light">
        It is possible to use the same component with a model, see the next example. This allow to
        have a dynamic table and provide a rule creator with a filter.
      </p>
      <DataGridTable
        :fields="fields"
        :items="provider"
        :modification-handler="modificationHandler"
        :pagination-entries="items.length"
        :show-filter.sync="showFilter"
        name="Players"
        responsive
        @goToEditor="goToItemEditor"
      >
        <template #action="{ index }"> slot {{ index }}</template>
      </DataGridTable>
      <button
        class="btn btn-secondary ml-4 btn-sm mb-1"
        @click="showFilterResultCode = !showFilterResultCode"
      >
        Show filter rule code created
      </button>
      <div v-show="showFilterResultCode">
        <h5 class="text-center text-info">Generated Rule Code</h5>
        <pre class="rule-code">
          <code> {{ generatedRuleCode }}</code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  DataGridModifiedCell,
  FieldDefinitionWithExtra,
  FieldType,
  ProviderContext,
} from '../../src/datagrid-bvue';

const defaultConfig = {
  canView: true,
  canRead: true,
  canEdit: false,
  canFilter: true,
  canSort: true,
};
export default defineComponent({
  name: 'TestTable',
  data() {
    return {
      fields: [
        {
          identifier: '#action',
          name: 'Actions',
          config: { ...defaultConfig },
          type: FieldType.String,
        },
        {
          identifier: 'firstName',
          name: 'First Name',
          config: { ...defaultConfig },
          type: FieldType.String,
        },
        {
          identifier: 'email',
          name: 'Email',
          config: { ...defaultConfig, canEdit: true },
          type: FieldType.String,
        },
        {
          identifier: 'console',
          name: 'console',
          config: { ...defaultConfig },
          type: FieldType.String,
        },
        {
          identifier: 'note',
          name: 'Note',
          config: { ...defaultConfig },
          type: FieldType.Percent,
        },
        {
          identifier: 'account',
          name: 'Facture',
          config: { ...defaultConfig },
          type: FieldType.Money,
        },
        {
          identifier: 'lang',
          name: 'Langue',
          config: { ...defaultConfig },
          type: FieldType.Lang,
        },
        {
          identifier: 'status',
          name: 'Status',
          config: { ...defaultConfig, canEdit: true },
          type: 'InvoiceStatus',
        },
        {
          identifier: 'isRegistered',
          name: 'Is registered',
          config: { ...defaultConfig },
          type: FieldType.Boolean,
        },
      ] as FieldDefinitionWithExtra[],
      items: [
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Mark',
          email: 'longmailthatcomhere@meta.com',
          note: 0.93,
          account: 120000,
          lang: '',
          status: 'awaiting_payment',
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Neymar',
          email: 'neymar@brazil.com',
          note: 0.76,
          account: null,
          lang: '',
          status: 'completed',
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Lebron',
          email: 'lebron@lakers.com',
          note: 0.89,
          account: 120000,
          lang: 'en',
          status: 'cancelled_refunded',
          isRegistered: false,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Bill',
          email: 'gates@msft.com',
          note: 0.98,
          account: 9800000000,
          lang: 'en',
          status: 'completed',
          isRegistered: true,
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Kylian',
          email: 'mbappe@psg.fr',
          note: -0.08,
          account: 89000,
          lang: 'fr',
          status: 'completed',
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Lionel',
          lastName: undefined,
          note: 1.0,
          account: 89000,
          lang: 'es',
          isRegistered: true,
          status: 'awaiting_payment',
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          firstName: 'Curry',
          lastName: null,
          email: 'steph@warriors.com',
          note: 0,
          lang: null,
          account: 67000,
          status: 'completed',
        },
      ],
      generatedRuleCode: null as unknown as string,
      showFilter: false,
      showFilterResultCode: false,
    };
  },
  computed: {},
  methods: {
    provider(ctx: ProviderContext, cb) {
      if (ctx.FilterRule) {
        this.generatedRuleCode = JSON.stringify(ctx.FilterRule, null, 2);
        // console.log('FilterRule', ctx.FilterRule)
      }
      const begin = (ctx.currentPage - 1) * ctx.perPage;
      const end = begin + ctx.perPage;
      cb(this.items.slice(begin, end));
    },
    modificationHandler(data: DataGridModifiedCell) {
      const { item, fieldKey, newValue } = data;
      console.log('modificationHandler', item, fieldKey, newValue);
      item[fieldKey] = newValue;
    },
    goToItemEditor(item) {
      const msg = 'open complete editor for item, ' + JSON.stringify(item, null, 2);
      alert(msg);
    },
  },
});
</script>

<style>
.rule-code {
  box-sizing: border-box;
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  padding: 10px;
  margin: 10px 0;
  max-height: 300px;
}

.rule-code code {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  white-space: pre-wrap;
}
</style>
