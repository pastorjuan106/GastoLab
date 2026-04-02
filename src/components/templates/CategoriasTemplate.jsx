import styled from "styled-components";
import {
  Header,
  ContentFiltros,
  BtnDesplegable,
  useOperaciones,
  ListaMenuDesplegable,
  DataDesplegableTipo,
  BtnFiltro,
  v,
  TablaCategorias,
  RegistrarCategorias,
  LottieAnimation,
} from "../../index";
import { useState } from "react";
import vacioverde from "../../assets/EmptyStateVerde.json";
import vaciorojo from "../../assets/EmptyStateRojo.json";
export function CategoriasTemplate({ data }) {
  const [openRegistro, SetopenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const { colorCategoria, tituloBtnDes, bgCategoria, setTipo, tipo } =
    useOperaciones();
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }
  function cerrarDesplegables() {
    setStateTipo(false);
    setState(false);
  }
  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }
  function openUser() {
    setState(!state);
    setStateTipo(false);
  }
  function nuevoRegistro() {
    SetopenRegistro(true);
    setAccion("Nuevo");
    setdataSelect([]);
  }
  return (
    <Container onClick={cerrarDesplegables}>
      {openRegistro && (
        <RegistrarCategorias
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
        />
      )}
      <header className="header">
        <Header stateConfig={{ state: state, setState: openUser }} />
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
              text={tituloBtnDes}
              funcion={openTipo}
            />
            {stateTipo && (
              <ListaMenuDesplegable
                data={DataDesplegableTipo}
                top="112%"
                funcion={(p) => cambiarTipo(p)}
              />
            )}
          </div>
        </ContentFiltros>
        <ContentFiltro>
          <BtnFiltro
            bg={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
            funcion={nuevoRegistro}
          />
        </ContentFiltro>
      </section>
      <section className="area2"></section>
      <section className="main">
        {!data || data.length === 0 && (
          <LottieAnimation
            alto="300"
            ancho="300"
            animacion={tipo == "i" ? vacioverde : vaciorojo}
          />
        )}
        <TablaCategorias
          data={data}
          SetopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
        />
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
    display: flex;
    align-items: center;
    justify-content: flex-end;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  .main {
    grid-area: main;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  @media (max-width: 768px) {
      .area2 {
      justify-content: flex-start;
    }
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
