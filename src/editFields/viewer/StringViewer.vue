<template>
  <div>
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
      <small class="pr-1">null</small>
      <BIconDashCircle variant="info" />
    </span>
    <span v-else class="d-inline-flex">
      {{ truncateString(visibleData, 140) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill } from 'bootstrap-vue';
import { FieldDefinition, GridEntityItem } from '@/datagrid-bvue';

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
      type: [String, Number, Date, Boolean, Object, Array] as PropType<
        string | number | Array<any> | unknown | null | undefined
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
      visibleData: null as unknown as string,
      error: false,
      isNull: false,
      verbose: false,
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
    } else if (typeof this.rawValue === 'object') {
      if (Array.isArray(this.rawValue)) {
        this.visibleData = 'Tableau';
      } else {
        this.visibleData = this.rawValue?.toString() ?? '';
        this.error = this.visibleData.length === 0;
      }
    } else if (typeof this.rawValue !== 'string') {
      this.visibleData = this.rawValue?.toString() ?? '';
      this.error = this.visibleData.length === 0;
    } else {
      this.visibleData = String(this.rawValue?.toString());
    }
  },
  methods: {
    truncateString(str: string | null, length: number) {
      if (str === null || str === undefined) {
        return '';
      }
      return str.length > length ? str.substring(0, length - 3) + '...' : str;
    },
  },
});
</script>
