import { create } from "zustand";
import { v } from "../index";
import dayjs from "dayjs";

export const useOperaciones = create((set, get) => ({
  tipo: "i",
  tituloBtnDes: "Categoria ingresos",
  tituloBtnDesMovimientos: "Ingresos",
  colorCategoria: () => v.colorIngresos,
  bgCategoria: () => v.colorbgingresos,
  año: dayjs().year(),
  mes: dayjs().month() + 1,
  setMes: (p) => {
    set({ mes: p });
  },
  setAño: (p) => {
    set({ año: p });
  },
  setTipo: (p) => {
    set({ tipo: p.tipo });
    set({
      tituloBtnDes: p.text,
      tituloBtnDesMovimientos: p.text,
    });
    set({
      colorCategoria: p.color,
    });
    set({
      bgCategoria: p.bgcolor,
    });
  },
}));
