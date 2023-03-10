import Vue, {PropType} from 'vue'
import {
  DataGridProviderFunction,
  DataGridProviderPromiseResult,
  FieldDefinition,
  FieldDefinitionWithExtra,
  FieldType,
  GridEntityItem,
} from '@/index'

export default Vue.extend({
  props: {
    items: {
      type: [Array, Function, Promise] as PropType<
        | Array<GridEntityItem>
        | DataGridProviderFunction
        | DataGridProviderPromiseResult
      >,
      required: true,
    },
    fields: {
      type: Array as PropType<FieldDefinitionWithExtra[]>,
      default: () => [],
    },
  },
  data() {
    return {
      localFieldsDef: [] as FieldDefinition[],
      localItems: [] as Array<GridEntityItem>,
    }
  },
  computed: {
    hasFieldsOption(): boolean {
      if (Array.isArray(this.fields)) {
        return this.fields.length > 0
      }
      return false
    },
  },
  methods: {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]) {
      this._transformToValidDefinition(definitions)
      this.localFieldsDef = definitions
    },
    _transformToValidDefinition(fields: Array<any>) {
      fields.forEach((fieldDef) => {
        if (!fieldDef.config) {
          console.warn(
            `[DataGrid warn]: fields definition config missing,it will be generated`
          )
          fieldDef.config = {
            canView: true,
            canRead: true,
            canEdit: false,
            canFilter: true,
            canSort: true,
          }
          return
        }
        if (!Object.keys(fieldDef.config).includes('canView')) {
          console.warn(
            `[DataGrid warn]: fields definition config does not contain a canView value, it will be set to true`
          )
          fieldDef.config.canView = true
        }
        if (!Object.keys(fieldDef.config).includes('canRead')) {
          console.warn(
            `[DataGrid warn]: fields definition config does not contain a canRead value, it will be set to true`
          )
          fieldDef.config.canRead = true
        }
        if (!Object.keys(fieldDef.config).includes('canEdit')) {
          console.warn(
            `[DataGrid warn]: fields definition config does not contain a canEdit value, it will be set to true`
          )
          fieldDef.config.canEdit = true
        }
        if (!Object.keys(fieldDef.config).includes('canFilter')) {
          console.warn(
            `[DataGrid warn]: fields definition config does not contain a canFilter value, it will be set to true`
          )
          fieldDef.config.canFilter = true
        }
      })
    },
    _constructAdaptedFields() {
      const fields: FieldDefinition[] = []
      if (this.localItems.length) {
        for (const [key, value] of Object.entries(this.localItems[0])) {
          const field: FieldDefinition = {
            identifier: key,
            name: key.replaceAll('_', ' '),
            config: {
              canView: true,
              canEdit: true,
              canFilter: false,
              canRead: true,
              canSort: true,
            },
            type: FieldType.String,
          }
          switch (typeof value) {
            case 'bigint':
            case 'number':
              field.type = FieldType.Number
              break
            case 'boolean':
              field.type = FieldType.Boolean
              break
            case 'symbol':
            case 'object':
              if (Array.isArray(value)) field.type = FieldType.Array
              else if (
                Object.prototype.toString.call(value) === '[object Date]'
              ) {
                field.type = FieldType.Date
              } else field.type = FieldType.OtherEntity
              break
            default:
              field.type = FieldType.String
          }
          fields.push(field)
        }
      }
      return fields
    },
    _fieldsUpdate() {
      if (this.hasFieldsOption) {
        this._setLocalFieldsDefinition(this.fields)
        return
      }
      const constructedFields = this._constructAdaptedFields()
      this._setLocalFieldsDefinition(constructedFields)
    },
  },
  watch: {
    fields: {
      deep: true,
      handler() {
        this.$nextTick(this._fieldsUpdate)
      },
    },
    localItems: {
      deep: true,
      handler() {
        this.$nextTick(this._fieldsUpdate)
      },
    },
  },
})
