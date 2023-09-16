import Vue from 'vue';
import App from './App.vue';
import './models';
import DataGridPlugin, { type DataGridOptions, getAllGridRulesConfig} from '../src/datagrid-bvue';
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

const options: DataGridOptions = {
  lang: 'fr', // default Fr
  calendarTime: false, // default true
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
  ruleSchemas: getAllGridRulesConfig(),
};

Vue.use(DataGridPlugin, options);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
