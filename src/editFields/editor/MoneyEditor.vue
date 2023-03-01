<template>
  <b-input-group class="d-cell-editor-money" @keyup.esc.stop="discardChanges">
    <b-form-input
      v-model="price"
      :state="state"
      autocomplete="off"
      invalid-feedback="Make sure to include the cents! Ex: 123.45"
      placeholder="123.45"
      trim
      @keyup.enter.stop="saveModification"
    />
    <b-input-group-append>
      <b-button-group>
        <b-button
          class="btn-icon"
          size="sm"
          variant="danger"
          @click="discardChanges"
        >
          <BIconX size="16" variant="white" />
        </b-button>
        <b-button
          v-if="isModified"
          class="btn-icon"
          size="sm"
          variant="success"
          @click="saveModification"
        >
          <BIconCheckSquare size="16" variant="white" />
        </b-button>
      </b-button-group>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import Vue, { defineComponent, PropType } from "vue";
import {
  BButton,
  BButtonGroup,
  BFormGroup,
  BFormInput,
  BIconCheckSquare,
  BIconX,
  BInputGroup,
  BInputGroupAppend,
} from "bootstrap-vue";

import { DataGridModifiedCell, FieldDefinition, GridEntityItem } from "@/index";
import { Money } from "ts-money";

export default defineComponent({
  components: {
    BIconCheckSquare,
    BIconX,
    BButton,
    BButtonGroup,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [Number, Object] as PropType<number | Money | null | undefined>,
      required: true,
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
  },
  data() {
    return {
      price: null as null | string,
      editValue: null as number | null,
      amount: null as number | null,
      isModified: false,
      currency: "CAD",
    };
  },
  mounted() {
    if (typeof this.rawValue === "undefined") {
      this.editValue = null;
    } else if (this.rawValue === null) {
      this.editValue = null;
    } else if (typeof this.rawValue === "object") {
      this.editValue = this.rawValue.amount ?? null;
      this.currency = this.rawValue.currency ?? "CAD";
    } else {
      this.editValue = Number(this.rawValue) ?? 0;
    }
    this.amount = this.editValue;
    this.price = Money.fromInteger(
      this.editValue as number,
      this.currency
    ).toString();
  },
  computed: {
    state(): boolean | null {
      if (this.price === null || this.price.trim() === "") {
        return null;
      }
      return Number.parseFloat(this.price).toFixed(2) === this.price;
    },
  },
  methods: {
    saveModification() {
      if (!this.isModified || this.state === false) {
        return;
      }
      let newValue: Money | Number | null = null;
      try {
        if (typeof this.rawValue === "object" && this.editValue) {
          newValue = Money.fromInteger(this.editValue, this.currency);
        } else {
          newValue = this.editValue;
        }
      } catch (e) {}
      this.$emit("editionSave", {
        item: this.item,
        field_key: this.field.identifier,
        newValue: newValue,
      } as DataGridModifiedCell);
    },
    discardChanges() {
      this.$emit("editionCanceled");
    },
  },
  watch: {
    price() {
      try {
        if (this.state && this.price) {
          this.editValue = Money.fromDecimal(
            Number.parseFloat(this.price),
            this.currency
          ).getAmount();
        }
      } catch (e) {
        this.amount = null;
      }
    },
    editValue(newVal) {
      this.isModified = newVal !== this.amount;
    },
  },
});
</script>

<style lang="scss" scoped>
.d-cell-editor-money {
  width: 100%;
  min-width: 180px;
  padding-right: 0.5rem;
}
</style>
