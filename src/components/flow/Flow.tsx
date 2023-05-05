import { useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import styled from "styled-components";
import TableNode from "./TableNode";
import { initialText } from "../../utils/constants";
import { ddlToElk } from "../../utils/mapTables";
const nodeTypes = {
  table: TableNode,
};
function Flow() {
  const [nodes, setNodes, onNodeChanges] = useNodesState([]);
  const [edges, setEdges, onEdgeChanges] = useEdgesState([]);

  useEffect(() => {
    const initialise = async () => {
      const [initialNodes, initialEdges] = await ddlToElk(initialText);
      setNodes(initialNodes);
      setEdges(initialEdges);
    };
    initialise();
  }, []);

  return (
    <Container>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        nodesDraggable={true}
        onNodesChange={onNodeChanges}
        onEdgesChange={onEdgeChanges}
        draggable={true}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Container>
  );
}

export default Flow;

const Container = styled.div`
  flex: 1;
  background-color: #eee;

  @media (max-width: 1000px) {
    transition: flex 0.3s ease-out;
    height: calc(100vh - 60px);
  }
`;
