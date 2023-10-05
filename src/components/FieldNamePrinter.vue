<template>
  <span>
    <template v-if="definition.chain && definition.chain.length > 1">
      <span v-for="(text, index) in definition.chain" :key="index">
        <template v-if="index < definition.chain.length - 1">
          {{ getChainValue(text, index) }}
          <BIconChevronRight class="mr-1" :variant="colors[index % colors.length]" />
        </template>
      </span>
    </template>
    {{ translation }}
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BIconChevronRight } from 'bootstrap-vue';

export default defineComponent({
  name: 'FieldNamePrinter',
  components: { BIconChevronRight },
  props: {
    definition: {
      type: Object as PropType<{
        name: string;
        chain?: string[];
        identifier: string;
      }>,
      required: true,
    },
  },
  data() {
    return {
      colors: ['primary', 'success', 'danger', 'warning', 'secondary', 'info', 'light', 'dark'],
    };
  },
  computed: {
    translation() {
      return this.getTranslation(this.definition.name);
    },
    splittedIds(): string[] {
      return this.definition.identifier.split('.') ?? [];
    },
  },
  methods: {
    getTranslation(key: string) {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key);
      }
      return key;
    },
    getChainValue(key: string, index: number) {
      if (this.splittedIds[index] !== key.toLowerCase()) {
        return this.getTranslation(this.splittedIds[index]);
      } else {
        return this.getTranslation(key.toLowerCase());
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
