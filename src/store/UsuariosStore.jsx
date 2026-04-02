import { create } from "zustand";
import { EditarTemaMonedaUser, MostrarUsuarios } from "../index";

export const useUsuariosStore = create((set, get) => ({
  idusuario: 0,
  datausuarios: {},

  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
  
    if (response) {
      set({ 
        datausuarios: response,
        idusuario: response.id
      });
      return response;
    } else {
      set({ datausuarios: {} }); 
      return {};
    }
  },
  editartemamonedauser: async (p) => {
    await EditarTemaMonedaUser(p);
    const { mostrarUsuarios } = get();
    await mostrarUsuarios();
  },
}));
