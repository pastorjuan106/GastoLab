import styled from "styled-components";
import { PuffLoader } from "react-spinners";
export function SpinnerLoader() {
  return (
    <Container>
      <PuffLoader color="#7AC943" size={300}/>
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
  background-color: #2C2C2E;
  transform: all 0.3s;
  color: #6df643;
`;