import { supabase } from "./supabase.config";
import { ObtenerIdAuthSupabase } from "../index";
import Swal from "sweetalert2";
export const InsertarUsuarios = async (p) => {
  try {
    const { data } = await supabase.from("usuarios").insert(p).select();
    return data;
  } catch (error) {}
};
export const MostrarUsuarios = async () => {
  try {
    const idAuthSupabase = await ObtenerIdAuthSupabase();
    const { error, data } = await supabase
      .from("usuarios")
      .select()
      .eq("idauth_supabase", idAuthSupabase)
      .maybeSingle();
    // if (error) {
    //   alert("MostrarUsuarios", error);
    // }
    if (data) {
      return data;
    }
  } catch (error) {
    //alert(error.error_description || error.message + "MostrarUsuarios");
  }
};
export async function EditarTemaMonedaUser(p) {
  try {
    const { error } = await supabase
      .from("usuarios")
      .update(p)
      .eq("id", p.id);

    if (error) {
      throw error; 
    }

    Swal.fire({
      icon: "success",
      title: "Datos modificados",
      showConfirmButton: false,
      timer: 1500,
    });

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al editar",
      text: error.message,
    });
  }
}
