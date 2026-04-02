import styled from "styled-components";
import { ClockLoader } from "react-spinners";
import { useOperaciones } from "../../index";
export function Spinner() {
  return (
    <Container>
      <ClockLoader color="#7AC943" size={100} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${(props) => props.theme.bg};
  transform: all 0.3s;
  color: #6df643;
`;
