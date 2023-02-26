<template>
  <div
    class="d-inline-flex"
    @keyup.esc.stop="discardChanges"
    @keyup.enter.stop="saveModification"
  >
    <b-dropdown class="dropdown-language" variant="outline-primary">
      <template #button-content>
        <template v-if="selectedLang.code.length">
          <span :class="`fi fi-${selectedLang.code}`"></span>
        </template>
        <span class="ml-1">{{ editValue }}</span>
      </template>
      <b-dropdown-item
        v-for="localeObj in locales"
        :key="localeObj.code"
        @click="
          () => {
            editValue = localeObj.value
          }
        "
      >
        <template v-if="localeObj.code.length">
          <span :class="`fi fi-${localeObj.code}`"></span>
        </template>
        <span class="ml-1">{{ localeObj.name }}</span>
      </b-dropdown-item>
    </b-dropdown>
    <b-button-group class="ml-1">
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
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {
  BButton,
  BButtonGroup,
  BDropdown,
  BDropdownItem,
  BIconCheckSquare,
  BIconX,
} from 'bootstrap-vue'
import {DataGridModifiedCell, FieldDefinition, GridEntityItem} from '@/index'
import {LocaleInterface, LOCALES} from '@/fieldsData'

export default Vue.extend({
  components: {
    BIconCheckSquare,
    BIconX,
    BButton,
    BButtonGroup,
    BDropdown,
    BDropdownItem,
  },
  props: {
    item: {
      type: Object as PropType<GridEntityItem>,
      required: true,
    },
    rawValue: {
      type: [String, Number, Date, Boolean, Object] as PropType<
        string | number | unknown | null | undefined
      >,
    },
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true,
    },
  },
  data() {
    return {
      isModified: false,
      valid: true,
      editValue: null as unknown as string,
      locales: Array.from(LOCALES.values()).filter(
        (locale: LocaleInterface) => locale.code.length
      ),
    }
  },
  beforeMount() {
    if (typeof this.rawValue !== 'string') {
      this.editValue = this.rawValue?.toString() ?? ''
    } else {
      this.editValue = String(this.rawValue)
    }
  },
  computed: {
    selectedLang(): LocaleInterface {
      const list = Array.from(LOCALES.values())
      return (
        list.find((locale: LocaleInterface) =>
          locale.possibleLocales.includes(this.editValue.trim().toLowerCase())
        ) ?? {
          possibleLocales: [],
          name: this.editValue,
          code: 'xx',
          value: this.editValue,
        }
      )
    },
  },
  methods: {
    saveModification() {
      if (!this.isModified) {
        return
      }
      this.$emit('editionSave', {
        item: this.item,
        field_key: this.field.identifier,
        newValue: this.editValue,
      } as DataGridModifiedCell)
    },
    discardChanges() {
      this.$emit('editionCanceled')
    },
  },
  watch: {
    editValue(newVal, oldValue) {
      this.isModified = newVal !== this.rawValue
    },
  },
})
</script>

<style lang="scss"></style>
