import { defineComponent, type PropType } from "vue";
import Paginator from "@components/Paginator.vue";
import {
  type DataGridProviderFunction,
  type DataGridProviderPromiseResult,
  type FilterRuleInterface,
  type GridEntityItem,
  type ProviderContext
} from "@/datagrid-bvue";

export default defineComponent({
  components: { Paginator },
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult
      >,
      required: true
    },
    paginationEntries: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    const context: ProviderContext = {
      currentPage: 1,
      perPage: 25,
      withFilter: false,
      sortBy: null as unknown as string,
      sortDesc: true,
      FilterRule: null as unknown as FilterRuleInterface
    };
    return {
      context,
      perPageOptions: [5, 10, 25, 50, 100],
      localItems: [] as GridEntityItem[],
      localEntries: 0
    }
  },
  computed: {
    paginatedItems(): GridEntityItem[] {
      if (Array.isArray(this.items)) {
        const begin = (this.context.currentPage - 1) * this.context.perPage;
        const end = this.context.currentPage * this.context.perPage;
        return this.localItems.slice(begin, end);
      }
      return this.localItems.slice(0, this.context.perPage);
    }
  },
  watch: {
    localItems: {
      deep: true,
      handler(newValue: GridEntityItem[]) {
        if (this.paginationEntries > 0 && !Array.isArray(this.items)) {
          this.localEntries = this.paginationEntries;
        } else {
          this.localEntries = newValue.length ?? 0;
        }
      }
    }
  },
  methods: {
    onFiltered(filteredItems: any[]): void {
      this.localEntries = filteredItems.length;
      this.context.currentPage = 1;
    }
  }
})
