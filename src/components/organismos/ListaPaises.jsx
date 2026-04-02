import styled from "styled-components";
import {
  v,
  InputBuscadorLista,
  ConvertirCapitalize,
  Device,
  BtnCerrar,
} from "../../index";
import iso from "iso-country-currency";
import { useState } from "react";
export function ListaPaises({ setSelect, setState }) {
  const isocodigos = iso.getAllISOCodes();
  const [dataresult, setDataresult] = useState([]);
  function seleccionar(p) {
    setSelect(p);
    setState();
  }
  function buscar(e) {
    let filtrado = isocodigos.filter((item) => {
      return item.countryName == ConvertirCapitalize(e.target.value);
    });
    setDataresult(filtrado);
  }
  return (
    <Container>
      <section className="titulo">
        <span>Busca tu país</span>
        <BtnCerrar funcion={setState} />
      </section>
      <InputBuscadorLista onChange={buscar} placeholder="buscar..." />
      {dataresult.length > 0 &&
        dataresult.map((item, index) => {
          return (
            <ItemContainer key={index} onClick={() => seleccionar(item)}>
              <span>{item.countryName} </span>
              <span>{item.symbol} </span>
            </ItemContainer>
          );
        })}
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 5px;
  max-height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.body};
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  color: ${({ theme }) => theme.text};

  z-index: 10;

  @media ${() => Device.tablet} {
    width: 400px;
  }

  .titulo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.bgtotal};
  }
`;
