import styled from "styled-components";
import {
  CategoriasTemplate,
  useCategoriasStore,
  useOperaciones,
  useUsuariosStore,
} from "../index";
import { useQuery } from "@tanstack/react-query";

export function Categorias() {
  const { tipo } = useOperaciones();
  const { datacategoria, mostrarCategorias } = useCategoriasStore();
  const { datausuarios } = useUsuariosStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", tipo],
    queryFn: () =>
      mostrarCategorias({ idusuario: datausuarios.id, tipo: tipo }),
    enabled: !!datausuarios?.id,
  });

  return <CategoriasTemplate data={datacategoria}></CategoriasTemplate>;
}
const Container = styled.div`
  height: 100vh;
`;
