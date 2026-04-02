import { create } from "zustand";
import {
  EditarCategorias,
  EliminarCategorias,
  EliminarCategoriasTodas,
  InsertarCategorias,
  MostrarCategorias,
} from "../supabase/crudCategorias";

export const useCategoriasStore = create((set, get) => ({
  datacategoria: [],
  categoriaItemSelect: [],
  parametros:{},
  mostrarCategorias: async (p) => {
    const response = await MostrarCategorias(p);
    set({ parametros: p });
    set({ datacategoria: response });
    set({ categoriaItemSelect: response[0] });
    return response;
  },
  selectCategoria: (p) => {
    set({ categoriaItemSelect: p });
  },
  insertarCategorias: async (p) => {
    await InsertarCategorias(p);
    const {parametros} =get();
    const { mostrarCategorias } = get();
    set(mostrarCategorias(parametros));
  },
  eliminarCategoria: async (p) => {
    await EliminarCategorias(p);
    const {parametros} =get();
    const { mostrarCategorias } = get();
    set(mostrarCategorias(parametros));
  },
  editarCategoria: async (p) => {
    await EditarCategorias(p);
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
  eliminarCategoriasTodas: async (p) => {
    await EliminarCategoriasTodas(p);
    const { mostrarCategorias } = get();
    set(mostrarCategorias(p));
  },
}));
