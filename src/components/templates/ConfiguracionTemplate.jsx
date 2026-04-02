import styled from "styled-components";
import {
  Header,
  Selector,
  v,
  ListaPaises,
  useUsuariosStore,
  ListaGenerica,
  TemasData,
  BtnSave,
  CardEliminarData,
} from "../../index";
import { useState } from "react";
import { useRef, useEffect } from "react";
export function ConfiguracionTemplate() {
  const { datausuarios, editartemamonedauser } = useUsuariosStore();
  const [select, setSelect] = useState([]);
  const [selectTema, setSelectTema] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [state, setState] = useState(false);

  // pais moneda
  const moneda = select.symbol || datausuarios?.moneda || "$";
const pais = select.countryName || datausuarios?.pais || "Internacional";
  const paisSeleccionado = moneda + " " + pais;
  //tema
  const iconobd = datausuarios.tema === "0" ? "🌞" : "🌚";
  const temabd = datausuarios.tema === "0" ? "light" : "dark";
  const temainicial = selectTema.tema ? selectTema.tema : temabd;
  const iconoinicial = selectTema.icono ? selectTema.icono : iconobd;
  const temaSeleccionado = iconoinicial + " " + temainicial;
  const ref = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // funcion editar
  const editar = async () => {
    const themeElegido = selectTema.descripcion === "light" ? "0" : "1";
    const p = {
      tema: themeElegido,
      moneda: moneda,
      pais: pais,
      id: datausuarios.id,
    };
    await editartemamonedauser(p);
  };

  return (
    <Container>
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>

      <section className="area2" ref={ref}>
        <Wrapper>
          <h1>AJUSTES</h1>
          <ContentCard>
            <span>Moneda:</span>
            <Selector
              state={openDropdown === "pais"}
              color={v.colorPrincipal}
              texto1={paisSeleccionado}
              funcion={() =>
                setOpenDropdown(openDropdown === "pais" ? null : "pais")
              }
            />
            {openDropdown === "pais" && (
              <ListaPaises
                setSelect={(p) => setSelect(p)}
                setState={() => setOpenDropdown(null)}
              />
            )}
          </ContentCard>
          <ContentCard>
            <span>Tema: </span>
            <Selector
              texto1={temaSeleccionado}
              color={v.colorPrincipal}
              state={openDropdown === "tema"}
              funcion={() =>
                setOpenDropdown(openDropdown === "tema" ? null : "tema")
              }
            />
            {openDropdown === "tema" && (
              <ListaGenerica
                data={TemasData}
                setState={() => setOpenDropdown(null)}
                funcion={setSelectTema}
              />
            )}
          </ContentCard>
          <Actions>
            <BtnSave titulo="Guardar" icono={v.iconoguardar} funcion={editar} />
          </Actions>
          <CardEliminarData />
        </Wrapper>
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
    "area2" auto;
  .header {
    grid-area: header;
    //background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    //background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: stretch;
    max-width: 600px;
    margin: 0 auto;
    flex-direction: column;
    justify-content: start;
    gap: 20px;
    padding-top: 20px;
    h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
    }
  }
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 10px;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bg};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
