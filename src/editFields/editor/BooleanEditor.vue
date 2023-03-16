<template>
  <div
    class="d-flex d-cell-editor-boolean"
    @keyup.esc.stop="discardChanges"
    @keyup.enter.stop="saveModification"
  >
    <b-form-checkbox
      v-model="editValue"
      class="custom-control-primary"
      name="switch-boolean-button"
      size="lg"
      switch
    />
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
import { BButton, BButtonGroup, BFormCheckbox, BIconCheckSquare, BIconX } from 'bootstrap-vue';
import { DataGridModifiedCell, FieldDefinition, GridEntityItem } from '@/datagrid-bvue';

export default defineComponent({
  components: {
    BFormCheckbox,
    BButtonGroup,
    BIconCheckSquare,
    BIconX,
    BButton,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [String, Number, Boolean, Object] as PropType<
        string | boolean | number | unknown | null | undefined
      >,
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
  },
  data() {
    return {
      isModified: false,
      valid: true,
      editValue: null as unknown as boolean,
    };
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.editValue = false;
    } else if (this.rawValue === null) {
      this.editValue = false;
    } else this.editValue = this.rawValue === true;
  },
  methods: {
    saveModification() {
      if (!this.isModified) {
        return;
      }
      this.$emit('editionSave', {
        item: this.item,
        fieldKey: this.field.identifier,
        newValue: this.editValue,
      } as DataGridModifiedCell);
    },
    discardChanges() {
      this.$emit('editionCanceled');
    },
  },
  watch: {
    editValue(newVal) {
      this.isModified = newVal !== this.rawValue;
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-editor-boolean {
  width: 100%;
  min-width: 160px;
  padding-right: 0.5rem;
}
</style>
