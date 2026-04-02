import styled from "styled-components";
import { Icono } from "../../index";
export function BtnSave({ funcion, titulo, icono: Icon }) {
  return (
    <Container type="submit" onClick={funcion}>
      <span className="btn">
        {Icon && (
          <Icono className="icon">
            <Icon />
          </Icono>
        )}
        {titulo}
      </span>
    </Container>
  );
}
const Container = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  z-index: 2;

  .btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: rgba(122, 201, 67, 1);
    padding: 0.6em 1.3em;
    font-weight: 600;
    font-size: 18px;
    border: 3px solid black;
    border-radius: 0.4em;
    box-shadow: 0.1em 0.1em #000;
    transition: 0.2s;
    color:${(props)=>props.theme.text}
  }

  &:hover .btn {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em #000;
  }

  &:active .btn {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em #000;
  }

  .icon {
    font-size: 20px;
    display: flex;
    align-items: center;
  }
`;
