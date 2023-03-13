<template>
  <div>
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
    <p v-else class="rounded percent-viewer-box">
      <span
        :class="
          visibleData > 0 ? 'percent-viewer-box__bg bg-success' : 'percent-viewer-box__bg bg-danger'
        "
      ></span>
      <span :class="visibleData > 0 ? 'text-success' : 'text-danger'">{{ getPercentage() }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill, BProgress, BProgressBar } from 'bootstrap-vue';
import { FieldDefinition, GridEntityItem, IDataGridPrototype } from '@/index';
import { Dayjs } from 'dayjs';

export default defineComponent({
  components: {
    BProgress,
    BProgressBar,
    BIconQuestionOctagonFill,
    BIconDashCircle,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [String, Number, Date, Boolean, Object] as PropType<
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
      visibleData: null as unknown as number,
      error: false,
      isNull: false,
      locales: 'CA-fr',
    };
  },
  created() {
    if (this.$i18n.locale) {
      this.locales = this.$i18n.locale;
    } else {
      // @ts-expect-error DataGrid is  set by plugin configuration
      this.locales = (this.$DataGrid as IDataGridPrototype).lang ?? 'CA-fr';
    }
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true;
    } else if (this.rawValue === null) {
      this.isNull = true;
    } else if (typeof this.rawValue !== 'number') {
      this.visibleData = Number(this.rawValue);
      this.error = isNaN(this.visibleData);
    } else {
      this.visibleData = Number(this.rawValue);
    }
  },
  methods: {
    getPercentage() {
      const formatter = new Intl.NumberFormat(this.locales, {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
      return formatter.format(this.visibleData);
    },
  },
});
</script>
<style lang="css" scoped>
.percent-viewer-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  max-width: 100%;
  border-color: rgba(75, 70, 92, 0.12);
  border-style: solid;
  border-width: 0;
  font-size: 0.875rem;
  padding: 5px 5px;
  margin: 0;
}

.percent-viewer-box > .percent-viewer-box__bg {
  position: absolute;
  opacity: 0.12;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
  border: inherit;
  border-radius: inherit;
  margin: 0;
}
</style>
