import { defineComponent, type PropType } from "vue";
import {
  type DataGridProviderFunction,
  type DataGridProviderPromiseResult,
  type FilterRuleInterface,
  type GridEntityItem,
  type ProviderContext
} from "@/datagrid-bvue";

function isPromise(p: any): boolean {
  return typeof p === "object" && typeof p.then === "function";
}

export default defineComponent({
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult
      >,
      required: true
    }
  },
  data() {
    const context: ProviderContext = {
      currentPage: 1,
      perPage: 25,
      sortBy: null as unknown as string,
      sortDesc: true,
      withFilter: false,
      FilterRule: null as unknown as FilterRuleInterface
    };
    return {
      localBusy: true,
      localItems: [] as GridEntityItem[],
      cellKeyRemount: 1,
      context
    }
  },
  computed: {
    hasProviderFunction(): boolean {
      return typeof this.items === "function";
    }
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.$nextTick(this._providerUpdate);
      }
    }
  },
  mounted() {
    this._providerUpdate();
  },
  methods: {
    // Provider related methods
    _providerSetLocal(items: GridEntityItem[] | any) {
      if (isPromise(items)) {
        // function returned a promise need to wait before updating
        (items as DataGridProviderPromiseResult)
          .then(result => {
            this._providerSetLocal(result);
          })
          .catch(e => {
            console.warn("[DataGrid warn]:", e);
            this.localItems = [];
            this.localBusy = false;
          });
        this.localItems = [];
        this.localBusy = true;
      } else if (Array.isArray(items)) {
        const idIsPresent = this._checkIfIdFieldPresent(items);
        this.localItems = idIsPresent ? items.slice() : [];
        this.localBusy = false;
      } else {
        this.localItems = [];
        console.warn("[DataGrid warn]: items need to be an array");
        this.localBusy = false;
      }
      this.cellKeyRemount++;
      this.$emit("itemsRefreshed");
    },
    _checkIfIdFieldPresent(list: any[]) {
      const idIsPresent = list.every((item: any): boolean => {
        return Object.keys(item).includes("id");
      });
      if (!idIsPresent) {
        console.warn("[DataGrid warn]: item doesn't have, id field");
      }
      return idIsPresent;
    },
    _providerUpdate() {
      if (!this.hasProviderFunction) {
        this._providerSetLocal(this.items);
        return;
      }
      this.localBusy = true;
      this.$nextTick(() => {
        try {
          // promise
          if (isPromise(this.items)) {
            (this.items as DataGridProviderPromiseResult)
              .then(result => {
                this._providerSetLocal(result);
              })
              .catch(e => {
                console.warn("[DataGrid warn]:", e);
                this.localItems = [];
                this.localBusy = false;
              });
          } else {
            // function returning array or promises
            const provider = this.items as DataGridProviderFunction;
            const data = provider(this.context, this._providerSetLocal);
            if (isPromise(data)) {
              (data as DataGridProviderPromiseResult)
                .then(items => {
                  this._providerSetLocal(items);
                })
                .catch(e => {
                  console.warn("[DataGrid warn]:", e);
                  this.localItems = [];
                  this.localBusy = false;
                });
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
                this.localBusy = false;
              }
            }
          }
        } catch (e) {
          console.error("DataGrid provider function error", e);
        }
      })
    }
  }
})
