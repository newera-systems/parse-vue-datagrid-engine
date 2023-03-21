<template>
  <div class="d-cell-viewer-date">
    <span
      v-if="error && verbose"
      :class="writable ? 'd-inline-flex text-danger' : 'd-inline-flex text-muted'"
    >
      <small class="pr-1">undefined</small>
      <BIconQuestionOctagonFill variant="danger" />
    </span>
    <span
      v-else-if="isNull && verbose"
      :class="writable ? 'd-inline-flex text-info' : 'd-inline-flex text-muted'"
    >
      <small class="pr-1">null</small> <BIconDashCircle variant="info" />
    </span>
    <time v-else class="d-inline-flex">
      {{ displayDate() }}
    </time>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill } from 'bootstrap-vue';
import { FieldDefinition, GridEntityItem } from '@/datagrid-bvue';
import dayjs, { Dayjs } from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(calendar);

export default defineComponent({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle,
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
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
    writable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      visibleData: null as unknown as dayjs.Dayjs,
      verbose: false,
      isNull: false,
      error: false,
    };
  },
  created() {
    // @ts-expect-error DataGrid is  set by plugin config
    this.verbose = this.$DataGrid.verbose ?? false;
  },
  beforeMount() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true;
    } else if (this.rawValue === null) {
      this.isNull = true;
    } else {
      this.visibleData = dayjs(this.rawValue);
    }
  },
  methods: {
    displayDate(): string {
      if (this.error || this.isNull) {
        return '';
      }
      // @ts-expect-error DataGrid is  set by plugin config
      if (this.$DataGrid.calendarTime) {
        return this.visibleData?.calendar();
      } else {
        // @ts-expect-error DataGrid is  set by plugin config
        return this.visibleData.format(this.$DataGrid.dateFormat);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-viewer-date {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 130px;
  padding-right: 0.5rem;
}
</style>
