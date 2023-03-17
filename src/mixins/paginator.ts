import { defineComponent, type PropType } from 'vue';
import DataGridPaginator from '@components/DataGridPaginator.vue';
import {
  type DataGridProviderFunction,
  type DataGridProviderPromiseResult,
  type FilterRuleInterface,
  type GridEntityItem,
  type ProviderContext,
} from '@/datagrid-bvue';

export default defineComponent({
  components: { DataGridPaginator },
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult
      >,
      required: true,
    },
  },
  data() {
    const context: ProviderContext = {
      currentPage: 1,
      perPage: 25,
      withFilter: false,
      sortBy: null as unknown as string,
      sortDesc: true,
      FilterRule: null as unknown as FilterRuleInterface,
    };
    return {
      context,
      perPageOptions: [5, 10, 25, 50, 100],
      localItems: [] as GridEntityItem[],
      localTotalEntries: 0,
    };
  },
  computed: {
    paginatedItems(): GridEntityItem[] {
      if (typeof this.items !== 'function') {
        const begin = this.context.currentPage * this.context.perPage - (this.context.perPage - 1);
        let end = this.context.currentPage * this.context.perPage;
        if (end > this.localItems.length) {
          end = this.localItems.length;
        }
        return this.localItems.slice(begin, end);
      }
      return this.localItems.slice(0, this.context.perPage);
    },
  },
  methods: {
    onFiltered(filteredItems: any[]): void {
      this.localTotalEntries = filteredItems.length;
      this.context.currentPage = 1;
    },
  },
});
