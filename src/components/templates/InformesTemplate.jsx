import styled from "styled-components";
import {
  BtnDesplegable,
  CalendarioLineal,
  ContentFiltros,
  Header,
  ListaMenuDesplegable,
  Tabs,
  useOperaciones,
  DataDesplegableMovimientos,
  Device,
  LottieAnimation,
} from "../../index";
import { useState } from "react";
import vacioverde from "../../assets/EmptyStateVerde.json";
import vaciorojo from "../../assets/EmptyStateRojo.json";
export function InformesTemplate({ datagrafica }) {
  const [state, setState] = useState(false);
  const [value, setValue] = useState(false);
  const [formatoFecha, setFormatoFecha] = useState("");
  const [stateTipo, setStateTipo] = useState(false);
  const {
    tipo,
    setTipo,
    colorCategoria,
    año,
    mes,
    bgCategoria,
    tituloBtnDesMovimientos,
  } = useOperaciones();
  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }
  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="tipo">
        <ContentFiltros>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <BtnDesplegable
              textcolor={colorCategoria}
              bgcolor={bgCategoria}
              text={tituloBtnDesMovimientos}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableMovimientos}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
      </section>
      <section className="area2">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className="main">
        {!datagrafica ||
          (datagrafica.length === 0 && (
            <LottieAnimation
              alto="300"
              ancho="300"
              animacion={tipo == "i" ? vacioverde : vaciorojo}
            />
          ))}
        <Tabs />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  grid-template:
    "header" 100px
    "tipo" 100px
    "area2" 70px
    "main" auto;
  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "tipo" 100px
      "area2" 100px
      "main" auto;
  }
  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }
  .tipo {
    grid-area: tipo;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }
  .area2 {
    grid-area: area2;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main {
    grid-area: main;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 15px;
    //background-color: rgba(179, 46, 241, 0.14);
  }
`;
