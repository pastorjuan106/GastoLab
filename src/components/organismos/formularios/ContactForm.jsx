import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { UserAuth } from "../../../index";
import emailjs from "@emailjs/browser";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export function ContactForm({ setOpenModal }) {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const [form, setForm] = useState({
    email: user.email || "",
    asunto: "",
    mensaje: "",
  });

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const enviar = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          email: form.email,
          asunto: form.asunto,
          mensaje: form.mensaje,
        },
        PUBLIC_KEY
      );

      setForm({ email: form.email, asunto: "", mensaje: "" });
      setStatus("ok");
      setTimeout(() => {
        setOpenModal(false);
        setStatus(null);
      }, 1500);
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClick={() => setOpenModal(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <h2>Contactar</h2>
        {status === "ok" && <Msg success>Mensaje enviado 🚀</Msg>}
        {status === "error" && <Msg>Error al enviar ❌</Msg>}
        <form onSubmit={enviar} loading={loading}>
          <input
            name="email"
            value={form.email}
            readOnly
          />

          <input
            name="asunto"
            placeholder="Asunto"
            value={form.asunto}
            onChange={handleChange}
          />

          <textarea
            name="mensaje"
            placeholder="Mensaje"
            value={form.mensaje}
            onChange={handleChange}
          />

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
            <button type="button" onClick={() => setOpenModal(false)}>
              Cerrar
            </button>
          </div>
        </form>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Msg = styled.div`
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;

  background: ${(props) =>
    props.success ? "#7AC943" : "#F54E41"};

  color: white;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 12px;
  width: 95%;
  max-width: 500px;

  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  pointer-events: ${(props) => (props.loading ? "none" : "auto")};
  opacity: ${(props) => (props.loading ? 0.6 : 1)};
}

  input,
  textarea {
    padding: 10px;
    border-radius: 8px;
    border: none;
    outline: none;
  }

  textarea {
    min-height: 140px;
    resize: none;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
`;
