import Vue from 'vue';
import App from './App.vue';
import DataGridPlugin, {
  type DataGridOptions,
  DataGridField,
  getAllGridFieldsConfig,
  getAllGridRulesConfig,
  getFieldsForEntity,
  // getAllRegisteredEntities,
} from '../src/datagrid-bvue';
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

class Invoice {
  @DataGridField('String')
  id!: string;

  @DataGridField('String')
  firstName!: string;

  @DataGridField('String')
  lastName!: string;

  @DataGridField('String')
  email!: string;

  @DataGridField('Lang')
  language!: string;

  @DataGridField('Number')
  note!: number;

  @DataGridField('Money')
  total!: number;

  @DataGridField('InvoiceStatus')
  status!: string;

  @DataGridField('Date')
  createdAt!: Date;
}
class Student {
  @DataGridField('String')
  id!: string;

  @DataGridField('String', { name: 'Prenom' })
  firstName!: string | undefined;

  @DataGridField('Lang', { name: 'Language' })
  language!: string | undefined;

  @DataGridField('String', { name: 'Console' })
  console!: string | undefined;

  @DataGridField('Boolean', { name: 'Sophomore' })
  sophomore!: boolean | undefined;

  @DataGridField('Pointer', { linkedEntityClass: Invoice, name: 'Invoice' })
  invoice!: Invoice | undefined;
}

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

const all = getAllGridFieldsConfig();
console.log('all fields', all);
console.log('student fields', getFieldsForEntity(Student));
// const studentConfigs = getFieldsForEntity(Student);
// const invoiceConfigs = getFieldsForEntity(Invoice);
// console.log('studentConfigs', studentConfigs);
// console.log('testeurConfigs', invoiceConfigs);
// const gridRules = getAllGridRulesConfig();
// console.log('gridRules', gridRules);
Vue.use(DataGridPlugin, options);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  render: h => h(App),
});
