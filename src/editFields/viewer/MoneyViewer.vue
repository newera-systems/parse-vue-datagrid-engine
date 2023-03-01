<template>
  <div class="d-cell-viewer-money">
    <span v-if="error" :class="writable ? 'd-inline-flex text-danger' : 'd-inline-flex text-muted'">
      <small class="pr-1">undefined</small>
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
      <span v-if="currency" class="font-weight-lighter money-currency">
        {{ currency }}
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill } from 'bootstrap-vue';
import { FieldDefinition, GridEntityItem } from '@/index';
import { Money } from 'ts-money';

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
      type: [Number, Object] as PropType<number | Money | null | undefined>,
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
      visibleData: null as unknown as Money,
      isNull: false,
      error: false,
      currency: 'CAD',
    };
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true;
    } else if (this.rawValue === null) {
      this.isNull = true;
    } else if (typeof this.rawValue === 'object') {
      this.visibleData = this.rawValue;
      this.currency = this.rawValue.currency ?? 'CAD';
    } else {
      const amount = Number(this.rawValue) ?? 0;
      this.visibleData = new Money(amount, this.currency);
    }
  },
});
</script>

<style lang="scss" scoped>
.d-cell-viewer-money {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 100px;
  padding-right: 0.5rem;
}

.money-currency {
  font-size: 0.8rem;
  margin-left: 0.2rem;
}
</style>
