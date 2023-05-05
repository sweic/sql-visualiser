import { Edge, Node } from "reactflow";
import { Parser, TableInterface } from "sql-ddl-to-json-schema";
import { GlobalRelationInterface, TableRelationInterface } from "./types";
import ELK, { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk.bundled.js";
interface Output {
  globalRelations: GlobalRelationInterface[];
  results: Map<string, TableRelationInterface>;
}
const initialiseMap = (tables: TableInterface[]) =>
  tables.reduce((acc, curr) => {
    const name = curr.name;
    const tmp: TableRelationInterface = {
      ...curr,
      relations: [],
      keys: [],
      columns: curr.columns
        ? curr.columns?.map((col) => ({
            ...col,
            isPrimary: false,
            isForeign: false,
          }))
        : [],
      primaryKey: [],
      foreignKeys: [],
      keyRelations: [],
      keyNames: [],
    };
    acc.set(name, tmp);
    return acc;
  }, new Map<string, TableRelationInterface>());

const getColumnsFromTables = (tables: TableInterface[], target: string) => {
  const table = getTable(tables, target);
  if (!table) return [];
  return table.columns?.map((col) => col.name);
};
const getTable = (tables: TableInterface[], target: string) => {
  return tables.find((table) => table.name == target);
};
export const convertDDLMap = (ddl: string) => {
  try {
    const parser = new Parser("mysql");
    const tables: TableInterface[] = parser
      .feed(ddl)
      .toCompactJson(parser.results);
    const [results, globalRelations] = mapTables(tables);
    return [results, globalRelations] as const;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const mapTables = (tables: TableInterface[]) => {
  const results = initialiseMap(tables);
  var globalRelations: GlobalRelationInterface[] = [];

  for (const table of tables) {
    const { foreignKeys, primaryKey, name } = table;
    var pri = new Set<string>();
    var fore = new Set<string>();

    for (const col of primaryKey?.columns!) pri.add(col.column!);
    if (foreignKeys) {
      for (const key of foreignKeys!) {
        key.columns.map((col) => fore.add(col.column!));
        const currentCols = key.reference.columns?.map((col) => col.column);
        const targetCols = getColumnsFromTables(tables, key.reference.table);
        const seeIdx = Math.min(
          key.reference.columns?.length!,
          key.columns.length
        );

        if (currentCols?.every((v) => targetCols?.includes(v!))) {
          var targetHandles: string[] = [];
          for (var i = 0; i < seeIdx; i++) {
            const source = key.columns[i].column!;
            const destin = key.reference.columns![i].column;
            if (!destin) continue;
            if (results.has(name) && results.has(key.reference.table)) {
              const relationName = `${table.name}-${key.name}-${key.reference.table}`;
              results.get(name)?.relations.push({
                name: relationName,
                isSource: true,
                connectTo: key.reference.table,
                targetHandles: [source],
              });
              results.get(key.reference.table)?.relations.push({
                name: relationName,
                isSource: false,
                connectTo: table.name,
                targetHandles: [destin],
              });
              results.get(name)?.keyRelations.push({
                id: source,
                isSource: true,
                handleId: `${source}-s`,
              });
              results.get(key.reference.table)?.keyRelations.push({
                id: destin,
                isSource: false,
                handleId: `${destin}-t`,
              });
              globalRelations.push({
                id: `${relationName}-${i}`,
                sourceid: table.name,
                targetid: key.reference.table,
                sourceHandle: `${source}-s`,
                targetHandle: `${destin}-t`,
              });
            }
          }
        }
      }
    }
    const ref = results.get(name);
    if (ref) {
      ref.primaryKey = Array.from(pri);
      ref.foreignKeys = Array.from(fore);
    }

    for (const col of table.columns!) {
      if (pri.has(col.name) || fore.has(col.name)) {
        const table = results
          .get(name)
          ?.columns.find((c) => c.name == col.name);
        if (table)
          results.get(name)?.keys.push({
            ...table,
            isSource: false,
            isTarget: false,
          });
      }
    }
  }

  for (const [k, v] of results) {
    const { keyRelations, keys, keyNames } = v;
    for (const ks of keys) {
      const find = keyRelations.find((r) => r.id == ks.name);
      if (find) {
        ks.isSource = find.isSource;
        ks.isTarget = !find.isSource;
      }
      keyNames.push(ks.name);
    }
  }

  return [results, globalRelations] as const;
};

export const mapToReactNodes = (map: ElkNode) => {
  var results: Node[] = [];
  for (const val of map.children!) {
    results.push({
      id: val.id,
      type: "table",
      position: { x: val.x!, y: val.y! },
      data: {
        ...val,
      },
      draggable: true,
      dragging: true,
    });
  }
  return results;
};

export const mapToReactEdges = (relations: GlobalRelationInterface[]) => {
  var results: Edge[] = [];
  for (const relation of relations) {
    results.push({
      id: relation.id,
      type: "step",
      source: relation.sourceid,
      target: relation.targetid,
      sourceHandle: relation.sourceHandle,
      targetHandle: relation.targetHandle,
    });
  }
  return results;
};

const WIDTH = 360;

export const normaliseWithElk = async (
  map: Map<string, TableRelationInterface>,
  relations: GlobalRelationInterface[]
) => {
  var nodes: ElkNode[] = [];
  var edges: ElkExtendedEdge[] = [];

  const elk = new ELK({
    defaultLayoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "UP",
      "elk.spacing.nodeNode": "35",
      "elk.layered.spacing.nodeNodeBetweenLayers": "25",
    },
  });

  for (const [key, val] of map) {
    const height = (val.keys.length + val.columns.length) * 62 + 100;
    nodes.push({
      id: val.name,
      ...val,
      width: WIDTH,
      height,
    });
  }

  for (const rel of relations) {
    edges.push({
      id: rel.id,
      targets: [rel.targetid],
      sources: [rel.sourceid],
    });
  }

  const layout = await elk.layout({
    id: "root",
    children: nodes,
    edges,
  });

  return layout;
};

export const ddlToElk = async (val: string) => {
  const [map, globalRelations] = convertDDLMap(val);
  const layout = await normaliseWithElk(map, globalRelations);
  const nodes = mapToReactNodes(layout);
  const edges = mapToReactEdges(globalRelations);
  return [nodes, edges] as const;
};
