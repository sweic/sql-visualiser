import React from "react";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";

function Navbar({
  visible,
  setVisible,
}: {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
}) {
  const [size] = useWindowSize();
  return (
    <Container>
      <Left>
        {size.width < 1000 && (
          <div
            onClick={() => {
              setVisible(!visible);
            }}
            style={{
              cursor: "pointer",
              width: "24px",
              height: "24px",
              paddingTop: "8px",
            }}
          >
            <svg viewBox="0 0 60 60" width="24" height="24">
              <rect width="48" height="8" rx="4" fill="white"></rect>
              <rect y="18" width="48" height="8" rx="4" fill="white"></rect>
              <rect y="36" width="48" height="8" rx="4" fill="white"></rect>
            </svg>
          </div>
        )}
        <h2>sVis</h2>
      </Left>
      <Right>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://github.com/sweic/sql-visualiser", "_blank");
          }}
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </Right>
    </Container>
  );
}
export default Navbar;

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  height: 40px;
  padding: 10px;
`;

const Left = styled.div`
  display: flex;
  align-items center;
  padding-left: 1em;
  gap: 2em;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2em;
  gap: 2em;
`;
