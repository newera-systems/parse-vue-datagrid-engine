import { defineComponent, type PropType } from 'vue';
import {
  type FieldDefinition,
  type FieldDefinitionWithExtra,
  FieldType,
  type GridEntityItem,
} from '@/datagrid-bvue';
// @ts-expect-error - lodash is not a module
import _ from 'lodash';

export default defineComponent({
  props: {
    fields: {
      type: Array as PropType<FieldDefinitionWithExtra[]>,
      default: () => [],
    },
  },
  data() {
    return {
      localFieldsDef: [] as FieldDefinition[],
      existingFields: [] as string[],
      localItems: [] as GridEntityItem[],
    };
  },
  computed: {
    hasFieldsOption(): boolean {
      if (Array.isArray(this.fields)) {
        return this.fields.length > 0;
      }
      return false;
    },
  },
  watch: {
    fields: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (!_.isEqual(newValue, oldValue)) {
          this._fieldsUpdate();
        }
      },
    },
    localItems: {
      handler(newVal: GridEntityItem[], oldVal: GridEntityItem[]) {
        if (!_.isEqual(newVal, oldVal)) {
          this._fieldsUpdate();
        }
      },
    },
  },
  methods: {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]) {
      this._transformToValidDefinition(definitions);
      this._checkActionField(definitions);
      this.localFieldsDef = definitions;
    },
    _checkActionField(fields: any[]) {
      const found = fields.find(field => field.identifier === '#action');
      if (found !== undefined) {
        found.config.canView = false;
        found.config.canRead = true;
        found.config.canEdit = false;
        found.config.canFilter = false;
        found.config.canSort = false;
      }
    },
    _transformToValidDefinition(fields: any[]) {
      fields.forEach(fieldDef => {
        if (fieldDef.config === undefined) {
          console.warn('[DataGrid warn]: fields definition config missing,it will be generated');
          fieldDef.config = {
            canView: true,
            canRead: true,
            canEdit: false,
            canFilter: true,
            canSort: true,
          };
          return;
        }
        if (!Object.keys(fieldDef.config).includes('canView')) {
          console.warn(
            '[DataGrid warn]: fields definition config does not contain a canView value, it will be set to true'
          );
          fieldDef.config.canView = true;
        }
        if (!Object.keys(fieldDef.config).includes('canRead')) {
          console.warn(
            '[DataGrid warn]: fields definition config does not contain a canRead value, it will be set to true'
          );
          fieldDef.config.canRead = true;
        }
        if (!Object.keys(fieldDef.config).includes('canEdit')) {
          console.warn(
            '[DataGrid warn]: fields definition config does not contain a canEdit value, it will be set to true'
          );
          fieldDef.config.canEdit = true;
        }
        if (!Object.keys(fieldDef.config).includes('canFilter')) {
          console.warn(
            '[DataGrid warn]: fields definition config does not contain a canFilter value, it will be set to true'
          );
          fieldDef.config.canFilter = true;
        }
      });
    },
    _constructAdaptedFields(entity: GridEntityItem): FieldDefinition[] {
      const fields: FieldDefinition[] = [];
      for (const [key, value] of Object.entries(entity)) {
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
        };
        switch (typeof value) {
          case 'bigint':
          case 'number':
            field.type = FieldType.Number;
            break;
          case 'boolean':
            field.type = FieldType.Boolean;
            break;
          case 'symbol':
          case 'object':
            if (Array.isArray(value)) field.type = FieldType.Array;
            else if (Object.prototype.toString.call(value) === '[object Date]') {
              field.type = FieldType.Date;
            } else field.type = FieldType.OtherEntity;
            break;
          default:
            field.type = FieldType.String;
        }
        fields.push(field);
      }
      return fields;
    },
    _fieldsInspector(): FieldDefinition[] {
      const presentFieldsKeys: FieldDefinition[] = this.localItems.reduce<FieldDefinition[]>(
        (acc, entity) => {
          const fields = this._constructAdaptedFields(entity);
          const toAdd = fields.filter(
            field =>
              acc.find((f: FieldDefinition) => f.identifier === field.identifier) === undefined
          );
          return [...acc, ...toAdd];
        },
        []
      );
      this.existingFields = [
        ...new Set(presentFieldsKeys.map((field: FieldDefinition) => field.identifier)),
      ];
      return presentFieldsKeys;
    },
    _checkExistingFields(fields: FieldDefinition[]) {
      const existingFields: string[] = [];

      if (this.localItems.length === 0) {
        this.existingFields = fields.map(field => field.identifier);
        return;
      }

      fields.forEach(field => {
        let found = false;

        for (let i = 0; i < this.localItems.length && !found; i++) {
          const item = this.localItems[i];

          const isGetter = Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(item),
            field.identifier
          )?.get;
          if (isGetter != null) {
            found = true;
          } else if (field.identifier in item) {
            found = true;
          }
        }

        if (found) {
          existingFields.push(field.identifier);
        }
      });

      this.existingFields = existingFields;
    },
    _fieldsUpdate() {
      if (this.hasFieldsOption) {
        this._checkExistingFields(this.fields);
        this._setLocalFieldsDefinition([...this.fields]);
      } else {
        const fields = this._fieldsInspector();
        this._setLocalFieldsDefinition(fields);
      }
    },
  },
});
