import styled from "styled-components";
import { v, useUsuariosStore, BtnCircular } from "../../index";
import { Device } from "../../styles/breakpoints";
export function ContentTotales({ color, total, titulo, icono }) {
  const { datausuarios } = useUsuariosStore();
  return (
    <Container>
      <section className="contentTextos">
        <section>
          <span className="title">{titulo}</span>
          <b>
            <v.iconoFlechabajo />
          </b>
        </section>
        <span className="total">
        {datausuarios?.moneda || "$"}
          {total}
        </span>
      </section>
      <section className="contentIcono">
        <BtnCircular
          height="50px"
          width="50px"
          bgcolor={color}
          fontsize="25px"
          icono={icono}
          textColor="#fff"
          translateX="-45px"
          translateY="-15px"
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  
  .contentTextos {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
    }
    .total {
      font-size: 22px;
      font-weight: 500;
    }
    section {
      display: flex;
      gap: 10px;
      display: flex;
      align-items: center;
    }
  }
  .contentIcono {
    display: flex;
    
  }
`;
