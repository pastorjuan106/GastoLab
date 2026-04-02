import { create } from "zustand";
import { EditarSaldoInicialCuenta, MostrarCuentas } from "../index";
export const useCuentaStore = create((set, get) => ({
  cuentaItemSelect: [],
  datacuentas: [],
  mostrarCuentas: async (p) => {
    const response = await MostrarCuentas(p);
  
    if (response) {
      set({ 
        datacuentas: response,
        cuentaItemSelect: response
      });
    }
  
    return response;
  },

  editarSaldoInicial: async (p) => {
    await EditarSaldoInicialCuenta(p);
  
    set((state) => ({
      datacuentas: {
        ...state.datacuentas,
        saldo_actual: p.saldo,
        saldo_inicial_editado: true,
      },
    }));
  },
}));