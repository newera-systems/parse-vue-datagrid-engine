<template>
  <div :class="modified ? 'bg-info rounded px-2' : 'px-2'">
    <div
      v-if="!editMode"
      :class="`d-flex align-items-center ${writable ? 'writable' : 'locked'}`"
      :role="writable ? 'button' : 'cell'"
      @dblclick="_startEdition"
    >
      <component
        :is="viewerComponent"
        :field="field"
        :item="item"
        :raw-value="rawValue"
        :writable="writable"
      />
    </div>
    <div v-else class="">
      <component
        :is="editorComponent"
        :field="field"
        :item="item"
        :raw-value="rawValue"
        @editionCanceled="editMode = !editMode"
        @editionSave="_prepareCellModification"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, defineComponent, PropType } from 'vue';
import { BButton, BIconLock, BIconPen, BIconPencilSquare, BIconX } from 'bootstrap-vue';
import {
  DataGridModifiedCell,
  FieldDefinitionWithExtra,
  FieldType,
  GridEntityItem,
} from '@/datagrid-bvue';
import StringEditor from '@/editFields/editor/StringEditor.vue';
import StringViewer from '@/editFields/viewer/StringViewer.vue';
import ArrayViewer from '@/editFields/viewer/ArrayViewer.vue';
import PointerViewer from '@/editFields/viewer/PointerViewer.vue';

export default defineComponent({
  name: 'EditableCells',
  components: {
    BIconPencilSquare,
    BIconX,
    BButton,
    BIconPen,
    BIconLock,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      required: true,
    },
    field: {
      type: Object as PropType<FieldDefinitionWithExtra>,
      required: true,
    },
    viewerConfig: {
      type: Object as PropType<Record<FieldType, Component>>,
      required: true,
    },
    editorConfig: {
      type: Object as PropType<Record<FieldType, Component>>,
      required: true,
    },
  },
  created() {
    this.buttonId = 'edit-button-' + this.item.id + this.field.identifier;
  },
  data() {
    return {
      modified: false,
      editMode: false,
      buttonId: 'edit-button',
    };
  },
  computed: {
    writable(): boolean {
      if (this.field.type === FieldType.OtherEntity || this.field.type === FieldType.Array) {
        return false;
      }
      return this.field.config.canEdit ?? true;
    },
    viewerComponent(): Component | string {
      if (this.viewerConfig[this.field.type]) {
        return this.viewerConfig[this.field.type];
      } else if (this.field.type === FieldType.Array) {
        return ArrayViewer;
      } else if (this.field.type === FieldType.OtherEntity) {
        return PointerViewer;
      }
      return StringViewer;
    },
    editorComponent(): Component | string {
      if (this.editorConfig[this.field.type]) {
        return this.editorConfig[this.field.type];
      }
      return StringEditor;
    },
  },
  methods: {
    _startEdition() {
      if (this.writable) {
        this.editMode = true;
      }
    },
    _prepareCellModification(modification: DataGridModifiedCell) {
      this.modified = true;
      this.editMode = false;
      this.$nextTick(() => {
        this.$emit('cellModified', modification);
      });
    },
    _onCloseEdition() {
      this.editMode = false;
    },
    saveModification() {},
  },
});
</script>
<style scoped>
.writable {
  cursor: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="24" width="24"><text y="20" >🖊</text><path d="M0,2 L0,0 L2,0" fill="red" /></svg>'),
    auto;
}

.locked {
  cursor: url('data:image/svg+xml;charset=utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="24" width="24"><text y="20" >🔒</text><path d="M0,2 L0,0 L2,0" fill="red" /></svg>'),
    auto;
}
</style>

<style>
.popover.datagrid-popover {
  min-width: 450px;
  max-width: 700px !important;
}
</style>
