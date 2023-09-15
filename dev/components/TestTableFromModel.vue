<template>
  <div class="card">
    <div class="card-body">
      <h2 class="card-title h3 font-weight-normal text-muted">
        DataGridTable Component From Model
      </h2>
      <p clss=" card-text font-weight-light">
        This table is using the same data as the previous one, but the fields are generated from the
        model.
      </p>
      <DataGridTable
        :fields="fields"
        :items="provider"
        :modification-handler="modificationHandler"
        :pagination-entries="items.length"
        :show-filter.sync="showFilter"
        name="Players v2"
        responsive
        target="Student"
        @goToEditor="goToItemEditor"
        show-action
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
  ProviderContext,
  getFieldsForEntityId,
  // eslint-disable-next-line no-unused-vars
  getFieldsForEntityLabel, // possible to use this one too
  FieldDefinitionWithExtra,
} from '../../src/datagrid-bvue';

export default defineComponent({
  data() {
    const fields = getFieldsForEntityId('Student') as FieldDefinitionWithExtra[];
    return {
      fields,
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
  methods: {
    provider(ctx: ProviderContext, cb) {
      if (ctx.FilterRule) {
        this.generatedRuleCode = JSON.stringify(ctx.FilterRule, null, 2);
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
