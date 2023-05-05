import styled from "styled-components";

export const Container = styled.div`
  color: black;
  display: block;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 360px;
  border-radius: 4px;
  min-height: 100px;
`;

export const TitleContainer = styled.div`
  text-align: center;
  width: 100%;
  background-color: #477dfc;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: white;
  padding-top: 1em;
  padding-bottom: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AttributesContainer = styled.div`
  width: 100%;
  margin-top: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  z-index: 999;
  border-top: 1px #ccc solid;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const Row = styled.tr`
  height: 28px !important;
  padding: 0 !important;
`;

export const Column = styled.td`
  width: 60px !important;
  height: 28px !important;

  & p {
    overflow: auto;
    padding: 8px;
    margin: 0;
  }
`;

export const KeyTypeColumn = styled(Column)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContainerTest = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DividerTest = styled.div`
  width: 100%;
  height: 50px;
`;
