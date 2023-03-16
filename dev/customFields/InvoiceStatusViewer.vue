<template>
  <div class="d-cell-viewer-invoice">
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
    <div v-else class="d-inline-flex">
      <span class="text-right mr-1 d-block">{{ info.label }}</span>
      <b-avatar :id="id" :variant="info.variant" size="23">
        <BIconX v-if="info.icon === 'XIcon'" />
        <BIconClock v-else-if="info.icon === 'ClockIcon'" />
        <BIconCurrencyDollar v-else />
        <b-tooltip :target="id" :title="info.label"></b-tooltip>
      </b-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  BAvatar,
  BIconClock,
  BIconCurrencyDollar,
  BIconDashCircle,
  BIconQuestionOctagonFill,
  BIconX,
  BTooltip,
} from 'bootstrap-vue';
import { FieldDefinitionWithExtra, GridEntityItem } from '../../src/datagrid-bvue';

export enum InvoiceStatus {
  // eslint-disable-next-line no-unused-vars
  NONE = '',
  // eslint-disable-next-line no-unused-vars
  AWAITING_PAYMENT = 'awaiting_payment',
  // eslint-disable-next-line no-unused-vars
  COMPLETED = 'completed',
  // eslint-disable-next-line no-unused-vars
  CANCELLED_REFUNDED = 'cancelled_refunded',
}

export interface StatusInfo {
  id: InvoiceStatus;
  variant: string;
  icon: string;
  label: string;
}

export const InvoiceStatusIcons: Record<InvoiceStatus, StatusInfo> = {
  [InvoiceStatus.COMPLETED]: {
    id: InvoiceStatus.COMPLETED,
    variant: 'success',
    icon: 'DollarSignIcon',
    label: 'Paid',
  },
  [InvoiceStatus.AWAITING_PAYMENT]: {
    id: InvoiceStatus.AWAITING_PAYMENT,
    variant: 'info',
    icon: 'DollarSignIcon',
    label: 'Awaiting payment',
  },
  [InvoiceStatus.CANCELLED_REFUNDED]: {
    id: InvoiceStatus.CANCELLED_REFUNDED,
    variant: 'primary',
    icon: 'DollarSignIcon',
    label: 'Cancelled (Refunded)',
  },
  [InvoiceStatus.NONE]: {
    id: InvoiceStatus.NONE,
    variant: 'primary',
    icon: 'XIcon',
    label: 'N/A',
  },
};

export default defineComponent({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle,
    BAvatar,
    BTooltip,
    BIconCurrencyDollar,
    BIconClock,
    BIconX,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: String,
      default: () => InvoiceStatus.NONE,
    },
    field: {
      type: Object as PropType<FieldDefinitionWithExtra>,
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
      visibleData: '',
      error: false,
      isNull: false,
      id: `StatusInfoIcon-${Math.random().toString(36).substr(2, 9)}`,
    };
  },
  computed: {
    status(): InvoiceStatus {
      switch (this.visibleData) {
        case InvoiceStatus.AWAITING_PAYMENT:
          return InvoiceStatus.AWAITING_PAYMENT;
        case InvoiceStatus.COMPLETED:
          return InvoiceStatus.COMPLETED;
        case InvoiceStatus.CANCELLED_REFUNDED:
          return InvoiceStatus.CANCELLED_REFUNDED;
        default:
          return InvoiceStatus.NONE;
      }
    },
    info(): StatusInfo {
      return InvoiceStatusIcons[this.status];
    },
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true;
      this.visibleData = 'undefined';
    } else if (this.rawValue === null) {
      this.visibleData = 'null';
      this.isNull = true;
    } else {
      this.visibleData = this.rawValue?.trim();
    }
  },
});
</script>

<style lang="scss" scoped>
.d-cell-viewer-invoice {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 140px;
  height: 100%;
  padding-right: 0.5rem;
}
</style>
