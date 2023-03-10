import { Component } from 'vue';
import { FieldType } from '@/index';
import StringViewer from '@/editFields/viewer/StringViewer.vue';
import NumberViewer from '@/editFields/viewer/NumberViewer.vue';
import DateViewer from '@/editFields/viewer/DateViewer.vue';
import StringEditor from '@/editFields/editor/StringEditor.vue';
import NumberEditor from '@/editFields/editor/NumberEditor.vue';
import DateEditor from '@/editFields/editor/DateEditor.vue';
import BooleanViewer from '@/editFields/viewer/BooleanViewer.vue';
import BooleanEditor from '@/editFields/editor/BooleanEditor.vue';
import MoneyViewer from '@/editFields/viewer/MoneyViewer.vue';
import MoneyEditor from '@/editFields/editor/MoneyEditor.vue';
import PercentViewer from '@/editFields/viewer/PercentViewer.vue';
import LangViewer from '@/editFields/viewer/LangViewer.vue';
import LangEditor from '@/editFields/editor/LangEditor.vue';
import PointerViewer from '@/editFields/viewer/PointerViewer.vue';
import ArrayViewer from '@/editFields/viewer/ArrayViewer.vue';

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
