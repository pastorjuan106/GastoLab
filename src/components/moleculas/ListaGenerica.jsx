import styled from "styled-components";
import { Device, v, BtnCerrar } from "../../index";
export function ListaGenerica({ data, setState, funcion, scroll, bottom }) {
  function seleccionar(p) {
    funcion(p);
    setState();
  }
  return (
    <Container scroll={scroll} $bottom={bottom}>
      <section className="contentItems">
        {data.map((item, index) => {
          return (
            <ItemContainer key={item.id} onClick={() => seleccionar(item)}>
              <span>{item.icono}</span>
              <span>{item.descripcion}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 65%; 

  max-width: 400px;
  margin-top: 5px;

  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body}; 
  color: ${({ theme }) => theme.text};

  padding: 10px;
  border-radius: 10px;
  gap: 10px;

  z-index: 1000;

  @media ${() => Device.tablet} {
    width: 500px;
  }

  .contentItems {
    overflow-y: auto; 
    max-height: 250px; 
  }
`;
const ItemContainer = styled.div`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.bgAlpha};
  }
`;
