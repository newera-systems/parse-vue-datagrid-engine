<template>
  <div>
    <DataGridTable
      :fields="fields"
      :items="provider"
      :modification-handler="modificationHandler"
      name="school"
      responsive
      target="Student"
      :pagination-entries="items.length"
      @goToEditor="goToItemEditor"
    >
      <template #action="{ item, index }"> slot {{ index }} </template>
    </DataGridTable>

    <div>
      <h4>Generated rule code</h4>
      <pre class="rule-code">
        <code>
            {{ generatedRuleCode }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from 'vue';
import {
  DataGridModifiedCell,
  FieldDefinitionWithExtra,
  FieldType,
  ProviderContext,
} from '../../src';

const defaultConfig = {
  canView: true,
  canRead: true,
  canEdit: false,
  canFilter: true,
  canSort: true,
};
export default defineComponent({
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
          name: 'langue',
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
          account: 877090,
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
          email: 'lionnel@psg.fr',
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
          account: 67000,
          status: 'completed',
        },
      ],
      generatedRuleCode: null as unknown as string,
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
      const { item, field_key, newValue } = data;
      console.log('modificationHandler', item, field_key, newValue);
      item[field_key] = newValue;
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
