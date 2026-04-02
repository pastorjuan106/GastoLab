import styled from "styled-components";
import {MovimientosTemplate, useMovimientosStore} from "../index"

export function Movimientos() {
  const { datamovimientos } = useMovimientosStore();
  return (<MovimientosTemplate data ={datamovimientos}>
    
  </MovimientosTemplate>)
}
const Container =styled.div`
  
`