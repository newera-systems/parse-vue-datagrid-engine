<template>
  <div class="my-4">
    <h2 class="h3 font-weight-normal text-muted">{{ title }}</h2>
    <div class="d-inline-flex">
      <button class="btn btn-primary ml-4" @click="toggleModal">Toggle Modal</button>
      <button
        class="btn btn-sm btn-secondary ml-4"
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
      :rule="filterBuild"
      :use-editor="useEditor"
      target="Invoice"
      @edited="
        filterEdited => {
          filterBuild = filterEdited;
        }
      "
    >
      <template v-slot:editor="{ value, onEditorInput }">
        <div class="form-group">
          <label for="">Custom editor</label>
          <input
            :value="value"
            class="form-control"
            type="text"
            @input="val => onEditorInput(val.target.value)"
          />
        </div>
      </template>
    </RuleEngineCreatorModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FilterRuleInterface } from '../../src/datagrid-bvue';

export default defineComponent({
  data() {
    return {
      title: 'Rule Creation Modal Component',
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
