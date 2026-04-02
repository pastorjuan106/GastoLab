import styled from "styled-components";
import { v, BtnSave, ContactForm } from "../../../index";
import { useState } from "react";
import { createPortal } from "react-dom";

export function SidebarCard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      <span className="icon">{<v.iconoayuda />}</span>
      <div className="cardContent">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <h3>Centro de ayuda</h3>
        <div className="contentBtn">
          <BtnSave
            titulo="Contactar"
            bgcolor="#f8f2fd"
            funcion={() => setOpenModal(true)}
          />
        </div>
      </div>

      {openModal &&
        createPortal(
          <ContactForm setOpenModal={setOpenModal} />,
          document.body
        )}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  position: relative;

  .icon {
    position: absolute;
    font-size: 3rem;
    border-radius: 50%;
    top: -8px;
    right: 50%;
    transform: translate(50%);
    z-index: 100;
    color: ${(props) => props.theme.text};
  }
  .cardContent {
    position: relative;
    padding: 1rem;
    background-color: rgba(122, 201, 67, 1);
    border-radius: 10px;
    overflow: hidden;

    .circle1,
    .circle2 {
      position: absolute;
      background: #fff;
      border-radius: 50%;
      opacity: 0.7;
    }
    .circle1 {
      height: 100px;
      width: 100px;
      top: -50px;
      left: -50px;
    }
    .circle2 {
      height: 130px;
      width: 130px;
      bottom: -80px;
      right: -70px;
    }
    h3 {
      font-size: 1.1rem;
      margin-top: 1rem;
      padding: 1rem 0;
      font-weight: 800;
      color: ${(props) => props.theme.text};
    }
    .contentBtn {
      position: relative;
      margin-left: -8px;
      .btn {
        background-color: #7bc943cb;
      }
    }
  }
`;
