import styled from "styled-components";
import Lottie from "react-lottie";
export function LottieAnimation({alto, ancho,animacion}) {
  const defaultOptions = {
    loop : true,
    autoplay: true,
    animationData: animacion,
  };
  return (<Container>
    <Lottie options={defaultOptions} height={`${alto}px`} width={`${ancho}px`} sClickToPauseDisabled />
  </Container>);
}
const Container =styled.div`
  
`