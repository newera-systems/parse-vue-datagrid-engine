<template>
  <div class="d-cell-viewer-pointer">
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
    <div v-else class="d-inline-flex align-items-center" @dblclick.stop="_handleClick">
      <span :class="writable ? 'mr-1' : 'mr-1 text-muted'">
        {{ visibleData }}
      </span>
      <component :is="icon" v-if="icon" />
      <BIconTagsFill v-else variant="secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, Component, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill, BIconTagsFill } from 'bootstrap-vue';
import { FieldDefinitionWithExtra, GridEntityItem } from '@/index';

export default defineComponent({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle,
    BIconTagsFill,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [String, Number, Date, Boolean, Object] as PropType<string | number | any>,
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
      visibleData: null as unknown as string,
      icon: null as unknown as Component,
      error: false,
      isNull: false,
    };
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true;
      this.visibleData = 'undefined';
    } else if (this.rawValue === null) {
      this.visibleData = 'null';
      this.isNull = true;
    } else if (this.field.pointerName) {
      this.visibleData = this.field.pointerName;
    } else if (typeof this.rawValue === 'object') {
      if (typeof this.rawValue?.className === 'string') {
        this.visibleData = String(this.rawValue?.className);
      } else if (typeof this.rawValue?.name === 'string') {
        this.visibleData = String(this.rawValue?.name);
      } else if (typeof this.rawValue?.type === 'string') {
        this.visibleData = String(this.rawValue?.type);
      }
    } else if (typeof this.rawValue === 'string') {
      this.visibleData = this.rawValue;
    } else {
      this.visibleData = 'Pointer';
    }
    if (this.field.specialIcon) {
      // @ts-expect-error type instantiation is excessively deep
      this.icon = this.field.specialIcon;
    }
  },
  methods: {
    _handleClick() {
      this.$emit('pointerOnClick:external');
      this.$nextTick(() => {
        if (typeof this.field.onClickExternalRoutine === 'function') {
          this.field.onClickExternalRoutine(this.rawValue);
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-viewer-pointer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 100px;
  padding-right: 0.5rem;
}
</style>
