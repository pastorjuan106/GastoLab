import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export function Dona({ datagrafica, data, titulo }) {
  const style = {
    width: "400px",
  };
  return (
    <Container>
      <section>
        <Doughnut data={datagrafica} style={style} />
      </section>
      <section>
        <h2>{titulo}</h2>
        {data.map((item, index) => {
          return (
            <ContentCars key={index}>
              <div className="contentDescripcion">
                <span>{item.icono}</span>
                <span className="descripcion">{item.descripcion}</span>
              </div>
              <span >{item.moneda}{item.total}</span>
            </ContentCars>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 18px;
`;
const ContentCars = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 8px 12px;
  border-radius: 10px;

  .contentDescripcion {
    display: flex;
    gap: 10px;
    align-items: center;

    .descripcion {
      white-space: nowrap;
    }
  }

  span:last-child {
    font-weight: 500;
    margin-left: 15px;
  }
`;
