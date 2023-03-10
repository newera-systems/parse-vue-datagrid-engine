<template>
  <div class="d-cell-viewer-language">
    <span
      v-if="error"
      :class="
        writable ? 'd-inline-flex text-danger' : 'd-inline-flex text-muted'
      "
    >
      <small class="pr-1">{{ visibleData }}</small>
      <BIconQuestionOctagonFill variant="danger" />
    </span>
    <span
      v-else-if="isNull"
      :class="writable ? 'd-inline-flex text-info' : 'd-inline-flex text-muted'"
    >
      <small class="pr-1">{{ visibleData }}</small>
      <BIconDashCircle variant="info" />
    </span>
    <div v-else class="d-inline-flex">
      <template v-if="lang.code.length">
        <span :class="`fi fi-${lang.code}`"></span>
      </template>
      <span class="ml-1">{{ lang.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {
  BIconDashCircle,
  BIconLock,
  BIconPen,
  BIconQuestionOctagonFill,
} from 'bootstrap-vue'
import {FieldDefinition, GridEntityItem} from '@/index'
import {LocaleInterface, LOCALES} from '@/fieldsData'

export default Vue.extend({
  components: {
    BIconQuestionOctagonFill,
    BIconDashCircle,
    BIconPen,
    BIconLock,
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
    writable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      visibleData: null as unknown as string,
      locales: Array.from(LOCALES.values()),
      lang: Array.from(LOCALES.values())[0],
      error: false,
      isNull: false,
    }
  },
  mounted() {
    if (typeof this.rawValue === 'undefined') {
      this.error = true
      this.visibleData = 'undefined'
    } else if (this.rawValue === null) {
      this.visibleData = 'null'
      this.isNull = true
    } else if (typeof this.rawValue !== 'string') {
      this.visibleData = this.rawValue?.toString() ?? ''
      this.error = this.visibleData.length === 0
    } else {
      this.visibleData = String(this.rawValue?.toString().trim())
    }
    this.setLang()
  },
  methods: {
    setLang() {
      this.lang = this.locales.find((locale: LocaleInterface) =>
        locale.possibleLocales.includes(this.visibleData.trim().toLowerCase())
      ) ?? {
        possibleLocales: [],
        name: this.visibleData,
        code: 'xx',
        value: this.visibleData,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.d-cell-viewer-language {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: 120px;
  padding-right: 0.5rem;
}
</style>
