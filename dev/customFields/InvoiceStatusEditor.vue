<template>
  <div
    class="d-flex justify-content-between d-cell-editor-invoice"
    @keyup.esc.stop="discardChanges"
    @keyup.enter.stop="saveModification"
  >
    <b-form-select v-model="editValue" :options="list" text-field="label" value-field="id" />
    <b-button-group>
      <b-button class="btn-icon" size="sm" variant="danger" @click="discardChanges">
        <BIconX size="16" variant="white" />
      </b-button>
      <b-button
        v-if="isModified"
        class="btn-icon"
        size="sm"
        variant="success"
        @click="saveModification"
      >
        <BIconCheckSquare size="16" variant="white" />
      </b-button>
    </b-button-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BButton, BButtonGroup, BFormSelect, BIconCheckSquare, BIconX } from 'bootstrap-vue';
import {
  DataGridModifiedCell,
  FieldDefinitionWithExtra,
  GridEntityItem,
} from '../../src/datagrid-bvue';
import { InvoiceStatus, InvoiceStatusIcons } from './InvoiceStatusViewer.vue';

export default defineComponent({
  components: {
    BButtonGroup,
    BIconCheckSquare,
    BIconX,
    BButton,
    BFormSelect,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: String as PropType<string | null | undefined>,
    },
    field: {
      type: Object as PropType<FieldDefinitionWithExtra>,
      required: true,
    },
  },
  data() {
    return {
      isModified: false,
      editValue: InvoiceStatus.NONE,
      list: Object.values(InvoiceStatusIcons),
    };
  },
  computed: {},
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.editValue = InvoiceStatus.NONE;
    } else if (this.rawValue === null) {
      this.editValue = InvoiceStatus.NONE;
    } else {
      const managedList: InvoiceStatus[] = Object.values(InvoiceStatusIcons).map(i => i.id);
      const val = (this.rawValue?.trim() as InvoiceStatus) ?? InvoiceStatus.NONE;
      this.editValue = managedList.includes(val) ? val : InvoiceStatus.NONE;
    }
  },
  methods: {
    saveModification() {
      if (!this.isModified) {
        return;
      }
      this.$emit('editionSave', {
        item: this.item,
        field_key: this.field.identifier,
        newValue: this.editValue,
      } as DataGridModifiedCell);
    },
    discardChanges() {
      this.$emit('editionCanceled');
    },
  },
  watch: {
    editValue(newVal, oldValue) {
      this.isModified = newVal !== this.rawValue;
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-editor-invoice {
  min-width: 160px !important;
  padding: 0 0.5rem;
}
</style>
