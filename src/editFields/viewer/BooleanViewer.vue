<template>
  <div class="d-cell-viewer-boolean">
    <span v-if="error" :class="writable ? 'd-inline-flex text-danger' : 'd-inline-flex text-muted'">
      <small class="pr-1">{{ visibleData }}</small>
      <BIconQuestionOctagonFill variant="danger" />
    </span>
    <span
      v-else-if="isNull"
      :class="writable ? 'd-inline-flex text-info' : 'd-inline-flex text-muted'"
    >
      <small class="pr-1">{{ visibleData }}</small>
      <BIconDashCircle variant="info" />
    </span>
    <b-form-checkbox
      v-else
      :checked="visibleData"
      class="custom-control-primary"
      disabled
      inline
      name="switch-boolean-button"
      size="lg"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BFormCheckbox, BIconDashCircle, BIconQuestionOctagonFill } from "bootstrap-vue";
import { FieldDefinition, GridEntityItem } from "@/datagrid-bvue";

export default defineComponent({
  components: {
    BFormCheckbox,
    BIconQuestionOctagonFill,
    BIconDashCircle
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true
    },
    rawValue: {
      type: [String, Number, Boolean, Object] as PropType<
        string | boolean | number | unknown | null | undefined
      >
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true
    },
    writable: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      visibleData: null as unknown as boolean,
      error: false,
      isNull: false
    };
  },
  mounted() {
    if (typeof this.rawValue === "undefined") {
      this.error = true;
      this.visibleData = false;
    } else if (this.rawValue === null) {
      this.visibleData = false;
      this.isNull = true;
    } else this.visibleData = this.rawValue === true;
  }
})
</script>

<style lang="scss" scoped>
.d-cell-viewer-boolean {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0;
}
</style>
