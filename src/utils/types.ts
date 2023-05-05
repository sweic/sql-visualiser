import { ColumnInterface, TableInterface } from "sql-ddl-to-json-schema";

export interface RelationInterface {
  isSource: boolean;
  name: string;
  connectTo: string;
  targetHandles: string[];
}
export interface TableRelationInterface
  extends Omit<TableInterface, "primaryKey" | "foreignKeys" | "columns"> {
  columns: TableColumnInterface[];
  keys: TableKeysInterface[];
  relations: RelationInterface[];
  primaryKey: String[];
  foreignKeys: String[];
  keyRelations: KeyRelation[];
  keyNames: String[];
}

export interface KeyRelation {
  id: string;
  isSource: boolean;
  handleId: string;
}

export interface TableData {}

export interface TableColumnInterface extends ColumnInterface {
  isPrimary: boolean;
  isForeign: boolean;
}

export interface TableKeysInterface extends TableColumnInterface {
  isSource: boolean;
  isTarget: boolean;
}

export interface GlobalRelationInterface {
  id: string;
  sourceid: string;
  targetid: string;
  sourceHandle: string;
  targetHandle: string;
}
