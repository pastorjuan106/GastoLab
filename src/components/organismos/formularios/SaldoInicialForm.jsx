import { useState } from "react";
import styled from "styled-components";

export function SaldoInicialForm({ cuenta, idusuario, editarSaldoInicial }) {
  const [saldo, setSaldo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (saldo === "") return;

    setLoading(true);

    await editarSaldoInicial({
      saldo: Number(saldo),
      idcuenta: cuenta.id,
      idusuario: idusuario,
    });

    setLoading(false);
  };

  return (
    <Container>
      <span className="title">Define tu saldo inicial</span>

      <div className="inputGroup">
        <span className="currency">S/</span>
        <input
          type="number"
          value={saldo}
          onChange={(e) => setSaldo(e.target.value)}
          placeholder="0"
        />
      </div>

      <button onClick={handleGuardar} disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </Container>
  );
}

const Container = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 300px;
  margin: 0 auto;

  .title {
    font-size: 14px;
    opacity: 0.7;
    text-align: center;
  }

  .inputGroup {
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.bg3};
    border-radius: 12px;
    padding: 10px;
    gap: 8px;

    input {
      border: none;
      outline: none;
      background: transparent;
      width: 100%;
      font-size: 18px;
      color: ${({ theme }) => theme.text};
    }

    .currency {
      font-weight: bold;
    }
  }

  button {
    border: none;
    border-radius: 12px;
    padding: 10px;
    background: #7ac943;
    color: white;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;