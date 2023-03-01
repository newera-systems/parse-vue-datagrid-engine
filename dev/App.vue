<template>
  <div class="mx-4">
    <h1>{{ title }}</h1>

    <TestTable />
    <hr />
    <TestFilter />
    <hr class="mt-2" />
    <TestModalCreator />
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import TestModalCreator from "./components/TestModalCreator.vue";
import TestFilter from "./components/TestFilter.vue";
import TestTable from "./components/TestTable.vue";

export default defineComponent({
  components: { TestModalCreator, TestFilter, TestTable },
  data() {
    return {
      title: "DataGrid Bvue",
    };
  },
});
</script>
