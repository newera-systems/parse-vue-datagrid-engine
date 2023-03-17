<template>
  <div class="mb-2">
    <b-row>
      <b-col
        class="d-flex align-items-center justify-content-center justify-content-sm-start"
        cols="12"
        sm="6"
      >
        <span class="text-muted">
          {{ startingIndex }} - {{ endingIndex }} | Total {{ entriesNumber }} {{ $t('entries') }}
        </span>
      </b-col>
      <!-- Pagination -->
      <b-col
        class="d-flex pt-2 align-items-center justify-content-center justify-content-sm-end"
        cols="12"
        sm="6"
      >
        <b-pagination
          v-model="currentPageNumber"
          :per-page="perPageNumber"
          :total-rows="entriesNumber"
          first-number
          last-number
          next-class="next-item"
          prev-class="prev-item"
        >
          <template #prev-text>
            <BIconChevronLeft width="18" />
          </template>
          <template #next-text>
            <BIconChevronRight width="18" />
          </template>
        </b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BCol, BIconChevronLeft, BIconChevronRight, BPagination, BRow } from 'bootstrap-vue';

export default defineComponent({
  components: {
    BCol,
    BRow,
    BIconChevronLeft,
    BIconChevronRight,
    BPagination,
  },
  props: {
    value: {
      type: Number,
      default: () => 1,
      required: true,
    },
    perPage: {
      type: Number,
      default: () => 25,
    },
    entries: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      currentPageNumber: 1,
      entriesNumber: 1,
      perPageNumber: 1,
    };
  },
  mounted() {
    this.update();
  },
  computed: {
    startingIndex(): number {
      return this.currentPageNumber * this.perPageNumber - (this.perPageNumber - 1);
    },
    endingIndex(): number {
      const maxEnd = this.currentPageNumber * this.perPageNumber;
      if (maxEnd > this.entries) {
        return this.entries;
      }
      return maxEnd;
    },
  },
  methods: {
    update() {
      this.currentPageNumber = this.value;
      this.entriesNumber = this.entries;
      this.perPageNumber = this.perPage;
    },
  },
  watch: {
    currentPageNumber() {
      if (this.currentPageNumber !== this.value) {
        this.$emit('input', this.currentPageNumber);
      }
    },
    entries(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.update();
      }
    },
    perPage(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.update();
      }
    },
  },
});
</script>
