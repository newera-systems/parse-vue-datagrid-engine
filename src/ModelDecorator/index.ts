import 'reflect-metadata';
import type { SchemaDefinition } from '@/rule/RuleElementCreator';

export interface GridOptions {
  canView: boolean;
  canRead: boolean;
  canEdit: boolean;
  canFilter: boolean;
  canSort: boolean;
}
export const defaultConfig: Readonly<GridOptions> = {
  canView: true,
  canRead: true,
  canEdit: false,
  canFilter: true,
  canSort: false,
} as const;

interface DataGridModelClass {
  new (...args: any[]): any;
  className?: string;
}

interface FieldDefinitionModel {
  identifier: string;
  name: string;
  config: GridOptions;
  type: string;
  linkedEntityClass?: DataGridModelClass;
}

export interface FieldData extends FieldDefinitionModel {
  chain: string[];
}

export interface FieldOptions {
  canView?: boolean;
  canRead?: boolean;
  canEdit?: boolean;
  canFilter?: boolean;
  canSort?: boolean;
  linkedEntityClass?: DataGridModelClass;
  label?: string;
}

interface RegisteredModelData {
  classConstructor: DataGridModelClass;
  entityLabel: string;
  entityIdentifier: string;
}

const registeredEntities: Map<string, RegisteredModelData> = new Map<string, RegisteredModelData>();

export function DataGridModel() {
  return function (target: DataGridModelClass) {
    const className = target.className ?? target.name;
    const data = {
      classConstructor: target,
      entityLabel: className,
      entityIdentifier: className,
    };
    registeredEntities.set(data.entityIdentifier, data);
  };
}

function getModelMetadata(entityClass: DataGridModelClass): RegisteredModelData {
  const identifier = entityClass.className ?? entityClass.name;
  const data = registeredEntities.get(identifier);
  if (data === undefined) {
    throw new Error(`Entity ${identifier} not found`);
  }
  return data;
}

function getEntityIdentifier(entityClass: DataGridModelClass): string {
  return getModelMetadata(entityClass).entityIdentifier;
}

function getEntityClass(entityId: string): DataGridModelClass {
  const data = registeredEntities.get(entityId);
  if (data === undefined) {
    throw new Error(`Entity ${entityId} not found`);
  }
  return data.classConstructor;
}

export function DataGridField(type: string, options: FieldOptions = {}) {
  return function (target: InstanceType<DataGridModelClass>, propertyKey: string) {
    const existingFields: FieldDefinitionModel[] =
      Reflect.getMetadata('dataGrid:fields', target.constructor) ?? [];
    const linkedEntityClass = options.linkedEntityClass;
    const label = options.label ?? propertyKey;
    delete options.linkedEntityClass;
    delete options.label;
    const config = Object.assign({}, defaultConfig, options as Partial<GridOptions>);
    existingFields.push({
      identifier: propertyKey,
      name: label,
      type,
      config,
      linkedEntityClass,
    });
    Reflect.defineMetadata('dataGrid:fields', existingFields, target.constructor);
  };
}

function resolveFieldsForEntity(
  entityClass: DataGridModelClass,
  prefix = '',
  seenClasses: string[] = []
): FieldData[] {
  const entityId = getEntityIdentifier(entityClass);
  if (seenClasses.includes(entityId)) {
    return [];
  }
  seenClasses.push(entityId); // Storing just the class identifier in seenClasses
  const fields: FieldDefinitionModel[] = Reflect.getMetadata('dataGrid:fields', entityClass) ?? [];
  const resolvedFields: FieldData[] = [];
  for (const field of fields) {
    const currentPrefix = prefix !== '' ? `${prefix}.${field.identifier}` : field.identifier;
    if (field.type === 'Pointer' && field.linkedEntityClass != null) {
      const nestedFields = resolveFieldsForEntity(
        field.linkedEntityClass,
        currentPrefix,
        seenClasses.slice()
      );
      resolvedFields.push(...nestedFields);
    } else {
      const newField = {
        identifier: currentPrefix,
        name: field.name,
        type: field.type,
        config: field.config,
        chain: seenClasses.slice(), // Add chain property based on seenClasses
      };
      resolvedFields.push(newField);
    }
  }
  return resolvedFields;
}

export function getFieldsForEntity(entityClass: DataGridModelClass): FieldData[] {
  return resolveFieldsForEntity(entityClass);
}

export function getAllRegisteredEntitiesData(): RegisteredModelData[] {
  return Array.from(registeredEntities.values());
}
export function getAllRegisteredModelLabels(): string[] {
  return getAllRegisteredEntitiesData().map(({ entityLabel }) => entityLabel);
}
export function getAllRegisteredModelIdentifiers(): string[] {
  return getAllRegisteredEntitiesData().map(({ entityIdentifier }) => entityIdentifier);
}

export function getRegisteredModelClass(entityId: string): DataGridModelClass {
  return getEntityClass(entityId);
}

export function getFieldsForEntityId(entityId: string): FieldData[] {
  const entityClass = registeredEntities.get(entityId)?.classConstructor;
  if (entityClass === undefined) {
    throw new Error(`Entity ${entityId} not found`);
  }
  return resolveFieldsForEntity(entityClass);
}

export function getFieldsForEntityLabel(entityLabel: string): FieldData[] {
  const entity = getAllRegisteredEntitiesData().find(
    ({ entityLabel: label }) => label === entityLabel
  );
  if (entity === undefined) {
    throw new Error(`Entity with ${entityLabel} not found`);
  }
  const entityClass = entity.classConstructor;
  return resolveFieldsForEntity(entityClass);
}

export function getAllGridFieldsConfig(): Record<string, FieldData[]> {
  const models = getAllRegisteredEntitiesData();
  return models.reduce((acc, modelData) => {
    const modelClass = modelData.classConstructor;
    const entityFields = getFieldsForEntity(modelClass);
    return {
      ...acc,
      [modelData.entityLabel]: entityFields,
    };
  }, {});
}

export function getAllGridRulesConfig(): Record<string, SchemaDefinition[]> {
  const models = getAllRegisteredEntitiesData();
  return models.reduce((acc, modelData) => {
    const entityFields = getFieldsForEntity(modelData.classConstructor);
    const outputFields = entityFields.map(({ identifier, name, type, chain }) => ({
      identifier,
      name,
      type,
      chain,
    }));
    return {
      ...acc,
      [modelData.entityLabel]: outputFields,
    };
  }, {});
}
