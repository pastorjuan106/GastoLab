import styled from "styled-components";
import { BtnSave, v, useAuthStore } from "../../index";
export function LoginTemplate() {
  const { signInWithGoogle } = useAuthStore();
  return (
    <Container imgfondo={v.imagenfondo}>
      <div className="contentCard">
        <span className="version">version 1.0</span>
        <div className="contentImg">
          <img src={v.logo} />
        </div>
        <Titulo>GastoLab</Titulo>
        <p className="frase">Gestión inteligente de ingresos y gastos</p>
        <ContainerBtn>
          <BtnSave
            titulo="Iniciar sesión con Google"
            icono={v.iconogoogle}
            funcion={signInWithGoogle}
          />
        </ContainerBtn>
      </div>
    </Container>
  );
}
const Container = styled.div`
  background-image: url(${(props) => props.imgfondo});
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.847);
  text-align: center;
  .contentCard {
    background-color: #131313dd;
    border-radius: 20px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 10px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      img {
        max-width: 40%;
        max-height: 80vh;
        animation: flotar 1.4s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #909090;
      font-size: 1.2rem;
      margin-bottom: 10px;
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;

const Titulo = styled.span`
  font-size: 3.3rem;
  font-weight: 700;
`;

const ContainerBtn = styled.div`
  display: flex;
  justify-content: center;
`;
