import 'reflect-metadata';
import type { SchemaDefinition } from '@/rule/RuleElementCreator';

export interface GridOptions {
  canView: boolean;
  canRead: boolean;
  canEdit: boolean;
  canFilter: boolean;
  canSort: boolean;
}
export const defaultConfig: GridOptions = {
  canView: true,
  canRead: true,
  canEdit: false,
  canFilter: true,
  canSort: false,
};

type DataGridModels = new (...args: any[]) => any;

interface FieldDefinitionModel {
  identifier: string;
  name: string;
  config: GridOptions;
  type: string;
  linkedEntityClass?: DataGridModels;
}

interface FieldOptions extends Partial<GridOptions> {
  linkedEntityClass?: DataGridModels;
  name?: string;
}

const registeredEntities: Set<DataGridModels> = new Set<DataGridModels>();

export function DataGridField(type: string, options: FieldOptions = {}) {
  return function (target: CallableFunction, propertyKey: string) {
    registeredEntities.add(target.constructor as any);
    const existingFields: FieldDefinitionModel[] =
      Reflect.getMetadata('dataGrid:fields', target) ?? [];
    const linkedEntityClass = options.linkedEntityClass;
    const name = options.name ?? `Entity.${target.constructor.name}.${propertyKey}`;
    delete options.linkedEntityClass;
    delete options.name;
    const config = Object.assign({}, defaultConfig, options as Partial<GridOptions>);
    existingFields.push({
      identifier: propertyKey,
      name,
      type,
      config,
      linkedEntityClass,
    });
    Reflect.defineMetadata('dataGrid:fields', existingFields, target);
  };
}

function resolveFieldsForEntity(
  entityClass: DataGridModels,
  prefix = '',
  seenClasses: DataGridModels[] = []
): FieldDefinitionModel[] {
  // If this class has been seen before, don't process it again.
  if (seenClasses.includes(entityClass)) {
    return [];
  }
  // Add the current class to the list of seen classes.
  seenClasses.push(entityClass);
  const fields: FieldDefinitionModel[] =
    Reflect.getMetadata('dataGrid:fields', entityClass.prototype) ?? [];
  const resolvedFields: FieldDefinitionModel[] = [];
  for (const field of fields) {
    if (field.type === 'Pointer' && field.linkedEntityClass !== undefined) {
      // If we have a Pointer type with linkedEntityClass, fetch its fields recursively.
      const nestedFields = resolveFieldsForEntity(
        field.linkedEntityClass,
        field.identifier,
        seenClasses
      );
      resolvedFields.push(...nestedFields);
    } else {
      const newField = {
        identifier: prefix !== '' ? `${prefix}.${field.identifier}` : field.identifier,
        name: field.name,
        type: field.type,
        config: field.config,
      };
      resolvedFields.push(newField);
    }
  }
  return resolvedFields;
}
export function getFieldsForEntity(entityClass: DataGridModels): FieldDefinitionModel[] {
  return resolveFieldsForEntity(entityClass);
}

export function getAllRegisteredEntities(): DataGridModels[] {
  return Array.from(registeredEntities);
}
export function getAllRegisteredEntitiesNames(): string[] {
  return Array.from(registeredEntities).map(entityClass => entityClass.name);
}
export function getFieldsForEntityNamed(entityName: string): FieldDefinitionModel[] {
  const entityClass = getAllRegisteredEntities().find(
    entityClass => entityClass.name === entityName
  );
  if (entityClass === undefined) {
    throw new Error(`Entity ${entityName} not found`);
  }
  return resolveFieldsForEntity(entityClass);
}

export function getAllGridFieldsConfig(): Record<string, FieldDefinitionModel[]> {
  const models = getAllRegisteredEntities();
  return models.reduce((acc, modelClass) => {
    const entityName = modelClass.name;
    const entityFields = getFieldsForEntity(modelClass);
    return {
      ...acc,
      [entityName]: entityFields,
    };
  }, {});
}
export function getAllGridRulesConfig(): Record<string, SchemaDefinition[]> {
  const models = getAllRegisteredEntities();
  return models.reduce((acc, modelClass) => {
    const entityName = modelClass.name;
    const entityFields = getFieldsForEntity(modelClass);
    const outputFields = entityFields.map(({ identifier, name, type }) => ({
      identifier,
      name,
      type,
    }));
    return {
      ...acc,
      [entityName]: outputFields,
    };
  }, {});
}
