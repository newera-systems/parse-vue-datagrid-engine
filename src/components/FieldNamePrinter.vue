<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BIconChevronRight } from 'bootstrap-vue';

export default defineComponent({
  name: 'FieldNamePrinter',
  components: { BIconChevronRight },
  props: {
    definition: {
      type: Object as PropType<{ name: string; chain?: string[] }>,
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
  },
  methods: {
    getTranslation(key: string) {
      // @ts-expect-error DataGrid defined when using plugin
      if (this?.$DataGrid?.i18n) {
        return this.$t(key);
      }
      return key;
    },
  },
});
</script>

<template>
  <span>
    <template v-if="definition.chain && definition.chain.length > 1">
      <span v-for="(text, index) in definition.chain" :key="index">
        {{ getTranslation(text) }}
        <BIconChevronRight class="mr-1" :variant="colors[index % colors.length]" />
      </span>
    </template>
    {{ translation }}
  </span>
</template>

<style scoped lang="scss"></style>
