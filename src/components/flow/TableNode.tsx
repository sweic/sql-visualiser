import { Flex } from "@sweic/scomponents";
import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import styled from "styled-components";
import { TableRelationInterface } from "../../utils/types";
import {
  Container,
  TitleContainer,
  Divider,
  AttributesContainer,
  Table,
  Row,
  Column,
  KeyTypeColumn,
} from "./Styles";

function TableNode({ id, data }: NodeProps<TableRelationInterface>) {
  const { primaryKey, columns, foreignKeys, keys, keyNames } = data;
  return (
    <Container>
      <TitleContainer>
        <h3
          style={{
            fontSize: "12px",
            paddingLeft: "8px",
            paddingRight: "8px",
            margin: "0",
          }}
        >
          {data.name}
        </h3>
      </TitleContainer>
      <Divider />
      <AttributesContainer>
        <Table>
          {keys.map((k, idx) => {
            const pos = 72 + idx * 50;

            return (
              <Row key={k.name}>
                <Column>
                  <Flex>
                    <p style={{ paddingLeft: "16px" }}>{k.name}</p>
                  </Flex>
                </Column>
                <Column>
                  <Flex justify="center">
                    <p>{k.type.datatype}</p>
                  </Flex>
                </Column>
                <KeyTypeColumn>
                  <Flex gap={16} justify="end" style={{ paddingRight: "8px" }}>
                    {primaryKey.find((c) => c == k.name) && (
                      <p
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        PK
                      </p>
                    )}
                    {foreignKeys.find((c) => c == k.name) && <p>FK</p>}
                  </Flex>
                </KeyTypeColumn>
                <Column>
                  <Handle
                    style={{ top: `${pos}px` }}
                    key={`${k.name}-1`}
                    position={Position.Left}
                    type={"source"}
                    id={`${k.name}-s`}
                  />

                  <Handle
                    style={{ top: `${pos}px` }}
                    key={`${k.name}-2`}
                    position={Position.Right}
                    type={"target"}
                    id={`${k.name}-t`}
                  />
                </Column>
              </Row>
            );
          })}
          <tr
            style={{ borderTop: "1px #ccc solid", height: "1px !important" }}
          ></tr>
          {columns.map((col) => {
            if (keyNames.includes(col.name)) return;
            return (
              <Row key={col.name}>
                <Column>
                  <Flex>
                    <p style={{ paddingLeft: "16px" }}>{col.name}</p>
                  </Flex>
                </Column>
                <Column>
                  <Flex justify="center">
                    <p>{col.type.datatype}</p>
                  </Flex>
                </Column>
                <Column>
                  <Flex justify="center">
                    <p>{col.options?.nullable && "nullable"}</p>
                  </Flex>
                </Column>
              </Row>
            );
          })}
        </Table>
      </AttributesContainer>
      <Divider />
    </Container>
  );
}

export default React.memo(TableNode, (a, b) => a.data == b.data);
