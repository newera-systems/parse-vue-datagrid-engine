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
    <div v-else class="d-inline-flex align-items-center" @dblclick.stop="_handleClick">
      <span class="mr-1">
        {{ visibleData }}
      </span>
      <component :is="icon" v-if="icon" />
      <BIconStack v-else variant="secondary" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, defineComponent, PropType } from 'vue';
import { BIconDashCircle, BIconQuestionOctagonFill, BIconStack } from 'bootstrap-vue';
import { FieldDefinitionWithExtra, GridEntityItem } from '@/datagrid-bvue';

export default defineComponent({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle,
    BIconStack,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [Array] as PropType<Array<any> | null | undefined>,
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
    } else if (this.field.pointerName) {
      this.visibleData = this.field.pointerName;
    } else {
      this.visibleData = this.$t('table').toString();
    }
    if (this.field.specialIcon) {
      this.icon = this.field.specialIcon;
    }
  },
  methods: {
    _handleClick() {
      this.$emit('arrayOnClick:external');
      this.$nextTick(() => {
        if (typeof this.field.onClickExternalRoutine === 'function') {
          this.field.onClickExternalRoutine(this.rawValue);
        }
      });
    },
  },
});
</script>
