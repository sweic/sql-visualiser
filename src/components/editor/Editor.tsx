import MonacoEditor from "@monaco-editor/react";
import { Resizable } from "re-resizable";
import { useState } from "react";
import { useReactFlow } from "reactflow";
import styled from "styled-components";
import { useSQLMonaco } from "../../hooks/useSQLMonaco";
import useWindowSize from "../../hooks/useWindowSize";
import { initialText } from "../../utils/constants";
import { ddlToElk } from "../../utils/mapTables";

function Editor({ visible }: { visible: boolean }) {
  useSQLMonaco();
  const [size] = useWindowSize();
  return (
    <>
      {size.width >= 1000 ? (
        <Resizable
          defaultSize={{ width: "500px", height: "100%" }}
          minWidth={"300px"}
          minHeight={"100%"}
          enable={{ right: true }}
        >
          <EditorChild visible={visible} />
        </Resizable>
      ) : (
        <EditorChild visible={visible} />
      )}
    </>
  );
}

const EditorChild = ({ visible }: { visible: boolean }) => {
  const [value, setValue] = useState(initialText);
  const { setNodes, setEdges } = useReactFlow();

  return (
    <Container visible={visible}>
      <MonacoEditor
        language="mysql"
        value={value}
        onChange={(val) => setValue(val!)}
        options={{ minimap: { enabled: false }, wordWrap: "on" }}
        width={"100%"}
      />
      <Button
        onClick={async (e) => {
          e.preventDefault();
          const [graphNodes, graphEdges] = await ddlToElk(value);
          setNodes(graphNodes);
          setEdges(graphEdges);
        }}
      >
        Generate
      </Button>
    </Container>
  );
};
export default Editor;

interface ContainerProps {
  visible: boolean;
}
const Container = styled.div<ContainerProps>`
  flex: 1;
  position: relative;
  background-color: #ccc;
  height: 100%;
  @media (max-width: 1000px) {
    z-index: 999;
    height: calc(100vh - 60px);
    position: absolute;
    left: 0;
    width: 300px;
    transform: translateX(-110%);
    transform: ${(props) =>
      props.visible ? "translateX(0%)" : "translateX(-110%)"};
    transition: 350ms ease-out;
  }
`;

const Button = styled.button`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #333;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

  &:hover {
    background-color: #292929;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
