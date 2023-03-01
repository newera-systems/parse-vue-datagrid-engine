<template>
  <div class="my-4">
    <h2>{{ title }}</h2>
    <div class="d-inline-flex">
      <button class="btn btn-primary ml-4" @click="toggleModal">
        Toggle Modal
      </button>
      <button
        class="btn btn-primary ml-4"
        @click="
          () => {
            useEditor = !useEditor;
          }
        "
      >
        Toggle custom editor
      </button>
    </div>
    <RuleEngineCreatorModal
      ref="mod"
      v-model="modalVisible"
      :use-editor="useEditor"
      :rule="filterBuild"
      target="Invoice"
      @edited="
        (filterEdited) => {
          filterBuild = filterEdited;
        }
      "
    >
      <template v-slot:editor="{ value, onEditorInput }">
        <div class="form-group">
          <label for="">Custom editor</label>
          <input
            type="text"
            class="form-control"
            :value="value"
            @input="(val) => onEditorInput(val.target.value)"
          />
        </div>
      </template>
    </RuleEngineCreatorModal>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { FilterRuleInterface } from "../../src";

export default defineComponent({
  data() {
    return {
      title: "Rule Creation Modal Tester",
      filterBuild: null as unknown as FilterRuleInterface,
      modalVisible: false,
      useEditor: false,
    };
  },
  methods: {
    toggleModal() {
      this.$refs.mod.toggleModal();
    },
  },
});
</script>

<style scoped></style>
