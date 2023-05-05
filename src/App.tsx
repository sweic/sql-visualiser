import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import styled from "styled-components";
import Editor from "./components/editor/Editor";
import Flow from "./components/flow/Flow";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ height: "100%" }}>
      <Navbar setVisible={setVisible} visible={visible} />
      <ReactFlowProvider>
        <Container>
          <Editor visible={visible} />
          <Flow />
        </Container>
      </ReactFlowProvider>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  background-color: black;
  @media (max-width: 1000px) {
    height: calc(100% - 60px);
  }
`;
