<template>
  <b-input-group class="d-cell-editor-number" @keyup.esc.stop="discardChanges">
    <b-form-input
      v-model.number="editValue"
      placeholder="0"
      type="number"
      @keyup.enter.stop="saveModification"
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
import { defineComponent, PropType } from "vue";
import {
  BButton,
  BButtonGroup,
  BFormInput,
  BIconCheckSquare,
  BIconX,
  BInputGroup,
  BInputGroupAppend
} from "bootstrap-vue";

import { DataGridModifiedCell, FieldDefinition, GridEntityItem } from "@/index";

export default defineComponent({
  components: {
    BIconCheckSquare,
    BIconX,
    BButton,
    BButtonGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true
    },
    rawValue: {
      type: [String, Number, Date, Boolean, Object] as PropType<
        string | number | unknown | null | undefined
      >,
      required: true
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true
    }
  },
  data() {
    return {
      isModified: false,
      valid: true,
      editValue: null as unknown as number,
      editMode: false
    };
  },
  mounted() {
    if (typeof this.rawValue !== "number") {
      this.editValue = Number(this.rawValue) ?? 0;
    } else {
      this.editValue = this.rawValue as number;
    }
  },
  methods: {
    saveModification() {
      if (!this.isModified) {
        return;
      }
      this.$emit("editionSave", {
        item: this.item,
        fieldKey: this.field.identifier,
        newValue: this.editValue
      } as DataGridModifiedCell);
    },
    discardChanges() {
      this.$emit("editionCanceled");
    }
  },
  watch: {
    editValue(newVal) {
      this.isModified = newVal !== this.rawValue;
    }
  }
})
</script>

<style lang="scss" scoped>
.d-cell-editor-number {
  width: 100%;
  min-width: 180px;
  padding-right: 0.5rem;
}
</style>
