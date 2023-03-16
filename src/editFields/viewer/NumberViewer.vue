<template>
  <div class="d-cell-viewer-number">
    <span v-if="error" :class="writable ? 'd-inline-flex text-danger' : 'd-inline-flex text-muted'">
      <small class="pr-1">undefined|NaN</small>
      <BIconQuestionOctagonFill variant="danger" />
    </span>
    <span
      v-else-if="isNull"
      :class="writable ? 'd-inline-flex text-info' : 'd-inline-flex text-muted'"
    >
      <small class="pr-1">null</small> <BIconDashCircle variant="info" />
    </span>
    <span v-else class="d-inline-flex">
      {{ visibleData }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BIconDashCircle, BIconQuestionOctagonFill } from "bootstrap-vue";
import { FieldDefinition, GridEntityItem } from "@/datagrid-bvue";
import { Dayjs } from "dayjs";

export default defineComponent({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true
    },
    rawValue: {
      type: [String, Number, Date, Boolean, Object] as PropType<
        string | number | Date | Dayjs | null | undefined
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
      visibleData: null as unknown as number,
      error: false,
      isNull: false
    };
  },
  mounted() {
    if (typeof this.rawValue === "undefined") {
      this.error = true;
    } else if (this.rawValue === null) {
      this.isNull = true;
    } else if (typeof this.rawValue !== "number") {
      this.visibleData = Number(this.rawValue);
      this.error = isNaN(this.visibleData);
    } else {
      this.visibleData = Number(this.rawValue);
    }
  }
})
</script>

<style lang="scss" scoped>
.d-cell-viewer-number {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 100px;
  padding-right: 0.5rem;
}
</style>
