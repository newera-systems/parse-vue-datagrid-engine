import Vue from 'vue';
import App from './App.vue';
import DataGridPlugin, { DataGridOptions, RuleCompTypes, StringViewer } from '../src';
import 'vue-select/dist/vue-select.css';

// custom components
import InvoiceStatusViewer from './customFields/InvoiceStatusViewer.vue';
import InvoiceStatusEditor from './customFields/InvoiceStatusEditor.vue';
import InvoiceStatusRule from './customRule/InvoiceStatusRule.vue';

// add css to show flags icons
import 'flag-icons/css/flag-icons.min.css';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css';

Vue.use(DataGridPlugin, {
  lang: 'fr', //default Fr
  calendarTime: false, //default true
  dateFormat: 'ddd DD-MM-YY HH:mm',
  // custom types for table edition and view
  customFieldTypes: [
    {
      name: 'InvoiceStatus',
      viewer: InvoiceStatusViewer,
      editor: InvoiceStatusEditor,
    },
  ],
  // special rules components
  customRulesComponents: {
    InvoiceStatus: InvoiceStatusRule,
  },
  // only elements inside the schema are available for filtering
  ruleSchemas: {
    Student: [
      { identifier: 'id', name: 'id', type: RuleCompTypes.String },
      { identifier: 'firstName', name: 'Prenom', type: RuleCompTypes.String },
      { identifier: 'language', name: 'Langue', type: RuleCompTypes.Lang },
    ],
    Invoice: [
      { identifier: 'id', name: 'id', type: RuleCompTypes.String },
      {
        identifier: 'firstName',
        name: 'firstName',
        type: RuleCompTypes.String,
      },
      { identifier: 'lastName', name: 'lastName', type: RuleCompTypes.String },
      { identifier: 'email', name: 'email', type: RuleCompTypes.String },
      { identifier: 'language', name: 'language', type: RuleCompTypes.Lang },
      { identifier: 'note', name: 'note', type: RuleCompTypes.Number },
      { identifier: 'total', name: 'total', type: RuleCompTypes.Money },
      { identifier: 'status', name: 'status', type: 'InvoiceStatus' },
      { identifier: 'createdAt', name: 'createdAt', type: RuleCompTypes.Date },
    ],
  },
} as DataGridOptions);

new Vue({
  el: '#app',
  render: h => h(App),
});
