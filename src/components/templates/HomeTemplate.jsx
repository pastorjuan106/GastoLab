import styled from "styled-components";
import { useMovimientosStore } from "../../store/MovimientosStore";
import { useState } from "react";
import { useUsuariosStore } from "../../store/UsuariosStore";
import {
  CalendarioLineal,
  ContentTotales,
  Device,
  Dona,
  Header,
  SaldoInicialForm,
  useCuentaStore,
  useOperaciones,
} from "../..";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export function HomeTemplate() {
  const { año, mes } = useOperaciones();
  const { idusuario, datausuarios } = useUsuariosStore();
  const { datacuentas, editarSaldoInicial } = useCuentaStore();
  const [value, setValue] = useState(dayjs(Date.now()));
  const [formatoFecha, setFormatoFecha] = useState("");

  const cuenta = datacuentas;
  const { totalIngresos, totalGastos, totalesMovimientosAñoMes } =
    useMovimientosStore();
  const [state, setState] = useState(false);
  const puedeEditarSaldo = cuenta && cuenta.saldo_inicial_editado !== true;
  const tieneDatos = totalIngresos + totalGastos > 0;

  const datagrafica = {
    labels: tieneDatos ? ["Ingresos", "Gastos"] : ["Sin movimientos"],
    datasets: [
      {
        data: tieneDatos ? [totalIngresos, totalGastos] : [1], 
        backgroundColor: tieneDatos ? ["#7AC943", "#F54E41"] : ["#dddddd"], 
        borderWidth: 2,
        cutout: 30,
        tension: 0.3,
        fill: true,
        hoverOffset: 16,
        offset: 10,
      },
    ],
  };

  const dataResumen = [
    {
      descripcion: "Ingresos",
      total: totalIngresos,
      moneda: "S/",
    },
    {
      descripcion: "Gastos",
      total: totalGastos,
      moneda: "S/",
    },
  ];

  const { mostrarCuentas } = useCuentaStore();

  useQuery({
    queryKey: ["cuentas", idusuario],
    queryFn: () =>
      mostrarCuentas({
        idusuario,
      }),
    enabled: !!idusuario,
  });
  const { isLoading } = useQuery({
    queryKey: ["totales-home", año, mes, idusuario],
    queryFn: () =>
      totalesMovimientosAñoMes({
        año,
        mes,
        idusuario,
        tipocategoria: null,
      }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!año && !!mes && !!idusuario,
  });

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="saldo">
        <span className="label">Saldo disponible</span>
        <h1 className="monto">
          {datausuarios?.moneda || "$"}
          {cuenta?.saldo_actual || 0}
        </h1>
      </section>
      {puedeEditarSaldo && (
        <section className="saldoInput">
          <SaldoInicialForm
            cuenta={cuenta}
            idusuario={idusuario}
            editarSaldoInicial={editarSaldoInicial}
          />
        </section>
      )}
      <section className="totales">
        <ContentTotales total={totalIngresos} titulo="Ingresos" />
        <ContentTotales total={totalGastos} titulo="Gastos" />
      </section>

      <section className="grafico">
        <Dona
          datagrafica={datagrafica}
          data={dataResumen}
          titulo="Resumen del mes"
        />
      </section>

      <section className="main">
        <CalendarioLineal
          value={value}
          setValue={setValue}
          formatofecha={formatoFecha}
          setFormatoFecha={setFormatoFecha}
        />
      </section>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 15px;
  width: 100%;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  overflow-x: clip;

  display: grid;
  grid-template:
    "header"
    "saldo"
    "totales"
    "grafico"
    "main";

  @media ${Device.tablet} {
    grid-template:
      "header"
      "saldo"
      "totales"
      "grafico"
      "main";
  }

  .header {
    grid-area: header;
    display: flex;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }
  .saldo {
    text-align: center;
    margin-top: 10px;

    .monto {
      font-size: 38px;
    }
  }
  .label {
    font-size: 14px;
    opacity: 0.7;
  }

  .saldoInput {
    display: flex;
    justify-content: center;
    margin: 10px 0;

    input {
      padding: 10px 15px;
      border-radius: 10px;
      border: none;
      outline: none;
      width: 250px;
    }
  }

  .totales {
    display: grid;
    gap: 10px;
    margin-top: 10px;

    grid-template-columns: 1fr;

    @media ${Device.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .totales > * {
    box-shadow: 0px 10px 20px -10px rgba(0, 0, 0, 0.1);
  }

  .grafico {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    canvas {
      max-width: 320px !important;
    }
  }

  .main {
    grid-area: main;

    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    overflow-x: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
