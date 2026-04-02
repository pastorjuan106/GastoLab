import { useState } from "react";
import styled from "styled-components";
import {
  v,
  Dona,
  Lineal,
  useMovimientosStore,
  useOperaciones,
  useUsuariosStore,
  Barras,
  SpinnerLoader,
} from "../../index";
import { useQuery } from "@tanstack/react-query";
export function Tabs() {
  const [activeTab, setactiveTab] = useState(0);
  const handleClick = (index) => {
    setactiveTab(index);
  };
  const { idusuario } = useUsuariosStore();
  const { año, mes, tipo, tituloBtnDesMovimientos } = useOperaciones();
  const bgColor = tipo === "i" ? "#7AC943" : "#F54E41";
  const { dataRptMovimientosAñoMes, rptMovimientosAñoMes } =
    useMovimientosStore();
  const totalMovimientos =
    dataRptMovimientosAñoMes?.reduce((acc, item) => acc + item.total, 0) || 0;
  const tieneDatos = totalMovimientos > 0;

  const datagrafica = {
    labels: tieneDatos
      ? dataRptMovimientosAñoMes?.map((item) => item.descripcion)
      : ["Sin movimientos"],
    datasets: [
      {
        label: "Total",
        data: tieneDatos
          ? dataRptMovimientosAñoMes?.map((item) => item.total)
          : [1],
        backgroundColor: tieneDatos
          ? dataRptMovimientosAñoMes?.map((item) => item.color)
          : ["#dddddd"],
        borderColor: "#fff",
        borderWidth: 2,
        cutout: 30,
        hoverOffset: 12,
      },
    ],
  };
  const { isLoading, error } = useQuery({
    queryKey: [
      "reporte movimientos",
      {
        año: año,
        mes: mes,
        tipocategoria: tipo,
        idusuario: idusuario,
      },
    ],
    queryFn: () =>
      rptMovimientosAñoMes({
        año: año,
        mes: mes,
        tipocategoria: tipo,
        idusuario: idusuario,
      }),
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <Container
      className="container"
      activeTab={`${activeTab}00%`}
      bgColor={bgColor}
    >
      <ul className="tabs">
        <li
          className={activeTab == 0 ? "active" : ""}
          onClick={() => handleClick(0)}
        >
          {<v.iconopie />}
        </li>
        <li
          className={activeTab === 1 ? "active" : ""}
          onClick={() => handleClick(1)}
        >
          {<v.iconolineal />}
        </li>
        <li
          className={activeTab === 2 ? "active" : ""}
          onClick={() => handleClick(2)}
        >
          {<v.iconobars />}
        </li>
        <span className="glider"></span>
      </ul>

      <div className="tab-content">
        {activeTab === 0 && (
          <Dona
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
        {activeTab === 1 && (
          <Lineal
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
        {activeTab === 2 && (
          <Barras
            datagrafica={datagrafica}
            data={dataRptMovimientosAñoMes}
            titulo={tituloBtnDesMovimientos}
          />
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .tabs {
    list-style: none;
    display: flex;
    box-shadow: 0px 10px 20px -3px rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.bg};
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    * {
      z-index: 2;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 150px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in;
    }
    .glider {
      position: absolute;
      color: "#fff";
      display: flex;
      height: 54px;
      width: 150px;
      background-color: ${(props) => props.bgColor};
      z-index: 1;
      border-radius: 99px;
      transition: 0.25s ease-out;
      transform: translateX(${(props) => props.activeTab});
      box-shadow: 0px 10px 20px -3px ${(props) => props.bgColor};
    }
  }

  .tab-content {
    position: relative;
    border-radius: 6px;
    margin-top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  canvas {
    max-width: 350px !important;
    max-height: 350px !important;
  }
`;
