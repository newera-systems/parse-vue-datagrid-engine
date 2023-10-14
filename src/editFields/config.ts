import { type Component } from 'vue';
import { type FieldType } from '@/datagrid-bvue';
import StringViewer from './viewer/StringViewer.vue';
import NumberViewer from './viewer/NumberViewer.vue';
import DateViewer from './viewer/DateViewer.vue';
import StringEditor from './editor/StringEditor.vue';
import NumberEditor from './editor/NumberEditor.vue';
import DateEditor from './editor/DateEditor.vue';
import BooleanViewer from './viewer/BooleanViewer.vue';
import BooleanEditor from './editor/BooleanEditor.vue';
import MoneyViewer from './viewer/MoneyViewer.vue';
import MoneyEditor from './editor/MoneyEditor.vue';
import PercentViewer from './viewer/PercentViewer.vue';
import LangViewer from './viewer/LangViewer.vue';
import LangEditor from './editor/LangEditor.vue';
import PointerViewer from './viewer/PointerViewer.vue';
import ArrayViewer from './viewer/ArrayViewer.vue';

export const viewerComponentsList: Record<FieldType | string, Component> = {
  String: StringViewer,
  Number: NumberViewer,
  Boolean: BooleanViewer,
  Money: MoneyViewer,
  Percent: PercentViewer,
  Lang: LangViewer,
  Date: DateViewer,
  Pointer: PointerViewer,
  Array: ArrayViewer,
};

export const editorComponentsList: Record<FieldType | string, Component> = {
  String: StringEditor,
  Number: NumberEditor,
  Boolean: BooleanEditor,
  Money: MoneyEditor,
  Percent: NumberEditor,
  Lang: LangEditor,
  Date: DateEditor,
  Pointer: StringEditor,
  Array: StringEditor,
};
