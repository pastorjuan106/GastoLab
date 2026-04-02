import { supabase } from "./supabase.config";
import Swal from "sweetalert2";
export const InsertarMovimientos = async (p) => {
  try {
    console.log("DATA QUE SE INSERTA:", p);
    const { data, error } = await supabase
      .from("movimientos")
      .insert(p)
      .select();
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ya existe un registro con " + p.descripcion,
        footer: '<a href="">Agregue una nueva descripcion</a>',
      });
    }
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Registrado",
        showConfirmButton: false,
        timer: 1500,
      });
      return data;
      
    }
  } catch (error) {
    alert(error.error_description || error.message + " insertar movimientos");
  }
};

export async function EditarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .update({
        tipo: p.tipo,
        estado: p.estado,
        fecha: p.fecha,
        descripcion: p.descripcion,
        idcuenta: p.idcuenta,
        valor: p.valor,
        idcategoria: p.idcategoria,
      })
      .eq("id", p.id);

    if (error) {
      alert("Error al editar movimiento");
      console.error(error);
    } else {
      Swal.fire({
        icon: "success",
        title: "Movimiento actualizado",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } catch (error) {
    alert(error.error_description || error.message + " editar movimientos");
  }
}

export async function EliminarMovimientos(p) {
  try {
    const { error } = await supabase
      .from("movimientos")
      .delete()
      .eq("id", p.id);
    if (error) {
      alert("Error al eliminar", error);
    }
  } catch (error) {
    alert(error.error_description || error.message + " eliminar movimientos");
  }
}
export async function MostrarMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("mmovimientosmesanio", {
      anio: p.año,
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
    });
    return data;
  } catch (error) {}
}

export async function RptMostrarMovimientosPorMesAño(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_anio_mes", {
      anio: p.año,
      mes: p.mes,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria,
      moneda: p.moneda

    });
    return data;
  } catch (error) {}
}

export async function RptMostrarMovimientosPorAnio(p) {
  try {
    const { data } = await supabase.rpc("rptmovimientos_por_anio", {
      anio: p.año,
      iduser: p.idusuario,
      tipocategoria: p.tipocategoria ?? null,
    });
    return data;
  } catch (error) {
    console.error("Error en RptMostrarMovimientosPorAnio:", error);
  }
}

