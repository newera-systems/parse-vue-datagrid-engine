import { QueryBuilderConfig, RuleDefinition } from "query-builder-vue";
import { Component } from "vue";
import { RuleCompTypes } from "@/index";
export interface SchemaDefinition {
    identifier: string;
    name: string;
    type: RuleCompTypes | string;
}
export type SchemaList = {
    [key: string]: SchemaDefinition[];
};
export declare const componentsList: Record<RuleCompTypes | string, Component>;
export declare class RuleEngineConfig {
    draggable: boolean;
    rules: RuleDefinition[];
    private readonly target;
    private readonly schemas;
    constructor(schemaList: SchemaList, target: string, draggable?: boolean);
    getConfig(): QueryBuilderConfig;
    build(): void;
}
