<template>
  <b-input-group class="d-cell-editor-date" @keyup.esc.stop="discardChanges">
    <b-form-datepicker
      id="date-edit-picker"
      v-model="editValue"
      close-button
      name="date-edit-picker"
      reset-button
      today-button
      value-as-date
    />
    <b-input-group-append>
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
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  BButton,
  BButtonGroup,
  BFormDatepicker,
  BIconCheckSquare,
  BIconX,
  BInputGroup,
  BInputGroupAppend,
} from 'bootstrap-vue';
import { DataGridModifiedCell, FieldDefinition, GridEntityItem } from '@/index';
import dayjs, { Dayjs } from 'dayjs';

export default defineComponent({
  components: {
    BFormDatepicker,
    BIconCheckSquare,
    BIconX,
    BButton,
    BButtonGroup,
    BInputGroup,
    BInputGroupAppend,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [String, Number, Date, Object] as PropType<
        string | number | Date | Dayjs | null | undefined
      >,
      required: true,
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
      editValue: null as unknown as Date,
      editMode: false,
    };
  },
  mounted() {
    if (
      typeof this.rawValue === 'object' &&
      Object.prototype.toString.call(this.rawValue) === '[object Date]'
    ) {
      this.editValue = dayjs(this.rawValue).toDate();
    } else {
      this.editValue = dayjs(this.rawValue).toDate() ?? new Date();
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
    editValue(newVal) {
      this.isModified = newVal !== this.rawValue;
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-editor-date {
  width: 100%;
  min-width: 250px;
  padding-right: 0.5rem;
}
</style>
