import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useTheme } from "styled-components";
import { Switch } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  useMovimientosStore,
  useCategoriasStore,
  useOperaciones,
  ListaGenerica,
  Selector,
  InputNumber,
  InputText,
  useCuentaStore,
  v,
  BtnSave,
} from "../../../index";
import { useEffect } from "react";
export function RegistrarMovimientos({ onClose, dataSelect, accion }) {
  const theme = useTheme();
  const { cuentaItemSelect } = useCuentaStore();
  const { datacategoria, categoriaItemSelect, selectCategoria } =
    useCategoriasStore();
  const queryClient = useQueryClient();
  const { tipo } = useOperaciones();
  const { insertarMovimientos, editarMovimientos } = useMovimientosStore();
  const [fecha, setFecha] = useState(dayjs());
  const [estado, setEstado] = useState(true);
  const [stateCategorias, setStateCategorias] = useState(false);
  const handleFecha = (newValue) => {
    setFecha(newValue);

    const fechaFormateada = newValue.format("YYYY-MM-DD");
    setValue("fecha", fechaFormateada);
  };
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const insertar = async (data) => {
    let estadoText = 0;
    if (estado) {
      estadoText = 1;
    }

    const p = {
      tipo: tipo,
      estado: estadoText,
      fecha: data.fecha,
      descripcion: data.descripcion,
      idcuenta: cuentaItemSelect.id,
      valor: parseFloat(data.monto),
      idcategoria: categoriaItemSelect.id,
    };

    try {
      if (accion === "Editar") {
        const pEditar = {
          ...p,
          id: dataSelect.id,
        };

        await editarMovimientos(pEditar);
      } else {
        await insertarMovimientos(p);
      }

      queryClient.invalidateQueries(["movimientos"]);

      onClose();
    } catch (err) {
      alert(err);
    }
  };
  function estadoControl(e) {
    setEstado(e.target.checked);
  }

  useEffect(() => {
    if (accion === "Editar") {
      setValue("descripcion", dataSelect.descripcion);
      setValue("monto", dataSelect.valor);
      setValue("fecha", dataSelect.fecha);

      setFecha(dayjs(dataSelect.fecha));
      setEstado(dataSelect.estado == 1);
    }
  }, []);

  return (
    <Container onClick={onClose}>
      <div
        className="sub-contenedor"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="encabezado">
          <div>
            <h1>
              {accion === "Editar"
                ? "Editar movimiento"
                : `Nuevo ${tipo == "i" ? "ingreso" : "gasto"}`}
            </h1>
          </div>
          <div>
            <span onClick={close}>{<v.iconocerrar />}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(insertar)} className="formulario">
          <section>
            <div>
              <label>Monto:</label>
              <div>
                <InputNumber
                  defaultValue={dataSelect.valor}
                  register={register}
                  placeholder="Ingrese monto"
                  errors={errors}
                  icono={<v.iconocalculadora />}
                />
              </div>
            </div>
            <ContainerFuepagado>
              <span>{<v.iconocheck />}</span>
              <label>Fue pagado:</label>
              <Switch
                onChange={estadoControl}
                checked={estado}
                color="#0A437C"
              />
            </ContainerFuepagado>
            <ContainerFecha>
              <label>Fecha:</label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={fecha}
                  onChange={handleFecha}
                  sx={{
                    color: theme.text,
                    "& .MuiPickersDay-root": {
                      color: theme.text,
                    },
                    "& .MuiPickersCalendarHeader-label": {
                      color: theme.text,
                    },
                    "& .MuiSvgIcon-root": {
                      color: theme.text,
                    },
                    "& .MuiDayCalendar-weekDayLabel": {
                      color: theme.text,
                    },
                  }}
                />
              </LocalizationProvider>

              <input type="hidden" {...register("fecha", { required: true })} />
              {errors.fecha?.type === "required" && (
                <p>El campo es requerido</p>
              )}
            </ContainerFecha>
            <div>
              <label>Descripción:</label>
              <InputText
                defaultValue={dataSelect.descripcion}
                register={register}
                placeholder="Ingrese una descripcion"
                errors={errors}
                style={{ textTransform: "capitalize" }}
              />
            </div>
            <ContainerCategoria>
              <label>Categoria: </label>
              <Selector
                color="#0A437C"
                texto1={categoriaItemSelect?.icono}
                texto2={categoriaItemSelect?.descripcion}
                funcion={() => setStateCategorias(prev => !prev)}
              />
            </ContainerCategoria>
          </section>
          {stateCategorias && (
            <ListaGenerica
              bottom="23%"
              scroll="scroll"
              setState={() => setStateCategorias(prev => !prev)}
              data={datacategoria}
              funcion={selectCategoria}
            />
          )}

          <div className="contentBtnsave">
            <BtnSave
              titulo="Guardar"
              icono={v.iconoguardar}
              className="btnsave"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  color: black;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    color: ${({ theme }) => theme.text};
    label {
      font-weight: 550;
    }
    .encabezado {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 30px;
        font-weight: 700;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      .contentBtnsave {
        padding-top: 20px;
        display: flex;
        justify-content: center;
      }
      section {
        padding-top: 20px;
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
  @keyframes scale-up-bottom {
    0% {
      transform: scale(0.5);
      transform-origin: center bottom;
    }
    100% {
      transform: scale(1);
      transform-origin: center bottom;
    }
  }
`;
const ItemContainer = styled.section`
  gap: 10px;
  width: 50%;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => props.color};
  transition: 0.3s;
  &:hover {
    background-color: ${(props) => props.color};
  }
`;
const ContainerFuepagado = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const ContainerCategoria = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;
const ContainerFecha = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  input {
    appearance: none;
    color: ${({ theme }) => theme.text};
    font-family: “Helvetica”, arial, sans-serif;
    font-size: 17px;
    border: none;
    background: ${({ theme }) => theme.bgtotal};
    padding: 4px;
    display: inline-block;
    visibility: visible;
    width: 140px;
    cursor: pointer;
    &:focus {
      border-radius: 10px;

      outline: 0;
      /* box-shadow: 0 0 5px 0.4rem rgba(252, 252, 252, 0.25); */
    }
  }
`;
