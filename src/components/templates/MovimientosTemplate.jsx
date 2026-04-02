import styled from "styled-components";
import {
  Header,
  CalendarioLineal,
  ContentTotales,
  useOperaciones,
  v,
  useMovimientosStore,
  useUsuariosStore,
  TablaMovimientos,
  useCategoriasStore,
  DataDesplegableMovimientos,
  ContentFiltros,
  ListaMenuDesplegable,
  BtnDesplegable,
  BtnFiltro,
  LottieAnimation,
} from "../../index";
import vacioverde from "../../assets/EmptyStateVerde.json";
import vaciorojo from "../../assets/EmptyStateRojo.json";
import { Device } from "../../styles/breakpoints";
import dayjs from "dayjs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RegistrarMovimientos } from "../organismos/formularios/RegistrarMovimientos";
export function MovimientosTemplate() {
  const {
    tipo,
    setTipo,
    colorCategoria,
    año,
    mes,
    bgCategoria,
    tituloBtnDesMovimientos,
  } = useOperaciones();
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");
  const [state, setState] = useState(false);
  const [stateTipo, setStateTipo] = useState(false);
  const [openRegistro, SetopenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const { idusuario } = useUsuariosStore();
  const {
    totalMesAño,
    totalMesAñoPagados,
    totalMesAñoPendientes,
    mostrarMovimientos,
  } = useMovimientosStore();
  const { mostrarCategorias } = useCategoriasStore();
  function openTipo() {
    setStateTipo(!stateTipo);
    setState(false);
  }
  function cambiarTipo(p) {
    setTipo(p);
    setStateTipo(!stateTipo);
    setState(false);
  }
  function nuevoRegistro() {
    SetopenRegistro(true);
    setAccion("Nuevo");
    setdataSelect([]);
  }

  const { data } = useQuery({
    queryKey: ["movimientos", año, mes, idusuario, tipo],
    queryFn: () =>
      mostrarMovimientos({
        año,
        mes,
        idusuario,
        tipocategoria: tipo,
      }),
  });

  useQuery({
  queryKey: ["mostrar categorias", tipo, idusuario],
  queryFn: () =>
    mostrarCategorias({ idusuario, tipo }),
  enabled: !!idusuario,
});

  return (
    <Container>
      {openRegistro && (
        <RegistrarMovimientos
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(false)}
          accion={accion}
        />
      )}
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
        <ContentFiltro>
          <BtnFiltro
            bg={bgCategoria}
            textcolor={colorCategoria}
            icono={<v.agregar />}
            funcion={nuevoRegistro}
          />
        </ContentFiltro>
      </section>
      <section className="totales">
        <ContentTotales
          total={totalMesAñoPendientes}
          titulo={tipo == "g" ? "Gastos Pendientes" : "Ingresos Pendientes"}
          color={colorCategoria}
          icono={<v.flechaarribalarga />}
        />
        <ContentTotales
          total={totalMesAñoPagados}
          titulo={tipo == "g" ? "Gastos Pagados" : "Ingresos Pagados"}
          color={colorCategoria}
          icono={<v.flechaabajolarga />}
        />
        <ContentTotales
          total={totalMesAño}
          titulo="Total"
          color={colorCategoria}
          icono={<v.balance />}
        />
      </section>
      <section className="calendario">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
      <section className="main">
        {!data ||
          (data.length === 0 && (
            <LottieAnimation
              alto="300"
              ancho="300"
              animacion={tipo == "i" ? vacioverde : vaciorojo}
            />
          ))}
        <TablaMovimientos
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
  overflow-x: hidden;
  display: grid;
  grid-template:
    "header" 100px
    "tipo" 100px
    "totales" 360px
    "calendario" 100px
    "main" auto;

  @media ${Device.tablet} {
    grid-template:
      "header" 100px
      "tipo" 100px
      "totales" 100px
      "calendario" 100px
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

  .totales {
    grid-area: totales;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    gap: 10px;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;

    @media ${Device.tablet} {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .calendario {
    grid-area: calendario;
    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  .main {
    grid-area: main;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    overflow-x: auto;
  }
`;

const ContentFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
