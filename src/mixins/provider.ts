import { defineComponent, type PropType } from 'vue';
import {
  type DataGridProviderFunction,
  type DataGridProviderPromiseResult,
  type FilterRuleInterface,
  type GridEntityItem,
  type ProviderContext,
} from '@/datagrid-bvue';

export function isPromise(p: any): boolean {
  return typeof p === 'object' && typeof p.then === 'function';
}

export default defineComponent({
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult
      >,
      required: true,
    },
    paginationEntries: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    const context: ProviderContext = {
      currentPage: 1,
      perPage: 25,
      sortBy: null as unknown as string,
      sortDesc: true,
      withFilter: false,
      FilterRule: null as unknown as FilterRuleInterface,
    };
    return {
      localBusy: true,
      localItems: [] as GridEntityItem[],
      localTotalEntries: 0,
      cellKeyRemount: 1,
      context,
    };
  },
  computed: {
    hasProviderFunctionOrPromise(): boolean {
      return typeof this.items === 'function' || isPromise(this.items);
    },
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.$nextTick(this._providerUpdate);
      },
    },
  },
  mounted() {
    this._providerUpdate();
  },
  methods: {
    // Provider related methods
    _providerSetLocal(items: GridEntityItem[] | any) {
      if (isPromise(items)) {
        this._handlePromiseProvider(items as DataGridProviderPromiseResult);
      } else if (Array.isArray(items)) {
        const idIsPresent = this._checkIfIdFieldPresent(items);
        this.localItems = idIsPresent ? items.slice() : [];
        this._setTotalLocalEntries(this.localItems.length);
        this.localBusy = false;
        this.cellKeyRemount++;
        this.$emit('itemsRefreshed');
      } else {
        console.warn('[DataGrid warn]: items need to be an array');
        this.localItems = [];
        this._setTotalLocalEntries(0);
        this.localBusy = false;
        this.cellKeyRemount++;
        this.$emit('itemsRefreshed');
      }
    },
    _checkIfIdFieldPresent(list: any[]): boolean {
      const idIsPresent = list.every((item: any): boolean => {
        return Object.keys(item).includes('id');
      });
      if (!idIsPresent) {
        console.warn("[DataGrid warn]: some items don't have an id field");
      }
      return idIsPresent;
    },
    _handlePromiseProvider(promise: DataGridProviderPromiseResult) {
      promise
        .then(result => {
          this._providerSetLocal(result);
        })
        .catch(e => {
          console.warn('[DataGrid warn]:', e);
          this._providerSetLocal([]);
        });
    },
    _handleProviderFunction(provider: DataGridProviderFunction) {
      const data = provider(this.context, this._providerSetLocal);
      if (isPromise(data)) {
        this._handlePromiseProvider(data as DataGridProviderPromiseResult);
      } else if (Array.isArray(data)) {
        // Provider returned Array data
        this._providerSetLocal(data);
      } else {
        if (provider.length !== 2) {
          // Check number of arguments provider function requested
          // Provider not using callback (didn't request second argument), so we clear
          console.warn(
            "[DataGrid warn] Provider function didn't request callback and did not return a promise or data."
          );
          this._providerSetLocal([]);
        }
      }
    },
    _setTotalLocalEntries(entries: number) {
      if (this.hasProviderFunctionOrPromise && this.paginationEntries > 0) {
        this.localTotalEntries = this.paginationEntries;
        return;
      }
      this.localTotalEntries = entries;
    },
    _providerUpdate() {
      if (!this.hasProviderFunctionOrPromise) {
        this._providerSetLocal(this.items);
        return;
      }
      this.localBusy = true;
      // make sure the context is updated before calling the provider
      this.$nextTick(() => {
        try {
          // promise
          if (isPromise(this.items)) {
            this._handlePromiseProvider(this.items as DataGridProviderPromiseResult);
          } else if (typeof this.items === 'function') {
            this._handleProviderFunction(this.items);
          }
        } catch (e) {
          this._providerSetLocal([]);
          console.error('[DataGrid error]: provider function error', e);
        }
      });
    },
  },
});
