<template>
  <div class="mx-4">
    <h1 class="text-center pt-1">
      {{ title }}
    </h1>
    <hr />
    <TestTable />
    <hr />
    <TestTableFromModel />
    <hr />
    <TestFilter />
    <hr class="mt-2" />
    <TestModalCreator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TestModalCreator from './components/TestModalCreator.vue';
import TestFilter from './components/TestFilter.vue';
import TestTable from './components/TestTable.vue';
import TestTableFromModel from './components/TestTableFromModel.vue';

export default defineComponent({
  components: { TestModalCreator, TestFilter, TestTable, TestTableFromModel },
  data() {
    return {
      title: 'DataGrid Bvue',
    };
  },
});
</script>
