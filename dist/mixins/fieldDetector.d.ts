import { PropType } from 'vue';
import { DataGridProviderFunction, DataGridProviderPromiseResult, FieldDefinition, FieldDefinitionWithExtra, GridEntityItem } from '@/index';
declare const _default: import("vue").DefineComponent<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    fields: {
        type: PropType<FieldDefinitionWithExtra[]>;
        default: () => never[];
    };
}, {}, {
    localFieldsDef: FieldDefinition[];
    existingFields: string[];
    localItems: GridEntityItem[];
}, {
    hasFieldsOption(): boolean;
}, {
    _setLocalFieldsDefinition(definitions: FieldDefinition[]): void;
    _checkActionField(fields: Array<any>): void;
    _transformToValidDefinition(fields: Array<any>): void;
    _constructAdaptedFields(entity: GridEntityItem): FieldDefinition[];
    _fieldsInspector(): FieldDefinition[];
    _checkExistingFields(fields: FieldDefinition[]): void;
    _fieldsUpdate(): void;
}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: PropType<GridEntityItem[] | DataGridProviderFunction | DataGridProviderPromiseResult>;
        required: true;
    };
    fields: {
        type: PropType<FieldDefinitionWithExtra[]>;
        default: () => never[];
    };
}>>, {
    fields: FieldDefinitionWithExtra[];
}>;
export default _default;
