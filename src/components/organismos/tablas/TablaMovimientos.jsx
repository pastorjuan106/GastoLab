import styled from "styled-components";
import {
  ContentAccionesTabla,
  useMovimientosStore,
  Paginacion,
} from "../../../index";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { useState } from "react";
export function TablaMovimientos({
  data = [],
  SetopenRegistro,
  setdataSelect,
  setAccion,
}) {
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(6);
  const mx = (data?.length || 0) / porPagina;
  const maximo = Math.ceil(mx) || 1;
  const { eliminarMovimiento } = useMovimientosStore();
  if (!data || data.length === 0) return;
  function eliminar(p) {
    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(122, 201, 67, 1)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await eliminarMovimiento({ id: p.id });
      }
    });
  }
  function editar(data) {
    SetopenRegistro(true);
    setdataSelect(data);
    setAccion("Editar");
  }
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Descripcion</th>
              <th scope="col">Situacion</th>
              <th scope="col">Fecha</th>
              <th scope="col">Categoria</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            {data
              .slice(
                (pagina - 1) * porPagina,
                (pagina - 1) * porPagina + porPagina
              )
              .map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{item.descripcion}</th>
                    <td data-title="Estado">
                      <Situacion
                        bgcolor={item.estado == "1" ? "#7AC943" : "#777777"}
                      ></Situacion>
                    </td>
                    <td data-title="Fecha:">{item.fecha}</td>
                    <td data-title="Categoría:">{item.categoria}</td>
                    <td data-title="Cuenta:">{item.cuenta}</td>
                    <td data-title="Valor:">{item.valorymoneda}</td>
                    <td data-title="Acciones">
                      <ContentAccionesTabla
                        funcionEditar={() => editar(item)}
                        funcionEliminar={() => eliminar(item)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
      </Container>
    </>
  );
}
const Container = styled.div`
  position: relative;

  margin: 5% 3%;

  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }

  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    max-width: ${v.bphomer};
  }

  .responsive-table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;

    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }

    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }

    thead {
      position: absolute;
      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;

      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: visible;
      }

      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};

        &:first-of-type {
          text-align: center;
        }
      }
    }

    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      white-space: normal;
    }

    tr {
      margin-bottom: 1em;

      @media (min-width: ${v.bpbart}) {
        display: table-row;
        margin-bottom: 0;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;

      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }

      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }

      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }

      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }

    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }

      tr {
        @media (min-width: ${v.bpbart}) {
          border-width: 1px;
        }

        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(151, 151, 151, 0.12);
          }
        }
      }

      th[scope="row"] {
        text-align: left;
        font-weight: 500;

        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }

        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }

      td {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        text-align: right;

        word-break: break-word;

        @media (min-width: ${v.bpbart}) {
          display: table-cell;
          text-align: center;
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
      }

      td[data-title]::before {
        content: attr(data-title);
        font-size: 0.8em;
        text-align: left;
        flex: 1;

        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }

        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }

      .Colordiv {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;

        @media (min-width: ${v.bpbart}) {
          justify-content: center;
        }
      }
    }
  }
`;
const Colorcontent = styled.div`
  justify-content: center;
  min-height: ${(props) => props.$alto};
  width: ${(props) => props.$ancho};
  display: block;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  text-align: center;
`;

const Situacion = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (min-width: ${v.bpbart}) {
    justify-content: center;
  }

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.bgcolor};
  }
`;
