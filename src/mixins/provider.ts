import Vue, { defineComponent, PropType } from "vue";
import {
  DataGridProviderFunction,
  DataGridProviderPromiseResult,
  FilterRuleInterface,
  GridEntityItem,
  ProviderContext,
} from "@/index";

function isPromise(p: any) {
  return typeof p === "object" && typeof p.then === "function";
}

export default defineComponent({
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        | Array<GridEntityItem>
        | DataGridProviderFunction
        | DataGridProviderPromiseResult
      >,
      required: true,
    },
  },
  data() {
    return {
      localBusy: false,
      localItems: [] as Array<GridEntityItem>,
      cellKeyRemount: 1,
      context: {
        currentPage: 1,
        perPage: 25,
        sortBy: null as unknown as string,
        sortDesc: true,
        withFilter: false,
        FilterRule: null as FilterRuleInterface | null,
      } as ProviderContext,
    };
  },
  mounted() {
    this._providerUpdate();
  },
  computed: {
    hasProviderFunction(): boolean {
      return typeof this.items === "function";
    },
  },
  methods: {
    // Provider related methods
    _providerSetLocal(items: Array<GridEntityItem> | any) {
      if (isPromise(items)) {
        // function returned a promise need to wait before updating
        (items as DataGridProviderPromiseResult).then((result) => {
          this._providerSetLocal(result);
        });
        this.localItems = [];
        this.localBusy = true;
      } else if (Array.isArray(items)) {
        const idIsPresent = this._checkIfIdFieldPresent(items);
        this.localItems = idIsPresent ? items.slice() : [];
        this.localBusy = false;
      } else {
        this.localItems = [];
        console.warn(`[DataGrid warn]: items need to be an array`);
        this.localBusy = false;
      }
      this.cellKeyRemount++;
      this.$emit("itemsRefreshed");
    },
    _checkIfIdFieldPresent(list: Array<any>) {
      const idIsPresent = list.every((item: any): boolean => {
        return Object.keys(item).includes("id");
      });
      if (!idIsPresent) {
        console.warn(`[DataGrid warn]: item doesn't have, id field`);
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
          //promise
          if (isPromise(this.items)) {
            (this.items as DataGridProviderPromiseResult).then((result) => {
              this._providerSetLocal(result);
            });
          } else {
            // function returning array or promises
            const provider = this.items as DataGridProviderFunction;
            const data = provider(this.context, this._providerSetLocal);
            if (isPromise(data)) {
              (data as DataGridProviderPromiseResult).then((items) => {
                this._providerSetLocal(items);
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
      });
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
});
