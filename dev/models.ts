import { DataGridField, DataGridModel } from '../src/datagrid-bvue';

@DataGridModel()
export class Discount {
  @DataGridField('String')
  id!: string;

  @DataGridField('String')
  name!: string;

  @DataGridField('Number')
  value!: number;
}

@DataGridModel()
export class Invoice {
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
  createdAt!: unknown;

  @DataGridField('Pointer', { linkedEntityClass: Discount })
  discount!: Discount | undefined;
}

@DataGridModel()
export class Student {
  /* className = 'Student'; // you can change the underlying class name for identification purposes by default is the classname */

  @DataGridField('String', { label: 'First Name', canFilter: true, canSort: true })
  firstName!: string;

  @DataGridField('String', { label: 'Email' })
  email!: string;

  @DataGridField('String')
  console!: string;

  @DataGridField('Percenta')
  note!: number;

  @DataGridField('Money')
  account!: number;

  @DataGridField('Lang')
  lang!: string;

  @DataGridField('InvoiceStatus', { canEdit: true })
  status!: string;

  @DataGridField('Boolean')
  isRegistered!: boolean;

  @DataGridField('Pointer', { linkedEntityClass: Invoice })
  invoice!: Invoice | undefined;
}
