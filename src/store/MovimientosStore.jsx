import { create } from "zustand";
import {
  MostrarMovimientosPorMesAño,
  InsertarMovimientos,
  EliminarMovimientos,
  EditarMovimientos,
  RptMostrarMovimientosPorMesAño,
  RptMostrarMovimientosPorAnio
} from "../index";
export const useMovimientosStore = create((set, get) => ({
  datamovimientos: [],
  dataRptMovimientosAñoMes: [],
  totalRptMovimientosAñoMes: [],
  totalMesAño: 0,
  totalMesAñoPagados: 0,
  totalMesAñoPendientes: 0,
  totalIngresos: 0,
  totalGastos: 0,
  balance: 0,
  parametros: {},
  mostrarMovimientos: async (p) => {
    const response = await MostrarMovimientosPorMesAño(p);
    const data = response ?? [];
    set({ parametros: p });
    const { calcularTotales } = get();
    calcularTotales(data);
    set({ datamovimientos: data });
    return data;
  },
  calcularTotales: (response) => {
    const dtPagados = response?.filter((item) => item.estado == 1);
    const dtPendientes = response?.filter((item) => item.estado == 0);
    let total = 0;
    let tpagados = 0;
    let tpendientes = 0;
    response?.forEach((item) => {
      const array = Object.values(item);
      total += array[2];
    });
    dtPagados?.forEach((item) => {
      const array = Object.values(item);
      tpagados += array[2];
    });
    dtPendientes?.forEach((item) => {
      const array = Object.values(item);
      tpendientes += array[2];
    });
    set({ totalMesAño: total });
    set({ totalMesAñoPagados: tpagados });
    set({ totalMesAñoPendientes: tpendientes });
  },
  insertarMovimientos: async (p) => {
    await InsertarMovimientos(p);

    const { mostrarMovimientos } = get();
    const { parametros } = get();
    await mostrarMovimientos(parametros);
  },
  eliminarMovimiento: async (p) => {
    await EliminarMovimientos(p);
    const { parametros } = get();
    const { mostrarMovimientos } = get();
    await mostrarMovimientos(parametros);
  },

  editarMovimientos: async (p) => {
    await EditarMovimientos(p);
    const { mostrarMovimientos, parametros } = get();
    await mostrarMovimientos(parametros);
  },

  rptMovimientosAñoMes: async (p) => {
    const response = await RptMostrarMovimientosPorMesAño(p);
    set({ dataRptMovimientosAñoMes: response });
    return response;
  },

  totalesMovimientosAñoMes: async (p) => {
    const response = await RptMostrarMovimientosPorMesAño(p);
    const data = response ?? [];

    const totalIngresos = data
      .filter((item) => item.tipo === "i")
      .reduce((acc, item) => acc + item.total, 0);
  
    const totalGastos = data
      .filter((item) => item.tipo === "g")
      .reduce((acc, item) => acc + item.total, 0);
  
    const balance = totalIngresos - totalGastos;
  
    set({
      totalRptMovimientosAñoMes: data,
      totalIngresos,
      totalGastos,
      balance,
    });
  
    return data;
  },

  totalesMovimientosPorFiltro: async (p) => {
    // p = { idusuario, año, mes (opcional) }
    let queryParams = {
      idusuario: p.idusuario,
      tipocategoria: null,
      año: p.año,
      mes: p.mes ?? null, // si es null, tomará todo el año
    };
  
    // Llamamos a la función SQL que ya tienes
    const response = await RptMostrarMovimientosPorMesAño(queryParams); 
    const data = response ?? [];
  
    // Calculamos totales simples: ingresos y gastos
    const totalIngresos = data
      .filter((item) => item.tipo === "i")
      .reduce((acc, item) => acc + item.total, 0);
  
    const totalGastos = data
      .filter((item) => item.tipo === "g")
      .reduce((acc, item) => acc + item.total, 0);
  
    const balance = totalIngresos - totalGastos;
  
    // Guardamos en store
    set({
      totalRptMovimientosAñoMes: data,
      totalIngresos,
      totalGastos,
      balance,
    });
  
    return { totalIngresos, totalGastos, balance };
  }

  
}));
